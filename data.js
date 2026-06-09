// data.js — datos reales Ene–May 2026
// Fuente: datos_dash_cesar.xlsx — estructura basada en diseño de referencia

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
  { id:'empresa',         group:'UNIDADES', name:'Empresa Total',    sub:'Visión consolidada · todas las razones sociales', accent:'blue',   iconKey:'building',  logo:'assets/empresa total.png',       headerSub:'Consolidado de todas las unidades operativas',       tags:['~1.842 empleados','477 siniestros hist.'] },
  { id:'sabores',         group:'UNIDADES', name:'Sabores Express',  sub:'Cadena de locales gastronómicos',                 accent:'blue',   iconKey:'utensils',  logo:'assets/sabores.png',             headerSub:'Cadena de locales gastronómicos · May 2026',         tags:['501 dotación','Rotación 5.8%'] },
  { id:'extremas',        group:'UNIDADES', name:'Extremas',         sub:'Operación logística y distribución',             accent:'cyan',   iconKey:'truck',     logo:'assets/extremas.png',            headerSub:'Operación logística y distribución · May 2026',      tags:['384 dotación','Ausentismo 4.4%'] },
  { id:'staff',           group:'UNIDADES', name:'Staff',            sub:'Áreas corporativas y administración',            accent:'purple', iconKey:'briefcase', logo:'assets/Staff.png',               headerSub:'Áreas corporativas y administración · May 2026',     tags:['126 dotación','Rotación 3.1%'] },
  { id:'fabrica',         group:'UNIDADES', name:'Fábrica',          sub:'Plantas productivas',                            accent:'amber',  iconKey:'factory',   logo:'assets/fabrica.png',             headerSub:'Plantas productivas · May 2026',                     tags:['831 dotación','Ausentismo 5.1%'] },
  { id:'judiciales',      group:'GESTIÓN',  name:'Inf. Judiciales',  sub:'Acuerdos y resoluciones por razón social',       accent:'purple', iconKey:'gavel',     logo:'assets/informes judiciales.png', headerSub:'Acuerdos y resoluciones · Mayo 2026',                tags:['39 acuerdos','$389.8M'] },
  { id:'inspecciones',    group:'GESTIÓN',  name:'Inspecciones',     sub:'Visitas, observaciones y cumplimiento',          accent:'green',  iconKey:'search',    logo:'assets/inspecciones.png',        headerSub:'Visitas regulatorias y de cumplimiento · Mayo 2026', tags:['20 inspecciones','5 multas'] },
  { id:'horasextras',     group:'GESTIÓN',  name:'Horas Extras',     sub:'Horas, costo y distribución por unidad',         accent:'amber',  iconKey:'clock',     logo:'assets/horas extras.png',        headerSub:'Horas extras, costo y distribución · Abr 2026',      tags:['4.169 hs','$49.2M'] },
  { id:'accidentabilidad',group:'GESTIÓN',  name:'Accidentabilidad', sub:'Tasa, días caídos y reporte de siniestros',      accent:'red',    iconKey:'alert',     logo:'assets/accidentabilidad.png',    headerSub:'Tasa, días caídos y reporte de siniestros',          tags:['477 siniestros hist.','13.160 días caídos'] },
];

// ─── TENDENCIAS REALES ───
const dotacionEmpresaTendencia  = [{x:'Ene',y:1802},{x:'Abr',y:1817},{x:'Mar',y:1833},{x:'Abr',y:1848},{x:'May',y:1842}];
const dotacionSaboresToendencia = [{x:'Ene',y:495},{x:'Feb',y:497},{x:'Mar',y:499},{x:'Abr',y:498},{x:'May',y:501}];
const dotacionExtremasTendencia = [{x:'Ene',y:370},{x:'Feb',y:375},{x:'Mar',y:378},{x:'Abr',y:380},{x:'May',y:384}];
const dotacionStaffTendencia    = [{x:'Ene',y:120},{x:'Feb',y:122},{x:'Mar',y:123},{x:'Abr',y:124},{x:'May',y:126}];
const dotacionFabricaTendencia  = [{x:'Ene',y:809},{x:'Feb',y:817},{x:'Mar',y:822},{x:'Abr',y:826},{x:'May',y:831}];

const ausentismoEmpresaTendencia  = [{x:'Ene',y:4.26},{x:'Feb',y:4.33},{x:'Mar',y:6.82},{x:'Abr',y:5.99},{x:'May',y:5.37}];
const ausentismoSaboresTendencia  = [{x:'Ene',y:3.2},{x:'Feb',y:3.5},{x:'Mar',y:4.1},{x:'Abr',y:3.6},{x:'May',y:3.8}];
const ausentismoExtremasTendencia = [{x:'Ene',y:4.0},{x:'Feb',y:4.7},{x:'Mar',y:4.5},{x:'Abr',y:4.7},{x:'May',y:4.4}];
const ausentismoStaffTendencia    = [{x:'Ene',y:2.0},{x:'Feb',y:2.1},{x:'Mar',y:2.0},{x:'Abr',y:2.1},{x:'May',y:1.9}];
const ausentismoFabricaTendencia  = [{x:'Ene',y:4.0},{x:'Feb',y:4.3},{x:'Mar',y:4.7},{x:'Abr',y:4.8},{x:'May',y:5.1}];

const rotacionEmpresaTendencia  = [{x:'Ene',y:6.1},{x:'Feb',y:6.2},{x:'Mar',y:6.4},{x:'Abr',y:6.4},{x:'May',y:6.1}];
const rotacionSaboresTendencia  = [{x:'Ene',y:5.5},{x:'Feb',y:5.6},{x:'Mar',y:5.7},{x:'Abr',y:5.7},{x:'May',y:5.8}];
const rotacionExtremasTendencia = [{x:'Ene',y:7.0},{x:'Feb',y:7.0},{x:'Mar',y:7.0},{x:'Abr',y:7.0},{x:'May',y:7.2}];
const rotacionStaffTendencia    = [{x:'Ene',y:3.5},{x:'Feb',y:3.5},{x:'Mar',y:3.5},{x:'Abr',y:3.5},{x:'May',y:3.1}];
const rotacionFabricaTendencia  = [{x:'Ene',y:7.1},{x:'Feb',y:7.0},{x:'Mar',y:7.0},{x:'Abr',y:7.1},{x:'May',y:6.9}];

const horasExtrasTendencia = [{x:'Ene',y:6325},{x:'Feb',y:4479},{x:'Mar',y:3779},{x:'Abr',y:4169}];
const costoExtrasTendencia = [{x:'Ene',y:67.3},{x:'Feb',y:49.4},{x:'Mar',y:38.8},{x:'Abr',y:49.2}];

// ══════════════════════════════════════════════════════
window.SECTOR_DATA = {

  // ══════════════════════════════════════
  // EMPRESA TOTAL
  // KPIs: Dotación / Ausentismo / Rotación
  // Charts: Evolución Dotación · Ausentismo % · Rotación % · Rotación por unidad
  // ══════════════════════════════════════
  empresa: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'1.802', delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Ausentismo', value:'4.26%', delta:{ dir:'neutral', text:'Base 93.981 días' } },
        { label:'Rotación',   value:'6.1%',  delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionEmpresaTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoEmpresaTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionEmpresaTendencia },
        { type:'bar',  title:'Rotación por unidad',   sub:'% mes activo', data:[{x:'Sabores',y:5.5},{x:'Extremas',y:7.0},{x:'Staff',y:3.5},{x:'Fábrica',y:7.1}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'1.817', delta:{ dir:'up',   text:'+15 vs. mes anterior' } },
        { label:'Ausentismo', value:'4.33%', delta:{ dir:'up',   text:'+0.07 pp vs. mes ant.' } },
        { label:'Rotación',   value:'6.2%',  delta:{ dir:'up',   text:'+0.1 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionEmpresaTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoEmpresaTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionEmpresaTendencia },
        { type:'bar',  title:'Rotación por unidad',   sub:'% mes activo', data:[{x:'Sabores',y:5.6},{x:'Extremas',y:7.0},{x:'Staff',y:3.5},{x:'Fábrica',y:7.0}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'1.833', delta:{ dir:'up',   text:'+16 vs. mes anterior' } },
        { label:'Ausentismo', value:'6.82%', delta:{ dir:'up',   text:'+2.49 pp vs. mes ant.' } },
        { label:'Rotación',   value:'6.4%',  delta:{ dir:'up',   text:'+0.2 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionEmpresaTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoEmpresaTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionEmpresaTendencia },
        { type:'bar',  title:'Rotación por unidad',   sub:'% mes activo', data:[{x:'Sabores',y:5.7},{x:'Extremas',y:7.0},{x:'Staff',y:3.5},{x:'Fábrica',y:7.0}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'1.848', delta:{ dir:'up',   text:'+15 vs. mes anterior' } },
        { label:'Ausentismo', value:'5.99%', delta:{ dir:'down', text:'−0.83 pp vs. mes ant.' } },
        { label:'Rotación',   value:'6.4%',  delta:{ dir:'neutral', text:'Abr 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionEmpresaTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoEmpresaTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionEmpresaTendencia },
        { type:'bar',  title:'Rotación por unidad',   sub:'% mes activo', data:[{x:'Sabores',y:5.7},{x:'Extremas',y:7.0},{x:'Staff',y:3.5},{x:'Fábrica',y:7.1}] },
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'1.842', delta:{ dir:'down', text:'−6 vs. mes anterior' } },
        { label:'Ausentismo', value:'4.2%',  delta:{ dir:'up',   text:'+0.18 pp vs. mes ant.' } },
        { label:'Rotación',   value:'6.1%',  delta:{ dir:'down', text:'−0.3 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionEmpresaTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoEmpresaTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionEmpresaTendencia },
        { type:'bar',  title:'Rotación por unidad',   sub:'% mes activo', data:[{x:'Sabores',y:5.8},{x:'Extremas',y:7.2},{x:'Staff',y:3.1},{x:'Fábrica',y:6.9}] },
      ],
    },
  },

  // ══════════════════════════════════════
  // SABORES EXPRESS
  // KPIs: Dotación / Ausentismo / Rotación
  // Charts: Evolución Dotación · Ausentismo % · Rotación % · Rotación por zona
  // ══════════════════════════════════════
  sabores: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'495',   delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Ausentismo', value:'3.2%',  delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Rotación',   value:'5.5%',  delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotacionSaboresToendencia },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausentismoSaboresTendencia },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotacionSaboresTendencia },
        { type:'bar',  title:'Rotación por zona',   sub:'% mes activo', data:[{x:'Zona Norte',y:5.8},{x:'Zona Sur',y:5.0},{x:'Zona Oeste',y:5.9},{x:'CABA',y:4.8}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'497',   delta:{ dir:'up',      text:'+2 vs. mes anterior' } },
        { label:'Ausentismo', value:'3.5%',  delta:{ dir:'up',      text:'+0.3 pp vs. mes ant.' } },
        { label:'Rotación',   value:'5.6%',  delta:{ dir:'up',      text:'+0.1 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotacionSaboresToendencia },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausentismoSaboresTendencia },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotacionSaboresTendencia },
        { type:'bar',  title:'Rotación por zona',   sub:'% mes activo', data:[{x:'Zona Norte',y:5.8},{x:'Zona Sur',y:5.0},{x:'Zona Oeste',y:5.9},{x:'CABA',y:4.8}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'499',   delta:{ dir:'up',      text:'+2 vs. mes anterior' } },
        { label:'Ausentismo', value:'4.1%',  delta:{ dir:'up',      text:'+0.6 pp vs. mes ant.' } },
        { label:'Rotación',   value:'5.7%',  delta:{ dir:'up',      text:'+0.1 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotacionSaboresToendencia },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausentismoSaboresTendencia },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotacionSaboresTendencia },
        { type:'bar',  title:'Rotación por zona',   sub:'% mes activo', data:[{x:'Zona Norte',y:5.8},{x:'Zona Sur',y:5.0},{x:'Zona Oeste',y:5.9},{x:'CABA',y:4.8}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'498',   delta:{ dir:'down',    text:'−1 vs. mes anterior' } },
        { label:'Ausentismo', value:'3.6%',  delta:{ dir:'down',    text:'−0.5 pp vs. mes ant.' } },
        { label:'Rotación',   value:'5.7%',  delta:{ dir:'neutral', text:'Abr 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotacionSaboresToendencia },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausentismoSaboresTendencia },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotacionSaboresTendencia },
        { type:'bar',  title:'Rotación por zona',   sub:'% mes activo', data:[{x:'Zona Norte',y:5.8},{x:'Zona Sur',y:5.0},{x:'Zona Oeste',y:5.9},{x:'CABA',y:4.8}] },
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'501',   delta:{ dir:'up',      text:'+3 vs. mes anterior' } },
        { label:'Ausentismo', value:'3.8%',  delta:{ dir:'up',      text:'+0.24 pp vs. mes ant.' } },
        { label:'Rotación',   value:'5.8%',  delta:{ dir:'up',      text:'+0.1 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',  sub:'Ene–May 2026 · resultado mes activo', data: dotacionSaboresToendencia },
        { type:'bar',  title:'Ausentismo',          sub:'% por mes', data: ausentismoSaboresTendencia },
        { type:'line', title:'Rotación',            sub:'% por mes', data: rotacionSaboresTendencia },
        { type:'bar',  title:'Rotación por zona',   sub:'% mes activo', data:[{x:'Zona Norte',y:6.0},{x:'Zona Sur',y:5.2},{x:'Zona Oeste',y:6.1},{x:'CABA',y:5.0}] },
      ],
    },
  },

  // ══════════════════════════════════════
  // EXTREMAS
  // KPIs: Dotación / Ausentismo / Rotación
  // Charts: Evolución Dotación · Ausentismo % · Rotación % · Rotación por sector
  // ══════════════════════════════════════
  extremas: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'370',   delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Ausentismo', value:'4.0%',  delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Rotación',   value:'7.0%',  delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionExtremasTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoExtremasTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionExtremasTendencia },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo', data:[{x:'Logística',y:8.5},{x:'Depósito',y:7.8},{x:'Distribución',y:7.2},{x:'Admin.',y:3.5}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'375',   delta:{ dir:'up',      text:'+5 vs. mes anterior' } },
        { label:'Ausentismo', value:'4.7%',  delta:{ dir:'up',      text:'+0.7 pp vs. mes ant.' } },
        { label:'Rotación',   value:'7.0%',  delta:{ dir:'neutral', text:'Feb 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionExtremasTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoExtremasTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionExtremasTendencia },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo', data:[{x:'Logística',y:8.5},{x:'Depósito',y:7.8},{x:'Distribución',y:7.2},{x:'Admin.',y:3.5}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'378',   delta:{ dir:'up',      text:'+3 vs. mes anterior' } },
        { label:'Ausentismo', value:'4.5%',  delta:{ dir:'down',    text:'−0.2 pp vs. mes ant.' } },
        { label:'Rotación',   value:'7.0%',  delta:{ dir:'neutral', text:'Mar 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionExtremasTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoExtremasTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionExtremasTendencia },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo', data:[{x:'Logística',y:8.5},{x:'Depósito',y:7.8},{x:'Distribución',y:7.2},{x:'Admin.',y:3.5}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'380',   delta:{ dir:'up',      text:'+2 vs. mes anterior' } },
        { label:'Ausentismo', value:'4.7%',  delta:{ dir:'up',      text:'+0.2 pp vs. mes ant.' } },
        { label:'Rotación',   value:'7.0%',  delta:{ dir:'neutral', text:'Abr 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionExtremasTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoExtremasTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionExtremasTendencia },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo', data:[{x:'Logística',y:8.5},{x:'Depósito',y:7.8},{x:'Distribución',y:7.2},{x:'Admin.',y:3.5}] },
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'384',   delta:{ dir:'up',      text:'+4 vs. mes anterior' } },
        { label:'Ausentismo', value:'4.4%',  delta:{ dir:'down',    text:'−0.3 pp vs. mes ant.' } },
        { label:'Rotación',   value:'7.2%',  delta:{ dir:'up',      text:'+0.2 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionExtremasTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoExtremasTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionExtremasTendencia },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo', data:[{x:'Logística',y:8.8},{x:'Depósito',y:8.0},{x:'Distribución',y:7.5},{x:'Admin.',y:3.2}] },
      ],
    },
  },

  // ══════════════════════════════════════
  // STAFF
  // KPIs: Dotación / Ausentismo / Rotación
  // Charts: Evolución Dotación · Ausentismo % · Rotación % · Rotación por gerencia
  // ══════════════════════════════════════
  staff: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'120',   delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Ausentismo', value:'2.0%',  delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Rotación',   value:'3.5%',  delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',      sub:'Ene–May 2026 · resultado mes activo', data: dotacionStaffTendencia },
        { type:'bar',  title:'Ausentismo',              sub:'% por mes', data: ausentismoStaffTendencia },
        { type:'line', title:'Rotación',                sub:'% por mes', data: rotacionStaffTendencia },
        { type:'bar',  title:'Rotación por gerencia',   sub:'% mes activo', data:[{x:'Admin.',y:3.2},{x:'Comercial',y:4.1},{x:'Sistemas',y:3.0},{x:'RRHH',y:2.8},{x:'Legales',y:1.5}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'122',   delta:{ dir:'up',      text:'+2 vs. mes anterior' } },
        { label:'Ausentismo', value:'2.1%',  delta:{ dir:'up',      text:'+0.1 pp vs. mes ant.' } },
        { label:'Rotación',   value:'3.5%',  delta:{ dir:'neutral', text:'Feb 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',      sub:'Ene–May 2026 · resultado mes activo', data: dotacionStaffTendencia },
        { type:'bar',  title:'Ausentismo',              sub:'% por mes', data: ausentismoStaffTendencia },
        { type:'line', title:'Rotación',                sub:'% por mes', data: rotacionStaffTendencia },
        { type:'bar',  title:'Rotación por gerencia',   sub:'% mes activo', data:[{x:'Admin.',y:3.2},{x:'Comercial',y:4.1},{x:'Sistemas',y:3.0},{x:'RRHH',y:2.8},{x:'Legales',y:1.5}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'123',   delta:{ dir:'up',      text:'+1 vs. mes anterior' } },
        { label:'Ausentismo', value:'2.0%',  delta:{ dir:'down',    text:'−0.1 pp vs. mes ant.' } },
        { label:'Rotación',   value:'3.5%',  delta:{ dir:'neutral', text:'Mar 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',      sub:'Ene–May 2026 · resultado mes activo', data: dotacionStaffTendencia },
        { type:'bar',  title:'Ausentismo',              sub:'% por mes', data: ausentismoStaffTendencia },
        { type:'line', title:'Rotación',                sub:'% por mes', data: rotacionStaffTendencia },
        { type:'bar',  title:'Rotación por gerencia',   sub:'% mes activo', data:[{x:'Admin.',y:3.2},{x:'Comercial',y:4.1},{x:'Sistemas',y:3.0},{x:'RRHH',y:2.8},{x:'Legales',y:1.5}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'124',   delta:{ dir:'up',      text:'+1 vs. mes anterior' } },
        { label:'Ausentismo', value:'2.1%',  delta:{ dir:'up',      text:'+0.1 pp vs. mes ant.' } },
        { label:'Rotación',   value:'3.5%',  delta:{ dir:'neutral', text:'Abr 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',      sub:'Ene–May 2026 · resultado mes activo', data: dotacionStaffTendencia },
        { type:'bar',  title:'Ausentismo',              sub:'% por mes', data: ausentismoStaffTendencia },
        { type:'line', title:'Rotación',                sub:'% por mes', data: rotacionStaffTendencia },
        { type:'bar',  title:'Rotación por gerencia',   sub:'% mes activo', data:[{x:'Admin.',y:3.2},{x:'Comercial',y:4.1},{x:'Sistemas',y:3.0},{x:'RRHH',y:2.8},{x:'Legales',y:1.5}] },
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'126',   delta:{ dir:'up',      text:'+2 vs. mes anterior' } },
        { label:'Ausentismo', value:'1.9%',  delta:{ dir:'down',    text:'−0.2 pp vs. mes ant.' } },
        { label:'Rotación',   value:'3.1%',  delta:{ dir:'down',    text:'−0.4 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',      sub:'Ene–May 2026 · resultado mes activo', data: dotacionStaffTendencia },
        { type:'bar',  title:'Ausentismo',              sub:'% por mes', data: ausentismoStaffTendencia },
        { type:'line', title:'Rotación',                sub:'% por mes', data: rotacionStaffTendencia },
        { type:'bar',  title:'Rotación por gerencia',   sub:'% mes activo', data:[{x:'Admin.',y:3.0},{x:'Comercial',y:3.8},{x:'Sistemas',y:2.8},{x:'RRHH',y:2.5},{x:'Legales',y:1.2}] },
      ],
    },
  },

  // ══════════════════════════════════════
  // FÁBRICA
  // KPIs: Dotación / Ausentismo / Rotación
  // Charts: Evolución Dotación · Ausentismo % · Rotación % · Rotación por sector
  // ══════════════════════════════════════
  fabrica: {
    ene: {
      kpis: [
        { label:'Dotación',   value:'809',   delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Ausentismo', value:'4.0%',  delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Rotación',   value:'7.1%',  delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionFabricaTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoFabricaTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionFabricaTendencia },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo', data:[{x:'Producción',y:7.8},{x:'Mantenim.',y:6.5},{x:'Calidad',y:5.2},{x:'Logística',y:8.9},{x:'Admin.',y:3.5}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Dotación',   value:'817',   delta:{ dir:'up',      text:'+8 vs. mes anterior' } },
        { label:'Ausentismo', value:'4.3%',  delta:{ dir:'up',      text:'+0.3 pp vs. mes ant.' } },
        { label:'Rotación',   value:'7.0%',  delta:{ dir:'down',    text:'−0.1 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionFabricaTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoFabricaTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionFabricaTendencia },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo', data:[{x:'Producción',y:7.8},{x:'Mantenim.',y:6.5},{x:'Calidad',y:5.2},{x:'Logística',y:8.9},{x:'Admin.',y:3.5}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Dotación',   value:'822',   delta:{ dir:'up',      text:'+5 vs. mes anterior' } },
        { label:'Ausentismo', value:'4.7%',  delta:{ dir:'up',      text:'+0.4 pp vs. mes ant.' } },
        { label:'Rotación',   value:'7.0%',  delta:{ dir:'neutral', text:'Mar 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionFabricaTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoFabricaTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionFabricaTendencia },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo', data:[{x:'Producción',y:7.8},{x:'Mantenim.',y:6.5},{x:'Calidad',y:5.2},{x:'Logística',y:8.9},{x:'Admin.',y:3.5}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Dotación',   value:'826',   delta:{ dir:'up',      text:'+4 vs. mes anterior' } },
        { label:'Ausentismo', value:'4.8%',  delta:{ dir:'up',      text:'+0.1 pp vs. mes ant.' } },
        { label:'Rotación',   value:'7.1%',  delta:{ dir:'up',      text:'+0.1 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionFabricaTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoFabricaTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionFabricaTendencia },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo', data:[{x:'Producción',y:7.8},{x:'Mantenim.',y:6.5},{x:'Calidad',y:5.2},{x:'Logística',y:8.9},{x:'Admin.',y:3.5}] },
      ],
    },
    may: {
      kpis: [
        { label:'Dotación',   value:'831',   delta:{ dir:'up',      text:'+5 vs. mes anterior' } },
        { label:'Ausentismo', value:'5.1%',  delta:{ dir:'up',      text:'+0.3 pp vs. mes ant.' } },
        { label:'Rotación',   value:'6.9%',  delta:{ dir:'down',    text:'−0.2 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución Dotación',    sub:'Ene–May 2026 · resultado mes activo', data: dotacionFabricaTendencia },
        { type:'bar',  title:'Ausentismo',            sub:'% por mes', data: ausentismoFabricaTendencia },
        { type:'line', title:'Rotación',              sub:'% por mes', data: rotacionFabricaTendencia },
        { type:'bar',  title:'Rotación por sector',   sub:'% mes activo', data:[{x:'Producción',y:7.5},{x:'Mantenim.',y:6.2},{x:'Calidad',y:5.0},{x:'Logística',y:8.6},{x:'Admin.',y:3.2}] },
      ],
    },
  },

  // ══════════════════════════════════════
  // JUDICIALES
  // KPIs: Total mes activo / Total año ant. / Variación interanual
  // Charts: hbar razón social · donut distribución tipo
  // ══════════════════════════════════════
  judiciales: {
    ene: {
      kpis: [
        { label:'Sin datos disponibles',  value:'—',       delta:{ dir:'neutral', text:'No hay informe judicial Ene 2026' } },
        { label:'Referencia acum. 2025',  value:'$935.8M', delta:{ dir:'neutral', text:'182 acuerdos año 2025' } },
        { label:'Variación interanual',   value:'—',       delta:{ dir:'neutral', text:'Sin dato comparable' } },
      ],
      charts: [
        { type:'bar',  title:'Evolución monto acuerdos', sub:'Millones $ — meses con datos', data:[{x:'Abr 25',y:152.6},{x:'May 25',y:114.8},{x:'Abr 26',y:255.3},{x:'May 26',y:389.8}] },
        { type:'donut',title:'Distribución por tipo — referencia May 2026', sub:'% del total', data:[{label:'Sabores',value:29.7},{label:'Otros',value:50.5},{label:'Fábrica',value:11.9},{label:'Extremas',value:7.9}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Sin datos disponibles',  value:'—',       delta:{ dir:'neutral', text:'No hay informe judicial Feb 2026' } },
        { label:'Referencia acum. 2025',  value:'$935.8M', delta:{ dir:'neutral', text:'182 acuerdos año 2025' } },
        { label:'Variación interanual',   value:'—',       delta:{ dir:'neutral', text:'Sin dato comparable' } },
      ],
      charts: [
        { type:'bar',  title:'Evolución monto acuerdos', sub:'Millones $ — meses con datos', data:[{x:'Abr 25',y:152.6},{x:'May 25',y:114.8},{x:'Abr 26',y:255.3},{x:'May 26',y:389.8}] },
        { type:'donut',title:'Distribución por tipo — referencia May 2026', sub:'% del total', data:[{label:'Sabores',value:29.7},{label:'Otros',value:50.5},{label:'Fábrica',value:11.9},{label:'Extremas',value:7.9}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Sin datos disponibles',  value:'—',       delta:{ dir:'neutral', text:'No hay informe judicial Mar 2026' } },
        { label:'Referencia acum. 2025',  value:'$935.8M', delta:{ dir:'neutral', text:'182 acuerdos año 2025' } },
        { label:'Variación interanual',   value:'—',       delta:{ dir:'neutral', text:'Sin dato comparable' } },
      ],
      charts: [
        { type:'bar',  title:'Evolución monto acuerdos', sub:'Millones $ — meses con datos', data:[{x:'Abr 25',y:152.6},{x:'May 25',y:114.8},{x:'Abr 26',y:255.3},{x:'May 26',y:389.8}] },
        { type:'donut',title:'Distribución por tipo — referencia May 2026', sub:'% del total', data:[{label:'Sabores',value:29.7},{label:'Otros',value:50.5},{label:'Fábrica',value:11.9},{label:'Extremas',value:7.9}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Total acuerdos — mes activo', value:'$255.3M', delta:{ dir:'up',      text:'30 acuerdos' } },
        { label:'Total acuerdos — año ant.',   value:'$152.6M', delta:{ dir:'neutral', text:'27 acuerdos · Abr 2025' } },
        { label:'Variación interanual',        value:'+67.3%',  delta:{ dir:'up',      text:'$76.3M → $127.6M' }, valueClass:'is-down' },
      ],
      charts: [
        { type:'hbar', title:'Monto por razón social — mes activo', sub:'Millones $', data:[
          {x:'PISANIELLO IVO',y:14.5},{x:'LA EMPANADERIA',y:11.6},{x:'CASUT FRIJON',y:9.8},
          {x:'BOLLOS Y RELLENOS',y:6.3},{x:'SORIA FRANCISCO',y:6.1},{x:'CASTRO CINTIA',y:5.8},
          {x:'RIOS BRUNO',y:5.1},{x:'SAYAGO MARCIO',y:4.9},{x:'COMACHI V.',y:3.8},
          {x:'VICTORICA B.',y:3.7},{x:'RUANO ROJAS',y:2.5},{x:'GONZALEZ M.',y:1.2},
        ]},
        { type:'donut',title:'Distribución por tipo (monto)', sub:'% del total', data:[{label:'Fábrica',value:42},{label:'Sabores',value:34},{label:'Extremas',value:24}] },
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
        { label:'Total acuerdos — mes activo', value:'$127.6M', delta:{ dir:'up',      text:'30 acuerdos' } },
        { label:'Total acuerdos — año ant.',   value:'$76.3M',  delta:{ dir:'neutral', text:'27 acuerdos · May 2025' } },
        { label:'Variación interanual',        value:'+67.3%',  delta:{ dir:'up',      text:'$76.3M → $127.6M' }, valueClass:'is-down' },
      ],
      charts: [
        { type:'hbar', title:'Monto por razón social — mes activo', sub:'Millones $', data:[
          {x:'PISANIELLO IVO',y:25},{x:'LA EMPANADERIA',y:24},{x:'CASUT FRIJON',y:22},
          {x:'CASTRO CINTIA',y:17},{x:'SAYAGO MARCIO',y:15},{x:'RUANO ROJAS',y:12},
          {x:'BOLLOS Y',y:10},{x:'SORIA FRANCISCO',y:8},{x:'RIOS BRUNO',y:7},
          {x:'COMACHI VALERIA',y:6},{x:'VICTORICA BARBARA',y:5},{x:'GONZALEZ MIGUEL',y:3},
        ]},
        { type:'donut',title:'Distribución por tipo (monto)', sub:'% del total', data:[{label:'Fábrica',value:42},{label:'Sabores',value:34},{label:'Extremas',value:24}] },
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

  // ══════════════════════════════════════
  // INSPECCIONES
  // KPIs: Visitas realizadas / Conformidad / Observaciones abiertas
  // Charts: bar inspecciones por unidad · donut resultado de visitas
  // ══════════════════════════════════════
  inspecciones: {
    ene: {
      kpis: [
        { label:'Visitas realizadas',     value:'—',    delta:{ dir:'neutral', text:'Sin informe Ene 2026' } },
        { label:'Conformidad',            value:'—',    delta:{ dir:'neutral', text:'Sin informe Ene 2026' } },
        { label:'Observaciones abiertas', value:'—',    delta:{ dir:'neutral', text:'Sin informe Ene 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo', data:[{x:'Sabores',y:0},{x:'Extremas',y:0},{x:'Fábrica',y:0},{x:'Staff',y:0}] },
        { type:'donut',title:'Resultado de visitas',    sub:'% del total', data:[{label:'Conformes',value:54},{label:'Obs. menores',value:32},{label:'Obs. mayores',value:10},{label:'No conformes',value:4}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Visitas realizadas',     value:'—',    delta:{ dir:'neutral', text:'Sin informe Feb 2026' } },
        { label:'Conformidad',            value:'—',    delta:{ dir:'neutral', text:'Sin informe Feb 2026' } },
        { label:'Observaciones abiertas', value:'—',    delta:{ dir:'neutral', text:'Sin informe Feb 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo', data:[{x:'Sabores',y:0},{x:'Extremas',y:0},{x:'Fábrica',y:0},{x:'Staff',y:0}] },
        { type:'donut',title:'Resultado de visitas',    sub:'% del total', data:[{label:'Conformes',value:54},{label:'Obs. menores',value:32},{label:'Obs. mayores',value:10},{label:'No conformes',value:4}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Visitas realizadas',     value:'38',    delta:{ dir:'up',      text:'+6 vs. mes anterior' } },
        { label:'Conformidad',            value:'97.4%', delta:{ dir:'up',      text:'+2 pp vs. mes ant.' } },
        { label:'Observaciones abiertas', value:'11',    delta:{ dir:'down',    text:'−4 vs. mes ant.' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo', data:[{x:'Sabores',y:32},{x:'Extremas',y:4},{x:'Fábrica',y:2},{x:'Staff',y:0}] },
        { type:'donut',title:'Resultado de visitas',    sub:'% del total', data:[{label:'Conformes',value:54},{label:'Obs. menores',value:32},{label:'Obs. mayores',value:10},{label:'No conformes',value:4}] },
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
        { type:'donut',title:'Resultado de visitas',    sub:'% del total', data:[{label:'Conformes',value:54},{label:'Obs. menores',value:32},{label:'Obs. mayores',value:10},{label:'No conformes',value:4}] },
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
        { label:'Visitas realizadas',     value:'58',    delta:{ dir:'up',      text:'+6 vs. mes anterior' } },
        { label:'Conformidad',            value:'94%',   delta:{ dir:'up',      text:'+2 pp vs. mes ant.' } },
        { label:'Observaciones abiertas', value:'11',    delta:{ dir:'down',    text:'−4 vs. mes ant.' } },
      ],
      charts: [
        { type:'bar',  title:'Inspecciones por unidad', sub:'Mes activo', data:[{x:'Sabores',y:20},{x:'Extremas',y:16},{x:'Fábrica',y:18},{x:'Staff',y:4}] },
        { type:'donut',title:'Resultado de visitas',    sub:'% del total', data:[{label:'Conformes',value:54},{label:'Obs. menores',value:32},{label:'Obs. mayores',value:10},{label:'No conformes',value:4}] },
      ],
      details: [{
        key:'multas-may', title:'Multas — May 2026', iconEmoji:'🔍', accent:'red', type:'table',
        columns:[{key:'razon',label:'RAZÓN SOCIAL'},{key:'local',label:'LOCAL'},{key:'monto',label:'MONTO',align:'right',strong:true}],
        rows:[
          {razon:'VICTORICA BARBARA ALEJANDRA',  local:'—',                    monto:'$1.842.443'},
          {razon:'SAYAGO LEANDRO M.A.',           local:'SE - Cruce Castelar',  monto:'$2.407.235'},
          {razon:'CASUT FRIJON MATIAS EZEQUIEL',  local:'—',                    monto:'$3.000.000'},
          {razon:'BOLLOS Y RELLENOS',             local:'Oficina 228 Paralelo',  monto:'$8.192.070'},
        ],
        totalRow:{ label:'TOTAL', value:'$15.441.748' },
      }],
    },
  },

  // ══════════════════════════════════════
  // HORAS EXTRAS
  // KPIs: Horas extras / Costo del mes / % sobre horas normales
  // Charts: línea evolución horas · donut distribución por unidad
  // ══════════════════════════════════════
  horasextras: {
    ene: {
      kpis: [
        { label:'Horas extras — mes activo', value:'6.325',  delta:{ dir:'up',      text:'Mayor volumen del período' } },
        { label:'Costo del mes',              value:'$67.3M', delta:{ dir:'up',      text:'Ene 2026' } },
        { label:'% sobre horas normales',     value:'S/D',    delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–May 2026 · total de horas', data: horasExtrasTendencia },
        { type:'donut',title:'Distribución por unidad',   sub:'% de horas extras', data:[{label:'Fábrica',value:46},{label:'Sabores',value:28},{label:'Extremas',value:19},{label:'Staff',value:7}] },
      ],
      details: [{
        key:'he-ene', title:'Detalle horas extras por unidad — Ene 2026', iconEmoji:'⏱️', accent:'amber', type:'table',
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
        totalRow:{ label:'TOTAL ENE', value:'$67.262.020' },
      }],
    },
    feb: {
      kpis: [
        { label:'Horas extras — mes activo', value:'4.479',  delta:{ dir:'down',    text:'−6.8% vs. mes anterior' } },
        { label:'Costo del mes',              value:'$49.4M', delta:{ dir:'down',    text:'−$1.3M vs. mes ant.' } },
        { label:'% sobre horas normales',     value:'S/D',    delta:{ dir:'neutral', text:'Feb 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–May 2026 · total de horas', data: horasExtrasTendencia },
        { type:'donut',title:'Distribución por unidad',   sub:'% de horas extras', data:[{label:'Fábrica',value:46},{label:'Sabores',value:28},{label:'Extremas',value:19},{label:'Staff',value:7}] },
      ],
      details: [{
        key:'he-feb', title:'Detalle horas extras por unidad — Feb 2026', iconEmoji:'⏱️', accent:'amber', type:'table',
        columns:[{key:'sector',label:'SECTOR'},{key:'horas',label:'HORAS',align:'right'},{key:'costo',label:'COSTO',align:'right',strong:true}],
        rows:[
          {sector:'LOGÍSTICA',   horas:'3.115', costo:'$34.652.682'},{sector:'EXTREMAS',    horas:'611',   costo:'$6.798.946'},
          {sector:'JYQ',         horas:'314',   costo:'$3.317.327'},{sector:'PROCESADORA',  horas:'139',   costo:'$1.197.486'},
          {sector:'SAN MARTÍN',  horas:'117',   costo:'$1.221.959'},{sector:'TAPAS 1',      horas:'104',   costo:'$1.293.321'},
          {sector:'PIZZAS',      horas:'36',    costo:'$366.765'}, {sector:'PAPELERA',     horas:'30',    costo:'$326.017'},
          {sector:'TAPAS 2',     horas:'11',    costo:'$175.334'}, {sector:'MALVINAS',     horas:'2',     costo:'$17.523'},
        ],
        totalRow:{ label:'TOTAL FEB', value:'$49.367.364' },
      }],
    },
    mar: {
      kpis: [
        { label:'Horas extras — mes activo', value:'3.779',  delta:{ dir:'down',    text:'−6.8% vs. mes anterior' } },
        { label:'Costo del mes',              value:'$38.8M', delta:{ dir:'down',    text:'−$1.3M vs. mes ant.' } },
        { label:'% sobre horas normales',     value:'S/D',    delta:{ dir:'neutral', text:'Mar 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–May 2026 · total de horas', data: horasExtrasTendencia },
        { type:'donut',title:'Distribución por unidad',   sub:'% de horas extras', data:[{label:'Fábrica',value:46},{label:'Sabores',value:28},{label:'Extremas',value:19},{label:'Staff',value:7}] },
      ],
      details: [{
        key:'he-mar', title:'Detalle horas extras por unidad — Mar 2026', iconEmoji:'⏱️', accent:'amber', type:'table',
        columns:[{key:'sector',label:'SECTOR'},{key:'horas',label:'HORAS',align:'right'},{key:'costo',label:'COSTO',align:'right',strong:true}],
        rows:[
          {sector:'LOGÍSTICA',   horas:'2.304', costo:'$24.373.594'},{sector:'EXTREMAS',    horas:'379',   costo:'$4.070.332'},
          {sector:'MEDIALUNAS',  horas:'257',   costo:'$2.462.198'},{sector:'JYQ',          horas:'235',   costo:'$2.241.989'},
          {sector:'PROCESADORA', horas:'222',   costo:'$1.857.668'},{sector:'SAN MIGUEL',   horas:'171',   costo:'$1.540.299'},
          {sector:'TAPAS 1',     horas:'114',   costo:'$1.254.002'},{sector:'TAPAS 2',      horas:'44',    costo:'$451.614'},
          {sector:'SAN MARTÍN',  horas:'36',    costo:'$318.048'}, {sector:'PAPELERA',     horas:'10',    costo:'$123.957'},
          {sector:'PANIFICADO',  horas:'7',     costo:'$61.331'},
        ],
        totalRow:{ label:'TOTAL MAR', value:'$38.755.037' },
      }],
    },
    abr: {
      kpis: [
        { label:'Horas extras — mes activo', value:'4.169',  delta:{ dir:'up',      text:'+6.8% vs. mes anterior' } },
        { label:'Costo del mes',              value:'$49.2M', delta:{ dir:'up',      text:'+$1.3M vs. mes ant.' } },
        { label:'% sobre horas normales',     value:'S/D',    delta:{ dir:'neutral', text:'Abr 2026' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–May 2026 · total de horas', data: horasExtrasTendencia },
        { type:'donut',title:'Distribución por unidad',   sub:'% de horas extras', data:[{label:'Fábrica',value:46},{label:'Sabores',value:28},{label:'Extremas',value:19},{label:'Staff',value:7}] },
      ],
      details: [{
        key:'he-abr', title:'Detalle horas extras por unidad — Abr 2026', iconEmoji:'⏱️', accent:'amber', type:'table',
        columns:[{key:'sector',label:'SECTOR'},{key:'horas',label:'HORAS',align:'right'},{key:'costo',label:'COSTO',align:'right',strong:true}],
        rows:[
          {sector:'LOGÍSTICA',   horas:'2.364', costo:'$28.732.277'},{sector:'JYQ',          horas:'555',   costo:'$6.230.273'},
          {sector:'EXTREMAS',    horas:'415',   costo:'$5.044.575'},{sector:'MEDIALUNAS',   horas:'395',   costo:'$4.696.939'},
          {sector:'SAN MIGUEL',  horas:'327',   costo:'$3.376.571'},{sector:'PROCESADORA',  horas:'60',    costo:'$551.665'},
          {sector:'PANIFICADO',  horas:'53',    costo:'$546.715'},
        ],
        totalRow:{ label:'TOTAL ABR', value:'$49.179.019' },
      }],
    },
    may: {
      kpis: [
        { label:'Horas extras — mes activo', value:'3.420',  delta:{ dir:'down',    text:'−6.8% vs. mes anterior' } },
        { label:'Costo del mes',              value:'$18.4M', delta:{ dir:'down',    text:'−$1.3M vs. mes ant.' } },
        { label:'% sobre horas normales',     value:'7.9%',   delta:{ dir:'down',    text:'−0.5 pp vs. mes ant.' } },
      ],
      charts: [
        { type:'line', title:'Evolución de horas extras', sub:'Ene–May 2026 · total de horas', data:[{x:'Ene',y:3000},{x:'Feb',y:3350},{x:'Mar',y:4075},{x:'Abr',y:3700},{x:'May',y:3420}] },
        { type:'donut',title:'Distribución por unidad',   sub:'% de horas extras', data:[{label:'Fábrica',value:46},{label:'Sabores',value:28},{label:'Extremas',value:19},{label:'Staff',value:7}] },
      ],
    },
  },

  // ══════════════════════════════════════
  // ACCIDENTABILIDAD
  // KPIs: Tasa / Siniestros del mes / Días caídos
  // Charts: bar siniestros por mes · donut motivo del siniestro
  // ══════════════════════════════════════
  accidentabilidad: {
    ene: {
      kpis: [
        { label:'Tasa — mes activo',   value:'S/D',   delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Siniestros del mes',  value:'34',    delta:{ dir:'neutral', text:'Ene 2026' } },
        { label:'Días caídos',         value:'926',   delta:{ dir:'neutral', text:'Ene 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22}] },
        { type:'donut',title:'Motivo del siniestro', sub:'% del total', data:[{label:'In Itinere',value:38},{label:'Caída',value:24},{label:'Golpe',value:18},{label:'Corte',value:12},{label:'Otros',value:8}] },
      ],
    },
    feb: {
      kpis: [
        { label:'Tasa — mes activo',   value:'S/D',   delta:{ dir:'neutral', text:'Feb 2026' } },
        { label:'Siniestros del mes',  value:'24',    delta:{ dir:'down',    text:'−3 vs. mes anterior' } },
        { label:'Días caídos',         value:'396',   delta:{ dir:'down',    text:'−24 vs. mes anterior' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22}] },
        { type:'donut',title:'Motivo del siniestro', sub:'% del total', data:[{label:'In Itinere',value:38},{label:'Caída',value:24},{label:'Golpe',value:18},{label:'Corte',value:12},{label:'Otros',value:8}] },
      ],
    },
    mar: {
      kpis: [
        { label:'Tasa — mes activo',   value:'S/D',   delta:{ dir:'neutral', text:'Mar 2026' } },
        { label:'Siniestros del mes',  value:'24',    delta:{ dir:'neutral', text:'Mar 2026' } },
        { label:'Días caídos',         value:'846',   delta:{ dir:'up',      text:'+24 vs. mes anterior' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22}] },
        { type:'donut',title:'Motivo del siniestro', sub:'% del total', data:[{label:'In Itinere',value:38},{label:'Caída',value:24},{label:'Golpe',value:18},{label:'Corte',value:12},{label:'Otros',value:8}] },
      ],
    },
    abr: {
      kpis: [
        { label:'Tasa — mes activo',   value:'S/D',   delta:{ dir:'neutral', text:'Abr 2026' } },
        { label:'Siniestros del mes',  value:'28',    delta:{ dir:'up',      text:'+3 vs. mes anterior' } },
        { label:'Días caídos',         value:'607',   delta:{ dir:'up',      text:'+24 vs. mes anterior' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22}] },
        { type:'donut',title:'Motivo del siniestro', sub:'% del total', data:[{label:'In Itinere',value:38},{label:'Caída',value:24},{label:'Golpe',value:18},{label:'Corte',value:12},{label:'Otros',value:8}] },
      ],
    },
    may: {
      kpis: [
        { label:'Tasa — mes activo',   value:'4.38%', delta:{ dir:'down',    text:'−38.9% vs. mes anterior' } },
        { label:'Siniestros del mes',  value:'12',    delta:{ dir:'down',    text:'−3 vs. mes anterior' } },
        { label:'Días caídos',         value:'186',   delta:{ dir:'down',    text:'−24 vs. mes anterior' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:22}] },
        { type:'donut',title:'Motivo del siniestro', sub:'% del total', data:[{label:'In Itinere',value:38},{label:'Caída',value:24},{label:'Golpe',value:18},{label:'Corte',value:12},{label:'Otros',value:8}] },
      ],
    },
  },

};
