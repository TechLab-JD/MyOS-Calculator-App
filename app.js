// MyOS Calculator — button-driven, evaluated from a sanitized expression.
const display = document.getElementById('calc-display');
const grid = document.getElementById('calc-grid');

if (display && grid) {
  const keys = [
    ['C', 'C'], ['(', '('], [')', ')'], ['÷', '/'],
    ['7', '7'], ['8', '8'], ['9', '9'], ['×', '*'],
    ['4', '4'], ['5', '5'], ['6', '6'], ['−', '-'],
    ['1', '1'], ['2', '2'], ['3', '3'], ['+', '+'],
    ['0', '0'], ['.', '.'], ['⌫', 'back'], ['=', '=']
  ];
  const ops = new Set(['/', '*', '-', '+']);
  let expr = '';
  const render = () => { display.value = expr || '0'; };

  keys.forEach(([label, val]) => {
    const b = document.createElement('button');
    b.textContent = label;
    if (ops.has(val)) b.className = 'op';
    if (val === '=') b.className = 'eq';
    b.addEventListener('click', () => {
      if (val === 'C') expr = '';
      else if (val === 'back') expr = expr.slice(0, -1);
      else if (val === '=') {
        if (!/^[0-9+\-*/().\s]*$/.test(expr) || !expr) { display.value = expr ? 'Error' : '0'; expr = ''; return; }
        try {
          const r = Function('"use strict"; return (' + expr + ')')();
          expr = (r == null || !isFinite(r)) ? '' : String(r);
        } catch (e) { display.value = 'Error'; expr = ''; return; }
      } else expr += val;
      render();
    });
    grid.appendChild(b);
  });
  render();
}
