"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
  Float,
  Html,
  Lightformer,
} from "@react-three/drei";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/* ---------- PRNG determinista a partir de una semilla ---------- */
function makeRng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = Math.sin(s * 12.9898) * 43758.5453;
    return s - Math.floor(s);
  };
}

/* ---------- Vertebral body geometry ----------
   Lathe of a superellipse profile: flat-ish endplates with rounded rims and a
   gentle concave waist — the silhouette of a real vertebral body, but polished
   like a worked stone. A whisper of spectral noise keeps it organic instead of
   CAD-perfect. */
function makeVertebra(radius: number, height: number, seed: number) {
  const P = 3.4; // superellipse exponent: flat top, rounded rim
  const WAIST = 0.14; // concavity at the equator
  const STEPS = 48;

  const points: THREE.Vector2[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const theta = -Math.PI / 2 + (i / STEPS) * Math.PI;
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    let x = Math.pow(Math.abs(c), 2 / P) * radius;
    x *= 1 - WAIST * c * c; // waist peaks at the equator, vanishes at the rims
    const y = Math.sign(s) * Math.pow(Math.abs(s), 2 / P) * (height / 2);
    points.push(new THREE.Vector2(x, y));
  }

  const geo = mergeVertices(new THREE.LatheGeometry(points, 72));

  // Subtle low-frequency displacement so each vertebra is unique.
  const rand = makeRng(seed + 1);
  const K = 4;
  const waves: { dir: THREE.Vector3; f: number; amp: number; phase: number }[] = [];
  let ampSum = 0;
  for (let k = 0; k < K; k++) {
    const a = rand() * Math.PI * 2;
    const b = Math.acos(2 * rand() - 1);
    const dir = new THREE.Vector3(
      Math.sin(b) * Math.cos(a),
      Math.cos(b),
      Math.sin(b) * Math.sin(a),
    );
    const amp = 1 / (1 + k * 1.3);
    ampSum += amp;
    waves.push({ dir, f: 1 + k * 0.9, amp, phase: rand() * Math.PI * 2 });
  }
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();
  const BUMP = 0.016;
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    n.copy(v).normalize();
    let d = 0;
    for (const w of waves) {
      d += w.amp * Math.sin(n.dot(w.dir) * w.f * Math.PI + w.phase);
    }
    v.addScaledVector(n, (d / ampSum) * BUMP);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

/* ---------- Spine layout ----------
   12 stylized vertebrae tapering upward (lumbar → cervical), threaded along
   the natural S-curve of a spine seen in profile: lumbar lordosis, thoracic
   kyphosis, a hint of cervical lordosis. Thin gold lenses stand in for the
   intervertebral discs. */
const COUNT = 12;

/* Real vertebra names for each stylized piece, bottom (lumbar) to top
   (cervical). C1, C2 and C7 keep their proper anatomical names. */
const VERTEBRA_LABELS: { code: string; name: string }[] = [
  { code: "L5", name: "Lumbar" },
  { code: "L3", name: "Lumbar" },
  { code: "L1", name: "Lumbar" },
  { code: "T12", name: "Torácica" },
  { code: "T10", name: "Torácica" },
  { code: "T7", name: "Torácica" },
  { code: "T4", name: "Torácica" },
  { code: "T1", name: "Torácica" },
  { code: "C7", name: "Prominente" },
  { code: "C5", name: "Cervical" },
  { code: "C2", name: "Axis" },
  { code: "C1", name: "Atlas" },
];

// Brand-green gradient, deep at the base and luminous at the top.
const GREEN_STOPS = ["#3f5a19", "#49671d", "#6c8038", "#87994e", "#a3b673"].map(
  (c) => new THREE.Color(c),
);
function greenAt(t: number) {
  const x = t * (GREEN_STOPS.length - 1);
  const i = Math.min(Math.floor(x), GREEN_STOPS.length - 2);
  return GREEN_STOPS[i].clone().lerp(GREEN_STOPS[i + 1], x - i);
}

type VertebraSpec = {
  geometry: THREE.BufferGeometry;
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  color: THREE.Color;
  rotY: number;
  disc: { position: THREE.Vector3; quaternion: THREE.Quaternion; scale: THREE.Vector3 } | null;
};

function buildSpine(): VertebraSpec[] {
  const rand = makeRng(17);
  const UP = new THREE.Vector3(0, 1, 0);

  const radii: number[] = [];
  const heights: number[] = [];
  const discHeights: number[] = [];
  for (let i = 0; i < COUNT; i++) {
    const t = i / (COUNT - 1);
    radii.push(0.62 - 0.3 * t + (rand() - 0.5) * 0.03);
    heights.push(0.34 - 0.13 * t);
    discHeights.push(0.14 - 0.05 * t);
  }

  // Stack heights along Y, then thread that Y through the S-curve.
  const ys: number[] = [0];
  for (let i = 1; i < COUNT; i++) {
    ys.push(ys[i - 1] + heights[i - 1] / 2 + discHeights[i - 1] + heights[i] / 2);
  }
  const total = ys[COUNT - 1] + heights[0] / 2 + heights[COUNT - 1] / 2;
  const yMin = ys[0] - heights[0] / 2;

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -total / 2, -0.03),
    new THREE.Vector3(0, -total * 0.22, 0.18), // lordosis lumbar
    new THREE.Vector3(0, total * 0.12, -0.15), // cifosis torácica
    new THREE.Vector3(0, total * 0.38, 0.07), // lordosis cervical
    new THREE.Vector3(0, total / 2, -0.02),
  ]);

  const specs: VertebraSpec[] = [];
  for (let i = 0; i < COUNT; i++) {
    const t = i / (COUNT - 1);
    const u = (ys[i] - yMin) / total;
    const position = curve.getPoint(u);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      UP,
      curve.getTangent(u).normalize(),
    );

    let disc: VertebraSpec["disc"] = null;
    if (i < COUNT - 1) {
      const ud = (ys[i] + heights[i] / 2 + discHeights[i] / 2 - yMin) / total;
      const r = Math.min(radii[i], radii[i + 1]) * 0.8;
      disc = {
        position: curve.getPoint(ud),
        quaternion: new THREE.Quaternion().setFromUnitVectors(
          UP,
          curve.getTangent(ud).normalize(),
        ),
        scale: new THREE.Vector3(r, discHeights[i] * 0.72, r * 0.86),
      };
    }

    specs.push({
      geometry: makeVertebra(radii[i], heights[i], 3 + i * 2.7),
      position,
      quaternion,
      color: greenAt(t),
      rotY: rand() * Math.PI * 2,
      disc,
    });
  }
  return specs;
}

/* Animated marker: pulsing dot over the vertebra, a line that draws itself
   outward and a label chip with the vertebra's name. */
function VertebraTooltip({
  index,
  visible,
  reduce,
  onGone,
}: {
  index: number;
  visible: boolean;
  reduce: boolean;
  onGone: () => void;
}) {
  const ease = [0.22, 1, 0.36, 1] as const;
  const label = VERTEBRA_LABELS[index];

  return (
    <Html position={[0, 0, 0]} zIndexRange={[30, 0]} style={{ pointerEvents: "none" }}>
      <AnimatePresence onExitComplete={onGone}>
        {visible && (
          <motion.div
            key="tip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            className="flex h-12 -translate-y-1/2 items-center"
          >
            <svg width="84" height="48" viewBox="0 0 84 48" className="shrink-0 overflow-visible">
              {!reduce && (
                <motion.circle
                  cx="8"
                  cy="24"
                  r="7"
                  fill="none"
                  stroke="var(--color-gold-500)"
                  strokeWidth="1"
                  style={{ transformOrigin: "8px 24px" }}
                  animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <motion.circle
                cx="8"
                cy="24"
                r="3.5"
                fill="var(--color-gold-500)"
                style={{ transformOrigin: "8px 24px" }}
                initial={reduce ? { opacity: 0 } : { scale: 0 }}
                animate={reduce ? { opacity: 1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              />
              <motion.line
                x1="8"
                y1="24"
                x2="80"
                y2="24"
                stroke="var(--color-gold-500)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.08, ease }}
              />
            </svg>
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: reduce ? 0 : 0.26, ease }}
              className="flex items-baseline gap-2 whitespace-nowrap rounded-full border border-olive-900/10 bg-cream/95 py-1.5 pl-3.5 pr-4 shadow-lg shadow-olive-900/15 backdrop-blur-sm"
            >
              <span className="font-display text-sm font-semibold text-olive-700">
                {label.code}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft">
                {label.name}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  );
}

function Spine({ reduce }: { reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const vertebrae = useRef<(THREE.Group | null)[]>([]);
  const materials = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);
  const specs = useMemo(() => buildSpine(), []);

  const [hovered, setHovered] = useState<number | null>(null);
  // The tooltip stays mounted while its exit animation plays (state
  // adjustment during render, instead of a setState-only effect).
  const [tip, setTip] = useState<number | null>(null);
  if (hovered !== null && tip !== hovered) setTip(hovered);

  useEffect(() => {
    if (hovered === null) return;
    document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  // Rotation angle with a damped speed so the column gently brakes while the
  // visitor inspects a vertebra and resumes afterwards.
  const angle = useRef(0);
  const speed = useRef(1);

  useFrame((state, delta) => {
    // Hover glow runs even under reduced motion (it is state, not decoration).
    for (let i = 0; i < specs.length; i++) {
      const m = materials.current[i];
      if (!m) continue;
      m.emissiveIntensity = THREE.MathUtils.lerp(
        m.emissiveIntensity,
        hovered === i ? 0.35 : 0,
        Math.min(1, delta * 8),
      );
    }

    if (!group.current || reduce) return;
    const t = state.clock.elapsedTime;
    speed.current = THREE.MathUtils.lerp(
      speed.current,
      hovered === null ? 1 : 0.08,
      Math.min(1, delta * 4),
    );
    angle.current += delta * 0.11 * speed.current;
    group.current.rotation.y = angle.current;
    group.current.rotation.z = Math.sin(t * 0.35) * 0.018;
    // A gentle wave travelling up the column — movement, breath.
    for (let i = 0; i < specs.length; i++) {
      const g = vertebrae.current[i];
      if (!g) continue;
      g.rotation.z = Math.sin(t * 1.1 - i * 0.5) * 0.022;
      g.position.x = specs[i].position.x + Math.sin(t * 0.7 - i * 0.42) * 0.012;
    }
  });

  return (
    <Float
      speed={reduce ? 0 : 1}
      rotationIntensity={0}
      floatIntensity={reduce ? 0 : 0.4}
      floatingRange={[-0.04, 0.04]}
    >
      {/* Escala para que toda la columna quepa con margen dentro del encuadre. */}
      <group ref={group} scale={0.6}>
        {specs.map((s, i) => (
          <group key={i}>
            <group
              ref={(el) => {
                vertebrae.current[i] = el;
              }}
              position={s.position}
              quaternion={s.quaternion}
            >
              <mesh
                geometry={s.geometry}
                rotation={[0, s.rotY, 0]}
                scale={[1, 1, 0.86]}
                castShadow
                receiveShadow
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHovered(i);
                }}
                onPointerOut={() => {
                  setHovered((h) => (h === i ? null : h));
                }}
              >
                <meshPhysicalMaterial
                  ref={(el) => {
                    materials.current[i] = el;
                  }}
                  color={s.color}
                  emissive={s.color}
                  emissiveIntensity={0}
                  roughness={0.34}
                  metalness={0.05}
                  clearcoat={0.85}
                  clearcoatRoughness={0.32}
                  sheen={0.4}
                  sheenColor={"#e3e9d2"}
                />
              </mesh>
              {tip === i && (
                <VertebraTooltip
                  index={i}
                  visible={hovered === i}
                  reduce={reduce}
                  onGone={() => setTip(null)}
                />
              )}
            </group>
            {s.disc && (
              <mesh
                position={s.disc.position}
                quaternion={s.disc.quaternion}
                scale={s.disc.scale}
                castShadow
              >
                <sphereGeometry args={[1, 48, 24]} />
                <meshPhysicalMaterial
                  color="#bf9b5f"
                  roughness={0.32}
                  metalness={0.85}
                  clearcoat={0.5}
                />
              </mesh>
            )}
          </group>
        ))}
      </group>
    </Float>
  );
}

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return (
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function SpineCanvas() {
  const reduce = useReducedMotion() ?? false;
  const supported = useMemo(() => webglAvailable(), []);

  if (!supported) {
    return (
      <Image
        src="/img/hero-home.webp"
        alt="Interior de la clínica MUV"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="!absolute inset-0 rounded-[2rem] object-cover"
      />
    );
  }

  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.15, 8.2], fov: 30 }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={1.9}
          color="#fff7e8"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0004}
        />
        <directionalLight position={[-5, 3, -4]} intensity={1.1} color="#d9e4c0" />

        <Spine reduce={reduce} />

        <ContactShadows
          position={[0, -1.9, 0]}
          opacity={0.3}
          scale={6}
          blur={2.8}
          far={4}
          color="#20251a"
        />

        <Environment resolution={256}>
          <Lightformer intensity={1.5} position={[3, 3, 4]} scale={[6, 6, 1]} color="#fbf6ea" />
          <Lightformer intensity={0.8} position={[-4, 1, 2]} scale={[4, 6, 1]} color="#ddc89f" />
          <Lightformer intensity={0.7} position={[0, -3, 2]} scale={[6, 3, 1]} color="#c6d2a6" />
        </Environment>

        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          enableDamping
          autoRotate={false}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI * 0.36}
          maxPolarAngle={Math.PI * 0.62}
        />
      </Suspense>
    </Canvas>
  );
}
