(function () {
  'use strict';

  var TASA_IVA = 0.19;
  var TASA_RETENCION_HONORARIOS = 0.1525; // vigente 2026 (Ley 21.133) — confirmar cada año

  function formatThousands(n) {
    var rounded = Math.round(n || 0);
    var sign = rounded < 0 ? '-' : '';
    var digits = Math.abs(rounded).toString();
    var withDots = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return sign + withDots;
  }

  function formatCurrency(n) {
    return '$' + formatThousands(n);
  }

  function parseAmount(rawValue) {
    var digitsOnly = (rawValue || '').replace(/\D/g, '');
    if (digitsOnly === '') return 0;
    var value = parseInt(digitsOnly, 10);
    return isNaN(value) ? 0 : value;
  }

  function maskInputOnInput(inputEl) {
    var amount = parseAmount(inputEl.value);
    inputEl.value = amount === 0 && inputEl.value === '' ? '' : formatThousands(amount);
    return amount;
  }

  var ivaMontoInput = document.getElementById('iva-monto');
  var ivaModoNeto = document.getElementById('modo-neto');
  var ivaModoBruto = document.getElementById('modo-bruto');
  var ivaLabel = document.getElementById('iva-monto-label');
  var ivaResultNeto = document.getElementById('iva-resultado-neto');
  var ivaResultIva = document.getElementById('iva-resultado-iva');
  var ivaResultTotal = document.getElementById('iva-resultado-total');

  if (ivaMontoInput && ivaModoNeto && ivaModoBruto) {
    function ivaRecalcular() {
      var amount = maskInputOnInput(ivaMontoInput);
      var modoEsNeto = ivaModoNeto.checked;
      var neto, iva, total;

      if (modoEsNeto) {
        neto = amount;
        iva = Math.round(neto * TASA_IVA);
        total = neto + iva;
      } else {
        total = amount;
        neto = Math.round(total / (1 + TASA_IVA));
        iva = total - neto;
      }

      ivaResultNeto.textContent = formatCurrency(neto);
      ivaResultIva.textContent = formatCurrency(iva);
      ivaResultTotal.textContent = formatCurrency(total);

      if (ivaLabel) {
        ivaLabel.textContent = modoEsNeto ? 'Monto neto ($)' : 'Monto bruto / total ($)';
      }
    }

    ivaMontoInput.addEventListener('input', ivaRecalcular);
    ivaModoNeto.addEventListener('change', ivaRecalcular);
    ivaModoBruto.addEventListener('change', ivaRecalcular);

    ivaRecalcular();
  }

  var honMontoInput = document.getElementById('honorarios-monto');
  var honLiquidoA = document.getElementById('honorarios-liquido-a');
  var honBrutoA = document.getElementById('honorarios-bruto-a');
  var honBrutoB = document.getElementById('honorarios-bruto-b');
  var honLiquidoB = document.getElementById('honorarios-liquido-b');

  if (honMontoInput && honLiquidoA && honBrutoA && honBrutoB && honLiquidoB) {
    function honorariosRecalcular() {
      var amount = maskInputOnInput(honMontoInput);

      var liquidoA = amount;
      var brutoA = Math.round(liquidoA / (1 - TASA_RETENCION_HONORARIOS));

      var brutoB = amount;
      var liquidoB = Math.round(brutoB * (1 - TASA_RETENCION_HONORARIOS));

      honLiquidoA.textContent = formatCurrency(liquidoA);
      honBrutoA.textContent = formatCurrency(brutoA);
      honBrutoB.textContent = formatCurrency(brutoB);
      honLiquidoB.textContent = formatCurrency(liquidoB);
    }

    honMontoInput.addEventListener('input', honorariosRecalcular);

    honorariosRecalcular();
  }
})();
