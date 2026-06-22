// ════════════════════════════════════
  // ACCIDENTABILIDAD
  // ene–abr: sin fuente en este Excel → se mantienen como estaban.
  // may: datos reales de "Siniestralidad_Mayo_2026.xlsx" (hojas Detalle/Resumen).
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
        { label:'Siniestros del mes', value:'20',  delta:{ dir:'down',    text:'−8 vs. mes anterior (28)' } },
        { label:'Días caídos',        value:'246', delta:{ dir:'down',    text:'−361 vs. mes anterior (607)' } },
        { label:'Laborales',          value:'15',  delta:{ dir:'neutral', text:'75% del total · May 2026' } },
        { label:'In Itinere',         value:'5',   delta:{ dir:'neutral', text:'25% del total · May 2026' } },
      ],
      charts: [
        { type:'bar',  title:'Siniestros por mes', sub:'Cantidad', data:[{x:'Ene',y:34},{x:'Feb',y:24},{x:'Mar',y:24},{x:'Abr',y:28},{x:'May',y:20}] },
        { type:'donut',title:'Siniestros por sector', sub:'Cantidad · May 2026', center:'20', data:[
          {label:'Fábrica', value:11},
          {label:'Locales', value:7},
          {label:'Staff',   value:2},
        ]},
        { type:'donut',title:'Tipo de lesión', sub:'Cantidad · May 2026', center:'20', data:[
          {label:'Traumatismo', value:14},
          {label:'Corte',       value:4},
          {label:'Herida',      value:1},
          {label:'Amputación',  value:1},
        ]},
        { type:'donut',title:'Tipo de siniestro', sub:'Cantidad · May 2026', center:'20', data:[
          {label:'Laboral',    value:15},
          {label:'In Itinere', value:5},
        ]},
      ],
      details: [{
        key:'detalle-may', title:'Detalle de siniestros — May 2026', iconEmoji:'⚠️', accent:'red', type:'table',
        topChips:[{label:'Fábrica',value:'11',tone:'blue'},{label:'Locales',value:'7',tone:'green'},{label:'Staff',value:'2',tone:'purple'}],
        columns:[
          {key:'nombre',label:'APELLIDO Y NOMBRE'},
          {key:'fecha', label:'FECHA'},
          {key:'estado',label:'ESTADO',badge:true},
          {key:'sector',label:'SECTOR'},
          {key:'lesion',label:'TIPO DE LESIÓN'},
          {key:'tipo',  label:'TIPO',badge:true},
          {key:'dias',  label:'DÍAS CAÍDOS',align:'right',strong:true},
        ],
        rows:[
          {nombre:'VERNA ALBORNOZ GIANLUCA LAUTARO', fecha:'04/05', estado:'Fin de Tratamiento', sector:'FABRICA', lesion:'TRAUMATISMO', tipo:'Laboral',    dias:'14'},
          {nombre:'SANDOVAL MARCOS ALEJANDRO',       fecha:'04/05', estado:'Fin de Tratamiento', sector:'LOCALES', lesion:'TRAUMATISMO', tipo:'In Itinere', dias:'1'},
          {nombre:'JADE ARIANA RAMIREZ HUAMAN',      fecha:'05/05', estado:'En Tratamiento',     sector:'LOCALES', lesion:'TRAUMATISMO', tipo:'Laboral',    dias:'26'},
          {nombre:'LEDESMA DEMIAN NAHUEL YAIR',      fecha:'05/05', estado:'Fin de Tratamiento', sector:'LOCALES', lesion:'TRAUMATISMO', tipo:'Laboral',    dias:'26'},
          {nombre:'LUNA SERGIO',                     fecha:'05/05', estado:'Fin de Tratamiento', sector:'FABRICA', lesion:'HERIDA',      tipo:'Laboral',    dias:'1'},
          {nombre:'SANTANDER MAXIMILIANO',           fecha:'05/05', estado:'En Tratamiento',     sector:'FABRICA', lesion:'TRAUMATISMO', tipo:'Laboral',    dias:'26'},
          {nombre:'LUZ MAITENA GOMEZ',               fecha:'08/05', estado:'En Tratamiento',     sector:'LOCALES', lesion:'TRAUMATISMO', tipo:'Laboral',    dias:'23'},
          {nombre:'TORRES GUSTAVO ARIEL',            fecha:'08/05', estado:'En Tratamiento',     sector:'FABRICA', lesion:'CORTE',       tipo:'Laboral',    dias:'23'},
          {nombre:'CHIVEL WALTER',                   fecha:'15/05', estado:'En Tratamiento',     sector:'FABRICA', lesion:'AMPUTACION',  tipo:'Laboral',    dias:'16'},
          {nombre:'JUAREZ JOAQUIN',                  fecha:'16/05', estado:'Fin de Tratamiento', sector:'LOCALES', lesion:'CORTE',       tipo:'Laboral',    dias:'15'},
          {nombre:'PAEZ VALDEZ GONZALO FERNANDO',    fecha:'17/05', estado:'Fin de Tratamiento', sector:'FABRICA', lesion:'CORTE',       tipo:'Laboral',    dias:'2'},
          {nombre:'GONZALEZ SANTIAGO',               fecha:'18/05', estado:'En Tratamiento',     sector:'FABRICA', lesion:'CORTE',       tipo:'Laboral',    dias:'13'},
          {nombre:'CACERES DAIANA BELEN',            fecha:'19/05', estado:'Fin de Tratamiento', sector:'FABRICA', lesion:'TRAUMATISMO', tipo:'In Itinere', dias:'3'},
          {nombre:'OJEDA GONZALO DAMIAN',            fecha:'19/05', estado:'Fin de Tratamiento', sector:'STAFF',   lesion:'TRAUMATISMO', tipo:'Laboral',    dias:'12'},
          {nombre:'ALVARENGA JULIO',                 fecha:'22/05', estado:'En Tratamiento',     sector:'FABRICA', lesion:'TRAUMATISMO', tipo:'In Itinere', dias:'9'},
          {nombre:'FLORES MIÑO JOHANNA',             fecha:'23/05', estado:'Fin de Tratamiento', sector:'LOCALES', lesion:'TRAUMATISMO', tipo:'Laboral',    dias:'8'},
          {nombre:'VEGA THOMAS',                     fecha:'24/05', estado:'Fin de Tratamiento', sector:'FABRICA', lesion:'TRAUMATISMO', tipo:'Laboral',    dias:'7'},
          {nombre:'MUÑOZ DAIANA JEANETTE',           fecha:'25/05', estado:'Fin de Tratamiento', sector:'LOCALES', lesion:'TRAUMATISMO', tipo:'In Itinere', dias:'2'},
          {nombre:'LAZARTE NICOLAS',                 fecha:'25/05', estado:'En Tratamiento',     sector:'FABRICA', lesion:'TRAUMATISMO', tipo:'Laboral',    dias:'6'},
          {nombre:'ROJAS NOELIA',                    fecha:'26/05', estado:'Fin de Tratamiento', sector:'STAFF',   lesion:'TRAUMATISMO', tipo:'In Itinere', dias:'13'},
        ],
        totalRow:{ label:'TOTAL — 20 siniestros', value:'246 días' },
      }],
    },
  },
