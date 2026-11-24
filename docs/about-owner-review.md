# About Us — administración y publicación

El propietario autorizó la publicación después de revisar la versión local. La página usa exclusivamente contenido publicado de Sanity, con rutas /about/, /es/about/, /pt/about/ y /fr/about/. La navegación y el pie utilizan el mismo registro compartido de General Layout.

## Fotografía original

Se subió el archivo original, sin sustituciones ni edición generativa. Asset: image-d3d0ac9b78d5aeb38ec26f2a9b6aee09b053c3c6-3120x4160-jpg. Dimensiones: 3120 × 4160. La imagen principal y la imagen social inicial son editables por idioma. La web usa ResponsiveImage y entrega tamaños optimizados desde Sanity.

## Modelo editorial implementado

- `aboutPage`: cuatro documentos por idioma, con grupos Introduction, Founders & Photograph, Sertuin SRL, Sertuin Events, Purpose & Process, Shared Values, Our Seven Brands, Closing CTA y SEO & Social Sharing.
- `companyFounder`: Alex Castro y Grecia Mejía, títulos y biografías traducidos, imagen opcional, enlaces profesionales opcionales, orden y visibilidad.
- `brandProfile`: siete marcas; identificador estable, nombre, especialidad, descripción, imágenes opcionales, botón, URL, estado y orden.
- `generalLayout.corporateProfile`: extensión del registro existente de empresa. No se crea otra empresa duplicada. Incluye nombre legal, descripción, historia, ubicación, referencias a propietarios y valores.
- `aboutPrinciple` y `aboutLocalizedText`: pasos/valores ordenados y textos en los cuatro idiomas existentes.
- `imageWithAlt`: se reutiliza con controles de crop/hotspot y alt obligatorio.

La página reutiliza `Layout`, `Navbar`, `Footer`, `ResponsiveImage`, las rutas de idioma y la tipografía Crimson Pro/Montserrat y colores del sitio. No modifica las otras seis webs. `src/template/about.js` no contiene textos editoriales de respaldo; el contenido inicial está separado en `scripts/migrations/about-initial-documents.json`.

## Campos de Studio preparados

En https://sertuinevents.com/studio/ abra **About Us**. Las siguientes rutas pertenecen al Studio publicado. Page Content contiene English, Español, Português y Français.

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


## Publicar cambios

1. Edite el documento o imagen correspondiente y pulse **Publish**. Los borradores permanecen privados.
2. El webhook existente **Published website content → Netlify** activa la reconstrucción de main. Incluye páginas, fundadores, marcas, empresa y navegación.
3. Espere al estado **Published** del despliegue y recargue la URL del idioma. No es necesario modificar código.
4. Al añadir una Homepage URL válida a una marca, su botón pasa a ser un enlace si Enable homepage link está activo. Al borrarla vuelve al estado disabled.

La página pública no muestra borradores ni contiene tokens. El modo de revisión local conserva noindex y no puede ejecutarse en CI. No se ha añadido una vista previa autenticada de borradores dentro de Studio: el adaptador local de staging permanece disponible para un futuro entorno autorizado.

## Contenido inicial y seguridad de migración

Se publicaron cuatro aboutPage, dos companyFounder y siete brandProfile; se extendió generalLayout con corporateProfile sin reemplazar sus demás campos. Las traducciones de las páginas están vinculadas mediante translation.metadata. Se validaron oficialmente los 14 documentos sin errores antes de publicar. La copia de seguridad y el plan de migración están en .tmp, fuera de Git.

No importe scripts/migrations/about-initial-documents.json sobre producción: es el contenido inicial, y generalLayout allí solo contiene el fragmento corporativo. Los cambios editoriales posteriores deben hacerse en Studio para conservar el estado vigente.

No se promete posicionamiento ni citas de IA. El marcado distingue AboutPage, Organization para Sertuin SRL, dos Person y siete Brand; no inventa fechas, credenciales, cifras ni entidades legales. Las políticas de rastreadores, incluido GPTBot, no se modificaron.
