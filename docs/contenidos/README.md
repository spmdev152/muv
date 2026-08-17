# Contenidos SEO de Clínica MUV — guía para desarrollo

Esta carpeta contiene la copy aprobada de la web. **Es la fuente de la verdad de todo el texto que se publica.** Si un texto del código no coincide con lo que hay aquí, manda este documento.

Última actualización: **17 de agosto de 2026**.

---

# ⛔ Dos cosas que no hay que hacer nunca

**Lee esto aunque no leas nada más.** Son los dos únicos errores de este proyecto que hacen daño de verdad, y los dos se cometen **haciendo algo que parece buen trabajo**. No dan error, no rompen el build y no se ven en una revisión: se notan semanas después, en el buscador.

## 1 · No declarar las valoraciones de Doctoralia como `aggregateRating`

En la copy verás **«158 valoraciones en Doctoralia con una media de 5 sobre 5»** y **«más de 1.800 valoraciones»**. El impulso natural de cualquiera que sepa de schema es marcarlas con `aggregateRating`. **No se hace.**

Esas opiniones están recogidas **en Doctoralia, no en la web de MUV**. Las directrices de Google prohíben marcar como propias las valoraciones obtenidas en otra plataforma. No es una mala práctica discutible: es motivo de **acción manual**, y una acción manual por marcado engañoso **tumba todos los resultados enriquecidos de todo el dominio**, no solo los de esa página. Se pierden las FAQ, la ficha de negocio, los horarios — todo el trabajo de marcado del proyecto de una vez.

- ✅ Se citan **como texto**, nombrando siempre la plataforma.
- ✅ Se vinculan con el **`sameAs`** del `Organization` de la home, apuntando a las dos fichas de Doctoralia. Esa es la forma correcta y además consolida la entidad de marca.
- ❌ `aggregateRating`, `Review` o `ratingValue` con esos datos. Nunca. En ninguna página.

## 2 · No «arreglar» el formato de la dirección, el teléfono ni el horario

La dirección, el teléfono y el horario aparecen repetidos en la home, en `/sedes` y en cada página de sede. **Esa repetición es deliberada.** Se llama NAP —*name, address, phone*— y no es contenido duplicado.

Google cruza esos tres datos entre la web, Google Business Profile y los directorios como Doctoralia para confirmar que un negocio local existe y es el que dice ser. **Tienen que coincidir carácter a carácter en todas partes.**

Lo peligroso es que la tentación es de buen desarrollador: normalizar «Av.» a «Avenida», añadir «Madrid» a una dirección que no lo lleva, unificar el formato de los teléfonos, quitar el «Local 5» porque parece redundante, cambiar `10:00–14:00` por `10:00 - 14:00`. **Cualquiera de esas mejoras degrada la señal local que este proyecto existe para arreglar.**

- ✅ Copiar el dato **tal cual** está en `locations.ts` y en la copy.
- ✅ Si hay que cambiar un formato, se cambia **a la vez** en la web, en Google Business Profile y en Doctoralia.
- ❌ Reformatear, abreviar, completar o «limpiar» un NAP en un solo sitio.

> Y ojo con el orden: **los teléfonos de `locations.ts` no coinciden con los que MUV publica en ninguna de sus plataformas.** La web actual, Doctoralia, Google Business e Instagram dicen **634 47 85 44** (El Cañaveral) y **614 13 14 05** (Tres Cantos); el repositorio dice otros dos. Cuatro fuentes contra una: casi con seguridad el repositorio está mal. Hasta que el cliente lo confirme **no se publica ninguno**, pero ya no es una duda a ciegas.

---

## Qué hay aquí y qué versión es la buena

| Página | Documento | PDF para el cliente | Estado |
|---|---|---|---|
| `/` | `home.md` | `MUV-HOME-v8.pdf` | Cerrada. **800 palabras publicables** |
| `/sedes` | `sedes.md` | `MUV-SEDES-v14.pdf` | Cerrada. **422 palabras publicables** |
| `/sedes/tres-cantos` | `sede-tres-cantos.md` | `MUV-SEDE-TRES-CANTOS-v10.pdf` | Cerrada. **1.203 palabras publicables** |
| `/sedes/el-canaveral` | `sede-el-canaveral.md` | `MUV-SEDE-EL-CANAVERAL-v2.pdf` | Cerrada. **1.358 palabras publicables** |

**Con esto se cierra la primera fase de contenidos: las cuatro páginas de la estructura de sedes.**

> **Las cifras de extensión se recontaron el 17/08/2026 y bajaron.** El contador anterior se dejaba fuera los H3 del módulo de dolencias y las preguntas frecuentes, y a cambio contaba tablas de justificación e instrucciones de maquetación. Los dos errores casi se compensaban, y por eso tardaron en verse. **Estas son las buenas.** Ninguna decisión editorial cambia; sí cayó una afirmación de Tres Cantos, que ya no es la segunda página más larga de su municipio.

**Solo hay un PDF por página y siempre es el vigente.** Cuando sale una versión nueva se borra la anterior en el mismo commit, para que nadie tenga que adivinar cuál es la buena.

Cada documento se abre con una ficha —URL, keyword principal, extensión, trato— y sigue con los módulos numerados. **Los módulos del documento se corresponden uno a uno con los bloques de la página.**

---

## Las tres reglas que no se pueden saltar

### 1. Lo marcado en rojo NO se publica

En los PDF hay texto <span style="color:#c0392b">**en rojo**</span> y bloques `[PENDIENTE MUV: …]`. Son datos que el cliente todavía no ha facilitado: números de teléfono, el registro sanitario de Tres Cantos, las zonas de atención, el equipo.

**No se maqueta, no se rellena con algo parecido y no se inventa.** Si un módulo depende de un dato en rojo, ese módulo espera. La lista completa de lo que falta está en la issue de datos pendientes.

### 2. No se escribe copy que no esté en estos documentos

Cada frase de estos documentos tiene una fuente comprobable: el documento de arranque que rellenó el cliente, `locations.ts`, la ficha de Doctoralia de cada clínica, o una fuente pública citada. **El 14/08/2026 se retiraron dieciocho frases de los tres documentos por no tener fuente**, incluidas algunas que llevaban días dadas por buenas.

La regla, escrita para las cuarenta páginas que faltan:

> **Describir la fisioterapia es libre. Describir este negocio exige fuente.**

Qué es una tendinopatía o qué síntomas da un dolor cervical se puede escribir. Cómo se reserva, cuánto dura una sesión, cómo funciona un grupo, de dónde viene la gente o qué aparatos hay **es MUV, y sin dato no se escribe**. Si al maquetar hace falta una frase que no está, se pide; no se rellena.

`sede-tres-cantos.md` incluye una tabla —«De dónde sale cada afirmación sobre MUV»— con el origen de cada línea publicable. Sirve de modelo para las páginas siguientes.

### 3. Los encabezados no se tocan

Cada H1, H2 y H3 lleva una entidad SEO elegida a propósito, y el reparto entre páginas está calculado para que **no compitan entre ellas**:

| Página | Qué búsqueda defiende | Qué tiene prohibido |
|---|---|---|
| `/` | la marca y el término genérico | ampliar la geografía |
| `/sedes` | el conjunto de clínicas y los datos prácticos | el municipio **formulado como búsqueda** |
| `/sedes/<sede>` | **el municipio** | repetir el discurso genérico de marca |
| `/servicios/<servicio>` | el servicio, sin geografía | cualquier municipio |

Cambiar un encabezado por otro que «suena mejor» rompe ese reparto. Cada documento lleva una tabla «Justificación SEO de cada encabezado» que explica por qué está así.

**Encabezados reservados a las páginas de sede**, que ninguna otra página puede usar:

`Fisioterapia en <municipio>` · `Fisioterapeuta en <municipio>` · `Cómo llegar a nuestra clínica de <municipio>` · `Nuestro equipo de fisioterapeutas en <municipio>` · `Opiniones sobre la clínica de <municipio>`

---

## Convenciones de la copy

- **Trato de usted** en toda la web. Nada de tuteo, tampoco en textos de configuración (`locations.ts`, `site.ts`) ni en botones.
- **Al lector no se le llama «paciente» ni «cliente».** El cliente marcó «Persona» y «evitar la etiqueta» en el documento de arranque. Se le habla de usted y se prescinde del sustantivo. Esto alcanza también a los bloques de opiniones: «Opiniones sobre la clínica de…», nunca «opiniones de pacientes».
- **Voz:** «En MUV…» (nosotros).
- **No se publican precios.** Decisión del cliente.
- **Cuatro prohibiciones del documento de arranque**, comprobadas con script en cada versión: promesas de curación o de resultado garantizado · comparaciones directas con otras clínicas · cifras de eficacia sin fuente · presentar una valoración fisioterápica como un diagnóstico médico.
- **La dirección y el horario se repiten en todas las páginas a propósito.** Eso es NAP, no contenido duplicado, y tiene que ser **idéntico carácter a carácter** en la web, en Google Business Profile y en Doctoralia. Cambiar una coma en un sitio y no en otro resta.
- **`CTASection` recibe `title` y `description` desde cada página.** Si se deja el texto por defecto, ese bloque sí se convierte en contenido duplicado repetido en todo el sitio.

---

## Datos estructurados

Es la diferenciación técnica más barata que tiene el proyecto. De los trece dominios auditados el 14/08/2026 —los once de Tres Cantos más Escalante e Impulso— **ninguno declara `MedicalClinic`, `LocalBusiness` ni `Physiotherapy`**.

> **Matiz añadido el 14/08/2026, al auditar El Cañaveral.** Eso no se puede convertir en un «no lo hace nadie» general: **Focus Clinic**, en El Cañaveral, **sí declara `Physiotherapist`** con dirección, coordenadas y horario. Es uno de cinco clínicas de ese barrio, y no estaba en ninguna lista previa del proyecto. Sigue siendo diferenciación —cuatro de cinco no declaran nada sanitario y **ninguna de las cinco declara el horario del sábado**— pero se cuenta como lo que es. Es la tercera vez en este proyecto que una afirmación negativa se cae al ampliar la búsqueda: **una afirmación negativa exige buscar más que una positiva.**

| Marcado | Dónde |
|---|---|
| `Organization` con `sameAs` | Home. El `sameAs` apunta a las dos fichas de Doctoralia y al perfil de Google Business: es lo que consolida la entidad de marca |
| `FAQPage` | Home, `/sedes` y cada página de sede. **Nunca con una pregunta sin respuesta publicada** |
| `ItemList` de `MedicalClinic` | `/sedes` |
| `MedicalClinic` completo | Cada página de sede, con `openingHoursSpecification` **incluyendo el sábado** |
| `BreadcrumbList` | Todas |

**Lo que NO se marca nunca:** las valoraciones de Doctoralia como `aggregateRating` propio. Son opiniones recogidas en otra plataforma; declararlas como propias incumple las directrices de Google y expone el dominio a una acción manual que tumbaría todos los resultados enriquecidos.

---

## Por dónde empezar

0. 🔴 **Corregir las coordenadas de las dos sedes.** El campo `geo` está mal en las dos. La de **Tres Cantos** apunta a 2,6 km de su propia dirección —junto a la estación de Cercanías, no en la Avenida de Madrid—. La de **El Cañaveral** cae en el **polígono industrial**, en la calle Batalla de Salamina, entre 0,7 y 1,3 km de la calle Victoria Kent. Las direcciones postales están bien; las coordenadas, no. Va antes que todo lo demás porque alimenta el `MedicalClinic` de las dos páginas locales.
1. **Datos pendientes del cliente** — bloquean varios módulos.
2. **Configuración incorrecta** — `locations.ts` declara servicios que Tres Cantos no presta, y el `bookingUrl` de El Cañaveral devuelve 404: apunta a `doctoralia.es/clinicas/clinica-muv-el-canaveral` cuando la ficha real es `doctoralia.es/clinicas/muv-canaveral`. El botón principal de conversión de esa sede está roto.
3. **Decidir qué pasa con `/sedes/<sede>/contacto`.** Esa ruta existe, duplica la dirección, el teléfono, el horario y el mapa de la página de sede, declara el mismo `MedicalClinic` y tutea. Con `/contacto` son tres páginas con intención de contacto. Las opciones están en `sede-el-canaveral.md`, notas para desarrollo.
4. **Añadir `sameAs`, que no existe en el proyecto.** Ni en `clinicJsonLd` ni en `organizationJsonLd`. Es lo que le dice a Google que la web, la ficha de Doctoralia con más de 1.800 opiniones y los perfiles de Google Business son el mismo negocio. Es la señal más barata que queda sin poner.
5. **Construir las páginas** — home, `/sedes`, `/sedes/tres-cantos` y `/sedes/el-canaveral`.
6. **Datos estructurados** — una vez el contenido está en su sitio.

El orden importa: si las páginas se construyen leyendo `locations.ts` antes de corregirlo, publican un catálogo falso.
