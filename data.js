// data.js — datos reales xlsx + indicadores mayo 2026
// Actualizado: agregado mes JUNIO 2026.
//   · Judiciales: datos reales desde xlsx INFORME_DISCRIMINADO_JUNIO_2026.
//   · Rotación/Dotación/Ausentismo Jun: verificado y corregido contra INDICADOR_JUNIO_global.xlsx.
//   · Accidentabilidad Jun: verificado contra excel de siniestralidad histórico.
//   · Fábrica: agregado detalle "Gestión y Acompañamiento de Bajas Voluntarias" (Mar-Jun 2026).
 
window.MONTHS = [
  { key: 'ene', short: 'ENE', year: 2026 },
  { key: 'feb', short: 'FEB', year: 2026 },
  { key: 'mar', short: 'MAR', year: 2026 },
  { key: 'abr', short: 'ABR', year: 2026 },
  { key: 'may', short: 'MAY', year: 2026 },
  { key: 'jun', short: 'JUN', year: 2026 },
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
  { id:'empresa',         group:'UNIDADES', name:'Empresa Total',    sub:'Visión consolidada · todas las razones sociales', accent:'blue',   iconKey:'building',  logo:'assets/empresa total.png',       headerSub:'Consolidado de todas las unidades operativas',       tags:['Dotación 4.443','Rotación 12.00%'] },
  { id:'sabores',         group:'UNIDADES', name:'Sabores Express',  sub:'Cadena de locales gastronómicos',                 accent:'blue',   iconKey:'utensils',  logo:'assets/sabores.png',             headerSub:'Cadena de locales gastronómicos · Jun 2026',         tags:['Ausentismo 3.57%','Rotación 4.95%'] },
  { id:'extremas',        group:'UNIDADES', name:'Extremas',         sub:'Operación logística y distribución',             accent:'cyan',   iconKey:'truck',     logo:'assets/extremas.png',            headerSub:'Operac
