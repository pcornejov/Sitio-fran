# Especificación de Diseño — Sitio Francisca Espinoza (Contabilidad, Tributación y Administración de Personal)

Inspiración estructural en lacontadora.cl, simplificada a 4 páginas, sin cursos/tienda. Todo lo aquí definido es vinculante para el agente de build; no debe inventar colores, tipografías, radios ni breakpoints distintos a los indicados.

---

## 1. Design Tokens CSS

```css
:root {
  /* ===== COLOR — Marca ===== */
  --color-primary: #0F3B5C;        /* Navy — header, footer, nav, texto sobre claro */
  --color-primary-hover: #0B2C46;  /* Navy oscurecido ~15% — hover de botones/enlaces navy */
  --color-primary-active: #081F33; /* Navy oscurecido ~25% — estado presionado */
  --color-primary-tint-10: #E7EEF3; /* Navy al 10% opacidad sobre blanco — fondos de íconos, chips */
  --color-primary-tint-05: #F1F5F8; /* Navy al 5% — hover sutil de filas/list items */

  --color-accent: #E0A458;         /* Ámbar — CTA primario */
  --color-accent-hover: #D69C55;   /* Ámbar oscurecido ~5% (NO más oscuro, ver §2) */
  --color-accent-active: #D69C55;  /* Mismo tono que hover; el estado activo se marca con
                                       transform + inset-shadow, no con más oscurecimiento
                                       (oscurecer más rompe el contraste AA, ver §2) */
  --color-accent-tint: #FBF0E1;    /* Ámbar al 10% — fondos de badges, resaltes suaves */

  --color-whatsapp: #25D366;       /* Verde oficial — SOLO ícono/isotipo de WhatsApp */
  --color-whatsapp-hover: #1FB955; /* Verde oscurecido — hover del ícono/FAB */

  /* ===== COLOR — Neutros / texto ===== */
  --color-bg: #F7F9FB;             /* Fondo general del sitio */
  --color-surface: #FFFFFF;        /* Fondo de tarjetas, header en scroll-top si aplica, inputs */
  --color-text-primary: #1F2933;   /* Texto de cuerpo sobre fondos claros */
  --color-text-secondary: #52606D; /* Texto secundario/meta sobre fondos claros */
  --color-text-inverse: #FFFFFF;   /* Texto sobre navy (header, footer, CTA band) */
  --color-text-on-accent: #0F3B5C; /* Texto sobre botones ámbar (obligatorio, NO blanco) */
  --color-border: #DCE3E9;         /* Bordes de inputs, divisores sobre superficies claras */
  --color-border-dark: rgba(255,255,255,0.15); /* Divisores sobre fondo navy (footer) */

  /* Estados semánticos de formulario */
  --color-error: #C0392B;
  --color-success: #1F8A4C;

  /* ===== TIPOGRAFÍA ===== */
  --font-heading: 'Poppins', 'Segoe UI', sans-serif;
  --font-body: 'Inter', 'Segoe UI', sans-serif;

  --text-h1: clamp(2rem, 1.55rem + 2vw, 2.75rem);
  --text-h2: clamp(1.75rem, 1.45rem + 1.4vw, 2.25rem);
  --text-h3: clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem);
  --text-h4: clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem);
  --text-h5: 1.125rem;
  --text-h6: 1rem;
  --text-lead: clamp(1.0625rem, 1rem + 0.3vw, 1.25rem);
  --text-body: 1rem;
  --text-small: 0.875rem;

  --leading-heading: 1.2;
  --leading-body: 1.6;
  --leading-tight: 1.35;

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* ===== ESPACIADO ===== */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* ===== RADIOS ===== */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 999px;

  /* ===== SOMBRAS ===== */
  --shadow-sm: 0 1px 2px rgba(15, 59, 92, 0.06);
  --shadow-md: 0 4px 12px rgba(15, 59, 92, 0.08);
  --shadow-lg: 0 12px 32px rgba(15, 59, 92, 0.14);
  --shadow-focus: 0 0 0 3px rgba(224, 164, 88, 0.45);
  --shadow-focus-inverse: 0 0 0 3px rgba(255, 255, 255, 0.55);

  /* ===== LAYOUT ===== */
  --container-max: 1200px;
  --header-height: 72px;
  --header-height-mobile: 64px;

  /* ===== Z-INDEX ===== */
  --z-nav: 1000;
  --z-mobile-menu: 1100;
  --z-whatsapp-fab: 900;
}
```

Google Fonts en `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 2. Verificación de contraste WCAG AA

| Combinación | Ratio | Umbral | Resultado |
|---|---|---|---|
| `#1F2933` sobre `#F7F9FB` | 13.97:1 | 4.5:1 | Pasa |
| `#52606D` sobre `#FFFFFF`/`#F7F9FB` | 6.45:1 | 4.5:1 | Pasa |
| `#FFFFFF` sobre `#0F3B5C` | 11.67:1 | 4.5:1 | Pasa |
| `#E0A458` sobre `#0F3B5C` (link hover en nav) | 5.34:1 | 4.5:1 | Pasa |
| Texto blanco sobre botón ámbar `#E0A458` | 2.18:1 | 4.5:1 | **Falla — no usar** |
| Texto `#0F3B5C` sobre botón ámbar `#E0A458` | 5.34:1 | 4.5:1 | Pasa → elegido como `--color-text-on-accent` |
| Hover ámbar `#D69C55` con texto navy | 4.98:1 | 4.5:1 | Pasa (justo) |
| Verde WhatsApp `#25D366` con texto/ícono blanco como botón de texto | 1.98:1 | 4.5:1 | Falla como botón con texto; solo aceptable como isotipo/FAB icon-only |

**Reglas obligatorias:**
1. Ningún botón usa texto blanco sobre fondo ámbar ni sobre fondo verde WhatsApp.
2. El botón/enlace primario ámbar siempre usa `--color-text-on-accent` (navy).
3. Hover del botón ámbar solo oscurece ~5% (`--color-accent-hover`); no generar variantes más oscuras.
4. Estado `:active` reutiliza el color de hover + `transform: scale(0.98)` + sombra interior, sin oscurecer más.
5. El FAB de WhatsApp es circular, ícono-solo, fondo `#25D366`, ícono blanco (exención de logotipo de marca).
6. Cualquier botón de WhatsApp con texto usa fondo claro + ícono/borde verde + texto oscuro, nunca fondo verde con texto.
7. Focus visible obligatorio: `--shadow-focus` sobre fondos claros, `--shadow-focus-inverse` sobre navy.

---

## 3. Especificación de componentes

### 3.1 Header / Nav
- Altura `--header-height` (72px) desktop ≥768px, `--header-height-mobile` (64px) en móvil.
- Fondo siempre `--color-primary` (navy sólido, sin transparencia). `position: sticky; top:0; z-index: var(--z-nav);`
- Scroll >10px añade clase `.is-scrolled` (JS) con `box-shadow: var(--shadow-md)`.
- Wordmark "Francisca Espinoza": `--font-heading`, `--weight-semibold`, `--text-h5`, color `--color-text-inverse`. Sin logo gráfico.
- Desktop (≥768px): flex horizontal, wordmark izq., nav centro-derecha, CTA pill ámbar a la derecha. Links `--font-body` `--weight-medium` `--text-body` blanco; hover → `--color-accent`; activo → `--color-accent` + `border-bottom: 2px solid`.
- Móvil (<768px): wordmark + ícono hamburguesa (24x24px blanco). CTA se traslada al menú abierto.
- Menú móvil: overlay fullscreen fondo navy, links verticales `--text-h3` `--weight-semibold` blancos, `gap: var(--space-lg)`. Hamburguesa se anima a "X". Cierre con click en X, click fuera, o ESC. `body{overflow:hidden}` mientras está abierto, foco atrapado, primer link recibe foco al abrir. Transición 0.25s, respeta `prefers-reduced-motion`.

### 3.2 Botones
Base común: `display:inline-flex; align-items:center; justify-content:center; gap:var(--space-sm); font-family:var(--font-body); font-weight:var(--weight-semibold); font-size:var(--text-body); border-radius:var(--radius-pill); padding:14px 32px; min-height:48px; border:2px solid transparent; transition: background-color .2s, color .2s, box-shadow .2s, transform .1s;`

- **Primario:** fondo `--color-accent`, texto `--color-text-on-accent`. Hover → `--color-accent-hover`. Active → hover + `scale(0.98)` + sombra interior. Focus-visible → `--shadow-focus`. Disabled → `opacity:.5`.
- **Secundario (fondo claro):** transparente, borde+texto `--color-primary`. Hover → fondo `--color-primary`, texto blanco.
- **Secundario sobre navy:** transparente, texto blanco, borde `rgba(255,255,255,.6)`. Hover → fondo `rgba(255,255,255,.12)`, borde blanco.
- **Botón WhatsApp con texto:** fondo blanco, texto `--color-text-primary`, borde 2px `--color-whatsapp`, ícono SVG verde a la izquierda. Hover → fondo `#F0FBF3`, borde `--color-whatsapp-hover`. Nunca fondo verde sólido con texto.
- **FAB WhatsApp:** `position:fixed; right:var(--space-lg); bottom:var(--space-lg); z-index:var(--z-whatsapp-fab);` 56x56px circular, fondo `--color-whatsapp`, ícono blanco 28px centrado, `box-shadow:var(--shadow-lg)`. Hover → fondo `--color-whatsapp-hover` + `scale(1.05)`. Requiere `aria-label="Escríbenos por WhatsApp"`.

### 3.3 Tarjeta de servicio
1. Ícono: contenedor 56x56px redondeado, fondo `--color-primary-tint-10`, ícono SVG línea 28px color `--color-primary`.
2. Título: `--font-heading` `--weight-semibold` `--text-h4` color `--color-primary`, `margin-top:var(--space-md)`.
3. Descripción: `--font-body` `--text-body` `line-height:var(--leading-body)` color `--color-text-secondary`, `margin-top:var(--space-sm)`.
4. Link "Ver más →": `--weight-semibold` color `--color-primary`; hover → `--color-accent` + flecha `translateX(4px)`; `margin-top:var(--space-lg)`.

Contenedor: fondo `--color-surface`, `border-radius:var(--radius-md)`, `box-shadow:var(--shadow-md)`, `padding:var(--space-xl)`. Hover (si es clickeable): `translateY(-4px)` + `--shadow-lg`.

### 3.4 Footer
Fondo `--color-primary`, texto blanco/`rgba(255,255,255,.85)`. 4 columnas desktop (Marca, Navegación, Contacto, Horario/CTA) → apiladas en móvil, 2 columnas en tablet. Barra inferior con copyright, `border-top:1px solid var(--color-border-dark)`.

### 3.5 Banda CTA
Fondo `--color-primary`, `padding:var(--space-3xl) var(--space-lg)`, contenido centrado max-width 720px. Título `--text-h2` blanco, subtexto `--text-lead` `rgba(255,255,255,.85)`. Fila de botones: primario ámbar + secundario outline blanco (WhatsApp).

---

## 4. Wireframes textuales por página

**Inicio:** Header → Hero (eyebrow + H1 + subtítulo + CTA primario + CTA WhatsApp + imagen) → Franja de 3 valores rápidos → Grilla de 3 tarjetas de servicio → Bloque "Sobre mí" resumido → Testimonios (opcional) → Banda CTA → Footer.

**Servicios:** Header → Banner de página → 3 bloques de detalle (Contabilidad/Tributario/Administración de Personal) con layout alterno imagen-texto → FAQ opcional → Banda CTA → Footer.

**Sobre mí:** Header → Banner con foto + título → Bio narrativa → Credenciales → Valores/enfoque (grilla 3-4 ítems) → Línea de tiempo opcional → Banda CTA → Footer.

**Contacto:** Header → Banner → Dos columnas (formulario + tarjeta de datos de contacto) apiladas en móvil → Mapa embebido → Footer (sin banda CTA adicional).

---

## 5. Reglas de responsividad (mobile-first, breakpoints 320/375/768/1024/1440)

- **Contenedor:** padding lateral 16px (<768px), 24px (768-1023px), 40px (1024-1439px), 64px (≥1440px); `max-width:var(--container-max)` centrado desde 1024px.
- **Header:** hamburguesa <768px, nav horizontal completo ≥768px.
- **Hero:** apilado <1024px (texto arriba, imagen debajo), dos columnas 55/45 ≥1024px.
- **Grilla de servicios:** 1 columna <768px, 2 columnas 768-1023px (3ª tarjeta centrada), 3 columnas ≥1024px.
- **Tipografía:** resuelta por `clamp()` de la sección 1; validar visualmente que no haya truncamiento en H1/títulos de tarjeta en los 5 anchos exactos.
- **Footer:** 1 columna <768px, 2 columnas 768-1023px, 4 columnas ≥1024px.
- **Contacto:** 1 columna <1024px (formulario → tarjeta → mapa), 2 columnas ≥1024px (`1.4fr 1fr`) + mapa full-width debajo.
- **Padding vertical de sección:** 48px (<768px), 48-64px (768-1023px), 64px (≥1024px, bandas CTA ~96px).
- **WhatsApp FAB:** 48x48px con offset 16px (<768px), 56x56px con offset 24px (≥768px).

---

**Decisiones críticas que el build agent no debe alterar:**
- Texto sobre botón ámbar = navy, nunca blanco.
- Hover de botón ámbar oscurece solo ~5%; activo usa transform/sombra, no más oscurecimiento.
- Verde WhatsApp solo en ícono/FAB circular o botón con fondo claro; nunca fondo verde sólido con texto.
- Header/footer siempre navy sólido, wordmark tipográfico Poppins semibold, sin logo gráfico.
- Nav cambia a hamburguesa exactamente en 768px; grilla de servicios pasa de 1→2→3 columnas en 768/1024.
