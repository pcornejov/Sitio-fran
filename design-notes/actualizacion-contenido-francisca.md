# Actualización de contenido real — Francisca Arriagada + reposicionamiento nacional

Basado en el documento `PARA_PABLO_IA.docx` provisto directamente por Francisca, y dos decisiones de negocio ya tomadas por el dueño del sitio: (1) corregir el nombre a "Francisca Arriagada", (2) reposicionar el sitio como servicio remoto a nivel nacional (San Carlos/Ñuble pasa a ser dato de origen, no el foco del SEO).

## 1. Corrección de nombre: "Espinoza" → "Arriagada"

Reemplazo global y sin ambigüedad en 6 archivos (la cadena "Espinoza" no aparece en ningún otro contexto):
- Las 5 páginas HTML: `<title>`, `og:title`, wordmark (header + mobile-menu, 2×/página), footer wordmark, footer copyright.
- `sobre-mi.html`: H1, `aria-label` del banner photo, iniciales "FE" → "FA".
- `index.html`: `aria-label`/span del hero media y del about-preview media.
- `README.md`: título.

## 2. Hero de Inicio — nacional remoto por delante

```html
<span class="eyebrow">Atención remota en todo Chile</span>
<h1>Orden contable y tributario para tu negocio, estés donde estés</h1>
<p class="hero__subtitle">Asesoría contable, tributaria y de administración de personal 100% remota para emprendedores y empresas de todo Chile. Trabajo cercano, claro y a tiempo, con raíces en San Carlos, Región de Ñuble.</p>
```

## 3. Meta tags de las 5 páginas (title + description, nombre corregido + nacional)

**index.html**
- Title: "Francisca Arriagada | Contabilidad, Tributación y Administración de Personal — Atención Remota en Todo Chile"
- Description: "Asesoría contable, tributaria y de administración de personal 100% remota para emprendedores y empresas de todo Chile. Atención cercana y a tiempo, con raíces en San Carlos, Región de Ñuble."

**servicios.html**
- Title: "Servicios de Contabilidad, Impuestos y Personal | Atención Remota en Todo Chile — Francisca Arriagada"
- Description: "Contabilidad, cumplimiento tributario (Renta, IVA, F29 y F22), administración de personal y asesoría para pymes. Atención remota para todo Chile, con base en San Carlos, Región de Ñuble."

**sobre-mi.html**
- Title: "Sobre mí | Asesoría Contable Cercana y Remota en Todo Chile — Francisca Arriagada"
- Description: "Conoce a Francisca Arriagada: dedicada a acompañar a emprendedores y empresas de la Región de Ñuble y de todo Chile en su orden contable y tributario, con atención remota."

**contacto.html**
- Title: "Contacto | Asesoría Contable y Tributaria Remota en Todo Chile — Francisca Arriagada"
- Description: "Escríbenos por WhatsApp, correo o formulario. Atención remota a nivel nacional, de lunes a viernes de 10:30 a 19:00 hrs. Respuesta a la brevedad."

**404.html**
- Title: "Página no encontrada | Francisca Arriagada"
- Description: "La página que buscas no existe. Vuelve al inicio del sitio de Francisca Arriagada."

## 4. Cuarta tarjeta de servicio — "Otros Servicios" (index.html)

Insertar después de la tarjeta "Administración de Personal" en `.services-grid`:
```html
<article class="service-card">
  <div class="service-card__icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="m7 10 2 2 4-4"/><line x1="21" y1="21" x2="15.5" y2="15.5"/></svg>
  </div>
  <h3 class="service-card__title">Otros Servicios</h3>
  <p class="service-card__desc">Diagnóstico de tu situación tributaria, acompañamiento en la creación de tu empresa y respuesta a tus consultas.</p>
  <a href="servicios.html#otros-servicios" class="service-card__link">Ver más
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  </a>
</article>
```
Ícono: lupa (círculo + mango, misma construcción que otros íconos del sitio) con un check dentro — representa diagnóstico/revisión, reutiliza primitivas ya usadas (círculo, check, línea diagonal).

## 5. Layout de grilla de 4 tarjetas — `assets/css/styles.css` `.services-grid`

Reemplazar el bloque completo (elimina el hack de centrado del 3er ítem, ya no aplica con 4):
```css
.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}
@media (min-width: 768px) {
  .services-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .services-grid { grid-template-columns: repeat(4, 1fr); }
}
```
Resultado: 1 columna mobile, 2×2 tablet, 4 en fila desktop — simétrico sin necesitar `nth-child` especial.

## 6. Contenido completo `servicios.html`

Banner: H1 "Soluciones contables, tributarias y de personal para tu negocio, en cualquier parte de Chile"; subtítulo "Un servicio integral, remoto a nivel nacional, para que no tengas que preocuparte de la parte administrativa de tu empresa."

**Contabilidad** — "Llevamos tu contabilidad al día, desde la puesta en marcha de tu negocio hasta los balances de cada periodo." Ítems: iniciación y puesta en marcha (incluida Constitución de Sociedades); determinación/declaración/pago de Impuestos Mensuales; tramitación de Factura y Boleta Electrónica; Contabilidad Completa y Simplificada, Balances y Estados de Resultados; Trámites Generales. Dirigido a: pymes, emprendedores y personas naturales con giro en cualquier parte de Chile.

**Cumplimiento Tributario** — "Cumplimiento tributario a tiempo ante el SII, sin sorpresas ni multas." Ítems: Declaraciones Juradas de Renta; determinación/declaración/pago o devolución de Impuesto a la Renta; revisión y rectificación de observaciones de Renta o IVA (F29 y F22); representación ante el SII; Trámites Generales. Dirigido a: empresas y personas naturales con giro que declaran Renta/IVA u tienen observaciones del SII pendientes.

**Administración de Personal** — "Gestión laboral completa para que tu equipo esté contratado, pagado y declarado correctamente." Ítems: Contratos de Trabajo y Finiquitos; Liquidaciones de Sueldo; Cotizaciones Previsionales; Libro de Remuneraciones Electrónico (empresas de 5+ trabajadores); Trámites Generales. Dirigido a: negocios con trabajadores o por contratar.

**Otros Servicios** (nueva sección `id="otros-servicios"`, patrón `.service-detail service-detail--reverse`) — "Diagnóstico, orientación para crear tu empresa y respuesta a tus consultas, cuando lo necesites." Ítems: Reviso tu Pyme (diagnóstico de cumplimiento tributario); acompañamiento en creación de empresas (tipo de empresa, régimen tributario, obligaciones); atención de consultas. Dirigido a: quienes quieren saber si su pyme está al día, van a crear una empresa, o tienen una consulta puntual. CTA: "Solicitar este servicio" → contacto.html.

FAQ (último ítem) actualizado: "¿Atienden solo en San Carlos o también de forma remota?" → "Atendemos de forma remota a nivel nacional, para clientes de todo Chile. También ofrecemos atención presencial en San Carlos y la Región de Ñuble, si prefieres una reunión cara a cara."

## 7. Sobre mí (`sobre-mi.html`)

Banner: iniciales "FA", H1 "Francisca Arriagada", subtítulo "Dedicada a acompañar a emprendedores y empresas de la Región de Ñuble y de Chile en su orden contable y tributario."

Bio: lead = "Trabajo día a día junto a distintos tipos de negocios tanto en San Carlos y alrededores, como con empresas de todo el territorio nacional, acompañando su orden contable y tributario." Párrafo 2 (sin cambios de fondo, ya establecido). Párrafo 3 ajustado: "Hoy ofrezco un servicio contable, tributario y de administración de personal completo, de forma remota para clientes de todo Chile y presencial para quienes están en San Carlos y la Región de Ñuble, pensado para pequeñas empresas y personas naturales con giro que buscan una asesoría cercana, sin tecnicismos y sin quedar solas frente al SII."

Compromiso profesional / Valores: sin cambios (no geográficos, no credenciales).

Línea de tiempo, ítem "Actualidad": descripción actualizada a "Atención remota a clientes de todo Chile, y presencial en San Carlos y la Región de Ñuble."

## 8. Horario actualizado

Tarjeta de contacto (`contacto.html`): "Lunes a viernes, 10:30 a 19:00 hrs."
Footer (5 páginas): "Lunes a viernes<br>10:30 – 19:00"

## Archivos afectados
- `index.html`, `servicios.html`, `sobre-mi.html`, `contacto.html`, `404.html`
- `README.md` (solo nombre)
- `assets/css/styles.css` (bloque `.services-grid`)
