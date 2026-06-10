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
function LineChart({ data, activeIndex }) {
  const t = chartTheme();
  const W = 560, H = 220;
  const padL = 44, padR = 14, padT = 16, padB = 26;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const ys = data.map(d => d.y);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);
  const span = Math.max(yMax - yMin, 1);
  const padY = span * 0.6;
  const yLo = Math.floor(yMin - padY);
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
          <line x1={padL} x2={W - padR} y1={tk.y} y2={tk.y} stroke={t.grid} strokeDasharray={i === tickCount ? '' : '0'} />
          <text x={padL - 8} y={tk.y + 4} fontSize="10" textAnchor="end" fill={t.axis}>{tk.v}</text>
        </g>
      ))}
      {/* area + line */}
      <path d={areaPath} fill="url(#lineFill)" />
      <path d={path} fill="none" stroke={t.blueDark} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
      {/* points */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={i === activeIndex ? 6 : 4} fill={t.tooltipBg === '#0F1420' ? '#171D2B' : 'white'} stroke={t.blueDark} strokeWidth={i === activeIndex ? 3 : 2} />
          {i === activeIndex && (
            <g>
              <rect x={p.x - 22} y={p.y - 30} width="44" height="20" rx="5" fill={t.tooltipBg} />
              <text x={p.x} y={p.y - 16} fontSize="10.5" textAnchor="middle" fill="white" fontWeight="600">{p.d.y}</text>
            </g>
          )}
        </g>
      ))}
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

  const max = niceMax(Math.max(...data.map(d => d.y)));
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
        const h = (d.y / max) * innerH;
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
  const padL = 200; // aumentado desde 130 para evitar que se corten los nombres
  const padR = 28, padT = 8, padB = 22;
  const innerH = data.length * (rowH + gap);
  const H = padT + innerH + padB;
  const innerW = W - padL - padR;

  const max = niceMax(Math.max(...data.map(d => d.y)));
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
        const w = (d.y / max) * innerW;
        return (
          <g key={i}>
            <text x={padL - 8} y={y + rowH/2 + 3.5} fontSize="10.5" textAnchor="end" fill={t.axis}>{d.x}</text>
            <rect x={padL} y={y} width={w} height={rowH} rx="3" fill="url(#hbarFill)" />
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

  const total = data.reduce((a, d) => a + d.value, 0);
  const palette = ['#7BA8F0', '#A6B4F0', '#C7D5F9', '#8DB3F7', '#B7CFFB', '#D7E5FD'];

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
