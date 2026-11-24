# About Us — revisión local

## Estado y alcance

Rama local: `feature/sertuin-about-us-multibrand-sanity`, creada desde `origin/main` (`7aeca5d`). El propietario eligió **mantener todo local por ahora**. No se suben la rama, los textos ni la fotografía; no se abre un PR remoto y no se cambia producción.

La nueva ruta es `/about/`, con `/es/about/`, `/pt/about/` y `/fr/about/`. Solo se generan al activar explícitamente `ABOUT_LOCAL_REVIEW=1` y proporcionar una copia local de contenido. La compilación rechaza ese modo en CI/Netlify. Todas las páginas de revisión tienen `noindex, nofollow` y quedan fuera del sitemap. No se añade About al menú compartido publicado.

**Sanity no está conectado para esta página todavía.** Se implementaron y compilaron los esquemas, la estructura administrativa y un adaptador de lectura para un futuro dataset aislado. Los 14 documentos iniciales están en un archivo local, no en Content Lake. La edición, publicación y vista previa desde Studio quedan pendientes del entorno autorizado. No se han completado los 30 pasos de aceptación de Studio.

El único dataset existente era `production`. Crear `about-staging` privado falló porque el plan no permite esa modalidad. La alternativa pública fue detenida por revisión automática; el propietario eligió no continuar con ella. No se creó ningún dataset.

## Vista previa local

Desde la raíz del repositorio:

```powershell
node scripts/prepare-about-local.cjs 'C:\Users\User\Downloads\WhatsApp Image 2026-11-23 at 8.31.19 PM.jpeg'
$env:ABOUT_LOCAL_REVIEW='1'
$env:ABOUT_CONTENT_FILE='.tmp/about-local-content.json'
npm run build
node scripts/about-preview-server.cjs
```

En este equipo, donde `npm` no está en PATH, puede usarse `node '..\package\bin\npm-cli.js' run build`.

Abrir `http://127.0.0.1:9001/about/` o `http://127.0.0.1:9001/es/about/`. El servidor solo escucha en loopback. No hay formularios de edición ni claves de Sanity en esa vista. Detenerlo con Ctrl+C.

La fotografía original se conserva byte por byte en `.tmp/about-original.jpeg`; su SHA-256 y dimensiones se registran en `.tmp/about-photo-evidence.json`. La copia y las capturas están excluidas de Git. El servidor optimiza tamaños y WebP en memoria sin modificar el original. Ambos fundadores aparecen completos, sin generación ni retoque de identidad. No existe referencia de asset de Sanity porque no se autorizó la subida.

## Modelo editorial implementado

- `aboutPage`: cuatro documentos por idioma, con grupos Introduction, Founders & Photograph, Sertuin SRL, Sertuin Events, Purpose & Process, Shared Values, Our Seven Brands, Closing CTA y SEO & Social Sharing.
- `companyFounder`: Alex Castro y Grecia Mejía, títulos y biografías traducidos, imagen opcional, enlaces profesionales opcionales, orden y visibilidad.
- `brandProfile`: siete marcas; identificador estable, nombre, especialidad, descripción, imágenes opcionales, botón, URL, estado y orden.
- `generalLayout.corporateProfile`: extensión del registro existente de empresa. No se crea otra empresa duplicada. Incluye nombre legal, descripción, historia, ubicación, referencias a propietarios y valores.
- `aboutPrinciple` y `aboutLocalizedText`: pasos/valores ordenados y textos en los cuatro idiomas existentes.
- `imageWithAlt`: se reutiliza con controles de crop/hotspot y alt obligatorio.

La página reutiliza `Layout`, `Navbar`, `Footer`, `ResponsiveImage`, las rutas de idioma y la tipografía Crimson Pro/Montserrat y colores del sitio. No modifica las otras seis webs. `src/template/about.js` no contiene textos editoriales de respaldo; el contenido inicial está separado en `scripts/migrations/about-initial-documents.json`.

## Campos de Studio preparados

Estas rutas corresponden a la estructura implementada para **about-staging**. No aparecen aún en el Studio de producción. No iniciar el Studio de revisión contra production.

| Acción | Ruta y campo |
|---|---|
| Título e introducción | Page Content → idioma → Introduction → Main H1 heading / Introduction |
| Foto, alt, crop y hotspot | Page Content → idioma → Founders & Photograph → Original founders photograph |
| Leyenda de foto | Founders & Photograph → Photograph caption |
| Biografía conjunta | Founders & Photograph → Joint biography |
| Biografía individual | Founders' Biographies → persona → Short biography → idioma |
| Empresa | Sertuin SRL & Shared Values → Corporate Information → Sertuin SRL → Public company description |
| Descripción principal | Page Content → idioma → Sertuin Events → Main brand description |
| Indicador de marca actual | Sertuin Events → Current-brand indicator |
| Propósito y pasos | Purpose & Process → Purpose statement / Process steps |
| Editar y reordenar valores | Sertuin SRL & Shared Values → Corporate Information → Sertuin SRL → Shared company values → Heading / Description / Display order / Visible |
| Tarjeta de marca | Our Seven Brands — Buttons & Links → marca → Official brand name / Specialty / Short description |
| Logo o foto de marca | Misma marca → Brand logo / Approved photograph → Alternative text |
| Botón | Misma marca → Homepage button label → idioma |
| Añadir o retirar destino | Misma marca → Homepage URL; conservar Enable homepage link activado para que añadir la URL active el botón |
| Orden de marcas | Misma marca → Display order; menor valor primero |
| Ocultar marca | Misma marca → Active in portfolio |
| Mostrar directorio o valores | Page Content → idioma → Our Seven Brands / Shared Values → Show brand directory / Show shared values |
| Contacto final | Closing CTA → Closing invitation → Heading / Description / Button label / Destination / Visible / Display variant |
| Metadatos | SEO & Social Sharing → SEO title / Meta description / Open Graph title / Open Graph description / Social image and alternative text |

Una URL vacía mantiene el botón visible y desactivado. Solo se admiten HTTPS sin credenciales; las URLs peligrosas nunca generan enlaces. La navegación de las tarjetas utiliza la misma pestaña. Solo `brandId = sertuin-events` recibe el indicador de marca actual. El valor del identificador no se deduce del texto del título.

## Destinos de marcas

Verificados el 23 de noviembre de 2026 mediante sus webs publicadas:

| Marca | Destino inicial |
|---|---|
| Sertuin Events | https://sertuinevents.com/ |
| Punta Cana Photo Edition | https://puntacanaphotoedition.com/ |
| Punta Cana Proposal Packages | https://puntacanaproposalpackages.com/ |
| Punta Cana Wedding Packages | https://puntacanaweddingpackages.com/ |
| Punta Cana Tour Store | https://puntacanatourstore.com/ |
| Grecia Mejía Weddings | Vacío; pendiente del propietario |
| SertuinOne | Vacío; no se pudo confirmar disponibilidad de https://sertuinone.com/ |

Observación editorial: Proposal Packages indica en su web que las cenas tienen lugar en Cabeza de Toro y la ubicación de propuestas se confirma según paquete. El texto aportado para About habla de propuestas en el espacio designado de Cabeza de Toro. Se conserva el texto del propietario para su revisión; no se cambió la web de esa marca. Photo Edition enlaza planificación de bodas a Sertuin Events; su tarjeta se mantiene enfocada en fotografía, como solicita el propietario. No se recibieron logotipos de las otras marcas: son opcionales, no se inventaron.

## Pasos pendientes antes de publicar

1. Aprobar diseño y textos de esta vista local.
2. Autorizar un entorno Sanity aislado compatible con el plan y la exposición de assets.
3. Copiar únicamente el registro público existente `generalLayout` al entorno aislado y fusionar `corporateProfile`, conservando sus demás campos. No reemplazar el registro publicado con el fragmento del archivo inicial.
4. Subir la fotografía exacta, registrar su asset real y asignarlo a Original founders photograph de los cuatro documentos. Crear los documentos iniciales como borradores; no usar un identificador de asset simulado.
5. Iniciar el Studio local con `SANITY_STUDIO_DATASET=about-staging` y probar las 30 operaciones del documento original. El menú de revisión está preparado para ese dataset.
6. Con autorización, `scripts/export-about-staging.cjs` puede leer borradores autenticados a la copia local. Requiere `ABOUT_SANITY_DATASET=about-staging` y `SANITY_READ_TOKEN` solo en el entorno del proceso. `--published` lee únicamente contenido publicado de ensayo. Reconstruir la vista local tras cada exportación. El script rechaza production y no escribe en Sanity.
7. Autorizar push y Draft PR. Mantener el PR sin merge. Netlify publica main; no se ha enviado esta rama ni se ha disparado despliegue alguno.
8. Solo tras aprobación explícita: planificar importación de contenido aprobado, consulta de contenido publicado, metadatos de indexación y enlace de navegación. El bloqueo local es deliberado y requiere una revisión de publicación antes de habilitar production.

No se promete posicionamiento en buscadores ni citas de IA. El marcado distingue `AboutPage`, `Organization` para Sertuin SRL, dos `Person` y siete `Brand`. Los textos y relaciones proceden de la información aportada por el propietario. No se inventan fechas, credenciales, cifras ni entidades legales. Las políticas de rastreadores existentes, incluido GPTBot, no cambian.
