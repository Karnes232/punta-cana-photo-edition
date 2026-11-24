# Administración de Reviews

Esta guía corresponde a los campos implementados en esta rama. No confirma que la rama esté desplegada. Studio se compila junto al sitio en `/studio/`.

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
| Filtros y paginación | Review Display Settings → All reviews filter / Load more button / Reviews per page |
| Avisos y accesibilidad | Review Display Settings → No reviews message / Opens in a new tab label / Category navigation accessible label / Translation notice |
| Orden editorial | Review Display Settings → Editorial sections before reviews |
| Cierre | Closing Call to Action → Closing Call to Action → Enabled / Heading / Supporting paragraph / Primary button / Secondary button |
| SEO | SEO & Social Sharing → SEO & Social Sharing → SEO title / Meta description / Open Graph title / Open Graph description / Social image |
| FAQ | FAQ → Show FAQ / FAQ heading / Questions |

Cada botón dispone de Enabled, Button label, Destination y Display variant. El H1 permanece visible aunque se desactive el contenido complementario del hero. La colección de reseñas no puede eliminarse ni reordenarse desde Studio. Las variantes no aceptan CSS.

## Reseñas auténticas

Abra **Reviews Page → All Reviews** y use el botón de creación de Sanity. Rellene **Client name**, **Original review text**, **Authorized client/event photograph** (incluido Alternative text), **Review category**, **Individual Google review permalink**, **Original review language**. Confirme **Photo publication authorization confirmed** y seleccione **verified** en **Source verification status** únicamente después de verificarlo.

El enlace debe ser el permalink individual expandido de google.com/maps con `reviewid` o identificador `!1sCh…`. Los enlaces cortos y perfiles generales no se sustituyen automáticamente. Ese único campo enlaza foto, texto y botón.

**Display order** ordena las reseñas; **Featured** las incluye en destacadas. **Optional translations**, **Public event label** y **Optional Google button label override** usan los campos localizados existentes. La traducción se muestra separada del original con Translation notice. El estado verificado es una confirmación editorial, no una comprobación automática contra Google.

Los documentos incompletos se guardan como borradores. Los errores de validación impiden publicarlos. Las notas no se incluyen en los datos públicos de Gatsby; la privacidad del dataset de Sanity requiere la configuración de acceso correspondiente y no debe almacenarse información sensible en un dataset público.

## Categorías y CTA

Abra **Reviews Page → Review Categories** y cree una categoría. Edite **Category name**, **Slug**, **Description**, **Introductory text**, **Display order** y **Enabled**. Para el CTA use **Associated service page**, **Service CTA enabled**, **Service CTA heading**, **Service CTA description**, **Service CTA button label**, **Service CTA photograph** y **Display variant**. **Internal service destination** permite elegir una ruta de servicio existente cuando no hay referencia. Una referencia tiene prioridad y se resuelve al idioma de la página.

Una categoría sin reseñas publicadas aptas no genera filtro, descripción, imagen ni CTA. Al despublicar su última reseña desaparece en la siguiente compilación.

## Publicación, vista previa y dependencias

Sanity guarda borradores automáticamente; use **Publish** para publicarlos. La página se genera exclusivamente a partir de documentos publicados. No hay datos editoriales de respaldo en el componente y no se generan testimonios ficticios.

La arquitectura existente es Gatsby estático desplegado por Netlify. Publicar en Sanity debe activar el hook de compilación de Netlify. El repositorio no contiene la configuración del webhook alojado ni un sistema de preview autenticado; hay que verificar el hook en las cuentas conectadas. Configure el filtro para cambios/publicación/eliminación de `reviewsPage`, `clientReview`, `reviewCategory` y las referencias a servicios. No exponga la URL secreta del build hook en el navegador. Una publicación no equivale a una actualización instantánea: espere a que finalice el despliegue.

No se ha añadido un endpoint público que exponga borradores. No existe una acción de vista previa nueva en esta implementación. La prueba de preview requiere infraestructura adicional autenticada; el flujo completo no puede darse por aceptado hasta verificarlo con una sesión de Studio y una reseña real autorizada.

## Contenido compartido

**Reviews Page → Shared Website Content** abre el documento existente **General Layout**. Se reutilizan Layout, Navbar y Footer sin reemplazarlos. General Layout administra marca, logo, contactos y redes. La navegación, algunas etiquetas del pie, selector de idioma y consentimiento aún usan archivos de traducción/componentes compartidos. Migrarlos requiere ampliar General Layout y sus consumidores en todo el sitio; esta rama no afirma haber completado esa migración global.

## Comprobaciones pendientes de aceptación

Ejecute los 22 pasos del documento del cliente en un entorno de ensayo, con fotografías autorizadas y reseñas auténticas. Compruebe publicación, retirada de la última reseña, URLs sincronizadas, SEO, cambios de idioma, móvil y teclado. No publique datos de prueba en producción. Las pruebas automatizadas de esta rama no sustituyen esa aceptación en Studio.
