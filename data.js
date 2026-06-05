// Mock data for each sector
// Months consistent across the app
window.MONTHS = [
  { key: 'ene', short: 'ENE', year: 2026 },
  { key: 'feb', short: 'FEB', year: 2026 },
  { key: 'mar', short: 'MAR', year: 2026 },
  { key: 'abr', short: 'ABR', year: 2026 },
  { key: 'may', short: 'MAY', year: 2026 },
];

// Accent palette per sector (CSS variables applied as inline style)
const acc = {
  blue:   { '--accent': 'linear-gradient(90deg,#6FA0F2,#8DB3F7)', '--accent-color': '#4F86E8', '--accent-soft': '#EAF2FE', '--accent-glow': 'rgba(111,160,242,0.26)' },
  cyan:   { '--accent': 'linear-gradient(90deg,#6CC8DC,#8DB3F7)', '--accent-color': '#2F9CB5', '--accent-soft': '#E3F4F8', '--accent-glow': 'rgba(108,200,220,0.28)' },
  purple: { '--accent': 'linear-gradient(90deg,#A8A4F0,#C9B6F2)', '--accent-color': '#6E68C9', '--accent-soft': '#EFEDFB', '--accent-glow': 'rgba(168,164,240,0.28)' },
  amber:  { '--accent': 'linear-gradient(90deg,#E8B86A,#F0CE8E)', '--accent-color': '#B68235', '--accent-soft': '#FBF1DF', '--accent-glow': 'rgba(232,184,106,0.30)' },
  green:  { '--accent': 'linear-gradient(90deg,#5EBA8A,#9AD4B2)', '--accent-color': '#2C7E51', '--accent-soft': '#E4F2EA', '--accent-glow': 'rgba(94,186,138,0.28)' },
  red:    { '--accent': 'linear-gradient(90deg,#E26666,#F09898)', '--accent-color': '#A8453C', '--accent-soft': '#F8E5E3', '--accent-glow': 'rgba(226,102,102,0.26)' },
};
window.ACCENTS = acc;

// Sector catalog — shown on Panel Ejecutivo as buttons
window.SECTORS = [
  {
    id: 'empresa',
    group: 'UNIDADES',
    name: 'Empresa Total',
    sub: 'Visión consolidada · todas las razones sociales',
    accent: 'blue',
    iconKey: 'building',
    logo: 'assets/empresa total.png',
    headerSub: 'Consolidado de todas las unidades operativas',
    tags: ['1.842 empleados', '12 accidentes YTD'],
  },
  {
    id: 'sabores',
    group: 'UNIDADES',
    name: 'Sabores Express',
    sub: 'Cadena de locales gastronómicos',
    accent: 'blue',
    iconKey: 'utensils',
    logo: 'assets/sabores.png',
    headerSub: 'Cadena de locales gastronómicos · Mayo 2026',
    tags: ['501 empleados', '4 accidentes YTD'],
  },
  {
    id: 'extremas',
    group: 'UNIDADES',
    name: 'Extremas',
    sub: 'Operación logística y distribución',
    accent: 'cyan',
    iconKey: 'truck',
    logo: 'assets/extremas.png',
    headerSub: 'Operación logística y distribución · Mayo 2026',
    tags: ['384 empleados', '3 accidentes YTD'],
  },
  {
    id: 'staff',
    group: 'UNIDADES',
    name: 'Staff',
    sub: 'Áreas corporativas y administración',
    accent: 'purple',
    iconKey: 'briefcase',
    logo: 'assets/Staff.png',
    headerSub: 'Áreas corporativas y administración · Mayo 2026',
    tags: ['126 empleados', '0 accidentes YTD'],
  },
  {
    id: 'fabrica',
    group: 'UNIDADES',
    name: 'Fábrica',
    sub: 'Plantas productivas',
    accent: 'amber',
    iconKey: 'factory',
    logo: 'assets/fabrica.png',
    headerSub: 'Plantas productivas · Mayo 2026',
    tags: ['831 empleados', '5 accidentes YTD'],
  },
  {
    id: 'judiciales',
    group: 'GESTIÓN',
    name: 'Inf. Judiciales',
    sub: 'Acuerdos y resoluciones por razón social',
    accent: 'purple',
    iconKey: 'gavel',
    logo: 'assets/informes judiciales.png',
    headerSub: 'Acuerdos y resoluciones · año en curso',
    tags: ['30 acuerdos', '$127.6M'],
  },
  {
    id: 'inspecciones',
    group: 'GESTIÓN',
    name: 'Inspecciones',
    sub: 'Visitas, observaciones y cumplimiento',
    accent: 'green',
    iconKey: 'search',
    logo: 'assets/inspecciones.png',
    headerSub: 'Visitas regulatorias y de cumplimiento',
    tags: ['58 visitas', '94% conformes'],
  },
  {
    id: 'horasextras',
    group: 'GESTIÓN',
    name: 'Horas Extras',
    sub: 'Horas, costo y distribución por unidad',
    accent: 'amber',
    iconKey: 'clock',
    logo: 'assets/horas extras.png',
    headerSub: 'Horas extras, costo y distribución · Mayo 2026',
    tags: ['3.420 hs', '$18.4M'],
  },
  {
    id: 'accidentabilidad',
    group: 'GESTIÓN',
    name: 'Accidentabilidad',
    sub: 'Tasa, días caídos y reporte de siniestros',
    accent: 'red',
    iconKey: 'alert',
    logo: 'assets/accidentabilidad.png',
    headerSub: 'Tasa, días caídos y reporte de siniestros · Mayo 2026',
    tags: ['12 siniestros', '186 días caídos'],
  },
];

// ============ Per-sector dataset ============
// Each sector has: kpis (2-3), charts (1-2), optional details (accordions)
window.SECTOR_DATA = {
  empresa: {
    kpis: [
      { label: 'Dotación', value: '1.842', delta: { dir: 'up', text: '+12 vs. mes anterior' } },
      { label: 'Ausentismo', value: '4.2%',  delta: { dir: 'up', text: '+0.18 pp vs. mes ant.' } },
      { label: 'Rotación',  value: '6.1%',  delta: { dir: 'down', text: '−0.3 pp vs. mes ant.' } },
    ],
    charts: [
      {
        type: 'line',
        title: 'Evolución Dotación',
        sub: 'Ene–May 2026 · resaltado mes activo',
        data: [{x:'Ene',y:1808},{x:'Feb',y:1815},{x:'Mar',y:1822},{x:'Abr',y:1830},{x:'May',y:1842}],
      },
      {
        type: 'bar',
        title: 'Ausentismo',
        sub: '% por mes',
        data: [{x:'Ene',y:4.0},{x:'Feb',y:4.1},{x:'Mar',y:4.3},{x:'Abr',y:4.0},{x:'May',y:4.2}],
      },
      {
        type: 'line',
        title: 'Rotación',
        sub: '% por mes',
        data: [{x:'Ene',y:6.6},{x:'Feb',y:6.5},{x:'Mar',y:6.4},{x:'Abr',y:6.4},{x:'May',y:6.1}],
      },
      {
        type: 'bar',
        title: 'Rotación por unidad',
        sub: '% mes activo',
        data: [{x:'Sabores',y:5.8},{x:'Extremas',y:7.2},{x:'Staff',y:3.1},{x:'Fábrica',y:6.9}],
      },
    ],
  },
  sabores: {
    kpis: [
      { label: 'Dotación',  value: '501',  delta: { dir: 'up', text: '+3 vs. mes anterior' } },
      { label: 'Ausentismo',value: '3.8%', delta: { dir: 'up', text: '+0.24 pp vs. mes ant.' } },
      { label: 'Rotación',  value: '5.8%', delta: { dir: 'up', text: '+0.1 pp vs. mes ant.' } },
    ],
    charts: [
      {
        type: 'line',
        title: 'Evolución Dotación',
        sub: 'Ene–May 2026 · resaltado mes activo',
        data: [{x:'Ene',y:496},{x:'Feb',y:498},{x:'Mar',y:497},{x:'Abr',y:498},{x:'May',y:501}],
      },
      {
        type: 'bar',
        title: 'Ausentismo',
        sub: '% por mes',
        data: [{x:'Ene',y:3.4},{x:'Feb',y:3.6},{x:'Mar',y:4.1},{x:'Abr',y:3.56},{x:'May',y:3.8}],
      },
      {
        type: 'line',
        title: 'Rotación',
        sub: '% por mes',
        data: [{x:'Ene',y:5.5},{x:'Feb',y:5.6},{x:'Mar',y:5.7},{x:'Abr',y:5.7},{x:'May',y:5.8}],
      },
      {
        type: 'bar',
        title: 'Rotación por zona',
        sub: '% mes activo',
        data: [{x:'Zona Norte',y:6.4},{x:'Zona Sur',y:5.2},{x:'Zona Oeste',y:6.9},{x:'CABA',y:4.6}],
      },
    ],
  },
  extremas: {
    kpis: [
      { label: 'Dotación',  value: '384',  delta: { dir: 'up', text: '+4 vs. mes anterior' } },
      { label: 'Ausentismo',value: '4.4%', delta: { dir: 'down', text: '−0.3 pp vs. mes ant.' } },
      { label: 'Rotación',  value: '7.2%', delta: { dir: 'up', text: '+0.2 pp vs. mes ant.' } },
    ],
    charts: [
      {
        type: 'line',
        title: 'Evolución Dotación',
        sub: 'Ene–May 2026 · resaltado mes activo',
        data: [{x:'Ene',y:372},{x:'Feb',y:376},{x:'Mar',y:379},{x:'Abr',y:380},{x:'May',y:384}],
      },
      {
        type: 'bar',
        title: 'Ausentismo',
        sub: '% por mes',
        data: [{x:'Ene',y:4.9},{x:'Feb',y:5.1},{x:'Mar',y:4.7},{x:'Abr',y:4.7},{x:'May',y:4.4}],
      },
      {
        type: 'line',
        title: 'Rotación',
        sub: '% por mes',
        data: [{x:'Ene',y:6.8},{x:'Feb',y:6.9},{x:'Mar',y:7.0},{x:'Abr',y:7.0},{x:'May',y:7.2}],
      },
      {
        type: 'bar',
        title: 'Rotación por sector',
        sub: '% mes activo',
        data: [{x:'Logística',y:8.1},{x:'Depósito',y:7.4},{x:'Distribución',y:6.6},{x:'Admin.',y:3.2}],
      },
    ],
  },
  staff: {
    kpis: [
      { label: 'Dotación',  value: '126', delta: { dir: 'up', text: '+2 vs. mes anterior' } },
      { label: 'Ausentismo',value: '1.9%', delta: { dir: 'down', text: '−0.2 pp vs. mes ant.' } },
      { label: 'Rotación',  value: '3.1%', delta: { dir: 'down', text: '−0.4 pp vs. mes ant.' } },
    ],
    charts: [
      {
        type: 'line',
        title: 'Evolución Dotación',
        sub: 'Ene–May 2026 · resaltado mes activo',
        data: [{x:'Ene',y:121},{x:'Feb',y:122},{x:'Mar',y:124},{x:'Abr',y:124},{x:'May',y:126}],
      },
      {
        type: 'bar',
        title: 'Ausentismo',
        sub: '% por mes',
        data: [{x:'Ene',y:2.2},{x:'Feb',y:2.0},{x:'Mar',y:2.1},{x:'Abr',y:2.1},{x:'May',y:1.9}],
      },
      {
        type: 'line',
        title: 'Rotación',
        sub: '% por mes',
        data: [{x:'Ene',y:3.6},{x:'Feb',y:3.5},{x:'Mar',y:3.5},{x:'Abr',y:3.5},{x:'May',y:3.1}],
      },
      {
        type: 'bar',
        title: 'Rotación por gerencia',
        sub: '% mes activo',
        data: [{x:'Admin.',y:2.6},{x:'Comercial',y:4.2},{x:'Sistemas',y:3.0},{x:'RRHH',y:2.1},{x:'Legales',y:1.4}],
      },
    ],
  },
  fabrica: {
    kpis: [
      { label: 'Dotación',   value: '831', delta: { dir: 'up', text: '+5 vs. mes anterior' } },
      { label: 'Ausentismo', value: '5.1%', delta: { dir: 'up', text: '+0.3 pp vs. mes ant.' } },
      { label: 'Rotación',   value: '6.9%', delta: { dir: 'down', text: '−0.2 pp vs. mes ant.' } },
    ],
    charts: [
      {
        type: 'line',
        title: 'Evolución Dotación',
        sub: 'Ene–May 2026 · resaltado mes activo',
        data: [{x:'Ene',y:812},{x:'Feb',y:818},{x:'Mar',y:822},{x:'Abr',y:826},{x:'May',y:831}],
      },
      {
        type: 'bar',
        title: 'Ausentismo',
        sub: '% por mes',
        data: [{x:'Ene',y:4.6},{x:'Feb',y:4.8},{x:'Mar',y:5.0},{x:'Abr',y:4.8},{x:'May',y:5.1}],
      },
      {
        type: 'line',
        title: 'Rotación',
        sub: '% por mes',
        data: [{x:'Ene',y:7.3},{x:'Feb',y:7.2},{x:'Mar',y:7.1},{x:'Abr',y:7.1},{x:'May',y:6.9}],
      },
      {
        type: 'bar',
        title: 'Rotación por sector',
        sub: '% mes activo',
        data: [{x:'Producción',y:7.8},{x:'Mantenim.',y:5.4},{x:'Calidad',y:4.1},{x:'Logística',y:6.7},{x:'Admin.',y:3.0}],
      },
    ],
  },
  judiciales: {
    kpis: [
      { label: 'Total acuerdos — mes activo', value: '$127.6M', delta: { dir: 'neutral', text: '30 acuerdos' } },
      { label: 'Total acuerdos — año ant.', value: '$76.3M',  delta: { dir: 'neutral', text: '27 acuerdos' } },
      { label: 'Variación interanual',      value: '+67.3%', delta: { dir: 'up', text: '$76.3M → $127.6M' }, valueClass: 'is-down' },
    ],
    charts: [
      {
        type: 'hbar',
        title: 'Monto por razón social — mes activo',
        sub: 'Millones $',
        data: [
          {x:'PISANIELLO IVO',y:27},
          {x:'LA EMPANADERIA',y:25},
          {x:'CASUT FRIJON',y:17},
          {x:'CASTRO CINTIA',y:14},
          {x:'SAYAGO MARCIO',y:12},
          {x:'RUANO ROJAS',y:8},
          {x:'BOLLOS Y',y:7},
          {x:'SORIA FRANCISCO',y:6},
          {x:'RIOS BRUNO',y:5},
          {x:'COMACHI VALERIA',y:4},
          {x:'VICTORICA BARBARA',y:3},
          {x:'GONZALEZ MIGUEL',y:1},
        ],
      },
      {
        type: 'donut',
        title: 'Distribución por tipo (monto)',
        sub: '% del total',
        data: [
          { label:'Fábrica',  value: 42 },
          { label:'Sabores',  value: 34 },
          { label:'Extremas', value: 24 },
        ],
      },
    ],
    details: [
      {
        key: 'detalle-acuerdos',
        title: 'Detalle acuerdos',
        iconEmoji: '⚖️',
        accent: 'purple',
        type: 'table',
        topChips: [
          { label:'Fábrica',  value:'20%', tone:'blue' },
          { label:'Locales',  value:'80%', tone:'green' },
          { label:'Staff',    value:'0%',  tone:'purple' },
        ],
        columns: [
          { key:'razon',  label:'RAZÓN SOCIAL' },
          { key:'unidad', label:'UNIDAD' },
          { key:'tipo',   label:'TIPO', badge:true },
          { key:'actor',  label:'ACTOR', align:'right' },
          { key:'total',  label:'TOTAL', align:'right', strong:true },
        ],
        rows: [
          { razon:'BOLLOS Y RELLENOS S.A',     unidad:'MANTENIMIENTO FABRICA',  tipo:'Fábrica',  actor:'$5.000.000', total:'$6.339.470' },
          { razon:'CASTRO CINTIA NOEMI',       unidad:'SABORES ENTRE RIOS',     tipo:'Sabores',  actor:'$4.000.000', total:'$4.931.670' },
          { razon:'CASTRO CINTIA NOEMI',       unidad:'EXTREMAS SAN FERNANDO',  tipo:'Extremas', actor:'$2.000.000', total:'$2.782.294' },
          { razon:'CASTRO CINTIA NOEMI',       unidad:'EXTREMAS SAN FERNANDO',  tipo:'Extremas', actor:'$5.000.000', total:'$5.782.294' },
          { razon:'CASUT FRIJON MATIAS EZEQUIEL', unidad:'SABORES LANUS',       tipo:'Sabores',  actor:'$3.600.000', total:'$4.595.390' },
          { razon:'CASUT FRIJON MATIAS EZEQUIEL', unidad:'HURLINGHAM SABORES II',tipo:'Sabores', actor:'$8.000.000', total:'$9.756.658' },
          { razon:'CASUT FRIJON MATIAS EZEQUIEL', unidad:'EXTREMAS LUJAN',      tipo:'Extremas', actor:'$2.018.000', total:'$2.026.035' },
          { razon:'COMACHI VALERIA SABRINA',   unidad:'SABORES BALLESTER II',   tipo:'Sabores',  actor:'$3.000.000', total:'$3.759.320' },
          { razon:'PISANIELLO IVO',            unidad:'SABORES EL PALOMAR',     tipo:'Sabores',  actor:'$4.500.000', total:'$5.121.840' },
          { razon:'SAYAGO MARCIO',             unidad:'MANTENIMIENTO FABRICA',  tipo:'Fábrica',  actor:'$6.200.000', total:'$7.480.220' },
        ],
      },
    ],
  },
  inspecciones: {
    kpis: [
      { label: 'Visitas realizadas', value: '58',  delta: { dir: 'up', text: '+6 vs. mes anterior' } },
      { label: 'Conformidad',         value: '94%', delta: { dir: 'up', text: '+2 pp vs. mes ant.' } },
      { label: 'Observaciones abiertas', value: '11', delta: { dir: 'down', text: '−4 vs. mes ant.' } },
    ],
    charts: [
      {
        type: 'bar',
        title: 'Inspecciones por unidad',
        sub: 'Mes activo',
        data: [
          {x:'Sabores',y:22},{x:'Extremas',y:14},{x:'Fábrica',y:18},{x:'Staff',y:4},
        ],
      },
      {
        type: 'donut',
        title: 'Resultado de visitas',
        sub: '% del total',
        data: [
          { label:'Conformes', value: 54 },
          { label:'Obs. menores', value: 32 },
          { label:'Obs. mayores', value: 10 },
          { label:'No conformes', value: 4 },
        ],
      },
    ],
    details: [
      {
        key: 'resoluciones',
        title: 'Resoluciones sin multa — Ahorro estimado',
        iconEmoji: '✅',
        accent: 'green',
        type: 'table',
        columns: [
          { key:'razon',    label:'RAZÓN SOCIAL' },
          { key:'local',    label:'LOCAL / MINISTERIO' },
          { key:'pers',     label:'PERS. INSP.',  align:'right' },
          { key:'resultado',label:'RESULTADO',    badge:'good' },
          { key:'ahorro',   label:'AHORRO ESTIMADO', align:'right', strong:true, color:'green' },
        ],
        rows: [
          { razon:'PISANIELLO IVO',  local:'Sabores El Palomar', pers:6, resultado:'Sin multa', ahorro:'$5.243.552' },
        ],
        totalRow: { label:'TOTAL  AHORRO', value:'$5.243.552', color:'green' },
      },
      {
        key: 'multas',
        title: 'Multas aplicadas',
        iconEmoji: '🔍',
        accent: 'blue',
        type: 'table',
        columns: [
          { key:'razon',  label:'RAZÓN SOCIAL' },
          { key:'local',  label:'LOCAL' },
          { key:'multas', label:'MULTAS', align:'right' },
          { key:'monto',  label:'MONTO',  align:'right', strong:true },
        ],
        rows: [
          { razon:'ADRIAN FRANCISCO SORIA',  local:'SE - Boulogne', multas:1, monto:'$9.000' },
          { razon:'SAYAGO MARCIO H. N.',     local:'SE-CASEROS/LA PLATA/LOMAS/MORENO/QUILMES/SAN ISIDRO/SAN MARTIN', multas:1, monto:'$120.298' },
          { razon:'SAYAGO LEANDRO M. A.',    local:'SE - Cruce Castelar', multas:1, monto:'$2.407.235' },
          { razon:'BOLLOS Y RELLENOS',       local:'Oficina 228 Paralelo', multas:1, monto:'$6.164.035' },
        ],
        totalRow: { label:'TOTAL', value:'$8.700.568', extra:'4' },
      },
      {
        key: 'comparativo',
        title: 'Comparativo por uniperso — Mes ant. vs. mes activo',
        iconEmoji: '📋',
        accent: 'purple',
        type: 'comparativo',
        leftLabel: 'Mes anterior',
        rightLabel: 'Mes activo',
        columns: ['INSP.', 'AUD.', 'MULTAS', 'MONTO'],
        rows: [
          { razon:'CASTRO CINTIA NOEMI',    left:[0,0,0,'—'], right:[1,1,0,'—'] },
          { razon:'GONZALEZ MIGUEL ANGEL',  left:[1,1,0,'—'], right:[1,1,0,'—'] },
          { razon:'PISANIELLO IVO',         left:[2,1,0,'—'], right:[3,2,0,'—'] },
          { razon:'SAYAGO MARCIO H. N.',    left:[0,0,0,'—'], right:[1,0,1,'$120.298'] },
          { razon:'BOLLOS Y RELLENOS',      left:[1,0,0,'—'], right:[1,0,1,'$6.164.035'] },
        ],
      },
    ],
  },
  horasextras: {
    kpis: [
      { label: 'Horas extras — mes activo', value: '3.420', delta: { dir: 'down', text: '−6.8% vs. mes anterior' } },
      { label: 'Costo del mes',             value: '$18.4M', delta: { dir: 'down', text: '−$1.3M vs. mes ant.' } },
      { label: '% sobre horas normales',    value: '7.9%',  delta: { dir: 'down', text: '−0.5 pp vs. mes ant.' } },
    ],
    charts: [
      {
        type: 'line',
        title: 'Evolución de horas extras',
        sub: 'Ene–May 2026 · total de horas',
        data: [{x:'Ene',y:3120},{x:'Feb',y:3380},{x:'Mar',y:3960},{x:'Abr',y:3670},{x:'May',y:3420}],
      },
      {
        type: 'donut',
        title: 'Distribución por unidad',
        sub: '% de horas extras',
        data: [
          { label:'Fábrica',   value: 46 },
          { label:'Sabores',   value: 28 },
          { label:'Extremas',  value: 19 },
          { label:'Staff',     value: 7  },
        ],
      },
    ],
    details: [
      {
        key: 'detalle-he',
        title: 'Detalle horas extras por unidad',
        iconEmoji: '⏱️',
        accent: 'amber',
        type: 'table',
        columns: [
          { key:'unidad',  label:'UNIDAD' },
          { key:'emp',     label:'EMP. CON HE', align:'right' },
          { key:'horas',   label:'HORAS', align:'right' },
          { key:'prom',    label:'PROM. X EMP.', align:'right' },
          { key:'costo',   label:'COSTO', align:'right', strong:true },
        ],
        rows: [
          { unidad:'FÁBRICA',  emp:148, horas:'1.573', prom:'10.6', costo:'$8.464.000' },
          { unidad:'SABORES',  emp:212, horas:'958',   prom:'4.5',  costo:'$5.152.000' },
          { unidad:'EXTREMAS', emp:96,  horas:'650',   prom:'6.8',  costo:'$3.496.000' },
          { unidad:'STAFF',    emp:31,  horas:'239',   prom:'7.7',  costo:'$1.286.000' },
        ],
        totalRow: { label:'TOTAL', value:'$18.398.000' },
      },
    ],
  },
  accidentabilidad: {
    kpis: [
      { label: 'Tasa — mes activo',  value: '4.38%', delta: { dir: 'down', text: '−38.9% vs. mes anterior' } },
      { label: 'Siniestros del mes', value: '12',    delta: { dir: 'down', text: '−3 vs. mes anterior' } },
      { label: 'Días caídos',        value: '186',   delta: { dir: 'down', text: '−24 vs. mes anterior' } },
    ],
    charts: [
      {
        type: 'bar',
        title: 'Siniestros por mes',
        sub: 'Cantidad',
        data: [{x:'Ene',y:18},{x:'Feb',y:21},{x:'Mar',y:16},{x:'Abr',y:15},{x:'May',y:12}],
      },
      {
        type: 'donut',
        title: 'Motivo del siniestro',
        sub: '% del total',
        data: [
          { label:'In itinere',  value: 38 },
          { label:'Caída',       value: 24 },
          { label:'Golpe',       value: 18 },
          { label:'Corte',       value: 12 },
          { label:'Otros',       value: 8  },
        ],
      },
    ],
    details: [
      {
        key: 'reporte-siniestros',
        title: 'Reporte de Actividad — Siniestros Locales & Staff',
        iconEmoji: '🛎️',
        accent: 'red',
        type: 'siniestros-report',
        groups: [
          {
            person: 'LEDESMA DEMIAN NAHUEL YAIR',
            local: 'LOCAL SAN MIGUEL EXTREMAS',
            tag: 'ART',
            rows: [
              { medida: 'Medidas Técnicas',     responsable: 'HYS',                          fecha: '19/08/26' },
              { medida: 'Medidas Organizativas',responsable: 'RRHH – OPERACIONES – HYS',     fecha: '30/06/26' },
              { medida: 'Medidas Formativas',   responsable: 'HYS - OPERACIONES',            fecha: '19/08/26' },
            ],
          },
          {
            person: 'JADE ARIANA RAMIREZ HUAMAN',
            local: 'LOCAL PACHECO EXTREMAS',
            tag: 'SS',
            rows: [
              { medida: 'Medidas Técnicas',     responsable: 'HYS',                          fecha: '28/08/26' },
              { medida: 'Medidas Organizativas',responsable: 'RRHH – OPERACIONES – HYS',     fecha: '30/06/26' },
              { medida: 'Medidas Formativas',   responsable: 'HYS - OPERACIONES',            fecha: '28/08/26' },
            ],
          },
          {
            person: 'LUZ MAITENA GOMEZ',
            local: 'LOCAL LAFERRERE SABORES',
            tag: 'SS',
            rows: [
              { medida: 'Medidas Técnicas',     responsable: 'Mantenimiento / Operaciones',  fecha: '01/06/26' },
              { medida: 'Medidas Organizativas',responsable: 'Op. / HYS / Mantenimiento',    fecha: '01/06/26' },
              { medida: 'Medidas Formativas',   responsable: 'HYS',                          fecha: '12/05/26' },
            ],
          },
        ],
      },
    ],
  },
};
