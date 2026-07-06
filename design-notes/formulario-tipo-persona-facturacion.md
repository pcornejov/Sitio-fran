# Formulario de contacto — grupos de radio "Tipo de persona" y "Volumen de facturación"

Inspirado en el formulario de herrerayasociados.cl (concepto y opciones reales, no copia de código). Se insertan después de Teléfono y antes de Mensaje en `contacto.html`. Ningún grupo es `required` (son campos de contexto, no bloqueantes, igual que Teléfono ya es opcional). Sin `checked` por defecto.

## HTML a insertar (entre Teléfono y Mensaje)

```html
<div class="form-field">
  <span class="form-field__label-standalone">Tipo de persona / régimen</span>
  <div class="radio-group" role="radiogroup" aria-label="Tipo de persona o régimen">
    <div class="radio-option">
      <input type="radio" id="tipo-persona-natural" name="tipo-persona" value="persona-natural" class="radio-option__input">
      <label for="tipo-persona-natural" class="radio-option__label">Persona Natural</label>
    </div>
    <div class="radio-option">
      <input type="radio" id="tipo-persona-empresa" name="tipo-persona" value="empresa" class="radio-option__input">
      <label for="tipo-persona-empresa" class="radio-option__label">Empresa</label>
    </div>
    <div class="radio-option">
      <input type="radio" id="tipo-persona-emprendimiento" name="tipo-persona" value="emprendimiento-formalizacion" class="radio-option__input">
      <label for="tipo-persona-emprendimiento" class="radio-option__label">Emprendimiento en vías de formalización</label>
    </div>
  </div>
</div>

<div class="form-field">
  <span class="form-field__label-standalone">Volumen de facturación mensual aproximado</span>
  <div class="radio-group" role="radiogroup" aria-label="Volumen de facturación mensual aproximado">
    <div class="radio-option">
      <input type="radio" id="volumen-sin-movimiento" name="volumen-facturacion" value="sin-movimiento" class="radio-option__input">
      <label for="volumen-sin-movimiento" class="radio-option__label">Sin movimiento aún</label>
    </div>
    <div class="radio-option">
      <input type="radio" id="volumen-menos-5m" name="volumen-facturacion" value="menos-5m" class="radio-option__input">
      <label for="volumen-menos-5m" class="radio-option__label">Menos de $5M</label>
    </div>
    <div class="radio-option">
      <input type="radio" id="volumen-5m-20m" name="volumen-facturacion" value="5m-20m" class="radio-option__input">
      <label for="volumen-5m-20m" class="radio-option__label">Entre $5M y $20M</label>
    </div>
    <div class="radio-option">
      <input type="radio" id="volumen-mas-20m" name="volumen-facturacion" value="mas-20m" class="radio-option__input">
      <label for="volumen-mas-20m" class="radio-option__label">Más de $20M</label>
    </div>
  </div>
</div>
```

Patrón: `.form-field__label-standalone` (ya existe, usado en calculadora-iva.html) como etiqueta de grupo; `role="radiogroup"` + `aria-label` igual que `.calc-toggle` en las calculadoras. Layout apilado (no toggle segmentado, que es para 2 opciones) porque acá hay 3-4 opciones cada uno.

## Campo Mensaje reforzado (reemplaza el bloque actual)

```html
<div class="form-field">
  <label for="mensaje">Cuéntanos un poco más sobre tu situación <span class="required">*</span></label>
  <textarea id="mensaje" name="mensaje" required placeholder="Cuéntame en qué etapa está tu negocio o tu situación tributaria, y en qué te gustaría que te ayude."></textarea>
</div>
```

Mismo `<textarea id="mensaje">` ya existente — solo cambia el label y se agrega placeholder. Sigue `required`.

## CSS nuevo en `assets/css/styles.css` (junto a `.form-field`, patrón de formulario general)

```css
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-top: var(--space-xs);
}

.radio-option {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  transition: border-color 0.2s, background-color 0.2s;
}

.radio-option:has(.radio-option__input:checked) {
  border-color: var(--color-primary);
  background-color: var(--color-primary-tint-05);
}

.radio-option:focus-within {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-focus);
}

.radio-option__input {
  accent-color: var(--color-primary);
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  cursor: pointer;
}

.radio-option__label {
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  color: var(--color-text-primary);
  cursor: pointer;
}
```

Todos los valores son tokens ya existentes. `:has()` es progressive enhancement (sin soporte, el radio sigue funcionando, solo no se resalta la tarjeta).

## Alcance

Solo estructura/contenido del formulario. `onsubmit="return false"` no cambia, no se agrega JS de validación/envío, el comentario existente sobre falta de backend sigue vigente.
