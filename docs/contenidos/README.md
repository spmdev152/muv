# Contenidos SEO de Clínica MUV — guía para desarrollo

Esta carpeta contiene la copy aprobada de la web. **Es la fuente de la verdad de todo el texto que se publica.** Si un texto del código no coincide con lo que hay aquí, manda este documento.

Última actualización: **14 de agosto de 2026**.

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

> Y ojo con el orden: **hoy los teléfonos del repositorio y los de Doctoralia no coinciden en ninguna de las dos sedes.** Está sin resolver, es el bloqueante número uno, y hasta que el cliente diga cuál es el bueno **no se publica ninguno**.

---

## Qué hay aquí y qué versión es la buena

| Página | Documento | PDF para el cliente | Estado |
|---|---|---|---|
| `/` | `home.md` | `MUV-HOME-v8.pdf` | Cerrada. **785 palabras publicables** |
| `/sedes` | `sedes.md` | `MUV-SEDES-v13.pdf` | Cerrada. **396 palabras publicables** |
| `/sedes/tres-cantos` | `sede-tres-cantos.md` | `MUV-SEDE-TRES-CANTOS-v8.pdf` | Cerrada. **1.331 palabras publicables** |
| `/sedes/el-canaveral` | — | — | Sin escribir |

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

Es la diferenciación técnica más barata que tiene el proyecto: de trece dominios de la competencia auditados el 14/08/2026, **ninguno declara `MedicalClinic`, `LocalBusiness` ni `Physiotherapy`**.

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

0. 🔴 **Corregir las coordenadas de Tres Cantos.** El campo `geo` de esa sede en `locations.ts` apunta a 2,6 km de su propia dirección: está junto a la estación de Cercanías, no en la Avenida de Madrid. La dirección postal está bien; la coordenada, no. Va antes que todo lo demás porque alimenta el `MedicalClinic` de la página que este proyecto existe para levantar.
1. **Datos pendientes del cliente** — bloquean varios módulos.
2. **Configuración incorrecta** — `locations.ts` declara servicios que Tres Cantos no presta.
3. **Construir las páginas** — home, `/sedes` y `/sedes/tres-cantos`.
4. **Datos estructurados** — una vez el contenido está en su sitio.

El orden importa: si las páginas se construyen leyendo `locations.ts` antes de corregirlo, publican un catálogo falso.
