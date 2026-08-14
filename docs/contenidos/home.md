# HOME — versión 7 *(cerrada)*

*La v7, del 14 de agosto de 2026, **no cambia ni una palabra del texto publicable**: sigue en 747 palabras. Corrige dos afirmaciones sobre la competencia que estaban en las justificaciones y que resultaron falsas al recomprobar los dominios uno a uno —«ninguno marca `FAQPage`»: lo marca Impulso—. Se corrigen aquí porque son datos que hay que poder defender delante del cliente, no porque afecten al contenido.*

*La v6 se había reabierto para un único cambio: el H2 del módulo 8 incumplía el vocabulario que MUV marcó en el bloque 1 del documento de arranque.*

- **URL:** `/`
- **Keyword principal:** Clínica MUV *(marca)*
- **Keywords de apoyo:** clínica de fisioterapia, fisioterapia, ejercicio terapéutico, fisioterapia deportiva
- **Entidades geográficas:** Madrid, El Cañaveral (Vicálvaro), Tres Cantos — como entidades, no como keywords objetivo
- **Extensión:** 747 palabras
- **Trato:** usted · **Voz:** «En MUV…» (nosotros) · **Precios:** no se publican
- **Estructura:** 11 módulos, mapeados contra `src/app/page.tsx`

**Title SEO** (60 caracteres)
`Clínica MUV | Fisioterapia y ejercicio terapéutico en Madrid`

**Meta description** (149 caracteres)
`Clínica de fisioterapia, fisioterapia deportiva y ejercicio terapéutico en El Cañaveral y Tres Cantos. Centro sanitario registrado. Pida cita en MUV.`

---

## Módulo 1 · `HomeHero`

**H1**
> Valoramos antes de tratar. Fisioterapia y ejercicio terapéutico en Madrid.

**Entradilla**
> Combinamos fisioterapia, terapia manual y ejercicio terapéutico según lo que necesita cada caso, siempre a partir de una valoración clínica. Dos clínicas en El Cañaveral y Tres Cantos.

**Botones**
> `[Pedir cita]` *(abre el selector de sede)* · `[Ver nuestros servicios]` → `/servicios`

*La marca sale del H1 porque ya está en el logo, en el title, en el `name` del schema y en tres H2. El espacio se invierte en el diferencial.*

---

## Módulo 2 · Franja de confianza `[NUEVO — añadir]`

Tira compacta de cuatro datos, sin titular. Es el único bloque que aporta señales E-E-A-T en toda la home y ocupa una línea.

> **Centro sanitario registrado** · CS 17623 `[PENDIENTE MUV: registro de Tres Cantos]`
> **Equipo colegiado** · fisioterapeutas con número de colegiado público → enlaza a `/profesionales`
> **Más de 5 años** atendiendo en la Comunidad de Madrid
> **Dos clínicas** · El Cañaveral y Tres Cantos → enlaza a `/sedes`

---

## Módulo 3 · Pilares *(3 tarjetas)*

**Eyebrow:** Nuestra forma de trabajar
**H2**
> Una clínica de fisioterapia eficaz, eficiente y empática

**Tarjeta 1 — Eficaces**
> Buscamos el origen del problema con una valoración fisioterápica rigurosa y tratamientos respaldados por la evidencia disponible.

**Tarjeta 2 — Eficientes**
> Elegimos las técnicas y la tecnología que tienen sentido en cada fase, no todas las que tenemos. Menos sesiones innecesarias.

**Tarjeta 3 — Empáticos**
> Le explicamos qué observamos y por qué proponemos cada abordaje. Entender el propio proceso forma parte del tratamiento.

---

## Módulo 4 · Servicios destacados *(6 tarjetas + botón)*

**Eyebrow:** Servicios
**H2**
> Servicios de fisioterapia y ejercicio terapéutico

**Descripción**
> Trabajamos la fisioterapia musculoesquelética y deportiva, el ejercicio pautado y las técnicas específicas que cada proceso requiere.

**Las seis tarjetas** — una línea de contexto y una etiqueta de disponibilidad cada una, enlazando a su página de servicio:

| Servicio | Línea de contexto | Etiqueta de sede |
|---|---|---|
| **Fisioterapia** | Valoración y tratamiento manual e instrumental para recuperar el movimiento. | Ambas sedes |
| **Fisioterapia deportiva** | Recuperación y readaptación al gesto deportivo, del aficionado al federado. | Ambas sedes |
| **Entrenamiento terapéutico** | Ejercicio pautado y supervisado por fisioterapeutas, individual o en grupo. | Ambas sedes · grupal solo en Tres Cantos |
| **Neuromodulación** | Tecnología ecoguiada para modular el sistema nervioso en el dolor persistente. | Ambas sedes |
| **Suelo pélvico** | Prevención y tratamiento de las disfunciones del suelo pélvico. | Solo El Cañaveral |
| **Pilates terapéutico** | Control, estabilidad y conciencia corporal con enfoque clínico. | Solo El Cañaveral |

> `[Ver todos los servicios]` → `/servicios`

*Criterio de selección: los cuatro priorizados por MUV en la oleada 2 del documento de arranque (fisioterapia, deportiva, suelo pélvico, entrenamiento terapéutico) más neuromodulación y Pilates, que son los dos diferenciadores de equipamiento.*

---

## Módulo 5 · Dolencias y lesiones `[NUEVO — añadir]` *(4 tarjetas + botón)*

**Eyebrow:** Dolencias y lesiones
**H2**
> Dolencias y lesiones que tratamos

**Descripción**
> Si no sabe qué servicio necesita, empiece por lo que le pasa. Valoramos el origen de la molestia y le proponemos el abordaje desde ahí.

**Las cuatro tarjetas** — enlazando a su página de dolencia:

| Dolencia | Línea de contexto |
|---|---|
| **Dolor de espalda** | Dolor lumbar, cervical o dorsal, reciente o de larga evolución. |
| **Lesión de rodilla** | Dolor y limitación de rodilla, con readaptación progresiva a su actividad. |
| **Lesión de hombro** | Dolor de hombro y pérdida de movilidad o de fuerza. |
| **ATM** | Dolor mandibular, chasquidos y limitación al abrir la boca. |

> `[Ver todas las dolencias]` → `/dolencias-y-lesiones`

*Son las cuatro que existen en `content/conditions/`, así que no hay selección que hacer: van todas. Puede reutilizar el mismo `ServiceCard` del módulo 4, porque el frontmatter tiene la misma forma.*

---

## Módulo 6 · Metodología *(4 pasos + botón)*

**Eyebrow:** Metodología MUV
**H2**
> Cómo trabajamos: de la valoración fisioterápica al alta

**01 · Valoración**
> Exploramos el movimiento y la función, y fijamos un punto de partida medible.

**02 · Plan de tratamiento**
> Objetivos concretos y las herramientas adecuadas para su caso, no un protocolo cerrado.

**03 · Tratamiento**
> Terapia manual, técnicas específicas y ejercicio terapéutico, ajustados según evoluciona.

**04 · Alta y prevención**
> Pautas para sostener lo conseguido y reducir el riesgo de recaída.

> `[Conocer nuestra metodología]` → `/sobre-nosotros/metodologia`

---

## Módulo 7 · Sedes *(2 tarjetas)*

**Eyebrow:** Sedes
**H2**
> Nuestras clínicas de fisioterapia en El Cañaveral y Tres Cantos

**Descripción**
> Cada clínica tiene su equipo y su cartera de servicios. En su página encontrará los tratamientos disponibles allí, quién le atiende y cómo llegar.

**Tarjeta · MUV El Cañaveral**
> Nuestra cartera más amplia: fisioterapia general y deportiva, entrenamiento terapéutico, Pilates, diatermia, neuromodulación y las áreas de suelo pélvico, embarazo, postparto y pediatría.
> C. Victoria Kent, Local 8 · 28052 Madrid (Vicálvaro)
> Lunes a viernes, 10:00–14:00 y 16:00–22:00 · Sábados, 10:00–14:00
> `[Ver MUV El Cañaveral]`

**Tarjeta · MUV Tres Cantos**
> Enfoque musculoesquelético y deportivo con progresión mediante ejercicio: fisioterapia general y deportiva, entrenamiento terapéutico individual y grupal, neuromodulación y tratamiento de cicatrices.
> Av. de Madrid, 19, Local 5 · 28760 Tres Cantos
> Lunes a viernes, 10:00–14:00 y 16:00–22:00 · Sábados, 10:00–14:00
> `[Ver MUV Tres Cantos]`

*Los teléfonos no se incluyen todavía: el número del repositorio y el de Doctoralia no coinciden en ninguna de las dos sedes. En cuanto MUV confirme cuál es el bueno, van aquí — son señal local y punto de contacto directo.*

---

## Módulo 8 · Testimonios *(3)*

**Eyebrow:** Opiniones
**H2**
> Opiniones sobre Clínica MUV

`[PENDIENTE MUV: tres testimonios reales anonimizados, marcados como «sí, anonimizados» en el bloque 1 del documento de arranque. No se inventan.]`

*Aviso: los testimonios del boceto atribuyen embarazo y postparto a Tres Cantos, sede donde no se prestan según el catálogo aprobado. No reutilizarlos.*

---

## Módulo 9 · Preguntas frecuentes *(marcar con schema `FAQPage`)*

**Eyebrow:** Preguntas frecuentes
**H2**
> Preguntas frecuentes sobre fisioterapia en MUV

**¿Necesito una derivación médica para ir al fisioterapeuta?**
> No. Puede pedir cita directamente y empezaremos por una valoración fisioterápica completa. Si detectamos que su caso requiere otra valoración sanitaria, se lo indicaremos.

**¿Cuánto dura la primera sesión de fisioterapia?**
> La valoración inicial dura unos 50 minutos, tiempo suficiente para explorar el caso y plantear un plan de tratamiento.

**¿Qué diferencia hay entre fisioterapia y ejercicio terapéutico?**
> La fisioterapia abarca la valoración y el tratamiento manual e instrumental. El ejercicio terapéutico es ejercicio pautado y supervisado para recuperar fuerza, movilidad y tolerancia a la carga. En la mayoría de procesos se combinan.

**¿Cuántas sesiones de fisioterapia voy a necesitar?**
> Depende del caso, del tiempo de evolución y del objetivo. Tras la valoración inicial le daremos un rango orientativo y lo revisaremos según evolucione. No cerramos un número antes de explorar.

**¿Están todos los servicios en las dos clínicas?**
> No. Cada sede tiene su propia cartera y cada servicio indica dónde se presta. Puede compararlas en la [página de sedes](/sedes).

**¿Abren los sábados?**
> Sí. Las dos clínicas abren de lunes a viernes de 10:00 a 14:00 y de 16:00 a 22:00, y los sábados de 10:00 a 14:00.

---

## Módulo 10 · Blog `[NUEVO — añadir]` *(3 entradas + botón)*

**Eyebrow:** Blog
**H2**
> Divulgación de fisioterapia escrita por nuestro equipo

**Descripción**
> Explicamos lesiones, tratamientos y dudas frecuentes con criterio clínico y sin atajos. Todo lo que publicamos lo firma un fisioterapeuta de MUV.

> Las tres últimas entradas, en tarjeta con título y fecha *(contenido dinámico, no requiere copy fijo)*
> `[Ver todas las entradas]` → `/blog`

*Entra ahora, no más adelante: la home se cierra en esta versión. Centro Vitruvio tiene su bloque de «últimos artículos» en la home y es el líder del mercado. Además le da al blog camino de rastreo desde la página con más autoridad del sitio, y una señal de frescura permanente sin tocar la home nunca más. El «lo firma un fisioterapeuta» es señal E-E-A-T directa en un sitio YMYL: enlaza con `/politica-editorial`, que ya existe.*

---

## Módulo 11 · `CTASection`

**H2**
> Pida cita en El Cañaveral o en Tres Cantos

**Descripción**
> Reserve una primera valoración y definiremos con usted un plan de tratamiento adaptado a su caso.

> `[Pedir cita]` · `[Contactar]` → `/contacto`

---

## Justificación SEO de cada encabezado

| Encabezado | Entidad que captura | Por qué |
|---|---|---|
| **H1** · Valoramos antes de tratar. Fisioterapia y ejercicio terapéutico en Madrid | 2 servicios + geo + diferencial | Responde a la vez «¿es esto lo que busco?» y «¿por qué aquí?». La marca ya está en el logo y en el title. |
| **H2** · Una clínica de fisioterapia eficaz, eficiente y empática | clínica de fisioterapia | Keyword de apoyo dentro del claim de marca que ya existe. |
| **H2** · Servicios de fisioterapia y ejercicio terapéutico | fisioterapia + ejercicio terapéutico | Dos keywords de apoyo encabezando el bloque que reparte enlaces. |
| **H2** · Dolencias y lesiones que tratamos | dolencias y lesiones | Puerta de entrada por síntoma, que es como busca la mayoría. Es la sección con más volumen potencial. |
| **H2** · Cómo trabajamos: de la valoración fisioterápica al alta | valoración fisioterápica | Término clínico con búsqueda propia; refuerza E-E-A-T. |
| **H2** · Nuestras clínicas de fisioterapia en El Cañaveral y Tres Cantos | ambos municipios | Único punto de la home con geografía, sin competir con las páginas de sede. |
| **H2** · Divulgación de fisioterapia escrita por nuestro equipo | fisioterapia + autoría | Señal E-E-A-T: en YMYL Google valora quién firma. Da al blog camino de rastreo desde la home. |
| **H2** · Opiniones sobre Clínica MUV | marca + opiniones | Captura «muv opiniones», búsqueda de marca con intención de decisión. En el bloque 1 del documento de arranque MUV marcó «Persona» y «evitar la etiqueta», y no marcó ni «Paciente» ni «Cliente»: la palabra sale del encabezado. Además apunta mejor a la búsqueda real, porque «pacientes» no aportaba nada. |
| **H2** · Preguntas frecuentes sobre fisioterapia en MUV | fisioterapia + marca | Habilita `FAQPage`. *(Corregido el 14/08/2026: aquí se decía «ninguno de los 12 competidores lo marca». **Es falso** — Impulso, en El Cañaveral, sí lo declara. Lo cierto y comprobado: de trece dominios, solo uno lo marca, y ninguno de los once de Tres Cantos.)* |
| **H2** · Pida cita en El Cañaveral o en Tres Cantos | acción + ambos municipios | Cierra con intención transaccional y refuerza las dos entidades locales. |

**Criterio general:** los diez encabezados llevan entidad. La geografía se concentra en el H1 y dos H2 para no canibalizar `/sedes/<sede>/`, que es donde se compite por «fisioterapia Tres Cantos». La home compite por marca y reparte autoridad.

---

## Enlazado interno de la home

La home es la página que más autoridad reparte. Mapa completo:

| Destino | Desde dónde |
|---|---|
| `/servicios` | Botón del hero + botón «Ver todos los servicios» |
| 6 páginas de servicio | Las seis tarjetas del módulo 4 |
| `/dolencias-y-lesiones` | Botón del módulo 5 |
| 4 páginas de dolencia | Las cuatro tarjetas del módulo 5 |
| `/sedes` | Franja de confianza |
| `/sedes/el-canaveral` y `/sedes/tres-cantos` | Tarjetas del módulo 7 |
| `/profesionales` | Franja de confianza («equipo colegiado») |
| `/sobre-nosotros/metodologia` | Botón del módulo 6 |
| `/blog` | Botón del módulo 10 |
| 3 entradas del blog | Tarjetas del módulo 10 |
| `/politica-editorial` | Enlace de autoría del módulo 10 |
| `/contacto` | Botón del módulo 11 |

**Sin deuda.** Las seis secciones del menú principal —Servicios, Dolencias y lesiones, Sedes, Profesionales, Sobre nosotros y Blog— reciben enlace desde el cuerpo de la home. No queda ninguna huérfana.

---

## Textos alternativos de las imágenes

El ALT es texto indexable y hoy no está definido. Uno por imagen, descriptivo, sin repetir keywords:

| Imagen | ALT |
|---|---|
| Hero | Fisioterapeuta de Clínica MUV durante una sesión de terapia manual |
| Tarjeta · Fisioterapia | Valoración fisioterápica de la movilidad del hombro en camilla |
| Tarjeta · Fisioterapia deportiva | Readaptación al gesto deportivo en la sala de entrenamiento de MUV |
| Tarjeta · Entrenamiento terapéutico | Sesión de ejercicio terapéutico supervisada por un fisioterapeuta |
| Tarjeta · Neuromodulación | Aplicación de neuromodulación ecoguiada en la clínica |
| Tarjeta · Suelo pélvico | Consulta de fisioterapia de suelo pélvico en MUV El Cañaveral |
| Tarjeta · Pilates terapéutico | Ejercicio de Pilates terapéutico con máquina en MUV El Cañaveral |
| Tarjeta · Dolor de espalda | Exploración de la columna lumbar en consulta de fisioterapia |
| Tarjeta · Lesión de rodilla | Valoración de la movilidad de la rodilla en camilla |
| Tarjeta · Lesión de hombro | Exploración del hombro por un fisioterapeuta de MUV |
| Tarjeta · ATM | Tratamiento de la articulación temporomandibular en consulta |
| Metodología (`about.webp`) | Equipo de fisioterapeutas de Clínica MUV en consulta |
| Sede El Cañaveral | Interior de la clínica MUV El Cañaveral, en Vicálvaro |
| Sede Tres Cantos | Interior de la clínica MUV Tres Cantos |

---

## Datos estructurados

*__Recomprobado el 14 de agosto de 2026 descargando el HTML de trece dominios.__ Lo que se afirmaba aquí —«ninguno declara schema de negocio sanitario ni marca sus FAQ»— era cierto a medias. **Sigue siendo cierto** que ninguno declara `MedicalClinic`, `LocalBusiness` ni `Physiotherapy`: cero de trece, y ahí la diferenciación es real. **Ya no es cierto** de `FAQPage`: Impulso, en El Cañaveral, lo declara. Sigue sin declararlo ninguna de las once clínicas de Tres Cantos.*

- **`Organization`** en la home, con `name`, `logo`, `url` y **`sameAs`** apuntando a las fichas de Doctoralia de las dos sedes, al perfil de Google Business y a las redes. El `sameAs` es lo que consolida la entidad de marca: le dice a Google que la web, las dos fichas de Doctoralia y el perfil de Google son el mismo negocio.
- **`FAQPage`** en el módulo 9, con las seis preguntas.
- **`MedicalClinic`** en cada página de sede, con `address`, `geo`, `telephone`, `openingHoursSpecification` y `medicalSpecialty`. En la home no: la home no es un local físico.

---

## Notas de producción

**Cambio de la v6** *(14 de agosto de 2026)*
1. **H2 del módulo 8:** «Opiniones de pacientes de Clínica MUV» → **«Opiniones sobre Clínica MUV»**. Es el único punto de la home que incumplía el vocabulario marcado por MUV. Comprobado el resto del texto contra las cuatro prohibiciones del documento de arranque —promesas de curación, comparaciones con otras clínicas, cifras de eficacia sin fuente y presentar una valoración fisioterápica como diagnóstico médico—: sin incidencias. La extensión pasa de 749 a 747 palabras.

**Cambios frente a la v4**
1. **H1 híbrido:** «Valoramos antes de tratar. Fisioterapia y ejercicio terapéutico en Madrid.» Sale la marca, entra el diferencial. Entradilla reescrita para no duplicar la frase.
2. **Módulo nuevo de dolencias y lesiones**, con las cuatro tarjetas y botón al listado. Cierra el desajuste entre el peso que le da el menú principal y el que tenía en la home.
3. Fuera la mención a dolencias dentro de la descripción de servicios, ya redundante con el módulo propio.
4. Metodología comprimida: los cuatro pasos ganan al ser más cortos, un módulo de pasos se escanea, no se lee.
5. **Módulo nuevo de blog**, con las tres últimas entradas y firma de autoría. Entra ahora porque la home se cierra en esta versión.
6. Recuperados los horarios en las tarjetas de sede.
7. **Extensión final: 749 palabras**, dentro del límite de 1.200 del documento de arranque y por debajo de Motriz (1.186), la home con más contenido del mercado.

**Pendientes de MUV** *(lo único que impide publicar)*
1. Número de registro sanitario de Tres Cantos.
2. Tres testimonios reales anonimizados.
3. Confirmación del dato de años de recorrido.
4. Qué teléfono es el correcto en cada sede: el del repositorio y el de Doctoralia no coinciden. Hasta entonces no se publican en la home.
5. ¿Se trabaja con mutuas o seguros médicos? Es de las preguntas más buscadas del sector y hoy no la responde nadie de la competencia. Si la respuesta es sí, entra como séptima FAQ.

**Para desarrollo**
- Marcar el bloque de FAQ con schema `FAQPage`.
- Declarar `MedicalClinic` en cada página de sede y `Organization` con `sameAs` en la home.
- Los módulos 2 (franja de confianza), 5 (dolencias) y 10 (blog) no existen todavía en `page.tsx`. El 5 puede reutilizar `ServiceCard` y `getCollection("conditions")`, que devuelve exactamente las cuatro.
- `ServiceCard` no tiene hueco para la etiqueta de sede: solo acepta `href`, `title`, `excerpt` e `image`. Hay que añadirle una prop. El dato ya está en `locations.ts`, así que puede derivarse en vez de escribirse a mano.
- La misma etiqueta sirve para el catálogo de `/servicios`, que hoy pinta las once tarjetas sin indicar disponibilidad.
