// data.js — SOLO datos reales del xlsx datos_dash_cesar.xlsx + indicadores mayo 2026
// S/D = sin dato en la fuente.
// Dotación: solo existe dato de May 2026 (Empleados Fin del Período) → Ene–Abr S/D.
// Rotación: existe solo en hojas de ausentismo (por mes) y no hay desglose
//   por zona/sector/gerencia → esos gráficos usan S/D o se omiten con nota.

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

// ─── TENDENCIAS AUSENTISMO (datos reales del xlsx) ───
const ausEmpresaTend  = [{x:'Ene',y:4.26},{x:'Feb',y:4.33},{x:'Mar',y:6.82},{x:'Abr',y:5.99},{x:'May',y:5.37}];
const ausSaboresTond  = [{x:'Ene',y:4.74},{x:'Feb',y:4.16},{x:'Mar',y:5.17},{x:'Abr',y:3.56},{x:'May',y:3.99}];
const ausExtremasTend = [{x:'Ene',y:1.40},{x:'Feb',y:1.29},{x:'Mar',y:7.17},{x:'Abr',y:4.38},{x:'May',y:4.13}];
const ausStaffTend    = [{x:'Ene',y:null},{x:'Feb',y:6.56},{x:'Mar',y:5.74},{x:'Abr',y:9.28},{x:'May',y:5.28}];
const ausFabricaTend  = [{x:'Ene',y:8.60},{x:'Feb',y:6.67},{x:'Mar',y:9.21},{x:'Abr',y:11.43},{x:'May',y:9.61}];

// ─── TENDENCIAS ROTACIÓN (datos reales del xlsx) ───
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

// ─── HORAS EXTRAS TENDENCIA ───
const hsTendencia    = [{x:'Ene',y:6325},{x:'Feb',y:4479},{x:'Mar',y:3779},{x:'Abr',y:4169},{x:'May',y:3922}];
const costoTendencia = [{x:'Ene',y:67.3},{x:'Feb',y:49.4},{x:'Mar',y:38.8},{x:'Abr',y:49.2},{x:'May',y:43.9}];

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
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotFabricaTend },
      ],
    },
  },
  // ════════════════════════════════════
  // JUDICIALES — KPIs: acuerdos mes + año ant + variación + pago mes + pendientes
  // Total acuerdo mes activo (Ene–Abr): suma SOLO ACTOR del Excel de cuotas (sin honorarios).
  // Total acuerdo May: $186.0M con honorarios (fuente informe judicial).
  // Total pago: cuotas con vto. en el mes. Pendientes: cuotas futuras de acuerdos del mes.
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
        { label:'Inspecciones MT',           value:'20',   delta:{ dir:'down',    text:'+3 vs. mes anterior' } },
        { label:'Documentación entregada MT', value:'100%', delta:{ dir:'up',      text:'Entregada al MT · May 2026' } },
        { label:'Audiencias',                 value:'18',   delta:{ dir:'neutral', text:'+11 vs. mes anterior' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo', data:[{x:'Sabores',y:16},{x:'Extremas',y:1},{x:'Fábrica',y:3},{x:'Staff',y:0}] },
        { type:'donut',title:'Composición de actividad', sub:'Inspecciones + audiencias · May 2026', center:'38', data:[{label:'Inspecciones',value:20},{label:'Audiencias',value:18}] },
      ],
      details: [{
        key:'multas-may', title:'Multas — May 2026', iconEmoji:'🔍', accent:'red', type:'table',
        columns:[{key:'razon',label:'RAZÓN SOCIAL'},{key:'cant',label:'MULTAS',align:'right'},{key:'monto',label:'MONTO',align:'right',strong:true}],
        rows:[
          {razon:'BOLLOS Y RELLENOS',             cant:'2', monto:'S/D'},
          {razon:'CASUT FRIJON MATIAS EZEQUIEL',  cant:'1', monto:'S/D'},
          {razon:'SAYAGO LEANDRO M.A.',           cant:'1', monto:'S/D'},
          {razon:'VICTORICA BARBARA ALEJANDRA',   cant:'1', monto:'S/D'},
        ],
        totalRow:{ label:'TOTAL (5 multas)', value:'$15.441.748' },
      }],
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
        { label:'Tasa — mes activo',  value:'S/D',  delta:{ dir:'neutral', text:'Sin dato Ene 2026' } },
        { label:'Siniestros del mes', value:'34',   delta:{ dir:'neutral', text:'926 días caídos' } },
        { label:'Días caídos',        value:'926',  delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34}] },
        { type:'donut',title:'Tipo de siniestro — histórico', sub:'% del total', data:[{label:'Laboral',value:81.0},{label:'In Itinere',value:18.5},{label:'Otro',value:0.5}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Tasa — mes activo',  value:'S/D',  delta:{ dir:'neutral', text:'Sin dato Feb 2026' } },
        { label:'Siniestros del mes', value:'24',   delta:{ dir:'down',    text:'396 días caídos' } },
        { label:'Días caídos',        value:'396',  delta:{ dir:'down',    text:'−530 vs. mes ant.' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24}] },
        { type:'donut',title:'Tipo de siniestro — histórico', sub:'% del total', data:[{label:'Laboral',value:81.0},{label:'In Itinere',value:18.5},{label:'Otro',value:0.5}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Tasa — mes activo',  value:'S/D',  delta:{ dir:'neutral', text:'Sin dato Mar 2026' } },
        { label:'Siniestros del mes', value:'24',   delta:{ dir:'neutral', text:'846 días caídos' } },
        { label:'Días caídos',        value:'846',  delta:{ dir:'up',      text:'+450 vs. mes ant.' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24}] },
        { type:'donut',title:'Tipo de siniestro — histórico', sub:'% del total', data:[{label:'Laboral',value:81.0},{label:'In Itinere',value:18.5},{label:'Otro',value:0.5}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Tasa — mes activo',  value:'S/D',  delta:{ dir:'neutral', text:'Sin dato Abr 2026' } },
        { label:'Siniestros del mes', value:'28',   delta:{ dir:'up',      text:'607 días caídos' } },
        { label:'Días caídos',        value:'607',  delta:{ dir:'down',    text:'−239 vs. mes ant.' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28}] },
        { type:'donut',title:'Tipo de siniestro — histórico', sub:'% del total', data:[{label:'Laboral',value:81.0},{label:'In Itinere',value:18.5},{label:'Otro',value:0.5}] },
      ],
    },
    may: {
      kpis: [
        { label:'Tasa — mes activo',  value:'4.72%', delta:{ dir:'neutral', text:'May 2026 · sin tasa Abr para comparar' } },
        { label:'Siniestros del mes', value:'20',    delta:{ dir:'down',    text:'−8 vs. mes anterior' } },
        { label:'Días caídos',        value:'241',   delta:{ dir:'down',    text:'−366 vs. mes anterior' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:20}] },
        { type:'donut',title:'Tipo de siniestro — histórico', sub:'% del total', data:[{label:'Laboral',value:81.0},{label:'In Itinere',value:18.5},{label:'Otro',value:0.5}] },
      ],
    },
  },

};
