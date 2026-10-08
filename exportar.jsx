// Exportar a PowerPoint — arma el informe del mes elegido como .pptx, con gráficos nativos
// (editables en PowerPoint / Google Slides), para mandarlo como archivo en vez de compartir
// el link del panel. Usa los mismos cálculos que la pantalla (window.RRHH_CALC, en views.jsx).
// PptxGenJS (~460 KB) se carga recién al primer clic, desde unpkg con SRI como React.
// El PPT se baja desde la página del informe (informe.html); el menú de la barra superior
// abre esa página y arma el HTML interactivo de una sola marca (exportarHtml, más abajo).
(function () {
  const PPTX_SRC = 'https://unpkg.com/pptxgenjs@4.0.1/dist/pptxgen.bundle.js';
  const PPTX_SRI = 'sha384-qb0Xhi7LLYpvW1HCK6oMrmDLSY9sy7vwm6ZlV6KjtrlL9yg30+YN4neTwnmX+Kp8';

  let cargaLib = null;
  function cargarPptxGen() {
    if (window.PptxGenJS) return Promise.resolve(window.PptxGenJS);
    if (!cargaLib) {
      cargaLib = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = PPTX_SRC;
        s.integrity = PPTX_SRI;
        s.crossOrigin = 'anonymous';
        s.onload = () => (window.PptxGenJS ? resolve(window.PptxGenJS) : reject(new Error('PptxGenJS no quedó disponible')));
        s.onerror = () => { cargaLib = null; s.remove(); reject(new Error('No se pudo descargar PptxGenJS')); };
        document.head.appendChild(s);
      });
    }
    return cargaLib;
  }

  // ── Imágenes: se pasan como base64 para controlar el recorte (fotos en círculo, logos sin deformar) ──
  function cargarImg(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('No se pudo cargar ' + src));
      img.src = encodeURI(src);
    });
  }
  // Foto: recorte cuadrado centrado (con rounding:true queda en círculo).
  async function fotoCuadrada(src, lado = 360) {
    const img = await cargarImg(src);
    const s = Math.min(img.naturalWidth, img.naturalHeight);
    const c = document.createElement('canvas');
    c.width = c.height = lado;
    c.getContext('2d').drawImage(img, (img.naturalWidth - s) / 2, (img.naturalHeight - s) / 2, s, s, 0, 0, lado, lado);
    return c.toDataURL('image/jpeg', 0.9);
  }
  // Logo: PNG con transparencia, achicado a máx. 400 px, con sus proporciones.
  async function logo(src) {
    const img = await cargarImg(src);
    const k = Math.min(1, 400 / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement('canvas');
    c.width = Math.round(img.naturalWidth * k);
    c.height = Math.round(img.naturalHeight * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return { data: c.toDataURL('image/png'), ratio: c.width / c.height };
  }
  // Ubica un logo dentro de una caja sin deformarlo (centrado).
  function encajar(l, x, y, w, h) {
    const iw = Math.min(w, h * l.ratio), ih = iw / l.ratio;
    return { data: l.data, x: x + (w - iw) / 2, y: y + (h - ih) / 2, w: iw, h: ih };
  }
  const intentar = p => p.catch(e => { console.warn(e); return null; });

  // Descarga un archivo con nombre sin tildes: con caracteres no ASCII algunos navegadores
  // lo guardan como "download".
  const sinTildes = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '');
  function descargar(blob, nombre) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = sinTildes(nombre);
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    return a.download;
  }

  // PptxGenJS escribe las categorías de los gráficos como "multinivel" (multiLvlStrRef) y
  // Google Slides no las lee: muestra 1, 2, 3… en vez de nombres o meses. Se reescriben como
  // lista simple (strRef), el formato que usa PowerPoint, y que leen ambos.
  async function categoriasSimples(blob) {
    const JSZip = window.JSZip; // viene incluido en pptxgen.bundle.js
    if (!JSZip) return blob;
    const zip = await JSZip.loadAsync(blob);
    const charts = Object.keys(zip.files).filter(n => /^ppt\/charts\/chart\d+\.xml$/.test(n));
    for (const n of charts) {
      const xml = await zip.file(n).async('string');
      const simple = xml.replace(
        /<c:multiLvlStrRef>\s*(<c:f>[^<]*<\/c:f>)\s*<c:multiLvlStrCache>\s*(<c:ptCount val="\d+"\/>)\s*<c:lvl>((?:(?!<c:lvl>)[\s\S])*?)<\/c:lvl>\s*<\/c:multiLvlStrCache>\s*<\/c:multiLvlStrRef>/g,
        '<c:strRef>$1<c:strCache>$2$3</c:strCache></c:strRef>'
      );
      if (simple !== xml) zip.file(n, simple);
    }
    return zip.generateAsync({ type: 'blob', compression: 'DEFLATE', mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
  }

  // ── Tema "Editorial" (mismos colores que el panel) ──
  const C = {
    navy: '2B3A4A', steel: '3F6189', slate: '3D5A62', text: '22303C', text2: '475763', text3: '7A8691',
    border: 'E4DED4', sand: 'DDD5C8', sandSoft: 'F1ECE4', bg: 'F1EEE9', white: 'FFFFFF',
    good: '2C7E51', goodBg: 'E4F2EA', bad: 'A8453C', badBg: 'F8E5E3', prev: 'A3B7CF',
  };
  const F_TIT = 'Georgia', F_TXT = 'Calibri';
  const SW = 13.333, SH = 7.5, X0 = 0.55, CW = 12.2; // contenido: 0,55" → 12,75" (el marco navy va a la derecha)
  const hex = c => String(c || '').replace('#', '').toUpperCase();
  const ACENTO = { sabores: C.steel, extremas: C.slate };

  // alcance: 'general' (ambas marcas) o el id de una marca ('sabores' / 'extremas'): en ese
  // caso el informe es solo de esa marca y suma el detalle de cada regional.
  function exportarPpt(monthIdx, alcance = 'general') {
    const K = window.RRHH_CALC;
    const M = window.MONTHS[monthIdx];
    const P = window.MONTHS[monthIdx - 1] || null;
    const unidades = window.SECTORS.filter(s => s.group === 'UNIDADES');
    const marca = alcance === 'general' ? null : unidades.find(s => s.id === alcance);
    if (alcance !== 'general' && !marca) return Promise.reject(new Error('Marca desconocida: ' + alcance));
    const marcas = marca ? [marca] : unidades;
    const mesTxt = K.mesLabelFor(M);
    const mesLargo = `${K.MES_LARGO[M.short]} ${M.year}`;
    const iniAnio = window.MONTHS.findIndex(m => m.year === M.year);
    const mesesAcum = window.MONTHS.slice(iniAnio, monthIdx + 1);
    const rangoAcum = `${K.mesLabelFor(mesesAcum[0])} – ${mesTxt} · ${mesesAcum.length} ${mesesAcum.length === 1 ? 'mes' : 'meses'}`;
    const rotRows = (s, m) => (m ? window.ROTACION?.[s.id]?.[m.key] : null) || null;
    const altasAcum = s => mesesAcum.reduce((a, m) => a + (K.altasNetasMes(window.SECTOR_DATA[s.id], m.key, null) || 0), 0);
    const r2 = n => Math.round(n * 100) / 100;

    return cargarPptxGen().then(async PptxGenJS => {
      const [logoEquipo, ...logosMarca] = await Promise.all([
        intentar(logo('assets/logo-equipo-seleccion.png')),
        ...unidades.map(s => intentar(logo(s.logo))),
      ]);
      const logoDe = Object.fromEntries(unidades.map((s, i) => [s.id, logosMarca[i]]));

      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_WIDE';
      pptx.author = 'Equipo de Selección';
      pptx.company = 'Dirección de RRHH';
      pptx.title = marca ? `${marca.name} — informe por regional · ${mesLargo}` : `Informe Equipo de Selección — ${mesLargo}`;
      pptx.defineSlideMaster({
        title: 'EDITORIAL',
        background: { color: C.white },
        objects: [
          { rect: { x: SW - 0.3, y: 0, w: 0.08, h: SH, fill: { color: C.steel } } },
          { rect: { x: SW - 0.22, y: 0, w: 0.22, h: SH, fill: { color: C.navy } } },
          { rect: { x: 0, y: SH - 0.14, w: SW - 0.3, h: 0.14, fill: { color: C.navy } } },
          { text: { text: `Equipo de Selección · ${marca ? marca.name + ' · ' : ''}${mesLargo}`, options: { x: X0, y: SH - 0.46, w: 6, h: 0.26, fontFace: F_TXT, fontSize: 9, color: C.text3, margin: 0 } } },
        ],
        slideNumber: { x: SW - 1.2, y: SH - 0.46, w: 0.7, h: 0.26, fontFace: F_TXT, fontSize: 9, color: C.text3, align: 'right' },
      });
      const nueva = () => pptx.addSlide({ masterName: 'EDITORIAL' });

      function encabezado(slide, titulo, sub, lg) {
        let tx = X0;
        if (lg) { slide.addImage({ ...encajar(lg, X0, 0.36, 0.72, 0.72), rounding: !!lg.round }); tx = X0 + 0.92; }
        slide.addText(titulo.toUpperCase(), { x: tx, y: 0.34, w: X0 + CW - tx, h: 0.48, fontFace: F_TIT, fontSize: 22, color: C.slate, charSpacing: 3, margin: 0, valign: 'middle' });
        if (sub) slide.addText(sub, { x: tx, y: 0.8, w: X0 + CW - tx, h: 0.3, fontFace: F_TXT, fontSize: 12, color: C.text3, margin: 0 });
        slide.addShape(pptx.ShapeType.line, { x: X0, y: 1.25, w: CW, h: 0, line: { color: C.border, width: 1 } });
      }

      // Tarjeta de KPI: etiqueta, valor grande y variación (verde = buena noticia, rojo = mala;
      // la flecha indica si el número subió o bajó).
      function kpi(slide, x, y, w, h, label, value, delta, acento) {
        const angosta = w < 2.6; // fila de 5 tarjetas
        slide.addShape(pptx.ShapeType.rect, { x, y, w, h, fill: { color: C.white }, line: { color: C.border, width: 1 } });
        slide.addShape(pptx.ShapeType.rect, { x, y: y + h - 0.06, w, h: 0.06, fill: { color: acento }, line: { color: acento, width: 0 } });
        slide.addText(label.toUpperCase(), { x: x + 0.1, y: y + 0.14, w: w - 0.2, h: 0.3, align: 'center', fontFace: F_TXT, fontSize: angosta ? 9 : 10, bold: true, color: C.text3, charSpacing: 1, margin: 0 });
        slide.addText(value ?? 'S/D', { x: x + 0.1, y: y + 0.44, w: w - 0.2, h: 0.6, align: 'center', valign: 'middle', fontFace: F_TXT, fontSize: angosta ? 28 : 30, bold: true, color: C.text, margin: 0 });
        if (delta) {
          const tono = delta.dir === 'up' ? [C.good, C.goodBg] : delta.dir === 'down' ? [C.bad, C.badBg] : [C.text2, C.sandSoft];
          const sentido = delta.trend || delta.dir; // la flecha sigue al número, el color a la noticia
          const flecha = sentido === 'up' ? '▲ ' : sentido === 'down' ? '▼ ' : '';
          // hasta 2 líneas: con tarjetas angostas textos como "vs. Jul (Ivo P.) (11,74%)" no entran en una
          slide.addText(flecha + delta.text, { x: x + 0.12, y: y + 1.06, w: w - 0.24, h: 0.36, align: 'center', valign: 'middle', fontFace: F_TXT, fontSize: angosta ? 8.5 : 9.5, color: tono[0], fill: { color: tono[1] }, rectRadius: 0.12, shape: pptx.ShapeType.roundRect, margin: 0 });
        }
      }
      function filaKpis(slide, y, items, acento) {
        const gap = 0.2, w = (CW - gap * (items.length - 1)) / items.length;
        items.forEach((it, i) => kpi(slide, X0 + i * (w + gap), y, w, 1.55, it.label, it.value, it.delta, acento));
      }
      const ejes = {
        catAxisLabelFontFace: F_TXT, valAxisLabelFontFace: F_TXT, catAxisLabelFontSize: 10, valAxisLabelFontSize: 9,
        catAxisLabelColor: C.text2, valAxisLabelColor: C.text3, valGridLine: { color: 'ECE7DF', size: 0.75 },
        catGridLine: { style: 'none' }, catAxisLineShow: true, valAxisLineShow: false,
        dataLabelFontFace: F_TXT, dataLabelFontSize: 9, dataLabelColor: C.text, legendFontFace: F_TXT, legendFontSize: 10,
      };
      function tituloGrafico(slide, x, y, w, texto, sub) {
        slide.addText([
          { text: texto.toUpperCase(), options: { fontFace: F_TIT, fontSize: 12, color: C.slate, charSpacing: 2, breakLine: !!sub } },
          ...(sub ? [{ text: sub, options: { fontFace: F_TXT, fontSize: 9.5, color: C.text3 } }] : []),
        ], { x, y, w, h: sub ? 0.5 : 0.3, margin: 0, valign: 'top' });
      }
      // Altas por aperturas (locales "Aper") de una marca o gerencia en el mes del informe,
      // con el % sobre las altas brutas del mes (mismo cálculo que la tarjeta del panel).
      function tarjetaAperturas(sectores, bucket = 'total') {
        const apers = sectores.map(x => K.aperturasMes(x.id, M.key, bucket)).filter(Boolean);
        const a = apers.length === 0 ? null : {
          n: apers.reduce((t, x) => t + x.n, 0),
          locales: apers.flatMap(x => x.locales),
          fuente: apers.some(x => x.locales.length > 0) ? 'locales' : apers.some(x => x.fuente === 'informe') ? 'informe' : 'locales',
        };
        const brutas = sectores.reduce((t, x) => {
          const md = window.SECTOR_DATA[x.id]?.[M.key];
          return t + (md ? K.sumOrPick(K.chartByKind(md.charts, 'gerencia-mes'), bucket === 'total' ? null : bucket, 'y') || 0 : 0);
        }, 0);
        return { label: `Aperturas — ${mesTxt}`, value: a ? K.fmtInt(a.n) : null, delta: K.aperturaDelta(a, brutas) };
      }

      // Serie "Altas por mes" de una marca, del primer mes cargado hasta el mes del informe.
      function serieAltas(s) {
        const sd = window.SECTOR_DATA[s.id];
        const meses = window.MONTHS.slice(0, monthIdx + 1).filter(m => sd[m.key]);
        return meses.map(m => ({ m, v: K.sumOrPick(K.chartByKind(sd[m.key].charts, 'gerencia-mes'), null, 'y') || 0 }));
      }

      // ═════ 1. Portada ═════
      {
        const sl = nueva();
        sl.background = { color: C.bg };
        const logoTop = marca ? logoDe[marca.id] : logoEquipo;
        if (logoTop) sl.addImage(encajar(logoTop, SW / 2 - 0.9 - 0.15, 1.0, 1.8, 1.5));
        sl.addText((marca ? marca.name : 'Equipo de Selección').toUpperCase(), { x: X0, y: 2.75, w: CW, h: 0.8, align: 'center', fontFace: F_TIT, fontSize: 36, color: C.slate, charSpacing: 8, margin: 0 });
        sl.addText(`${marca ? 'Informe por regional' : 'Informe mensual'} · ${mesLargo}`, { x: X0, y: 3.55, w: CW, h: 0.5, align: 'center', fontFace: F_TXT, fontSize: 18, color: C.text2, margin: 0 });
        sl.addShape(pptx.ShapeType.line, { x: SW / 2 - 1.15, y: 4.25, w: 2, h: 0, line: { color: C.steel, width: 2 } });
        sl.addText(marca ? 'Equipo de Selección' : unidades.map(s => s.name).join('  ·  '), { x: X0, y: 4.45, w: CW, h: 0.4, align: 'center', fontFace: F_TXT, fontSize: 14, color: C.text2, margin: 0 });
        const logosAbajo = marca ? [logoEquipo] : unidades.map(s => logoDe[s.id]);
        logosAbajo.forEach((lg, i) => {
          if (lg) sl.addImage(encajar(lg, SW / 2 - 0.15 + (i - logosAbajo.length / 2) * 1.3 + 0.2, 5.1, 0.9, 0.9));
        });
        const hoy = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
        sl.addText(`Generado el ${hoy} desde el panel · Uso interno`, { x: X0, y: 6.45, w: CW, h: 0.3, align: 'center', fontFace: F_TXT, fontSize: 10, color: C.text3, margin: 0 });
      }

      // ═════ 2. Resumen general — ambas marcas (solo en el informe general) ═════
      if (!marca) {
        const sl = nueva();
        encabezado(sl, 'Resumen general — ambas marcas', `${unidades.map(s => s.name).join(' · ')} · ${mesLargo}`);
        let acum = 0, netas = null, netasPrev = null;
        unidades.forEach(s => {
          const sd = window.SECTOR_DATA[s.id];
          acum += altasAcum(s);
          const n = K.altasNetasMes(sd, M.key, null);
          if (n != null) netas = (netas || 0) + n;
          const np = P ? K.altasNetasMes(sd, P.key, null) : null;
          if (np != null) netasPrev = (netasPrev || 0) + np;
        });
        const bajas = window.BAJAS_MENSUAL[M.key] ?? null;
        const bajasPrev = P ? (window.BAJAS_MENSUAL[P.key] ?? null) : null;
        const rot = K.rotacionStats(unidades.flatMap(s => rotRows(s, M) || []), null);
        const rotPrev = K.rotacionStats(unidades.flatMap(s => rotRows(s, P) || []), null);
        filaKpis(sl, 1.5, [
          { label: 'Altas acumuladas', value: K.fmtInt(acum), delta: { dir: 'neutral', text: rangoAcum } },
          { label: `Altas — ${mesTxt}`, value: K.fmtInt(netas), delta: K.deltaInfo(netas, netasPrev, true) },
          { label: `Bajas — ${mesTxt}`, value: K.fmtInt(bajas), delta: K.deltaInfo(bajas, bajasPrev, true) },
          tarjetaAperturas(unidades),
          { label: `Rotación — ${mesTxt}`, value: rot ? K.fmtPct(rot.rot) : null, delta: rot ? (K.rotDelta(rot.rot, rotPrev?.rot, 'mes ant.') || { dir: 'neutral', text: `Dotación ${K.fmtInt(rot.dotIni)} → ${K.fmtInt(rot.dotFin)}` }) : { dir: 'neutral', text: 'Sin datos de rotación' } },
        ], C.steel);
        const series = unidades.map(serieAltas);
        const labels = series[0].map(p => K.mesShortXY(p.m));
        // Con un solo mes cargado la línea sería un punto suelto: se omite.
        if (labels.length > 1) tituloGrafico(sl, X0, 3.3, CW, 'Altas por mes', 'Ingresos por mes de cada marca (antes de descontar no presentes)');
        if (labels.length > 1) sl.addChart(pptx.ChartType.line, unidades.map((s, i) => ({ name: s.name, labels, values: series[i].map(p => p.v) })), {
          x: X0, y: 3.8, w: CW, h: 3.15, ...ejes,
          chartColors: unidades.map(s => ACENTO[s.id] || C.steel), lineSize: 2.25, lineDataSymbol: 'circle', lineDataSymbolSize: 6,
          showLegend: true, legendPos: 't',
        });
      }

      // ═════ 3. Por marca ═════
      for (const s of marcas) {
        const sd = window.SECTOR_DATA[s.id];
        const acento = ACENTO[s.id] || C.steel;
        const lg = logoDe[s.id];
        const md = sd[M.key];
        const rows = rotRows(s, M), prevRows = rotRows(s, P);
        const rot = K.rotacionStats(rows, null), rotPrev = K.rotacionStats(prevRows, null);

        // 3a. KPIs + altas por mes
        {
          const sl = nueva();
          encabezado(sl, s.name, `Informe mensual · ${mesLargo}`, lg);
          const netas = K.altasNetasMes(sd, M.key, null);
          const netasPrev = P ? K.altasNetasMes(sd, P.key, null) : null;
          filaKpis(sl, 1.5, [
            { label: 'Altas acumuladas', value: K.fmtInt(altasAcum(s)), delta: { dir: 'neutral', text: rangoAcum } },
            { label: `Altas — ${mesTxt}`, value: md ? K.fmtInt(netas) : null, delta: md ? K.deltaInfo(netas, netasPrev, true) : { dir: 'neutral', text: 'Sin datos de altas cargados' } },
            { label: `Bajas — ${mesTxt}`, value: rot ? K.fmtInt(rot.bajas) : null, delta: rot ? (rotPrev ? K.deltaInfo(rot.bajas, rotPrev.bajas, true) : { dir: 'neutral', text: 'Sin dato de mes ant.' }) : { dir: 'neutral', text: 'Sin datos de rotación' } },
            tarjetaAperturas([s]),
            { label: `Rotación — ${mesTxt}`, value: rot ? K.fmtPct(rot.rot) : null, delta: rot ? (K.rotDelta(rot.rot, rotPrev?.rot, 'mes ant.') || { dir: 'neutral', text: `Dotación ${K.fmtInt(rot.dotIni)} → ${K.fmtInt(rot.dotFin)}` }) : { dir: 'neutral', text: 'Sin datos de rotación' } },
          ], acento);
          const serie = serieAltas(s);
          if (serie.length > 1) {
            tituloGrafico(sl, X0, 3.3, CW, 'Altas por mes', `${K.mesLabelFor(serie[0].m)} – ${mesTxt} · ingresos antes de descontar no presentes`);
            sl.addChart(pptx.ChartType.line, [{ name: 'Altas', labels: serie.map(p => K.mesShortXY(p.m)), values: serie.map(p => p.v) }], {
              x: X0, y: 3.8, w: CW, h: 3.15, ...ejes, chartColors: [acento], lineSize: 2.25, lineDataSymbol: 'circle', lineDataSymbolSize: 7,
              showValue: true, dataLabelPosition: 't', dataLabelFontSize: 8.5,
            });
          }
        }

        // 3b. Cambio de regional (si hubo un relevo en los últimos 3 meses del informe)
        for (const r of K.relevosDe(s.id)) {
          const iDesde = K.idxMes(r.entrante.desde);
          if (monthIdx < iDesde || monthIdx > iDesde + 2) continue;
          const iHasta = r.saliente.hasta ? K.idxMes(r.saliente.hasta) : iDesde - 1;
          const mH = window.MONTHS[iHasta], mD = window.MONTHS[iDesde];
          const [fa, fb] = await Promise.all([intentar(fotoCuadrada(r.saliente.photo)), intentar(fotoCuadrada(r.entrante.photo))]);
          const sl = nueva();
          encabezado(sl, 'Cambio de regional', `${s.name} · ${r.entrante.name} asume la regional de ${r.saliente.name} desde ${K.mesLabelFor(mD)}`, lg);
          const persona = (g, foto, m, cx, etiqueta, on) => {
            const ra = K.rotacionStats(rotRows(s, m), g.matchLabel);
            const altas = window.MONTHS.slice(iniAnio, monthIdx + 1).reduce((a, mm) => a + (K.altasNetasMes(sd, mm.key, g.matchLabel) || 0), 0);
            sl.addShape(pptx.ShapeType.ellipse, { x: cx - 1.0, y: 1.75, w: 2.0, h: 2.0, fill: { color: on ? acento : C.sand }, line: { color: on ? acento : C.sand, width: 0 } });
            if (foto) sl.addImage({ data: foto, x: cx - 0.92, y: 1.83, w: 1.84, h: 1.84, rounding: true });
            sl.addText(etiqueta.toUpperCase(), { x: cx - 2.4, y: 3.95, w: 4.8, h: 0.3, align: 'center', fontFace: F_TXT, fontSize: 11, bold: true, color: on ? acento : C.text3, charSpacing: 2, margin: 0 });
            sl.addText(g.name.toUpperCase(), { x: cx - 2.4, y: 4.25, w: 4.8, h: 0.45, align: 'center', fontFace: F_TIT, fontSize: 20, color: C.slate, charSpacing: 2, margin: 0 });
            sl.addText(g.role, { x: cx - 2.4, y: 4.7, w: 4.8, h: 0.28, align: 'center', fontFace: F_TXT, fontSize: 11, color: C.text3, margin: 0 });
            const dato = (y, lbl, val) => sl.addText([
              { text: lbl + '  ', options: { color: C.text2 } }, { text: val, options: { bold: true, color: C.text } },
            ], { x: cx - 2.4, y, w: 4.8, h: 0.3, align: 'center', fontFace: F_TXT, fontSize: 12.5, margin: 0 });
            dato(5.2, `Altas ${M.year}`, K.fmtInt(altas));
            if (ra) {
              dato(5.52, `Rotación ${K.mesLabelFor(m)}`, K.fmtPct(ra.rot));
              dato(5.84, `Dotación ${K.mesLabelFor(m)}`, `${K.fmtInt(ra.dotIni)} → ${K.fmtInt(ra.dotFin)}`);
            }
          };
          persona(r.saliente, fa, mH, X0 + CW * 0.22, `Hasta ${K.mesLabelFor(mH)}`, false);
          persona(r.entrante, fb, mD, X0 + CW * 0.78, `Desde ${K.mesLabelFor(mD)}`, true);
          sl.addShape(pptx.ShapeType.rightArrow, { x: X0 + CW / 2 - 1.1, y: 2.45, w: 2.2, h: 0.6, fill: { color: acento }, line: { color: acento, width: 0 } });
          sl.addText(`Relevo · ${K.mesLabelFor(mD)}`, { x: X0 + CW / 2 - 1.6, y: 3.15, w: 3.2, h: 0.3, align: 'center', fontFace: F_TXT, fontSize: 12, bold: true, color: C.text2, margin: 0 });
        }

        // 3c. YTD: altas del año por gerencia + altas presentes vs. bajas del mes
        const ytd = window.MONTHS.filter((m, i) => i <= monthIdx && m.year === M.year && sd[m.key]);
        if (ytd.length > 0) {
          const totals = {};
          ytd.forEach(m => K.chartByKind(sd[m.key].charts, 'gerencia-mes').data.forEach(d => { totals[d.x] = (totals[d.x] || 0) + d.y; }));
          const orden = [...(window.GERENCIAS[s.id] || []).map(g => g.matchLabel), 'Otros'].filter(l => totals[l] > 0);
          const total = orden.reduce((a, l) => a + totals[l], 0);
          const sl = nueva();
          const rango = `${K.mesLabelFor(ytd[0])} – ${K.mesLabelFor(ytd[ytd.length - 1])}`;
          encabezado(sl, `${s.name.split(' ')[0]} · YTD`, `Altas ${rango} por gerencia · ${K.fmtInt(total)} ingresos`, lg);
          sl.addChart(pptx.ChartType.pie, [{ name: 'Altas', labels: orden, values: orden.map(l => totals[l]) }], {
            x: X0, y: 1.5, w: 6.2, h: 5.3, chartColors: orden.map(l => hex(K.colorGerencia(s.id, l))),
            showPercent: true, showLegend: false,
            dataLabelColor: C.white, dataLabelFontFace: F_TXT, dataLabelFontSize: 10, dataLabelFontBold: true, dataBorder: { pt: 1.5, color: 'FFFFFF' },
          });
          const tx = X0 + 6.8, tw = CW - 6.8;
          const filas = [
            [{ text: 'Gerencia', options: { bold: true, color: C.white, fill: { color: C.navy } } },
             { text: 'Altas', options: { bold: true, color: C.white, fill: { color: C.navy }, align: 'right' } },
             { text: '%', options: { bold: true, color: C.white, fill: { color: C.navy }, align: 'right' } }],
            ...orden.map(l => [
              // punto del mismo color que su porción de la torta
              { text: [{ text: '●  ', options: { color: hex(K.colorGerencia(s.id, l)) } }, { text: l }] },
              { text: K.fmtInt(totals[l]), options: { align: 'right' } },
              { text: `${(totals[l] / total * 100).toFixed(1).replace('.', ',')}%`, options: { align: 'right', color: C.text2 } },
            ]),
            [{ text: 'Total', options: { bold: true } }, { text: K.fmtInt(total), options: { bold: true, align: 'right' } }, { text: '100%', options: { bold: true, align: 'right' } }],
          ];
          sl.addTable(filas, { x: tx, y: 1.6, w: tw, colW: [tw - 2.2, 1.1, 1.1], fontFace: F_TXT, fontSize: 11, color: C.text, border: { type: 'solid', pt: 0.75, color: C.border }, rowH: 0.34, margin: [0.04, 0.1, 0.04, 0.1] });

          // Mes del informe: altas presentes vs. bajas (barra partida, como la píldora del panel)
          const altasMes = md ? K.sumOrPick(K.chartByKind(md.charts, 'gerencia-mes'), null, 'y') : null;
          const np = md ? K.sumOrPick(K.chartByKind(md.charts, 'no-presentes-gerencia'), null, 'y') : null;
          const presentes = altasMes != null ? altasMes - (np || 0) : null;
          const bajas = rot ? rot.bajas : null;
          let y = 1.6 + 0.34 * (orden.length + 2) + 0.35;
          if (presentes != null && bajas != null && presentes + bajas > 0) {
            sl.addText(`${mesTxt} — altas que se presentaron vs. bajas del mes`.toUpperCase(), { x: tx, y, w: tw, h: 0.3, fontFace: F_TXT, fontSize: 9.5, bold: true, color: C.text3, charSpacing: 1, margin: 0 });
            const wa = Math.max(1.2, Math.min(tw - 1.2, tw * presentes / (presentes + bajas)));
            sl.addText(`Altas ${K.fmtInt(presentes)}`, { x: tx, y: y + 0.35, w: wa, h: 0.5, fill: { color: C.slate }, color: C.white, bold: true, fontFace: F_TXT, fontSize: 13, align: 'center', valign: 'middle', margin: 0 });
            sl.addText(`Bajas ${K.fmtInt(bajas)}`, { x: tx + wa, y: y + 0.35, w: tw - wa, h: 0.5, fill: { color: 'E6DFD3' }, color: '3D4A52', bold: true, fontFace: F_TXT, fontSize: 13, align: 'center', valign: 'middle', margin: 0 });
            y += 1.0;
          }
          const aperturas = [M, P].filter(Boolean).map(m => ({ m, n: K.aperturasMes(s.id, m.key)?.n })).filter(a => a.n > 0);
          if (aperturas.length > 0) {
            sl.addText(aperturas.map(a => `Ingresos por aperturas ${K.mesLabelFor(a.m)}: ${a.n}`).join('   ·   '), { x: tx, y, w: tw, h: 0.3, fontFace: F_TXT, fontSize: 11, color: C.text2, margin: 0 });
          }
        }

        // 3d. Rotación por regional
        if (rows) {
          const sl = nueva();
          encabezado(sl, `Rotación · ${K.MES_LARGO[M.short]}`, `${s.name} · ${mesTxt} · rotación = ((altas + bajas) / 2) / dotación promedio`, lg);
          // Si alguien asumió la regional este mes, su "mes anterior" es el de quien la tenía
          // (marcado con * y aclarado al pie), así no queda una barra en 0.
          const notas = [];
          const barras = rows.map(r => {
            let p = prevRows?.find(q => q.x === r.x), etiqueta = r.x;
            const rel = !p && prevRows && K.relevosDe(s.id).find(x => x.entrante.matchLabel === r.x);
            if (rel) {
              p = prevRows.find(q => q.x === rel.saliente.matchLabel);
              if (p) { etiqueta = r.x + ' *'; notas.push(`* ${K.mesLabelFor(P)}: regional a cargo de ${rel.saliente.name} (${r.x} asumió en ${mesTxt}).`); }
            }
            return { r, etiqueta, rot: K.rotacionStats([r], null).rot, prev: p ? K.rotacionStats([p], null).rot : null };
          }).sort((a, b) => b.rot - a.rot);
          // Columna izquierda: total de la marca, mes vs. mes anterior
          const diff = rotPrev ? r2(r2(rot.rot) - r2(rotPrev.rot)) : null;
          sl.addText([
            { text: `${K.MES_LARGO[M.short]}\n`, options: { fontSize: 13, color: C.text2 } },
            { text: K.fmtPct(rot.rot), options: { fontSize: 34, bold: true, color: C.text } },
          ], { x: X0, y: 1.5, w: 2.9, h: 1.05, fontFace: F_TXT, margin: 0, valign: 'top' });
          if (rotPrev) {
            sl.addText([
              { text: `${K.MES_LARGO[P.short]}  `, options: { color: C.text2 } },
              { text: K.fmtPct(rotPrev.rot), options: { bold: true, color: C.text2 } },
            ], { x: X0, y: 2.6, w: 2.9, h: 0.35, fontFace: F_TXT, fontSize: 15, margin: 0 });
            const tono = diff > 0 ? [C.bad, C.badBg] : diff < 0 ? [C.good, C.goodBg] : [C.text2, C.sandSoft];
            sl.addText(diff === 0 ? 'Sin cambios' : `${diff > 0 ? '▲ +' : '▼ −'}${Math.abs(diff).toFixed(2).replace('.', ',')} pp vs. ${K.MES_LARGO[P.short].toLowerCase()}`, {
              x: X0, y: 3.05, w: 2.7, h: 0.34, fontFace: F_TXT, fontSize: 11, bold: true, color: tono[0], fill: { color: tono[1] }, align: 'center', valign: 'middle', shape: pptx.ShapeType.roundRect, rectRadius: 0.17, margin: 0,
            });
          }
          sl.addText([
            { text: 'Dotación total\n', options: { fontSize: 11, color: C.text3 } },
            { text: K.fmtInt(rot.dotFin), options: { fontSize: 22, bold: true, color: C.text } },
          ], { x: X0, y: 3.6, w: 2.9, h: 0.8, fontFace: F_TXT, margin: 0, valign: 'top' });
          const series = [{ name: mesTxt, labels: barras.map(b => b.etiqueta), values: barras.map(b => r2(b.rot)) }];
          if (prevRows) series.push({ name: K.mesLabelFor(P), labels: series[0].labels, values: barras.map(b => (b.prev == null ? 0 : r2(b.prev))) });
          sl.addChart(pptx.ChartType.bar, series, {
            x: X0 + 3.1, y: 1.4, w: CW - 3.1, h: 3.05, ...ejes, barDir: 'col', barGrouping: 'clustered', barGapWidthPct: 60,
            chartColors: [acento, C.prev], showValue: true, dataLabelFormatCode: '0.00"%"', dataLabelPosition: 'outEnd',
            valAxisLabelFormatCode: '0"%"', valAxisMinVal: 0, showLegend: !!prevRows, legendPos: 't',
          });
          // Tabla con el detalle por regional
          const head = ['Regional', 'Dot. inicial', 'Dot. final', 'Altas', 'Bajas', `Rot. ${K.mesLabelFor(M)}`, ...(prevRows ? [`Rot. ${K.mesLabelFor(P)}`, 'Var. pp'] : [])];
          const celda = (t, o = {}) => ({ text: String(t), options: { align: 'right', ...o } });
          const varPp = (a, b) => {
            if (b == null) return celda('—', { color: C.text3 });
            const d = r2(r2(a) - r2(b));
            return celda(d === 0 ? '0,00' : `${d > 0 ? '+' : '−'}${Math.abs(d).toFixed(2).replace('.', ',')}`, { color: d > 0 ? C.bad : d < 0 ? C.good : C.text2, bold: true });
          };
          const filas = [
            head.map((h, i) => ({ text: h, options: { bold: true, color: C.white, fill: { color: C.navy }, align: i === 0 ? 'left' : 'right' } })),
            ...barras.map(b => [
              { text: b.etiqueta, options: { align: 'left' } },
              celda(K.fmtInt(b.r.dotIni)), celda(K.fmtInt(b.r.dotFin)), celda(b.r.altas), celda(b.r.bajas),
              celda(K.fmtPct(b.rot), { bold: true }),
              ...(prevRows ? [celda(b.prev == null ? '—' : K.fmtPct(b.prev), { color: C.text2 }), varPp(b.rot, b.prev)] : []),
            ]),
            [
              { text: `Total ${s.name}`, options: { align: 'left', bold: true } },
              celda(K.fmtInt(rot.dotIni), { bold: true }), celda(K.fmtInt(rot.dotFin), { bold: true }), celda(rot.altas, { bold: true }), celda(rot.bajas, { bold: true }),
              celda(K.fmtPct(rot.rot), { bold: true }),
              ...(prevRows ? [celda(K.fmtPct(rotPrev.rot), { bold: true, color: C.text2 }), varPp(rot.rot, rotPrev.rot)] : []),
            ].map(c => ({ ...c, options: { ...c.options, fill: { color: C.sandSoft } } })),
          ];
          const c0 = 2.6, cn = (CW - c0) / (head.length - 1);
          sl.addTable(filas, { x: X0, y: 4.6, w: CW, colW: [c0, ...Array(head.length - 1).fill(cn)], fontFace: F_TXT, fontSize: 10.5, color: C.text, border: { type: 'solid', pt: 0.75, color: C.border }, rowH: 0.3, margin: [0.03, 0.1, 0.03, 0.1] });
          if (notas.length > 0) {
            sl.addText(notas.join('   '), { x: X0, y: 4.6 + 0.3 * filas.length + 0.08, w: CW, h: 0.26, fontFace: F_TXT, fontSize: 9.5, italic: true, color: C.text3, margin: 0 });
          }
        }

        // 3e. Top 5 zonales y locales del mes
        const topZ = K.computeTop5(window.ZONALES_FULL, s.id, [M.key], 'total');
        const topL = K.computeTop5(window.LOCALES_FULL, s.id, [M.key], 'total');
        if (topZ.length > 0 || topL.length > 0) {
          const sl = nueva();
          encabezado(sl, 'Top 5 zonales y locales', `${s.name} · altas de ${mesTxt}`, lg);
          const w = (CW - 0.4) / 2;
          [[topZ, 'Zonales con más altas'], [topL, 'Locales con más altas']].forEach(([top, t], i) => {
            const x = X0 + i * (w + 0.4);
            tituloGrafico(sl, x, 1.5, w, t);
            if (top.length === 0) {
              sl.addText('Sin altas registradas para este mes.', { x, y: 2.0, w, h: 0.4, fontFace: F_TXT, fontSize: 12, color: C.text3, margin: 0 });
              return;
            }
            // En barras horizontales la primera categoría va abajo: se invierten los datos para que
            // el que más altas tiene quede arriba (Google Slides ignora catAxisOrientation).
            const orden = [...top].reverse();
            sl.addChart(pptx.ChartType.bar, [{ name: 'Altas', labels: orden.map(d => d.x), values: orden.map(d => d.y) }], {
              x, y: 1.9, w, h: 4.9, ...ejes, barDir: 'bar', barGapWidthPct: 45,
              chartColors: [acento], showValue: true, dataLabelPosition: 'outEnd', dataLabelFontSize: 11, dataLabelFontBold: true,
              valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLabelFontSize: 11, catAxisLineShow: false,
            });
          });
        }

        // 3e'. Aperturas: altas por mes en locales "Aper" + detalle por local del mes
        const mesesLoc = window.MONTHS.slice(0, monthIdx + 1).filter(m => window.LOCALES_FULL?.[s.id]?.[m.key]);
        const serieAp = mesesLoc.map(m => ({ m, a: K.aperturasMes(s.id, m.key) }));
        if (serieAp.some(p => p.a.n > 0)) {
          const sl = nueva();
          const aM = K.aperturasMes(s.id, M.key);
          const brutasM = md ? K.sumOrPick(K.chartByKind(md.charts, 'gerencia-mes'), null, 'y') : null;
          encabezado(sl, `Aperturas · ${K.MES_LARGO[M.short]}`, `${s.name} · altas en locales cargados como "Aper"${aM && aM.n > 0 && brutasM ? ` · ${mesTxt}: ${K.fmtInt(aM.n)} altas (${Math.round(aM.n / brutasM * 100)}% del total)` : ''}`, lg);
          const informe = serieAp.filter(p => p.a.fuente === 'informe' && p.a.n > 0).map(p => K.mesLabelFor(p.m));
          tituloGrafico(sl, X0, 1.5, 6.6, 'Altas por aperturas por mes', `${K.mesLabelFor(mesesLoc[0])} – ${mesTxt}${informe.length ? ` · ${informe.join(', ')}: total del informe YTD` : ''}`);
          sl.addChart(pptx.ChartType.bar, [{ name: 'Aperturas', labels: serieAp.map(p => K.mesShortXY(p.m)), values: serieAp.map(p => p.a.n) }], {
            x: X0, y: 2.05, w: 6.6, h: 4.85, ...ejes, barDir: 'col', barGapWidthPct: 40, chartColors: [acento],
            showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '#,##0;-#,##0;', // sin "0" en los meses vacíos
            valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLabelFontSize: 9, catAxisLabelRotate: -45,
          });
          const xr = X0 + 7.0, wr = CW - 7.0;
          tituloGrafico(sl, xr, 1.5, wr, `Aperturas de ${mesTxt}`);
          if (aM && aM.locales.length > 0) {
            const orden = [...aM.locales].reverse(); // el de más altas arriba (ver top 5)
            sl.addChart(pptx.ChartType.bar, [{ name: 'Altas', labels: orden.map(z => z.x), values: orden.map(z => z.y) }], {
              x: xr, y: 1.9, w: wr, h: Math.min(4.9, 0.75 + 0.62 * orden.length), ...ejes, barDir: 'bar', barGapWidthPct: 45,
              chartColors: [acento], showValue: true, dataLabelPosition: 'outEnd', dataLabelFontSize: 11, dataLabelFontBold: true,
              valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLabelFontSize: 11, catAxisLineShow: false,
            });
          } else {
            const txt = !aM ? 'Sin datos de altas cargados para este mes.'
              : aM.n > 0 ? `${K.fmtInt(aM.n)} altas por aperturas según el informe YTD (sin detalle por local).`
              : 'Sin aperturas en el mes.';
            sl.addText(txt, { x: xr, y: 2.0, w: wr, h: 0.5, fontFace: F_TXT, fontSize: 12, italic: true, color: C.text3, margin: 0 });
          }
        }

        // 3f. Por regional (solo en el informe de una marca)
        if (marca) await seccionRegionales(s, { sd, acento, lg, md, rows, prevRows, rot, rotPrev });
      }

      // Resumen por regional + 2 diapositivas por cada gerencia a cargo en el mes:
      // KPIs y altas por mes, y top 5 zonales / locales.
      async function seccionRegionales(s, { sd, acento, lg, md, rows, prevRows, rot, rotPrev }) {
        const lista = window.GERENCIAS[s.id] || [];
        const activas = lista.filter(g => K.gerenciaActivaEn(g, monthIdx));
        if (activas.length === 0) return;
        // Quién tenía la regional de g en el mes i (si g la asumió después, su antecesor).
        const aCargo = (g, i) => {
          let p = g;
          for (let n = 0; n < lista.length && p.desde && p.reemplaza && i < K.idxMes(p.desde); n++) p = lista.find(x => x.key === p.reemplaza) || p;
          return p;
        };
        const corto = g => { const w = g.name.split(' '); return `${w[0]} ${w[w.length - 1][0]}.`; };
        const fotos = await Promise.all(activas.map(g => intentar(fotoCuadrada(g.photo))));
        const datos = activas.map((g, i) => {
          // El mes anterior se compara contra quien tenía la regional (ej. Sebastián vs. Ivo en Jul).
          const pm = P ? aCargo(g, monthIdx - 1) : null;
          const ref = pm && pm !== g ? `${K.MES_SHORT_CAP[P.short]} (${corto(pm)})` : 'mes ant.';
          const netas = md ? K.altasNetasMes(sd, M.key, g.matchLabel) : null;
          const netasPrev = P && sd[P.key] ? K.altasNetasMes(sd, P.key, pm.matchLabel) : null;
          const acum = mesesAcum.reduce((a, m) => a + (K.altasNetasMes(sd, m.key, g.matchLabel) || 0), 0);
          const r = K.rotacionStats(rows, g.matchLabel);
          const rp = pm ? K.rotacionStats(prevRows, pm.matchLabel) : null;
          return { g, foto: fotos[i], pm, ref, netas, netasPrev, acum, r, rp };
        });

        // Resumen: altas vs. bajas del mes por regional + tabla comparativa
        {
          const sl = nueva();
          encabezado(sl, 'Resumen por regional', `${s.name} · ${mesLargo} · ${activas.length} regionales`, lg);
          const labels = datos.map(d => d.g.name);
          sl.addChart(pptx.ChartType.bar, [
            { name: `Altas ${mesTxt}`, labels, values: datos.map(d => d.netas || 0) },
            { name: `Bajas ${mesTxt}`, labels, values: datos.map(d => (d.r ? d.r.bajas : 0)) },
          ], {
            x: X0, y: 1.4, w: CW, h: 2.95, ...ejes, barDir: 'col', barGrouping: 'clustered', barGapWidthPct: 70,
            chartColors: [acento, 'C9B79C'], showValue: true, dataLabelPosition: 'outEnd', showLegend: true, legendPos: 't',
            valAxisHidden: true, valGridLine: { style: 'none' },
          });
          const head = ['Regional', `Altas ${mesTxt}`, `Altas ${M.year}`, `Aperturas ${mesTxt}`, `Bajas ${mesTxt}`, `Rotación ${mesTxt}`, P ? `Rotación ${K.mesLabelFor(P)}` : null, P ? 'Var. pp' : null].filter(Boolean);
          const celda = (t, o = {}) => ({ text: String(t ?? 'S/D'), options: { align: 'right', ...o } });
          const varPp = (a, b) => {
            if (a == null || b == null) return celda('—', { color: C.text3 });
            const d = r2(r2(a) - r2(b));
            return celda(d === 0 ? '0,00' : `${d > 0 ? '+' : '−'}${Math.abs(d).toFixed(2).replace('.', ',')}`, { color: d > 0 ? C.bad : d < 0 ? C.good : C.text2, bold: true });
          };
          const notas = [];
          const filas = [
            head.map((h, i) => ({ text: h, options: { bold: true, color: C.white, fill: { color: C.navy }, align: i === 0 ? 'left' : 'right' } })),
            ...datos.map(d => {
              const marcaNota = d.pm && d.pm !== d.g ? ' *' : '';
              if (marcaNota) notas.push(`* ${K.mesLabelFor(P)}: regional a cargo de ${d.pm.name}.`);
              return [
                { text: d.g.name + marcaNota, options: { align: 'left' } },
                celda(K.fmtInt(d.netas)), celda(K.fmtInt(d.acum)), celda(K.fmtInt(K.aperturasMes(s.id, M.key, d.g.matchLabel)?.n)), celda(d.r ? K.fmtInt(d.r.bajas) : null),
                celda(d.r ? K.fmtPct(d.r.rot) : null, { bold: true }),
                ...(P ? [celda(d.rp ? K.fmtPct(d.rp.rot) : '—', { color: C.text2 }), varPp(d.r?.rot, d.rp?.rot)] : []),
              ];
            }),
            [
              { text: `Total ${s.name}`, options: { align: 'left', bold: true } },
              celda(K.fmtInt(md ? K.altasNetasMes(sd, M.key, null) : null), { bold: true }), celda(K.fmtInt(altasAcum(s)), { bold: true }),
              celda(K.fmtInt(K.aperturasMes(s.id, M.key)?.n), { bold: true }),
              celda(rot ? K.fmtInt(rot.bajas) : null, { bold: true }), celda(rot ? K.fmtPct(rot.rot) : null, { bold: true }),
              ...(P ? [celda(rotPrev ? K.fmtPct(rotPrev.rot) : '—', { bold: true, color: C.text2 }), varPp(rot?.rot, rotPrev?.rot)] : []),
            ].map(c => ({ ...c, options: { ...c.options, fill: { color: C.sandSoft } } })),
          ];
          const c0 = 2.8, cn = (CW - c0) / (head.length - 1);
          sl.addTable(filas, { x: X0, y: 4.5, w: CW, colW: [c0, ...Array(head.length - 1).fill(cn)], fontFace: F_TXT, fontSize: 10.5, color: C.text, border: { type: 'solid', pt: 0.75, color: C.border }, rowH: 0.3, margin: [0.03, 0.1, 0.03, 0.1] });
          if (notas.length > 0) {
            sl.addText(notas.join('   '), { x: X0, y: 4.5 + 0.3 * filas.length + 0.06, w: CW, h: 0.24, fontFace: F_TXT, fontSize: 9.5, italic: true, color: C.text3, margin: 0 });
          }
        }

        for (const d of datos) {
          const { g } = d;
          const foto = d.foto ? { data: d.foto, ratio: 1, round: true } : lg;
          const relevo = g.reemplaza && g.desde ? lista.find(x => x.key === g.reemplaza) : null;

          // (a) KPIs + altas por mes de la regional
          {
            const sl = nueva();
            encabezado(sl, g.name, `${g.role} · ${s.name} · ${mesLargo}`, foto);
            const sinRot = { dir: 'neutral', text: 'Sin datos de rotación' };
            filaKpis(sl, 1.5, [
              { label: 'Altas acumuladas', value: K.fmtInt(d.acum), delta: { dir: 'neutral', text: rangoAcum } },
              { label: `Altas — ${mesTxt}`, value: md ? K.fmtInt(d.netas ?? 0) : null, delta: md ? K.deltaInfo(d.netas ?? 0, d.netasPrev, true, d.ref) : { dir: 'neutral', text: 'Sin datos de altas cargados' } },
              { label: `Bajas — ${mesTxt}`, value: d.r ? K.fmtInt(d.r.bajas) : null, delta: d.r ? K.deltaInfo(d.r.bajas, d.rp ? d.rp.bajas : null, true, d.ref) : sinRot },
              tarjetaAperturas([s], g.matchLabel),
              { label: `Rotación — ${mesTxt}`, value: d.r ? K.fmtPct(d.r.rot) : null, delta: d.r ? (K.rotDelta(d.r.rot, d.rp?.rot, d.ref) || { dir: 'neutral', text: `Dotación ${K.fmtInt(d.r.dotIni)} → ${K.fmtInt(d.r.dotFin)}` }) : sinRot },
            ], acento);
            // Serie de la regional: cada mes suma a quien estaba a cargo (ej. Ivo hasta Jul, Sebastián desde Ago).
            const todos = window.MONTHS.slice(0, monthIdx + 1).map((m, i) => ({ m, i })).filter(({ m }) => sd[m.key])
              .map(({ m, i }) => ({ m, v: K.sumOrPick(K.chartByKind(sd[m.key].charts, 'gerencia-mes'), aCargo(g, i).matchLabel, 'y') || 0 }));
            // Arranca en el primer mes con altas (antes la regional figuraba en "Otros").
            const serie = todos.slice(Math.max(0, todos.findIndex(p => p.v > 0)));
            if (serie.length > 1) {
              const sub = relevo
                ? `Regional: ${relevo.name} hasta ${K.mesLabelFor(window.MONTHS[K.idxMes(g.desde) - 1])} · ${g.name} desde ${K.mesLabelFor(window.MONTHS[K.idxMes(g.desde)])}`
                : `${K.mesLabelFor(serie[0].m)} – ${mesTxt} · ingresos antes de descontar no presentes`;
              tituloGrafico(sl, X0, 3.3, CW, 'Altas por mes de la regional', sub);
              sl.addChart(pptx.ChartType.line, [{ name: 'Altas', labels: serie.map(p => K.mesShortXY(p.m)), values: serie.map(p => p.v) }], {
                x: X0, y: 3.8, w: CW, h: 3.15, ...ejes, chartColors: [hex(K.colorGerencia(s.id, g.matchLabel))], lineSize: 2.25, lineDataSymbol: 'circle', lineDataSymbolSize: 7,
                showValue: true, dataLabelPosition: 't', dataLabelFontSize: 8.5,
              });
            }
          }

          // (b) Top 5 zonales y locales de la regional
          const topZ = K.computeTop5(window.ZONALES_FULL, s.id, [M.key], g.matchLabel);
          const topL = K.computeTop5(window.LOCALES_FULL, s.id, [M.key], g.matchLabel);
          if (topZ.length > 0 || topL.length > 0) {
            const sl = nueva();
            encabezado(sl, `Top 5 — ${g.name}`, `Zonales y locales con más altas · ${mesTxt}`, foto);
            const w = (CW - 0.4) / 2;
            [[topZ, 'Zonales con más altas'], [topL, 'Locales con más altas']].forEach(([top, t], i) => {
              const x = X0 + i * (w + 0.4);
              tituloGrafico(sl, x, 1.5, w, t);
              if (top.length === 0) {
                sl.addText('Sin altas registradas para este mes.', { x, y: 2.0, w, h: 0.4, fontFace: F_TXT, fontSize: 12, color: C.text3, margin: 0 });
                return;
              }
              const orden = [...top].reverse(); // el de más altas arriba (ver top 5 de la marca)
              sl.addChart(pptx.ChartType.bar, [{ name: 'Altas', labels: orden.map(z => z.x), values: orden.map(z => z.y) }], {
                x, y: 1.9, w, h: 4.9, ...ejes, barDir: 'bar', barGapWidthPct: 45,
                chartColors: [hex(K.colorGerencia(s.id, g.matchLabel))], showValue: true, dataLabelPosition: 'outEnd', dataLabelFontSize: 11, dataLabelFontBold: true,
                valAxisHidden: true, valGridLine: { style: 'none' }, catAxisLabelFontSize: 11, catAxisLineShow: false,
              });
            });
          }
        }
      }

      // Descarga propia en vez de writeFile(): PptxGenJS libera el archivo a los 100 ms.
      const nombre = marca ? `Informe ${marca.name} por regional - ${mesTxt}.pptx` : `Informe Equipo de Seleccion - ${mesTxt}.pptx`;
      const blob = await categoriasSimples(await pptx.write({ outputType: 'blob' }));
      return descargar(blob, nombre);
    });
  }

  // \u2500\u2500 HTML interactivo de una sola marca \u2500\u2500
  // Un .html aut\u00f3nomo con la vista de la marca (meses, comparaci\u00f3n, gerencias, gr\u00e1ficos) para
  // mandarlo como archivo. Los datos van filtrados a esa marca: la otra no viaja en el archivo.
  // Se compilan las mismas fuentes que carga index.html, con las opciones que Babel usa para
  // los <script type="text/babel">, m\u00e1s la app de informe-marca.jsx. React va adentro
  // (verificado con SRI) para que abra sin internet; si no se puede bajar, queda enlazado a unpkg.
  const FUENTES_HTML = ['charts.jsx', 'sidebar.jsx', 'views.jsx', 'informe-marca.jsx'];
  const REACT_HTML = [
    { src: 'https://unpkg.com/react@18.3.1/umd/react.production.min.js', sri: 'sha384-DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z' },
    { src: 'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js', sri: 'sha384-gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1' },
  ];
  const FUENTES_GOOGLE = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Marcellus&family=Open+Sans:wght@400;500;600;700;800&display=swap';

  async function leerTexto(url, opciones) {
    const r = await fetch(url, opciones);
    if (!r.ok) throw new Error(`No se pudo leer ${url} (${r.status})`);
    return r.text();
  }
  // Un "</script" dentro del c\u00f3digo cerrar\u00eda la etiqueta antes de tiempo.
  const scriptInline = code => `<script>${code.replace(/<\/script/gi, '<\\/script')}</script>`;
  // Sin comentarios: algunos citan datos de ejemplo (nombres de gerentes) de la otra marca.
  const compilar = (src, filename) => window.Babel.transform(src, {
    filename,
    comments: false,
    presets: ['react', 'env'],
    plugins: ['transform-class-properties', 'transform-object-rest-spread', 'transform-flow-strip-types'],
  }).code;

  async function exportarHtml(monthIdx, marcaId) {
    const marca = window.SECTORS.find(s => s.group === 'UNIDADES' && s.id === marcaId);
    if (!marca) throw new Error('Marca desconocida: ' + marcaId);
    const id = marca.id;
    const mesTxt = window.RRHH_CALC.mesLabelFor(window.MONTHS[monthIdx]);

    // Solo lo de esta marca, como copia para no tocar los datos del panel.
    const solo = obj => JSON.parse(JSON.stringify(obj?.[id] != null ? { [id]: obj[id] } : {}));
    const datos = {
      MONTHS: window.MONTHS,
      ACCENTS: window.ACCENTS,
      SECTORS: [{ ...marca }],
      GERENCIAS: solo(window.GERENCIAS),
      ZONALES_FULL: solo(window.ZONALES_FULL),
      LOCALES_FULL: solo(window.LOCALES_FULL),
      APERTURAS: solo(window.APERTURAS),
      ROTACION: solo(window.ROTACION),
      SECTOR_DATA: solo(window.SECTOR_DATA),
      BAJAS_MENSUAL: {}, // es de la empresa total (ambas marcas): no va
    };

    // Logo y fotos adentro del archivo, achicados (mismos recortes que en el PPT).
    const gerencias = datos.GERENCIAS[id] || [];
    const [logoMarca, ...fotos] = await Promise.all([
      intentar(logo(marca.logo)),
      ...gerencias.map(g => intentar(fotoCuadrada(g.photo, 240))),
    ]);
    if (logoMarca) datos.SECTORS[0].logo = logoMarca.data;
    gerencias.forEach((g, i) => { if (fotos[i]) g.photo = fotos[i]; });

    const [css, ...fuentes] = await Promise.all(['styles.css', ...FUENTES_HTML].map(f => leerTexto(f)));
    const libs = await Promise.all(REACT_HTML.map(l => leerTexto(l.src, { integrity: l.sri }).then(
      scriptInline,
      () => `<script src="${l.src}" integrity="${l.sri}" crossorigin="anonymous"></script>`,
    )));

    // JSON como JS: "<" escapado para que ning\u00fan texto cierre el <script>.
    const json = v => JSON.stringify(v).replace(/</g, '\\u003c');
    const generado = new Date().toLocaleDateString('es-AR');
    const datosJs = Object.entries(datos).map(([k, v]) => `window.${k} = ${json(v)};`).join('\n')
      + `\nwindow.INFORME_MARCA = ${json({ marcaId: id, monthIdx, generado })};`;

    const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${marca.name} \u00b7 Equipo de Selecci\u00f3n</title>
<link rel="stylesheet" href="${FUENTES_GOOGLE}" />
<style>
${css}
</style>
</head>
<body>
<div id="root"></div>
${libs.join('\n')}
${scriptInline(datosJs)}
${fuentes.map((src, i) => scriptInline(compilar(src, FUENTES_HTML[i]))).join('\n')}
</body>
</html>
`;
    return descargar(new Blob([html], { type: 'text/html;charset=utf-8' }), `Informe ${marca.name} - ${mesTxt}.html`);
  }

  // ── Botón de la barra superior: ver el informe como página (informe.html, general o por
  // marca con detalle por regional) y descargar el HTML interactivo de una sola marca ──
  function ExportButton({ monthIdx }) {
    const [abierto, setAbierto] = React.useState(false);
    const [estado, setEstado] = React.useState('idle'); // idle | busy | error
    const ref = React.useRef(null);
    const mes = window.RRHH_CALC.mesLabelFor(window.MONTHS[monthIdx]);
    const marcas = window.SECTORS.filter(s => s.group === 'UNIDADES');
    const urlInforme = alcance => `informe.html?${new URLSearchParams({ mes: window.MONTHS[monthIdx].key, alcance })}`;
    const grupos = [
      { formato: 'ver', titulo: `Ver informe · ${mes}`, opciones: [
        { id: 'general', titulo: 'Informe general', sub: 'Ambas marcas · totales', logo: 'assets/logo-equipo-seleccion.png' },
        ...marcas.map(s => ({ id: s.id, titulo: s.name, sub: 'Detalle por regional', logo: s.logo })),
      ] },
      { formato: 'html', titulo: 'Descargar HTML interactivo · una marca', opciones:
        marcas.map(s => ({ id: s.id, titulo: s.name, sub: 'Solo esta marca · se abre en el navegador', logo: s.logo })) },
    ];
    React.useEffect(() => {
      if (!abierto) return;
      const fuera = e => { if (ref.current && !ref.current.contains(e.target)) setAbierto(false); };
      const esc = e => { if (e.key === 'Escape') setAbierto(false); };
      document.addEventListener('pointerdown', fuera);
      document.addEventListener('keydown', esc);
      return () => { document.removeEventListener('pointerdown', fuera); document.removeEventListener('keydown', esc); };
    }, [abierto]);
    async function generar(id) {
      setAbierto(false);
      setEstado('busy');
      try {
        await exportarHtml(monthIdx, id);
        setEstado('idle');
      } catch (e) {
        console.error(e);
        setEstado('error');
        setTimeout(() => setEstado('idle'), 4000);
      }
    }
    const busy = estado === 'busy';
    return (
      <div className="export-menu" ref={ref}>
        <button
          className={'btn btn-primary btn-export' + (busy ? ' is-busy' : '') + (estado === 'error' ? ' is-error' : '')}
          onClick={() => setAbierto(a => !a)}
          disabled={busy}
          aria-haspopup="menu"
          aria-expanded={abierto}
          title={`Informe de ${mes}: verlo como página o descargar el HTML interactivo de una marca`}
        >
          <window.Icon name={busy ? 'refresh' : 'eye'} size={15} />
          <span>{busy ? 'Generando…' : estado === 'error' ? 'No se pudo generar' : 'Ver informe'}</span>
          {!busy && <window.Icon name="chevron-d" size={14} />}
        </button>
        {abierto && (
          <div className="export-pop" role="menu" aria-label={`Informes de ${mes}`}>
            {grupos.map(g => (
              <React.Fragment key={g.formato}>
                <div className="export-pop-head">{g.titulo}</div>
                {g.opciones.map(o => {
                  const contenido = (
                    <>
                      <img src={encodeURI(o.logo)} alt="" />
                      <span className="export-opt-text">
                        <strong>{o.titulo}</strong>
                        <small>{o.sub}</small>
                      </span>
                    </>
                  );
                  // rel="opener": la pestaña nueva hereda la sesión (sessionStorage) y no pide login.
                  // El menú se cierra después del clic: un link que ya no está en la página no abre.
                  return g.formato === 'ver'
                    ? <a key={o.id} role="menuitem" className="export-opt" href={urlInforme(o.id)} target="_blank" rel="opener" onClick={() => setTimeout(() => setAbierto(false))}>{contenido}</a>
                    : <button key={o.id} role="menuitem" className="export-opt" onClick={() => generar(o.id)}>{contenido}</button>;
                })}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  }

  window.exportarPpt = exportarPpt;
  window.exportarHtml = exportarHtml;
  window.ExportButton = ExportButton;
})();
