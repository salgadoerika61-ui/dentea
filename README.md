# DENTEA — Landing page

Landing page de una clínica dental de estética y odontología restaurativa.
Sitio estático en español, responsive y con animaciones fluidas.

**Demo:** https://salgadoerika61-ui.github.io/dentea/

> ⚠️ **Contenido provisional.** Los textos de marca son ficticios y las fotografías
> son de stock (Unsplash/Pexels). El número de WhatsApp es un marcador de posición.
> No publicar como web real de una clínica hasta sustituir los datos.

## Stack

- React 19 + TypeScript + Vite 8
- Framer Motion (`LazyMotion`, carga diferida de las secciones bajo el pliegue)
- Fraunces + Manrope (Fontsource, autoalojadas)
- CSS propio (sin framework)
- Imágenes WebP optimizadas con `sharp`, con LQIP y `srcset`

## Desarrollo

Requisitos: Node.js 22 o superior.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/
npm run preview   # sirve dist/ en http://localhost:4173
npm run lint
```

## Estructura

```
src/
  content/site.ts      Textos, tratamientos, FAQ y datos de contacto
  sections/            Secciones de la página (BelowFold se carga en diferido)
  components/          UI reutilizable (Reveal, SmartImage, Logo…)
  index.css            Sistema de diseño y estilos responsive
public/
  images/              Fotografías WebP + manifest.json con créditos
  robots.txt
  sitemap.xml
scripts/               Comprobaciones de QA, rendimiento y anclas
```

## Personalización antes de publicar

1. **WhatsApp** — `WHATSAPP_NUMBER` y `WHATSAPP_DISPLAY` en `src/content/site.ts`
   (formato internacional, sin `+` ni espacios). Los 13 botones de la web usan ese valor.
2. **Datos de la clínica** — objeto `clinic` en el mismo archivo (ciudad, dirección,
   horario, email).
3. **Fotografías** — sustituir los archivos de `public/images/` manteniendo los nombres,
   o actualizar `src/content/images.ts` y el `manifest.json`.
4. **Testimonios** — la sección está reservada a propósito: no se inventan opiniones.
5. **Legal** — añadir Aviso legal y Política de privacidad antes de publicar.
6. **Dominio** — actualizar `canonical`, `og:url`, `og:image`, `public/robots.txt` y
   `public/sitemap.xml` si se usa un dominio propio.

## Despliegue en GitHub Pages

El repositorio contiene el código en `main` y el sitio compilado en la rama `gh-pages`.

```bash
# Compilar con la ruta base del proyecto
npm run build -- --base=/dentea/
```

Después se publica el contenido de `dist/` en la rama `gh-pages` (GitHub Pages sirve
esa rama desde la raíz). Para un dominio propio o un repositorio con otro nombre,
cambiar `/dentea/` por la ruta correspondiente.

## Créditos de imágenes

Ver `public/images/manifest.json`. Fotografías de Unsplash y Pexels bajo sus licencias
respectivas. Son imágenes provisionales, no de la clínica.
