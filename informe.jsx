// Informe del mes como página — la misma información que el PowerPoint (exportar.jsx), para
// verlo en el navegador y pasar el link en vez de un archivo. Usa los cálculos de la pantalla
// (window.RRHH_CALC, en views.jsx) y los gráficos del panel (charts.jsx).
// URL: informe.html?mes=<clave del mes>&alcance=general | <id de marca>. "general" = ambas
// marcas; una marca suma el resumen y el detalle de cada regional (como el PPT por marca).
(function () {
  const K = window.RRHH_CALC;
  const ACENTO = { sabores: '#3F6189', extremas: '#3D5A62' }; // mismos que el PPT
  const COLOR_BAJAS = '#C9B79C';
  const r2 = n => Math.round(n * 100) / 100;
  const unidades = () => window.SECTORS.filter(s => s.group === 'UNIDADES');
  const acentoDe = s => ACENTO[s.id] || '#3F6189';

  // Mes y alcance de la URL; si faltan o no existen: último mes, informe general.
  function leerUrl() {
    const q = new URLSearchParams(window.location.search);
    const i = window.MONTHS.findIndex(m => m.key === q.get('mes'));
    const alcance = unidades().some(s => s.id === q.get('alcance')) ? q.get('alcance') : 'general';
    return { monthIdx: i >= 0 ? i : window.MONTHS.length - 1, alcance };
  }

  function contexto(monthIdx) {
    const M = window.MONTHS[monthIdx], P = window.MONTHS[monthIdx - 1] || null;
    const iniAnio = window.MONTHS.findIndex(m => m.year === M.year);
    const mesesAcum = window.MONTHS.slice(iniAnio, monthIdx + 1);
    const mesTxt = K.mesLabelFor(M);
    return {
      monthIdx, M, P, mesTxt, mesesAcum,
      mesLargo: `${K.MES_LARGO[M.short]} ${M.year}`,
      rangoAcum: `${K.mesLabelFor(mesesAcum[0])} – ${mesTxt} · ${mesesAcum.length} ${mesesAcum.length === 1 ? 'mes' : 'meses'}`,
    };
  }
  const rotRows = (s, m) => (m ? window.ROTACION?.[s.id]?.[m.key] : null) || null;
  const altasAcum = (cx, s, label = null) => cx.mesesAcum.reduce((a, m) => a + (K.altasNetasMes(window.SECTOR_DATA[s.id], m.key, label) || 0), 0);
  // Ingresos del mes antes de descontar no presentes (null = mes sin datos cargados).
  function brutasMes(s, m, label = null) {
    const md = m ? window.SECTOR_DATA[s.id]?.[m.key] : null;
    return md ? K.sumOrPick(K.chartByKind(md.charts, 'gerencia-mes'), label, 'y') : null;
  }
  // "Altas por mes" de una marca, del primer mes cargado hasta el mes del informe.
  const serieAltas = (cx, s) => window.MONTHS.slice(0, cx.monthIdx + 1)
    .filter(m => window.SECTOR_DATA[s.id][m.key])
    .map(m => ({ m, x: K.mesShortXY(m), y: brutasMes(s, m) || 0 }));

  const sinRot = { dir: 'neutral', text: 'Sin datos de rotación' };
  const kpiRotacion = (cx, r, rp, ref = 'mes ant.') => ({
    label: `Rotación — ${cx.mesTxt}`,
    value: r ? K.fmtPct(r.rot) : null,
    delta: r ? (K.rotDelta(r.rot, rp?.rot, ref) || { dir: 'neutral', text: `Dotación ${K.fmtInt(r.dotIni)} → ${K.fmtInt(r.dotFin)}` }) : sinRot,
  });
  // Altas por aperturas del mes, con el % sobre las altas brutas (como la tarjeta del panel).
  function kpiAperturas(cx, sectores, bucket = 'total') {
    const apers = sectores.map(x => K.aperturasMes(x.id, cx.M.key, bucket)).filter(Boolean);
    const a = apers.length === 0 ? null : {
      n: apers.reduce((t, x) => t + x.n, 0),
      locales: apers.flatMap(x => x.locales),
      fuente: apers.some(x => x.locales.length > 0) ? 'locales' : apers.some(x => x.fuente === 'informe') ? 'informe' : 'locales',
    };
    const brutas = sectores.reduce((t, x) => t + (brutasMes(x, cx.M, bucket === 'total' ? null : bucket) || 0), 0);
    return { label: `Aperturas — ${cx.mesTxt}`, value: a ? K.fmtInt(a.n) : null, delta: K.aperturaDelta(a, brutas) };
  }
  const fmtPp = d => (d === 0 ? '0,00' : `${d > 0 ? '+' : '−'}${Math.abs(d).toFixed(2).replace('.', ',')}`);

  // ── Piezas ──
  // Una "hoja" del informe: equivale a una diapositiva del PPT.
  function Hoja({ id, titulo, sub, img, redonda, children }) {
    return (
      <section className="inf-hoja" id={id}>
        <header className="inf-hoja-head">
          {img && <img className={'inf-hoja-img' + (redonda ? ' is-round' : '')} src={encodeURI(img)} alt="" />}
          <div>
            <h2 className="inf-hoja-titulo">{titulo}</h2>
            {sub && <div className="inf-hoja-sub">{sub}</div>}
          </div>
        </header>
        {children}
      </section>
    );
  }
  function Kpis({ items, acento }) {
    return (
      <div className="kpi-grid" style={{ '--accent-color': acento }}>
        {items.map((k, i) => <window.KpiCard key={i} kpi={{ ...k, value: k.value ?? 'S/D' }} index={i} />)}
      </div>
    );
  }
  function Grafico({ titulo, sub, children }) {
    return (
      <div className="inf-graf">
        <div className="chart-head">
          <div className="chart-title">{titulo}</div>
          {sub && <div className="chart-sub">{sub}</div>}
        </div>
        <div className="chart-body">{children}</div>
      </div>
    );
  }
  function VarPp({ a, b }) {
    if (a == null || b == null) return <td className="is-muted">—</td>;
    const d = r2(r2(a) - r2(b));
    return <td className={d > 0 ? 'is-bad' : d < 0 ? 'is-good' : 'is-sub'}>{fmtPp(d)}</td>;
  }
  function Top5({ topZ, topL }) {
    return (
      <div className="inf-dos">
        {[[topZ, 'Zonales con más altas'], [topL, 'Locales con más altas']].map(([top, t]) => (
          <Grafico key={t} titulo={t}>
            {top.length > 0 ? <window.HBarChart data={top} /> : <div className="chart-empty">Sin altas registradas para este mes.</div>}
          </Grafico>
        ))}
      </div>
    );
  }

  // Altas por mes de ambas marcas en un mismo gráfico (el LineChart del panel es de una serie).
  function LineasMarcas({ meses, series }) {
    const W = Math.max(720, meses.length * 62), H = 270, padL = 44, padR = 28, padT = 16, padB = 28;
    const iw = W - padL - padR, ih = H - padT - padB;
    // Eje en números redondos (1, 2, 2,5 o 5 × 10^n), hasta 5 divisiones.
    const top = Math.max(1, ...series.flatMap(s => s.valores)) * 1.05;
    const crudo = top / 5, mag = Math.pow(10, Math.floor(Math.log10(crudo)));
    const paso = [1, 2, 2.5, 5, 10].find(k => k * mag >= crudo) * mag;
    const marcas = Array.from({ length: Math.ceil(top / paso) + 1 }, (_, i) => i * paso);
    const max = marcas[marcas.length - 1];
    const x = i => padL + (meses.length === 1 ? iw / 2 : (i * iw) / (meses.length - 1));
    const y = v => padT + ih - (v / max) * ih;
    return (
      <div>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: 340 }} role="img"
          aria-label={`Altas por mes: ${series.map(s => s.label).join(' y ')}`}>
          {marcas.map(v => (
            <g key={v}>
              <line x1={padL} x2={W - padR} y1={y(v)} y2={y(v)} stroke="#ECE7DF" />
              <text x={padL - 8} y={y(v) + 4} fontSize="10" textAnchor="end" fill="#7A8691">{K.fmtInt(v)}</text>
            </g>
          ))}
          {series.map(s => (
            <g key={s.label}>
              <path d={s.valores.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ')} fill="none" stroke={s.color} strokeWidth="2.4"
                strokeLinejoin="round" strokeLinecap="round" pathLength="1" className="viz-draw" />
              {s.valores.map((v, i) => (
                <circle key={i} cx={x(i)} cy={y(v)} r="4" fill="#FFFFFF" stroke={s.color} strokeWidth="2">
                  <title>{`${s.label} · ${meses[i]}: ${K.fmtInt(v)} altas`}</title>
                </circle>
              ))}
            </g>
          ))}
          {meses.map((m, i) => <text key={m} x={x(i)} y={H - 8} fontSize="11" textAnchor="middle" fill="#7A8691">{m}</text>)}
        </svg>
        <div className="chart-legend">
          {series.map(s => (
            <span key={s.label} className="chart-legend-item">
              <span className="chart-legend-swatch" style={{ background: s.color }}></span>{s.label}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // ── Hojas ──
  function Portada({ cx, marca }) {
    const hoy = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
    const abajo = marca ? [{ src: 'assets/logo-equipo-seleccion.png', alt: 'Equipo de Selección' }] : unidades().map(s => ({ src: s.logo, alt: s.name }));
    return (
      <section className="inf-portada">
        <img className="inf-portada-logo" src={encodeURI(marca ? marca.logo : 'assets/logo-equipo-seleccion.png')} alt="" />
        <h1>{marca ? marca.name : 'Equipo de Selección'}</h1>
        <div className="inf-portada-sub">{marca ? 'Informe por regional' : 'Informe mensual'} · {cx.mesLargo}</div>
        <span className="inf-portada-linea" />
        <div className="inf-portada-marcas">{marca ? 'Equipo de Selección' : unidades().map(s => s.name).join('  ·  ')}</div>
        <div className="inf-portada-logos">{abajo.map(l => <img key={l.src} src={encodeURI(l.src)} alt={l.alt} />)}</div>
        <div className="inf-portada-pie">Datos del panel al {hoy} · Uso interno</div>
      </section>
    );
  }

  function ResumenGeneral({ cx }) {
    const us = unidades();
    const { M, P, mesTxt } = cx;
    let acum = 0, netas = null, netasPrev = null;
    us.forEach(s => {
      const sd = window.SECTOR_DATA[s.id];
      acum += altasAcum(cx, s);
      const n = K.altasNetasMes(sd, M.key, null);
      if (n != null) netas = (netas || 0) + n;
      const np = P ? K.altasNetasMes(sd, P.key, null) : null;
      if (np != null) netasPrev = (netasPrev || 0) + np;
    });
    const bajas = window.BAJAS_MENSUAL[M.key] ?? null;
    const bajasPrev = P ? (window.BAJAS_MENSUAL[P.key] ?? null) : null;
    const rot = K.rotacionStats(us.flatMap(s => rotRows(s, M) || []), null);
    const rotPrev = K.rotacionStats(us.flatMap(s => rotRows(s, P) || []), null);
    // Meses con datos de alguna marca: así las dos líneas comparten el eje aunque una tenga huecos.
    const meses = window.MONTHS.slice(0, cx.monthIdx + 1).filter(m => us.some(s => window.SECTOR_DATA[s.id][m.key]));
    return (
      <Hoja id="resumen" titulo="Resumen general — ambas marcas" sub={`${us.map(s => s.name).join(' · ')} · ${cx.mesLargo}`}>
        <Kpis acento="#3F6189" items={[
          { label: 'Altas acumuladas', value: K.fmtInt(acum), delta: { dir: 'neutral', text: cx.rangoAcum } },
          { label: `Altas — ${mesTxt}`, value: K.fmtInt(netas), delta: K.deltaInfo(netas, netasPrev, true) },
          { label: `Bajas — ${mesTxt}`, value: K.fmtInt(bajas), delta: K.deltaInfo(bajas, bajasPrev, true) },
          kpiAperturas(cx, us),
          kpiRotacion(cx, rot, rotPrev),
        ]} />
        {meses.length > 1 && (
          <Grafico titulo="Altas por mes" sub="Ingresos por mes de cada marca (antes de descontar no presentes)">
            <LineasMarcas meses={meses.map(K.mesShortXY)}
              series={us.map(s => ({ label: s.name, color: acentoDe(s), valores: meses.map(m => brutasMes(s, m) || 0) }))} />
          </Grafico>
        )}
      </Hoja>
    );
  }

  function MarcaResumen({ cx, s }) {
    const { M, P, mesTxt } = cx;
    const sd = window.SECTOR_DATA[s.id], md = sd[M.key];
    const rot = K.rotacionStats(rotRows(s, M), null), rotPrev = K.rotacionStats(rotRows(s, P), null);
    const netas = K.altasNetasMes(sd, M.key, null);
    const netasPrev = P ? K.altasNetasMes(sd, P.key, null) : null;
    const serie = serieAltas(cx, s);
    return (
      <Hoja id={`marca-${s.id}`} titulo={s.name} sub={`Informe mensual · ${cx.mesLargo}`} img={s.logo}>
        <Kpis acento={acentoDe(s)} items={[
          { label: 'Altas acumuladas', value: K.fmtInt(altasAcum(cx, s)), delta: { dir: 'neutral', text: cx.rangoAcum } },
          { label: `Altas — ${mesTxt}`, value: md ? K.fmtInt(netas) : null, delta: md ? K.deltaInfo(netas, netasPrev, true) : { dir: 'neutral', text: 'Sin datos de altas cargados' } },
          { label: `Bajas — ${mesTxt}`, value: rot ? K.fmtInt(rot.bajas) : null, delta: rot ? (rotPrev ? K.deltaInfo(rot.bajas, rotPrev.bajas, true) : { dir: 'neutral', text: 'Sin dato de mes ant.' }) : sinRot },
          kpiAperturas(cx, [s]),
          kpiRotacion(cx, rot, rotPrev),
        ]} />
        {serie.length > 1 && (
          <Grafico titulo="Altas por mes" sub={`${K.mesLabelFor(serie[0].m)} – ${mesTxt} · ingresos antes de descontar no presentes`}>
            <window.LineChart data={serie} wide={serie.length > 8} seriesLabel="altas" />
          </Grafico>
        )}
      </Hoja>
    );
  }

  // Relevo en una regional: aparece durante los 3 meses desde que asume la persona nueva.
  function CambioRegional({ cx, s, r }) {
    const sd = window.SECTOR_DATA[s.id];
    const iDesde = K.idxMes(r.entrante.desde);
    const iHasta = r.saliente.hasta ? K.idxMes(r.saliente.hasta) : iDesde - 1;
    const mH = window.MONTHS[iHasta], mD = window.MONTHS[iDesde];
    const persona = (g, m, etiqueta, on) => {
      const ra = K.rotacionStats(rotRows(s, m), g.matchLabel);
      const altas = altasAcum(cx, s, g.matchLabel);
      return (
        <div className={'inf-persona' + (on ? ' is-on' : '')}>
          <img src={encodeURI(g.photo)} alt="" />
          <div className="inf-persona-tag">{etiqueta}</div>
          <div className="inf-persona-nombre">{g.name}</div>
          <div className="inf-persona-rol">{g.role}</div>
          <div className="inf-persona-dato">Altas {cx.M.year} <strong>{K.fmtInt(altas)}</strong></div>
          {ra && <div className="inf-persona-dato">Rotación {K.mesLabelFor(m)} <strong>{K.fmtPct(ra.rot)}</strong></div>}
          {ra && <div className="inf-persona-dato">Dotación {K.mesLabelFor(m)} <strong>{K.fmtInt(ra.dotIni)} → {K.fmtInt(ra.dotFin)}</strong></div>}
        </div>
      );
    };
    return (
      <Hoja titulo="Cambio de regional" img={s.logo}
        sub={`${s.name} · ${r.entrante.name} asume la regional de ${r.saliente.name} desde ${K.mesLabelFor(mD)}`}>
        <div className="inf-relevo" style={{ '--accent-color': acentoDe(s) }}>
          {persona(r.saliente, mH, `Hasta ${K.mesLabelFor(mH)}`, false)}
          <div className="inf-relevo-mid"><window.Icon name="arrow-right" size={44} stroke={2} /><span>Relevo · {K.mesLabelFor(mD)}</span></div>
          {persona(r.entrante, mD, `Desde ${K.mesLabelFor(mD)}`, true)}
        </div>
      </Hoja>
    );
  }

  // YTD: altas del año por gerencia + altas presentes vs. bajas del mes.
  function MarcaYtd({ cx, s }) {
    const { M, P, mesTxt } = cx;
    const sd = window.SECTOR_DATA[s.id], md = sd[M.key];
    const ytd = window.MONTHS.filter((m, i) => i <= cx.monthIdx && m.year === M.year && sd[m.key]);
    if (ytd.length === 0) return null;
    const totals = {};
    ytd.forEach(m => K.chartByKind(sd[m.key].charts, 'gerencia-mes').data.forEach(d => { totals[d.x] = (totals[d.x] || 0) + d.y; }));
    const orden = [...(window.GERENCIAS[s.id] || []).map(g => g.matchLabel), 'Otros'].filter(l => totals[l] > 0);
    const total = orden.reduce((a, l) => a + totals[l], 0);
    const pie = orden.map(l => ({ label: l, short: K.nombreCorto(l), value: totals[l], color: K.colorGerencia(s.id, l) }));
    const altasMes = brutasMes(s, M);
    const np = md ? K.sumOrPick(K.chartByKind(md.charts, 'no-presentes-gerencia'), null, 'y') : null;
    const presentes = altasMes != null ? altasMes - (np || 0) : null;
    const rot = K.rotacionStats(rotRows(s, M), null);
    const bajas = rot ? rot.bajas : null;
    const aperturas = [M, P].filter(Boolean).map(m => ({ m, n: K.aperturasMes(s.id, m.key)?.n })).filter(a => a.n > 0);
    return (
      <Hoja titulo={`${s.name.split(' ')[0]} · YTD`} img={s.logo}
        sub={`Altas ${K.mesLabelFor(ytd[0])} – ${K.mesLabelFor(ytd[ytd.length - 1])} por gerencia · ${K.fmtInt(total)} ingresos`}>
        <div className="inf-dos">
          <window.PieChart data={pie} />
          <div className="inf-col">
            <div className="inf-tabla-wrap">
              <table className="inf-tabla">
                <thead><tr><th>Gerencia</th><th>Altas</th><th>%</th></tr></thead>
                <tbody>
                  {orden.map(l => (
                    <tr key={l}>
                      <td><span className="inf-dot" style={{ background: K.colorGerencia(s.id, l) }} />{l}</td>
                      <td>{K.fmtInt(totals[l])}</td>
                      <td className="is-sub">{`${(totals[l] / total * 100).toFixed(1).replace('.', ',')}%`}</td>
                    </tr>
                  ))}
                  <tr className="is-total"><td>Total</td><td>{K.fmtInt(total)}</td><td>100%</td></tr>
                </tbody>
              </table>
            </div>
            {presentes != null && bajas != null && presentes + bajas > 0 && (
              <div>
                <div className="inf-mini-titulo">{mesTxt} — altas que se presentaron vs. bajas del mes</div>
                <div className="viz-pill inf-pill">
                  <div className="viz-pill-a" style={{ flexGrow: presentes }}>Altas {K.fmtInt(presentes)}</div>
                  <div className="viz-pill-b" style={{ flexGrow: bajas }}>Bajas {K.fmtInt(bajas)}</div>
                </div>
              </div>
            )}
            {aperturas.length > 0 && (
              <div className="inf-texto">{aperturas.map(a => <div key={a.m.key}>Ingresos por aperturas {K.mesLabelFor(a.m)}: <strong>{a.n}</strong></div>)}</div>
            )}
          </div>
        </div>
      </Hoja>
    );
  }

  function MarcaRotacion({ cx, s }) {
    const { M, P, mesTxt } = cx;
    const rows = rotRows(s, M);
    if (!rows) return null;
    const prevRows = rotRows(s, P);
    const rot = K.rotacionStats(rows, null), rotPrev = K.rotacionStats(prevRows, null);
    // Si alguien asumió la regional este mes, su "mes anterior" es el de quien la tenía
    // (marcado con * y aclarado al pie), así no queda sin comparación.
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
    const diff = rotPrev ? r2(r2(rot.rot) - r2(rotPrev.rot)) : null;
    const bars = barras.map(b => ({
      label: b.etiqueta, short: K.nombreCorto(b.r.x) + (b.etiqueta !== b.r.x ? ' *' : ''), rot: b.rot, prevRot: b.prev,
      dotIni: b.r.dotIni, dotFin: b.r.dotFin, altas: b.r.altas, bajas: b.r.bajas,
    }));
    return (
      <Hoja titulo={`Rotación · ${K.MES_LARGO[M.short]}`} img={s.logo}
        sub={`${s.name} · ${mesTxt} · rotación = ((altas + bajas) / 2) / dotación promedio`}>
        <div className="rot-body">
          <div className="rot-side">
            <div className="rot-month"><window.Icon name="users" size={20} /><span>{K.MES_LARGO[M.short]}</span><strong>{K.fmtPct(rot.rot)}</strong></div>
            {rotPrev && (
              <div className="rot-month is-prev"><window.Icon name="users" size={18} /><span>{K.MES_LARGO[P.short]}</span><strong>{K.fmtPct(rotPrev.rot)}</strong></div>
            )}
            {diff != null && (
              <div className={'rot-delta ' + (diff > 0 ? 'bad' : diff < 0 ? 'good' : '')}>
                {diff !== 0 && <window.TrendArrow dir={diff > 0 ? 'up' : 'down'} />}
                {diff === 0 ? 'Sin cambios' : `${fmtPp(diff)} pp`} vs. {K.MES_LARGO[P.short].toLowerCase()}
              </div>
            )}
            <div className="rot-dot">Dotación total — <strong>{K.fmtInt(rot.dotFin)}</strong></div>
          </div>
          <window.RotacionBars rows={bars} mesLabel={mesTxt} prevLabel={P ? K.mesLabelFor(P) : ''} fmtPct={K.fmtPct} />
        </div>
        <div className="viz-legend-note">
          Barra y número arriba: {mesTxt}{prevRows ? ` · número dentro de la barra: ${K.mesLabelFor(P)}` : ''} · abajo: dotación final de la región
        </div>
        <div className="inf-tabla-wrap">
          <table className="inf-tabla">
            <thead>
              <tr>
                <th>Regional</th><th>Dot. inicial</th><th>Dot. final</th><th>Altas</th><th>Bajas</th><th>Rot. {mesTxt}</th>
                {prevRows && <><th>Rot. {K.mesLabelFor(P)}</th><th>Var. pp</th></>}
              </tr>
            </thead>
            <tbody>
              {barras.map(b => (
                <tr key={b.r.x}>
                  <td>{b.etiqueta}</td>
                  <td>{K.fmtInt(b.r.dotIni)}</td><td>{K.fmtInt(b.r.dotFin)}</td><td>{b.r.altas}</td><td>{b.r.bajas}</td>
                  <td className="is-strong">{K.fmtPct(b.rot)}</td>
                  {prevRows && <><td className="is-sub">{b.prev == null ? '—' : K.fmtPct(b.prev)}</td><VarPp a={b.rot} b={b.prev} /></>}
                </tr>
              ))}
              <tr className="is-total">
                <td>Total {s.name}</td>
                <td>{K.fmtInt(rot.dotIni)}</td><td>{K.fmtInt(rot.dotFin)}</td><td>{rot.altas}</td><td>{rot.bajas}</td>
                <td>{K.fmtPct(rot.rot)}</td>
                {prevRows && <><td className="is-sub">{K.fmtPct(rotPrev.rot)}</td><VarPp a={rot.rot} b={rotPrev.rot} /></>}
              </tr>
            </tbody>
          </table>
        </div>
        {notas.length > 0 && <p className="inf-nota">{notas.join('   ')}</p>}
      </Hoja>
    );
  }

  function MarcaTop5({ cx, s }) {
    const topZ = K.computeTop5(window.ZONALES_FULL, s.id, [cx.M.key], 'total');
    const topL = K.computeTop5(window.LOCALES_FULL, s.id, [cx.M.key], 'total');
    if (topZ.length === 0 && topL.length === 0) return null;
    return (
      <Hoja titulo="Top 5 zonales y locales" sub={`${s.name} · altas de ${cx.mesTxt}`} img={s.logo}>
        <Top5 topZ={topZ} topL={topL} />
      </Hoja>
    );
  }

  // Aperturas: altas por mes en locales "Aper" + detalle por local del mes.
  function MarcaAperturas({ cx, s }) {
    const { M, mesTxt } = cx;
    const mesesLoc = window.MONTHS.slice(0, cx.monthIdx + 1).filter(m => window.LOCALES_FULL?.[s.id]?.[m.key]);
    const serieAp = mesesLoc.map(m => ({ m, a: K.aperturasMes(s.id, m.key) }));
    if (!serieAp.some(p => p.a.n > 0)) return null;
    const aM = K.aperturasMes(s.id, M.key);
    const brutasM = brutasMes(s, M);
    const informe = serieAp.filter(p => p.a.fuente === 'informe' && p.a.n > 0).map(p => K.mesLabelFor(p.m));
    const sinDetalle = !aM ? 'Sin datos de altas cargados para este mes.'
      : aM.n > 0 ? `${K.fmtInt(aM.n)} altas por aperturas según el informe YTD (sin detalle por local).`
      : 'Sin aperturas en el mes.';
    return (
      <Hoja titulo={`Aperturas · ${K.MES_LARGO[M.short]}`} img={s.logo}
        sub={`${s.name} · altas en locales cargados como "Aper"${aM && aM.n > 0 && brutasM ? ` · ${mesTxt}: ${K.fmtInt(aM.n)} altas (${Math.round(aM.n / brutasM * 100)}% del total)` : ''}`}>
        <div className="inf-dos">
          <Grafico titulo="Altas por aperturas por mes"
            sub={`${K.mesLabelFor(mesesLoc[0])} – ${mesTxt}${informe.length ? ` · ${informe.join(', ')}: total del informe YTD` : ''}`}>
            <window.BarChart data={serieAp.map(p => ({ x: K.mesShortXY(p.m), y: p.a.n }))} activeLabel={K.mesShortXY(M)} hideZero />
          </Grafico>
          <Grafico titulo={`Aperturas de ${mesTxt}`}>
            {aM && aM.locales.length > 0 ? <window.HBarChart data={aM.locales} /> : <div className="chart-empty">{sinDetalle}</div>}
          </Grafico>
        </div>
      </Hoja>
    );
  }

  // Regionales a cargo en el mes, con quién tenía cada una el mes anterior (para comparar).
  function datosRegionales(cx, s) {
    const { M, P } = cx;
    const sd = window.SECTOR_DATA[s.id], md = sd[M.key];
    const lista = window.GERENCIAS[s.id] || [];
    const rows = rotRows(s, M), prevRows = rotRows(s, P);
    // Quién tenía la regional de g en el mes i (si g la asumió después, su antecesor).
    const aCargo = (g, i) => {
      let p = g;
      for (let n = 0; n < lista.length && p.desde && p.reemplaza && i < K.idxMes(p.desde); n++) p = lista.find(x => x.key === p.reemplaza) || p;
      return p;
    };
    const corto = g => { const w = g.name.split(' '); return `${w[0]} ${w[w.length - 1][0]}.`; };
    return lista.filter(g => K.gerenciaActivaEn(g, cx.monthIdx)).map(g => {
      const pm = P ? aCargo(g, cx.monthIdx - 1) : null;
      return {
        g, pm, aCargo, lista,
        ref: pm && pm !== g ? `${K.MES_SHORT_CAP[P.short]} (${corto(pm)})` : 'mes ant.',
        netas: md ? K.altasNetasMes(sd, M.key, g.matchLabel) : null,
        netasPrev: P && sd[P.key] ? K.altasNetasMes(sd, P.key, pm.matchLabel) : null,
        acum: altasAcum(cx, s, g.matchLabel),
        r: K.rotacionStats(rows, g.matchLabel),
        rp: pm ? K.rotacionStats(prevRows, pm.matchLabel) : null,
      };
    });
  }

  function Regionales({ cx, s }) {
    const { M, P, mesTxt } = cx;
    const datos = datosRegionales(cx, s);
    if (datos.length === 0) return null;
    const sd = window.SECTOR_DATA[s.id], md = sd[M.key];
    const rot = K.rotacionStats(rotRows(s, M), null), rotPrev = K.rotacionStats(rotRows(s, P), null);
    const notas = datos.filter(d => d.pm && d.pm !== d.g).map(d => `* ${K.mesLabelFor(P)}: regional a cargo de ${d.pm.name}.`);
    return (
      <>
        <Hoja id={`regionales-${s.id}`} titulo="Resumen por regional" sub={`${s.name} · ${cx.mesLargo} · ${datos.length} regionales`} img={s.logo}>
          <window.GroupedBarChart series={[
            { label: `Altas ${mesTxt}`, color: acentoDe(s), data: datos.map(d => ({ x: d.g.name, y: d.netas || 0 })) },
            { label: `Bajas ${mesTxt}`, color: COLOR_BAJAS, data: datos.map(d => ({ x: d.g.name, y: d.r ? d.r.bajas : 0 })) },
          ]} />
          <div className="inf-tabla-wrap">
            <table className="inf-tabla">
              <thead>
                <tr>
                  <th>Regional</th><th>Altas {mesTxt}</th><th>Altas {M.year}</th><th>Aperturas {mesTxt}</th><th>Bajas {mesTxt}</th><th>Rotación {mesTxt}</th>
                  {P && <><th>Rotación {K.mesLabelFor(P)}</th><th>Var. pp</th></>}
                </tr>
              </thead>
              <tbody>
                {datos.map(d => (
                  <tr key={d.g.key}>
                    <td><a href={`#regional-${d.g.key}`}>{d.g.name}</a>{d.pm && d.pm !== d.g ? ' *' : ''}</td>
                    <td>{K.fmtInt(d.netas) ?? 'S/D'}</td><td>{K.fmtInt(d.acum)}</td>
                    <td>{K.fmtInt(K.aperturasMes(s.id, M.key, d.g.matchLabel)?.n) ?? 'S/D'}</td>
                    <td>{d.r ? K.fmtInt(d.r.bajas) : 'S/D'}</td>
                    <td className="is-strong">{d.r ? K.fmtPct(d.r.rot) : 'S/D'}</td>
                    {P && <><td className="is-sub">{d.rp ? K.fmtPct(d.rp.rot) : '—'}</td><VarPp a={d.r?.rot} b={d.rp?.rot} /></>}
                  </tr>
                ))}
                <tr className="is-total">
                  <td>Total {s.name}</td>
                  <td>{K.fmtInt(md ? K.altasNetasMes(sd, M.key, null) : null) ?? 'S/D'}</td><td>{K.fmtInt(altasAcum(cx, s))}</td>
                  <td>{K.fmtInt(K.aperturasMes(s.id, M.key)?.n) ?? 'S/D'}</td>
                  <td>{rot ? K.fmtInt(rot.bajas) : 'S/D'}</td><td>{rot ? K.fmtPct(rot.rot) : 'S/D'}</td>
                  {P && <><td className="is-sub">{rotPrev ? K.fmtPct(rotPrev.rot) : '—'}</td><VarPp a={rot?.rot} b={rotPrev?.rot} /></>}
                </tr>
              </tbody>
            </table>
          </div>
          {notas.length > 0 && <p className="inf-nota">{notas.join('   ')}</p>}
        </Hoja>
        {datos.map(d => <Regional key={d.g.key} cx={cx} s={s} d={d} />)}
      </>
    );
  }

  // Dos hojas por regional: KPIs y altas por mes, y top 5 zonales / locales.
  function Regional({ cx, s, d }) {
    const { M, mesTxt } = cx;
    const { g, lista, aCargo } = d;
    const sd = window.SECTOR_DATA[s.id], md = sd[M.key];
    const relevo = g.reemplaza && g.desde ? lista.find(x => x.key === g.reemplaza) : null;
    // Cada mes suma a quien estaba a cargo (ej. Ivo hasta Jul, Sebastián desde Ago); la serie
    // arranca en el primer mes con altas (antes la regional figuraba en "Otros").
    const todos = window.MONTHS.slice(0, cx.monthIdx + 1).map((m, i) => ({ m, i })).filter(({ m }) => sd[m.key])
      .map(({ m, i }) => ({ m, x: K.mesShortXY(m), y: brutasMes(s, m, aCargo(g, i).matchLabel) || 0 }));
    const serie = todos.slice(Math.max(0, todos.findIndex(p => p.y > 0)));
    const topZ = K.computeTop5(window.ZONALES_FULL, s.id, [M.key], g.matchLabel);
    const topL = K.computeTop5(window.LOCALES_FULL, s.id, [M.key], g.matchLabel);
    return (
      <>
        <Hoja id={`regional-${g.key}`} titulo={g.name} sub={`${g.role} · ${s.name} · ${cx.mesLargo}`} img={g.photo} redonda>
          <Kpis acento={acentoDe(s)} items={[
            { label: 'Altas acumuladas', value: K.fmtInt(d.acum), delta: { dir: 'neutral', text: cx.rangoAcum } },
            { label: `Altas — ${mesTxt}`, value: md ? K.fmtInt(d.netas ?? 0) : null, delta: md ? K.deltaInfo(d.netas ?? 0, d.netasPrev, true, d.ref) : { dir: 'neutral', text: 'Sin datos de altas cargados' } },
            { label: `Bajas — ${mesTxt}`, value: d.r ? K.fmtInt(d.r.bajas) : null, delta: d.r ? K.deltaInfo(d.r.bajas, d.rp ? d.rp.bajas : null, true, d.ref) : sinRot },
            kpiAperturas(cx, [s], g.matchLabel),
            kpiRotacion(cx, d.r, d.rp, d.ref),
          ]} />
          {serie.length > 1 && (
            <Grafico titulo="Altas por mes de la regional"
              sub={relevo
                ? `Regional: ${relevo.name} hasta ${K.mesLabelFor(window.MONTHS[K.idxMes(g.desde) - 1])} · ${g.name} desde ${K.mesLabelFor(window.MONTHS[K.idxMes(g.desde)])}`
                : `${K.mesLabelFor(serie[0].m)} – ${mesTxt} · ingresos antes de descontar no presentes`}>
              <window.LineChart data={serie} wide={serie.length > 8} seriesLabel="altas" />
            </Grafico>
          )}
        </Hoja>
        {(topZ.length > 0 || topL.length > 0) && (
          <Hoja titulo={`Top 5 — ${g.name}`} sub={`Zonales y locales con más altas · ${mesTxt}`} img={g.photo} redonda>
            <Top5 topZ={topZ} topL={topL} />
          </Hoja>
        )}
      </>
    );
  }

  function Marca({ cx, s, detalle }) {
    // El cambio de regional se muestra los 3 meses desde que asume la persona nueva.
    const relevos = K.relevosDe(s.id).filter(r => {
      const i = K.idxMes(r.entrante.desde);
      return cx.monthIdx >= i && cx.monthIdx <= i + 2;
    });
    return (
      <>
        <MarcaResumen cx={cx} s={s} />
        {relevos.map(r => <CambioRegional key={r.entrante.key} cx={cx} s={s} r={r} />)}
        <MarcaYtd cx={cx} s={s} />
        <MarcaRotacion cx={cx} s={s} />
        <MarcaTop5 cx={cx} s={s} />
        <MarcaAperturas cx={cx} s={s} />
        {detalle && <Regionales cx={cx} s={s} />}
      </>
    );
  }

  // ── Página ──
  function InformeMes() {
    const [{ monthIdx, alcance }, setSel] = React.useState(leerUrl);
    const [ppt, setPpt] = React.useState('idle'); // idle | busy | error
    const us = unidades();
    const marca = us.find(s => s.id === alcance) || null;
    const cx = contexto(monthIdx);
    const titulo = `${marca ? `${marca.name} por regional` : 'Informe general'} · ${cx.mesTxt}`;

    // La URL sigue a lo elegido: el link copiado abre este mismo informe.
    React.useEffect(() => {
      const q = new URLSearchParams({ mes: cx.M.key, alcance });
      window.history.replaceState(null, '', `${window.location.pathname}?${q}`);
      document.title = `${titulo} · Equipo de Selección`;
    }, [monthIdx, alcance]);

    async function bajarPpt() {
      setPpt('busy');
      try {
        await window.exportarPpt(monthIdx, alcance);
        setPpt('idle');
      } catch (e) {
        console.error(e);
        setPpt('error');
        setTimeout(() => setPpt('idle'), 4000);
      }
    }

    const regionales = marca ? datosRegionales(cx, marca) : [];
    const indice = marca
      ? [{ id: `marca-${marca.id}`, t: marca.name },
         ...(regionales.length > 0 ? [{ id: `regionales-${marca.id}`, t: 'Resumen por regional' }] : []),
         ...regionales.map(d => ({ id: `regional-${d.g.key}`, t: d.g.name }))]
      : [{ id: 'resumen', t: 'Resumen general' }, ...us.map(s => ({ id: `marca-${s.id}`, t: s.name }))];

    return (
      <div className="app no-sidebar">
        <main className="main informe" data-screen-label={titulo}>
          <div className="topbar inf-topbar">
            <div className="topbar-left">
              <a className="back-btn" href="index.html" title="Ir al Panel ejecutivo">
                <window.Icon name="arrow-left" size={18} />
                <span>Panel ejecutivo</span>
              </a>
              <div className="crumbs">
                <span>Equipo de Selección</span>
                <span className="crumb-sep">›</span>
                <span className="crumb-here">{titulo}</span>
              </div>
            </div>
            <div className="topbar-actions">
              <select className="btn inf-select" value={alcance} aria-label="Informe"
                onChange={e => setSel({ monthIdx, alcance: e.target.value })}>
                <option value="general">Informe general</option>
                {us.map(s => <option key={s.id} value={s.id}>{s.name} · por regional</option>)}
              </select>
              <select className="btn inf-select" value={monthIdx} aria-label="Mes"
                onChange={e => setSel({ monthIdx: Number(e.target.value), alcance })}>
                {window.MONTHS.map((m, i) => ({ m, i })).reverse().map(({ m, i }) => <option key={m.key} value={i}>{K.mesLabelFor(m)}</option>)}
              </select>
              <button className="btn btn-ghost" onClick={() => window.print()} title="Imprimir o guardar como PDF">
                <window.Icon name="printer" size={15} />
                <span>Imprimir / PDF</span>
              </button>
              <button className={'btn btn-ghost btn-export' + (ppt === 'busy' ? ' is-busy' : '') + (ppt === 'error' ? ' is-error' : '')}
                onClick={bajarPpt} disabled={ppt === 'busy'} title="Descargar este informe como PowerPoint (gráficos editables)">
                <window.Icon name={ppt === 'busy' ? 'refresh' : 'download'} size={15} />
                <span>{ppt === 'busy' ? 'Generando…' : ppt === 'error' ? 'No se pudo generar' : 'PPT'}</span>
              </button>
            </div>
          </div>

          <nav className="inf-nav" aria-label="Secciones del informe">
            {indice.map(x => <a key={x.id} href={`#${x.id}`}>{x.t}</a>)}
          </nav>

          <Portada cx={cx} marca={marca} />
          {!marca && <ResumenGeneral cx={cx} />}
          {(marca ? [marca] : us).map(s => <Marca key={s.id} cx={cx} s={s} detalle={!!marca} />)}
        </main>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<InformeMes />);
})();
