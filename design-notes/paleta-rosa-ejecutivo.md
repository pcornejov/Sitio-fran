# Cambio de paleta — "Rosa Ejecutivo"

El usuario revisó 3 propuestas de rediseño con más tonos rosados (presentadas como artifacts/archivos HTML: comparación de swatches + preview funcional con selector en vivo) y eligió la **Propuesta 3 — Rosa Ejecutivo**: el ancla oscura del sitio (header/footer/nav) se mantiene neutra (grafito, igual de seria que el navy original) y el rosado aparece solo como acento en botones y detalles.

## Tokens aplicados en `assets/css/styles.css`

```css
--color-primary: #2B2730;        /* Grafito */
--color-primary-hover: #201D25;
--color-primary-active: #17151A;
--color-primary-tint-10: #F4E1E5; /* Rosa empolvado 10% */
--color-primary-tint-05: #F9EDEF;

--color-accent: #E0A0AE;         /* Rosa empolvado — CTA primario */
--color-accent-hover: #B5677A;   /* Vino — hover */
--color-accent-active: #B5677A;
--color-accent-tint: #F7E5E9;

--color-bg: #F9F6F7;
--color-text-primary: #221F23;
--color-text-secondary: #635A5E;
--color-text-on-accent: #221F23; /* Texto sobre botón rosa: oscuro, nunca blanco */
```

Además se actualizaron las sombras (`--shadow-sm/md/lg`, `--shadow-focus`, inset de `.btn--primary:active`) que hardcodeaban el rgba del navy/ámbar anterior, para que sigan siendo coherentes con la nueva paleta.

El verde de WhatsApp (`#25D366`) no cambia (reconocimiento de marca de terceros). No se tocó estructura HTML, componentes ni JS — solo valores de tokens de color.

## Verificación de contraste (heredada de la propuesta aprobada)
- Primario `#2B2730` vs texto blanco: 14.6:1
- Acento `#E0A0AE` vs texto oscuro `#221F23`: 7.6:1
- Fondo `#F9F6F7` vs texto `#221F23`: 15.2:1

Todos pasan WCAG AA cómodamente.
