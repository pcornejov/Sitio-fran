# Checklist técnico — Iteración 4: Responsivo, Accesibilidad y SEO

No rediseñar nada — solo pulir/agregar sobre el código ya existente.

## 1. Responsividad — bugs a corregir

**Overflow horizontal por email largo sin quiebre.** `Francisca.arriagada.coa@gmail.com` en `.contact-card__item-value` y `.footer-contact-item` (contenedores flex ícono+texto) no tiene `min-width:0`/`overflow-wrap`, puede forzar overflow horizontal en 320-375px.

Fix en `assets/css/styles.css`:
```css
.contact-card__item > div,
.footer-contact-item > div {
  min-width: 0;
}
.contact-card__item-value,
.footer-contact-item a {
  overflow-wrap: anywhere;
}
```

**Tap targets del footer (prioridad baja):** agregar `padding-block: 4px;` a `.footer-col ul li a` para acercarse a 44px de área táctil.

Resto de breakpoints (header 320px, nav hamburguesa en 768px, hero apilado/dos-columnas en 1024px, grilla de servicios 1/2/3 columnas, footer 1/2/4 columnas, contact-grid 1 col/2 col) ya están correctamente implementados — solo verificar visualmente, sin cambios de código salvo lo indicado arriba.

## 2. Contraste WCAG AA — corrección obligatoria

**FALLA confirmada:** `.eyebrow--on-navy` (texto ámbar `#E0A458` sobre `rgba(255,255,255,0.12)` sobre navy) usado en los banners de página de `servicios.html`, `sobre-mi.html`, `contacto.html`. Ratio ≈3.76:1, no pasa AA para texto pequeño (necesita 4.5:1).

**Fix obligatorio en `assets/css/styles.css`:** bajar la opacidad del fondo de `.eyebrow--on-navy` de `rgba(255,255,255,0.12)` a `rgba(255,255,255,0.05)`. Esto sube el contraste a ≈4.6:1 (pasa AA) manteniendo el badge perceptible por el padding/border-radius.

Otras combinaciones (texto blanco 85%/70% sobre navy, ámbar sobre navy en nav activo) ya pasan AA, sin cambios. El hover ámbar de `.service-card__link` falla en contraste pero es solo estado `:hover` (el `:focus-visible` mantiene navy + anillo de foco), no bloqueante.

## 3. Accesibilidad — agregar

- **`role="dialog" aria-modal="true" aria-label="Menú de navegación"`** en el `<div class="mobile-menu" id="mobile-menu">` de las 4 páginas.
- (Opcional, baja prioridad) alternar el `aria-label` del botón hamburguesa entre "Abrir menú" y "Cerrar menú" según estado, en `assets/js/main.js`.
- (Opcional) envolver la lista "Navegación" del footer en `<nav aria-label="Navegación de pie de página">`.

El resto (aria-label en FAB/hamburguesa, aria-current en nav, jerarquía de encabezados, landmarks header/nav/main/footer, labels de formulario) ya está correcto — no tocar.

## 4. SEO técnico — agregar

**Favicon:** crear `/home/user/Sitio-fran/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#0F3B5C"/>
  <text x="16" y="23" text-anchor="middle" font-family="Poppins, 'Segoe UI', sans-serif" font-weight="700" font-size="18" fill="#E0A458">F</text>
</svg>
```
Agregar en `<head>` de las 4 páginas: `<link rel="icon" href="favicon.svg" type="image/svg+xml">`.

**Open Graph** en el `<head>` de cada página (reutilizar el title/description ya existente, sin inventar copy nuevo):
```html
<meta property="og:type" content="website">
<meta property="og:locale" content="es_CL">
<meta property="og:title" content="[mismo texto que <title>]">
<meta property="og:description" content="[mismo texto que meta description]">
<meta property="og:url" content="[URL canónica de esa página]">
```
Omitir `og:image` en esta iteración (no hay foto/logo real todavía).

**`sitemap.xml`** en la raíz:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://pcornejov.github.io/Sitio-fran/</loc></url>
  <url><loc>https://pcornejov.github.io/Sitio-fran/servicios.html</loc></url>
  <url><loc>https://pcornejov.github.io/Sitio-fran/sobre-mi.html</loc></url>
  <url><loc>https://pcornejov.github.io/Sitio-fran/contacto.html</loc></url>
</urlset>
```

**`robots.txt`** en la raíz:
```
User-agent: *
Allow: /

Sitemap: https://pcornejov.github.io/Sitio-fran/sitemap.xml
```

**URL canónica por página** — agregar `<link rel="canonical" href="...">` en el `<head>` de cada archivo:
- `index.html` → `https://pcornejov.github.io/Sitio-fran/`
- `servicios.html` → `https://pcornejov.github.io/Sitio-fran/servicios.html`
- `sobre-mi.html` → `https://pcornejov.github.io/Sitio-fran/sobre-mi.html`
- `contacto.html` → `https://pcornejov.github.io/Sitio-fran/contacto.html`

`lang="es-CL"` ya presente y correcto — no tocar.

## 5. Rendimiento

Ya correcto sin acción: `loading="lazy"` en iframe del mapa, `preconnect` de Google Fonts, `rel="noopener"` en enlaces `target="_blank"` a wa.me.

## Resumen de archivos a tocar

| Archivo | Cambios |
|---|---|
| `assets/css/styles.css` | Opacidad de `.eyebrow--on-navy` a 0.05; `min-width:0`/`overflow-wrap:anywhere` en contact-card/footer-contact-item; padding en footer links |
| `index.html`, `servicios.html`, `sobre-mi.html`, `contacto.html` | favicon link, Open Graph, canonical, `role="dialog"` en mobile-menu |
| `favicon.svg` (nuevo) | Crear según spec |
| `sitemap.xml` (nuevo) | Crear con las 4 URLs |
| `robots.txt` (nuevo) | Crear apuntando al sitemap |
| `assets/js/main.js` | Opcional: alternar aria-label del hamburguesa |
