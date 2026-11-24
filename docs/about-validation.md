# Validación de About Us

## Pruebas ejecutadas

- `node scripts/test-about.cjs`: aprobada. Renderizado real del componente en cuatro idiomas, una H1, siete tarjetas, dos botones desactivados, un único indicador de marca activa en el directorio, cambios de contenido, activar un botón añadiendo solo la URL y volver a desactivarlo al retirarla, rechazo de enlaces inseguros, visibilidad de secciones, crop, JSON-LD y ausencia de texto editorial literal en JSX.
- Aislamiento: sin la variable local no se crean páginas About; con ella y un entorno CI la generación falla deliberadamente.
- `node scripts/test-reviews.js` y `node scripts/test-shared-content.js`: aprobadas; no regresión detectada en las pruebas de Reviews y contenido compartido.
- TypeScript de Studio: aprobado.
- `sanity schemas validate --level error --format json`: `[]`, cero errores de esquema.
- Compilación de Studio: aprobada. No se desplegó.
- Compilación completa Gatsby con contenido local: aprobada; 286 HTML validados por las comprobaciones existentes, sin bytes NUL. Incluye las validaciones comerciales, propuestas, contenido retirado y separación de idiomas.
- `node scripts/validate-about-built.cjs`: verifica el HTML y page-data finales de las cuatro rutas, metadatos, siete marcas, botones y exclusión de sitemap.
- Navegador: escritorio y móvil a 390 px; prueba adicional de ancho a 320 px. A 390 px: ancho del documento 375 y scrollWidth 375. A 320 px: 305 y 305. Sin desbordamiento horizontal.
- Navegador: imagen cargada, siete tarjetas, una H1, botón de Grecia Mejía Weddings desactivado y ningún error de consola registrado en la página de revisión.
- Fotografía: original 3120 × 4160, copia local idéntica mediante SHA-256, ambos rostros visibles; sin subida ni edición generativa.

El componente compartido existente `ResponsiveImage` emite en la prueba SSR una advertencia de React 18 sobre `fetchPriority`. La compilación pasa; no se modificó ese componente compartido para esta tarea.

## Evidencia visual local

- `.tmp/about-desktop.jpg`: fotografía junto a la biografía en español.
- `.tmp/about-mobile.jpg`: introducción y fotografía en móvil.
- `.tmp/about-directory-mobile.jpg`: directorio y distinción de la marca actual.
- `.tmp/home-desktop.jpg` y `.tmp/home-mobile.jpg`: referencia del sitio publicado.
- `.tmp/about-photo-evidence.json`: dimensiones y hash del original conservado.
- `.tmp/about-build-final.log` y `.tmp/about-studio-build.log`: compilaciones.

Se compararon los encabezados, tipografías, colores, botones, ancho de contenido y pie. El layout utiliza los componentes reales del sitio; la imagen no se convierte en fondo de hero ni se recorta para llenar una pantalla.

## Pendientes por la decisión de mantenerlo local

No existe asset en Sanity, dataset de ensayo, documento remoto, demostración de edición en Studio ni prueba de Publish/revalidación. El esquema y el adaptador están preparados, pero no se presenta esa integración como comprobada. Tampoco se creó Draft PR ni se subió la rama.

No se realizó una auditoría exhaustiva con lector de pantalla o herramienta externa de accesibilidad. Se verificaron semántica, estados disabled, enlaces HTTPS, lectura responsive y ausencia de desbordamiento. Las transiciones de contenido están probadas con documentos locales; no equivalen a los 30 pasos de aceptación del CMS.

Los destinos de Grecia Mejía Weddings y SertuinOne quedan pendientes. Los logos son opcionales y no fueron suministrados. La observación sobre la ubicación de propuestas se registra en la guía del propietario. Ninguna otra web fue modificada.
