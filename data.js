// data.js — SOLO datos reales del xlsx datos_dash_cesar.xlsx
// S/D = sin dato en la fuente. Dotación no existe en el xlsx → S/D en todos los meses/sectores.
// Rotación: existe solo en hojas de ausentismo (por mes) y en el xlsx de Cesar no hay desglose
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
  { id:'empresa',         group:'UNIDADES', name:'Empresa Total',    sub:'Visión consolidada · todas las razones sociales', accent:'blue',   iconKey:'building',  logo:'assets/empresa total.png',       headerSub:'Consolidado de todas las unidades operativas',       tags:['Ausentismo 5.37%','May 2026'] },
  { id:'sabores',         group:'UNIDADES', name:'Sabores Express',  sub:'Cadena de locales gastronómicos',                 accent:'blue',   iconKey:'utensils',  logo:'assets/sabores.png',             headerSub:'Cadena de locales gastronómicos · May 2026',         tags:['Ausentismo 3.99%','Rotación 8.50%'] },
  { id:'extremas',        group:'UNIDADES', name:'Extremas',         sub:'Operación logística y distribución',             accent:'cyan',   iconKey:'truck',     logo:'assets/extremas.png',            headerSub:'Operación logística y distribución · May 2026',      tags:['Ausentismo 4.13%','Rotación 12.15%'] },
  { id:'staff',           group:'UNIDADES', name:'Staff',            sub:'Áreas corporativas y administración',            accent:'purple', iconKey:'briefcase', logo:'assets/Staff.png',               headerSub:'Áreas corporativas y administración · May 2026',     tags:['Ausentismo 5.28%','Rotación 5.66%'] },
  { id:'fabrica',         group:'UNIDADES', name:'Fábrica',          sub:'Plantas productivas',                            accent:'amber',  iconKey:'factory',   logo:'assets/fabrica.png',             headerSub:'Plantas productivas · May 2026',                     tags:['Ausentismo 9.61%','Rotación 7.51%'] },
  { id:'judiciales',      group:'GESTIÓN',  name:'Inf. Judiciales',  sub:'Acuerdos y resoluciones por razón social',       accent:'purple', iconKey:'gavel',     logo:'assets/informes judiciales.png', headerSub:'Acuerdos y resoluciones · Mayo 2026',                tags:['39 acuerdos','$389.8M'] },
  { id:'inspecciones',    group:'GESTIÓN',  name:'Inspecciones',     sub:'Visitas, observaciones y cumplimiento',          accent:'green',  iconKey:'search',    logo:'assets/inspecciones.png',        headerSub:'Visitas regulatorias y de cumplimiento · Mayo 2026', tags:['20 inspecciones','5 multas'] },
  { id:'horasextras',     group:'GESTIÓN',  name:'Horas Extras',     sub:'Horas, costo y distribución por unidad',         accent:'amber',  iconKey:'clock',     logo:'assets/horas extras.png',        headerSub:'Horas extras, costo y distribución · Abr 2026',      tags:['4.169 hs','$49.2M'] },
  { id:'accidentabilidad',group:'GESTIÓN',  name:'Accidentabilidad', sub:'Tasa, días caídos y reporte de siniestros',      accent:'red',    iconKey:'alert',     logo:'assets/accidentabilidad.png',    headerSub:'Tasa, días caídos y reporte de siniestros',          tags:['477 siniestros hist.','13.160 días caídos'] },
];

// ─── TENDENCIAS AUSENTISMO (datos reales del xlsx) ───
const ausEmpresaTend  = [{x:'Ene',y:4.26},{x:'Feb',y:4.33},{x:'Mar',y:6.82},{x:'Abr',y:5.99},{x:'May',y:5.37}];
const ausSaboresTond  = [{x:'Ene',y:4.74},{x:'Feb',y:4.16},{x:'Mar',y:5.17},{x:'Abr',y:3.56},{x:'May',y:3.99}];
const ausExtremasTend = [{x:'Ene',y:1.40},{x:'Feb',y:1.29},{x:'Mar',y:7.17},{x:'Abr',y:4.38},{x:'May',y:4.13}];
const ausStaffTend    = [{x:'Ene',y:null},{x:'Feb',y:6.56},{x:'Mar',y:5.74},{x:'Abr',y:9.28},{x:'May',y:5.28}];
const ausFabricaTend  = [{x:'Ene',y:8.60},{x:'Feb',y:6.67},{x:'Mar',y:9.21},{x:'Abr',y:11.43},{x:'May',y:9.61}];

// ─── TENDENCIAS ROTACIÓN (datos reales del xlsx) ───
const rotEmpresaTend  = [{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}]; // no existe consolidado empresa
const rotSaboresTend  = [{x:'Ene',y:13.90},{x:'Feb',y:13.05},{x:'Mar',y:18.81},{x:'Abr',y:14.52},{x:'May',y:8.50}];
const rotExtremasTend = [{x:'Ene',y:17.80},{x:'Feb',y:11.48},{x:'Mar',y:12.16},{x:'Abr',y:13.58},{x:'May',y:12.15}];
const rotStaffTend    = [{x:'Ene',y:5.20},{x:'Feb',y:2.63},{x:'Mar',y:4.54},{x:'Abr',y:4.64},{x:'May',y:5.66}];
const rotFabricaTend  = [{x:'Ene',y:11.60},{x:'Feb',y:7.82},{x:'Mar',y:7.46},{x:'Abr',y:6.54},{x:'May',y:7.51}];

// ─── HORAS EXTRAS TENDENCIA ───
const hsTendencia    = [{x:'Ene',y:6325},{x:'Feb',y:4479},{x:'Mar',y:3779},{x:'Abr',y:4169}];
const costoTendencia = [{x:'Ene',y:67.3},{x:'Feb',y:49.4},{x:'Mar',y:38.8},{x:'Abr',y:49.2}];

// ══════════════════════════════════════════════════════
window.SECTOR_DATA = {

  // ════════════════════════════════════
  // EMPRESA TOTAL
  // Ausentismo real: xlsx hoja ausentismo por mes
  // Rotación: no hay dato consolidado empresa → S/D
  // Dotación: no existe en xlsx → S/D
  // ════════════════════════════════════
  empresa: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Ene 2026' } },
        { label:'Ausentismo', value:'4.26%', delta:{ dir:'neutral', text:'Base 93.981 días · Ene 2026' } },
        { label:'Rotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato consolidado Ene' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausEmpresaTend },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotEmpresaTend },
        { type:'bar',  title:'Rotación por unidad', sub:'% mes activo', data:[{x:'Sabores',y:13.90},{x:'Extremas',y:17.80},{x:'Staff',y:5.20},{x:'Fábrica',y:11.60}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Feb 2026' } },
        { label:'Ausentismo', value:'4.33%', delta:{ dir:'up',      text:'+0.07 pp vs. mes ant.' } },
        { label:'Rotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato consolidado Feb' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausEmpresaTend },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotEmpresaTend },
        { type:'bar',  title:'Rotación por unidad', sub:'% mes activo', data:[{x:'Sabores',y:13.05},{x:'Extremas',y:11.48},{x:'Staff',y:2.63},{x:'Fábrica',y:7.82}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Mar 2026' } },
        { label:'Ausentismo', value:'6.82%', delta:{ dir:'up',      text:'+2.49 pp vs. mes ant.' } },
        { label:'Rotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato consolidado Mar' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausEmpresaTend },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotEmpresaTend },
        { type:'bar',  title:'Rotación por unidad', sub:'% mes activo', data:[{x:'Sabores',y:18.81},{x:'Extremas',y:12.16},{x:'Staff',y:4.54},{x:'Fábrica',y:7.46}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Abr 2026' } },
        { label:'Ausentismo', value:'5.99%', delta:{ dir:'down',    text:'−0.83 pp vs. mes ant.' } },
        { label:'Rotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato consolidado Abr' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausEmpresaTend },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotEmpresaTend },
        { type:'bar',  title:'Rotación por unidad', sub:'% mes activo', data:[{x:'Sabores',y:14.52},{x:'Extremas',y:13.58},{x:'Staff',y:4.64},{x:'Fábrica',y:6.54}] },
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato May 2026' } },
        { label:'Ausentismo', value:'5.37%', delta:{ dir:'down',    text:'−0.62 pp vs. mes ant.' } },
        { label:'Rotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato consolidado May' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausEmpresaTend },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotEmpresaTend },
        { type:'bar',  title:'Rotación por unidad', sub:'% mes activo', data:[{x:'Sabores',y:8.50},{x:'Extremas',y:12.15},{x:'Staff',y:5.66},{x:'Fábrica',y:7.51}] },
      ],
    },
  },

  // ════════════════════════════════════
  // SABORES EXPRESS
  // Ausentismo: hoja ausentismo por mes (sabores locales)
  // Rotación: hoja ausentismo por mes (SABORES %)
  // Dotación: no existe → S/D
  // Rotación por zona: no existe en xlsx → S/D
  // ════════════════════════════════════
  sabores: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Ene 2026' } },
        { label:'Ausentismo', value:'4.74%', delta:{ dir:'neutral', text:'Base 36.478 días · Ene 2026' } },
        { label:'Rotación',   value:'13.9%', delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausSaboresTond },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotSaboresTend },
        { type:'bar',  title:'Rotación por zona',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Feb 2026' } },
        { label:'Ausentismo', value:'4.16%', delta:{ dir:'down',    text:'−0.58 pp vs. mes ant.' } },
        { label:'Rotación',   value:'13.05%',delta:{ dir:'down',    text:'−0.85 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausSaboresTond },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotSaboresTend },
        { type:'bar',  title:'Rotación por zona',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Mar 2026' } },
        { label:'Ausentismo', value:'5.17%', delta:{ dir:'up',      text:'+1.01 pp vs. mes ant.' } },
        { label:'Rotación',   value:'18.81%',delta:{ dir:'up',      text:'+5.76 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausSaboresTond },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotSaboresTend },
        { type:'bar',  title:'Rotación por zona',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Abr 2026' } },
        { label:'Ausentismo', value:'3.56%', delta:{ dir:'down',    text:'−1.61 pp vs. mes ant.' } },
        { label:'Rotación',   value:'14.52%',delta:{ dir:'down',    text:'−4.29 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausSaboresTond },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotSaboresTend },
        { type:'bar',  title:'Rotación por zona',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato May 2026' } },
        { label:'Ausentismo', value:'3.99%', delta:{ dir:'up',      text:'+0.43 pp vs. mes ant.' } },
        { label:'Rotación',   value:'8.50%', delta:{ dir:'down',    text:'−6.02 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausSaboresTond },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotSaboresTend },
        { type:'bar',  title:'Rotación por zona',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
  },

  // ════════════════════════════════════
  // EXTREMAS
  // Ausentismo: hoja ausentismo por mes (extremas locales)
  // Rotación: hoja ausentismo por mes (EXTREMAS %)
  // Dotación: no existe → S/D
  // Rotación por sector: no existe → S/D
  // ════════════════════════════════════
  extremas: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'S/D',    delta:{ dir:'neutral', text:'Sin dato Ene 2026' } },
        { label:'Ausentismo', value:'1.40%',  delta:{ dir:'neutral', text:'Base 28.562 días · Ene 2026' } },
        { label:'Rotación',   value:'17.80%', delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausExtremasTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotExtremasTend },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'S/D',    delta:{ dir:'neutral', text:'Sin dato Feb 2026' } },
        { label:'Ausentismo', value:'1.29%',  delta:{ dir:'down',    text:'−0.11 pp vs. mes ant.' } },
        { label:'Rotación',   value:'11.48%', delta:{ dir:'down',    text:'−6.32 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausExtremasTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotExtremasTend },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'S/D',    delta:{ dir:'neutral', text:'Sin dato Mar 2026' } },
        { label:'Ausentismo', value:'7.17%',  delta:{ dir:'up',      text:'+5.88 pp vs. mes ant.' } },
        { label:'Rotación',   value:'12.16%', delta:{ dir:'up',      text:'+0.68 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausExtremasTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotExtremasTend },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'S/D',    delta:{ dir:'neutral', text:'Sin dato Abr 2026' } },
        { label:'Ausentismo', value:'4.38%',  delta:{ dir:'down',    text:'−2.79 pp vs. mes ant.' } },
        { label:'Rotación',   value:'13.58%', delta:{ dir:'up',      text:'+1.42 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausExtremasTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotExtremasTend },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'S/D',    delta:{ dir:'neutral', text:'Sin dato May 2026' } },
        { label:'Ausentismo', value:'4.13%',  delta:{ dir:'down',    text:'−0.25 pp vs. mes ant.' } },
        { label:'Rotación',   value:'12.15%', delta:{ dir:'down',    text:'−1.43 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausExtremasTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotExtremasTend },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
  },

  // ════════════════════════════════════
  // STAFF
  // Ausentismo: hoja ausentismo por mes (staff)
  // Rotación: hoja ausentismo por mes (STAFF %)
  // Dotación: no existe → S/D
  // Rotación por gerencia: no existe → S/D
  // ════════════════════════════════════
  staff: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Ene 2026' } },
        { label:'Ausentismo', value:'S/D',   delta:{ dir:'neutral', text:'Sin registro Ene 2026' } },
        { label:'Rotación',   value:'5.20%', delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausStaffTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotStaffTend },
        { type:'bar',  title:'Rotación por gerencia', sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Feb 2026' } },
        { label:'Ausentismo', value:'6.56%', delta:{ dir:'neutral', text:'Feb 2026' } },
        { label:'Rotación',   value:'2.63%', delta:{ dir:'down',    text:'−2.57 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausStaffTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotStaffTend },
        { type:'bar',  title:'Rotación por gerencia', sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Mar 2026' } },
        { label:'Ausentismo', value:'5.74%', delta:{ dir:'down',    text:'−0.82 pp vs. mes ant.' } },
        { label:'Rotación',   value:'4.54%', delta:{ dir:'up',      text:'+1.91 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausStaffTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotStaffTend },
        { type:'bar',  title:'Rotación por gerencia', sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Abr 2026' } },
        { label:'Ausentismo', value:'9.28%', delta:{ dir:'up',      text:'+3.54 pp vs. mes ant.' } },
        { label:'Rotación',   value:'4.64%', delta:{ dir:'up',      text:'+0.10 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausStaffTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotStaffTend },
        { type:'bar',  title:'Rotación por gerencia', sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato May 2026' } },
        { label:'Ausentismo', value:'5.28%', delta:{ dir:'down',    text:'−4.00 pp vs. mes ant.' } },
        { label:'Rotación',   value:'5.66%', delta:{ dir:'up',      text:'+1.02 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausStaffTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotStaffTend },
        { type:'bar',  title:'Rotación por gerencia', sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
  },

  // ════════════════════════════════════
  // FÁBRICA
  // Ausentismo: hoja ausentismo por mes (fábricas)
  // Rotación: hoja ausentismo por mes (FÁBRICAS %)
  // Dotación: no existe → S/D
  // Rotación por sector: no existe → S/D
  // ════════════════════════════════════
  fabrica: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'S/D',    delta:{ dir:'neutral', text:'Sin dato Ene 2026' } },
        { label:'Ausentismo', value:'8.60%',  delta:{ dir:'neutral', text:'Base 21.087 días · Ene 2026' } },
        { label:'Rotación',   value:'11.60%', delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausFabricaTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotFabricaTend },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Feb 2026' } },
        { label:'Ausentismo', value:'6.67%', delta:{ dir:'down',    text:'−1.93 pp vs. mes ant.' } },
        { label:'Rotación',   value:'7.82%', delta:{ dir:'down',    text:'−3.78 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausFabricaTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotFabricaTend },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato Mar 2026' } },
        { label:'Ausentismo', value:'9.21%', delta:{ dir:'up',      text:'+2.54 pp vs. mes ant.' } },
        { label:'Rotación',   value:'7.46%', delta:{ dir:'down',    text:'−0.36 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausFabricaTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotFabricaTend },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'S/D',    delta:{ dir:'neutral', text:'Sin dato Abr 2026' } },
        { label:'Ausentismo', value:'11.43%', delta:{ dir:'up',      text:'+2.22 pp vs. mes ant.' } },
        { label:'Rotación',   value:'6.54%',  delta:{ dir:'down',    text:'−0.92 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausFabricaTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotFabricaTend },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'S/D',   delta:{ dir:'neutral', text:'Sin dato May 2026' } },
        { label:'Ausentismo', value:'9.61%', delta:{ dir:'down',    text:'−1.82 pp vs. mes ant.' } },
        { label:'Rotación',   value:'7.51%', delta:{ dir:'up',      text:'+0.97 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data:[{x:'Ene',y:null},{x:'Feb',y:null},{x:'Mar',y:null},{x:'Abr',y:null},{x:'May',y:null}] },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausFabricaTend },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotFabricaTend },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo — sin dato', data:[{x:'S/D',y:null}] },
      ],
    },
  },

  // ════════════════════════════════════
  // JUDICIALES — datos reales Abr y May 2026
  // ════════════════════════════════════
  judiciales: {
    ene: {
      kpis: [
        { label:'Total acuerdos — mes activo', value:'S/D',      delta:{ dir:'neutral', text:'Sin informe Ene 2026' } },
        { label:'Total acuerdos — año ant.',   value:'S/D',      delta:{ dir:'neutral', text:'Sin informe Ene 2025' } },
        { label:'Variación interanual',        value:'S/D',      delta:{ dir:'neutral', text:'Sin dato comparable' } },
      ],
      charts: [
        { type:'bar',  title:'Evolución monto acuerdos', sub:'Millones $ — meses con datos', data:[{x:'Abr 25',y:152.6},{x:'May 25',y:114.8},{x:'Abr 26',y:255.3},{x:'May 26',y:389.8}] },
        { type:'donut',title:'Distribución por tipo — May 2026 (ref.)', sub:'% del total', data:[{label:'Sabores',value:29.7},{label:'Otros',value:50.5},{label:'Fábrica',value:11.9},{label:'Extremas',value:7.9}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Total acuerdos — mes activo', value:'S/D',      delta:{ dir:'neutral', text:'Sin informe Feb 2026' } },
        { label:'Total acuerdos — año ant.',   value:'S/D',      delta:{ dir:'neutral', text:'Sin informe Feb 2025' } },
        { label:'Variación interanual',        value:'S/D',      delta:{ dir:'neutral', text:'Sin dato comparable' } },
      ],
      charts: [
        { type:'bar',  title:'Evolución monto acuerdos', sub:'Millones $ — meses con datos', data:[{x:'Abr 25',y:152.6},{x:'May 25',y:114.8},{x:'Abr 26',y:255.3},{x:'May 26',y:389.8}] },
        { type:'donut',title:'Distribución por tipo — May 2026 (ref.)', sub:'% del total', data:[{label:'Sabores',value:29.7},{label:'Otros',value:50.5},{label:'Fábrica',value:11.9},{label:'Extremas',value:7.9}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Total acuerdos — mes activo', value:'S/D',      delta:{ dir:'neutral', text:'Sin informe Mar 2026' } },
        { label:'Total acuerdos — año ant.',   value:'S/D',      delta:{ dir:'neutral', text:'Sin informe Mar 2025' } },
        { label:'Variación interanual',        value:'S/D',      delta:{ dir:'neutral', text:'Sin dato comparable' } },
      ],
      charts: [
        { type:'bar',  title:'Evolución monto acuerdos', sub:'Millones $ — meses con datos', data:[{x:'Abr 25',y:152.6},{x:'May 25',y:114.8},{x:'Abr 26',y:255.3},{x:'May 26',y:389.8}] },
        { type:'donut',title:'Distribución por tipo — May 2026 (ref.)', sub:'% del total', data:[{label:'Sabores',value:29.7},{label:'Otros',value:50.5},{label:'Fábrica',value:11.9},{label:'Extremas',value:7.9}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Total acuerdos — mes activo', value:'$255.3M', delta:{ dir:'up',      text:'31 acuerdos · Abr 2026' } },
        { label:'Total acuerdos — año ant.',   value:'$152.6M', delta:{ dir:'neutral', text:'28 acuerdos · Abr 2025' } },
        { label:'Variación interanual',        value:'+67.3%',  delta:{ dir:'up',      text:'$152.6M → $255.3M' }, valueClass:'is-down' },
      ],
      charts: [
        { type:'hbar', title:'Monto por razón social — mes activo', sub:'Millones $', data:[
          {x:'PISANIELLO IVO',y:14.5},{x:'LA EMPANADERIA S.A',y:11.6},{x:'CASUT FRIJON',y:9.8},
          {x:'BOLLOS Y RELLENOS',y:6.3},{x:'SORIA FRANCISCO',y:6.1},{x:'CASTRO CINTIA',y:5.8},
          {x:'RIOS BRUNO',y:5.1},{x:'SAYAGO MARCIO',y:4.9},{x:'COMACHI V.',y:3.8},
          {x:'VICTORICA B.',y:3.7},{x:'RUANO ROJAS',y:2.5},{x:'GONZALEZ M.',y:1.2},
        ]},
        { type:'donut',title:'Distribución por tipo (monto)', sub:'% del total · Abr 2026', data:[{label:'Fábrica',value:18.1},{label:'Sabores',value:21.7},{label:'Extremas',value:10.2},{label:'Otros',value:50.0}] },
      ],
      details: [{
        key:'detalle-abr', title:'Detalle acuerdos — Abr 2026', iconEmoji:'⚖️', accent:'purple', type:'table',
        topChips:[{label:'Fábrica',value:'18.1%',tone:'blue'},{label:'Sabores',value:'21.7%',tone:'green'},{label:'Extremas',value:'10.2%',tone:'purple'}],
        columns:[{key:'razon',label:'RAZÓN SOCIAL'},{key:'unidad',label:'LOCAL / FÁBRICA'},{key:'tipo',label:'TIPO',badge:true},{key:'actor',label:'ACTOR',align:'right'},{key:'total',label:'TOTAL',align:'right',strong:true}],
        rows:[
          {razon:'PISANIELLO IVO',           unidad:'MANTENIMIENTO LOCALES',  tipo:'Fábrica',  actor:'$12.000.000', total:'$14.528.708'},
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
        { label:'Total acuerdos — mes activo', value:'$389.8M', delta:{ dir:'up',      text:'39 acuerdos · May 2026' } },
        { label:'Total acuerdos — año ant.',   value:'$114.8M', delta:{ dir:'neutral', text:'22 acuerdos · May 2025' } },
        { label:'Variación interanual',        value:'+239.7%', delta:{ dir:'up',      text:'$114.8M → $389.8M' }, valueClass:'is-down' },
      ],
      charts: [
        { type:'hbar', title:'Monto por razón social — mes activo', sub:'Millones $', data:[
          {x:'CHUSPITA MARTIN',y:46.79},{x:'LA EMPANADERIA',y:29.76},{x:'BOLLOS Y RELLENOS',y:13.0},
          {x:'IVO PISANIELLO',y:11.93},{x:'BRUNO RIOS',y:11.45},{x:'VILLA MARIANO',y:11.37},
          {x:'CASTRO CINTIA',y:11.13},{x:'RUANO ROJAS',y:9.93},{x:'GONZALEZ MIGUEL',y:8.22},
          {x:'COMACHI V.',y:7.33},{x:'SAYAGO MARCIO',y:7.20},{x:'VICTORICA ANA',y:4.93},
          {x:'TABEIRA GABRIEL',y:4.48},{x:'CERTALDO',y:3.76},{x:'VICTORICA BARBARA',y:3.27},
          {x:'SORIA ADRIAN',y:2.60},{x:'MOSCARELLA',y:1.86},
        ]},
        { type:'donut',title:'Distribución por tipo (monto)', sub:'% del total', data:[{label:'Sabores',value:29.7},{label:'Otros',value:50.5},{label:'Fábrica',value:11.9},{label:'Extremas',value:7.9}] },
      ],
      details: [{
        key:'detalle-may', title:'Detalle acuerdos — May 2026', iconEmoji:'⚖️', accent:'purple', type:'table',
        topChips:[{label:'Fábrica',value:'11.9%',tone:'blue'},{label:'Sabores',value:'29.7%',tone:'green'},{label:'Extremas',value:'7.9%',tone:'purple'}],
        columns:[{key:'razon',label:'RAZÓN SOCIAL'},{key:'unidad',label:'LOCAL / FÁBRICA'},{key:'tipo',label:'TIPO',badge:true},{key:'actor',label:'ACTOR',align:'right'},{key:'total',label:'TOTAL',align:'right',strong:true}],
        rows:[
          {razon:'CHUSPITA MARTIN DANIEL',    unidad:'SABORES MDQ 3',          tipo:'Sabores',  actor:'$22.500.000', total:'$38.054.500'},
          {razon:'LA EMPANADERIA',            unidad:'FABRICA SAN MARTIN',     tipo:'Fábrica',  actor:'$18.000.000', total:'$21.733.000'},
          {razon:'CHUSPITA MARTIN DANIEL',    unidad:'SABORES MDQ 4',          tipo:'Sabores',  actor:'$7.000.000',  total:'$8.732.500'},
          {razon:'COMACHI VALERIA SABRINA',   unidad:'SABORES SAN MARTIN',     tipo:'Sabores',  actor:'$6.000.000',  total:'$7.333.650'},
          {razon:'BOLLOS Y RELLENOS',         unidad:'FABRICA SAN MIGUEL',     tipo:'Fábrica',  actor:'$6.000.000',  total:'$7.331.670'},
          {razon:'SAYAGO MARCIO H.N.',        unidad:'SABORES BOEDO',          tipo:'Sabores',  actor:'$6.000.000',  total:'$7.200.000'},
          {razon:'IVO PISANIELLO',            unidad:'EXTREMAS OLIVOS',        tipo:'Extremas', actor:'$4.000.000',  total:'$5.280.960'},
          {razon:'VICTORICA ANA MACARENA',    unidad:'SABORES BERAZATEGUI II', tipo:'Sabores',  actor:'$4.000.000',  total:'$4.931.670'},
          {razon:'TABEIRA DELGADO GABRIEL',   unidad:'SABORES CORRIENTES II',  tipo:'Sabores',  actor:'$3.500.000',  total:'$4.480.650'},
          {razon:'VILLA MARIANO DAVID',       unidad:'SABORES PACHECO II',     tipo:'Sabores',  actor:'$3.500.000',  total:'$4.361.741'},
          {razon:'GONZALEZ MIGUEL ANGEL',     unidad:'SABORES DEL VISO',       tipo:'Sabores',  actor:'$3.500.000',  total:'$4.333.650'},
          {razon:'LA EMPANADERIA',            unidad:'FABRICA SAN MARTIN',     tipo:'Fábrica',  actor:'$3.200.000',  total:'$4.293.650'},
          {razon:'RUANO ROJAS GREISSI',       unidad:'EXTREMAS SAN FERNANDO',  tipo:'Extremas', actor:'$3.500.000',  total:'$4.283.531'},
          {razon:'CASTRO CINTIA NOEMI',       unidad:'SABORES PACHECO I',      tipo:'Sabores',  actor:'$3.500.000',  total:'$4.283.500'},
          {razon:'VILLA MARIANO DAVID',       unidad:'SABORES POLVORINES',     tipo:'Sabores',  actor:'$3.000.000',  total:'$3.870.300'},
        ],
        totalRow:{ label:'TOTAL MAY 2026', value:'$389.812.182' },
      }],
    },
  },

  // ════════════════════════════════════
  // INSPECCIONES — datos reales Mar/Abr/May 2026
  // ════════════════════════════════════
  inspecciones: {
    ene: {
      kpis: [
        { label:'Visitas realizadas',     value:'S/D', delta:{ dir:'neutral', text:'Sin informe Ene 2026' } },
        { label:'Conformidad',            value:'S/D', delta:{ dir:'neutral', text:'Sin informe Ene 2026' } },
        { label:'Observaciones abiertas', value:'S/D', delta:{ dir:'neutral', text:'Sin informe Ene 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo — sin dato', data:[{x:'S/D',y:null}] },
        { type:'donut',title:'Resultado de visitas',    sub:'% del total — sin dato', data:[{label:'S/D',value:100}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Visitas realizadas',     value:'S/D', delta:{ dir:'neutral', text:'Sin informe Feb 2026' } },
        { label:'Conformidad',            value:'S/D', delta:{ dir:'neutral', text:'Sin informe Feb 2026' } },
        { label:'Observaciones abiertas', value:'S/D', delta:{ dir:'neutral', text:'Sin informe Feb 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo — sin dato', data:[{x:'S/D',y:null}] },
        { type:'donut',title:'Resultado de visitas',    sub:'% del total — sin dato', data:[{label:'S/D',value:100}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Visitas realizadas',     value:'38',    delta:{ dir:'neutral', text:'Mar 2026' } },
        { label:'Conformidad',            value:'97.4%', delta:{ dir:'neutral', text:'Obs. abiertas: 11' } },
        { label:'Observaciones abiertas', value:'11',    delta:{ dir:'neutral', text:'Mar 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo', data:[{x:'Sabores',y:32},{x:'Extremas',y:4},{x:'Fábrica',y:2},{x:'Staff',y:0}] },
        { type:'donut',title:'Resultado de visitas',    sub:'% del total', data:[{label:'Conformes',value:26},{label:'Obs. menores',value:11},{label:'No conformes',value:1}] },
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
        { label:'Visitas realizadas',     value:'17',    delta:{ dir:'down',    text:'−21 vs. mes anterior' } },
        { label:'Conformidad',            value:'76.5%', delta:{ dir:'down',    text:'−20.9 pp vs. mes ant.' } },
        { label:'Observaciones abiertas', value:'3',     delta:{ dir:'down',    text:'−8 vs. mes ant.' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo', data:[{x:'Sabores',y:12},{x:'Extremas',y:5},{x:'Fábrica',y:0},{x:'Staff',y:0}] },
        { type:'donut',title:'Resultado de visitas',    sub:'% del total', data:[{label:'Conformes',value:10},{label:'Obs. menores',value:3},{label:'No conformes',value:4}] },
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
        { label:'Visitas realizadas',     value:'20',    delta:{ dir:'up',      text:'+3 vs. mes anterior' } },
        { label:'Conformidad',            value:'75.0%', delta:{ dir:'down',    text:'−1.5 pp vs. mes ant.' } },
        { label:'Observaciones abiertas', value:'13',    delta:{ dir:'up',      text:'+10 vs. mes ant.' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo', data:[{x:'Sabores',y:16},{x:'Extremas',y:1},{x:'Fábrica',y:3},{x:'Staff',y:0}] },
        { type:'donut',title:'Resultado de visitas',    sub:'% del total', data:[{label:'Conformes',value:2},{label:'Obs. menores',value:13},{label:'No conformes',value:5}] },
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
  // HORAS EXTRAS — datos reales Ene–Abr 2026 (May no disponible)
  // ════════════════════════════════════
  horasextras: {
    ene: {
      kpis: [
        { label:'Horas extras — mes activo', value:'6.325',  delta:{ dir:'up',      text:'Mayor volumen del período' } },
        { label:'Costo del mes',              value:'$67.3M', delta:{ dir:'up',      text:'Ene 2026' } },
        { label:'% sobre horas normales',     value:'S/D',    delta:{ dir:'neutral', text:'Sin dato Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–Abr 2026 · total de horas', data: hsTendencia },
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
        { label:'% sobre horas normales',     value:'S/D',    delta:{ dir:'neutral', text:'Sin dato Feb 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–Abr 2026 · total de horas', data: hsTendencia },
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
        { label:'% sobre horas normales',     value:'S/D',    delta:{ dir:'neutral', text:'Sin dato Mar 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–Abr 2026 · total de horas', data: hsTendencia },
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
        { label:'% sobre horas normales',     value:'S/D',    delta:{ dir:'neutral', text:'Sin dato Abr 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–Abr 2026 · total de horas', data: hsTendencia },
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
        { label:'Horas extras — mes activo', value:'S/D',      delta:{ dir:'neutral', text:'Sin dato May 2026' } },
        { label:'Costo del mes',              value:'S/D',      delta:{ dir:'neutral', text:'Sin dato May 2026' } },
        { label:'% sobre horas normales',     value:'S/D',      delta:{ dir:'neutral', text:'Sin dato May 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–Abr 2026 · total de horas (May sin dato)', data: hsTendencia },
        { type:'donut',title:'Distribución por unidad',   sub:'% de horas extras — sin dato May', data:[{label:'S/D',value:100}] },
      ],
    },
  },

  // ════════════════════════════════════
  // ACCIDENTABILIDAD — datos reales del xlsx
  // KPIs: Tasa / Siniestros del mes / Días caídos
  // Charts: bar siniestros por mes · donut tipo siniestro (histórico)
  // Nota: Tasa mensual no existe en xlsx para Ene–Abr → S/D
  // ════════════════════════════════════
  accidentabilidad: {
    ene: {
      kpis: [
        { label:'Tasa — mes activo',  value:'S/D',  delta:{ dir:'neutral', text:'Sin dato Ene 2026' } },
        { label:'Siniestros del mes', value:'34',   delta:{ dir:'neutral', text:'926 días caídos' } },
        { label:'Días caídos',        value:'926',  delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22},{x:'Jun',y:22},{x:'Jul',y:18},{x:'Ago',y:23},{x:'Sep',y:22},{x:'Oct',y:37},{x:'Nov',y:49},{x:'Dic',y:49}] },
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
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22},{x:'Jun',y:22},{x:'Jul',y:18},{x:'Ago',y:23},{x:'Sep',y:22},{x:'Oct',y:37},{x:'Nov',y:49},{x:'Dic',y:49}] },
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
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22},{x:'Jun',y:22},{x:'Jul',y:18},{x:'Ago',y:23},{x:'Sep',y:22},{x:'Oct',y:37},{x:'Nov',y:49},{x:'Dic',y:49}] },
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
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22},{x:'Jun',y:22},{x:'Jul',y:18},{x:'Ago',y:23},{x:'Sep',y:22},{x:'Oct',y:37},{x:'Nov',y:49},{x:'Dic',y:49}] },
        { type:'donut',title:'Tipo de siniestro — histórico', sub:'% del total', data:[{label:'Laboral',value:81.0},{label:'In Itinere',value:18.5},{label:'Otro',value:0.5}] },
      ],
    },
    may: {
      kpis: [
        { label:'Tasa — mes activo',  value:'4.38%', delta:{ dir:'down',    text:'−38.9% vs. mes anterior' } },
        { label:'Siniestros del mes', value:'12',    delta:{ dir:'down',    text:'−3 vs. mes anterior' } },
        { label:'Días caídos',        value:'186',   delta:{ dir:'down',    text:'−24 vs. mes anterior' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22},{x:'Jun',y:22},{x:'Jul',y:18},{x:'Ago',y:23},{x:'Sep',y:22},{x:'Oct',y:37},{x:'Nov',y:49},{x:'Dic',y:49}] },
        { type:'donut',title:'Tipo de siniestro — histórico', sub:'% del total', data:[{label:'Laboral',value:81.0},{label:'In Itinere',value:18.5},{label:'Otro',value:0.5}] },
      ],
    },
  },

};
