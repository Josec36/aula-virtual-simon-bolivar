const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
               'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS  = ['Lu','Ma','Mi','Ju','Vi','Sá','Do'];
const EVENTOS = [13, 16, 20];
let hoy = new Date();
let mes = hoy.getMonth();
let anio = hoy.getFullYear();

function renderCal() {
  document.getElementById('cal-titulo').textContent = MESES[mes] + ' ' + anio;
  const grid = document.getElementById('cal-grid');
  grid.innerHTML = '';

  DIAS.forEach(d => {
    const el = document.createElement('div');
    el.className = 'cal-dia-nombre';
    el.textContent = d;
    grid.appendChild(el);
  });

  const primerDia = new Date(anio, mes, 1).getDay();
  const inicio = primerDia === 0 ? 6 : primerDia - 1;
  const totalDias = new Date(anio, mes + 1, 0).getDate();

  for (let i = 0; i < inicio; i++) {
    const el = document.createElement('div');
    el.className = 'cal-dia vacio';
    grid.appendChild(el);
  }

  for (let d = 1; d <= totalDias; d++) {
    const el = document.createElement('div');
    let cls = 'cal-dia';
    if (d === hoy.getDate() && mes === hoy.getMonth() && anio === hoy.getFullYear()) {
      cls += ' hoy';
    } else if (EVENTOS.includes(d) && mes === hoy.getMonth()) {
      cls += ' evento';
    }
    el.className = cls;
    el.textContent = d;
    grid.appendChild(el);
  }
}

function cambiarMes(dir) {
  mes += dir;
  if (mes < 0)  { mes = 11; anio--; }
  if (mes > 11) { mes = 0;  anio++; }
  renderCal();
}

renderCal();