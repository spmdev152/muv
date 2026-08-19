"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
  Html,
  Lightformer,
} from "@react-three/drei";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
   gentle concave waist — la silueta de un cuerpo vertebral leída como canto
   rodado. A whisper of spectral noise keeps it organic instead of CAD-perfect. */
function makeVertebra(radius: number, height: number, seed: number) {
  const rand = makeRng(seed + 1);
  // El perfil varía canto a canto: unos más achatados, otros más redondeados,
  // como piedras de río escogidas a mano. Un apilado de clones no se lee como
  // algo natural por muy buena que sea la superficie.
  const P = 2.9 + rand() * 1.4; // superellipse exponent: flat top, rounded rim
  const WAIST = 0.09 + rand() * 0.1; // concavity at the equator
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
  const BUMP = 0.022;
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

/* ---------- Superficie de piedra procedural ----------
   Dos mapas cocinados en CPU, sin assets que descargar: un normal map de grano
   fino (la piedra deja de leerse como plástico) y un roughness map moteado (el
   reflejo se rompe en zonas mate y satinadas en vez de ser un brillo uniforme).
   Ahí está el 90% del "esto es un canto rodado". */

// Ruido de valor teselable: la retícula se envuelve, así que el mapa repite sin
// costura por mucho que se azulejee sobre el torno.
function makeTileNoise(seed: number, period: number) {
  const rand = makeRng(seed);
  const lattice = new Float32Array(period * period);
  for (let i = 0; i < lattice.length; i++) lattice[i] = rand();
  const fade = (t: number) => t * t * (3 - 2 * t);

  return (x: number, y: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const x0 = ((xi % period) + period) % period;
    const y0 = ((yi % period) + period) % period;
    const x1 = (x0 + 1) % period;
    const y1 = (y0 + 1) % period;
    const u = fade(x - xi);
    const v = fade(y - yi);
    const a = lattice[y0 * period + x0];
    const b = lattice[y0 * period + x1];
    const c = lattice[y1 * period + x0];
    const d = lattice[y1 * period + x1];
    return (a + (b - a) * u) * (1 - v) + (c + (d - c) * u) * v;
  };
}

// fBm teselable: cada octava dobla el periodo, así que todas envuelven a la vez.
function makeFbm(seed: number, base: number, octaves: number) {
  const layers: { noise: (x: number, y: number) => number; p: number }[] = [];
  for (let k = 0; k < octaves; k++) {
    layers.push({ noise: makeTileNoise(seed + k * 37, base * (1 << k)), p: base * (1 << k) });
  }
  return (u: number, v: number) => {
    let sum = 0;
    let amp = 1;
    let norm = 0;
    for (const l of layers) {
      sum += amp * l.noise(u * l.p, v * l.p);
      norm += amp;
      amp *= 0.5;
    }
    return sum / norm;
  };
}

function makeStoneMaps(size: number) {
  const grain = makeFbm(101, 6, 4); // relieve fino → normal map
  const mottle = makeFbm(457, 2, 3); // manchas amplias → roughness map

  const height = new Float32Array(size * size);
  const roughData = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x;
      const h = grain(x / size, y / size);
      height[i] = h;
      // Mate de base con parches algo más satinados, más un punto del propio
      // grano para que el brillo no sea plano dentro de cada mancha.
      const r = THREE.MathUtils.clamp(0.6 + 0.36 * mottle(x / size, y / size) + 0.08 * (h - 0.5), 0, 1);
      const b = Math.round(r * 255);
      roughData[i * 4] = b;
      roughData[i * 4 + 1] = b; // three lee rugosidad del canal verde
      roughData[i * 4 + 2] = b;
      roughData[i * 4 + 3] = 255;
    }
  }

  // Normal map por diferencias centrales del relieve, con índices envueltos
  // para no romper la teselabilidad en los bordes.
  const normalData = new Uint8Array(size * size * 4);
  const SLOPE = size * 0.045;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const xm = (x - 1 + size) % size;
      const xp = (x + 1) % size;
      const ym = (y - 1 + size) % size;
      const yp = (y + 1) % size;
      const dx = (height[y * size + xp] - height[y * size + xm]) * SLOPE;
      const dy = (height[yp * size + x] - height[ym * size + x]) * SLOPE;
      const len = Math.hypot(dx, dy, 1);
      const i4 = (y * size + x) * 4;
      normalData[i4] = Math.round(((-dx / len) * 0.5 + 0.5) * 255);
      normalData[i4 + 1] = Math.round(((-dy / len) * 0.5 + 0.5) * 255);
      normalData[i4 + 2] = Math.round(((1 / len) * 0.5 + 0.5) * 255);
      normalData[i4 + 3] = 255;
    }
  }

  const build = (data: Uint8Array) => {
    const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 3);
    // DataTexture nace con filtrado Nearest: sin esto el grano sale pixelado.
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.generateMipmaps = true;
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    return tex;
  };

  return { normal: build(normalData), roughness: build(roughData) };
}

// Relieve contenido: se busca el tacto del canto, no una lija.
const NORMAL_SCALE = new THREE.Vector2(0.45, 0.45);

/* ---------- Spine layout ----------
   12 stylized vertebrae tapering upward (lumbar → cervical), threaded along
   the natural S-curve of a spine seen in profile: lumbar lordosis, thoracic
   kyphosis, a hint of cervical lordosis. Thin gold lenses stand in for the
   intervertebral discs. */
const COUNT = 12;

/* La curva en S vive en el plano YZ, así que de frente (cámara en +Z) se ve
   escorzada y la columna no se reconoce. Girando el grupo un cuarto de vuelta
   el eje Z local cae sobre la horizontal de pantalla: arranca de perfil, con
   la lordosis lumbar hacia la derecha, y desde ahí sigue girando despacio. */
const PROFILE_VIEW_Y = Math.PI / 2;

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
    // El hueco entre cuerpos vertebrales es constante en toda la columna: las
    // cervicales son más pequeñas, pero no deben verse pegadas entre sí.
    discHeights.push(0.18);
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
    // getPointAt (no getPoint): reparametrizado por longitud de arco. Con el
    // parámetro crudo los tramos superiores de la curva —más cortos en Y— se
    // comprimían y amontonaban las cervicales.
    const position = curve.getPointAt(u);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      UP,
      curve.getTangentAt(u).normalize(),
    );

    let disc: VertebraSpec["disc"] = null;
    if (i < COUNT - 1) {
      const ud = (ys[i] + heights[i] / 2 + discHeights[i] / 2 - yMin) / total;
      const r = Math.min(radii[i], radii[i + 1]) * 0.8;
      disc = {
        position: curve.getPointAt(ud),
        quaternion: new THREE.Quaternion().setFromUnitVectors(
          UP,
          curve.getTangentAt(ud).normalize(),
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

/**
 * La pose de apertura tiene que ser reproducible al pixel: es la que se
 * congela en `hero-spine.webp` y la que el visitante ve al fundirse el póster.
 *
 * `animate` es lo que la mantiene quieta. Mientras el póster se desvanece la
 * columna renderiza siempre el mismo fotograma —el de `t = 0`— y no arranca
 * hasta que el relevo ha terminado. Así el movimiento empieza después del
 * cambio de imagen y no durante, que es lo que lo hacía visible.
 */
function Spine({ reduce, animate }: { reduce: boolean; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const vertebrae = useRef<(THREE.Group | null)[]>([]);
  const materials = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);
  const specs = useMemo(() => buildSpine(), []);
  const maps = useMemo(() => makeStoneMaps(256), []);
  useEffect(() => {
    return () => {
      maps.normal.dispose();
      maps.roughness.dispose();
    };
  }, [maps]);

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

  // Ángulo con velocidad amortiguada: la columna frena mientras el visitante
  // inspecciona una vértebra y luego recupera el ritmo.
  const angle = useRef(PROFILE_VIEW_Y);
  const speed = useRef(1);
  /*
    Tiempo propio, acumulado a partir del primer frame pintado, en lugar de
    `state.clock.elapsedTime`, que empieza a contar cuando se crea el canvas.
    Con el reloj del canvas el primer frame caía en un `t` distinto en cada
    carga (según lo que hubiese tardado en compilar los shaders), y con él la
    pose. El delta se recorta para que una pestaña que vuelve del segundo plano
    no dé un salto.
  */
  const time = useRef(0);

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

    // La pose se aplica con el tiempo actual y solo después se avanza: así el
    // primer frame es exactamente `t = 0`.
    const t = time.current;
    group.current.rotation.y = angle.current;
    group.current.rotation.z = Math.sin(t * 0.35) * 0.018;
    // Balanceo vertical lento. Lo hacía `<Float>` de drei, que arranca con una
    // fase aleatoria (`Math.random() * 10000`): la columna aparecía a una
    // altura distinta en cada carga y el póster nunca podía cuadrar. Misma
    // amplitud (±0,016) y mismo periodo que tenía allí.
    group.current.position.y = Math.sin(t * 0.25) * 0.016;
    // A gentle wave travelling up the column — movement, breath.
    for (let i = 0; i < specs.length; i++) {
      const g = vertebrae.current[i];
      if (!g) continue;
      g.rotation.z = Math.sin(t * 1.1 - i * 0.5) * 0.022;
      g.position.x = specs[i].position.x + Math.sin(t * 0.7 - i * 0.42) * 0.012;
    }

    if (!animate) return;
    speed.current = THREE.MathUtils.lerp(
      speed.current,
      hovered === null ? 1 : 0.08,
      Math.min(1, delta * 4),
    );
    const step = Math.min(delta, 1 / 30);
    angle.current += step * 0.11 * speed.current;
    time.current += step;
  });

  return (
    // Escala para que toda la columna quepa con margen dentro del encuadre.
      <group ref={group} scale={0.6} rotation={[0, PROFILE_VIEW_Y, 0]}>
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
                  normalMap={maps.normal}
                  normalScale={NORMAL_SCALE}
                  // El roughnessMap multiplica: con base 0.95 el acabado final
                  // recorre 0.57–0.82, de satinado suave a mate polvoriento.
                  roughnessMap={maps.roughness}
                  roughness={0.95}
                  metalness={0}
                  // Barniz tenue y muy difuso: el brillo blando de una piedra de
                  // spa. El clearcoat alto de antes la volvía cerámica esmaltada.
                  clearcoat={0.16}
                  clearcoatRoughness={0.7}
                  sheen={0.5}
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
                {/* Mate, y liso a propósito: sin mapas, el contraste entre el
                    grano del canto y esta banda pulida es lo que sigue haciendo
                    legible el apilado. Si se textura también, todo se empasta.
                    Arena apagada, no dorado: sin metalness el color deja de
                    teñir solo el reflejo y pasa a cubrir toda la pieza como
                    difuso, así que hay que bajarle el croma a la mitad
                    (0.042 en OKLCh, frente a 0.089 del dorado de marca) o el
                    disco se va a amarillo. Separa por claridad —queda por
                    encima del canto más claro— en vez de por tono. */}
                <meshPhysicalMaterial
                  color="#cdbfa2"
                  roughness={0.78}
                  metalness={0}
                  sheen={0.3}
                  sheenColor={"#f2ece0"}
                />
              </mesh>
            )}
          </group>
        ))}
      </group>
  );
}

/**
 * Avisa cuando la escena ya ha pintado. `useFrame` corre antes del render del
 * frame, así que en la segunda llamada el primer frame está en pantalla y el
 * póster del hero puede desvanecerse sin dejar un hueco a medio dibujar.
 */
function PaintProbe({ onPainted }: { onPainted: () => void }) {
  const frames = useRef(0);
  useFrame(() => {
    frames.current += 1;
    if (frames.current === 2) onPainted();
  });
  return null;
}

/**
 * Columna 3D del hero. `HeroFigure` es quien decide si se monta (viewport
 * ancho, sin `prefers-reduced-motion` y con GPU real): aquí ya se da por hecho
 * que WebGL merece la pena.
 *
 * `animate` llega en false y no pasa a true hasta que el póster ha acabado de
 * desvanecerse, para que el relevo ocurra sobre una figura quieta.
 */
export default function SpineCanvas({
  onPainted,
  animate,
}: {
  onPainted: () => void;
  animate: boolean;
}) {
  const reduce = useReducedMotion() ?? false;
  const host = useRef<HTMLDivElement>(null);
  // Sin esto el bucle de render seguía girando la columna con el hero fuera de
  // pantalla o la pestaña en segundo plano: GPU y batería a cambio de nada.
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let visible = !document.hidden;
    let inView = true;
    const sync = () => setRunning(visible && inView);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { rootMargin: "120px" },
    );
    observer.observe(el);

    const onVisibility = () => {
      visible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={host} className="absolute inset-0" aria-hidden="true">
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        // Por encima de 1.5x no se distingue la piedra y el coste por píxel
        // crece al cuadrado.
        dpr={[1, 1.5]}
        frameloop={running ? "always" : "never"}
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
            shadow-mapSize={[512, 512]}
            shadow-bias={-0.0004}
          />
          <directionalLight position={[-5, 3, -4]} intensity={1.1} color="#d9e4c0" />

          <Spine reduce={reduce} animate={animate} />

          {/* `frames={1}`: la sombra de contacto se cocina una vez. Con blur 2.8
              la silueta congelada es indistinguible y deja de costar una pasada
              de profundidad en cada frame. */}
          <ContactShadows
            position={[0, -1.9, 0]}
            opacity={0.3}
            scale={6}
            blur={2.8}
            far={4}
            frames={1}
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

          <PaintProbe onPainted={onPainted} />
        </Suspense>
      </Canvas>
    </div>
  );
}
