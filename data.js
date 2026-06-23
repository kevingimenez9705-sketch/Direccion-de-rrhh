// data.js — datos reales xlsx + indicadores mayo 2026
// Actualizado: gráficos de rotación por gerencia/local/fábrica agregados
// a Sabores Express, Extremas, Fábrica y Staff (May 2026 desde xlsx ROTACION).

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
  { id:'empresa',         group:'UNIDADES', name:'Empresa Total',    sub:'Visión consolidada · todas las razones sociales', accent:'blue',   iconKey:'building',  logo:'assets/empresa total.png',       headerSub:'Consolidado de todas las unidades operativas',       tags:['Dotación 4.235','Ausentismo 5.37%'] },
  { id:'sabores',         group:'UNIDADES', name:'Sabores Express',  sub:'Cadena de locales gastronómicos',                 accent:'blue',   iconKey:'utensils',  logo:'assets/sabores.png',             headerSub:'Cadena de locales gastronómicos · May 2026',         tags:['Ausentismo 3.99%','Rotación 8.50%'] },
  { id:'extremas',        group:'UNIDADES', name:'Extremas',         sub:'Operación logística y distribución',             accent:'cyan',   iconKey:'truck',     logo:'assets/extremas.png',            headerSub:'Operación logística y distribución · May 2026',      tags:['Ausentismo 4.13%','Rotación 12.15%'] },
  { id:'staff',           group:'UNIDADES', name:'Staff',            sub:'Áreas corporativas y administración',            accent:'purple', iconKey:'briefcase', logo:'assets/Staff.png',               headerSub:'Áreas corporativas y administración · May 2026',     tags:['Ausentismo 5.28%','Rotación 5.66%'] },
  { id:'fabrica',         group:'UNIDADES', name:'Fábrica',          sub:'Plantas productivas',                            accent:'amber',  iconKey:'factory',   logo:'assets/fabrica.png',             headerSub:'Plantas productivas · May 2026',                     tags:['Ausentismo 9.61%','Rotación 7.51%'] },
  { id:'judiciales',      group:'GESTIÓN',  name:'Inf. Judiciales',  sub:'Acuerdos y resoluciones por razón social',       accent:'purple', iconKey:'gavel',     logo:'assets/informes judiciales.png', headerSub:'Acuerdos y resoluciones · Mayo 2026',                tags:['38 acuerdos','$185.9M'] },
  { id:'inspecciones',    group:'GESTIÓN',  name:'Inspecciones',     sub:'Visitas, observaciones y cumplimiento',          accent:'green',  iconKey:'search',    logo:'assets/inspecciones.png',        headerSub:'Visitas regulatorias y de cumplimiento · Mayo 2026', tags:['20 inspecciones','5 multas'] },
  { id:'horasextras',     group:'GESTIÓN',  name:'Horas Extras',     sub:'Horas, costo y distribución por unidad',         accent:'amber',  iconKey:'clock',     logo:'assets/horas extras.png',        headerSub:'Horas extras, costo y distribución · May 2026',      tags:['3.922 hs','$43.9M'] },
  { id:'accidentabilidad',group:'GESTIÓN',  name:'Accidentabilidad', sub:'Tasa, días caídos y reporte de siniestros',      accent:'red',    iconKey:'alert',     logo:'assets/accidentabilidad.png',    headerSub:'Tasa, días caídos y reporte de siniestros',          tags:['477 siniestros hist.','13.160 días caídos'] },
];

// ─── TENDENCIAS AUSENTISMO ───
const ausEmpresaTend  = [{x:'Ene',y:4.26},{x:'Feb',y:4.33},{x:'Mar',y:6.82},{x:'Abr',y:5.99},{x:'May',y:5.37}];
const ausSaboresTond  = [{x:'Ene',y:4.74},{x:'Feb',y:4.16},{x:'Mar',y:5.17},{x:'Abr',y:3.56},{x:'May',y:3.99}];
const ausExtremasTend = [{x:'Ene',y:1.40},{x:'Feb',y:1.29},{x:'Mar',y:7.17},{x:'Abr',y:4.38},{x:'May',y:4.13}];
const ausStaffTend    = [{x:'Ene',y:null},{x:'Feb',y:6.56},{x:'Mar',y:5.74},{x:'Abr',y:9.28},{x:'May',y:5.28}];
const ausFabricaTend  = [{x:'Ene',y:8.60},{x:'Feb',y:6.67},{x:'Mar',y:9.21},{x:'Abr',y:11.43},{x:'May',y:9.61}];

// ─── TENDENCIAS ROTACIÓN ───
const rotEmpresaTend  = [{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:11.62},{x:'May',y:9.96}];
const rotSaboresTend  = [{x:'Ene',y:13.90},{x:'Feb',y:13.05},{x:'Mar',y:18.81},{x:'Abr',y:14.52},{x:'May',y:8.50}];
const rotExtremasTend = [{x:'Ene',y:17.80},{x:'Feb',y:11.48},{x:'Mar',y:12.16},{x:'Abr',y:13.58},{x:'May',y:12.15}];
const rotStaffTend    = [{x:'Ene',y:5.20},{x:'Feb',y:2.63},{x:'Mar',y:4.54},{x:'Abr',y:4.64},{x:'May',y:5.66}];
const rotFabricaTend  = [{x:'Ene',y:11.60},{x:'Feb',y:7.82},{x:'Mar',y:7.46},{x:'Abr',y:6.54},{x:'May',y:7.51}];

// ─── TENDENCIAS DOTACIÓN ───
const dotEmpresaTend  = [{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:4067},{x:'Abr',y:4101},{x:'May',y:4235}];
const dotSaboresTend  = [{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:1668},{x:'Abr',y:1754},{x:'May',y:1845}];
const dotExtremasTend = [{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:1107},{x:'Abr',y:1102},{x:'May',y:1121}];
const dotStaffTend    = [{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:364},{x:'Abr',y:368},{x:'May',y:374}];
const dotFabricaTend  = [{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:928},{x:'Abr',y:877},{x:'May',y:895}];

// ─── HORAS EXTRAS ───
const hsTendencia    = [{x:'Ene',y:6325},{x:'Feb',y:4479},{x:'Mar',y:3779},{x:'Abr',y:4169},{x:'May',y:3922}];
const costoTendencia = [{x:'Ene',y:67.3},{x:'Feb',y:49.4},{x:'Mar',y:38.8},{x:'Abr',y:49.2},{x:'May',y:43.9}];

// ─── ACCIDENTABILIDAD ───
const sinTendencia    = [{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:20}];
const diasTendencia   = [{x:'Ene',y:926},{x:'Feb',y:396},{x:'Mar',y:846},{x:'Abr',y:607},{x:'May',y:246}];

// ─── ROTACIÓN POR GERENCIA — MAY 2026 (fuente: xlsx ROTACION) ───
// Sabores: bajas 151 / inicio 1.754 / final 1.845 → rotación total 8.50%
const rotSaboresPorGerencia = [
  { x:'A. Sbampato',   y: 8.34 },
  { x:'G. Cabrera',    y: 6.28 },
  { x:'I. Pisaniello', y:16.05 },
  { x:'L. Velez',      y: 4.06 },
  { x:'M. Biurra',     y: 9.05 },
];
// Extremas: bajas 110 / inicio 1.102 / final 1.121 → rotación total 12.15%
const rotExtremasPorGerencia = [
  { x:'F. Aramburo', y:17.82 },
  { x:'F. Gomez',    y:12.94 },
  { x:'G. Gomez',    y:12.94 },
];
// Fábrica: bajas 55 / inicio 868 / final 890 → rotación total 7.51%
const rotFabricaPorSector = [
  { x:'S. Martín',   y: 7.02 },
  { x:'S. Miguel',   y: 3.23 },
  { x:'Tapas 1',     y:31.43 },
  { x:'Tapas 2',     y:11.86 },
  { x:'Extremas',    y:12.82 },
  { x:'Papelera',    y: 6.17 },
  { x:'Pizzas',      y: 9.09 },
  { x:'J Y Q',       y: 2.15 },
  { x:'Procesadora', y: 6.90 },
  { x:'Mantto.',     y: 5.56 },
  { x:'Calidad',     y: 6.12 },
  { x:'Adm.',        y: 3.45 },
  { x:'Logística',   y: 4.48 },
  { x:'Panificad.',  y:13.67 },
];
const rotFabricaBajasPorSector = [
  { label:'S. Martín',  value: 7 },
  { label:'Tapas 1',    value: 8 },
  { label:'Panificad.', value:11 },
  { label:'Tapas 2',    value: 3 },
  { label:'Extremas',   value: 1 },
  { label:'J Y Q',      value: 4 },
  { label:'Pizzas',     value: 3 },
  { label:'S. Miguel',  value: 6 },
  { label:'Proce.',     value: 1 },
  { label:'Logística',  value: 4 },
  { label:'Otros',      value: 7 },
];
// Gráfico placeholder para meses sin desglose
const sdGerencia = { type:'bar', title:'Rotación por gerencia / sector', sub:'S/D para este período — desglose disponible solo en May 2026', data:[{x:'S/D',y:null}] };
const sdGerenciaStaff = { type:'bar', title:'Rotación por área / gerencia', sub:'S/D — sin desglose en la fuente para Staff', data:[{x:'S/D',y:null}] };

// ══════════════════════════════════════════════════════
window.SECTOR_DATA = {

  // ════════════════════════════════════
  // EMPRESA TOTAL
  // ════════════════════════════════════
  empresa: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Ene 2026' } },
        { label:'Ausentismo', value:'4.26%', delta:{ dir:'neutral', text:'Base 93.981 días · Ene 2026' } },
        { label:'Rotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato consolidado Ene' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotEmpresaTend },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausEmpresaTend },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotEmpresaTend },
        { type:'bar',  title:'Rotación por unidad', sub:'% mes activo', data:[{x:'Sabores',y:13.90},{x:'Extremas',y:17.80},{x:'Staff',y:5.20},{x:'Fábrica',y:11.60}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Feb 2026' } },
        { label:'Ausentismo', value:'4.33%', delta:{ dir:'down',      text:'+0.07 pp vs. mes ant.' } },
        { label:'Rotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato consolidado Feb' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotEmpresaTend },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausEmpresaTend },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotEmpresaTend },
        { type:'bar',  title:'Rotación por unidad', sub:'% mes activo', data:[{x:'Sabores',y:13.05},{x:'Extremas',y:11.48},{x:'Staff',y:2.63},{x:'Fábrica',y:7.82}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'4.067', delta:{ dir:'neutral', text:'Fin Mar 2026 · derivado inicio Abr' } },
        { label:'Ausentismo', value:'6.82%', delta:{ dir:'down',      text:'+2.49 pp vs. mes ant.' } },
        { label:'Rotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato consolidado Mar' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotEmpresaTend },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausEmpresaTend },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotEmpresaTend },
        { type:'bar',  title:'Rotación por unidad', sub:'% mes activo', data:[{x:'Sabores',y:18.81},{x:'Extremas',y:12.16},{x:'Staff',y:4.54},{x:'Fábrica',y:7.46}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'4.101', delta:{ dir:'down', text:'+34 vs. fin de Mar (4.067)' } },
        { label:'Ausentismo', value:'5.99%', delta:{ dir:'up',    text:'−0.83 pp vs. mes ant.' } },
        { label:'Rotación',   value:'11.62%',delta:{ dir:'neutral', text:'Calculado: 412 bajas · 537 altas' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotEmpresaTend },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausEmpresaTend },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotEmpresaTend },
        { type:'bar',  title:'Rotación por unidad', sub:'% mes activo', data:[{x:'Sabores',y:14.52},{x:'Extremas',y:13.58},{x:'Staff',y:4.64},{x:'Fábrica',y:6.54}] },
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'4.235', delta:{ dir:'down',      text:'+134 vs. inicio del mes (4.101)' } },
        { label:'Ausentismo', value:'5.37%', delta:{ dir:'up',    text:'−0.62 pp vs. mes ant.' } },
        { label:'Rotación',   value:'9.96%', delta:{ dir:'up',    text:'−1.66 pp vs. mes ant. · 364 bajas · 466 altas' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotEmpresaTend },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausEmpresaTend },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotEmpresaTend },
        { type:'bar',  title:'Rotación por unidad', sub:'% mes activo', data:[{x:'Sabores',y:8.50},{x:'Extremas',y:12.15},{x:'Staff',y:5.66},{x:'Fábrica',y:7.51}] },
      ],
    },
  },

  // ════════════════════════════════════
  // SABORES EXPRESS
  // ════════════════════════════════════
  sabores: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Ene 2026' } },
        { label:'Ausentismo', value:'4.74%', delta:{ dir:'neutral', text:'Base 36.478 días · Ene 2026' } },
        { label:'Rotación',   value:'13.9%', delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotSaboresTend },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausSaboresTond },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotSaboresTend },
        sdGerencia,
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Feb 2026' } },
        { label:'Ausentismo', value:'4.16%', delta:{ dir:'up',    text:'−0.58 pp vs. mes ant.' } },
        { label:'Rotación',   value:'13.05%',delta:{ dir:'up',    text:'−0.85 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotSaboresTend },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausSaboresTond },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotSaboresTend },
        sdGerencia,
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'1.668', delta:{ dir:'neutral', text:'Fin Mar 2026 · derivado inicio Abr' } },
        { label:'Ausentismo', value:'5.17%', delta:{ dir:'down',      text:'+1.01 pp vs. mes ant.' } },
        { label:'Rotación',   value:'18.81%',delta:{ dir:'down',      text:'+5.76 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotSaboresTend },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausSaboresTond },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotSaboresTend },
        sdGerencia,
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'1.754', delta:{ dir:'down', text:'+86 vs. fin de Mar (1.668)' } },
        { label:'Ausentismo', value:'3.56%', delta:{ dir:'up',    text:'−1.61 pp vs. mes ant.' } },
        { label:'Rotación',   value:'14.52%',delta:{ dir:'up',    text:'−4.29 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotSaboresTend },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausSaboresTond },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotSaboresTend },
        sdGerencia,
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'1.845', delta:{ dir:'down',      text:'+91 vs. inicio del mes (1.754)' } },
        { label:'Ausentismo', value:'3.99%', delta:{ dir:'down',      text:'+0.43 pp vs. mes ant.' } },
        { label:'Rotación',   value:'8.50%', delta:{ dir:'up',    text:'−6.02 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotSaboresTend },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausSaboresTond },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotSaboresTend },
        // ── Rotación por gerencia regional — datos reales xlsx ──
        {
          type:'bar',
          title:'Rotación por gerencia regional — May 2026',
          sub:'% · desglose por regional',
          data: rotSaboresPorGerencia,
        },
        {
          type:'donut',
          title:'Distribución de bajas por gerencia — May 2026',
          sub:'Personas × cese · Sabores total: 151 bajas',
          center:'151',
          data:[
            { label:'A. Sbampato',   value:33 },
            { label:'G. Cabrera',    value:22 },
            { label:'I. Pisaniello', value:43 },
            { label:'L. Velez',      value: 7 },
            { label:'M. Biurra',     value:46 },
          ],
        },
      ],
    },
  },

  // ════════════════════════════════════
  // EXTREMAS
  // ════════════════════════════════════
  extremas: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'S/D',    delta:{ dir:'neutral', text:'Sin dato Ene 2026' } },
        { label:'Ausentismo', value:'1.40%',  delta:{ dir:'neutral', text:'Base 28.562 días · Ene 2026' } },
        { label:'Rotación',   value:'17.80%', delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotExtremasTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausExtremasTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotExtremasTend },
        sdGerencia,
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'S/D',    delta:{ dir:'neutral', text:'Sin dato Feb 2026' } },
        { label:'Ausentismo', value:'1.29%',  delta:{ dir:'up',    text:'−0.11 pp vs. mes ant.' } },
        { label:'Rotación',   value:'11.48%', delta:{ dir:'up',    text:'−6.32 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotExtremasTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausExtremasTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotExtremasTend },
        sdGerencia,
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'1.107', delta:{ dir:'neutral', text:'Fin Mar 2026 · derivado inicio Abr' } },
        { label:'Ausentismo', value:'7.17%',  delta:{ dir:'down',      text:'+5.88 pp vs. mes ant.' } },
        { label:'Rotación',   value:'12.16%', delta:{ dir:'down',      text:'+0.68 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotExtremasTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausExtremasTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotExtremasTend },
        sdGerencia,
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'1.102', delta:{ dir:'up', text:'−5 vs. fin de Mar (1.107)' } },
        { label:'Ausentismo', value:'4.38%',  delta:{ dir:'up',    text:'−2.79 pp vs. mes ant.' } },
        { label:'Rotación',   value:'13.58%', delta:{ dir:'down',      text:'+1.42 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotExtremasTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausExtremasTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotExtremasTend },
        sdGerencia,
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'1.121',  delta:{ dir:'down',      text:'+19 vs. inicio del mes (1.102)' } },
        { label:'Ausentismo', value:'4.13%',  delta:{ dir:'up',    text:'−0.25 pp vs. mes ant.' } },
        { label:'Rotación',   value:'12.15%', delta:{ dir:'up',    text:'−1.43 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotExtremasTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausExtremasTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotExtremasTend },
        // ── Rotación por gerencia regional — datos reales xlsx ──
        {
          type:'bar',
          title:'Rotación por gerencia regional — May 2026',
          sub:'% · desglose por regional',
          data: rotExtremasPorGerencia,
        },
        {
          type:'donut',
          title:'Distribución de bajas por gerencia — May 2026',
          sub:'Personas × cese · Extremas total: 110 bajas',
          center:'110',
          data:[
            { label:'F. Aramburo', value:33 },
            { label:'F. Gomez',    value:43 },
            { label:'G. Gomez',    value:34 },
          ],
        },
      ],
    },
  },

  // ════════════════════════════════════
  // STAFF
  // ════════════════════════════════════
  staff: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Ene 2026' } },
        { label:'Ausentismo', value:'S/D',   delta:{ dir:'neutral', text:'Sin registro Ene 2026' } },
        { label:'Rotación',   value:'5.20%', delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotStaffTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausStaffTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotStaffTend },
        sdGerenciaStaff,
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Feb 2026' } },
        { label:'Ausentismo', value:'6.56%', delta:{ dir:'neutral', text:'Feb 2026' } },
        { label:'Rotación',   value:'2.63%', delta:{ dir:'up',    text:'−2.57 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotStaffTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausStaffTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotStaffTend },
        sdGerenciaStaff,
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'364', delta:{ dir:'neutral', text:'Fin Mar 2026 · derivado inicio Abr' } },
        { label:'Ausentismo', value:'5.74%', delta:{ dir:'up',    text:'−0.82 pp vs. mes ant.' } },
        { label:'Rotación',   value:'4.54%', delta:{ dir:'down',      text:'+1.91 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotStaffTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausStaffTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotStaffTend },
        sdGerenciaStaff,
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'368', delta:{ dir:'down', text:'+4 vs. fin de Mar (364)' } },
        { label:'Ausentismo', value:'9.28%', delta:{ dir:'down',      text:'+3.54 pp vs. mes ant.' } },
        { label:'Rotación',   value:'4.64%', delta:{ dir:'down',      text:'+0.10 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotStaffTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausStaffTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotStaffTend },
        sdGerenciaStaff,
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'374',   delta:{ dir:'down',      text:'+6 vs. inicio del mes (368)' } },
        { label:'Ausentismo', value:'5.28%', delta:{ dir:'up',    text:'−4.00 pp vs. mes ant.' } },
        { label:'Rotación',   value:'5.66%', delta:{ dir:'down',      text:'+1.02 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotStaffTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausStaffTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotStaffTend },
        sdGerenciaStaff,
      ],
    },
  },

  // ════════════════════════════════════
  // FÁBRICA
  // ════════════════════════════════════
  fabrica: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'S/D',    delta:{ dir:'neutral', text:'Sin dato Ene 2026' } },
        { label:'Ausentismo', value:'8.60%',  delta:{ dir:'neutral', text:'Base 21.087 días · Ene 2026' } },
        { label:'Rotación',   value:'11.60%', delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotFabricaTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausFabricaTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotFabricaTend },
        sdGerencia,
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Feb 2026' } },
        { label:'Ausentismo', value:'6.67%', delta:{ dir:'up',    text:'−1.93 pp vs. mes ant.' } },
        { label:'Rotación',   value:'7.82%', delta:{ dir:'up',    text:'−3.78 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotFabricaTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausFabricaTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotFabricaTend },
        sdGerencia,
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'928', delta:{ dir:'neutral', text:'Fin Mar 2026 · derivado inicio Abr' } },
        { label:'Ausentismo', value:'9.21%', delta:{ dir:'down',      text:'+2.54 pp vs. mes ant.' } },
        { label:'Rotación',   value:'7.46%', delta:{ dir:'up',    text:'−0.36 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotFabricaTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausFabricaTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotFabricaTend },
        sdGerencia,
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'877', delta:{ dir:'up', text:'−51 vs. fin de Mar (928)' } },
        { label:'Ausentismo', value:'11.43%', delta:{ dir:'down',      text:'+2.22 pp vs. mes ant.' } },
        { label:'Rotación',   value:'6.54%',  delta:{ dir:'up',    text:'−0.92 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotFabricaTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausFabricaTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotFabricaTend },
        sdGerencia,
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'895',   delta:{ dir:'down',      text:'+18 vs. inicio del mes (877)' } },
        { label:'Ausentismo', value:'9.61%', delta:{ dir:'up',    text:'−1.82 pp vs. mes ant.' } },
        { label:'Rotación',   value:'7.51%', delta:{ dir:'down',      text:'+0.97 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotFabricaTend },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausFabricaTend },
        // ── Rotación (tendencia) y Distribución de bajas por sector — misma fila ──
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotFabricaTend },
        {
          type:'donut',
          title:'Distribución de bajas por sector — May 2026',
          sub:'Personas × cese · Fábrica total: 55 bajas',
          center:'55',
          data: rotFabricaBajasPorSector,
        },
        // ── Rotación por sector/línea productiva — queda sola ──
        {
          type:'bar',
          title:'Rotación por sector / línea — May 2026',
          sub:'% · desglose por línea productiva',
          data: rotFabricaPorSector,
        },
      ],
    },
  },

  // ════════════════════════════════════
  // JUDICIALES
  // ════════════════════════════════════
  judiciales: {
    ene: {
      kpis: [
        { label:'Total acuerdos — mes activo', value:'$95.2M',  delta:{ dir:'neutral', text:'17 acuerdos · Ene 2026 · solo actor' } },
        { label:'Total acuerdos — año ant.',   value:'S/D',     delta:{ dir:'neutral', text:'Sin dato Ene 2025' } },
        { label:'Total pago — mes activo',     value:'$39.5M',  delta:{ dir:'neutral', text:'Cuotas con vto. Ene 2026' } },
        { label:'Cuotas pendientes',           value:'$55.7M',  delta:{ dir:'neutral', text:'Vto. Feb 2026 en adelante · acuerdos de Ene' } },
      ],
      charts: [
        { type:'bar', title:'Evolución acuerdos', sub:'Millones $ · total por mes (actor)', data:[{x:'Ene',y:95.2},{x:'Feb',y:18.5},{x:'Mar',y:55.9},{x:'Abr',y:85.7},{x:'May',y:140.8}] },
        { type:'bar', title:'Evolución pagos mensuales', sub:'Millones $ · cuotas vencidas por mes', data:[{x:'Ene',y:39.5},{x:'Feb',y:46.2},{x:'Mar',y:67.3},{x:'Abr',y:84.4},{x:'May',y:145.4}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Total acuerdos — mes activo', value:'$18.5M',  delta:{ dir:'down',    text:'4 acuerdos · Feb 2026 · solo actor' } },
        { label:'Total acuerdos — año ant.',   value:'S/D',     delta:{ dir:'neutral', text:'Sin dato Feb 2025' } },
        { label:'Total pago — mes activo',     value:'$46.2M',  delta:{ dir:'up',      text:'+$6.7M vs. mes ant.' } },
        { label:'Cuotas pendientes',           value:'$8.0M',   delta:{ dir:'down',    text:'Vto. Mar 2026 en adelante · acuerdos de Feb' } },
      ],
      charts: [
        { type:'bar', title:'Evolución acuerdos', sub:'Millones $ · total por mes (actor)', data:[{x:'Ene',y:95.2},{x:'Feb',y:18.5},{x:'Mar',y:55.9},{x:'Abr',y:85.7},{x:'May',y:140.8}] },
        { type:'bar', title:'Evolución pagos mensuales', sub:'Millones $ · cuotas vencidas por mes', data:[{x:'Ene',y:39.5},{x:'Feb',y:46.2},{x:'Mar',y:67.3},{x:'Abr',y:84.4},{x:'May',y:145.4}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Total acuerdos — mes activo', value:'$55.9M',  delta:{ dir:'up',      text:'21 acuerdos · Mar 2026 · solo actor' } },
        { label:'Total acuerdos — año ant.',   value:'S/D',     delta:{ dir:'neutral', text:'Sin dato Mar 2025' } },
        { label:'Total pago — mes activo',     value:'$67.3M',  delta:{ dir:'up',      text:'+$21.1M vs. mes ant.' } },
        { label:'Cuotas pendientes',           value:'$12.9M',  delta:{ dir:'neutral', text:'Vto. Abr 2026 en adelante · acuerdos de Mar' } },
      ],
      charts: [
        { type:'bar', title:'Evolución acuerdos', sub:'Millones $ · total por mes (actor)', data:[{x:'Ene',y:95.2},{x:'Feb',y:18.5},{x:'Mar',y:55.9},{x:'Abr',y:85.7},{x:'May',y:140.8}] },
        { type:'bar', title:'Evolución pagos mensuales', sub:'Millones $ · cuotas vencidas por mes', data:[{x:'Ene',y:39.5},{x:'Feb',y:46.2},{x:'Mar',y:67.3},{x:'Abr',y:84.4},{x:'May',y:145.4}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Total acuerdos — mes activo', value:'$85.7M',  delta:{ dir:'up',      text:'30 acuerdos · Abr 2026 · solo actor' } },
        { label:'Total acuerdos — año ant.',   value:'S/D',     delta:{ dir:'neutral', text:'Sin informe Abr 2025' } },
        { label:'Total pago — mes activo',     value:'$84.4M',  delta:{ dir:'up',      text:'+$17.1M vs. mes ant.' } },
        { label:'Cuotas pendientes',           value:'$34.1M',  delta:{ dir:'up',      text:'Vto. May 2026 en adelante · acuerdos de Abr' } },
      ],
      charts: [
        { type:'hbar', title:'Monto por razón social — mes activo', sub:'Millones $ · solo actor', data:[
          {x:'PISANIELLO IVO',                    y:15.20},
          {x:'LA EMPANADERIA S.A',                y:14.50},
          {x:'CASUT FRIJON MATIAS EZEQUIEL',      y:11.60},
          {x:'SAYAGO MARCIO HUMBERTO NICOLAS',    y:8.00},
          {x:'CASTRO CINTIA NOEMI',               y:6.00},
          {x:'BOLLOS Y RELLENOS S.A',             y:5.00},
          {x:'SORIA FRANCISCO ADRIAN',            y:5.00},
          {x:'RIOS BRUNO',                        y:4.00},
          {x:'RUANO ROJAS GREISSI',               y:3.80},
          {x:'COMACHI VALERIA SABRINA',           y:3.00},
          {x:'GONZALEZ MIGUEL ANGEL',             y:1.16},
        ]},
        { type:'donut', title:'Distribución por tipo (monto)', sub:'% del total · Abr 2026', center:'$85.7M', data:[
          {label:'Sabores',  value:56.9},
          {label:'Fábrica',  value:22.8},
          {label:'Extremas', value:10.5},
          {label:'Staff',    value:9.8},
        ]},
      ],
      details: [{
        key:'detalle-abr', title:'Detalle acuerdos — Abr 2026', iconEmoji:'⚖️', accent:'purple', type:'table',
        topChips:[{label:'Sabores',value:'56.9%',tone:'green'},{label:'Fábrica',value:'22.8%',tone:'blue'},{label:'Extremas',value:'10.5%',tone:'purple'}],
        columns:[{key:'razon',label:'RAZÓN SOCIAL'},{key:'unidad',label:'LOCAL / FÁBRICA'},{key:'tipo',label:'TIPO',badge:true},{key:'actor',label:'ACTOR',align:'right'},{key:'total',label:'TOTAL',align:'right',strong:true}],
        rows:[
          {razon:'BOLLOS Y RELLENOS S.A',          unidad:'MANTENIMIENTO FABRICA',    tipo:'Fábrica',  actor:'$5.000.000',  total:'$5.000.000'},
          {razon:'CASTRO CINTIA NOEMI',            unidad:'SABORES ENTRE RIOS',       tipo:'Sabores',  actor:'$4.000.000',  total:'$4.000.000'},
          {razon:'CASTRO CINTIA NOEMI',            unidad:'EXTREMAS SAN FERNANDO',    tipo:'Extremas', actor:'$2.000.000',  total:'$2.000.000'},
          {razon:'CASUT FRIJON MATIAS EZEQUIEL',   unidad:'SABORES LANUS',            tipo:'Sabores',  actor:'$3.600.000',  total:'$3.600.000'},
          {razon:'CASUT FRIJON MATIAS EZEQUIEL',   unidad:'HURLINGHAM SABORES II',    tipo:'Sabores',  actor:'$8.000.000',  total:'$8.000.000'},
          {razon:'CASUT FRIJON MATIAS EZEQUIEL',   unidad:'EXTREMAS LUJAN',           tipo:'Extremas', actor:'$2.018.000',  total:'$2.018.000'},
          {razon:'COMACHI VALERIA SABRINA',        unidad:'SABORES BALLESTER II',     tipo:'Sabores',  actor:'$3.000.000',  total:'$3.000.000'},
          {razon:'GONZALEZ MIGUEL ANGEL',          unidad:'SABORES MDQ I',            tipo:'Sabores',  actor:'$1.157.360',  total:'$1.157.360'},
          {razon:'LA EMPANADERIA S.A',             unidad:'FABRICA SAN MARTIN',       tipo:'Fábrica',  actor:'$2.200.000',  total:'$2.200.000'},
          {razon:'LA EMPANADERIA S.A',             unidad:'FABRICA SAN MARTIN',       tipo:'Fábrica',  actor:'$3.400.000',  total:'$3.400.000'},
          {razon:'LA EMPANADERIA S.A',             unidad:'LOGISTICA FABRICA',        tipo:'Fábrica',  actor:'$3.500.000',  total:'$3.500.000'},
          {razon:'LA EMPANADERIA S.A',             unidad:'FABRICA SAN MARTIN',       tipo:'Fábrica',  actor:'$8.800.000',  total:'$8.800.000'},
          {razon:'PISANIELLO IVO',                 unidad:'EXTREMAS SAN ISIDRO',      tipo:'Extremas', actor:'$2.000.000',  total:'$2.000.000'},
          {razon:'PISANIELLO IVO',                 unidad:'MANTENIMIENTO LOCALES',    tipo:'Sabores',  actor:'$12.000.000', total:'$12.000.000'},
          {razon:'PISANIELLO IVO',                 unidad:'SABORES PACHECO',          tipo:'Sabores',  actor:'$2.300.000',  total:'$2.300.000'},
          {razon:'PISANIELLO IVO',                 unidad:'EXTREMAS SAN ISIDRO',      tipo:'Extremas', actor:'$1.200.000',  total:'$1.200.000'},
          {razon:'RIOS BRUNO',                     unidad:'SABORES HURLINGHAM II',    tipo:'Sabores',  actor:'$4.000.000',  total:'$4.000.000'},
          {razon:'RUANO ROJAS GREISSI',            unidad:'EXTREMAS SAN FERNANDO',    tipo:'Extremas', actor:'$1.800.000',  total:'$1.800.000'},
          {razon:'RUANO ROJAS GREISSI',            unidad:'EXTREMAS POMPEYA',         tipo:'Extremas', actor:'$2.000.000',  total:'$2.000.000'},
          {razon:'SAYAGO MARCIO HUMBERTO NICOLAS', unidad:'SABORES PALOMAR',          tipo:'Sabores',  actor:'$4.000.000',  total:'$4.000.000'},
          {razon:'SAYAGO MARCIO HUMBERTO NICOLAS', unidad:'SABORES SAN FERNANDO',     tipo:'Sabores',  actor:'$2.000.000',  total:'$2.000.000'},
          {razon:'SORIA FRANCISCO ADRIAN',         unidad:'SABORES BOULOGNE',         tipo:'Sabores',  actor:'$5.000.000',  total:'$5.000.000'},
        ],
        totalRow:{ label:'TOTAL ABR 2026 (solo actor)', value:'$85.657.360' },
      }],
    },
    may: {
      kpis: [
        { label:'Total acuerdos cerrados en mayo', value:'$185.950.281', delta:{ dir:'neutral', text:'38 acuerdos celebrados' } },
        { label:'Total pagado en mayo',            value:'$145.420.194', delta:{ dir:'neutral', text:'Acuerdos anteriores + acuerdos mayo' } },
        { label:'Total a pagar (Jun–Ago)',         value:'$80.613.421',  delta:{ dir:'neutral', text:'Cuotas pendientes de acuerdos cerrados' } },
      ],
      charts: [],
      details: [
        {
          key:'cierre-may', title:'Cierre de acuerdos — Mayo 2026', iconEmoji:'⚖️', accent:'purple', type:'table',
          columns:[
            {key:'concepto',label:'CONCEPTO'},
            {key:'detalle',label:'DETALLE'},
            {key:'monto',label:'MONTO',align:'right',strong:true},
            {key:'spm',label:'SE PAGA EN MAYO',align:'right'},
          ],
          rows:[
            {concepto:'Fábricas',                     detalle:'18% de 38', monto:'$46.514.631',  spm:'$28.414.631'},
            {concepto:'Locales / Sabores / Extremas', detalle:'82% de 38', monto:'$139.435.650', spm:'$89.188.896'},
          ],
          totalRow:{ label:'Total acuerdos cerrados en mayo — 38 acuerdos celebrados', value:'$185.950.281' },
        },
        {
          key:'pagos-may', title:'Pagos emitidos en mayo 2026', iconEmoji:'💰', accent:'green', type:'table',
          columns:[{key:'concepto',label:'CONCEPTO'},{key:'detalle',label:'DETALLE'},{key:'monto',label:'MONTO',align:'right',strong:true}],
          rows:[
            {concepto:'Acuerdos de meses anteriores', detalle:'Cuotas correspondientes a acuerdos previos a mayo', monto:'$27.816.667'},
            {concepto:'Acuerdos celebrados en mayo',  detalle:'Cuotas abonadas de acuerdos firmados en mayo',      monto:'$117.603.527'},
          ],
          totalRow:{ label:'TOTAL PAGADO EN MAYO', value:'$145.420.194' },
        },
        {
          key:'pagos-pendientes-may', title:'Pagos a emitir — acuerdos cerrados en mayo y anteriores', iconEmoji:'📅', accent:'amber', type:'table',
          columns:[
            {key:'mes',label:'CONCEPTO'},
            {key:'detalle',label:'DETALLE'},
            {key:'fabrica',label:'FÁBRICA',align:'right'},
            {key:'locales',label:'LOCALES',align:'right'},
            {key:'monto',label:'MONTO',align:'right',strong:true},
          ],
          rows:[
            {mes:'Junio 2026',  detalle:'Cuotas de acuerdos cerrados en mayo y anteriores', fabrica:'$13.700.000', locales:'$43.663.421', monto:'$57.363.421'},
            {mes:'Julio 2026',  detalle:'Cuotas de acuerdos cerrados en mayo y anteriores', fabrica:'$4.500.000',  locales:'$8.625.000',  monto:'$13.125.000'},
            {mes:'Agosto 2026', detalle:'Cuotas de acuerdos cerrados en mayo',              fabrica:'$4.500.000',  locales:'$5.625.000',  monto:'$10.125.000'},
          ],
          totalRow:{ label:'TOTAL A PAGAR (Jun–Ago)', value:'$80.613.421' },
        },
      ],
    },
  },

  // ════════════════════════════════════
  // INSPECCIONES
  // ════════════════════════════════════
  inspecciones: {
    ene: {
      kpis: [
        { label:'Inspecciones MT',           value:'S/D', delta:{ dir:'neutral', text:'Sin informe Ene 2026' } },
        { label:'Documentación entregada MT', value:'S/D', delta:{ dir:'neutral', text:'Sin informe Ene 2026' } },
        { label:'Audiencias',                 value:'S/D', delta:{ dir:'neutral', text:'Sin informe Ene 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo — sin dato', data:[{x:'S/D',y:null}] },
        { type:'donut',title:'Composición de actividad', sub:'Inspecciones + audiencias — sin dato', data:[{label:'S/D',value:100}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Inspecciones MT',           value:'S/D', delta:{ dir:'neutral', text:'Sin informe Feb 2026' } },
        { label:'Documentación entregada MT', value:'S/D', delta:{ dir:'neutral', text:'Sin informe Feb 2026' } },
        { label:'Audiencias',                 value:'S/D', delta:{ dir:'neutral', text:'Sin informe Feb 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo — sin dato', data:[{x:'S/D',y:null}] },
        { type:'donut',title:'Composición de actividad', sub:'Inspecciones + audiencias — sin dato', data:[{label:'S/D',value:100}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Inspecciones MT',           value:'38',  delta:{ dir:'neutral', text:'Mar 2026' } },
        { label:'Documentación entregada MT', value:'S/D', delta:{ dir:'neutral', text:'Sin dato Mar 2026' } },
        { label:'Audiencias',                 value:'S/D', delta:{ dir:'neutral', text:'Sin dato Mar 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo', data:[{x:'Sabores',y:32},{x:'Extremas',y:4},{x:'Fábrica',y:2},{x:'Staff',y:0}] },
        { type:'donut',title:'Composición de actividad', sub:'Inspecciones · Mar 2026 (audiencias S/D)', center:'38', data:[{label:'Inspecciones',value:38}] },
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
        { label:'Inspecciones MT',           value:'17',   delta:{ dir:'neutral', text:'−21 vs. mes anterior' } },
        { label:'Documentación entregada MT', value:'100%', delta:{ dir:'neutral', text:'Abr 2026' } },
        { label:'Audiencias',                 value:'7',    delta:{ dir:'neutral', text:'Abr 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo', data:[{x:'Sabores',y:12},{x:'Extremas',y:5},{x:'Fábrica',y:0},{x:'Staff',y:0}] },
        { type:'donut',title:'Composición de actividad', sub:'Inspecciones + audiencias · Abr 2026', center:'24', data:[{label:'Inspecciones',value:17},{label:'Audiencias',value:7}] },
      ],
      details: [{
        key:'multas-abr', title:'Multas — Abr 2026', iconEmoji:'🔍', accent:'red', type:'table',
        columns:[{key:'razon',label:'RAZÓN SOCIAL'},{key:'local',label:'LOCAL'},{key:'monto',label:'MONTO',align:'right',strong:true}],
        rows:[
          {razon:'SORIA ADRIAN FRANCISCO',      local:'SE - Boulogne',          monto:'$9.000'},
          {razon:'SAYAGO MARCIO H.N.',           local:'SE - Múltiples locales',  monto:'$120.298'},
          {razon:'SAYAGO LEANDRO M.A.',          local:'SE - Cruce Castelar',     monto:'$2.407.235'},
          {razon:'BOLLOS Y RELLENOS',            local:'Oficina 228 Paralelo',    monto:'$6.164.035'},
        ],
        totalRow:{ label:'TOTAL', value:'$8.700.568' },
      }],
    },
    may: {
      kpis: [
        { label:'Inspecciones totales',  value:'20',           delta:{ dir:'down',    text:'+3 vs. mes anterior' } },
        { label:'Documentación (audiencias)', value:'18 de 18', delta:{ dir:'up',      text:'100% entregada al MT · May 2026' } },
        { label:'Multas',                value:'5',            delta:{ dir:'neutral', text:'$15.441.748 · monto total' } },
        { label:'Demandas',              value:'1',            delta:{ dir:'neutral', text:'$1.126.740,80 · La Empanadería S.A.' } },
      ],
      charts: [
        { type:'donut', title:'Composición de infracciones', sub:'Cantidad · multas vs. demandas · May 2026', center:'6', data:[
          {label:'Multas',   value:5},
          {label:'Demandas', value:1},
        ]},
        { type:'hbar', title:'Monto de multas por razón social', sub:'Millones $ · May 2026', data:[
          {x:'Bollos y Rellenos',            y:8.19},
          {x:'Casut Frijon Matías E.',       y:3.00},
          {x:'Sayago Leandro M.A.',          y:2.41},
          {x:'Victorica Bárbara A.',         y:1.84},
        ]},
      ],
      details: [
        {
          key:'insp-locales-may', title:'Inspecciones — Locales · May 2026', iconEmoji:'🏪', accent:'green', type:'table',
          topChips:[{label:'Inspecciones',value:'20',tone:'green'},{label:'Pers. relevado',value:'43',tone:'blue'},{label:'No registrado',value:'27',tone:'red'}],
          columns:[
            {key:'razon',     label:'RAZÓN SOCIAL'},
            {key:'sucursal',  label:'SUCURSAL'},
            {key:'fecha',     label:'FECHA'},
            {key:'infraccion',label:'INFRACCIÓN', badge:true},
            {key:'expediente',label:'EXPEDIENTE'},
            {key:'relevado',  label:'PERS. RELEV.', align:'right'},
            {key:'noreg',     label:'NO REGIS.',    align:'right'},
            {key:'audiencia', label:'AUDIENCIA',    badge:true},
          ],
          rows:[
            {razon:'Adrián Francisco Soria',         sucursal:'Sabores Tortuguitas',  fecha:'22/05/2026', infraccion:'Relevamiento', expediente:'EX-2026-51539193', relevado:'5', noreg:'2', audiencia:'Sí · 06/08'},
            {razon:'Bajos de Parla',                 sucursal:'Sabores Adrogué',      fecha:'06/05/2026', infraccion:'Relevamiento', expediente:'EX-2026-4564239',  relevado:'2', noreg:'2', audiencia:'No'},
            {razon:'Bajos de Parla',                 sucursal:'Sabores Barracas',     fecha:'12/05/2026', infraccion:'Relevamiento', expediente:'EX-2026-47564668', relevado:'4', noreg:'4', audiencia:'No'},
            {razon:'Bajos de Parla',                 sucursal:'Sabores Cruce Varela', fecha:'27/05/2026', infraccion:'Relevamiento', expediente:'EX-2026-52668352', relevado:'2', noreg:'2', audiencia:'No'},
            {razon:'Castro Cintia Noemí',            sucursal:'Extremas San Miguel',  fecha:'18/05/2026', infraccion:'Relevamiento', expediente:'—',               relevado:'—', noreg:'—', audiencia:'—'},
            {razon:'Castro Cintia Noemí',            sucursal:'Extremas Tortuguitas', fecha:'22/05/2026', infraccion:'Relevamiento', expediente:'EX-2026-51530267', relevado:'6', noreg:'3', audiencia:'Sí · 24/08'},
            {razon:'Casut Frijon Matías Ezequiel',   sucursal:'Sabores Corrientes 3', fecha:'22/05/2026', infraccion:'Relevamiento', expediente:'EX-2026-51539349', relevado:'3', noreg:'2', audiencia:'No'},
            {razon:'Chuspita Martín',                sucursal:'Sabores La Plata 2',   fecha:'05/05/2026', infraccion:'Relevamiento', expediente:'EX-2026-44982487', relevado:'3', noreg:'2', audiencia:'Sí'},
            {razon:'Chuspita Martín',                sucursal:'Extremas Los Polvorines', fecha:'14/05/2026', infraccion:'Relevamiento', expediente:'—',           relevado:'—', noreg:'—', audiencia:'—'},
            {razon:'González Miguel Ángel',          sucursal:'Extremas Caballito',   fecha:'27/05/2026', infraccion:'Relevamiento', expediente:'EX-2026-52552318', relevado:'5', noreg:'2', audiencia:'No'},
            {razon:'González Miguel Ángel',          sucursal:'Extremas Caballito',   fecha:'27/05/2026', infraccion:'Obstrucción',  expediente:'—',               relevado:'—', noreg:'—', audiencia:'No'},
            {razon:'Pisaniello Ivo',                 sucursal:'Extremas Boulogne',    fecha:'14/05/2026', infraccion:'Relevamiento', expediente:'MT Provincia',    relevado:'—', noreg:'—', audiencia:'—'},
            {razon:'Pisaniello Ivo',                 sucursal:'Sabores Olivos',       fecha:'14/05/2026', infraccion:'Relevamiento', expediente:'—',               relevado:'—', noreg:'—', audiencia:'—'},
            {razon:'Pisaniello Ivo',                 sucursal:'Extremas Olivos',      fecha:'14/05/2026', infraccion:'Relevamiento', expediente:'—',               relevado:'—', noreg:'—', audiencia:'—'},
            {razon:'Ríos Bruno',                     sucursal:'Sabores Rosario 3',    fecha:'12/05/2026', infraccion:'Relevamiento', expediente:'—',               relevado:'—', noreg:'—', audiencia:'—'},
            {razon:'Ruano Rojas Greissi',            sucursal:'Extrema Avellaneda',   fecha:'15/05/2026', infraccion:'Relevamiento', expediente:'EX-2026-48734983', relevado:'3', noreg:'1', audiencia:'No'},
            {razon:'Ruano Rojas Greissi',            sucursal:'Sabores Temperley 2',  fecha:'15/05/2026', infraccion:'Relevamiento', expediente:'EX-2026-49053603', relevado:'4', noreg:'4', audiencia:'No'},
            {razon:'Ruano Rojas Greissi',            sucursal:'Extremas Virreyes',    fecha:'19/05/2026', infraccion:'Relevamiento', expediente:'—',               relevado:'—', noreg:'—', audiencia:'—'},
            {razon:'Sayago Marcio Humberto Nicolás', sucursal:'Sabores Flores',       fecha:'05/05/2026', infraccion:'Relevamiento', expediente:'EX-2026-45074757', relevado:'3', noreg:'1', audiencia:'No'},
            {razon:'Tabeira Delgado Gabriel',        sucursal:'Sabores El Jagüel',    fecha:'27/05/2026', infraccion:'Relevamiento', expediente:'EX-2026-52649670', relevado:'3', noreg:'2', audiencia:'No'},
          ],
          totalRow:{ label:'TOTAL LOCALES — 20 inspecciones · 43 relev. · 27 no reg.', value:'20' },
        },
        {
          key:'insp-fabricas-may', title:'Inspecciones — Fábricas · May 2026', iconEmoji:'🏭', accent:'amber', type:'table',
          columns:[{key:'info',label:'DETALLE'}],
          rows:[{info:'Sin inspecciones registradas en mayo 2026'}],
        },
        {
          key:'insp-staff-may', title:'Inspecciones — Staff · May 2026', iconEmoji:'🏢', accent:'purple', type:'table',
          columns:[{key:'info',label:'DETALLE'}],
          rows:[{info:'Sin inspecciones registradas en mayo 2026'}],
        },
        {
          key:'aud-locales-may', title:'Audiencias — Locales · May 2026', iconEmoji:'⚖️', accent:'blue', type:'table',
          topChips:[{label:'Audiencias',value:'18',tone:'blue'},{label:'Entregadas',value:'18 de 18',tone:'green'},{label:'Actas',value:'11',tone:'amber'}],
          columns:[
            {key:'razon',   label:'RAZÓN SOCIAL'},
            {key:'local',   label:'LOCAL'},
            {key:'fecha',   label:'FECHA'},
            {key:'motivo',  label:'MOTIVO', badge:true},
            {key:'horario', label:'HORARIO', align:'right'},
            {key:'estado',  label:'ESTADO', badge:true},
          ],
          rows:[
            {razon:'Castro Cintia',          local:'Extremas Flores 2',        fecha:'05/05/2026', motivo:'Acta de comprobación', horario:'11:00', estado:'Entregada'},
            {razon:'Castro Cintia',          local:'Extremas Caseros',         fecha:'18/05/2026', motivo:'Acta de comprobación', horario:'10:15', estado:'Entregada'},
            {razon:'Casut Matías',           local:'Extremas Pacheco',         fecha:'06/05/2026', motivo:'Acta de comprobación', horario:'09:45', estado:'Entregada'},
            {razon:'Casut Matías',           local:'Extremas Pacheco',         fecha:'11/05/2026', motivo:'Acta de comprobación', horario:'09:45', estado:'Entregada'},
            {razon:'Casut Matías',           local:'Extremas Laferrere',       fecha:'13/05/2026', motivo:'Acta de comprobación', horario:'09:00', estado:'Entregada'},
            {razon:'Chuspita Martín',        local:'Sabores MDQ 1',            fecha:'20/05/2026', motivo:'Acta de comprobación', horario:'09:15', estado:'Entregada'},
            {razon:'Chuspita Martín',        local:'Sabores MDQ 4',            fecha:'20/05/2026', motivo:'Acta de comprobación', horario:'09:00', estado:'Entregada'},
            {razon:'Comachi Valeria',        local:'Sabores Ballester 2',      fecha:'11/05/2026', motivo:'Acta de comprobación', horario:'09:15', estado:'Entregada'},
            {razon:'González Miguel',        local:'Extremas Callao',          fecha:'11/05/2026', motivo:'Acta de comprobación', horario:'09:15', estado:'Entregada'},
            {razon:'González Miguel',        local:'Extremas Munro',           fecha:'18/05/2026', motivo:'Relevamiento personal', horario:'11:15', estado:'Entregada'},
            {razon:'Greissi Ruano',          local:'Extremas JCP',             fecha:'04/05/2026', motivo:'Relevamiento personal', horario:'09:00', estado:'Entregada'},
            {razon:'Greissi Ruano',          local:'Extremas JCP',             fecha:'04/05/2026', motivo:'Relevamiento personal', horario:'09:15', estado:'Entregada'},
            {razon:'Pisaniello Ivo',         local:'Sabores El Palomar',       fecha:'12/05/2026', motivo:'Relevamiento personal', horario:'12:00', estado:'Entregada'},
            {razon:'Pisaniello Ivo',         local:'Sabores Liniers 2',        fecha:'19/05/2026', motivo:'Relevamiento personal', horario:'10:15', estado:'Entregada'},
            {razon:'Ruano Greissi',          local:'Extremas San Justo',       fecha:'26/05/2026', motivo:'Relevamiento personal', horario:'10:00', estado:'Entregada'},
            {razon:'Soria Adrián',           local:'Sabores Merlo',            fecha:'11/05/2026', motivo:'Acta de comprobación', horario:'14:00', estado:'Entregada'},
            {razon:'Victorica Ana Macarena', local:'Sabores Lomas de Zamora 3',fecha:'13/05/2026', motivo:'Relevamiento personal', horario:'09:45', estado:'Entregada'},
            {razon:'Villa Mariano',          local:'Sabores Polvorines',       fecha:'11/05/2026', motivo:'Acta de comprobación', horario:'09:30', estado:'Entregada'},
          ],
          totalRow:{ label:'TOTAL LOCALES — 18 audiencias · 11 actas · 7 relevamientos', value:'18 de 18' },
        },
        {
          key:'aud-fabricas-may', title:'Audiencias — Fábricas · May 2026', iconEmoji:'🏭', accent:'amber', type:'table',
          columns:[{key:'info',label:'DETALLE'}],
          rows:[{info:'Sin audiencias registradas en mayo 2026'}],
        },
        {
          key:'aud-staff-may', title:'Audiencias — Staff · May 2026', iconEmoji:'🏢', accent:'purple', type:'table',
          columns:[{key:'info',label:'DETALLE'}],
          rows:[{info:'Sin audiencias registradas en mayo 2026'}],
        },
        {
          key:'multas-razon-may', title:'Multas y demandas por razón social — May 2026', iconEmoji:'🔍', accent:'red', type:'table',
          topChips:[{label:'Multas',value:'$15.441.748',tone:'red'},{label:'Demandas',value:'$1.126.741',tone:'purple'},{label:'Audiencias',value:'18 de 18',tone:'green'}],
          columns:[
            {key:'razon',label:'RAZÓN SOCIAL'},
            {key:'cmultas',label:'CANT. MULTAS',align:'right'},
            {key:'mmultas',label:'MONTO MULTAS',align:'right',strong:true},
            {key:'cdem',label:'CANT. DEM.',align:'right'},
            {key:'mdem',label:'MONTO DEM.',align:'right'},
          ],
          rows:[
            {razon:'Bollos y Rellenos',             cmultas:'2', mmultas:'$8.192.070', cdem:'0', mdem:'$0'},
            {razon:'Casut Frijon Matías Ezequiel',  cmultas:'1', mmultas:'$3.000.000', cdem:'0', mdem:'$0'},
            {razon:'Sayago Leandro Miguel Agustín', cmultas:'1', mmultas:'$2.407.235', cdem:'0', mdem:'$0'},
            {razon:'Victorica Bárbara Alejandra',   cmultas:'1', mmultas:'$1.842.443', cdem:'0', mdem:'$0'},
            {razon:'La Empanadería S.A.',           cmultas:'0', mmultas:'$0',         cdem:'1', mdem:'$1.126.740,80'},
          ],
          totalRow:{ label:'TOTAL — 5 multas + 1 demanda', value:'$16.568.488,80' },
        },
        {
          key:'multas-sucursal-may', title:'Detalle por sucursal — May 2026', iconEmoji:'📍', accent:'amber', type:'table',
          columns:[
            {key:'sucursal',label:'SUCURSAL'},
            {key:'razon',label:'RAZÓN SOCIAL'},
            {key:'tipo',label:'TIPO',badge:true},
            {key:'monto',label:'MONTO',align:'right',strong:true},
          ],
          rows:[
            {sucursal:'Oficina 228 Paralelo Sur',   razon:'Bollos y Rellenos',             tipo:'Multa',   monto:'$6.164.035'},
            {sucursal:'SE - Munro',                 razon:'Casut Frijon Matías Ezequiel',  tipo:'Multa',   monto:'$3.000.000'},
            {sucursal:'SE - Cruce Castelar',        razon:'Sayago Leandro Miguel Agustín', tipo:'Multa',   monto:'$2.407.235'},
            {sucursal:'Fáb. Empanadas San Miguel',  razon:'Bollos y Rellenos',             tipo:'Multa',   monto:'$2.028.035'},
            {sucursal:'BR - Pinamar',               razon:'Victorica Bárbara Alejandra',   tipo:'Multa',   monto:'$1.842.443'},
            {sucursal:'S/ sucursal (Poder Judicial)', razon:'La Empanadería S.A.',         tipo:'Demanda', monto:'$1.126.740,80'},
          ],
          totalRow:{ label:'TOTAL GENERAL', value:'$16.568.488,80' },
        },
      ],
    },
  },

  // ════════════════════════════════════
  // HORAS EXTRAS
  // ════════════════════════════════════
  horasextras: {
    ene: {
      kpis: [
        { label:'Horas extras — mes activo', value:'6.325',  delta:{ dir:'up',      text:'Mayor volumen del período' } },
        { label:'Costo del mes',              value:'$67.3M', delta:{ dir:'up',      text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–May 2026 · total de horas', data: hsTendencia },
        { type:'donut',title:'Distribución por unidad',   sub:'% de horas extras · Ene 2026',
          data:[{label:'Logística',value:53.8},{label:'Extremas',value:12.6},{label:'San Martín',value:12.7},{label:'San Miguel',value:5.7},{label:'Otros',value:15.2}] },
      ],
      details: [{
        key:'he-ene', title:'Detalle horas extras por unidad — Ene 2026', iconEmoji:'⏱️', accent:'amber', type:'table',
        columns:[{key:'sector',label:'SECTOR'},{key:'horas',label:'HORAS',align:'right'},{key:'costo',label:'COSTO',align:'right',strong:true}],
        rows:[
          {sector:'LOGÍSTICA',  horas:'3.399', costo:'$37.992.978'},{sector:'SAN MARTÍN', horas:'805',   costo:'$7.559.194'},
          {sector:'EXTREMAS',   horas:'796',   costo:'$8.607.819'},{sector:'SAN MIGUEL', horas:'359',   costo:'$3.124.334'},
          {sector:'JYQ',        horas:'196',   costo:'$2.198.111'},{sector:'TAPAS 1',    horas:'193',   costo:'$2.165.960'},
          {sector:'PANIFICADO', horas:'144',   costo:'$1.222.372'},{sector:'CONGELADOS', horas:'134',   costo:'$1.407.939'},
          {sector:'TAPAS 2',    horas:'126',   costo:'$1.244.821'},{sector:'PIZZAS',     horas:'107',   costo:'$980.621'},
          {sector:'PAPELERA',   horas:'40',    costo:'$430.047'}, {sector:'MANTEN.',    horas:'21',    costo:'$285.248'},
          {sector:'MEDIALUNAS', horas:'5',     costo:'$42.568'},
        ],
        totalRow:{ label:'TOTAL ENE', value:'$67.262.020' },
      }],
    },
    feb: {
      kpis: [
        { label:'Horas extras — mes activo', value:'4.479',  delta:{ dir:'down',    text:'−29.2% vs. mes anterior' } },
        { label:'Costo del mes',              value:'$49.4M', delta:{ dir:'down',    text:'−26.6% vs. mes anterior' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–May 2026 · total de horas', data: hsTendencia },
        { type:'donut',title:'Distribución por unidad',   sub:'% de horas extras · Feb 2026',
          data:[{label:'Logística',value:69.5},{label:'Extremas',value:13.6},{label:'JYQ',value:7.0},{label:'Otros',value:9.9}] },
      ],
      details: [{
        key:'he-feb', title:'Detalle horas extras por unidad — Feb 2026', iconEmoji:'⏱️', accent:'amber', type:'table',
        columns:[{key:'sector',label:'SECTOR'},{key:'horas',label:'HORAS',align:'right'},{key:'costo',label:'COSTO',align:'right',strong:true}],
        rows:[
          {sector:'LOGÍSTICA',   horas:'3.115', costo:'$34.652.682'},{sector:'EXTREMAS',   horas:'611',   costo:'$6.798.946'},
          {sector:'JYQ',         horas:'314',   costo:'$3.317.327'},{sector:'PROCESADORA', horas:'139',   costo:'$1.197.486'},
          {sector:'SAN MARTÍN',  horas:'117',   costo:'$1.221.959'},{sector:'TAPAS 1',     horas:'104',   costo:'$1.293.321'},
          {sector:'PIZZAS',      horas:'36',    costo:'$366.765'}, {sector:'PAPELERA',    horas:'30',    costo:'$326.017'},
          {sector:'TAPAS 2',     horas:'11',    costo:'$175.334'}, {sector:'MALVINAS',    horas:'2',     costo:'$17.523'},
        ],
        totalRow:{ label:'TOTAL FEB', value:'$49.367.364' },
      }],
    },
    mar: {
      kpis: [
        { label:'Horas extras — mes activo', value:'3.779',  delta:{ dir:'down',    text:'−15.6% vs. mes anterior' } },
        { label:'Costo del mes',              value:'$38.8M', delta:{ dir:'down',    text:'−21.4% vs. mes anterior' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–May 2026 · total de horas', data: hsTendencia },
        { type:'donut',title:'Distribución por unidad',   sub:'% de horas extras · Mar 2026',
          data:[{label:'Logística',value:61.0},{label:'Extremas',value:10.0},{label:'Medialunas',value:6.8},{label:'JYQ',value:6.2},{label:'Otros',value:16.0}] },
      ],
      details: [{
        key:'he-mar', title:'Detalle horas extras por unidad — Mar 2026', iconEmoji:'⏱️', accent:'amber', type:'table',
        columns:[{key:'sector',label:'SECTOR'},{key:'horas',label:'HORAS',align:'right'},{key:'costo',label:'COSTO',align:'right',strong:true}],
        rows:[
          {sector:'LOGÍSTICA',   horas:'2.304', costo:'$24.373.594'},{sector:'EXTREMAS',   horas:'379',   costo:'$4.070.332'},
          {sector:'MEDIALUNAS',  horas:'257',   costo:'$2.462.198'},{sector:'JYQ',         horas:'235',   costo:'$2.241.989'},
          {sector:'PROCESADORA', horas:'222',   costo:'$1.857.668'},{sector:'SAN MIGUEL',  horas:'171',   costo:'$1.540.299'},
          {sector:'TAPAS 1',     horas:'114',   costo:'$1.254.002'},{sector:'TAPAS 2',     horas:'44',    costo:'$451.614'},
          {sector:'SAN MARTÍN',  horas:'36',    costo:'$318.048'}, {sector:'PAPELERA',    horas:'10',    costo:'$123.957'},
          {sector:'PANIFICADO',  horas:'7',     costo:'$61.331'},
        ],
        totalRow:{ label:'TOTAL MAR', value:'$38.755.037' },
      }],
    },
    abr: {
      kpis: [
        { label:'Horas extras — mes activo', value:'4.169',  delta:{ dir:'up',      text:'+10.3% vs. mes anterior' } },
        { label:'Costo del mes',              value:'$49.2M', delta:{ dir:'up',      text:'+26.9% vs. mes anterior' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–May 2026 · total de horas', data: hsTendencia },
        { type:'donut',title:'Distribución por unidad',   sub:'% de horas extras · Abr 2026',
          data:[{label:'Logística',value:56.7},{label:'JYQ',value:13.3},{label:'Extremas',value:10.0},{label:'Medialunas',value:9.5},{label:'Otros',value:10.5}] },
      ],
      details: [{
        key:'he-abr', title:'Detalle horas extras por unidad — Abr 2026', iconEmoji:'⏱️', accent:'amber', type:'table',
        columns:[{key:'sector',label:'SECTOR'},{key:'horas',label:'HORAS',align:'right'},{key:'costo',label:'COSTO',align:'right',strong:true}],
        rows:[
          {sector:'LOGÍSTICA',   horas:'2.364', costo:'$28.732.277'},{sector:'JYQ',         horas:'555',   costo:'$6.230.273'},
          {sector:'EXTREMAS',    horas:'415',   costo:'$5.044.575'},{sector:'MEDIALUNAS',  horas:'395',   costo:'$4.696.939'},
          {sector:'SAN MIGUEL',  horas:'327',   costo:'$3.376.571'},{sector:'PROCESADORA', horas:'60',    costo:'$551.665'},
          {sector:'PANIFICADO',  horas:'53',    costo:'$546.715'},
        ],
        totalRow:{ label:'TOTAL ABR', value:'$49.179.019' },
      }],
    },
    may: {
      kpis: [
        { label:'Horas extras — mes activo', value:'3.922',  delta:{ dir:'down',    text:'−5.9% vs. mes anterior' } },
        { label:'Costo del mes',              value:'$43.9M', delta:{ dir:'down',    text:'−10.8% vs. mes anterior' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–May 2026 · total de horas', data: hsTendencia },
        { type:'donut',title:'Distribución por unidad',   sub:'% de horas extras · May 2026 (período 20/4 al 19/5)',
          data:[{label:'Logística',value:49.5},{label:'Panificadora',value:30.4},{label:'JYQ',value:14.2},{label:'San Martín',value:3.3},{label:'Extremas',value:2.6}] },
      ],
      details: [{
        key:'he-may', title:'Detalle horas extras por unidad — May 2026 (pagadas 20/4 al 19/5)', iconEmoji:'⏱️', accent:'amber', type:'table',
        columns:[{key:'sector',label:'SECTOR'},{key:'horas',label:'HORAS',align:'right'},{key:'costo',label:'COSTO',align:'right',strong:true}],
        rows:[
          {sector:'LOGÍSTICA',    horas:'1.941', costo:'$22.898.240'},{sector:'PANIFICADORA', horas:'1.191', costo:'$12.013.509'},
          {sector:'JYQ',          horas:'556',   costo:'$6.391.073'}, {sector:'SAN MARTÍN',   horas:'131',   costo:'$1.349.200'},
          {sector:'EXTREMAS',     horas:'101',   costo:'$1.209.626'}, {sector:'PAPELERA',     horas:'2',     costo:'$27.023'},
        ],
        totalRow:{ label:'TOTAL MAY', value:'$43.888.671' },
      }],
    },
  },

  // ════════════════════════════════════
  // ACCIDENTABILIDAD
  // ════════════════════════════════════
  accidentabilidad: {
    ene: {
      kpis: [
        { label:'Siniestralidad locales / staff', value:'2,69',  delta:{ dir:'neutral', text:'Índice de siniestralidad' } },
        { label:'Siniestralidad fábricas',        value:'12,29', delta:{ dir:'neutral', text:'Índice de siniestralidad' } },
        { label:'Siniestros del mes', value:'34',   delta:{ dir:'neutral', text:'926 días caídos' } },
        { label:'Días caídos',        value:'926',  delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'bar',   title:'Siniestros por mes',            sub:'Cantidad · Ene–May 2026', data: sinTendencia },
        { type:'bar',   title:'Días caídos por mes',           sub:'Cantidad · Ene–May 2026', data: diasTendencia },
        { type:'donut', title:'Tipo de siniestro — histórico', sub:'% acumulado Ene–May 2026', center:'130', data:[
          {label:'Laboral',    value:81},
          {label:'In Itinere', value:19},
        ]},
      ],
    },
    feb: {
      kpis: [
        { label:'Siniestralidad locales / staff', value:'2,69',  delta:{ dir:'neutral', text:'Índice de siniestralidad' } },
        { label:'Siniestralidad fábricas',        value:'12,29', delta:{ dir:'neutral', text:'Índice de siniestralidad' } },
        { label:'Siniestros del mes', value:'24',   delta:{ dir:'down',    text:'−10 vs. mes ant.' } },
        { label:'Días caídos',        value:'396',  delta:{ dir:'up',      text:'−530 vs. mes ant.' } },
      ],
      charts: [
        { type:'bar',   title:'Siniestros por mes',            sub:'Cantidad · Ene–May 2026', data: sinTendencia },
        { type:'bar',   title:'Días caídos por mes',           sub:'Cantidad · Ene–May 2026', data: diasTendencia },
        { type:'donut', title:'Tipo de siniestro — histórico', sub:'% acumulado Ene–May 2026', center:'130', data:[
          {label:'Laboral',    value:81},
          {label:'In Itinere', value:19},
        ]},
      ],
    },
    mar: {
      kpis: [
        { label:'Siniestralidad locales / staff', value:'2,69',  delta:{ dir:'neutral', text:'Índice de siniestralidad' } },
        { label:'Siniestralidad fábricas',        value:'12,29', delta:{ dir:'neutral', text:'Índice de siniestralidad' } },
        { label:'Siniestros del mes', value:'24',   delta:{ dir:'neutral', text:'Igual que mes ant.' } },
        { label:'Días caídos',        value:'846',  delta:{ dir:'down',    text:'+450 vs. mes ant.' } },
      ],
      charts: [
        { type:'bar',   title:'Siniestros por mes',            sub:'Cantidad · Ene–May 2026', data: sinTendencia },
        { type:'bar',   title:'Días caídos por mes',           sub:'Cantidad · Ene–May 2026', data: diasTendencia },
        { type:'donut', title:'Tipo de siniestro — histórico', sub:'% acumulado Ene–May 2026', center:'130', data:[
          {label:'Laboral',    value:81},
          {label:'In Itinere', value:19},
        ]},
      ],
    },
    abr: {
      kpis: [
        { label:'Siniestralidad locales / staff', value:'2,69',  delta:{ dir:'neutral', text:'Índice de siniestralidad' } },
        { label:'Siniestralidad fábricas',        value:'12,29', delta:{ dir:'neutral', text:'Índice de siniestralidad' } },
        { label:'Siniestros del mes', value:'28',   delta:{ dir:'down',    text:'+4 vs. mes ant.' } },
        { label:'Días caídos',        value:'607',  delta:{ dir:'up',      text:'−239 vs. mes ant.' } },
      ],
      charts: [
        { type:'bar',   title:'Siniestros por mes',            sub:'Cantidad · Ene–May 2026', data: sinTendencia },
        { type:'bar',   title:'Días caídos por mes',           sub:'Cantidad · Ene–May 2026', data: diasTendencia },
        { type:'donut', title:'Tipo de siniestro — histórico', sub:'% acumulado Ene–May 2026', center:'130', data:[
          {label:'Laboral',    value:81},
          {label:'In Itinere', value:19},
        ]},
      ],
    },
    may: {
      kpis: [
        { label:'Siniestralidad locales / staff', value:'2,69',  delta:{ dir:'neutral', text:'May 2026 · locales + staff' } },
        { label:'Siniestralidad fábricas',        value:'12,29', delta:{ dir:'neutral', text:'May 2026 · plantas productivas' } },
        { label:'Siniestros del mes', value:'20',    delta:{ dir:'up',      text:'−8 vs. mes anterior' } },
        { label:'Días caídos',        value:'246',   delta:{ dir:'up',      text:'−361 vs. mes anterior' } },
      ],
      charts: [
        { type:'bar',   title:'Siniestros por mes',                sub:'Cantidad · Ene–May 2026',                     data: sinTendencia },
        { type:'bar',   title:'Días caídos por mes',               sub:'Cantidad · Ene–May 2026',                     data: diasTendencia },
        { type:'bar',   title:'Siniestros por unidad — May 2026',  sub:'Cantidad de siniestros por unidad operativa', data:[
          {x:'Fábrica',  y:11},
          {x:'Extremas', y:5},
          {x:'Staff',    y:2},
          {x:'Sabores',  y:2},
        ]},
        { type:'donut', title:'Siniestros por sector — May 2026',  sub:'% del total · 20 siniestros', center:'20',    data:[
          {label:'Fábrica',  value:55},
          {label:'Locales',  value:35},
          {label:'Staff',    value:10},
        ]},
        { type:'bar',   title:'Días caídos por sector — May 2026', sub:'Días · por unidad',                           data:[
          {x:'Fábrica', y:120},
          {x:'Locales', y:101},
          {x:'Staff',   y:25},
        ]},
        { type:'donut', title:'Tipo de siniestro — May 2026',      sub:'% del total · 20 siniestros', center:'20',    data:[
          {label:'Laboral',    value:75},
          {label:'In Itinere', value:25},
        ]},
        { type:'donut', title:'Tipo de lesión — May 2026',         sub:'% del total · 20 siniestros', center:'20',    data:[
          {label:'Traumatismo', value:70},
          {label:'Corte',       value:20},
          {label:'Herida',      value:5},
          {label:'Amputación',  value:5},
        ]},
      ],
      details: [{
        key:'detalle-sin-may', title:'Detalle de siniestros — Mayo 2026', iconEmoji:'🦺', accent:'red', type:'table',
        topChips:[
          {label:'Fábrica',    value:'11 sin. · 120 días', tone:'red'},
          {label:'Locales',    value:'7 sin. · 101 días',  tone:'purple'},
          {label:'Staff',      value:'2 sin. · 25 días',   tone:'blue'},
        ],
        columns:[
          {key:'nombre',  label:'APELLIDO Y NOMBRE'},
          {key:'fecha',   label:'FECHA'},
          {key:'estado',  label:'ESTADO',      badge:true},
          {key:'sector',  label:'SECTOR',      badge:true},
          {key:'lesion',  label:'LESIÓN'},
          {key:'tipo',    label:'TIPO'},
          {key:'dias',    label:'DÍAS CAÍDOS', align:'right', strong:true},
        ],
        rows:[
          {nombre:'VERNA ALBORNOZ GIANLUCA LAUTARO', fecha:'04/05/2026', estado:'Fin Trat.',  sector:'FÁBRICA', lesion:'Traumatismo', tipo:'Laboral',    dias:'14'},
          {nombre:'SANDOVAL MARCOS ALEJANDRO',       fecha:'04/05/2026', estado:'Fin Trat.',  sector:'LOCALES', lesion:'Traumatismo', tipo:'In Itinere', dias:'1'},
          {nombre:'JADE ARIANA RAMIREZ HUAMAN',      fecha:'05/05/2026', estado:'En Tratam.', sector:'LOCALES', lesion:'Traumatismo', tipo:'Laboral',    dias:'26'},
          {nombre:'LEDESMA DEMIAN NAHUEL YAIR',      fecha:'05/05/2026', estado:'Fin Trat.',  sector:'LOCALES', lesion:'Traumatismo', tipo:'Laboral',    dias:'26'},
          {nombre:'LUNA SERGIO',                     fecha:'05/05/2026', estado:'Fin Trat.',  sector:'FÁBRICA', lesion:'Herida',      tipo:'Laboral',    dias:'1'},
          {nombre:'SANTANDER MAXIMILIANO',           fecha:'05/05/2026', estado:'En Tratam.', sector:'FÁBRICA', lesion:'Traumatismo', tipo:'Laboral',    dias:'26'},
          {nombre:'LUZ MAITENA GOMEZ',               fecha:'08/05/2026', estado:'En Tratam.', sector:'LOCALES', lesion:'Traumatismo', tipo:'Laboral',    dias:'23'},
          {nombre:'TORRES GUSTAVO ARIEL',            fecha:'08/05/2026', estado:'En Tratam.', sector:'FÁBRICA', lesion:'Corte',       tipo:'Laboral',    dias:'23'},
          {nombre:'CHIVEL WALTER',                   fecha:'15/05/2026', estado:'En Tratam.', sector:'FÁBRICA', lesion:'Amputación',  tipo:'Laboral',    dias:'16'},
          {nombre:'JUAREZ JOAQUIN',                  fecha:'16/05/2026', estado:'Fin Trat.',  sector:'LOCALES', lesion:'Corte',       tipo:'Laboral',    dias:'15'},
          {nombre:'PAEZ VALDEZ GONZALO FERNANDO',    fecha:'17/05/2026', estado:'Fin Trat.',  sector:'FÁBRICA', lesion:'Corte',       tipo:'Laboral',    dias:'2'},
          {nombre:'CACERES DAIANA BELEN',            fecha:'19/05/2026', estado:'Fin Trat.',  sector:'FÁBRICA', lesion:'Traumatismo', tipo:'In Itinere', dias:'3'},
          {nombre:'GONZALEZ SANTIAGO',               fecha:'18/05/2026', estado:'En Tratam.', sector:'FÁBRICA', lesion:'Corte',       tipo:'Laboral',    dias:'13'},
          {nombre:'OJEDA GONZALO DAMIAN',            fecha:'19/05/2026', estado:'Fin Trat.',  sector:'STAFF',   lesion:'Traumatismo', tipo:'Laboral',    dias:'12'},
          {nombre:'MUÑOZ DAIANA JEANETTE',           fecha:'25/05/2026', estado:'Fin Trat.',  sector:'LOCALES', lesion:'Traumatismo', tipo:'In Itinere', dias:'2'},
          {nombre:'ALVARENGA JULIO',                 fecha:'22/05/2026', estado:'En Tratam.', sector:'FÁBRICA', lesion:'Traumatismo', tipo:'In Itinere', dias:'9'},
          {nombre:'LAZARTE NICOLAS',                 fecha:'25/05/2026', estado:'En Tratam.', sector:'FÁBRICA', lesion:'Traumatismo', tipo:'Laboral',    dias:'6'},
          {nombre:'FLORES MIÑO JOHANNA',             fecha:'23/05/2026', estado:'Fin Trat.',  sector:'LOCALES', lesion:'Traumatismo', tipo:'Laboral',    dias:'8'},
          {nombre:'VEGA THOMAS',                     fecha:'24/05/2026', estado:'Fin Trat.',  sector:'FÁBRICA', lesion:'Traumatismo', tipo:'Laboral',    dias:'7'},
          {nombre:'ROJAS NOELIA',                    fecha:'26/05/2026', estado:'Fin Trat.',  sector:'STAFF',   lesion:'Traumatismo', tipo:'In Itinere', dias:'13'},
        ],
        totalRow:{ label:'TOTAL — 20 siniestros', value:'246 días caídos' },
      }],
    },
  },

};
