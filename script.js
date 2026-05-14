/* ═══════════════════════════════════════════
   AULA VIRTUAL — Colegio Simón Bolívar
   script.js · versión 2.0
═══════════════════════════════════════════ */

/* ── 1. NAVEGACIÓN ACTIVA ── */
(function () {
  const pagina = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === pagina) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();


/* ── 2. CALENDARIO ── */
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
               'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS  = ['Lu','Ma','Mi','Ju','Vi','Sá','Do'];

// Eventos: { dia, mes (0-11), anio, texto }
const EVENTOS_DATA = [
  { dia: 13, mes: 4, anio: 2026, texto: 'Laboratorio de Ciencias' },
  { dia: 16, mes: 4, anio: 2026, texto: 'Examen de Matemáticas' },
  { dia: 20, mes: 4, anio: 2026, texto: 'Entrega de libretas' },
  { dia: 26, mes: 4, anio: 2026, texto: 'Reunión de padres' },
];

let hoy  = new Date();
let mes  = hoy.getMonth();
let anio = hoy.getFullYear();

function tienеEvento(dia, m, a) {
  return EVENTOS_DATA.some(e => e.dia === dia && e.mes === m && e.anio === a);
}

function renderCal() {
  const tituloEl = document.getElementById('cal-titulo');
  const grid     = document.getElementById('cal-grid');
  if (!tituloEl || !grid) return;

  tituloEl.textContent = MESES[mes] + ' ' + anio;
  grid.innerHTML = '';

  // Encabezados días
  DIAS.forEach(d => {
    const el = document.createElement('div');
    el.className = 'cal-dia-nombre';
    el.textContent = d;
    grid.appendChild(el);
  });

  // Espacios vacíos al inicio
  const primerDia = new Date(anio, mes, 1).getDay();
  const inicio    = primerDia === 0 ? 6 : primerDia - 1;
  for (let i = 0; i < inicio; i++) {
    const el = document.createElement('div');
    el.className = 'cal-dia vacio';
    grid.appendChild(el);
  }

  // Días del mes
  const totalDias = new Date(anio, mes + 1, 0).getDate();
  for (let d = 1; d <= totalDias; d++) {
    const el  = document.createElement('div');
    let   cls = 'cal-dia';

    const esHoy    = d === hoy.getDate() && mes === hoy.getMonth() && anio === hoy.getFullYear();
    const esEvento = tienеEvento(d, mes, anio);

    if (esHoy)         cls += ' hoy';
    else if (esEvento) cls += ' evento';

    el.className   = cls;
    el.textContent = d;

    // Tooltip con nombre del evento
    if (esEvento) {
      const ev = EVENTOS_DATA.find(e => e.dia === d && e.mes === mes && e.anio === anio);
      if (ev) el.title = ev.texto;
    }

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


/* ── 3. NAVEGACIÓN ACTIVA EN MÓVIL (menú hamburguesa) ── */
(function () {
  const btnMenu = document.getElementById('btn-menu');
  const navMenu = document.getElementById('nav-menu');
  if (!btnMenu || !navMenu) return;

  btnMenu.addEventListener('click', () => {
    const abierto = navMenu.classList.toggle('nav-abierto');
    btnMenu.setAttribute('aria-expanded', abierto);
  });

  // Cierra el menú al hacer clic en un enlace
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('nav-abierto');
      btnMenu.setAttribute('aria-expanded', false);
    });
  });
})();


/* ── 4. ANUNCIOS — marcar como leído ── */
(function () {
  document.querySelectorAll('.anuncio').forEach(anuncio => {
    anuncio.addEventListener('click', function () {
      this.classList.add('leido');
      const dot = this.querySelector('.anuncio-dot');
      if (dot) dot.style.opacity = '0.3';
    });
  });
})();


/* ── 5. TARJETAS DE MATERIAS — efecto clic ── */
(function () {
  document.querySelectorAll('.materia-card').forEach(card => {
    card.addEventListener('click', function (e) {
      // Evita navegación doble si ya tiene href real
      const href = this.getAttribute('href');
      if (href && href !== '#') return;

      e.preventDefault();
      this.style.transform = 'scale(0.97)';
      setTimeout(() => { this.style.transform = ''; }, 150);
    });
  });
})();


/* ── 6. RECURSOS — efecto clic ── */
(function () {
  document.querySelectorAll('.recurso').forEach(recurso => {
    recurso.addEventListener('click', function () {
      const nombre = this.querySelector('.recurso-nombre');
      if (!nombre) return;
      const original = nombre.style.color;
      nombre.style.color = 'var(--guinda)';
      setTimeout(() => { nombre.style.color = original; }, 400);
    });
  });
})();


/* ── 7. USUARIO — mostrar nombre guardado ── */
(function () {
  const spanUsuario = document.querySelector('.btn-usuario span');
  const divAvatar   = document.querySelector('.avatar');
  const nombre      = sessionStorage.getItem('usuario_nombre');

  if (nombre && spanUsuario) {
    spanUsuario.textContent = nombre;
    if (divAvatar) {
      divAvatar.textContent = nombre.slice(0, 2).toUpperCase();
    }
  }
})();


/* ── 8. SALUDO DINÁMICO EN HERO ── */
(function () {
  const h1 = document.querySelector('.hero h1');
  if (!h1) return;

  const hora = new Date().getHours();
  let saludo = 'Bienvenido al Aula Virtual';

  if (hora >= 5  && hora < 12) saludo = 'Buenos días — Aula Virtual';
  if (hora >= 12 && hora < 19) saludo = 'Buenas tardes — Aula Virtual';
  if (hora >= 19 || hora < 5)  saludo = 'Buenas noches — Aula Virtual';

  h1.textContent = saludo;
})();


/* ── 9. CONTADOR DE TAREAS PENDIENTES EN HERO ── */
(function () {
  const tarjetas = document.querySelectorAll('.materia-card');
  let pendientes = 0;

  tarjetas.forEach(card => {
    const tag = card.querySelector('.tag');
    if (tag && tag.textContent.includes('pendiente')) pendientes++;
  });

  const statNums = document.querySelectorAll('.stat-num');
  // El tercer stat-num es "Tareas pendientes"
  if (statNums[2]) statNums[2].textContent = pendientes;
})();