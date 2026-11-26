# Administración de Reviews

Esta guía corresponde a los campos implementados en el Studio de Sertuin Events, que se compila junto al sitio en `/studio/`.

## Contenido de la página

Abra **Content → Reviews Page → Page Content**. El menú **Translations** usa el sistema existente para inglés, español, portugués y francés.

| Acción | Grupo y campo |
| --- | --- |
| Cambiar título y descripción | Hero → Hero → Main H1 heading / Supporting paragraph |
| Cambiar imagen principal | Hero → Hero → Image; cargue o seleccione una imagen, edite Alternative text, Caption y hotspot |
| Mostrar imagen | Hero → Hero → Show supporting image |
| Editar filosofía | Company Philosophy → Company Philosophy → Main editorial content |
| Cambiar valores | Our Values → Our Values → Heading / Description / Enabled; arrastre para ordenar |
| Introducción de reseñas | Review Section Introduction → Review section heading / Introduction |
| Destacadas | Featured Reviews → Show featured reviews / Featured reviews heading |
| Botón de Google | Review Display Settings → Default Google review button |
| Filtros y carrusel | Review Display Settings → All reviews filter; todas las reseñas verificadas se incluyen en el HTML inicial y se recorren con flechas, teclado o desplazamiento táctil. Los antiguos campos de paginación se conservan por compatibilidad. |
| Avisos y accesibilidad | Review Display Settings → No reviews message / Opens in a new tab label / Category navigation accessible label / Translation notice |
| Orden editorial | Review Display Settings → Editorial sections before reviews |
| Cierre | Closing Call to Action → Closing Call to Action → Enabled / Heading / Supporting paragraph / Primary button / Secondary button |
| SEO | SEO & Social Sharing → SEO & Social Sharing → SEO title / Meta description / Open Graph title / Open Graph description / Social image |
| FAQ | FAQ → Show FAQ / FAQ heading / Questions |

Cada botón dispone de Enabled, Button label, Destination y Display variant. El H1 permanece visible aunque se desactive el contenido complementario del hero. La colección de reseñas no puede eliminarse ni reordenarse desde Studio. Las variantes no aceptan CSS.

## Reseñas auténticas

Abra **Reviews Page → All Reviews** y use el botón de creación de Sanity. Rellene **Client name**, **Original review text**, **Authorized client/event photograph** (incluido Alternative text), **Review category**, **Individual Google review permalink**, **Original review language**. Confirme **Photo publication authorization confirmed** y seleccione **verified** en **Source verification status** únicamente después de verificarlo.

El enlace debe ser el permalink individual expandido de google.com/maps con `reviewid` o identificador `!1sCh…`. Los enlaces cortos y perfiles generales no se sustituyen automáticamente. Ese único campo enlaza foto, texto y botón.

**Display order** ordena las reseñas. El carrusel muestra únicamente la traducción correspondiente al idioma de la página, con inglés como respaldo; el texto original permanece intacto en Sanity. Complete EN/ES/PT/FR antes de publicar. **Public event label** sigue siendo localizado. El botón público utiliza **Google button label** de la página, con un texto neutro; los campos históricos de atribución se conservan sin mostrarlos como etiqueta del botón. El enlace individual sigue llevando a la fuente real. El estado verificado es una confirmación editorial, no una comprobación automática contra Google.

Las tarjetas muestran texto a la izquierda y fotografía completa a la derecha en escritorio; en móvil se apilan. La altura se adapta a la tarjeta actual y al tamaño de pantalla. Las reseñas no son imágenes ni se cargan solo al avanzar: todos sus textos están en el HTML estático. No hay avance automático que interrumpa la lectura. La fotografía y el botón enlazan a Google; el texto del testimonio no es un enlace.

Los documentos incompletos se guardan como borradores. Los errores de validación impiden publicarlos. Para notas internas abra **Reviews Page → Private Verification Notes**, seleccione **Client review** y edite **Internal reference / Internal verification notes**. Estos documentos se guardan como borradores autenticados y no tienen acción Publish; no se mezclan con la reseña pública. No publique esos documentos por herramientas externas.

## Categorías y CTA

Abra **Reviews Page → Review Categories** y cree una categoría. Edite **Category name**, **Slug**, **Description**, **Introductory text**, **Display order** y **Enabled**. Para el CTA use **Associated service page**, **Service CTA enabled**, **Service CTA heading**, **Service CTA description**, **Service CTA button label**, **Service CTA photograph** y **Display variant**. **Internal service destination** permite elegir una ruta de servicio existente cuando no hay referencia. Una referencia tiene prioridad y se resuelve al idioma de la página.

Una categoría sin reseñas publicadas aptas no genera filtro, descripción, imagen ni CTA. Al despublicar su última reseña desaparece en la siguiente compilación.

## Publicación, vista previa y dependencias

Sanity guarda borradores automáticamente; use **Publish** para publicarlos. La página se genera exclusivamente a partir de documentos publicados. No hay datos editoriales de respaldo en el componente y no se generan testimonios ficticios.

La arquitectura existente es Gatsby estático desplegado por Netlify. El webhook **Published website content → Netlify**, activo en el dataset production, conecta con el build hook **Sanity published content** del proyecto Netlify **sertuin-events**, rama main. Se activa al crear, modificar o eliminar contenido publicado, incluidos Reviews, categorías, reseñas, servicios y General Layout. Excluye borradores, notas internas y metadatos de traducción/medios. No exponga la URL privada del build hook. Después de Publish, espere a que Netlify termine la compilación y marque el despliegue como Published.

No se ha añadido un endpoint público que exponga borradores. No existe una acción de vista previa nueva en esta implementación. La prueba de preview requiere infraestructura adicional autenticada; el flujo completo no puede darse por aceptado hasta verificarlo con una sesión de Studio y una reseña real autorizada.

## Contenido compartido

**Reviews Page → Shared Website Content** abre el documento existente **General Layout**. En su grupo **Shared Website Content → Shared Website Content** se editan:

- **Shared navigation and footer menu**: nombres, destinos y orden del menú; **Submenu links** administra las entradas desplegables y **Footer only** limita una entrada al pie.
- **Footer legal links**: textos y destinos legales.
- **Logo and copyright destination** y **Cookie banner policy destination**: destinos compartidos.
- **Common CTA, consent and accessibility text**: 36 etiquetas con sus cuatro idiomas, incluidos los botones y mensajes de cookies, contacto, menú y créditos. La clave identifica el uso y no se modifica.
- **Supported language display names**: nombres visibles y banderas de los cuatro idiomas existentes; no modifica la infraestructura de rutas.
- **Footer credit name / Footer credit destination / Footer credit logo alternative text / Footer credit image URL**: crédito e imagen del pie.

Los grupos existentes **Branding**, **Contact**, **Social** y **Legal & admin** siguen gestionando logo, empresa, teléfono, Messenger, redes y datos legales. Los componentes compartidos consumen ahora estos datos de Sanity conservando los estilos y el comportamiento de consentimiento. Las traducciones originales se migraron como contenido; no funcionan como fallback en esos componentes.

## Comprobaciones pendientes de aceptación

Ejecute los 22 pasos del documento del cliente en un entorno de ensayo, con fotografías autorizadas y reseñas auténticas. Compruebe publicación, retirada de la última reseña, URLs sincronizadas, SEO, cambios de idioma, móvil y teclado. No publique datos de prueba en producción. Las pruebas automatizadas de esta rama no sustituyen esa aceptación en Studio.
