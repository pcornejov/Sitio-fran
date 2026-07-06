# Calculadoras (Hub + IVA + Boleta de Honorarios)

Funcionalidad propia inspirada en el concepto de dos calculadoras públicas de lacontadora.cl (no copia de código — reimplementación con la paleta/componentes propios del sitio). Decisión del usuario: 3 páginas nuevas (`calculadoras.html` hub + `calculadora-iva.html` + `calculadora-honorarios.html`), con "Calculadoras" agregado al nav entre "Servicios" y "Sobre mí".

## 1. Navegación

Agregar `<li><a class="main-nav__link" href="calculadoras.html">Calculadoras</a></li>` (y el equivalente `.mobile-menu__link` + footer "Navegación") en las 5 páginas existentes, entre Servicios y Sobre mí. `aria-current="page"` en "Calculadoras" para las 3 páginas nuevas (igual criterio que ya usa el sitio: resalta la sección, no requiere coincidencia exacta de URL).

## 2. `calculadoras.html` (hub)

Banner de página + grilla de 2 tarjetas (reutiliza `.service-card`) enlazando a `calculadora-iva.html` y `calculadora-honorarios.html`, banda CTA final. Meta tags SEO propios. No carga `calculadoras.js`.

Título: "Calculadoras para tu día a día contable y tributario". Tarjetas: "Calculadora de IVA" (desc: calcula neto/IVA/total) y "Calculadora de Boleta de Honorarios" (desc: calcula cuánto facturar o recibir líquido).

## 3. `calculadora-iva.html`

Formulario: toggle segmentado NETO/BRUTO (radios ocultos + labels estilo píldora) + input de monto con prefijo "$". Resultados en 3 tarjetas (Neto/IVA 19%/Total, la última destacada en fondo primario). Disclaimer breve. CTA a contacto.

Fórmulas:
- Si NETO: `IVA = neto × 0.19`; `Total = neto + IVA`
- Si BRUTO: `Neto = total / 1.19`; `IVA = total − neto` (resta del ya redondeado, nunca descuadra)

## 4. `calculadora-honorarios.html`

Un solo input de monto. Nota de tasa vigente destacada: "Tasa de retención vigente: 1 de enero al 31 de diciembre de 2026 (15,25%)" + mención de que cambia anualmente según Ley 21.133. Dos tarjetas de escenario en paralelo (líquido→bruto y bruto→líquido) sin necesidad de que el usuario elija. Disclaimer. CTA a contacto.

Fórmulas (tasa retención = 0.1525):
- Escenario A (monto = líquido deseado): `Bruto a facturar = líquido / (1 - 0.1525)`
- Escenario B (monto = bruto/boleta): `Líquido a recibir = bruto × (1 - 0.1525)`

## 5. JS — `assets/js/calculadoras.js` (nuevo archivo, cargado solo en las 2 páginas de cálculo)

- Formato de moneda manual (sin `Intl`): `formatThousands`/`formatCurrency`, separador de miles con punto, sin decimales, prefijo "$".
- `parseAmount`: filtra todo lo que no sea dígito, nunca devuelve NaN (vacío → 0).
- Recalculo en vivo con `input`/`change`, sin botón "Calcular".
- Cada bloque de lógica (IVA / Honorarios) comprueba que sus elementos existan antes de engancharse, para poder compartir el mismo archivo entre ambas páginas.
- Redondeo: `Math.round()` en CLP; el segundo valor derivado siempre se calcula como resta/producto del primero ya redondeado (nunca redondeado de forma independiente) para que los montos siempre cuadren.

Pseudocódigo completo de ambas calculadoras y helpers en la spec — ver historial de la sesión; el agente de build debe implementarlo literalmente como está especificado (funciones `formatThousands`, `formatCurrency`, `parseAmount`, `maskInputOnInput`, `ivaRecalcular`, `honorariosRecalcular`, con los IDs de elemento exactos usados en el HTML de las secciones 3 y 4).

## 6. CSS nuevo en `assets/css/styles.css`

Clases nuevas (todas reutilizan tokens existentes, sin valores nuevos de color/espaciado): `.calc-hub-grid`, `.calculator-form`, `.form-field__label-standalone`, `.calc-toggle` + `.calc-toggle__input` + `.calc-toggle__label`, `.currency-input-wrapper` + `__prefix`, `.results-grid`, `.result-card` + `__label` + `__value` + `--highlight`, `.scenario-grid`, `.scenario-card` + `__title` + `__desc` + `__rows` + `__row` + `__row-label` + `__row-value` + `--highlight`, `.calc-rate-note`, `.calc-disclaimer`, `.mb-lg`.

Nota de contraste: valores destacados usan `--color-primary` como texto sobre fondo claro (no `--color-accent`, que solo funciona como texto sobre fondo `--color-primary`, igual criterio que `.eyebrow--on-navy`/`.wordmark span`). En `.result-card--highlight` (fondo primario) el valor sí usa `--color-accent`. En `.scenario-card__row-value--highlight` (fondo blanco) se usa `--color-accent-hover` ("vino"), no `--color-accent`.

## Extra
Agregar las 3 URLs nuevas a `sitemap.xml`.

## Disclaimer legal (mismo texto en ambas calculadoras, adaptado)
"Esta calculadora entrega un resultado referencial... No reemplaza el análisis/asesoría de tu contador para casos particulares." — ver texto exacto por calculadora en la especificación completa.
