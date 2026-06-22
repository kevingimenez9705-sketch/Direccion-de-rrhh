// Chart components — minimal SVG, themed to match the dashboard
// Exposes: window.LineChart, window.BarChart, window.HBarChart, window.DonutChart

function chartTheme() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  return dark ? {
    blue: '#7BA8F0',
    blueDark: '#8DB3F7',
    grid: '#283143',
    axis: '#8A93A6',
    ink: '#E7ECF4',
    inkSub: '#AEB8C9',
    tooltipBg: '#0F1420',
  } : {
    blue: '#7BA8F0',
    blueDark: '#4F86E8',
    grid: '#E5E9F0',
    axis: '#8A93A6',
    ink: '#1A1F36',
    inkSub: '#8A93A6',
    tooltipBg: '#1B2336',
  };
}

// --- helpers --- //
function niceMax(max) {
  if (!max || max <= 0) return 1;
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
function LineChart({ data, activeIndex }) {
  const t = chartTheme();
  const W = 560, H = 220;
  const padL = 44, padR = 14, padT = 16, padB = 26;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  // ── FIX: filtrar nulls antes de calcular min/max ──
  const validYs = data.map(d => d.y).filter(v => v != null && !isNaN(v));
  if (validYs.length === 0) {
    // Sin datos válidos: mostrar placeholder
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: 260 }}>
        <text x={W/2} y={H/2} textAnchor="middle" fontSize="13" fill={t.axis}>Sin datos disponibles</text>
      </svg>
    );
  }

  const yMin = Math.min(...validYs);
  const yMax = Math.max(...validYs);
  const span = Math.max(yMax - yMin, 1);
  const padY = span * 0.6;
  const yLo = Math.floor(yMin - padY);
  const yHi = Math.ceil(yMax + padY);
  const yRange = Math.max(yHi - yLo, 1);

  const xStep = innerW / Math.max(data.length - 1, 1);

  // Calcular posiciones; los puntos null quedan como null
  const pts = data.map((d, i) => {
    if (d.y == null || isNaN(d.y)) return { x: padL + i * xStep, y: null, d, i };
    return {
      x: padL + i * xStep,
      y: padT + (1 - (d.y - yLo) / yRange) * innerH,
      d,
      i,
    };
  });

  // Construir path solo con puntos válidos, usando M para saltos por nulls
  let path = '';
  pts.forEach((p) => {
    if (p.y == null) return;
    const prev = pts[p.i - 1];
    const needMove = p.i === 0 || prev == null || prev.y == null;
    path += `${needMove ? 'M' : 'L'}${p.x},${p.y} `;
  });

  // Area: solo si hay segmento continuo desde primer punto válido
  const firstValid = pts.find(p => p.y != null);
  const lastValid  = [...pts].reverse().find(p => p.y != null);
  const areaPath = firstValid && lastValid && path
    ? `${path} L${lastValid.x},${padT+innerH} L${firstValid.x},${padT+innerH} Z`
    : '';

  const tickCount = 5;
  const yTicks = [];
  for (let i = 0; i <= tickCount; i++) {
    const v = yLo + (yRange * i) / tickCount;
    yTicks.push({ v: Math.round(v), y: padT + (1 - i / tickCount) * innerH });
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: 260 }}>
      <defs>
        <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={t.blue} stopOpacity="0.28" />
          <stop offset="100%" stopColor={t.blue} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {yTicks.map((tk, i) => (
        <g key={i}>
          <line x1={padL} x2={W - padR} y1={tk.y} y2={tk.y} stroke={t.grid} />
          <text x={padL - 8} y={tk.y + 4} fontSize="10" textAnchor="end" fill={t.axis}>{tk.v}</text>
        </g>
      ))}
      {/* area + line */}
      {areaPath && <path d={areaPath} fill="url(#lineFill)" />}
      {path && <path d={path} fill="none" stroke={t.blueDark} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />}
      {/* points */}
      {pts.map((p, i) => {
        if (p.y == null) return null;
        const isActive = i === activeIndex;
        return (
          <g key={i}>
            <circle
              cx={p.x} cy={p.y}
              r={isActive ? 6 : 4}
              fill={t.tooltipBg === '#0F1420' ? '#171D2B' : 'white'}
              stroke={t.blueDark}
              strokeWidth={isActive ? 3 : 2}
            />
            {isActive && (
              <g>
                <rect x={p.x - 22} y={p.y - 30} width="44" height="20" rx="5" fill={t.tooltipBg} />
                <text x={p.x} y={p.y - 16} fontSize="10.5" textAnchor="middle" fill="white" fontWeight="600">{p.d.y}</text>
              </g>
            )}
          </g>
        );
      })}
      {/* x labels */}
      {pts.map((p, i) => (
        <text key={i} x={p.x} y={H - 8} fontSize="11" textAnchor="middle" fill={t.axis}>{p.d.x}</text>
      ))}
    </svg>
  );
}

// ============ Vertical bar chart ============
function BarChart({ data, activeLabel }) {
  const t = chartTheme();
  const W = 560, H = 240;
  const padL = 44, padR = 14, padT = 14, padB = 30;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  // ── FIX: filtrar nulls para el max ──
  const validVals = data.map(d => d.y).filter(v => v != null && !isNaN(v));
  if (validVals.length === 0) {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: 280 }}>
        <text x={W/2} y={H/2} textAnchor="middle" fontSize="13" fill={t.axis}>Sin datos disponibles</text>
      </svg>
    );
  }

  const max = niceMax(Math.max(...validVals));
  const yTicks = ticks(max, 5);

  const gap = 14;
  const barW = (innerW - gap * (data.length - 1)) / data.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: 280 }}>
      <defs>
        <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8DB3F7" />
          <stop offset="100%" stopColor="#A8C2F8" />
        </linearGradient>
        <linearGradient id="barFillActive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F86E8" />
          <stop offset="100%" stopColor="#6FA0F2" />
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
        // ── FIX: saltar barras sin dato ──
        if (d.y == null || isNaN(d.y)) {
          const x = padL + i * (barW + gap);
          return (
            <g key={i}>
              <text x={x + barW/2} y={H - 10} fontSize="11" textAnchor="middle" fill={t.axis}>{d.x}</text>
              <text x={x + barW/2} y={padT + innerH/2} fontSize="10" textAnchor="middle" fill={t.axis}>S/D</text>
            </g>
          );
        }
        const h = Math.max((d.y / max) * innerH, 0);
        const x = padL + i * (barW + gap);
        const y = padT + innerH - h;
        const isActive = activeLabel != null && d.x === activeLabel;
        return (
          <g key={i}>
            <rect
              x={x} y={y} width={barW} height={h}
              rx="4"
              fill={isActive ? 'url(#barFillActive)' : 'url(#barFill)'}
            />
            <text x={x + barW/2} y={H - 10} fontSize="11" textAnchor="middle" fill={t.axis}>{d.x}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ============ Horizontal bar chart ============
function HBarChart({ data }) {
  const t = chartTheme();
  const W = 560;
  const rowH = 22;
  const gap = 6;
  const padL = 200;
  const padR = 28, padT = 8, padB = 22;
  const innerH = data.length * (rowH + gap);
  const H = padT + innerH + padB;
  const innerW = W - padL - padR;

  // ── FIX: filtrar nulls para el max ──
  const validVals = data.map(d => d.y).filter(v => v != null && !isNaN(v));
  const max = niceMax(validVals.length > 0 ? Math.max(...validVals) : 1);
  const tickVals = ticks(max, 6);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="hbarFill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8DB3F7" />
          <stop offset="100%" stopColor="#A8C2F8" />
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
        const w = d.y != null ? (d.y / max) * innerW : 0;
        return (
          <g key={i}>
            <text x={padL - 8} y={y + rowH/2 + 3.5} fontSize="10.5" textAnchor="end" fill={t.axis}>{d.x}</text>
            {d.y != null
              ? <rect x={padL} y={y} width={w} height={rowH} rx="3" fill="url(#hbarFill)" />
              : <text x={padL + 6} y={y + rowH/2 + 4} fontSize="10" fill={t.axis}>S/D</text>
            }
          </g>
        );
      })}
    </svg>
  );
}

// ============ Donut chart ============
function DonutChart({ data, center }) {
  const t = chartTheme();
  const W = 320, H = 260;
  const cx = W / 2, cy = H / 2;
  const R = 92, r = 58;

  // ── FIX: filtrar entradas sin valor ──
  const validData = data.filter(d => d.value != null && !isNaN(d.value) && d.value > 0);
  if (validData.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: H }}>
        <span style={{ color: t.axis, fontSize: 13 }}>Sin datos disponibles</span>
      </div>
    );
  }

  const total = validData.reduce((a, d) => a + d.value, 0);
  const palette = ['#7BA8F0', '#A6B4F0', '#C7D5F9', '#8DB3F7', '#B7CFFB', '#D7E5FD'];

  let angle = -Math.PI / 2;
  const slices = validData.map((d, i) => {
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
          <path key={i} d={s.path} fill={s.color} stroke={t.tooltipBg === '#0F1420' ? '#171D2B' : 'white'} strokeWidth="2" />
        ))}
        {center && (
          <text x={cx} y={cy + 6} textAnchor="middle" fontSize="15" fill={t.ink} fontWeight="700">{center}</text>
        )}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5 }}>
        {slices.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }}></span>
            <span style={{ color: t.ink, minWidth: 110 }}>{s.label}</span>
            <span style={{ color: t.inkSub, fontVariantNumeric: 'tabular-nums' }}>{Math.round(s.pct * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { LineChart, BarChart, HBarChart, DonutChart });
