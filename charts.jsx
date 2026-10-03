// Chart components — minimal SVG, themed to match the dashboard
// Exposes: window.LineChart, window.BarChart, window.HBarChart, window.DonutChart

function chartTheme() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  return dark ? {
    blue: '#47699C',
    blueDark: '#6E8CBB',
    grid: '#232C3C',
    axis: '#6C7789',
    ink: '#E5E9F1',
    inkSub: '#A7B0C0',
    tooltipBg: '#0A0E17',
  } : {
    // Tema "Editorial": azul acero para las marcas, navy para destacados, grilla arena.
    blue: '#3F6189',
    blueDark: '#3F6189',
    grid: '#ECE7DF',
    axis: '#7A8691',
    ink: '#22303C',
    inkSub: '#7A8691',
    tooltipBg: '#2B3A4A',
  };
}

// --- tooltip compartido --- //
// Un único div posicionado dentro del contenedor del gráfico. El contenido se arma
// con nodos de React (texto escapado), nunca con innerHTML.
function useChartTip() {
  const wrapRef = React.useRef(null);
  const [tip, setTip] = React.useState(null);
  // Posición en px relativa al contenedor; viene del puntero o, con teclado, del elemento enfocado.
  function show(evt, content) {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    let x, y;
    if (evt.type === 'focus' || evt.clientX == null) {
      const b = evt.currentTarget.getBoundingClientRect();
      x = b.left + b.width / 2 - r.left; y = b.top - r.top;
    } else {
      x = evt.clientX - r.left; y = evt.clientY - r.top;
    }
    setTip({ x, y, w: r.width, ...content });
  }
  function showAt(x, y, content) {
    const wrap = wrapRef.current;
    if (!wrap) return;
    setTip({ x, y, w: wrap.getBoundingClientRect().width, ...content });
  }
  return { wrapRef, tip, show, showAt, hide: () => setTip(null) };
}

function ChartTip({ tip }) {
  if (!tip) return null;
  const flip = tip.x > tip.w * 0.6;
  return (
    <div className="viz-tip" style={{ left: tip.x, top: tip.y, transform: `translate(${flip ? 'calc(-100% - 12px)' : '12px'}, calc(-100% - 10px))` }}>
      {tip.title && <div className="viz-tip-title">{tip.title}</div>}
      {(tip.rows || []).map((r, i) => (
        <div key={i} className="viz-tip-row">
          {r.color && <span className="viz-tip-key" style={{ background: r.color }} />}
          <span className="viz-tip-value">{r.value}</span>
          {r.label && <span className="viz-tip-label">{r.label}</span>}
        </div>
      ))}
    </div>
  );
}

// Clave que cambia con los datos: al remontar el SVG se repiten las animaciones de entrada.
const dataKey = data => JSON.stringify(data);
const fmtMiles = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// --- helpers --- //
function niceMax(max) {
  if (max <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const norm = max / pow;
  let n;
  if (norm <= 1) n = 1;
  else if (norm <= 2) n = 2;
  else if (norm <= 5) n = 5;
  else n = 10;
  return n * pow;
}
function ticks(max, count = 5) {
  const step = max / count;
  const arr = [];
  for (let i = 0; i <= count; i++) arr.push(Math.round(step * i));
  return arr;
}

// ============ Line chart ============
function LineChart({ data, activeIndex, activeIndices, wide, seriesLabel = '' }) {
  const t = chartTheme();
  const { wrapRef, tip, showAt, hide } = useChartTip();
  const [hi, setHi] = React.useState(null);
  // activeIndices (comparación de varios meses) tiene prioridad sobre activeIndex (mes único).
  const actives = activeIndices && activeIndices.length ? activeIndices : (activeIndex != null ? [activeIndex] : []);
  // "wide": series largas (ej. 15 meses) piden más ancho por punto para que
  // las etiquetas del eje X no se amontonen.
  const W = wide ? Math.max(900, data.length * 65) : 560;
  const H = wide ? 260 : 220;
  const padL = 44, padR = 26, padT = 16, padB = 26; // padR: que la última etiqueta del eje X ("Sep 26") no se corte
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const ys = data.map(d => d.y);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);
  const span = Math.max(yMax - yMin, 1);
  const padY = span * 0.6;
  // Cantidades y % no van por debajo de 0: el eje arranca en 0 si los datos son positivos.
  const yLo = yMin >= 0 ? Math.max(0, Math.floor(yMin - padY)) : Math.floor(yMin - padY);
  const yHi = Math.ceil(yMax + padY);
  const yRange = yHi - yLo;

  const xStep = innerW / (data.length - 1);
  const pts = data.map((d, i) => ({
    x: padL + i * xStep,
    y: padT + (1 - (d.y - yLo) / yRange) * innerH,
    d,
    i,
  }));

  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${path} L${pts[pts.length-1].x},${padT+innerH} L${pts[0].x},${padT+innerH} Z`;

  const tickCount = 5;
  const yTicks = [];
  for (let i = 0; i <= tickCount; i++) {
    const v = yLo + (yRange * i) / tickCount;
    yTicks.push({ v: Math.round(v), y: padT + (1 - i / tickCount) * innerH });
  }

  // Crosshair: el puntero busca el mes más cercano (no hace falta apuntarle al punto).
  function onMove(e) {
    const svg = e.currentTarget.ownerSVGElement;
    const r = svg.getBoundingClientRect();
    const scale = r.width / W;
    const vx = (e.clientX - r.left) / scale;
    const i = Math.max(0, Math.min(pts.length - 1, Math.round((vx - padL) / xStep)));
    setHi(i);
    const wr = wrapRef.current.getBoundingClientRect();
    showAt(r.left - wr.left + pts[i].x * scale, r.top - wr.top + pts[i].y * scale, {
      title: pts[i].d.x,
      rows: [{ value: fmtMiles(pts[i].d.y), label: seriesLabel, color: t.blueDark }],
    });
  }
  function onLeave() { setHi(null); hide(); }

  return (
    <div className="viz-wrap" ref={wrapRef}>
    <svg key={dataKey(data)} viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: wide ? 320 : 260 }}>
      <defs>
        <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={t.blue} stopOpacity="0.28" />
          <stop offset="100%" stopColor={t.blue} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {yTicks.map((tk, i) => (
        <g key={i}>
          <line x1={padL} x2={W - padR} y1={tk.y} y2={tk.y} stroke={t.grid} strokeDasharray={i === tickCount ? '' : '0'} />
          <text x={padL - 8} y={tk.y + 4} fontSize="10" textAnchor="end" fill={t.axis}>{tk.v}</text>
        </g>
      ))}
      {/* area + line */}
      <path d={areaPath} fill="url(#lineFill)" className="viz-fade" style={{ animationDelay: '350ms' }} />
      <path d={path} fill="none" stroke={t.blueDark} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" pathLength="1" className="viz-draw" />
      {hi != null && (
        <line x1={pts[hi].x} x2={pts[hi].x} y1={padT} y2={padT + innerH} stroke={t.axis} strokeWidth="1" strokeDasharray="3 3" />
      )}
      {/* points */}
      {pts.map((p, i) => (
        <g key={i} className="viz-pop" style={{ animationDelay: `${250 + i * 45}ms` }}>
          <circle cx={p.x} cy={p.y} r={actives.includes(i) || hi === i ? 6 : 4} fill={t.tooltipBg === '#0A0E17' ? '#121722' : 'white'} stroke={t.blueDark} strokeWidth={actives.includes(i) || hi === i ? 3 : 2} style={{ transition: 'r 150ms ease' }} />
          {actives.includes(i) && (
            <g>
              <rect x={p.x - 22} y={p.y - 30} width="44" height="20" rx="5" fill={t.tooltipBg} />
              <text x={p.x} y={p.y - 16} fontSize="10.5" textAnchor="middle" fill="white" fontWeight="600">{p.d.y}</text>
            </g>
          )}
        </g>
      ))}
      {/* value labels — número sobre cada punto (los activos ya muestran su burbuja) */}
      {pts.map((p, i) => (
        (Number.isFinite(p.d.y) && !actives.includes(i)) ? (
          <text
            key={i}
            x={p.x}
            y={p.y - 9}
            fontSize="9.5"
            textAnchor="middle"
            fill={t.ink}
            fontWeight="600"
            style={{ paintOrder: 'stroke' }}
            stroke={t.tooltipBg === '#0A0E17' ? '#121722' : 'white'}
            strokeWidth="3"
            strokeLinejoin="round"
          >{p.d.y}</text>
        ) : null
      ))}
      {/* x labels */}
      {pts.map((p, i) => (
        <text key={i} x={p.x} y={H - 8} fontSize="11" textAnchor="middle" fill={t.axis} fontWeight={hi === i ? 700 : 400}>{p.d.x}</text>
      ))}
      {/* capa de hover (encima de todo) */}
      <rect x={padL - xStep / 2} y={padT} width={innerW + xStep} height={innerH} fill="transparent" onPointerMove={onMove} onPointerLeave={onLeave} />
    </svg>
    <ChartTip tip={tip} />
    </div>
  );
}

// ============ Vertical bar chart ============
// hideZero: no escribe el valor sobre las barras en 0 (series con muchos meses vacíos).
function BarChart({ data, activeLabel, dimOthers, valueFormat, hideZero }) {
  const t = chartTheme();
  // Rota etiquetas 45° cuando hay muchas barras, o cuando los nombres son largos
  // (ej. "Agustín Sbampato") y se pisan aunque haya pocas barras.
  const rotate = data.length > 7 || data.some(d => String(d.x).length > 10);
  const W = 560;
  const padL = 44, padR = 14, padT = 14;
  // El texto rotado -45° (anchor "end") cuelga hacia ABAJO desde su punto de
  // anclaje, no hacia arriba — con nombres largos ("Facundo Aramburo") el
  // margen tiene que ser generoso o el nombre queda cortado por el borde.
  const padB = rotate ? 80 : 30;
  const H = 240 + (rotate ? 60 : 0);
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const max = niceMax(Math.max(...data.map(d => d.y)));
  const yTicks = ticks(max, 5);

  const gap = rotate ? 8 : 14;
  const barW = (innerW - gap * (data.length - 1)) / data.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: rotate ? 320 : 280, overflow: 'visible' }}>
      <defs>
        <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7894B6" />
          <stop offset="100%" stopColor="#A3B7CF" />
        </linearGradient>
        <linearGradient id="barFillActive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2B3A4A" />
          <stop offset="100%" stopColor="#3F6189" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {yTicks.map((v, i) => {
        const y = padT + (1 - v / max) * innerH;
        return (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={y} y2={y} stroke={t.grid} />
            <text x={padL - 8} y={y + 4} fontSize="10" textAnchor="end" fill={t.axis}>{v}</text>
          </g>
        );
      })}
      {/* bars */}
      {data.map((d, i) => {
        const h = (d.y / max) * innerH;
        const x = padL + i * (barW + gap);
        const y = padT + innerH - h;
        const isActive = activeLabel != null && d.x === activeLabel;
        const lx = x + barW / 2;
        const ly = padT + innerH + (rotate ? 12 : 20);
        const dimmed = dimOthers && activeLabel != null && !isActive;
        return (
          <g key={i} opacity={dimmed ? 0.35 : 1}>
            <rect
              x={x} y={y} width={barW} height={h}
              rx="4"
              fill={isActive ? 'url(#barFillActive)' : 'url(#barFill)'}
              className="viz-grow-y" style={{ animationDelay: `${i * 60}ms` }}
            />
            {Number.isFinite(d.y) && !(hideZero && d.y === 0) && (
              <text
                x={x + barW / 2} y={y - 5}
                fontSize={rotate ? 9 : 10.5}
                textAnchor="middle"
                fill={t.ink}
                fontWeight="700"
              >{valueFormat ? valueFormat(d.y) : d.y}</text>
            )}
            <text
              x={lx} y={ly}
              fontSize={rotate ? 9.5 : 11}
              textAnchor={rotate ? 'end' : 'middle'}
              fill={t.axis}
              fontWeight={isActive ? 700 : 400}
              transform={rotate ? `rotate(-45, ${lx}, ${ly})` : undefined}
            >{d.x}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ============ Grouped bar chart (comparación de varios meses) ============
// series: [{ label, color, data:[{x,y}, ...] }] — todas las series comparten
// las mismas categorías (mismo orden de "x") para poder agruparlas.
function GroupedBarChart({ series, activeLabel, dimOthers }) {
  const t = chartTheme();
  const categories = (series[0]?.data || []).map(d => d.x);
  const rotate = categories.length > 7 || categories.some(c => String(c).length > 10);
  const W = 560;
  const padL = 44, padR = 14, padT = 14;
  // Ídem BarChart: el texto rotado -45° cuelga hacia abajo del anclaje.
  const padB = rotate ? 80 : 30;
  const H = 240 + (rotate ? 60 : 0);
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const maxVal = Math.max(1, ...series.flatMap(s => s.data.map(d => d.y)));
  const max = niceMax(maxVal);
  const yTicks = ticks(max, 5);

  const groupGap = rotate ? 10 : 18;
  const groupW = (innerW - groupGap * (categories.length - 1)) / categories.length;
  const barGap = 3;
  const n = Math.max(series.length, 1);
  const barW = (groupW - barGap * (n - 1)) / n;

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: rotate ? 320 : 280, overflow: 'visible' }}>
        {yTicks.map((v, i) => {
          const y = padT + (1 - v / max) * innerH;
          return (
            <g key={i}>
              <line x1={padL} x2={W - padR} y1={y} y2={y} stroke={t.grid} />
              <text x={padL - 8} y={y + 4} fontSize="10" textAnchor="end" fill={t.axis}>{v}</text>
            </g>
          );
        })}
        {categories.map((cat, ci) => {
          const gx = padL + ci * (groupW + groupGap);
          const lx = gx + groupW / 2;
          const ly = padT + innerH + (rotate ? 12 : 20);
          const dimmed = dimOthers && activeLabel != null && cat !== activeLabel;
          return (
            <g key={ci} opacity={dimmed ? 0.35 : 1}>
              {series.map((s, si) => {
                const hit = s.data[ci];
                const val = hit ? hit.y : 0;
                const h = (val / max) * innerH;
                const bx = gx + si * (barW + barGap);
                const by = padT + innerH - h;
                return (
                  <g key={si}>
                    <rect x={bx} y={by} width={barW} height={h} rx="3" fill={s.color} />
                    {Number.isFinite(val) && val > 0 && (
                      <text x={bx + barW / 2} y={by - 4} fontSize={rotate ? 8 : 9} textAnchor="middle" fill={t.ink} fontWeight="700">{val}</text>
                    )}
                  </g>
                );
              })}
              <text
                x={lx} y={ly}
                fontSize={rotate ? 9.5 : 11}
                textAnchor={rotate ? 'end' : 'middle'}
                fill={t.axis}
                fontWeight={activeLabel === cat ? 700 : 400}
                transform={rotate ? `rotate(-45, ${lx}, ${ly})` : undefined}
              >{cat}</text>
            </g>
          );
        })}
      </svg>
      <div className="chart-legend">
        {series.map((s, i) => (
          <span key={i} className="chart-legend-item">
            <span className="chart-legend-swatch" style={{ background: s.color }}></span>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============ Horizontal bar chart ============
function HBarChart({ data, valueLabel = 'altas' }) {
  const t = chartTheme();
  const { wrapRef, tip, show, hide } = useChartTip();
  const [hi, setHi] = React.useState(null);
  const W = 560;
  const rowH = 22;
  const gap = 6;
  const padL = 200; // aumentado desde 130 para evitar que se corten los nombres
  const padR = 28, padT = 8, padB = 22;
  const innerH = data.length * (rowH + gap);
  const H = padT + innerH + padB;
  const innerW = W - padL - padR;

  const max = niceMax(Math.max(...data.map(d => d.y)));
  const tickVals = ticks(max, 6);

  return (
    <div className="viz-wrap" ref={wrapRef}>
    <svg key={dataKey(data)} viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="hbarFill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3F6189" />
          <stop offset="100%" stopColor="#7894B6" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {tickVals.map((v, i) => {
        const x = padL + (v / max) * innerW;
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={padT} y2={padT + innerH} stroke={t.grid} />
            <text x={x} y={H - 6} fontSize="10" textAnchor="middle" fill={t.axis}>{v}</text>
          </g>
        );
      })}
      {/* rows */}
      {data.map((d, i) => {
        const y = padT + i * (rowH + gap);
        const w = (d.y / max) * innerW;
        const tipContent = { title: d.x, rows: [{ value: fmtMiles(d.y), label: valueLabel, color: '#3F6189' }] };
        return (
          <g key={i}
            tabIndex={0}
            className="viz-mark"
            onPointerMove={e => { setHi(i); show(e, tipContent); }}
            onPointerLeave={() => { setHi(null); hide(); }}
            onFocus={e => { setHi(i); show(e, tipContent); }}
            onBlur={() => { setHi(null); hide(); }}
          >
            {/* zona de hover: toda la fila, más grande que la barra */}
            <rect x={0} y={y - gap / 2} width={W} height={rowH + gap} fill="transparent" />
            <text x={padL - 8} y={y + rowH/2 + 3.5} fontSize="10.5" textAnchor="end" fill={hi === i ? t.ink : t.axis} fontWeight={hi === i ? 700 : 400}>{d.x}</text>
            <rect x={padL} y={y} width={w} height={rowH} rx="3" fill="url(#hbarFill)"
              className="viz-grow-x" style={{ animationDelay: `${i * 70}ms`, filter: hi === i ? 'brightness(0.88)' : 'none' }} />
            {Number.isFinite(d.y) && (
              <text x={padL + w + 6} y={y + rowH/2 + 3.5} fontSize="10.5" textAnchor="start" fill={t.ink} fontWeight="700"
                className="viz-fade" style={{ animationDelay: `${350 + i * 70}ms` }}>{d.y}</text>
            )}
          </g>
        );
      })}
    </svg>
    <ChartTip tip={tip} />
    </div>
  );
}

// ============ Donut chart ============
function DonutChart({ data, center, activeLabel }) {
  const t = chartTheme();
  const W = 320, H = 260;
  const cx = W / 2, cy = H / 2;
  const R = 92, r = 58;

  const total = data.reduce((a, d) => a + d.value, 0);
  // 9 tonos distinguibles entre sí (navy/azul/teal/grafito/gris) — antes eran
  // solo 6 y muy parecidos entre sí, difíciles de diferenciar en la leyenda.
  const palette = ['#14213D', '#1D3860', '#2C4D7D', '#0F5C66', '#3E6294', '#55606E', '#1F7A85', '#37414F', '#8B96A6'];

  let angle = -Math.PI / 2;
  const slices = data.map((d, i) => {
    const portion = d.value / total;
    const a0 = angle;
    const a1 = angle + portion * Math.PI * 2;
    angle = a1;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1);
    const x3 = cx + r * Math.cos(a0), y3 = cy + r * Math.sin(a0);
    const path = [
      `M ${x0} ${y0}`,
      `A ${R} ${R} 0 ${large} 1 ${x1} ${y1}`,
      `L ${x2} ${y2}`,
      `A ${r} ${r} 0 ${large} 0 ${x3} ${y3}`,
      'Z'
    ].join(' ');
    return { path, color: palette[i % palette.length], label: d.label, value: d.value, pct: portion };
  });

  return (
    <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="220" style={{ flexShrink: 0 }}>
        {slices.map((s, i) => (
          <path
            key={i} d={s.path} fill={s.color}
            stroke={t.tooltipBg === '#0A0E17' ? '#121722' : 'white'}
            strokeWidth={activeLabel && s.label === activeLabel ? 3 : 2}
            opacity={activeLabel && s.label !== activeLabel ? 0.35 : 1}
          />
        ))}
        {center && (
          <text x={cx} y={cy + 6} textAnchor="middle" fontSize="15" fill={t.ink} fontWeight="700">{center}</text>
        )}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5 }}>
        {slices.map((s, i) => {
          const dim = activeLabel && s.label !== activeLabel;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: dim ? 0.45 : 1 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }}></span>
              <span style={{ color: t.ink, minWidth: 110, fontWeight: activeLabel && !dim ? 700 : 400 }}>{s.label}</span>
              <span style={{ color: t.inkSub, fontVariantNumeric: 'tabular-nums' }}>{Math.round(s.pct * 100)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ Torta (distribución YTD por gerencia) ============
// data: [{ label, short, value, color }] en orden fijo (el color sigue a la gerencia).
// Etiquetas afuera (nombre + %), hover separa la porción, click elige la gerencia.
function PieChart({ data, activeLabel, onSelect, valueLabel = 'altas' }) {
  const t = chartTheme();
  const { wrapRef, tip, show, hide } = useChartTip();
  const [hi, setHi] = React.useState(null);
  const W = 330, H = 262, cx = W / 2, cy = H / 2, R = 98;
  const total = data.reduce((a, d) => a + d.value, 0) || 1;
  const surface = t.tooltipBg === '#0A0E17' ? '#121722' : '#FFFFFF';

  let angle = -Math.PI / 2;
  const slices = data.map((d, i) => {
    const pct = d.value / total;
    const a0 = angle, a1 = angle + pct * Math.PI * 2;
    angle = a1;
    const mid = (a0 + a1) / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const path = pct >= 0.9999
      ? `M ${cx - R} ${cy} A ${R} ${R} 0 1 1 ${cx + R} ${cy} A ${R} ${R} 0 1 1 ${cx - R} ${cy} Z`
      : `M ${cx} ${cy} L ${cx + R * Math.cos(a0)} ${cy + R * Math.sin(a0)} A ${R} ${R} 0 ${large} 1 ${cx + R * Math.cos(a1)} ${cy + R * Math.sin(a1)} Z`;
    return { ...d, i, pct, mid, path };
  });
  const pctTxt = p => `${(p * 100).toFixed(1).replace('.', ',')}%`;

  return (
    <div className="viz-wrap" ref={wrapRef}>
      <svg key={dataKey(data)} viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxWidth: 380, margin: '0 auto', overflow: 'visible' }}>
        <g className="viz-spin">
          {slices.map(s => {
            const isActive = activeLabel != null && s.label === activeLabel;
            const dim = activeLabel != null && !isActive;
            const out = hi === s.i || isActive ? 7 : 0;
            const tipContent = { title: s.label, rows: [{ value: fmtMiles(s.value), label: `${valueLabel} · ${pctTxt(s.pct)}`, color: s.color }] };
            return (
              <path key={s.i} d={s.path} fill={s.color} stroke={surface} strokeWidth="2"
                tabIndex={0} className="viz-mark"
                style={{ transform: `translate(${Math.cos(s.mid) * out}px, ${Math.sin(s.mid) * out}px)`, transition: 'transform 200ms ease, opacity 200ms ease', opacity: dim ? 0.35 : 1, cursor: onSelect && s.label !== 'Otros' ? 'pointer' : 'default' }}
                onPointerMove={e => { setHi(s.i); show(e, tipContent); }}
                onPointerLeave={() => { setHi(null); hide(); }}
                onFocus={e => { setHi(s.i); show(e, tipContent); }}
                onBlur={() => { setHi(null); hide(); }}
                onClick={() => onSelect && s.label !== 'Otros' && onSelect(s.label)}
                onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && onSelect && s.label !== 'Otros') { e.preventDefault(); onSelect(s.label); } }}
              />
            );
          })}
        </g>
        {/* etiquetas afuera: nombre + % (las porciones muy chicas quedan en el tooltip) */}
        {slices.filter(s => s.pct >= 0.01).map(s => {
          const lr = R + 16;
          const x = cx + lr * Math.cos(s.mid), y = cy + lr * Math.sin(s.mid);
          const c = Math.cos(s.mid);
          const anchor = c > 0.2 ? 'start' : c < -0.2 ? 'end' : 'middle';
          const dim = activeLabel != null && s.label !== activeLabel;
          return (
            <text key={s.i} x={x} y={y - 2} textAnchor={anchor} fontSize="12" fill={t.ink} opacity={dim ? 0.4 : 1}
              className="viz-fade" style={{ animationDelay: '500ms' }}>
              <tspan x={x} fontWeight={activeLabel === s.label || hi === s.i ? 700 : 500}>{s.short}</tspan>
              <tspan x={x} dy="14" fill={t.inkSub}>{pctTxt(s.pct)}</tspan>
            </text>
          );
        })}
      </svg>
      <ChartTip tip={tip} />
    </div>
  );
}

// Flecha de tendencia (estado): sube = rojo ↗, baja = verde ↘. Siempre acompañada de texto.
function TrendArrow({ dir, size = 14 }) {
  const up = dir === 'up';
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d={up ? 'M4 12 L12 4 M6 4 H12 V10' : 'M4 4 L12 12 M12 6 V12 H6'} fill="none"
        stroke={up ? 'var(--viz-bad)' : 'var(--viz-good)'} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Pictograma de personas: "filled" en color principal, el resto en el color secundario.
function PeopleRow({ total = 6, filled = total, color = 'var(--viz-people)', empty = 'var(--viz-people-empty)', size = 30 }) {
  return (
    <div className="people-row" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <svg key={i} width={size * 0.55} height={size} viewBox="0 0 16 30" className="viz-pop" style={{ animationDelay: `${i * 70}ms` }}>
          <g fill={i < filled ? color : empty}>
            <circle cx="8" cy="4.6" r="4.2" />
            <path d="M3.2 21 V14.6 Q3.2 10.2 8 10.2 Q12.8 10.2 12.8 14.6 V21 Z" />
            <rect x="0.4" y="11.2" width="2.6" height="9.4" rx="1.3" />
            <rect x="13" y="11.2" width="2.6" height="9.4" rx="1.3" />
            <rect x="3.9" y="19" width="3.5" height="10.6" rx="1.6" />
            <rect x="8.6" y="19" width="3.5" height="10.6" rx="1.6" />
          </g>
        </svg>
      ))}
    </div>
  );
}

// ============ Barras de rotación por gerencia (réplica de la referencia) ============
// rows: [{ label, short, rot, prevRot, dotIni, dotFin, altas, bajas }] — la barra es la
// rotación del mes; arriba el valor con flecha vs. mes anterior; adentro, arriba, el valor
// del mes anterior; adentro, abajo, la dotación final de la región.
function RotacionBars({ rows, activeLabel, onSelect, mesLabel, prevLabel, fmtPct }) {
  const t = chartTheme();
  const { wrapRef, tip, show, hide } = useChartTip();
  const [hi, setHi] = React.useState(null);
  const n = rows.length;
  const W = Math.max(760, 220 + n * 165), H = 300;
  const padL = 128, padR = 12, padT = 34, padB = 30;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  // Escala de a 2 puntos (niceMax salta 10 → 20 y aplasta las barras).
  const top = Math.max(1, ...rows.map(r => Math.max(r.rot || 0, r.prevRot || 0)));
  const max = Math.max(4, Math.ceil((top * 1.1) / 2) * 2);
  const gap = 30;
  const barW = Math.min(150, (innerW - gap * (n - 1)) / n);
  const x0 = padL + (innerW - (barW * n + gap * (n - 1))) / 2;
  const base = padT + innerH;
  const BAR = '#3F6189'; // azul acero de la referencia (texto blanco adentro: contraste 6,3:1)

  return (
    <div className="viz-wrap" ref={wrapRef}>
      <svg key={dataKey(rows)} viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: 360, overflow: 'visible' }}>
        {[0.25, 0.5, 0.75, 1].map(f => (
          <line key={f} x1={padL} x2={W - padR} y1={base - f * innerH} y2={base - f * innerH} stroke={t.grid} />
        ))}
        <text x={padL - 10} y={base - 14} textAnchor="end" fontSize="11.5" fill={t.inkSub}>Dotación x región =</text>
        {rows.map((r, i) => {
          const h = Math.max(2, ((r.rot || 0) / max) * innerH);
          const x = x0 + i * (barW + gap), y = base - h;
          const isActive = activeLabel != null && r.label === activeLabel;
          const dim = activeLabel != null && !isActive;
          const hasPrev = r.prevRot != null;
          const dir = hasPrev ? (Math.round(r.rot * 100) > Math.round(r.prevRot * 100) ? 'up' : Math.round(r.rot * 100) < Math.round(r.prevRot * 100) ? 'down' : null) : null;
          const valTxt = fmtPct(r.rot).replace('%', '');
          const tipContent = {
            title: r.label,
            rows: [
              { value: fmtPct(r.rot), label: `rotación ${mesLabel}`, color: BAR },
              ...(hasPrev ? [{ value: fmtPct(r.prevRot), label: `rotación ${prevLabel}` }] : []),
              { value: `${fmtMiles(r.dotIni)} → ${fmtMiles(r.dotFin)}`, label: 'dotación' },
              { value: `${r.altas} / ${r.bajas}`, label: 'altas / bajas (nómina)' },
            ],
          };
          return (
            <g key={r.label} tabIndex={0} className="viz-mark"
              style={{ opacity: dim ? 0.38 : 1, transition: 'opacity 200ms ease', cursor: onSelect ? 'pointer' : 'default' }}
              onPointerMove={e => { setHi(i); show(e, tipContent); }}
              onPointerLeave={() => { setHi(null); hide(); }}
              onFocus={e => { setHi(i); show(e, tipContent); }}
              onBlur={() => { setHi(null); hide(); }}
              onClick={() => onSelect && onSelect(r.label)}
              onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && onSelect) { e.preventDefault(); onSelect(r.label); } }}
            >
              <rect x={x - gap / 2} y={padT - 30} width={barW + gap} height={innerH + 60} fill="transparent" />
              <rect x={x} y={y} width={barW} height={h} rx="10" fill={BAR}
                className="viz-grow-y" style={{ animationDelay: `${i * 90}ms`, filter: hi === i || isActive ? 'brightness(1.12)' : 'none', transition: 'filter 150ms ease' }} />
              <g className="viz-fade" style={{ animationDelay: `${450 + i * 90}ms` }}>
                <text x={x + barW / 2 - (dir ? 8 : 0)} y={y - 9} textAnchor="middle" fontSize="13" fontWeight="700" fill={t.ink}>{valTxt}</text>
                {dir && (
                  <g transform={`translate(${x + barW / 2 + valTxt.length * 3.6 - 4}, ${y - 22})`}>
                    <path d={dir === 'up' ? 'M2 12 L11 3 M5 3 H11 V9' : 'M2 3 L11 12 M11 6 V12 H5'} fill="none"
                      stroke={dir === 'up' ? 'var(--viz-bad)' : 'var(--viz-good)'} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                )}
                {hasPrev && h >= 70 && (
                  <text x={x + barW / 2} y={y + 20} textAnchor="middle" fontSize="12" fontWeight="600" fill="#FFFFFF" opacity="0.85">{fmtPct(r.prevRot).replace('%', '')}</text>
                )}
                {h >= 44
                  ? <text x={x + barW / 2} y={base - 12} textAnchor="middle" fontSize="20" fontWeight="800" fill="#FFFFFF">{fmtMiles(r.dotFin)}</text>
                  : <text x={x + barW / 2} y={y - 26} textAnchor="middle" fontSize="12" fontWeight="700" fill={t.inkSub}>{fmtMiles(r.dotFin)}</text>}
              </g>
              <text x={x + barW / 2} y={base + 18} textAnchor="middle" fontSize="12" fill={t.ink} fontWeight={isActive || hi === i ? 700 : 500}>{r.short}</text>
            </g>
          );
        })}
      </svg>
      <ChartTip tip={tip} />
    </div>
  );
}

Object.assign(window, { LineChart, BarChart, HBarChart, DonutChart, GroupedBarChart, PieChart, RotacionBars, PeopleRow, TrendArrow });
