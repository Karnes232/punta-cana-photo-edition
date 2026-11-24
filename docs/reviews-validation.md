# Estado de implementación y validación

Fecha: 23 de noviembre de 2026. Rama: `feat/sanity-managed-reviews`.

## Implementado

- `reviewsPage`, `reviewCategory`, `clientReview` y objetos editoriales registrados en el Studio existente.
- Navegación Reviews Page con Page Content, All Reviews, Draft Reviews, Published Reviews, Review Categories y acceso al General Layout existente.
- Traducción por documento para la página y objetos localizados existentes para categorías/etiquetas. No se creó un segundo sistema de idiomas.
- Página Gatsby generada desde Sanity publicado mediante GROQ; no depende de desplegar nuevos tipos en el endpoint GraphQL para leer Reviews.
- Hero, filosofía Portable Text, valores ordenables, destacadas, filtros, paginación, categorías, CTA de servicios, cierre, FAQ y metadatos.
- Una URL por reseña, permisos y verificación requeridos, categorías vacías ocultas, exclusión de notas del payload del sitio, enlaces seguros y rutas de servicios controladas.
- Guía administrativa: `docs/reviews-administration.md`.

## Verificado localmente

- TypeScript de Studio: aprobado.
- Extracción de esquemas de Sanity: aprobada.
- Compilación de Studio: aprobada después de aislar su PostCSS del sitio.
- Compilación Gatsby con los documentos publicados existentes: aprobada; 277 páginas generadas. **No había documentos reviewsPage publicados**, por lo que esto verifica integración con el sitio existente, no una página Reviews publicada.
- `node scripts/test-reviews.js`: aprobado. Comprueba elegibilidad, categorías vacías, destinos, renderizado real con fixtures locales, sincronización de los tres enlaces, cambios de contenido y metadatos, y auditoría de texto JSX.
- Comprobaciones existentes de contenido retirado, carrusel, metadatos comerciales en origen, esquema de propuestas en origen e idiomas portugués/francés: aprobadas.
- Validación de rutas/SEO por idioma y ausencia de NUL en HTML generado: aprobadas.
- Las pruebas SEO de propuestas y metadatos comerciales sobre HTML construido necesitan consultas de red adicionales; no terminaron por la limitación de aprobación/créditos.

## Pendiente antes de aceptación completa

1. Desplegar la rama y el Studio en el alojamiento existente. No se ha modificado main ni se ha desplegado producción.
2. Crear/publicar Page Content en Sanity y los idiomas deseados. Los valores iniciales de Studio son editables y se guardan en Sanity, no son fallback del frontend.
3. Incorporar reseñas auténticas, enlaces individuales y fotografías con autorización real. No se han inventado testimonios ni permisos.
4. Verificar/configurar el webhook Sanity → Netlify para publicación, edición y eliminación de los tipos nuevos. El repositorio no demuestra que el hook alojado exista.
5. Ejecutar los 22 pasos de aceptación en Studio, verificar móvil y navegación con teclado en navegador. Las pruebas de fixtures no sustituyen esa comprobación.
6. El proyecto no tiene preview autenticado de borradores. Si se requiere, integrar infraestructura de preview sin exponer tokens ni borradores al cliente público.
7. General Layout se reutiliza, pero las etiquetas y rutas compartidas de navegación/pie que hoy provienen de código o traducciones no se migraron globalmente. La auditoría está en la guía; la edición de todo el contenido compartido exclusivamente desde Sanity todavía no está completa.
8. Las notas de verificación están excluidas del sitio, pero no deben contener información sensible: la privacidad del dataset requiere una configuración independiente. Ocultar una propiedad del frontend no convierte un dataset público en privado.

La implementación no se declara aceptada al 100% mientras existan estos pendientes. El bloqueo remoto observado fue un fallo de revisión automática por falta de créditos; no una determinación de que la acción fuera insegura.
