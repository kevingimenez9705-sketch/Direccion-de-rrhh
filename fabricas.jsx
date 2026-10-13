// Vista de Fábricas (Recursos Humanos Soft) — réplica del informe "Resultados" de la Gerencia
// Soft con el mismo formato que las marcas: tira de meses (con comparación), selector de áreas
// (en lugar de gerencias), tarjetas y visor de gráficos. Datos: window.FABRICAS (data.js).
// No toca nada de Sabores / Extremas: solo reutiliza los componentes compartidos.
(function () {
  const { useState, useEffect, useRef } = React;
  const K = window.RRHH_CALC;
  const F = window.FABRICAS;
  const AREAS = F.areas;
  const SERIES_TIPO = [
    { key: 'exp', label: 'Expansión', color: '#B97C33' },
    { key: 'rot', label: 'Rotación', color: '#3B66A8' },
  ];

  // Meses con ingresos cargados (índices de window.MONTHS).
  const MESES = window.MONTHS.map((m, i) => ({ m, i })).filter(x => F.ingresos[x.m.key]).map(x => x.i);

  // Ingresos de un mes: de un área (areaKey) o de todas (null). null = mes sin datos.
  function ingresos(monthKey, areaKey) {
    const md = F.ingresos[monthKey];
    if (!md) return null;
    const sel = areaKey ? [md[areaKey] || { exp: 0, rot: 0 }] : Object.values(md);
    const exp = sel.reduce((a, x) => a + x.exp, 0), rot = sel.reduce((a, x) => a + x.rot, 0);
    return { exp, rot, total: exp + rot };
  }
  // Meses del año de "idx" con datos, hasta idx inclusive (acumulado YTD).
  const mesesYtd = idx => MESES.filter(i => i <= idx && window.MONTHS[i].year === window.MONTHS[idx].year);
  // Todos los meses cargados del año de "idx" (gráficos por mes: el elegido queda marcado).
  const mesesAnio = idx => MESES.filter(i => window.MONTHS[i].year === window.MONTHS[idx].year);
  const sumar = (idxs, areaKey) => idxs.reduce((a, i) => {
    const x = ingresos(window.MONTHS[i].key, areaKey);
    return { exp: a.exp + x.exp, rot: a.rot + x.rot, total: a.total + x.total };
  }, { exp: 0, rot: 0, total: 0 });
  const mesCorto = i => K.MES_SHORT_CAP[window.MONTHS[i].short];
  const pct1 = (n, d) => d ? `${(n / d * 100).toFixed(1).replace('.', ',')}%` : '—';
  const pct0 = (n, d) => d ? `${Math.round(n / d * 100)}%` : '—';
  // Mes a mostrar: el elegido si tiene datos; si no, el mes cargado más cercano.
  function mesValido(idx) {
    if (MESES.includes(idx)) return idx;
    return MESES.reduce((best, i) => Math.abs(i - idx) < Math.abs(best - idx) ? i : best, MESES[MESES.length - 1]);
  }

  // ── Tira de meses (solo los meses con datos de Fábricas), con comparación ──
  function FabricaMonthStrip({ monthIdx, onMonthChange, compareMode, onToggleCompareMode, compareMonthIdxs, onToggleCompareMonth }) {
    const activeRef = useRef(null);
    useEffect(() => {
      if (!compareMode) activeRef.current?.scrollIntoView({ inline: 'center', block: 'nearest' });
    }, [monthIdx, compareMode]);
    const { COMPARE_COLORS, MAX_COMPARE_MONTHS } = K;
    return (
      <div>
        <div className="month-strip-toolbar">
          <button className={'compare-toggle' + (compareMode ? ' active' : '')} onClick={onToggleCompareMode}>
            <window.Icon name="grid" size={13} />
            {compareMode ? 'Comparando meses' : 'Comparar meses'}
          </button>
          <span className="compare-hint">
            {compareMode
              ? (compareMonthIdxs.length === 0 ? `Elegí hasta ${MAX_COMPARE_MONTHS} meses` : `${compareMonthIdxs.length}/${MAX_COMPARE_MONTHS} elegidos`)
              : `Datos de ${K.mesLabelFor(window.MONTHS[MESES[0]])} a ${K.mesLabelFor(window.MONTHS[MESES[MESES.length - 1]])}`}
          </span>
        </div>
        <div className="month-strip">
          {MESES.map(i => {
            const m = window.MONTHS[i];
            const order = compareMode ? compareMonthIdxs.indexOf(i) : -1;
            const isCmp = order !== -1;
            const isActive = compareMode ? isCmp : i === monthIdx;
            return (
              <button
                key={m.key}
                ref={!compareMode && i === monthIdx ? activeRef : null}
                className={'month-tab' + (isActive ? ' active' : '')}
                style={isCmp ? { background: COMPARE_COLORS[order], color: 'white' } : undefined}
                onClick={() => compareMode ? onToggleCompareMonth(i) : onMonthChange(i)}
              >
                {isCmp && <span className="month-tab-badge">{order + 1}</span>}
                <div className="month-tab-name">{m.short}</div>
                <div className="month-tab-year" style={isCmp ? { color: 'rgba(255,255,255,0.85)' } : undefined}>{m.year}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Selector de áreas (mismo estilo que el de gerencias: foto del gerente y el área abajo;
  //    las áreas sin gerente cargado muestran su ícono) ──
  function AreaPicker({ items, selectedKey, onSelect }) {
    return (
      <div className="gerencia-picker">
        {items.map(a => (
          <button key={a.key}
            className={'gerencia-btn' + (selectedKey === a.key ? ' active' : '') + (a.isTotal ? ' is-total' : '')}
            onClick={() => onSelect(a.key)}>
            {a.gerente
              ? <span className="gerencia-btn-photo"><img src={encodeURI(a.gerente.photo)} alt={a.gerente.name} /></span>
              : <span className="gerencia-btn-photo is-logo fab-area-ico" style={a.isTotal ? undefined : { color: a.color }}>
                  {a.isTotal ? <img src={encodeURI(a.photo)} alt="" /> : <window.Icon name={a.icon} size={40} stroke={1.6} />}
                </span>}
            <span className="gerencia-btn-name">{a.gerente ? a.gerente.name : a.name}</span>
            {a.gerente && <span className="gerencia-btn-chip">{a.name}</span>}
          </button>
        ))}
      </div>
    );
  }

  // ── Panel "RESULTADOS · YTD": torta por área + ingresos por mes apilados por área ──
  function ResultadosPanel({ monthIdx, areaKey, onSelectArea, activeIdxs }) {
    const ytd = mesesYtd(monthIdx);
    const tot = sumar(ytd, null);
    const pie = AREAS.map(a => ({ label: a.name, short: a.short, value: sumar(ytd, a.key).total, color: a.color })).filter(d => d.value > 0);
    const area = AREAS.find(a => a.key === areaKey);
    const barras = mesesAnio(monthIdx).map(i => {
      const md = F.ingresos[window.MONTHS[i].key];
      return { x: mesCorto(i), parts: Object.fromEntries(AREAS.map(a => [a.key, md[a.key] ? md[a.key].exp + md[a.key].rot : 0])) };
    });
    const rango = `${K.mesLabelFor(window.MONTHS[ytd[0]])} – ${K.mesLabelFor(window.MONTHS[monthIdx])}`;
    return (
      <div className="chart-card chart-card--wide viz-panel">
        <div className="viz-title">Resultados · YTD</div>
        <div className="viz-panel-sub">
          Ingresos {rango}{area ? ` · ${area.name}: ${K.fmtInt(sumar(ytd, area.key).total)} (${pct1(sumar(ytd, area.key).total, tot.total)})` : ''}
        </div>
        <div className="fab-people">
          <window.PeopleRow total={6} filled={3} color="var(--viz-people)" empty="var(--viz-pill-b-icon)" size={26} />
          <span><strong>{K.fmtInt(tot.total)}</strong> ingresos</span>
        </div>
        <div className="fab-dual">
          <div>
            <window.PieChart data={pie} activeLabel={area ? area.name : undefined} valueLabel="ingresos"
              onSelect={label => { const a = AREAS.find(x => x.name === label); if (a) onSelectArea(a.key); }} />
            <div className="viz-legend-note">Acumulado {rango} · tocá una porción para ver esa área</div>
          </div>
          <div>
            <window.StackedBarChart data={barras} series={AREAS.map(a => ({ key: a.key, label: a.name, color: a.color }))}
              highlightKey={areaKey || undefined} activeXs={activeIdxs.map(mesCorto)} onSelect={onSelectArea} />
          </div>
        </div>
      </div>
    );
  }

  // ── Panel "<ÁREA> · YTD": evolución de ingresos + expansión vs. rotación por mes ──
  function AreaPanel({ monthIdx, area, activeIdxs }) {
    const key = area ? area.key : null;
    const ytd = mesesYtd(monthIdx);
    const tot = sumar(ytd, key);
    const anio = mesesAnio(monthIdx);
    const linea = anio.map(i => ({ x: mesCorto(i), y: ingresos(window.MONTHS[i].key, key).total }));
    const barras = anio.map(i => { const x = ingresos(window.MONTHS[i].key, key); return { x: mesCorto(i), parts: { exp: x.exp, rot: x.rot } }; });
    const activos = activeIdxs.map(i => anio.indexOf(i)).filter(p => p >= 0);
    return (
      <div className="chart-card chart-card--wide viz-panel">
        <div className="viz-title">{area ? area.name : 'Todas las áreas'} · YTD</div>
        <div className="viz-panel-sub">
          Ingresos {K.mesLabelFor(window.MONTHS[ytd[0]])} – {K.mesLabelFor(window.MONTHS[monthIdx])} · {K.fmtInt(tot.rot)} por rotación ({pct0(tot.rot, tot.total)}) · {K.fmtInt(tot.exp)} por expansión ({pct0(tot.exp, tot.total)})
        </div>
        <div className="fab-people">
          <window.PeopleRow total={6} filled={3} color="var(--viz-people)" empty="var(--viz-pill-b-icon)" size={26} />
          <span><strong>{K.fmtInt(tot.total)}</strong> ingresos</span>
        </div>
        <div className="fab-dual">
          <div>
            <div className="fab-chart-cap">Ingresos por mes</div>
            {linea.length >= 2
              ? <window.LineChart data={linea} activeIndices={activos} seriesLabel="ingresos" />
              : <div className="chart-empty">Hace falta más de un mes cargado para ver la evolución.</div>}
          </div>
          <div>
            <div className="fab-chart-cap">Expansión y rotación</div>
            <window.StackedBarChart data={barras} series={SERIES_TIPO} activeXs={activeIdxs.map(mesCorto)} />
          </div>
        </div>
      </div>
    );
  }

  // ── Tabla por área y mes (la misma información de los gráficos, en números) ──
  function TablaAreas({ monthIdx, areaKey }) {
    const anio = mesesAnio(monthIdx);
    const total = sumar(anio, null).total;
    const filas = [...AREAS.map(a => ({ a, porMes: anio.map(i => ingresos(window.MONTHS[i].key, a.key)), t: sumar(anio, a.key) }))];
    const tot = { porMes: anio.map(i => ingresos(window.MONTHS[i].key, null)), t: sumar(anio, null) };
    return (
      <div className="chart-card chart-card--wide">
        <div className="chart-head">
          <div className="chart-title">Ingresos por área y por mes</div>
          <div className="chart-sub">{K.mesLabelFor(window.MONTHS[anio[0]])} – {K.mesLabelFor(window.MONTHS[anio[anio.length - 1]])} · rotación / expansión en el total de cada área</div>
        </div>
        <div className="inf-tabla-wrap">
          <table className="inf-tabla">
            <thead>
              <tr>
                <th>Área</th>
                {anio.map(i => <th key={i} className={i === monthIdx ? 'fab-th-on' : ''}>{mesCorto(i)}</th>)}
                <th>Total</th><th>%</th><th>Rotación</th><th>Expansión</th>
              </tr>
            </thead>
            <tbody>
              {filas.map(f => (
                <tr key={f.a.key} className={areaKey === f.a.key ? 'fab-tr-on' : ''}>
                  <td><span className="inf-dot" style={{ background: f.a.color }} />{f.a.name}</td>
                  {f.porMes.map((x, j) => <td key={j} className={x.total === 0 ? 'is-muted' : ''}>{x.total}</td>)}
                  <td className="is-strong">{f.t.total}</td>
                  <td className="is-sub">{pct1(f.t.total, total)}</td>
                  <td>{f.t.rot}</td>
                  <td>{f.t.exp}</td>
                </tr>
              ))}
              <tr className="is-total">
                <td>Total</td>
                {tot.porMes.map((x, j) => <td key={j}>{x.total}</td>)}
                <td>{tot.t.total}</td><td>100%</td><td>{tot.t.rot}</td><td>{tot.t.exp}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function FabricaView({ sector, monthIdx, onMonthChange }) {
    const accent = window.ACCENTS[sector.accent] || window.ACCENTS.blue;
    const [areaKey, setAreaKey] = useState(null); // null = todas las áreas
    const [selDir, setSelDir] = useState(1);

    // ── Comparación de varios meses ──
    const [compareMode, setCompareMode] = useState(false);
    const [compareMonthIdxs, setCompareMonthIdxs] = useState([]);
    const baseIdx = mesValido(monthIdx);
    function toggleCompareMode() {
      setCompareMode(m => {
        const next = !m;
        setCompareMonthIdxs(next ? [baseIdx] : []);
        return next;
      });
    }
    function toggleCompareMonth(i) {
      setCompareMonthIdxs(prev => {
        if (prev.includes(i)) return prev.filter(x => x !== i);
        if (prev.length >= K.MAX_COMPARE_MONTHS) return prev;
        return [...prev, i];
      });
    }
    const sortedCmp = [...compareMonthIdxs].sort((a, b) => a - b);
    const isComparing = compareMode && sortedCmp.length >= 2;
    const mesIdx = compareMode && sortedCmp.length > 0 ? sortedCmp[sortedCmp.length - 1] : baseIdx;
    const mes = window.MONTHS[mesIdx];
    const mesLabel = K.mesLabelFor(mes);
    const prevIdx = MESES[MESES.indexOf(mesIdx) - 1];
    const activeIdxs = isComparing ? sortedCmp : [mesIdx];

    const totalEntry = { key: 'total', isTotal: true, name: 'Todas las áreas', role: 'Recursos Humanos Soft · Fábricas', photo: sector.logo };
    const items = [totalEntry, ...AREAS.map(a => ({ ...a, role: 'Área · Fábricas' }))];
    const selKey = areaKey || 'total';
    const area = AREAS.find(a => a.key === areaKey) || null;
    function elegirArea(key) {
      const k = key === 'total' || key === areaKey ? null : key;
      const desde = items.findIndex(x => x.key === selKey), hacia = items.findIndex(x => x.key === (k || 'total'));
      if (desde >= 0 && hacia >= 0 && hacia !== desde) setSelDir(hacia > desde ? 1 : -1);
      setAreaKey(k);
    }

    // ── Tarjetas ──
    const ytd = mesesYtd(mesIdx);
    const acum = sumar(ytd, areaKey);
    const acumTotal = sumar(ytd, null);
    const cur = ingresos(mes.key, areaKey);
    const prev = prevIdx != null ? ingresos(window.MONTHS[prevIdx].key, areaKey) : null;
    const quien = area ? ` — ${area.name}` : '';
    const mayor = AREAS.map(a => ({ a, n: sumar(ytd, a.key).total })).sort((x, y) => y.n - x.n)[0];
    const kpis = [
      { label: `Ingresos acumulados${quien}`, value: K.fmtInt(acum.total), delta: { dir: 'neutral', text: `${K.mesLabelFor(window.MONTHS[ytd[0]])} – ${mesLabel} · ${ytd.length} ${ytd.length === 1 ? 'mes' : 'meses'}` } },
      { label: `Ingresos — ${mesLabel}`, value: K.fmtInt(cur.total), delta: K.deltaInfo(cur.total, prev ? prev.total : null, true) },
      { label: `Por rotación — ${mesLabel}`, value: K.fmtInt(cur.rot), delta: { dir: 'neutral', text: cur.total ? `${pct0(cur.rot, cur.total)} de los ingresos del mes` : 'Sin ingresos en el mes' } },
      { label: `Por expansión — ${mesLabel}`, value: K.fmtInt(cur.exp), delta: { dir: 'neutral', text: cur.total ? `${pct0(cur.exp, cur.total)} de los ingresos del mes` : 'Sin ingresos en el mes' } },
      area
        ? { label: `Participación${quien}`, value: pct1(acum.total, acumTotal.total), delta: { dir: 'neutral', text: `${K.fmtInt(acum.total)} de ${K.fmtInt(acumTotal.total)} ingresos del año` } }
        : { label: 'Área con más ingresos', value: mayor.a.name, delta: { dir: 'neutral', text: `${K.fmtInt(mayor.n)} ingresos · ${pct1(mayor.n, acumTotal.total)} del año` } },
    ];

    const compareStats = isComparing ? sortedCmp.map(i => ({ i, m: window.MONTHS[i], ...ingresos(window.MONTHS[i].key, areaKey) })) : [];

    const slides = [
      { key: 'ytd', label: 'Resultados · YTD', render: () => (
        <div className="chart-grid one"><ResultadosPanel monthIdx={mesIdx} areaKey={areaKey} onSelectArea={elegirArea} activeIdxs={activeIdxs} /></div>
      ) },
      { key: 'area', label: `${area ? area.name : 'Todas las áreas'} · YTD`, render: () => (
        <div className="chart-grid one"><AreaPanel monthIdx={mesIdx} area={area} activeIdxs={activeIdxs} /></div>
      ) },
      { key: 'tabla', label: 'Tabla por área', render: () => (
        <div className="chart-grid one"><TablaAreas monthIdx={mesIdx} areaKey={areaKey} /></div>
      ) },
    ];

    return (
      <div style={accent}>
        <div className="sector-hero">
          <div className="sector-hero-ico has-logo">
            <img className="sector-hero-logo" src={encodeURI(sector.logo)} alt={sector.name} />
          </div>
          <h2>{sector.name}</h2>
        </div>

        <div className="section-label" style={{ marginTop: 0 }}>Informe mensual — Elegí un mes</div>
        <FabricaMonthStrip
          monthIdx={baseIdx}
          onMonthChange={onMonthChange}
          compareMode={compareMode}
          onToggleCompareMode={toggleCompareMode}
          compareMonthIdxs={compareMonthIdxs}
          onToggleCompareMonth={toggleCompareMonth}
        />

        <div className="section-label">Áreas — elegí una para ver sus gráficos</div>
        <AreaPicker items={items} selectedKey={selKey} onSelect={elegirArea} />

        <div className={'gerencia-card' + (area ? '' : ' is-total')}>
          <span key={'s' + selKey} className={'gc-shine ' + (selDir > 0 ? 'from-left' : 'from-right')} aria-hidden="true" />
          {area && area.gerente
            ? <img key={'f' + selKey} className="gerencia-card-photo gc-photo-in" src={encodeURI(area.gerente.photo)} alt={area.gerente.name} />
            : area
            ? <span key={'f' + selKey} className="gerencia-card-photo is-logo gc-photo-in fab-area-card-ico" style={{ color: area.color }}><window.Icon name={area.icon} size={34} stroke={1.6} /></span>
            : <img key={'f' + selKey} className="gerencia-card-photo is-logo gc-photo-in" src={encodeURI(sector.logo)} alt={sector.name} />}
          <div key={'b' + selKey} className={'gerencia-card-body gc-body-in ' + (selDir > 0 ? 'from-right' : 'from-left')}>
            <div className="gerencia-card-name">{area ? (area.gerente ? area.gerente.name : area.name) : totalEntry.name}</div>
            <div className="gerencia-card-role">{area ? (area.gerente ? `${area.gerente.role} · Fábricas` : 'Área · Fábricas') : totalEntry.role}</div>
          </div>
          {area && <button className="gerencia-card-close" onClick={() => elegirArea('total')} aria-label="Volver a todas las áreas">×</button>}
        </div>

        {isComparing ? (
          <div className="compare-grid">
            {compareStats.map((cs, j) => {
              const p = j > 0 ? compareStats[j - 1] : null;
              const d = p ? K.deltaInfo(cs.total, p.total, true, K.mesLabelFor(p.m)) : null;
              return (
                <div key={cs.i} className="compare-col" style={{ borderTopColor: K.COMPARE_COLORS[j] }}>
                  <div className="compare-col-head">
                    <span className="compare-col-dot" style={{ background: K.COMPARE_COLORS[j] }}></span>
                    {K.mesLabelFor(cs.m)}
                  </div>
                  <div className="compare-col-metric">
                    <div className="compare-col-metric-label">Ingresos</div>
                    <div className="compare-col-metric-value">{K.fmtInt(cs.total)}</div>
                    {d && <div className={'compare-col-delta ' + d.dir}>{d.text}</div>}
                  </div>
                  <div className="compare-col-metric">
                    <div className="compare-col-metric-label">Por rotación</div>
                    <div className="compare-col-metric-value">{K.fmtInt(cs.rot)}</div>
                  </div>
                  <div className="compare-col-metric">
                    <div className="compare-col-metric-label">Por expansión</div>
                    <div className="compare-col-metric-value">{K.fmtInt(cs.exp)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="kpi-grid">
            {kpis.map((k, i) => <window.KpiCard key={i} kpi={k} flashKey={selKey} index={i} />)}
          </div>
        )}

        <window.ChartDeck slides={slides} />
      </div>
    );
  }

  window.FabricaView = FabricaView;
  // Mes que muestra la vista para el mes global elegido (la barra superior muestra este).
  window.fabricasMesValido = mesValido;
})();
