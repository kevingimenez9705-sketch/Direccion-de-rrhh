// Panel Ejecutivo — landing page. NO data, only sector buttons.
const { useState, useEffect, useRef } = React;

function PanelEjecutivo({ onOpen }) {
  const unidades = window.SECTORS.filter(s => s.group === 'UNIDADES');
  const gestion  = window.SECTORS.filter(s => s.group === 'GESTIÓN');

  return (
    <div>
      <div className="panel-hero">
        <img className="panel-hero-logo" src="assets/logo-equipo-seleccion.png" alt="Equipo de Selección" />
        <h1>Equipo de <span className="he-accent">Selección</span></h1>
      </div>

      <hr className="hero-divider" />

      <div className="section-label">Unidades</div>
      <div className="sector-grid">
        {unidades.map(s => <SectorButton key={s.id} sector={s} onOpen={onOpen} />)}
      </div>

      {gestion.length > 0 && (
        <>
          <div className="section-label">Gestión</div>
          <div className="sector-grid">
            {gestion.map(s => <SectorButton key={s.id} sector={s} onOpen={onOpen} />)}
          </div>
        </>
      )}
    </div>
  );
}
window.PanelEjecutivo = PanelEjecutivo;

function SectorButton({ sector, onOpen }) {
  const accent = window.ACCENTS[sector.accent] || window.ACCENTS.blue;
  return (
    <button
      className="sector-btn"
      style={accent}
      onClick={() => onOpen(sector.id)}
    >
      <div className="sector-btn-head">
        <div className="sector-btn-ico">
          {sector.logo
            ? <img className="sector-btn-logo" src={encodeURI(sector.logo)} alt={sector.name} />
            : <window.Icon name={sector.iconKey} size={20} />}
        </div>
      </div>
      <div>
        <div className="sector-btn-title">{sector.name}</div>
        <div className="sector-btn-sub">{sector.sub}</div>
      </div>
      <div className="sector-btn-cta">
        <span>Ver indicadores</span>
        <window.Icon name="arrow-right" size={16} />
      </div>
    </button>
  );
}
window.SectorButton = SectorButton;

function fmtInt(n) {
  return n == null ? null : n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function chartByKind(charts, matchKind) {
  return (charts || []).find(c => c.matchKind === matchKind);
}

// Suma todos los valores de un chart (matchLabel null = "Total") o busca el
// valor de una gerencia puntual (matchLabel = su matchLabel exacto).
function sumOrPick(chart, matchLabel, valueKey) {
  if (!chart) return null;
  if (matchLabel == null) return chart.data.reduce((a, d) => a + d[valueKey], 0);
  const keyField = valueKey === 'value' ? 'label' : 'x';
  const hit = chart.data.find(d => d[keyField] === matchLabel);
  return hit ? hit[valueKey] : null;
}

// Construye el set de estadísticas (para el Total del sector si matchLabel es
// null, o para una gerencia puntual) a partir de los charts del mes activo y
// del mes anterior — todo calculado en vivo, nada queda "pisado" al cambiar de mes.
function buildStat(sectorData, monthKey, prevMonthKey, matchLabel) {
  const data = sectorData[monthKey];
  const prevData = prevMonthKey ? sectorData[prevMonthKey] : null;
  const altasTotal = sumOrPick(chartByKind(data.charts, 'gerencia-total'), matchLabel, 'value');
  const altasMes = sumOrPick(chartByKind(data.charts, 'gerencia-mes'), matchLabel, 'y');
  const altasMesPrev = prevData ? sumOrPick(chartByKind(prevData.charts, 'gerencia-mes'), matchLabel, 'y') : null;
  const noPresentes = sumOrPick(chartByKind(data.charts, 'no-presentes-gerencia'), matchLabel, 'y');
  const noPresentesPrev = prevData ? sumOrPick(chartByKind(prevData.charts, 'no-presentes-gerencia'), matchLabel, 'y') : null;
  return { altasTotal, altasMes, altasMesPrev, noPresentes, noPresentesPrev };
}

// Texto + dirección de la variación vs. una referencia con nombre propio
// (por defecto "mes ant."; en la comparación de meses se pasa el mes puntual,
// porque ahí la referencia no siempre es el mes calendario anterior).
// invert:true = un aumento es una mala noticia (ej. no presentes) → se pinta como "down"/rojo.
function deltaInfo(cur, prev, invert, refLabel) {
  const ref = refLabel || 'mes ant.';
  if (cur == null) return null;
  if (prev == null) return { dir: 'neutral', text: `Sin dato de ${ref}` };
  const diff = cur - prev;
  if (diff === 0) return { dir: 'neutral', text: `Sin cambios vs. ${ref} (${fmtInt(prev)})` };
  const isMore = diff > 0;
  const dir = invert ? (isMore ? 'down' : 'up') : (isMore ? 'up' : 'down');
  return { dir, text: `${isMore ? '+' : '−'}${fmtInt(Math.abs(diff))} vs. ${ref} (${fmtInt(prev)})` };
}

function GerenciaPicker({ items, selectedKey, onSelect }) {
  return (
    <div className="gerencia-picker">
      {items.map(g => (
        <button
          key={g.key}
          className={'gerencia-btn' + (selectedKey === g.key ? ' active' : '') + (g.isTotal ? ' is-total' : '')}
          onClick={() => onSelect(g.key)}
        >
          <span className={'gerencia-btn-photo' + (g.isTotal ? ' is-logo' : '')}>
            <img src={encodeURI(g.photo)} alt={g.name} />
          </span>
          <span className="gerencia-btn-name">{g.name}</span>
        </button>
      ))}
    </div>
  );
}

// Colores para distinguir hasta 4 meses en modo comparación (barras agrupadas,
// línea de Altas por mes, insignias de la tira de meses).
const COMPARE_COLORS = ['#1D3860', '#1F7A85', '#8B96A6', '#55606E'];
const MAX_COMPARE_MONTHS = 4;

// Tira de meses con scroll horizontal (el rango real son 15 meses) —
// centra automáticamente el mes activo al montar o cambiar de mes.
// En modo comparación permite tildar hasta MAX_COMPARE_MONTHS meses a la vez
// (ej. Mayo 2025 vs Mayo 2026) en vez de un solo mes.
function MonthStrip({ monthIdx, onMonthChange, compareMode, onToggleCompareMode, compareMonthIdxs, onToggleCompareMonth }) {
  const activeRef = useRef(null);
  useEffect(() => {
    if (!compareMode) activeRef.current?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, [monthIdx, compareMode]);

  return (
    <div>
      <div className="month-strip-toolbar">
        <button
          className={'compare-toggle' + (compareMode ? ' active' : '')}
          onClick={onToggleCompareMode}
        >
          <window.Icon name="grid" size={13} />
          {compareMode ? 'Comparando meses' : 'Comparar meses'}
        </button>
        {compareMode && (
          <span className="compare-hint">
            {compareMonthIdxs.length === 0
              ? `Elegí hasta ${MAX_COMPARE_MONTHS} meses (ej. Mayo 2025 vs Mayo 2026)`
              : `${compareMonthIdxs.length}/${MAX_COMPARE_MONTHS} elegidos`}
          </span>
        )}
      </div>
      <div className="month-strip">
        {window.MONTHS.map((m, i) => {
          const compareOrder = compareMode ? compareMonthIdxs.indexOf(i) : -1;
          const isCompareActive = compareOrder !== -1;
          const isActive = compareMode ? isCompareActive : i === monthIdx;
          return (
            <button
              key={m.key}
              ref={!compareMode && i === monthIdx ? activeRef : null}
              className={'month-tab' + (isActive ? ' active' : '')}
              style={isCompareActive ? { background: COMPARE_COLORS[compareOrder], color: 'white' } : undefined}
              onClick={() => compareMode ? onToggleCompareMonth(i) : onMonthChange(i)}
            >
              {isCompareActive && <span className="month-tab-badge">{compareOrder + 1}</span>}
              <div className="month-tab-name">{m.short}</div>
              <div className="month-tab-year" style={isCompareActive ? { color: 'rgba(255,255,255,0.85)' } : undefined}>{m.year}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function mesLabelFor(m) {
  return `${m.short.charAt(0)}${m.short.slice(1).toLowerCase()} ${m.year}`;
}
function pctOf(noPresentes, altasMes) {
  return (altasMes != null && noPresentes != null && altasMes > 0)
    ? Math.round((noPresentes / altasMes) * 1000) / 10
    : null;
}

// ============ Sector detail view ============
function SectorView({ sector, monthIdx, onMonthChange }) {
  const accent = window.ACCENTS[sector.accent] || window.ACCENTS.blue;
  const sectorData = window.SECTOR_DATA[sector.id];
  const gerencias = window.GERENCIAS[sector.id] || [];
  const totalEntry = { key: 'total', isTotal: true, name: `Total ${sector.name}`, role: 'Todas las gerencias', photo: sector.logo };
  const pickerItems = gerencias.length > 0 ? [totalEntry, ...gerencias] : [];
  const [selectedGerenciaKey, setSelectedGerenciaKey] = useState('total');
  const selectedGerencia = pickerItems.find(g => g.key === selectedGerenciaKey) || totalEntry;
  const isTotalSelected = selectedGerencia.isTotal;
  const matchLabel = isTotalSelected ? null : selectedGerencia.matchLabel;

  // ── Comparación de varios meses (ej. Mayo 2025 vs Mayo 2026) ──
  const [compareMode, setCompareMode] = useState(false);
  const [compareMonthIdxs, setCompareMonthIdxs] = useState([]);
  function toggleCompareMode() {
    setCompareMode(m => {
      const next = !m;
      setCompareMonthIdxs(next ? [monthIdx] : []);
      return next;
    });
  }
  function toggleCompareMonth(i) {
    setCompareMonthIdxs(prev => {
      if (prev.includes(i)) return prev.filter(x => x !== i);
      if (prev.length >= MAX_COMPARE_MONTHS) return prev;
      return [...prev, i];
    });
  }
  const sortedCompareIdxs = [...compareMonthIdxs].sort((a, b) => a - b);
  const isComparing = compareMode && sortedCompareIdxs.length >= 2;
  // Mientras se está eligiendo (compareMode con 0-1 meses), se sigue mostrando
  // el último mes tildado como referencia para no dejar la pantalla vacía.
  const effectiveMonthIdx = compareMode && sortedCompareIdxs.length > 0
    ? sortedCompareIdxs[sortedCompareIdxs.length - 1]
    : monthIdx;
  const activeMonth = window.MONTHS[effectiveMonthIdx];

  // Busca datos del mes activo; si no existe, toma el último mes disponible
  const monthKeys = Object.keys(sectorData);
  const data = sectorData[activeMonth.key] || sectorData[monthKeys[monthKeys.length - 1]];
  const prevMonth = effectiveMonthIdx > 0 ? window.MONTHS[effectiveMonthIdx - 1] : null;
  const stat = buildStat(sectorData, activeMonth.key, prevMonth && sectorData[prevMonth.key] ? prevMonth.key : null, matchLabel);
  const altasDelta = deltaInfo(stat.altasMes, stat.altasMesPrev, false);
  const noPresentesDelta = deltaInfo(stat.noPresentes, stat.noPresentesPrev, true);
  const gPct = pctOf(stat.noPresentes, stat.altasMes);
  const mesLabel = mesLabelFor(activeMonth);

  // Datos por columna cuando se está comparando
  const compareStats = isComparing ? sortedCompareIdxs.map(idx => {
    const m = window.MONTHS[idx];
    const mData = sectorData[m.key];
    const s = mData ? buildStat(sectorData, m.key, null, matchLabel) : { altasMes: null, noPresentes: null, altasTotal: null };
    return { idx, month: m, ...s };
  }) : [];

  return (
    <div style={accent}>
      <div className="sector-hero">
        <div className={'sector-hero-ico' + (sector.logo ? ' has-logo' : '')}>
          {sector.logo
            ? <img className="sector-hero-logo" src={encodeURI(sector.logo)} alt={sector.name} />
            : <window.Icon name={sector.iconKey} size={26} stroke={1.6} />}
        </div>
        <h2>{sector.name}</h2>
      </div>

      <div className="section-label" style={{ marginTop: 0 }}>Informe mensual — Elegí un mes</div>
      <MonthStrip
        monthIdx={monthIdx}
        onMonthChange={onMonthChange}
        compareMode={compareMode}
        onToggleCompareMode={toggleCompareMode}
        compareMonthIdxs={compareMonthIdxs}
        onToggleCompareMonth={toggleCompareMonth}
      />

      {pickerItems.length > 0 && (
        <>
          <div className="section-label">Gerencias — elegí una para ver sus gráficos</div>
          <GerenciaPicker items={pickerItems} selectedKey={selectedGerenciaKey} onSelect={setSelectedGerenciaKey} />
        </>
      )}

      {pickerItems.length > 0 && (
        <div className={'gerencia-card' + (isTotalSelected ? ' is-total' : '')}>
          <img className={'gerencia-card-photo' + (isTotalSelected ? ' is-logo' : '')} src={encodeURI(selectedGerencia.photo)} alt={selectedGerencia.name} />
          <div className="gerencia-card-body">
            <div className="gerencia-card-name">{selectedGerencia.name}</div>
            <div className="gerencia-card-role">{selectedGerencia.role}</div>
          </div>
          {!isTotalSelected && (
            <button className="gerencia-card-close" onClick={() => setSelectedGerenciaKey('total')} aria-label="Volver al total">×</button>
          )}
        </div>
      )}

      {isComparing ? (
        <div className="compare-grid">
          {compareStats.map((cs, i) => {
            const prev = i > 0 ? compareStats[i - 1] : null;
            const prevLabel = prev ? mesLabelFor(prev.month) : null;
            const aDelta = prev ? deltaInfo(cs.altasMes, prev.altasMes, false, prevLabel) : null;
            const nDelta = prev ? deltaInfo(cs.noPresentes, prev.noPresentes, true, prevLabel) : null;
            const pct = pctOf(cs.noPresentes, cs.altasMes);
            return (
              <div key={cs.idx} className="compare-col" style={{ borderTopColor: COMPARE_COLORS[i] }}>
                <div className="compare-col-head">
                  <span className="compare-col-dot" style={{ background: COMPARE_COLORS[i] }}></span>
                  {mesLabelFor(cs.month)}
                </div>
                <div className="compare-col-metric">
                  <div className="compare-col-metric-label">Altas</div>
                  <div className="compare-col-metric-value">{fmtInt(cs.altasMes) ?? '0'}</div>
                  {aDelta && <div className={'compare-col-delta ' + aDelta.dir}>{aDelta.text}</div>}
                </div>
                <div className="compare-col-metric">
                  <div className="compare-col-metric-label">No presentes</div>
                  <div className="compare-col-metric-value">{fmtInt(cs.noPresentes) ?? '0'}{pct != null ? ` (${pct}%)` : ''}</div>
                  {nDelta && <div className={'compare-col-delta ' + nDelta.dir}>{nDelta.text}</div>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Cuando hay una gerencia seleccionada, las tarjetas muestran SUS datos
           (acumulado del período + mes activo, con variación vs. el mes anterior)
           en vez de los del sector completo. */
        <div className="kpi-grid">
          {[
            { label: `Altas acumuladas${isTotalSelected ? '' : ' — ' + selectedGerencia.name}`, value: fmtInt(stat.altasTotal) ?? 'S/D' },
            { label: `Altas — ${mesLabel}`, value: fmtInt(stat.altasMes) ?? '0', delta: altasDelta },
            { label: `No presentes — ${mesLabel}`, value: `${fmtInt(stat.noPresentes) ?? '0'}${gPct != null ? ` (${gPct}%)` : ''}`, delta: noPresentesDelta },
          ].map((k, i) => <KpiCard key={i} kpi={k} />)}
        </div>
      )}

      <div className={'chart-grid' + (data.charts.length === 1 ? ' one' : '')}>
        {data.charts.map((c, i) => {
          const filtering = !!c.matchKind && !isTotalSelected;

          if (c.matchKind === 'top5-zonales') {
            const zonalData = window.ZONALES_TOP5?.[sector.id]?.[activeMonth.key]?.[filtering ? selectedGerencia.matchLabel : 'total'] || [];
            return (
              <div key={i} className="chart-card">
                <div className="chart-head">
                  <div className="chart-title">{c.title}{filtering ? ` — ${selectedGerencia.name}` : ''}</div>
                  <div className="chart-sub">{mesLabel}{isComparing ? ' · no se compara entre meses' : ''}</div>
                </div>
                <div className="chart-body">
                  {zonalData.length > 0
                    ? <window.HBarChart data={zonalData} />
                    : <div className="chart-empty">Sin altas registradas para {mesLabel.toLowerCase()}{filtering ? ` en ${selectedGerencia.name}` : ''}.</div>}
                </div>
              </div>
            );
          }

          const barActiveLabel = filtering && (c.matchKind === 'gerencia-mes' || c.matchKind === 'no-presentes-gerencia')
            ? c.data.find(d => d.x === selectedGerencia.matchLabel)?.x
            : undefined;
          const donutActiveLabel = filtering && c.matchKind === 'gerencia-total' ? selectedGerencia.matchLabel : undefined;
          const isComparableBar = isComparing && (c.matchKind === 'gerencia-mes' || c.matchKind === 'no-presentes-gerencia');
          const compareSeries = isComparableBar ? sortedCompareIdxs.map((idx, si) => {
            const m = window.MONTHS[idx];
            const mData = sectorData[m.key];
            const chart = mData ? chartByKind(mData.charts, c.matchKind) : null;
            return { label: mesLabelFor(m), color: COMPARE_COLORS[si], data: chart ? chart.data : [] };
          }) : null;
          return (
            <div key={i} className={'chart-card' + (c.full ? ' chart-card--wide' : '')}>
              <div className="chart-head">
                <div className="chart-title">{c.title}{filtering ? ` — ${selectedGerencia.name}` : ''}</div>
                <div className="chart-sub">{isComparableBar ? 'Comparando meses elegidos' : c.sub}</div>
              </div>
              <div className="chart-body">
                {c.type === 'line'  && <window.LineChart  data={c.data} activeIndex={effectiveMonthIdx < c.data.length ? effectiveMonthIdx : c.data.length - 1} activeIndices={isComparing ? sortedCompareIdxs.filter(idx => idx < c.data.length) : undefined} wide={c.wide} />}
                {c.type === 'bar' && (isComparableBar
                  ? <window.GroupedBarChart series={compareSeries} activeLabel={barActiveLabel} dimOthers={filtering} />
                  : <window.BarChart data={c.data} activeLabel={barActiveLabel} dimOthers={filtering} />)}
                {c.type === 'hbar'  && <window.HBarChart  data={c.data} />}
                {c.type === 'donut' && <window.DonutChart data={c.data} center={c.center} activeLabel={donutActiveLabel} />}
              </div>
            </div>
          );
        })}
      </div>

      {data.details && data.details.length > 0 && (
        <div className="details-stack">
          {data.details.map((d, i) => (
            <DetailAccordion key={d.key} detail={d} activeMonth={activeMonth} defaultOpen={false} />
          ))}
        </div>
      )}
    </div>
  );
}
window.SectorView = SectorView;

function KpiCard({ kpi }) {
  const dir = kpi.delta?.dir;
  return (
    <div className="kpi">
      <div className="kpi-head">
        <div className="kpi-label">{kpi.label}</div>
        <div className="kpi-ico"><window.Icon name="chart" size={14} /></div>
      </div>
      <div className={'kpi-value ' + (kpi.valueClass || '')}>{kpi.value}</div>
      {kpi.delta && (
        <div className={'kpi-delta ' + (dir === 'up' ? 'up' : dir === 'down' ? 'down' : '')}>
          <span className="kpi-delta-arrow">{dir === 'up' ? '▲' : dir === 'down' ? '▼' : '•'}</span>
          <span>{kpi.delta.text}</span>
        </div>
      )}
    </div>
  );
}
window.KpiCard = KpiCard;

// ============ Detail Accordion ============
function DetailAccordion({ detail, activeMonth, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const accent = window.ACCENTS[detail.accent] || window.ACCENTS.blue;
  const monthLabel = activeMonth ? `${activeMonth.short.charAt(0)}${activeMonth.short.slice(1).toLowerCase()} ${activeMonth.year}` : '';

  return (
    <div className={'detail-acc' + (open ? ' open' : '')} style={accent}>
      <button className="detail-acc-head" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="detail-acc-emoji">{detail.iconEmoji || '📄'}</span>
        <span className="detail-acc-title">
          {detail.title}
          {activeMonth ? <span className="detail-acc-month"> — {monthLabel}</span> : null}
        </span>
        <span className="detail-acc-chev"><window.Icon name="chevron-r" size={16} /></span>
      </button>
      {open && (
        <div className="detail-acc-body">
          {detail.type === 'siniestros-report' && <SiniestrosReport groups={detail.groups} />}
          {detail.type === 'table'              && <DetailTable detail={detail} />}
          {detail.type === 'comparativo'        && <DetailComparativo detail={detail} activeMonth={activeMonth} />}
        </div>
      )}
    </div>
  );
}

function SiniestrosReport({ groups }) {
  return (
    <div className="sin-report">
      {groups.map((g, i) => (
        <div key={i} className="sin-group">
          <div className="sin-group-head">
            <span className="sin-group-emoji">🛎️</span>
            <span className="sin-group-text">
              <strong>{g.person}</strong>
              <span className="sin-group-meta"> — {g.local} · {g.tag}</span>
            </span>
          </div>
          <div className="sin-table">
            <div className="sin-row sin-row-head">
              <div>MEDIDA</div>
              <div>RESPONSABLE</div>
              <div style={{ textAlign: 'right' }}>FECHA</div>
            </div>
            {g.rows.map((r, j) => (
              <div key={j} className="sin-row">
                <div className="sin-cell-medida"><span className="sin-tri">▸</span> {r.medida}</div>
                <div className="sin-cell-resp">{r.responsable}</div>
                <div className="sin-cell-fecha">{r.fecha}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DetailTable({ detail }) {
  const gridCols = detail.columns.map(c => c.align === 'right' ? '1fr' : '1.4fr').join(' ');
  return (
    <div className="dt-wrap">
      {detail.topChips && (
        <div className="dt-chips">
          {detail.topChips.map((c, i) => (
            <span key={i} className={'dt-chip dt-chip-' + (c.tone || 'blue')}>
              {c.label}: <strong>{c.value}</strong>
            </span>
          ))}
        </div>
      )}
      <div className="dt-table">
        <div className="dt-row dt-row-head" style={{ gridTemplateColumns: gridCols }}>
          {detail.columns.map((c, i) => (
            <div key={i} style={{ textAlign: c.align || 'left' }}>{c.label}</div>
          ))}
        </div>
        {detail.rows.map((r, i) => (
          <div key={i} className="dt-row" style={{ gridTemplateColumns: gridCols }}>
            {detail.columns.map((c, j) => {
              const v = r[c.key];
              const style = { textAlign: c.align || 'left' };
              if (c.strong) style.fontWeight = 700;
              if (c.color === 'green') style.color = '#2C7E51';
              if (c.badge && c.key === 'tipo') {
                return <div key={j} style={style}><span className={'tipo-badge tipo-' + String(v).toLowerCase()}>{v}</span></div>;
              }
              if (c.key === 'resultado') {
                return <div key={j} style={style}><span className="result-pill result-good">{v}</span></div>;
              }
              return <div key={j} style={style}>{v}</div>;
            })}
          </div>
        ))}
        {detail.totalRow && (
          <div className="dt-row dt-row-total" style={{ gridTemplateColumns: gridCols }}>
            <div style={{ fontWeight: 700, letterSpacing: 0.4 }}>{detail.totalRow.label}</div>
            {detail.columns.slice(1, -1).map((c, i) => (
              <div key={i} style={{ textAlign: 'right' }}>
                {detail.totalRow.extra && i === detail.columns.length - 3 ? detail.totalRow.extra : ''}
              </div>
            ))}
            {!detail.totalRow.chips && (
              <div style={{ textAlign: 'right', fontWeight: 700, color: detail.totalRow.color === 'green' ? '#2C7E51' : 'inherit' }}>
                {detail.totalRow.value}
              </div>
            )}
          </div>
        )}
        {detail.totalRow?.chips && (
          <div className="dt-chips dt-chips-total">
            {detail.totalRow.chips.map((c, i) => (
              <span key={i} className={'dt-chip dt-chip-' + (c.tone || 'blue')}>
                {c.label}: <strong>{c.value}</strong>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DetailComparativo({ detail, activeMonth }) {
  const monthIdx = window.MONTHS.findIndex(m => m === activeMonth);
  const prevMonth = monthIdx > 0 ? window.MONTHS[monthIdx - 1] : window.MONTHS[0];
  const leftLbl  = prevMonth.short;
  const rightLbl = activeMonth ? activeMonth.short : '';
  return (
    <div className="cmp-wrap">
      <div className="cmp-table">
        <div className="cmp-row cmp-row-head">
          <div className="cmp-razon">RAZÓN SOCIAL</div>
          <div className="cmp-side cmp-side-left">
            <div className="cmp-side-label">{leftLbl}</div>
            <div className="cmp-cells">{detail.columns.map((c, i) => <div key={i}>{c}</div>)}</div>
          </div>
          <div className="cmp-side cmp-side-right">
            <div className="cmp-side-label">{rightLbl}</div>
            <div className="cmp-cells">{detail.columns.map((c, i) => <div key={i}>{c}</div>)}</div>
          </div>
        </div>
        {detail.rows.map((r, i) => (
          <div key={i} className="cmp-row">
            <div className="cmp-razon">{r.razon}</div>
            <div className="cmp-side cmp-side-left">
              <div className="cmp-cells">{r.left.map((v, j) => <div key={j}>{v}</div>)}</div>
            </div>
            <div className="cmp-side cmp-side-right">
              <div className="cmp-cells">{r.right.map((v, j) => <div key={j}>{v}</div>)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.DetailAccordion = DetailAccordion;
