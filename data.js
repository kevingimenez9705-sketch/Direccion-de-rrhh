// data.js — datos reales por mes (Ene–May 2026)
// Fuentes: indicadores__2026.xlsx, Altas_y_Bajas, Horas_extras, Infracciones, INFORME_JUDICIAL, Siniestralidad
// May 2026: ACTUALIZADO con datos reales de todos los módulos

window.MONTHS = [
  { key: 'ene', short: 'ENE', year: 2026 },
  { key: 'feb', short: 'FEB', year: 2026 },
  { key: 'mar', short: 'MAR', year: 2026 },
  { key: 'abr', short: 'ABR', year: 2026 },
  { key: 'may', short: 'MAY', year: 2026 },
];

const acc = {
  blue:   { '--accent': 'linear-gradient(90deg,#6FA0F2,#8DB3F7)', '--accent-color': '#4F86E8', '--accent-soft': '#EAF2FE', '--accent-glow': 'rgba(111,160,242,0.26)' },
  cyan:   { '--accent': 'linear-gradient(90deg,#6CC8DC,#8DB3F7)', '--accent-color': '#2F9CB5', '--accent-soft': '#E3F4F8', '--accent-glow': 'rgba(108,200,220,0.28)' },
  purple: { '--accent': 'linear-gradient(90deg,#A8A4F0,#C9B6F2)', '--accent-color': '#6E68C9', '--accent-soft': '#EFEDFB', '--accent-glow': 'rgba(168,164,240,0.28)' },
  amber:  { '--accent': 'linear-gradient(90deg,#E8B86A,#F0CE8E)', '--accent-color': '#B68235', '--accent-soft': '#FBF1DF', '--accent-glow': 'rgba(232,184,106,0.30)' },
  green:  { '--accent': 'linear-gradient(90deg,#5EBA8A,#9AD4B2)', '--accent-color': '#2C7E51', '--accent-soft': '#E4F2EA', '--accent-glow': 'rgba(94,186,138,0.28)' },
  red:    { '--accent': 'linear-gradient(90deg,#E26666,#F09898)', '--accent-color': '#A8453C', '--accent-soft': '#F8E5E3', '--accent-glow': 'rgba(226,102,102,0.26)' },
};
window.ACCENTS = acc;

window.SECTORS = [
  { id:'empresa',         group:'UNIDADES', name:'Empresa Total',    sub:'Visión consolidada · todas las razones sociales', accent:'blue',   iconKey:'building',  logo:'assets/empresa total.png',       headerSub:'Consolidado de todas las unidades operativas',          tags:['~1.842 empleados','477 siniestros hist.'] },
  { id:'sabores',         group:'UNIDADES', name:'Sabores Express',  sub:'Cadena de locales gastronómicos',                 accent:'blue',   iconKey:'utensils',  logo:'assets/sabores.png',             headerSub:'Cadena de locales gastronómicos · May 2026',            tags:['Locales Sabores','183 altas May'] },
  { id:'extremas',        group:'UNIDADES', name:'Extremas',         sub:'Operación logística y distribución',             accent:'cyan',   iconKey:'truck',     logo:'assets/extremas.png',            headerSub:'Operación logística y distribución · May 2026',         tags:['Locales Extremas','Ausentismo 4.13%'] },
  { id:'staff',           group:'UNIDADES', name:'Staff',            sub:'Áreas corporativas y administración',            accent:'purple', iconKey:'briefcase', logo:'assets/Staff.png',               headerSub:'Áreas corporativas y administración · May 2026',        tags:['Personal Staff','Rotación 5.66%'] },
  { id:'fabrica',         group:'UNIDADES', name:'Fábrica',          sub:'Plantas productivas',                            accent:'amber',  iconKey:'factory',   logo:'assets/fabrica.png',             headerSub:'Plantas productivas · May 2026',                        tags:['Ausentismo 9.61%','77 altas May'] },
  { id:'judiciales',      group:'GESTIÓN',  name:'Inf. Judiciales',  sub:'Acuerdos y resoluciones por razón social',       accent:'purple', iconKey:'gavel',     logo:'assets/informes judiciales.png', headerSub:'Acuerdos y resoluciones · Mayo 2026',                   tags:['39 acuerdos','$389.8M'] },
  { id:'inspecciones',    group:'GESTIÓN',  name:'Inspecciones',     sub:'Visitas, observaciones y cumplimiento',          accent:'green',  iconKey:'search',    logo:'assets/inspecciones.png',        headerSub:'Visitas regulatorias y de cumplimiento · Mayo 2026',    tags:['20 inspecciones','5 multas'] },
  { id:'horasextras',     group:'GESTIÓN',  name:'Horas Extras',     sub:'Horas, costo y distribución por unidad',         accent:'amber',  iconKey:'clock',     logo:'assets/horas extras.png',        headerSub:'Horas extras, costo y distribución · Abr 2026',         tags:['4.169 hs','$49.2M'] },
  { id:'accidentabilidad',group:'GESTIÓN',  name:'Accidentabilidad', sub:'Tasa, días caídos y reporte de siniestros',      accent:'red',    iconKey:'alert',     logo:'assets/accidentabilidad.png',    headerSub:'Tasa, días caídos y reporte de siniestros · Jun 2026',  tags:['477 siniestros hist.','13.160 días caídos'] },
];

// ─────────────────────────────────────────────
// HELPERS reutilizables para gráficos de tendencia
// ─────────────────────────────────────────────
const ausentismoEmpresaTendencia = [
  {x:'Ene',y:4.26},{x:'Feb',y:4.33},{x:'Mar',y:6.03},{x:'Abr',y:5.99},{x:'May',y:5.37},
];
const ausentismoSaboresTendencia = [
  {x:'Ene',y:4.74},{x:'Feb',y:4.16},{x:'Mar',y:5.17},{x:'Abr',y:3.56},{x:'May',y:3.99},
];
const ausentismoExtremasTendencia = [
  {x:'Ene',y:1.40},{x:'Feb',y:1.29},{x:'Mar',y:7.17},{x:'Abr',y:4.38},{x:'May',y:4.13},
];
const ausentismoFabricaTendencia = [
  {x:'Ene',y:8.60},{x:'Feb',y:6.67},{x:'Mar',y:9.21},{x:'Abr',y:11.43},{x:'May',y:9.61},
];
const horasExtrasTendencia = [
  {x:'Ene',y:6325},{x:'Feb',y:4479},{x:'Mar',y:3779},{x:'Abr',y:4169},
];
const costoExtrasTendencia = [
  {x:'Ene',y:67.3},{x:'Feb',y:49.4},{x:'Mar',y:38.8},{x:'Abr',y:49.2},
];

// ─────────────────────────────────────────────
// SECTOR DATA — estructura: sector > mes > { kpis, charts, details? }
// ─────────────────────────────────────────────
window.SECTOR_DATA = {

  // ══════════════════════════════════════════
  // EMPRESA TOTAL
  // ══════════════════════════════════════════
  empresa: {
    ene: {
      kpis: [
        { label:'Ausentismo Empresa', value:'4.26%', delta:{ dir:'neutral', text:'Base 93.981 días · Ene 2026' } },
        { label:'Altas del mes',      value:'472',   delta:{ dir:'up',      text:'Bajas: 381' } },
        { label:'Siniestros acum.',   value:'5',     delta:{ dir:'neutral', text:'Fábrica: 3 · Locales: 2' } },
      ],
      charts: [
        { type:'line',  title:'Ausentismo empresa — tendencia', sub:'% Ene–May 2026', data: ausentismoEmpresaTendencia },
        { type:'bar',   title:'Ausentismo por unidad — Ene',    sub:'%', data:[{x:'Staff',y:0},{x:'Fábricas',y:8.6},{x:'Extremas',y:1.4},{x:'Sabores',y:4.74}] },
        { type:'bar',   title:'Altas y Bajas — Ene',            sub:'Cantidad', data:[{x:'Altas',y:472},{x:'Bajas',y:381},{x:'Aperturas',y:70}] },
        { type:'bar',   title:'Bajas prematuras — Ene',         sub:'Promedio YTD', data:[{x:'1° Mes',y:22},{x:'1° Quincena',y:19},{x:'1° Día',y:25}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Ausentismo Empresa', value:'4.33%', delta:{ dir:'up',   text:'Base 90.808 días · Feb 2026' } },
        { label:'Altas del mes',      value:'402',   delta:{ dir:'down', text:'Bajas: 337' } },
        { label:'Siniestros acum.',   value:'11',    delta:{ dir:'up',   text:'Fábrica: 8 · Locales: 3' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo empresa — tendencia', sub:'% Ene–May 2026', data: ausentismoEmpresaTendencia },
        { type:'bar',  title:'Ausentismo por unidad — Feb',    sub:'%', data:[{x:'Staff',y:6.56},{x:'Fábricas',y:6.67},{x:'Extremas',y:1.29},{x:'Sabores',y:4.16}] },
        { type:'bar',  title:'Altas y Bajas — Feb',            sub:'Cantidad', data:[{x:'Altas',y:402},{x:'Bajas',y:337},{x:'Aperturas',y:116}] },
        { type:'bar',  title:'Bajas prematuras — Feb',         sub:'Promedio YTD', data:[{x:'1° Mes',y:39},{x:'1° Quincena',y:62},{x:'1° Día',y:7}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Ausentismo Empresa', value:'6.03%', delta:{ dir:'up',   text:'Base 96.812 días · Mar 2026' } },
        { label:'Altas del mes',      value:'437',   delta:{ dir:'up',   text:'Bajas: 311' } },
        { label:'Siniestros acum.',   value:'23',    delta:{ dir:'up',   text:'Fábrica: 14 · Locales: 9' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo empresa — tendencia', sub:'% Ene–May 2026', data: ausentismoEmpresaTendencia },
        { type:'bar',  title:'Ausentismo por unidad — Mar',    sub:'%', data:[{x:'Staff',y:5.74},{x:'Fábricas',y:9.21},{x:'Extremas',y:7.17},{x:'Sabores',y:5.17}] },
        { type:'bar',  title:'Altas y Bajas — Mar',            sub:'Cantidad', data:[{x:'Altas',y:437},{x:'Bajas',y:311},{x:'Aperturas',y:80}] },
        { type:'bar',  title:'Bajas prematuras — Mar',         sub:'YTD', data:[{x:'1° Mes',y:41.6},{x:'1° Quincena',y:32.5},{x:'1° Día',y:15.9}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Ausentismo Empresa', value:'5.99%', delta:{ dir:'down', text:'Base 101.574 días · Abr 2026' } },
        { label:'Altas del mes',      value:'182',   delta:{ dir:'down', text:'Bajas: 153' } },
        { label:'Siniestros acum.',   value:'137',   delta:{ dir:'up',   text:'2.197 días caídos totales' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo empresa — tendencia', sub:'% Ene–May 2026', data: ausentismoEmpresaTendencia },
        { type:'bar',  title:'Ausentismo por unidad — Abr',    sub:'%', data:[{x:'Staff',y:9.28},{x:'Fábricas',y:11.43},{x:'Extremas',y:4.38},{x:'Sabores',y:3.56}] },
        { type:'bar',  title:'Altas y Bajas — Abr',            sub:'Cantidad', data:[{x:'Altas',y:182},{x:'Bajas',y:153},{x:'Aperturas',y:37}] },
        { type:'bar',  title:'Bajas prematuras — YTD',         sub:'Promedio YTD', data:[{x:'1° Mes',y:41.6},{x:'1° Quincena',y:32.5},{x:'1° Día',y:15.9}] },
      ],
    },
    may: {
      kpis: [
        { label:'Ausentismo Empresa', value:'5.37%', delta:{ dir:'down', text:'Base 105.322 días · May 2026' } },
        { label:'Altas locales May',  value:'406',   delta:{ dir:'up',   text:'Sabores: 183 · Extremas: 223' } },
        { label:'Siniestros hist.',   value:'477',   delta:{ dir:'up',   text:'13.160 días caídos acum.' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo empresa — tendencia', sub:'% Ene–May 2026', data: ausentismoEmpresaTendencia },
        { type:'bar',  title:'Ausentismo por unidad — May',    sub:'%', data:[{x:'Staff',y:5.28},{x:'Fábricas',y:9.61},{x:'Extremas',y:4.13},{x:'Sabores',y:3.99}] },
        { type:'bar',  title:'Altas locales — May',            sub:'Cantidad', data:[{x:'Sabores',y:183},{x:'Extremas',y:223},{x:'Fábrica',y:77},{x:'Staff',y:22}] },
        { type:'bar',  title:'Rotación por unidad — May',      sub:'%', data:[{x:'Extremas',y:12.15},{x:'Sabores',y:8.50},{x:'Fábrica',y:7.51},{x:'Staff',y:5.66}] },
      ],
    },
  },

  // ══════════════════════════════════════════
  // SABORES
  // ══════════════════════════════════════════
  sabores: {
    ene: {
      kpis: [
        { label:'Ausentismo Sabores', value:'4.74%', delta:{ dir:'neutral', text:'Base 36.478 días · Ene 2026' } },
        { label:'Aus. injustificadas', value:'131',  delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Vacaciones',          value:'1.185',delta:{ dir:'neutral', text:'Días vacaciones Ene' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Sabores — tendencia', sub:'% Ene–May 2026', data: ausentismoSaboresTendencia },
        { type:'bar',  title:'Días por causa — Ene', sub:'Días', data:[{x:'Aus.Injust.',y:131},{x:'Suspensión',y:50},{x:'Lic.Enf.',y:290},{x:'ART',y:41},{x:'Vacaciones',y:1185}] },
        { type:'bar',  title:'Siniestros locales — tipo YTD', sub:'Cantidad', data:[{x:'In Itinere',y:17},{x:'Laboral',y:35},{x:'Laboral*',y:1}] },
        { type:'bar',  title:'Bajas prematuras — YTD', sub:'Promedio', data:[{x:'1° Mes',y:41.6},{x:'1° Quincena',y:32.5},{x:'1° Día',y:15.9}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Ausentismo Sabores', value:'4.16%', delta:{ dir:'down',    text:'Base 37.694 días · Feb 2026' } },
        { label:'Aus. injustificadas', value:'136',  delta:{ dir:'up',      text:'Feb 2026' } },
        { label:'Licencia enfermedad', value:'168',  delta:{ dir:'neutral', text:'Días Feb 2026' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Sabores — tendencia', sub:'% Ene–May 2026', data: ausentismoSaboresTendencia },
        { type:'bar',  title:'Días por causa — Feb', sub:'Días', data:[{x:'Aus.Injust.',y:136},{x:'Suspensión',y:64},{x:'Lic.Enf.',y:168},{x:'ART',y:58},{x:'Vacaciones',y:1133}] },
        { type:'bar',  title:'Siniestros locales — tipo YTD', sub:'Cantidad', data:[{x:'In Itinere',y:17},{x:'Laboral',y:35},{x:'Laboral*',y:1}] },
        { type:'bar',  title:'Bajas prematuras — YTD', sub:'Promedio', data:[{x:'1° Mes',y:41.6},{x:'1° Quincena',y:32.5},{x:'1° Día',y:15.9}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Ausentismo Sabores', value:'5.17%', delta:{ dir:'up',      text:'Base 37.208 días · Mar 2026' } },
        { label:'Aus. injustificadas', value:'146',  delta:{ dir:'up',      text:'Mar 2026' } },
        { label:'Licencia enfermedad', value:'325',  delta:{ dir:'up',      text:'Días Mar 2026' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Sabores — tendencia', sub:'% Ene–May 2026', data: ausentismoSaboresTendencia },
        { type:'bar',  title:'Días por causa — Mar', sub:'Días', data:[{x:'Aus.Injust.',y:146},{x:'Suspensión',y:101},{x:'Lic.Enf.',y:325},{x:'ART',y:66},{x:'Vacaciones',y:1272}] },
        { type:'bar',  title:'Siniestros locales — tipo YTD', sub:'Cantidad', data:[{x:'In Itinere',y:17},{x:'Laboral',y:35},{x:'Laboral*',y:1}] },
        { type:'bar',  title:'Bajas prematuras — YTD', sub:'Promedio', data:[{x:'1° Mes',y:41.6},{x:'1° Quincena',y:32.5},{x:'1° Día',y:15.9}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Ausentismo Sabores', value:'3.56%', delta:{ dir:'down',    text:'Base 43.532 días · Abr 2026' } },
        { label:'Aus. injustificadas', value:'304',  delta:{ dir:'up',      text:'Abr 2026' } },
        { label:'Licencia enfermedad', value:'387',  delta:{ dir:'up',      text:'Días Abr 2026' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Sabores — tendencia', sub:'% Ene–May 2026', data: ausentismoSaboresTendencia },
        { type:'bar',  title:'Días por causa — Abr', sub:'Días', data:[{x:'Aus.Injust.',y:304},{x:'Suspensión',y:159},{x:'Lic.Enf.',y:387},{x:'ART',y:45},{x:'Vacaciones',y:621},{x:'Maternidad',y:8}] },
        { type:'bar',  title:'Siniestros locales — tipo YTD', sub:'Cantidad', data:[{x:'In Itinere',y:17},{x:'Laboral',y:35},{x:'Laboral*',y:1}] },
        { type:'bar',  title:'Bajas prematuras — YTD', sub:'Promedio', data:[{x:'1° Mes',y:41.6},{x:'1° Quincena',y:32.5},{x:'1° Día',y:15.9}] },
      ],
    },
    may: {
      kpis: [
        { label:'Ausentismo Sabores', value:'3.99%', delta:{ dir:'up',      text:'Base 45.732 días · May 2026' } },
        { label:'Aus. injustificadas', value:'910',  delta:{ dir:'up',      text:'May 2026 — acum. locales' } },
        { label:'Altas Sabores May',   value:'183',  delta:{ dir:'up',      text:'19 no se presentaron' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Sabores — tendencia', sub:'% Ene–May 2026', data: ausentismoSaboresTendencia },
        { type:'bar',  title:'Días por causa — May', sub:'Días', data:[{x:'Aus.Injust.',y:910},{x:'Suspensión',y:169},{x:'Lic.Enf.',y:433},{x:'ART',y:31},{x:'Vacaciones',y:190}] },
        { type:'bar',  title:'Altas Sabores — May 2026', sub:'Cantidad', data:[{x:'Presentados',y:164},{x:'No se presentaron',y:19}] },
        { type:'bar',  title:'Rotación locales — May 2026', sub:'%', data:[{x:'Extremas',y:12.15},{x:'Sabores',y:8.50}] },
      ],
    },
  },

  // ══════════════════════════════════════════
  // EXTREMAS
  // ══════════════════════════════════════════
  extremas: {
    ene: {
      kpis: [
        { label:'Ausentismo Extremas', value:'1.40%', delta:{ dir:'neutral', text:'Base 28.562 días · Ene 2026' } },
        { label:'Aus. injustificadas', value:'38',    delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Hs extras Extremas',  value:'796 hs',delta:{ dir:'neutral', text:'$8.607.819 liquidados' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Extremas — tendencia', sub:'% Ene–May 2026', data: ausentismoExtremasTendencia },
        { type:'bar',  title:'Días por causa — Ene', sub:'Días', data:[{x:'Aus.Injust.',y:38},{x:'Suspensión',y:13},{x:'Lic.Enf.',y:36},{x:'ART',y:82},{x:'Vacaciones',y:223}] },
        { type:'line', title:'Horas extras Extremas — tendencia', sub:'Hs por mes', data:[{x:'Ene',y:796},{x:'Feb',y:611},{x:'Mar',y:379},{x:'Abr',y:415}] },
        { type:'bar',  title:'Siniestros locales — tipo YTD', sub:'Cantidad', data:[{x:'In Itinere',y:17},{x:'Laboral',y:35},{x:'Laboral*',y:1}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Ausentismo Extremas', value:'1.29%', delta:{ dir:'down',    text:'Base 22.008 días · Feb 2026' } },
        { label:'Aus. injustificadas', value:'19',    delta:{ dir:'down',    text:'Feb 2026' } },
        { label:'Hs extras Extremas',  value:'611 hs',delta:{ dir:'down',    text:'$6.798.946 liquidados' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Extremas — tendencia', sub:'% Ene–May 2026', data: ausentismoExtremasTendencia },
        { type:'bar',  title:'Días por causa — Feb', sub:'Días', data:[{x:'Aus.Injust.',y:19},{x:'Suspensión',y:4},{x:'Lic.Enf.',y:0},{x:'ART',y:100},{x:'Vacaciones',y:147}] },
        { type:'line', title:'Horas extras Extremas — tendencia', sub:'Hs por mes', data:[{x:'Ene',y:796},{x:'Feb',y:611},{x:'Mar',y:379},{x:'Abr',y:415}] },
        { type:'bar',  title:'Siniestros locales — tipo YTD', sub:'Cantidad', data:[{x:'In Itinere',y:17},{x:'Laboral',y:35},{x:'Laboral*',y:1}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Ausentismo Extremas', value:'7.17%', delta:{ dir:'up',      text:'Base 27.468 días · Mar 2026' } },
        { label:'Aus. injustificadas', value:'425',   delta:{ dir:'up',      text:'Mar 2026 — pico alto' } },
        { label:'Hs extras Extremas',  value:'379 hs',delta:{ dir:'down',    text:'$4.070.332 liquidados' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Extremas — tendencia', sub:'% Ene–May 2026', data: ausentismoExtremasTendencia },
        { type:'bar',  title:'Días por causa — Mar', sub:'Días', data:[{x:'Aus.Injust.',y:425},{x:'Suspensión',y:93},{x:'Lic.Enf.',y:327},{x:'ART',y:62},{x:'Vacaciones',y:690}] },
        { type:'line', title:'Horas extras Extremas — tendencia', sub:'Hs por mes', data:[{x:'Ene',y:796},{x:'Feb',y:611},{x:'Mar',y:379},{x:'Abr',y:415}] },
        { type:'bar',  title:'Siniestros locales — tipo YTD', sub:'Cantidad', data:[{x:'In Itinere',y:17},{x:'Laboral',y:35},{x:'Laboral*',y:1}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Ausentismo Extremas', value:'4.38%', delta:{ dir:'down',    text:'Base 27.144 días · Abr 2026' } },
        { label:'Aus. injustificadas', value:'294',   delta:{ dir:'down',    text:'Abr 2026' } },
        { label:'Hs extras Extremas',  value:'415 hs',delta:{ dir:'up',      text:'$5.044.575 liquidados' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Extremas — tendencia', sub:'% Ene–May 2026', data: ausentismoExtremasTendencia },
        { type:'bar',  title:'Días por causa — Abr', sub:'Días', data:[{x:'Aus.Injust.',y:294},{x:'Suspensión',y:148},{x:'Lic.Enf.',y:344},{x:'ART',y:100},{x:'Vacaciones',y:147}] },
        { type:'line', title:'Horas extras Extremas — tendencia', sub:'Hs por mes', data:[{x:'Ene',y:796},{x:'Feb',y:611},{x:'Mar',y:379},{x:'Abr',y:415}] },
        { type:'bar',  title:'Siniestros locales — tipo YTD', sub:'Cantidad', data:[{x:'In Itinere',y:17},{x:'Laboral',y:35},{x:'Laboral*',y:1}] },
      ],
    },
    may: {
      kpis: [
        { label:'Ausentismo Extremas', value:'4.13%', delta:{ dir:'down',    text:'Base 27.762 días · May 2026' } },
        { label:'Aus. injustificadas', value:'471',   delta:{ dir:'up',      text:'May 2026 — acum. locales' } },
        { label:'Altas Extremas May',  value:'223',   delta:{ dir:'up',      text:'20 no se presentaron' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Extremas — tendencia', sub:'% Ene–May 2026', data: ausentismoExtremasTendencia },
        { type:'bar',  title:'Días por causa — May', sub:'Días', data:[{x:'Aus.Injust.',y:471},{x:'Suspensión',y:130},{x:'Lic.Enf.',y:354},{x:'ART',y:46},{x:'Vacaciones',y:91},{x:'Maternidad',y:35}] },
        { type:'line', title:'Horas extras Extremas — tendencia', sub:'Hs por mes', data:[{x:'Ene',y:796},{x:'Feb',y:611},{x:'Mar',y:379},{x:'Abr',y:415}] },
        { type:'bar',  title:'Altas Extremas — May 2026', sub:'Cantidad', data:[{x:'Presentados',y:203},{x:'No se presentaron',y:20}] },
      ],
    },
  },

  // ══════════════════════════════════════════
  // STAFF
  // ══════════════════════════════════════════
  staff: {
    ene: {
      kpis: [
        { label:'Ausentismo Staff',     value:'0%',   delta:{ dir:'neutral', text:'Sin datos registrados Ene' } },
        { label:'Siniestros Mant/Staff',value:'9',    delta:{ dir:'neutral', text:'YTD · 6 in itinere · 3 laboral' } },
        { label:'Aus. injustificadas',  value:'0',    delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Ausentismo Staff por causa — Feb (último disp.)', sub:'Días', data:[{x:'Aus.Injust.',y:26},{x:'Suspensión',y:18},{x:'Lic.Enf.',y:42},{x:'ART',y:27},{x:'Vacaciones',y:407},{x:'Sancor',y:52}] },
        { type:'bar',  title:'Siniestros Mant/Staff — tipo YTD', sub:'Cantidad', data:[{x:'In Itinere',y:6},{x:'Laboral',y:2},{x:'Laboral*',y:1}] },
        { type:'bar',  title:'Gravedad siniestros — YTD', sub:'Cantidad', data:[{x:'Leve',y:8},{x:'Moderado',y:1}] },
        { type:'bar',  title:'Bajas prematuras — YTD', sub:'Promedio', data:[{x:'1° Mes',y:41.6},{x:'1° Quincena',y:32.5},{x:'1° Día',y:15.9}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Ausentismo Staff',     value:'6.56%', delta:{ dir:'up',      text:'Base días Staff · Feb 2026' } },
        { label:'Siniestros Mant/Staff',value:'9',     delta:{ dir:'neutral', text:'YTD · 6 in itinere · 3 laboral' } },
        { label:'Aus. injustificadas',  value:'26',    delta:{ dir:'neutral', text:'Feb 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Ausentismo Staff por causa — Feb', sub:'Días', data:[{x:'Aus.Injust.',y:26},{x:'Suspensión',y:18},{x:'Lic.Enf.',y:42},{x:'ART',y:27},{x:'Vacaciones',y:407},{x:'Sancor',y:52}] },
        { type:'bar',  title:'Siniestros Mant/Staff — tipo YTD', sub:'Cantidad', data:[{x:'In Itinere',y:6},{x:'Laboral',y:2},{x:'Laboral*',y:1}] },
        { type:'bar',  title:'Gravedad siniestros — YTD', sub:'Cantidad', data:[{x:'Leve',y:8},{x:'Moderado',y:1}] },
        { type:'bar',  title:'Bajas prematuras — YTD', sub:'Promedio', data:[{x:'1° Mes',y:41.6},{x:'1° Quincena',y:32.5},{x:'1° Día',y:15.9}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Ausentismo Staff',     value:'5.74%', delta:{ dir:'down',    text:'Mar 2026' } },
        { label:'Siniestros Mant/Staff',value:'9',     delta:{ dir:'neutral', text:'YTD · 6 in itinere · 3 laboral' } },
        { label:'Aus. injustificadas',  value:'S/D',   delta:{ dir:'neutral', text:'Dato no disponible Mar' } },
      ],
      charts: [
        { type:'bar',  title:'Ausentismo Staff por causa — Feb (último disp.)', sub:'Días', data:[{x:'Aus.Injust.',y:26},{x:'Suspensión',y:18},{x:'Lic.Enf.',y:42},{x:'ART',y:27},{x:'Vacaciones',y:407},{x:'Sancor',y:52}] },
        { type:'bar',  title:'Siniestros Mant/Staff — tipo YTD', sub:'Cantidad', data:[{x:'In Itinere',y:6},{x:'Laboral',y:2},{x:'Laboral*',y:1}] },
        { type:'bar',  title:'Gravedad siniestros — YTD', sub:'Cantidad', data:[{x:'Leve',y:8},{x:'Moderado',y:1}] },
        { type:'bar',  title:'Bajas prematuras — YTD', sub:'Promedio', data:[{x:'1° Mes',y:41.6},{x:'1° Quincena',y:32.5},{x:'1° Día',y:15.9}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Ausentismo Staff',     value:'9.28%', delta:{ dir:'up',      text:'Abr 2026 · incluye maternidad' } },
        { label:'Siniestros Mant/Staff',value:'9',     delta:{ dir:'neutral', text:'YTD · 6 in itinere · 3 laboral' } },
        { label:'Aus. injustificadas',  value:'S/D',   delta:{ dir:'neutral', text:'Dato no disponible Abr' } },
      ],
      charts: [
        { type:'bar',  title:'Ausentismo Staff por causa — Feb (último disp.)', sub:'Días', data:[{x:'Aus.Injust.',y:26},{x:'Suspensión',y:18},{x:'Lic.Enf.',y:42},{x:'ART',y:27},{x:'Vacaciones',y:407},{x:'Sancor',y:52}] },
        { type:'bar',  title:'Siniestros Mant/Staff — tipo YTD', sub:'Cantidad', data:[{x:'In Itinere',y:6},{x:'Laboral',y:2},{x:'Laboral*',y:1}] },
        { type:'bar',  title:'Gravedad siniestros — YTD', sub:'Cantidad', data:[{x:'Leve',y:8},{x:'Moderado',y:1}] },
        { type:'bar',  title:'Bajas prematuras — YTD', sub:'Promedio', data:[{x:'1° Mes',y:41.6},{x:'1° Quincena',y:32.5},{x:'1° Día',y:15.9}] },
      ],
    },
    may: {
      kpis: [
        { label:'Ausentismo Staff',     value:'5.28%', delta:{ dir:'down',    text:'Base 8.558 días · May 2026' } },
        { label:'Altas Staff — May',    value:'22',    delta:{ dir:'neutral', text:'Bajas: 20' } },
        { label:'Aus. injustificadas',  value:'40',    delta:{ dir:'neutral', text:'May 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Ausentismo Staff por causa — May', sub:'Días', data:[{x:'Aus.Injust.',y:40},{x:'Suspensión',y:11},{x:'Lic.Enf.',y:166},{x:'ART',y:5},{x:'Vacaciones',y:167},{x:'Maternidad',y:35}] },
        { type:'bar',  title:'Altas y Bajas Staff — May 2026', sub:'Cantidad', data:[{x:'Altas',y:22},{x:'Bajas',y:20}] },
        { type:'bar',  title:'Rotación Staff — May 2026', sub:'%', data:[{x:'Staff',y:5.66}] },
        { type:'bar',  title:'Siniestros Mant/Staff — tipo YTD', sub:'Cantidad', data:[{x:'In Itinere',y:6},{x:'Laboral',y:2},{x:'Laboral*',y:1}] },
      ],
    },
  },

  // ══════════════════════════════════════════
  // FÁBRICA
  // ══════════════════════════════════════════
  fabrica: {
    ene: {
      kpis: [
        { label:'Ausentismo Fábricas', value:'8.60%', delta:{ dir:'neutral', text:'Base 21.087 días · Ene 2026' } },
        { label:'Siniestros Fábrica',  value:'3',     delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Hs extras Logística', value:'3.399 hs', delta:{ dir:'neutral', text:'$37.992.978 Ene' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Fábricas — tendencia', sub:'% Ene–May 2026', data: ausentismoFabricaTendencia },
        { type:'bar',  title:'Siniestros fábrica — mensual YTD', sub:'Cantidad', data:[{x:'Ene',y:3},{x:'Feb',y:5},{x:'Mar',y:6},{x:'Abr',y:3}] },
        { type:'bar',  title:'Horas extras por sector — Ene', sub:'Horas', data:[{x:'Logística',y:3399},{x:'San Martín',y:805},{x:'San Miguel',y:359},{x:'Tapas 1',y:193},{x:'JYQ',y:196},{x:'Panificado',y:144},{x:'Congelados',y:134},{x:'Pizzas',y:107},{x:'Papelera',y:40}] },
        { type:'bar',  title:'Rotación por planta — May 2026', sub:'%', data:[{x:'San Martín',y:63.41},{x:'San Miguel',y:63.57},{x:'Tapas 1',y:60.61},{x:'JYQ',y:37.5},{x:'Panificado',y:28.04},{x:'Procesadora',y:19.35},{x:'Congelados',y:13.04}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Ausentismo Fábricas', value:'6.67%', delta:{ dir:'down',    text:'Base 23.010 días · Feb 2026' } },
        { label:'Siniestros Fábrica',  value:'5',     delta:{ dir:'up',      text:'Feb 2026' } },
        { label:'Hs extras Logística', value:'3.115 hs', delta:{ dir:'down', text:'$34.652.682 Feb' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Fábricas — tendencia', sub:'% Ene–May 2026', data: ausentismoFabricaTendencia },
        { type:'bar',  title:'Siniestros fábrica — mensual YTD', sub:'Cantidad', data:[{x:'Ene',y:3},{x:'Feb',y:5},{x:'Mar',y:6},{x:'Abr',y:3}] },
        { type:'bar',  title:'Horas extras por sector — Feb', sub:'Horas', data:[{x:'Logística',y:3115},{x:'JYQ',y:314},{x:'Extremas',y:611},{x:'Tapas 1',y:104},{x:'Proce.',y:139},{x:'San Martín',y:117},{x:'Papelera',y:30},{x:'Pizzas',y:36}] },
        { type:'bar',  title:'Rotación por planta — May 2026', sub:'%', data:[{x:'San Martín',y:63.41},{x:'San Miguel',y:63.57},{x:'Tapas 1',y:60.61},{x:'JYQ',y:37.5},{x:'Panificado',y:28.04},{x:'Procesadora',y:19.35},{x:'Congelados',y:13.04}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Ausentismo Fábricas', value:'9.21%', delta:{ dir:'up',      text:'Base 24.128 días · Mar 2026' } },
        { label:'Siniestros Fábrica',  value:'6',     delta:{ dir:'up',      text:'Mar 2026' } },
        { label:'Hs extras Logística', value:'2.304 hs', delta:{ dir:'down', text:'$24.373.594 Mar' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Fábricas — tendencia', sub:'% Ene–May 2026', data: ausentismoFabricaTendencia },
        { type:'bar',  title:'Siniestros fábrica — mensual YTD', sub:'Cantidad', data:[{x:'Ene',y:3},{x:'Feb',y:5},{x:'Mar',y:6},{x:'Abr',y:3}] },
        { type:'bar',  title:'Horas extras por sector — Mar', sub:'Horas', data:[{x:'Logística',y:2304},{x:'Medialunas',y:257},{x:'Extremas',y:379},{x:'JYQ',y:235},{x:'Proce.',y:222},{x:'San Miguel',y:171},{x:'Tapas 1',y:114},{x:'Tapas 2',y:44}] },
        { type:'bar',  title:'Rotación por planta — May 2026', sub:'%', data:[{x:'San Martín',y:63.41},{x:'San Miguel',y:63.57},{x:'Tapas 1',y:60.61},{x:'JYQ',y:37.5},{x:'Panificado',y:28.04},{x:'Procesadora',y:19.35},{x:'Congelados',y:13.04}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Ausentismo Fábricas', value:'11.43%', delta:{ dir:'up',     text:'Abr 2026 · base días fábricas' } },
        { label:'Siniestros Fábrica',  value:'3',      delta:{ dir:'down',   text:'Abr 2026 · 74 YTD total' } },
        { label:'Hs extras Logística', value:'2.364 hs', delta:{ dir:'up',   text:'$28.732.277 Abr' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Fábricas — tendencia', sub:'% Ene–May 2026', data: ausentismoFabricaTendencia },
        { type:'bar',  title:'Siniestros fábrica — mensual YTD', sub:'Cantidad', data:[{x:'Ene',y:3},{x:'Feb',y:5},{x:'Mar',y:6},{x:'Abr',y:3}] },
        { type:'bar',  title:'Horas extras por sector — Abr', sub:'Horas', data:[{x:'Logística',y:2364},{x:'JYQ',y:555},{x:'Extremas',y:415},{x:'Medialunas',y:395},{x:'San Miguel',y:327},{x:'Proce.',y:60},{x:'Panificado',y:53}] },
        { type:'bar',  title:'Rotación por planta — May 2026', sub:'%', data:[{x:'San Martín',y:63.41},{x:'San Miguel',y:63.57},{x:'Tapas 1',y:60.61},{x:'JYQ',y:37.5},{x:'Panificado',y:28.04},{x:'Procesadora',y:19.35},{x:'Congelados',y:13.04}] },
      ],
    },
    may: {
      kpis: [
        { label:'Ausentismo Fábricas', value:'9.61%',    delta:{ dir:'down',    text:'Base 23.270 días · May 2026' } },
        { label:'Altas Fábrica — May', value:'77',       delta:{ dir:'neutral', text:'Bajas: 56' } },
        { label:'Hs extras Logística', value:'S/D',      delta:{ dir:'neutral', text:'Último disponible: Abr 4.169 hs' } },
      ],
      charts: [
        { type:'line', title:'Ausentismo Fábricas — tendencia', sub:'% Ene–May 2026', data: ausentismoFabricaTendencia },
        { type:'bar',  title:'Días por causa — Fábrica May', sub:'Días', data:[{x:'Aus.Injust.',y:711},{x:'Suspensión',y:189},{x:'Lic.Enf.',y:631},{x:'ART',y:177},{x:'Vacaciones',y:293},{x:'Maternidad',y:120}] },
        { type:'bar',  title:'Altas y Bajas Fábrica — May 2026', sub:'Cantidad', data:[{x:'Altas',y:77},{x:'Bajas',y:56}] },
        { type:'bar',  title:'Rotación por planta — May 2026', sub:'%', data:[{x:'Logística',y:88.65},{x:'S.Martín',y:63.41},{x:'S.Miguel',y:63.57},{x:'Tapas 1',y:60.61},{x:'Pizzas',y:56.52},{x:'JYQ',y:37.5},{x:'Panificado',y:28.04},{x:'Procesadora',y:19.35},{x:'Congelados',y:13.04}] },
      ],
    },
  },

  // ══════════════════════════════════════════
  // JUDICIALES
  // ══════════════════════════════════════════
  judiciales: {
    ene: {
      kpis: [
        { label:'Sin datos disponibles', value:'—', delta:{ dir:'neutral', text:'No hay informe judicial Ene 2026' } },
        { label:'Referencia acum. 2025', value:'$206.7M', delta:{ dir:'neutral', text:'Total año 2025' } },
        { label:'Acuerdos 2025',         value:'~150+', delta:{ dir:'neutral', text:'Total acuerdos año 2025' } },
      ],
      charts: [
        { type:'bar',  title:'Evolución monto acuerdos mensual', sub:'Millones $ — meses con datos', data:[{x:'Abr 25',y:152.6},{x:'May 25',y:114.8},{x:'Abr 26',y:255.3},{x:'May 26',y:389.8}] },
        { type:'donut',title:'Distribución tipo — May 2026', sub:'% del total', data:[{label:'Sabores',value:29.7},{label:'Otros',value:50.5},{label:'Fábrica',value:11.9},{label:'Extremas',value:7.9}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Sin datos disponibles', value:'—', delta:{ dir:'neutral', text:'No hay informe judicial Feb 2026' } },
        { label:'Referencia acum. 2025', value:'$206.7M', delta:{ dir:'neutral', text:'Total año 2025' } },
        { label:'Acuerdos 2025',         value:'~150+', delta:{ dir:'neutral', text:'Total acuerdos año 2025' } },
      ],
      charts: [
        { type:'bar',  title:'Evolución monto acuerdos mensual', sub:'Millones $ — meses con datos', data:[{x:'Abr 25',y:152.6},{x:'May 25',y:114.8},{x:'Abr 26',y:255.3},{x:'May 26',y:389.8}] },
        { type:'donut',title:'Distribución tipo — May 2026', sub:'% del total', data:[{label:'Sabores',value:29.7},{label:'Otros',value:50.5},{label:'Fábrica',value:11.9},{label:'Extremas',value:7.9}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Sin datos disponibles', value:'—', delta:{ dir:'neutral', text:'No hay informe judicial Mar 2026' } },
        { label:'Referencia acum. 2025', value:'$206.7M', delta:{ dir:'neutral', text:'Total año 2025' } },
        { label:'Acuerdos 2025',         value:'~150+', delta:{ dir:'neutral', text:'Total acuerdos año 2025' } },
      ],
      charts: [
        { type:'bar',  title:'Evolución monto acuerdos mensual', sub:'Millones $ — meses con datos', data:[{x:'Abr 25',y:152.6},{x:'May 25',y:114.8},{x:'Abr 26',y:255.3},{x:'May 26',y:389.8}] },
        { type:'donut',title:'Distribución tipo — May 2026', sub:'% del total', data:[{label:'Sabores',value:29.7},{label:'Otros',value:50.5},{label:'Fábrica',value:11.9},{label:'Extremas',value:7.9}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Total acuerdos — Abr 2026', value:'$255.3M', delta:{ dir:'up',      text:'31 acuerdos · Abr 2026' } },
        { label:'Total acuerdos — Abr 2025', value:'$152.6M',  delta:{ dir:'neutral', text:'28 acuerdos · Abr 2025' } },
        { label:'Variación interanual',      value:'+67.3%',  delta:{ dir:'up',      text:'$152.6M → $255.3M' }, valueClass:'is-down' },
      ],
      charts: [
        { type:'hbar', title:'Monto por razón social — Abr 2026', sub:'Millones $', data:[
          {x:'PISANIELLO IVO',y:14.5},{x:'LA EMPANADERIA',y:11.6},{x:'CASUT FRIJON',y:9.8},
          {x:'BOLLOS Y RELLENOS',y:6.3},{x:'SORIA FRANCISCO',y:6.1},{x:'CASTRO CINTIA',y:5.8},
          {x:'RIOS BRUNO',y:5.1},{x:'SAYAGO MARCIO',y:4.9},{x:'COMACHI V.',y:3.8},
          {x:'VICTORICA B.',y:3.7},{x:'RUANO ROJAS',y:2.5},{x:'GONZALEZ M.',y:1.2},
        ]},
        { type:'donut',title:'Distribución tipo — Abr 2026', sub:'% del total', data:[{label:'Sabores',value:21.7},{label:'Otros',value:50.0},{label:'Fábrica',value:18.1},{label:'Extremas',value:10.2}] },
      ],
      details: [{
        key:'detalle-abr', title:'Detalle acuerdos — Abr 2026', iconEmoji:'⚖️', accent:'purple', type:'table',
        topChips:[{label:'Fábrica',value:'18%',tone:'blue'},{label:'Sabores',value:'22%',tone:'green'},{label:'Extremas',value:'10%',tone:'purple'}],
        columns:[{key:'razon',label:'RAZÓN SOCIAL'},{key:'unidad',label:'LOCAL / FÁBRICA'},{key:'tipo',label:'TIPO',badge:true},{key:'actor',label:'ACTOR',align:'right'},{key:'total',label:'TOTAL',align:'right',strong:true}],
        rows:[
          {razon:'PISANIELLO IVO',           unidad:'MANTENIMIENTO LOCALES',  tipo:'Sabores',  actor:'$12.000.000', total:'$14.528.708'},
          {razon:'LA EMPANADERIA S.A',        unidad:'FABRICA SAN MARTIN',     tipo:'Fábrica',  actor:'$8.800.000',  total:'$11.596.658'},
          {razon:'CASUT FRIJON',              unidad:'HURLINGHAM SABORES II',  tipo:'Sabores',  actor:'$8.000.000',  total:'$9.756.658'},
          {razon:'BOLLOS Y RELLENOS S.A',     unidad:'MANTENIMIENTO FABRICA',  tipo:'Fábrica',  actor:'$5.000.000',  total:'$6.339.470'},
          {razon:'SORIA FRANCISCO ADRIAN',    unidad:'SABORES BOULOGNE',       tipo:'Sabores',  actor:'$5.000.000',  total:'$6.131.670'},
          {razon:'CASTRO CINTIA NOEMI',       unidad:'EXTREMAS SAN FERNANDO',  tipo:'Extremas', actor:'$5.000.000',  total:'$5.782.294'},
          {razon:'RIOS BRUNO',                unidad:'SABORES HURLINGHAM II',  tipo:'Sabores',  actor:'$4.000.000',  total:'$5.127.321'},
          {razon:'SAYAGO MARCIO H.N.',        unidad:'SABORES PALOMAR',        tipo:'Sabores',  actor:'$4.000.000',  total:'$4.946.677'},
          {razon:'CASTRO CINTIA NOEMI',       unidad:'SABORES ENTRE RIOS',     tipo:'Sabores',  actor:'$4.000.000',  total:'$4.931.670'},
          {razon:'LA EMPANADERIA S.A',        unidad:'LOGISTICA FABRICA',      tipo:'Fábrica',  actor:'$3.500.000',  total:'$4.679.470'},
          {razon:'CASUT FRIJON',              unidad:'SABORES LANUS',          tipo:'Sabores',  actor:'$3.600.000',  total:'$4.595.390'},
          {razon:'COMACHI VALERIA SABRINA',   unidad:'SABORES BALLESTER II',   tipo:'Sabores',  actor:'$3.000.000',  total:'$3.759.320'},
          {razon:'VICTORICA BARBARA A.',      unidad:'EXTREMAS FLORES',        tipo:'Extremas', actor:'$3.000.000',  total:'$3.730.000'},
        ],
        totalRow:{ label:'TOTAL ABR 2026', value:'$255.283.528' },
      }],
    },
    may: {
      kpis: [
        { label:'Total acuerdos — May 2026', value:'$389.8M', delta:{ dir:'up',      text:'39 acuerdos · May 2026' } },
        { label:'Total acuerdos — May 2025', value:'$114.8M',  delta:{ dir:'neutral', text:'22 acuerdos · May 2025' } },
        { label:'Variación interanual',      value:'+239.7%', delta:{ dir:'up',      text:'$114.8M → $389.8M' }, valueClass:'is-down' },
      ],
      charts: [
        { type:'hbar', title:'Monto por razón social — May 2026', sub:'Millones $', data:[
          {x:'CHUSPITA MARTIN',y:46.79},{x:'LA EMPANADERIA',y:29.76},{x:'BOLLOS Y RELLENOS',y:13.0},
          {x:'IVO PISANIELLO',y:11.93},{x:'BRUNO RIOS',y:11.45},{x:'VILLA MARIANO',y:11.37},
          {x:'CASTRO CINTIA',y:11.13},{x:'RUANO ROJAS',y:9.93},{x:'GONZALEZ MIGUEL',y:8.22},
          {x:'COMACHI V.',y:7.33},{x:'SAYAGO MARCIO',y:7.20},{x:'VICTORICA ANA',y:4.93},
          {x:'TABEIRA GABRIEL',y:4.48},{x:'CERTALDO',y:3.76},{x:'VICTORICA BARBARA',y:3.27},
          {x:'SORIA ADRIAN',y:2.60},{x:'MOSCARELLA',y:1.86},
        ]},
        { type:'donut',title:'Distribución tipo — May 2026', sub:'% del total', data:[{label:'Sabores',value:29.7},{label:'Otros',value:50.5},{label:'Fábrica',value:11.9},{label:'Extremas',value:7.9}] },
        { type:'bar', title:'Evolución monto acuerdos mensual', sub:'Millones $', data:[{x:'Abr 25',y:152.6},{x:'May 25',y:114.8},{x:'Abr 26',y:255.3},{x:'May 26',y:389.8}] },
      ],
      details: [{
        key:'detalle-may', title:'Detalle acuerdos — May 2026', iconEmoji:'⚖️', accent:'purple', type:'table',
        topChips:[{label:'Fábrica',value:'11.9%',tone:'blue'},{label:'Sabores',value:'29.7%',tone:'green'},{label:'Extremas',value:'7.9%',tone:'purple'}],
        columns:[{key:'razon',label:'RAZÓN SOCIAL'},{key:'unidad',label:'LOCAL / FÁBRICA'},{key:'tipo',label:'TIPO',badge:true},{key:'actor',label:'ACTOR',align:'right'},{key:'total',label:'TOTAL',align:'right',strong:true}],
        rows:[
          {razon:'CHUSPITA MARTIN DANIEL',      unidad:'SABORES MDQ 3',          tipo:'Sabores',  actor:'$22.500.000', total:'$38.054.500'},
          {razon:'LA EMPANADERIA',              unidad:'FABRICA SAN MARTIN',     tipo:'Fábrica',  actor:'$18.000.000', total:'$21.733.000'},
          {razon:'CHUSPITA MARTIN DANIEL',      unidad:'SABORES MDQ 4',          tipo:'Sabores',  actor:'$7.000.000',  total:'$8.732.500'},
          {razon:'COMACHI VALERIA SABRINA',      unidad:'SABORES SAN MARTIN',     tipo:'Sabores',  actor:'$6.000.000',  total:'$7.333.650'},
          {razon:'BOLLOS Y RELLENOS',           unidad:'FABRICA SAN MIGUEL',     tipo:'Fábrica',  actor:'$6.000.000',  total:'$7.331.670'},
          {razon:'SAYAGO MARCIO H.N.',          unidad:'SABORES BOEDO',          tipo:'Sabores',  actor:'$6.000.000',  total:'$7.200.000'},
          {razon:'IVO PISANIELLO',              unidad:'EXTREMAS OLIVOS',        tipo:'Extremas', actor:'$4.000.000',  total:'$5.280.960'},
          {razon:'VICTORICA ANA MACARENA',      unidad:'SABORES BERAZATEGUI II', tipo:'Sabores',  actor:'$4.000.000',  total:'$4.931.670'},
          {razon:'TABEIRA DELGADO GABRIEL',      unidad:'SABORES CORRIENTES II',  tipo:'Sabores',  actor:'$3.500.000',  total:'$4.480.650'},
          {razon:'VILLA MARIANO DAVID',          unidad:'SABORES PACHECO II',     tipo:'Sabores',  actor:'$3.500.000',  total:'$4.361.741'},
          {razon:'GONZALEZ MIGUEL ANGEL',        unidad:'SABORES DEL VISO',       tipo:'Sabores',  actor:'$3.500.000',  total:'$4.333.650'},
          {razon:'LA EMPANADERIA',              unidad:'FABRICA SAN MARTIN',     tipo:'Fábrica',  actor:'$3.200.000',  total:'$4.293.650'},
          {razon:'RUANO ROJAS GREISSI',          unidad:'EXTREMAS SAN FERNANDO',  tipo:'Extremas', actor:'$3.500.000',  total:'$4.283.531'},
          {razon:'CASTRO CINTIA NOEMI',          unidad:'SABORES PACHECO I',      tipo:'Sabores',  actor:'$3.500.000',  total:'$4.283.500'},
          {razon:'VILLA MARIANO DAVID',          unidad:'SABORES POLVORINES',     tipo:'Sabores',  actor:'$3.000.000',  total:'$3.870.300'},
        ],
        totalRow:{ label:'TOTAL MAY 2026', value:'$389.812.182' },
      }],
    },
  },

  // ══════════════════════════════════════════
  // INSPECCIONES
  // ══════════════════════════════════════════
  inspecciones: {
    ene: {
      kpis: [
        { label:'Datos no disponibles', value:'—', delta:{ dir:'neutral', text:'Sin informe Ene 2026' } },
        { label:'Ref. Mar 2026',        value:'38 insp', delta:{ dir:'neutral', text:'$2.745.332 multas Mar' } },
        { label:'Ref. May 2026',        value:'20 insp', delta:{ dir:'neutral', text:'$15.441.748 multas May' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por mes — histórico', sub:'Cantidad', data:[{x:'Mar',y:38},{x:'Abr',y:17},{x:'May',y:20}] },
        { type:'bar',  title:'Multas por mes — histórico', sub:'Millones $', data:[{x:'Mar',y:2.75},{x:'Abr',y:8.70},{x:'May',y:15.44}] },
        { type:'bar',  title:'Audiencias por mes — histórico', sub:'Cantidad', data:[{x:'Mar',y:12},{x:'Abr',y:7},{x:'May',y:18}] },
        { type:'donut',title:'Resultado inspecciones — May 2026', sub:'Distribución', data:[{label:'Conformes',value:2},{label:'Obs. menores',value:13},{label:'Con multa',value:5}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Datos no disponibles', value:'—', delta:{ dir:'neutral', text:'Sin informe Feb 2026' } },
        { label:'Ref. Mar 2026',        value:'38 insp', delta:{ dir:'neutral', text:'$2.745.332 multas Mar' } },
        { label:'Ref. May 2026',        value:'20 insp', delta:{ dir:'neutral', text:'$15.441.748 multas May' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por mes — histórico', sub:'Cantidad', data:[{x:'Mar',y:38},{x:'Abr',y:17},{x:'May',y:20}] },
        { type:'bar',  title:'Multas por mes — histórico', sub:'Millones $', data:[{x:'Mar',y:2.75},{x:'Abr',y:8.70},{x:'May',y:15.44}] },
        { type:'bar',  title:'Audiencias por mes — histórico', sub:'Cantidad', data:[{x:'Mar',y:12},{x:'Abr',y:7},{x:'May',y:18}] },
        { type:'donut',title:'Resultado inspecciones — May 2026', sub:'Distribución', data:[{label:'Conformes',value:2},{label:'Obs. menores',value:13},{label:'Con multa',value:5}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Inspecciones — Mar 2026', value:'38',        delta:{ dir:'up',      text:'12 audiencias · 1 multa' } },
        { label:'Multas aplicadas',         value:'1',         delta:{ dir:'neutral', text:'Tabeira — $2.745.332' } },
        { label:'Monto total multas',       value:'$2.75M',    delta:{ dir:'neutral', text:'Mar 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unipersonal — Mar', sub:'Cantidad', data:[{x:'CHUSPITA',y:5},{x:'RUANO ROJAS',y:4},{x:'SORIA ADRIAN',y:4},{x:'PAULA REDELLE',y:4},{x:'CASUT FRIJON',y:3},{x:'COMACHI V.',y:2},{x:'SAYAGO M.',y:2}] },
        { type:'bar',  title:'Inspecciones por mes — histórico', sub:'Cantidad', data:[{x:'Mar',y:38},{x:'Abr',y:17},{x:'May',y:20}] },
        { type:'bar',  title:'Multas por mes — histórico', sub:'Millones $', data:[{x:'Mar',y:2.75},{x:'Abr',y:8.70},{x:'May',y:15.44}] },
        { type:'bar',  title:'Audiencias por mes — histórico', sub:'Cantidad', data:[{x:'Mar',y:12},{x:'Abr',y:7},{x:'May',y:18}] },
      ],
      details: [{
        key:'multas-mar', title:'Multas — Mar 2026', iconEmoji:'🔍', accent:'red', type:'table',
        columns:[{key:'razon',label:'RAZÓN SOCIAL'},{key:'local',label:'LOCAL'},{key:'monto',label:'MONTO',align:'right',strong:true}],
        rows:[{razon:'TABEIRA DELGADO GABRIEL', local:'Pto. San Bernardo', monto:'$2.745.332'}],
        totalRow:{ label:'TOTAL', value:'$2.745.332' },
      }],
    },
    abr: {
      kpis: [
        { label:'Inspecciones — Abr 2026', value:'17',       delta:{ dir:'down',    text:'7 audiencias · 4 multas' } },
        { label:'Multas aplicadas',         value:'4',        delta:{ dir:'up',      text:'$8.700.568 total' } },
        { label:'Conformidad',              value:'76.5%',    delta:{ dir:'down',    text:'vs 97.4% Mar' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unipersonal — Abr', sub:'Cantidad', data:[{x:'CASUT FRIJON',y:4},{x:'SAYAGO L.',y:2},{x:'VICTORI.ANA',y:2},{x:'GONZALEZ M.',y:1},{x:'CASTRO C.',y:1},{x:'TABEIRA',y:1},{x:'RIOS B.',y:1},{x:'FRANQUICIAS',y:1},{x:'PAULA R.',y:1},{x:'MOSCARELLA',y:1}] },
        { type:'bar',  title:'Inspecciones por mes — histórico', sub:'Cantidad', data:[{x:'Mar',y:38},{x:'Abr',y:17},{x:'May',y:20}] },
        { type:'bar',  title:'Multas por mes — histórico', sub:'Millones $', data:[{x:'Mar',y:2.75},{x:'Abr',y:8.70},{x:'May',y:15.44}] },
        { type:'donut',title:'Montos multas Abr — por unipersonal', sub:'$', data:[{label:'Bollos y Rellenos',value:6164035},{label:'Sayago Leandro',value:2407235},{label:'Soria Adrian',value:9000}] },
      ],
      details: [{
        key:'multas-abr', title:'Multas — Abr 2026', iconEmoji:'🔍', accent:'red', type:'table',
        columns:[{key:'razon',label:'RAZÓN SOCIAL'},{key:'local',label:'LOCAL'},{key:'monto',label:'MONTO',align:'right',strong:true}],
        rows:[
          {razon:'SORIA ADRIAN FRANCISCO',        local:'SE - Boulogne',          monto:'$9.000'},
          {razon:'SAYAGO MARCIO H.N.',            local:'SE - Múltiples locales',  monto:'$120.298'},
          {razon:'SAYAGO LEANDRO M.A.',           local:'SE - Cruce Castelar',     monto:'$2.407.235'},
          {razon:'BOLLOS Y RELLENOS',             local:'Oficina 228 Paralelo',    monto:'$6.164.035'},
        ],
        totalRow:{ label:'TOTAL', value:'$8.700.568', extra:'4' },
      }],
    },
    may: {
      kpis: [
        { label:'Inspecciones — May 2026', value:'20',       delta:{ dir:'up',      text:'18 audiencias · 5 multas' } },
        { label:'Multas aplicadas',         value:'5',        delta:{ dir:'up',      text:'$15.441.748 total' } },
        { label:'Conformidad',              value:'75.0%',    delta:{ dir:'down',    text:'vs 76.5% Abr' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unipersonal — May', sub:'Cantidad', data:[{x:'PISANIELLO',y:3},{x:'RUANO ROJAS',y:3},{x:'BAJOS PARLA',y:3},{x:'CASTRO C.',y:2},{x:'GONZALEZ M.',y:2},{x:'CHUSPITA',y:2},{x:'CASUT F.',y:1},{x:'SORIA A.',y:1},{x:'TABEIRA',y:1},{x:'RIOS B.',y:1},{x:'SAYAGO M.',y:1}] },
        { type:'bar',  title:'Inspecciones por mes — histórico', sub:'Cantidad', data:[{x:'Mar',y:38},{x:'Abr',y:17},{x:'May',y:20}] },
        { type:'bar',  title:'Multas por mes — histórico', sub:'Millones $', data:[{x:'Mar',y:2.75},{x:'Abr',y:8.70},{x:'May',y:15.44}] },
        { type:'donut',title:'Montos multas May — por referente', sub:'$', data:[{label:'Bollos y Rellenos',value:8192070},{label:'Casut Frijon',value:3000000},{label:'Sayago Leandro',value:2407235},{label:'Victorica Barbara',value:1842443}] },
      ],
      details: [{
        key:'multas-may', title:'Multas — May 2026', iconEmoji:'🔍', accent:'red', type:'table',
        columns:[{key:'razon',label:'RAZÓN SOCIAL'},{key:'local',label:'LOCAL'},{key:'monto',label:'MONTO',align:'right',strong:true}],
        rows:[
          {razon:'VICTORICA BARBARA ALEJANDRA',   local:'—',                    monto:'$1.842.443'},
          {razon:'SAYAGO LEANDRO MIGUEL AGUSTIN',  local:'SE - Cruce Castelar',  monto:'$2.407.235'},
          {razon:'CASUT FRIJON MATIAS EZEQUIEL',   local:'—',                    monto:'$3.000.000'},
          {razon:'BOLLOS Y RELLENOS',              local:'Oficina 228 Paralelo',  monto:'$8.192.070'},
        ],
        totalRow:{ label:'TOTAL', value:'$15.441.748', extra:'5' },
      }],
    },
  },

  // ══════════════════════════════════════════
  // HORAS EXTRAS
  // ══════════════════════════════════════════
  horasextras: {
    ene: {
      kpis: [
        { label:'Horas extras — Ene 2026', value:'6.325 hs', delta:{ dir:'up',      text:'Mayor volumen del período' } },
        { label:'Costo liquidado',          value:'$67.3M',   delta:{ dir:'up',      text:'Ene 2026' } },
        { label:'Mayor carga — Logística',  value:'3.399 hs', delta:{ dir:'neutral', text:'$37.992.978 Logística' } },
      ],
      charts: [
        { type:'line', title:'Evolución horas extras totales', sub:'Ene–Abr 2026', data: horasExtrasTendencia },
        { type:'line', title:'Evolución costo horas extras', sub:'Millones $ · Ene–Abr 2026', data: costoExtrasTendencia },
        { type:'bar',  title:'Horas extras por sector — Ene', sub:'Horas', data:[{x:'Logística',y:3399},{x:'San Martín',y:805},{x:'Extremas',y:796},{x:'San Miguel',y:359},{x:'JYQ',y:196},{x:'Tapas 1',y:193},{x:'Tapas 2',y:126},{x:'Panificado',y:144},{x:'Congelados',y:134},{x:'Pizzas',y:107},{x:'Papelera',y:40}] },
        { type:'bar',  title:'Costo por sector — Ene', sub:'Millones $', data:[{x:'Logística',y:38.0},{x:'San Martín',y:7.6},{x:'Extremas',y:8.6},{x:'San Miguel',y:3.1},{x:'JYQ',y:2.2},{x:'Tapas 1',y:2.2},{x:'Panificado',y:1.2},{x:'Congelados',y:1.4},{x:'Pizzas',y:1.0}] },
      ],
      details: [{
        key:'he-ene', title:'Detalle horas extras — Ene 2026', iconEmoji:'⏱️', accent:'amber', type:'table',
        columns:[{key:'sector',label:'SECTOR'},{key:'horas',label:'HORAS',align:'right'},{key:'costo',label:'COSTO',align:'right',strong:true}],
        rows:[
          {sector:'LOGÍSTICA',   horas:'3.399', costo:'$37.992.978'},{sector:'SAN MARTÍN',  horas:'805',   costo:'$7.559.194'},
          {sector:'EXTREMAS',    horas:'796',   costo:'$8.607.819'},{sector:'SAN MIGUEL',  horas:'359',   costo:'$3.124.334'},
          {sector:'JYQ',         horas:'196',   costo:'$2.198.111'},{sector:'TAPAS 1',     horas:'193',   costo:'$2.165.960'},
          {sector:'PANIFICADO',  horas:'144',   costo:'$1.222.372'},{sector:'CONGELADOS',  horas:'134',   costo:'$1.407.939'},
          {sector:'TAPAS 2',     horas:'126',   costo:'$1.244.821'},{sector:'PIZZAS',      horas:'107',   costo:'$980.621'},
          {sector:'PAPELERA',    horas:'40',    costo:'$430.047'}, {sector:'MANTEN.',     horas:'21',    costo:'$285.248'},
          {sector:'MEDIALUNAS',  horas:'5',     costo:'$42.568'},
        ],
        totalRow:{ label:'TOTAL ENE', value:'$67.262.012' },
      }],
    },
    feb: {
      kpis: [
        { label:'Horas extras — Feb 2026', value:'4.479 hs', delta:{ dir:'down',    text:'-29.2% vs Ene' } },
        { label:'Costo liquidado',          value:'$49.4M',   delta:{ dir:'down',    text:'-26.6% vs Ene' } },
        { label:'Mayor carga — Logística',  value:'3.115 hs', delta:{ dir:'down',    text:'$34.652.682 Logística' } },
      ],
      charts: [
        { type:'line', title:'Evolución horas extras totales', sub:'Ene–Abr 2026', data: horasExtrasTendencia },
        { type:'line', title:'Evolución costo horas extras', sub:'Millones $ · Ene–Abr 2026', data: costoExtrasTendencia },
        { type:'bar',  title:'Horas extras por sector — Feb', sub:'Horas', data:[{x:'Logística',y:3115},{x:'Extremas',y:611},{x:'JYQ',y:314},{x:'Proce.',y:139},{x:'San Martín',y:117},{x:'Tapas 1',y:104},{x:'Pizzas',y:36},{x:'Papelera',y:30},{x:'Tapas 2',y:11}] },
        { type:'bar',  title:'Costo por sector — Feb', sub:'Millones $', data:[{x:'Logística',y:34.7},{x:'Extremas',y:6.8},{x:'JYQ',y:3.3},{x:'Proce.',y:1.2},{x:'San Martín',y:1.2},{x:'Tapas 1',y:1.3},{x:'Pizzas',y:0.37},{x:'Papelera',y:0.33}] },
      ],
      details: [{
        key:'he-feb', title:'Detalle horas extras — Feb 2026', iconEmoji:'⏱️', accent:'amber', type:'table',
        columns:[{key:'sector',label:'SECTOR'},{key:'horas',label:'HORAS',align:'right'},{key:'costo',label:'COSTO',align:'right',strong:true}],
        rows:[
          {sector:'LOGÍSTICA',   horas:'3.115', costo:'$34.652.682'},{sector:'EXTREMAS',   horas:'611',   costo:'$6.798.946'},
          {sector:'JYQ',         horas:'314',   costo:'$3.317.327'},{sector:'PROCESADORA',horas:'139',   costo:'$1.197.486'},
          {sector:'SAN MARTÍN',  horas:'117',   costo:'$1.221.959'},{sector:'TAPAS 1',    horas:'104',   costo:'$1.293.321'},
          {sector:'PIZZAS',      horas:'36',    costo:'$366.765'}, {sector:'PAPELERA',   horas:'30',    costo:'$326.017'},
          {sector:'TAPAS 2',     horas:'11',    costo:'$175.334'}, {sector:'MALVINAS',   horas:'2',     costo:'$17.523'},
        ],
        totalRow:{ label:'TOTAL FEB', value:'$49.367.360' },
      }],
    },
    mar: {
      kpis: [
        { label:'Horas extras — Mar 2026', value:'3.779 hs', delta:{ dir:'down',    text:'-15.6% vs Feb' } },
        { label:'Costo liquidado',          value:'$38.8M',   delta:{ dir:'down',    text:'-21.4% vs Feb' } },
        { label:'Mayor carga — Logística',  value:'2.304 hs', delta:{ dir:'down',    text:'$24.373.594 Logística' } },
      ],
      charts: [
        { type:'line', title:'Evolución horas extras totales', sub:'Ene–Abr 2026', data: horasExtrasTendencia },
        { type:'line', title:'Evolución costo horas extras', sub:'Millones $ · Ene–Abr 2026', data: costoExtrasTendencia },
        { type:'bar',  title:'Horas extras por sector — Mar', sub:'Horas', data:[{x:'Logística',y:2304},{x:'Medialunas',y:257},{x:'Extremas',y:379},{x:'JYQ',y:235},{x:'Proce.',y:222},{x:'San Miguel',y:171},{x:'Tapas 1',y:114},{x:'Tapas 2',y:44}] },
        { type:'bar',  title:'Costo por sector — Mar', sub:'Millones $', data:[{x:'Logística',y:24.4},{x:'Medialunas',y:2.5},{x:'Extremas',y:4.1},{x:'JYQ',y:2.2},{x:'Proce.',y:1.9},{x:'San Miguel',y:1.5},{x:'Tapas 1',y:1.3},{x:'Tapas 2',y:0.45}] },
      ],
      details: [{
        key:'he-mar', title:'Detalle horas extras — Mar 2026', iconEmoji:'⏱️', accent:'amber', type:'table',
        columns:[{key:'sector',label:'SECTOR'},{key:'horas',label:'HORAS',align:'right'},{key:'costo',label:'COSTO',align:'right',strong:true}],
        rows:[
          {sector:'LOGÍSTICA',   horas:'2.304', costo:'$24.373.594'},{sector:'EXTREMAS',    horas:'379',   costo:'$4.070.332'},
          {sector:'JYQ',         horas:'235',   costo:'$2.241.989'},{sector:'MEDIALUNAS',  horas:'257',   costo:'$2.462.198'},
          {sector:'PROCESADORA', horas:'222',   costo:'$1.857.668'},{sector:'SAN MIGUEL',  horas:'171',   costo:'$1.540.299'},
          {sector:'TAPAS 1',     horas:'114',   costo:'$1.254.002'},{sector:'TAPAS 2',     horas:'44',    costo:'$451.614'},
          {sector:'SAN MARTÍN',  horas:'36',    costo:'$318.048'}, {sector:'PAPELERA',    horas:'10',    costo:'$123.957'},
          {sector:'PANIFICADO',  horas:'7',     costo:'$61.331'},
        ],
        totalRow:{ label:'TOTAL MAR', value:'$38.755.032' },
      }],
    },
    abr: {
      kpis: [
        { label:'Horas extras — Abr 2026', value:'4.169 hs', delta:{ dir:'up',      text:'+10.3% vs Mar' } },
        { label:'Costo liquidado',          value:'$49.2M',   delta:{ dir:'up',      text:'+26.9% vs Mar' } },
        { label:'Mayor carga — Logística',  value:'2.364 hs', delta:{ dir:'neutral', text:'$28.732.277 Logística' } },
      ],
      charts: [
        { type:'line', title:'Evolución horas extras totales', sub:'Ene–Abr 2026', data: horasExtrasTendencia },
        { type:'line', title:'Evolución costo horas extras', sub:'Millones $ · Ene–Abr 2026', data: costoExtrasTendencia },
        { type:'bar',  title:'Horas extras por sector — Abr', sub:'Horas', data:[{x:'Logística',y:2364},{x:'JYQ',y:555},{x:'Extremas',y:415},{x:'Medialunas',y:395},{x:'San Miguel',y:327},{x:'Proce.',y:60},{x:'Panificado',y:53}] },
        { type:'bar',  title:'Costo por sector — Abr', sub:'Millones $', data:[{x:'Logística',y:28.7},{x:'JYQ',y:6.2},{x:'Extremas',y:5.0},{x:'Medialunas',y:4.7},{x:'San Miguel',y:3.4},{x:'Proce.',y:0.55},{x:'Panificado',y:0.55}] },
      ],
      details: [{
        key:'he-abr', title:'Detalle horas extras — Abr 2026', iconEmoji:'⏱️', accent:'amber', type:'table',
        columns:[{key:'sector',label:'SECTOR'},{key:'horas',label:'HORAS',align:'right'},{key:'costo',label:'COSTO',align:'right',strong:true}],
        rows:[
          {sector:'LOGÍSTICA',   horas:'2.364', costo:'$28.732.277'},{sector:'JYQ',         horas:'555',   costo:'$6.230.273'},
          {sector:'EXTREMAS',    horas:'415',   costo:'$5.044.575'},{sector:'MEDIALUNAS',  horas:'395',   costo:'$4.696.939'},
          {sector:'SAN MIGUEL',  horas:'327',   costo:'$3.376.571'},{sector:'PROCESADORA', horas:'60',    costo:'$551.665'},
          {sector:'PANIFICADO',  horas:'53',    costo:'$546.715'},
        ],
        totalRow:{ label:'TOTAL ABR', value:'$49.179.015' },
      }],
    },
    may: {
      kpis: [
        { label:'Horas extras — May 2026', value:'S/D', delta:{ dir:'neutral', text:'Datos no disponibles aún' } },
        { label:'Costo liquidado',          value:'S/D', delta:{ dir:'neutral', text:'Datos no disponibles aún' } },
        { label:'Referencia Abr',           value:'4.169 hs', delta:{ dir:'neutral', text:'$49.2M — último mes disp.' } },
      ],
      charts: [
        { type:'line', title:'Evolución horas extras totales', sub:'Ene–Abr 2026', data: horasExtrasTendencia },
        { type:'line', title:'Evolución costo horas extras', sub:'Millones $ · Ene–Abr 2026', data: costoExtrasTendencia },
        { type:'bar',  title:'Horas extras — último disponible (Abr)', sub:'Horas', data:[{x:'Logística',y:2364},{x:'JYQ',y:555},{x:'Extremas',y:415},{x:'Medialunas',y:395},{x:'San Miguel',y:327},{x:'Proce.',y:60},{x:'Panificado',y:53}] },
        { type:'bar',  title:'Costo — último disponible (Abr)', sub:'Millones $', data:[{x:'Logística',y:28.7},{x:'JYQ',y:6.2},{x:'Extremas',y:5.0},{x:'Medialunas',y:4.7},{x:'San Miguel',y:3.4},{x:'Proce.',y:0.55},{x:'Panificado',y:0.55}] },
      ],
    },
  },

  // ══════════════════════════════════════════
  // ACCIDENTABILIDAD
  // ══════════════════════════════════════════
  accidentabilidad: {
    ene: {
      kpis: [
        { label:'Siniestros — Ene 2026',  value:'34',  delta:{ dir:'neutral', text:'926 días caídos' } },
        { label:'Total histórico',         value:'477', delta:{ dir:'neutral', text:'Datos + Rechazados' } },
        { label:'Días caídos totales',     value:'13.160', delta:{ dir:'neutral', text:'Promedio 33.2 días/caso' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes — histórico', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22},{x:'Jun',y:22},{x:'Jul',y:18},{x:'Ago',y:23},{x:'Sep',y:22},{x:'Oct',y:37},{x:'Nov',y:49},{x:'Dic',y:49}] },
        { type:'donut',title:'Tipo de ocurrencia — histórico', sub:'Distribución', data:[{label:'Laboral',value:323},{label:'In Itinere',value:74},{label:'Otro',value:2}] },
        { type:'bar',  title:'Gravedad — histórico', sub:'Cantidad', data:[{x:'Leve',y:351},{x:'Moderado',y:36},{x:'Grave',y:5}] },
        { type:'bar',  title:'Días caídos por mes — histórico', sub:'Días', data:[{x:'Ene',y:926},{x:'Feb',y:396},{x:'Mar',y:846},{x:'Abr',y:607},{x:'May',y:285},{x:'Jun',y:284},{x:'Jul',y:298},{x:'Ago',y:594},{x:'Sep',y:420},{x:'Oct',y:900},{x:'Nov',y:1791},{x:'Dic',y:2141}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Siniestros — Feb 2026',  value:'24',  delta:{ dir:'down',    text:'396 días caídos' } },
        { label:'Total histórico',         value:'477', delta:{ dir:'neutral', text:'Datos + Rechazados' } },
        { label:'Días caídos totales',     value:'13.160', delta:{ dir:'neutral', text:'Promedio 33.2 días/caso' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes — histórico', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22},{x:'Jun',y:22},{x:'Jul',y:18},{x:'Ago',y:23},{x:'Sep',y:22},{x:'Oct',y:37},{x:'Nov',y:49},{x:'Dic',y:49}] },
        { type:'donut',title:'Tipo de ocurrencia — histórico', sub:'Distribución', data:[{label:'Laboral',value:323},{label:'In Itinere',value:74},{label:'Otro',value:2}] },
        { type:'bar',  title:'Gravedad — histórico', sub:'Cantidad', data:[{x:'Leve',y:351},{x:'Moderado',y:36},{x:'Grave',y:5}] },
        { type:'bar',  title:'Días caídos por mes — histórico', sub:'Días', data:[{x:'Ene',y:926},{x:'Feb',y:396},{x:'Mar',y:846},{x:'Abr',y:607},{x:'May',y:285},{x:'Jun',y:284},{x:'Jul',y:298},{x:'Ago',y:594},{x:'Sep',y:420},{x:'Oct',y:900},{x:'Nov',y:1791},{x:'Dic',y:2141}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Siniestros — Mar 2026',  value:'24',  delta:{ dir:'neutral', text:'846 días caídos' } },
        { label:'Total histórico',         value:'477', delta:{ dir:'neutral', text:'Datos + Rechazados' } },
        { label:'En tratamiento activo',   value:'25',  delta:{ dir:'neutral', text:'Casos abiertos' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes — histórico', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22},{x:'Jun',y:22},{x:'Jul',y:18},{x:'Ago',y:23},{x:'Sep',y:22},{x:'Oct',y:37},{x:'Nov',y:49},{x:'Dic',y:49}] },
        { type:'donut',title:'Tipo de ocurrencia — histórico', sub:'Distribución', data:[{label:'Laboral',value:323},{label:'In Itinere',value:74},{label:'Otro',value:2}] },
        { type:'bar',  title:'Gravedad — histórico', sub:'Cantidad', data:[{x:'Leve',y:351},{x:'Moderado',y:36},{x:'Grave',y:5}] },
        { type:'bar',  title:'Días caídos por mes — histórico', sub:'Días', data:[{x:'Ene',y:926},{x:'Feb',y:396},{x:'Mar',y:846},{x:'Abr',y:607},{x:'May',y:285},{x:'Jun',y:284},{x:'Jul',y:298},{x:'Ago',y:594},{x:'Sep',y:420},{x:'Oct',y:900},{x:'Nov',y:1791},{x:'Dic',y:2141}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Siniestros — Abr 2026',  value:'28',  delta:{ dir:'up',      text:'607 días caídos' } },
        { label:'Total histórico',         value:'477', delta:{ dir:'neutral', text:'78 rechazados ART' } },
        { label:'Días caídos totales',     value:'13.160', delta:{ dir:'neutral', text:'Promedio 33.2 días/caso' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes — histórico', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22},{x:'Jun',y:22},{x:'Jul',y:18},{x:'Ago',y:23},{x:'Sep',y:22},{x:'Oct',y:37},{x:'Nov',y:49},{x:'Dic',y:49}] },
        { type:'donut',title:'Tipo de ocurrencia — histórico', sub:'Distribución', data:[{label:'Laboral',value:323},{label:'In Itinere',value:74},{label:'Otro',value:2}] },
        { type:'bar',  title:'Distribución por sector — histórico', sub:'Cantidad', data:[{x:'Fábrica',y:257},{x:'Locales',y:137},{x:'Staff',y:4}] },
        { type:'bar',  title:'Días caídos por mes — histórico', sub:'Días', data:[{x:'Ene',y:926},{x:'Feb',y:396},{x:'Mar',y:846},{x:'Abr',y:607},{x:'May',y:285},{x:'Jun',y:284},{x:'Jul',y:298},{x:'Ago',y:594},{x:'Sep',y:420},{x:'Oct',y:900},{x:'Nov',y:1791},{x:'Dic',y:2141}] },
      ],
    },
    may: {
      kpis: [
        { label:'Siniestros — May 2026',   value:'22',     delta:{ dir:'down',    text:'285 días caídos' } },
        { label:'Total histórico',          value:'477',    delta:{ dir:'neutral', text:'16.4% rechazados ART' } },
        { label:'Días caídos totales',      value:'13.160', delta:{ dir:'neutral', text:'Promedio 33.2 días/caso' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes — histórico', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22},{x:'Jun',y:22},{x:'Jul',y:18},{x:'Ago',y:23},{x:'Sep',y:22},{x:'Oct',y:37},{x:'Nov',y:49},{x:'Dic',y:49}] },
        { type:'donut',title:'Tipo de ocurrencia — histórico', sub:'Distribución', data:[{label:'Laboral',value:323},{label:'In Itinere',value:74},{label:'Otro',value:2}] },
        { type:'bar',  title:'Distribución por sector — histórico', sub:'Cantidad', data:[{x:'Fábrica',y:257},{x:'Locales',y:137},{x:'Staff',y:4}] },
        { type:'bar',  title:'Días caídos por mes — histórico', sub:'Días', data:[{x:'Ene',y:926},{x:'Feb',y:396},{x:'Mar',y:846},{x:'Abr',y:607},{x:'May',y:285},{x:'Jun',y:284},{x:'Jul',y:298},{x:'Ago',y:594},{x:'Sep',y:420},{x:'Oct',y:900},{x:'Nov',y:1791},{x:'Dic',y:2141}] },
      ],
    },
  },

};
