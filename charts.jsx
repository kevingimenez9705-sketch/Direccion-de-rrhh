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
    blue: '#47699C',
    blueDark: '#2C4D7D',
    grid: '#DBDFE7',
    axis: '#6E7889',
    ink: '#161B26',
    inkSub: '#6E7889',
    tooltipBg: '#1D3860',
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
function LineChart({ data, activeIndex, activeIndices, wide }) {
  const t = chartTheme();
  // activeIndices (comparación de varios meses) tiene prioridad sobre activeIndex (mes único).
  const actives = activeIndices && activeIndices.length ? activeIndices : (activeIndex != null ? [activeIndex] : []);
  // "wide": series largas (ej. 15 meses) piden más ancho por punto para que
  // las etiquetas del eje X no se amontonen.
  const W = wide ? Math.max(900, data.length * 65) : 560;
  const H = wide ? 260 : 220;
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
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: wide ? 320 : 260 }}>
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
          <circle cx={p.x} cy={p.y} r={actives.includes(i) ? 6 : 4} fill={t.tooltipBg === '#0A0E17' ? '#121722' : 'white'} stroke={t.blueDark} strokeWidth={actives.includes(i) ? 3 : 2} />
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
        <text key={i} x={p.x} y={H - 8} fontSize="11" textAnchor="middle" fill={t.axis}>{p.d.x}</text>
      ))}
    </svg>
  );
}

// ============ Vertical bar chart ============
function BarChart({ data, activeLabel, dimOthers }) {
  const t = chartTheme();
  // Rota etiquetas 45° cuando hay muchas barras, o cuando los nombres son largos
  // (ej. "Agustín Sbampato") y se pisan aunque haya pocas barras.
  const rotate = data.length > 7 || data.some(d => String(d.x).length > 10);
  const W = 560;
  const padL = 44, padR = 14, padT = 14;
  const padB = rotate ? 64 : 30; // más espacio abajo para las etiquetas rotadas
  const H = 240 + (rotate ? 44 : 0);
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const max = niceMax(Math.max(...data.map(d => d.y)));
  const yTicks = ticks(max, 5);

  const gap = rotate ? 8 : 14;
  const barW = (innerW - gap * (data.length - 1)) / data.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: rotate ? 320 : 280 }}>
      <defs>
        <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6E8CBB" />
          <stop offset="100%" stopColor="#9DB3D6" />
        </linearGradient>
        <linearGradient id="barFillActive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D3860" />
          <stop offset="100%" stopColor="#2C4D7D" />
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
            />
            {Number.isFinite(d.y) && (
              <text
                x={x + barW / 2} y={y - 5}
                fontSize={rotate ? 9 : 10.5}
                textAnchor="middle"
                fill={t.ink}
                fontWeight="700"
              >{d.y}</text>
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
  const padB = rotate ? 64 : 30;
  const H = 240 + (rotate ? 44 : 0);
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
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', maxHeight: rotate ? 320 : 280 }}>
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
          <stop offset="0%" stopColor="#6E8CBB" />
          <stop offset="100%" stopColor="#9DB3D6" />
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
            {Number.isFinite(d.y) && (
              <text x={padL + w + 6} y={y + rowH/2 + 3.5} fontSize="10.5" textAnchor="start" fill={t.ink} fontWeight="700">{d.y}</text>
            )}
          </g>
        );
      })}
    </svg>
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

Object.assign(window, { LineChart, BarChart, HBarChart, DonutChart, GroupedBarChart });
