import Link from "next/link";
import {
  LegalDocument,
  LegalSection,
  Pending,
  legalMetadata,
} from "@/components/sections/LegalDocument";
import { legal } from "@/lib/legal";
import { fullAddress, locations } from "@/lib/locations";
import { site } from "@/lib/site";

export const metadata = legalMetadata({
  title: "Aviso legal",
  description:
    "Datos del titular de clinicamuv.com, información sobre la actividad sanitaria de MUV y condiciones de uso del sitio web.",
  path: "/aviso-legal",
});

export default function AvisoLegalPage() {
  return (
    <LegalDocument
      title="Aviso legal"
      description="Quién está detrás de este sitio web y en qué condiciones puede usarlo."
      path="/aviso-legal"
    >
      <LegalSection title="Titular del sitio web">
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la
          sociedad de la información y de comercio electrónico (LSSI-CE), le
          informamos de que el sitio web {site.url.replace("https://", "")} es
          titularidad de:
        </p>
        <ul>
          <li>
            <strong>Titular:</strong>{" "}
            {legal.owner ?? <Pending label="razón social" />}
          </li>
          <li>
            <strong>NIF:</strong> {legal.taxId ?? <Pending label="NIF o CIF" />}
          </li>
          <li>
            <strong>Domicilio:</strong>{" "}
            {legal.registeredAddress ?? <Pending label="domicilio social" />}
          </li>
          <li>
            <strong>Datos registrales:</strong>{" "}
            {legal.commercialRegistry ?? (
              <Pending label="inscripción en el Registro Mercantil, si es una sociedad" />
            )}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Actividad sanitaria">
        <p>
          MUV presta servicios de fisioterapia en dos centros sanitarios
          autorizados e inscritos en el Registro de Centros, Servicios y
          Establecimientos Sanitarios de la Comunidad de Madrid:
        </p>
        <ul>
          {locations.map((location) => (
            <li key={location.slug}>
              <strong>{location.name}</strong>: {fullAddress(location)}.
              {location.healthRegistry &&
                ` Nº de registro ${location.healthRegistry}.`}
            </li>
          ))}
        </ul>
        <p>
          La fisioterapia es una profesión sanitaria regulada (Ley 44/2003, de
          ordenación de las profesiones sanitarias). Los fisioterapeutas de MUV
          tienen el título oficial de Grado o Diplomatura en Fisioterapia
          expedido o reconocido en España y están colegiados en el{" "}
          <a
            href={legal.professionalBody.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {legal.professionalBody.name}
          </a>
          , cuyo Código Deontológico rige su ejercicio. Los responsables de cada
          clínica y su número de colegiado figuran en{" "}
          <Link href="/profesionales">Profesionales</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Condiciones de uso">
        <p>
          El acceso a este sitio web es gratuito y supone la aceptación de estas
          condiciones. La persona usuaria se compromete a hacer un uso adecuado
          de los contenidos y a no emplearlos para actividades ilícitas o
          contrarias a la buena fe.
        </p>
        <p>
          Los contenidos de salud tienen una finalidad divulgativa y no
          sustituyen la valoración, el diagnóstico ni el tratamiento de un
          profesional sanitario. Puede consultar cómo los elaboramos en nuestra{" "}
          <Link href="/politica-editorial">política editorial</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Reserva de citas y enlaces externos">
        <p>
          Las citas se reservan en Doctoralia, una plataforma de un tercero con
          sus propias condiciones y política de privacidad. Este sitio enlaza
          también a WhatsApp, Google Maps y otros servicios externos. MUV no
          controla esos sitios y no responde de sus contenidos ni de su
          disponibilidad.
        </p>
      </LegalSection>

      <LegalSection title="Propiedad intelectual e industrial">
        <p>
          Los textos, fotografías, logotipos, diseño y código de este sitio web
          pertenecen a su titular o a terceros que han autorizado su uso. Queda
          prohibida su reproducción, distribución o transformación sin
          autorización expresa, salvo para uso personal y privado.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilidad">
        <p>
          MUV procura que la información de este sitio sea exacta y esté
          actualizada, y la corrige en cuanto detecta un error. No se hace
          responsable de los daños derivados de interrupciones del servicio,
          virus o fallos técnicos ajenos a su control.
        </p>
      </LegalSection>

      <LegalSection title="Protección de datos y cookies">
        <p>
          El tratamiento de sus datos personales se explica en la{" "}
          <Link href="/politica-de-privacidad">política de privacidad</Link>, y
          el uso de cookies, en la{" "}
          <Link href="/politica-de-cookies">política de cookies</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Legislación aplicable">
        <p>
          Estas condiciones se rigen por la legislación española. Para cualquier
          controversia serán competentes los juzgados y tribunales de Madrid,
          salvo que la normativa de consumidores establezca otro fuero.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
