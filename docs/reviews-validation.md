# Validación de Reviews y contenido compartido

Fecha: 23 de noviembre de 2026.

## Implementación

La página y sus cuatro versiones de idioma utilizan documentos publicados de Sanity. General Layout contiene ahora la navegación, los enlaces legales, 36 etiquetas compartidas, nombres de idiomas y los créditos. Se conservaron los componentes y estilos existentes. La navegación incluye Reviews.

Los documentos Reviews se publicaron en Sanity en inglés, español, portugués y francés. No se crearon reseñas de clientes ni autorizaciones ficticias. Hasta incorporar reseñas aptas se muestra un mensaje editable, se excluyen las categorías vacías y se aplica noindex; esas páginas tampoco se incluyen en el sitemap.

Las notas internas se administran en Private Verification Notes: documentos separados guardados como borradores autenticados, sin acción de publicación en Studio.

## Comprobaciones

- TypeScript y compilación de Sanity Studio aprobados.
- Validación oficial de documentos contra el esquema: General Layout y los cuatro Reviews Page, sin errores.
- Pruebas de elegibilidad, categorías vacías, enlaces seguros, sincronización de las tres URLs, renderizado de cambios CMS y metadatos aprobadas.
- Auditoría editorial de 12 componentes compartidos y 36 etiquetas en cuatro idiomas aprobada.
- Primera compilación integral con las cuatro rutas Reviews y todas las comprobaciones existentes aprobada (282 archivos HTML, incluidas páginas auxiliares).
- Navegación móvil en español y diseño a 390 px verificados en navegador; sin desbordamiento horizontal.
- Webhook publicado y activo: Published website content → Netlify, dataset production. El destino es el build hook Sanity published content del proyecto sertuin-events, rama main. No se almacena la URL privada en el repositorio.
- Se corrigió la consulta JSON de pageContext para que el sitemap respete noindex. La compilación final de publicación se comprueba antes de subir a main.

## Límites de aceptación editorial

No se dispone de una reseña auténtica con enlace individual y fotografía autorizada. Los pasos de aceptación que requieren ese material no pueden ejecutarse con testimonios inventados. La lógica de publicación y exclusión se prueba con fixtures locales que nunca se suben a Sanity.

La arquitectura existente no incorpora preview autenticado de borradores en el frontend. Studio conserva su guardado de borradores y Publish; el webhook reconstruye el sitio con contenido publicado. No se expusieron tokens ni borradores para simular una vista previa.

Guía de campos y navegación: docs/reviews-administration.md.
