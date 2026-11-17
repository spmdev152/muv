import Link from "next/link";
import {
  LegalDocument,
  LegalSection,
  Pending,
  legalMetadata,
} from "@/components/sections/LegalDocument";
import { legal } from "@/lib/legal";

export const metadata = legalMetadata({
  title: "Política de privacidad",
  description:
    "Cómo trata MUV los datos personales de quienes le escriben o le envían su currículum desde clinicamuv.com, y cómo ejercer sus derechos.",
  path: "/politica-de-privacidad",
});

export default function PoliticaDePrivacidadPage() {
  const mail = (
    <a href={`mailto:${legal.privacyEmail}`}>{legal.privacyEmail}</a>
  );

  return (
    <LegalDocument
      title="Política de privacidad"
      description="Qué datos personales tratamos, para qué, durante cuánto tiempo y qué derechos tiene sobre ellos."
      path="/politica-de-privacidad"
    >
      <LegalSection title="Responsable del tratamiento">
        <ul>
          <li>
            <strong>Responsable:</strong>{" "}
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
            <strong>Contacto para protección de datos:</strong> {mail}
          </li>
        </ul>
        <p>
          Esta política cubre los datos que recoge este sitio web. Los datos
          clínicos de los pacientes se tratan en la clínica conforme a su propia
          información de protección de datos, que se entrega en la primera
          visita.
        </p>
      </LegalSection>

      <LegalSection title="Qué datos tratamos y para qué">
        <p>
          <strong>Currículums enviados desde «Trabaje con nosotros».</strong>{" "}
          Nombre, email, teléfono, clínica y puesto que le interesan, número de
          colegiado, el currículum adjunto y el mensaje que escriba. Los usamos
          solo para valorar su perfil en los procesos de selección de MUV y
          contactar con usted si encaja.
        </p>
        <p>
          <strong>Consultas por email, WhatsApp o teléfono.</strong> Los datos
          que nos facilite al escribirnos o llamarnos, para responderle y, si lo
          pide, gestionar su cita.
        </p>
        <p>
          <strong>Navegación.</strong> El servidor registra datos técnicos (como
          la dirección IP y el navegador) para mantener el sitio seguro y
          funcionando. No los usamos para identificarle ni para crear perfiles.
        </p>
        <p>
          Las citas que reserve en Doctoralia las trata Doctoralia conforme a su
          propia política de privacidad.
        </p>
      </LegalSection>

      <LegalSection title="Base legal">
        <ul>
          <li>
            <strong>Currículums:</strong> su consentimiento, que da al marcar la
            casilla del formulario (art. 6.1.a del RGPD).
          </li>
          <li>
            <strong>Consultas y citas:</strong> la aplicación, a petición suya,
            de medidas precontractuales y la prestación del servicio que
            solicita (art. 6.1.b del RGPD).
          </li>
          <li>
            <strong>Datos técnicos de navegación:</strong> el interés legítimo
            en la seguridad del sitio (art. 6.1.f del RGPD).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Cuánto tiempo conservamos los datos">
        <ul>
          <li>
            <strong>Currículums:</strong> {legal.cvRetention}, salvo que retire
            antes su consentimiento. Pasado ese plazo los eliminamos.
          </li>
          <li>
            <strong>Consultas:</strong> el tiempo necesario para responderle y,
            después, durante los plazos legales de prescripción.
          </li>
          <li>
            <strong>Registros técnicos:</strong> un máximo de 30 días.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Destinatarios">
        <p>
          No cedemos sus datos a terceros salvo obligación legal. Para que el
          sitio funcione los tratan, como encargados del tratamiento y con
          contrato, nuestros proveedores de alojamiento web y de correo
          electrónico, situados en la Unión Europea.
        </p>
        <p>
          Si nos escribe por WhatsApp, Meta trata los datos de la conversación
          conforme a sus propias condiciones, y puede transferirlos fuera del
          Espacio Económico Europeo.
        </p>
      </LegalSection>

      <LegalSection title="Sus derechos">
        <p>
          Puede acceder a sus datos, rectificarlos, suprimirlos, oponerse a su
          tratamiento, pedir que se limite, solicitar su portabilidad y retirar
          su consentimiento en cualquier momento, sin que ello afecte a la
          licitud del tratamiento anterior. Escríbanos a {mail} indicando qué
          derecho quiere ejercer.
        </p>
        <p>
          Si considera que no hemos atendido bien su solicitud, puede reclamar
          ante la{" "}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agencia Española de Protección de Datos
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Menores de edad">
        <p>
          El formulario de «Trabaje con nosotros» está dirigido a mayores de 18
          años. Los datos de menores que acuden a consulta los facilitan sus
          padres o tutores legales en la clínica.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Cómo usa este sitio las cookies se explica en la{" "}
          <Link href="/politica-de-cookies">política de cookies</Link>.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
