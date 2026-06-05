// Panel Ejecutivo — landing page. NO data, only sector buttons.
const { useState } = React;

function PanelEjecutivo({ onOpen }) {
  const unidades = window.SECTORS.filter(s => s.group === 'UNIDADES');
  const gestion  = window.SECTORS.filter(s => s.group === 'GESTIÓN');

  return (
    <div>
      <div className="panel-hero">
        <img className="panel-hero-logo" src="assets/rrhh-logo-clean.png" alt="Dirección de Recursos Humanos" />
        <h1>Dirección de <span className="he-accent">Recursos Humanos</span></h1>
      </div>

      <hr className="hero-divider" />

      <div className="section-label">Unidades</div>
      <div className="sector-grid">
        {unidades.map(s => <SectorButton key={s.id} sector={s} onOpen={onOpen} />)}
      </div>

      <div className="section-label">Gestión</div>
      <div className="sector-grid">
        {gestion.map(s => <SectorButton key={s.id} sector={s} onOpen={onOpen} />)}
      </div>
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

// ============ Sector detail view ============
function SectorView({ sector, monthIdx, onMonthChange }) {
  const accent = window.ACCENTS[sector.accent] || window.ACCENTS.blue;
  const sectorData = window.SECTOR_DATA[sector.id];
  const activeMonth = window.MONTHS[monthIdx];

  // Busca datos del mes activo; si no existe, toma el último mes disponible
  const monthKeys = Object.keys(sectorData);
  const data = sectorData[activeMonth.key] || sectorData[monthKeys[monthKeys.length - 1]];

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
      <div className="month-strip">
        {window.MONTHS.map((m, i) => (
          <button
            key={m.key}
            className={'month-tab' + (i === monthIdx ? ' active' : '')}
            onClick={() => onMonthChange(i)}
          >
            <div className="month-tab-name">{m.short}</div>
            <div className="month-tab-year">{m.year}</div>
          </button>
        ))}
      </div>

      <div className="kpi-grid">
        {data.kpis.map((k, i) => <KpiCard key={i} kpi={k} />)}
      </div>

      <div className={'chart-grid' + (data.charts.length === 1 ? ' one' : '')}>
        {data.charts.map((c, i) => (
          <div key={i} className="chart-card">
            <div className="chart-head">
              <div className="chart-title">{c.title}</div>
              <div className="chart-sub">{c.sub}</div>
            </div>
            <div className="chart-body">
              {c.type === 'line'  && <window.LineChart  data={c.data} activeIndex={monthIdx < c.data.length ? monthIdx : c.data.length - 1} />}
              {c.type === 'bar'   && <window.BarChart   data={c.data} activeLabel={activeMonth && c.data.find(d => d.x.toLowerCase().startsWith(activeMonth.short.slice(0,3).toLowerCase()))?.x} />}
              {c.type === 'hbar'  && <window.HBarChart  data={c.data} />}
              {c.type === 'donut' && <window.DonutChart data={c.data} />}
            </div>
          </div>
        ))}
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
            <div style={{ textAlign: 'right', fontWeight: 700, color: detail.totalRow.color === 'green' ? '#2C7E51' : 'inherit' }}>
              {detail.totalRow.value}
            </div>
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
