import Link from "next/link";
import {
  LegalDocument,
  LegalSection,
  legalMetadata,
} from "@/components/sections/LegalDocument";

export const metadata = legalMetadata({
  title: "Política de cookies",
  description:
    "clinicamuv.com no instala cookies propias. Le explicamos cuándo puede instalarlas Google al cargar un mapa y cómo gestionarlas.",
  path: "/politica-de-cookies",
});

const BROWSERS = [
  { name: "Chrome", url: "https://support.google.com/chrome/answer/95647" },
  {
    name: "Firefox",
    url: "https://support.mozilla.org/es/kb/Borrar%20cookies",
  },
  {
    name: "Safari",
    url: "https://support.apple.com/es-es/guide/safari/sfri11471/mac",
  },
  {
    name: "Edge",
    url: "https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  },
];

export default function PoliticaDeCookiesPage() {
  return (
    <LegalDocument
      title="Política de cookies"
      description="Qué cookies puede encontrar en este sitio web y cómo decidir sobre ellas."
      path="/politica-de-cookies"
    >
      <LegalSection title="Qué son las cookies">
        <p>
          Las cookies son pequeños archivos que un sitio web guarda en su
          navegador para recordar información sobre su visita. Esta política
          cumple el artículo 22.2 de la LSSI-CE y la guía sobre cookies de la
          Agencia Española de Protección de Datos.
        </p>
      </LegalSection>

      <LegalSection title="Cookies propias">
        <p>
          Este sitio web <strong>no instala cookies propias</strong> ni usa
          herramientas de analítica o publicidad que las necesiten. Por eso no
          le mostramos un aviso de cookies al entrar.
        </p>
      </LegalSection>

      <LegalSection title="Cookies de terceros: Google Maps">
        <p>
          En las páginas de cada clínica y de sus servicios puede ver la
          ubicación en un mapa de Google Maps. El mapa no se carga hasta que
          usted pulsa «Cargar el mapa». A partir de ese momento, Google puede
          instalar sus propias cookies (por ejemplo, <code>NID</code>) para que
          el mapa funcione y para sus propios fines, conforme a la{" "}
          <a
            href="https://policies.google.com/technologies/cookies?hl=es"
            target="_blank"
            rel="noopener noreferrer"
          >
            política de cookies de Google
          </a>
          .
        </p>
        <p>
          Si prefiere no cargarlo, el enlace «Abrir en Google Maps» le lleva a
          la ubicación sin que este sitio cargue nada de Google.
        </p>
      </LegalSection>

      <LegalSection title="Enlaces a otros sitios">
        <p>
          Al pulsar «Pedir cita» (Doctoralia) o WhatsApp sale de este sitio web.
          Esas plataformas aplican sus propias políticas de cookies.
        </p>
      </LegalSection>

      <LegalSection title="Cómo gestionar o eliminar cookies">
        <p>
          Puede borrar las cookies o bloquearlas desde la configuración de su
          navegador:
        </p>
        <ul>
          {BROWSERS.map((browser) => (
            <li key={browser.name}>
              <a href={browser.url} target="_blank" rel="noopener noreferrer">
                {browser.name}
              </a>
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="Cambios en esta política">
        <p>
          Si en el futuro incorporamos herramientas que usen cookies, se lo
          pediremos antes de instalarlas y actualizaremos esta política. Para
          cualquier duda sobre sus datos, consulte la{" "}
          <Link href="/politica-de-privacidad">política de privacidad</Link>.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
