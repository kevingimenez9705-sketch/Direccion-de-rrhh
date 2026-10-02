// Panel Ejecutivo — landing page. NO data, only sector buttons.
const { useState, useEffect, useRef } = React;

// ── Tarjeta de bienvenida con clima real (Manuel Alberti, Pilar, Bs. As.) ──
const WEATHER_LAT = -34.456;
const WEATHER_LON = -58.775;

function weatherBucket(code) {
  if (code === 0) return 'clear';
  if ([1, 2, 3].includes(code)) return 'cloudy';
  if ([45, 48].includes(code)) return 'fog';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  if ([95, 96, 99].includes(code)) return 'storm';
  return 'cloudy';
}
const WEATHER_LABELS = { clear: 'Despejado', cloudy: 'Nublado', fog: 'Niebla', rain: 'Lluvia', snow: 'Nieve', storm: 'Tormenta' };
function weatherIconName(bucket, isDay) {
  if (bucket === 'clear') return isDay ? 'sun' : 'moon';
  if (bucket === 'rain') return 'cloud-rain';
  if (bucket === 'snow') return 'cloud-snow';
  if (bucket === 'storm') return 'cloud-lightning';
  return 'cloud';
}
function greetingFor(hour) {
  if (hour < 6) return 'Buenas noches';
  if (hour < 12) return 'Buenos días';
  if (hour < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

// Posiciones fijas (no random en cada render, si no "saltan" cada vez que
// se actualiza el reloj cada 30s) para las animaciones de fondo del clima.
const WX_STARS  = [{l:8,t:15,d:0},{l:20,t:45,d:0.6},{l:35,t:12,d:1.2},{l:55,t:60,d:0.3},{l:72,t:28,d:1.6},{l:88,t:50,d:0.9}];
const WX_CLOUDS = [{t:12,w:70,h:16,dur:20,delay:0,op:0.4},{t:45,w:50,h:12,dur:26,delay:-8,op:0.28},{t:65,w:85,h:18,dur:32,delay:-18,op:0.32}];
const WX_DROPS  = [{l:8,delay:0},{l:22,delay:0.3},{l:38,delay:0.1},{l:52,delay:0.5},{l:66,delay:0.2},{l:80,delay:0.45},{l:92,delay:0.35}];
const WX_FLAKES = [{l:6,delay:0,dur:5.5},{l:18,delay:1.1,dur:4.5},{l:32,delay:0.4,dur:6},{l:46,delay:2,dur:5},{l:60,delay:0.8,dur:4.8},{l:74,delay:1.6,dur:5.8},{l:88,delay:0.2,dur:5.2}];

function WeatherFx({ bucket, isDay }) {
  if (bucket === 'clear' && isDay) {
    return <div className="wx-fx"><span className="wx-sun-glow" /></div>;
  }
  if (bucket === 'clear' && !isDay) {
    return (
      <div className="wx-fx">
        {WX_STARS.map((s, i) => (
          <span key={i} className="wx-star" style={{ left: `${s.l}%`, top: `${s.t}%`, animationDelay: `${s.d}s` }} />
        ))}
      </div>
    );
  }
  if (bucket === 'cloudy' || bucket === 'fog') {
    return (
      <div className="wx-fx">
        {WX_CLOUDS.map((c, i) => (
          <span
            key={i}
            className={'wx-cloud' + (bucket === 'fog' ? ' wx-cloud-fog' : '')}
            style={{ top: `${c.t}%`, width: c.w, height: c.h, opacity: c.op, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}
          />
        ))}
      </div>
    );
  }
  if (bucket === 'rain' || bucket === 'storm') {
    return (
      <div className="wx-fx">
        <span className="wx-cloud" style={{ top: '2%', left: '48%', width: 90, height: 20, opacity: 0.4 }} />
        {WX_DROPS.map((r, i) => (
          <span key={i} className="wx-drop" style={{ left: `${r.l}%`, animationDelay: `${r.delay}s` }} />
        ))}
        {bucket === 'storm' && <span className="wx-flash" />}
      </div>
    );
  }
  if (bucket === 'snow') {
    return (
      <div className="wx-fx">
        {WX_FLAKES.map((s, i) => (
          <span key={i} className="wx-flake" style={{ left: `${s.l}%`, animationDelay: `${s.delay}s, ${s.delay}s`, animationDuration: `${s.dur}s, 2.4s` }} />
        ))}
      </div>
    );
  }
  return null;
}

function WelcomeWeatherCard() {
  const [now, setNow] = useState(() => new Date());
  const [weather, setWeather] = useState(null); // { bucket, tempC, isDay } | null si falla/está cargando

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_LAT}&longitude=${WEATHER_LON}&current_weather=true&timezone=auto`)
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (cancelled || !data || !data.current_weather) return;
        const cw = data.current_weather;
        setWeather({
          bucket: weatherBucket(cw.weathercode),
          tempC: Math.round(cw.temperature),
          isDay: cw.is_day === 1,
        });
      })
      .catch(() => { /* sin clima disponible: se muestra el saludo igual, sin cortar la carga del panel */ });
    return () => { cancelled = true; };
  }, []);

  const hour = now.getHours();
  const isDayFallback = hour >= 6 && hour < 19;
  const isDay = weather ? weather.isDay : isDayFallback;
  const bucket = weather ? weather.bucket : 'clear';
  const timeText = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`panel-welcome-card wx-${bucket} ${isDay ? 'is-day' : 'is-night'}`}>
      <WeatherFx bucket={bucket} isDay={isDay} />
      <div className="panel-welcome-icon"><window.Icon name={weatherIconName(bucket, isDay)} size={24} /></div>
      <div className="panel-welcome-body">
        <div className="panel-welcome-label">Hora local</div>
        <div className="panel-welcome-greeting">{greetingFor(hour)}</div>
        <div className="panel-welcome-name">Alejandra Baltar</div>
        <div className="panel-welcome-time">
          {timeText}{weather ? ` · ${WEATHER_LABELS[weather.bucket]} · ${weather.tempC}°` : ''}
        </div>
      </div>
    </div>
  );
}

function PanelEjecutivo({ onOpen }) {
  const unidades = window.SECTORS.filter(s => s.group === 'UNIDADES');
  const gestion  = window.SECTORS.filter(s => s.group === 'GESTIÓN');
  // Último mes con altas cargadas: los meses más nuevos pueden tener solo rotación.
  const altasIdx = ultimoIdxCon(m => unidades.some(s => window.SECTOR_DATA[s.id]?.[m.key]));
  const latestMonth = window.MONTHS[altasIdx];
  const prevMonth = window.MONTHS[altasIdx - 1] || null;
  const ultimoMes = window.MONTHS[window.MONTHS.length - 1];

  // Resumen combinado (todas las unidades con datos de Altas) del mes más reciente.
  let totalAcumulado = 0, totalMesActivo = 0, totalMesPrev = 0, totalNoPresentes = 0, totalNoPresentesPrev = 0;
  let hasResumen = false;
  unidades.forEach(s => {
    const sectorData = window.SECTOR_DATA[s.id];
    const monthData = sectorData && sectorData[latestMonth.key];
    if (!monthData) return;
    hasResumen = true;
    totalAcumulado   += sumOrPick(chartByKind(monthData.charts, 'gerencia-total'), null, 'value') || 0;
    totalMesActivo   += sumOrPick(chartByKind(monthData.charts, 'gerencia-mes'), null, 'y') || 0;
    totalNoPresentes += sumOrPick(chartByKind(monthData.charts, 'no-presentes-gerencia'), null, 'y') || 0;
    const prevData = prevMonth && sectorData[prevMonth.key];
    if (prevData) {
      totalMesPrev += sumOrPick(chartByKind(prevData.charts, 'gerencia-mes'), null, 'y') || 0;
      totalNoPresentesPrev += sumOrPick(chartByKind(prevData.charts, 'no-presentes-gerencia'), null, 'y') || 0;
    }
  });
  const totalDelta = deltaInfo(totalMesActivo, prevMonth ? totalMesPrev : null, false);
  const totalPct = pctOf(totalNoPresentes, totalMesActivo);

  // Altas del mes activo, netas de los "no presentes" — el total real (ambas marcas).
  const totalAltasNetas = totalMesActivo - totalNoPresentes;
  const totalAltasNetasPrev = prevMonth ? (totalMesPrev - totalNoPresentesPrev) : null;
  const totalAltasNetasDelta = deltaInfo(totalAltasNetas, totalAltasNetasPrev, false);

  // No presentes ACUMULADOS: suma de los 15 meses completos (no solo el mes activo).
  let totalNoPresentesAcumulado = 0;
  unidades.forEach(s => {
    const sectorData = window.SECTOR_DATA[s.id];
    if (!sectorData) return;
    window.MONTHS.forEach(m => {
      const md = sectorData[m.key];
      if (!md) return;
      totalNoPresentesAcumulado += sumOrPick(chartByKind(md.charts, 'no-presentes-gerencia'), null, 'y') || 0;
    });
  });
  const totalNoPresentesAcumuladoPct = pctOf(totalNoPresentesAcumulado, totalAcumulado);

  // Bajas (empresa total, ambas marcas) — acumulado del período y mes activo.
  const totalBajasAcumulado = window.MONTHS.reduce((a, m) => a + (window.BAJAS_MENSUAL[m.key] || 0), 0);
  const totalBajasMes = window.BAJAS_MENSUAL[latestMonth.key] ?? null;
  const totalBajasMesPrev = prevMonth ? (window.BAJAS_MENSUAL[prevMonth.key] ?? null) : null;
  const bajasDelta = deltaInfo(totalBajasMes, prevMonth ? totalBajasMesPrev : null, true);

  // Rotación (ambas marcas) del último mes con datos, y su variación vs. el mes anterior.
  const rotIdx = ultimoIdxCon(m => unidades.some(s => window.ROTACION?.[s.id]?.[m.key]));
  const rotMonth = window.MONTHS[rotIdx] || null;
  const rotPrevMonth = window.MONTHS[rotIdx - 1] || null;
  const rotRowsAmbas = m => m ? unidades.flatMap(s => window.ROTACION?.[s.id]?.[m.key] || []) : [];
  const rotTotal = rotacionStats(rotRowsAmbas(rotMonth), null);
  const rotTotalPrev = rotacionStats(rotRowsAmbas(rotPrevMonth), null);

  return (
    <div>
      <div className="panel-hero">
        <div className="panel-hero-brand">
          <img className="panel-hero-logo" src="assets/logo-equipo-seleccion.png" alt="Equipo de Selección" />
          <div className="panel-hero-text">
            <h1>Equipo de <span className="he-accent">Selección</span></h1>
            <p className="panel-hero-sub">Sabores Express · Extremas — datos actualizados a {mesLabelFor(ultimoMes)}</p>
          </div>
        </div>
        <WelcomeWeatherCard />
      </div>

      {hasResumen && (
        <>
          <div className="section-label" style={{ marginTop: 18 }}>Resumen general — ambas marcas</div>
          <div className="kpi-grid">
            <KpiCard kpi={{ label: 'Altas acumuladas', value: fmtInt(totalAcumulado), delta: { dir: 'neutral', text: periodoAcumuladoTexto(latestMonth) } }} />
            <KpiCard kpi={{ label: `Altas — ${mesLabelFor(latestMonth)}`, value: fmtInt(totalMesActivo), delta: totalDelta }} />
            <KpiCard kpi={{ label: `No presentes — ${mesLabelFor(latestMonth)}`, value: `${fmtInt(totalNoPresentes)}${totalPct != null ? ` (${totalPct}%)` : ''}` }} />
            <KpiCard kpi={{ label: 'No presentes acumulados', value: `${fmtInt(totalNoPresentesAcumulado)}${totalNoPresentesAcumuladoPct != null ? ` (${totalNoPresentesAcumuladoPct}%)` : ''}`, delta: { dir: 'neutral', text: periodoAcumuladoTexto(latestMonth) } }} />
            <KpiCard kpi={{ label: 'Altas - no presentes', value: fmtInt(totalAltasNetas), delta: totalAltasNetasDelta }} />
            <KpiCard kpi={{ label: 'Bajas acumuladas', value: fmtInt(totalBajasAcumulado), delta: { dir: 'neutral', text: periodoAcumuladoTexto(latestMonth) } }} />
            <KpiCard kpi={{ label: `Bajas — ${mesLabelFor(latestMonth)}`, value: fmtInt(totalBajasMes) ?? 'S/D', delta: bajasDelta }} />
            {rotTotal && <KpiCard kpi={{ label: `Rotación — ${mesLabelFor(rotMonth)}`, value: fmtPct(rotTotal.rot), delta: rotDelta(rotTotal.rot, rotTotalPrev?.rot, rotPrevMonth && mesLabelFor(rotPrevMonth)) || { dir: 'neutral', text: `Dotación ${fmtInt(rotTotal.dotIni)} → ${fmtInt(rotTotal.dotFin)}` } }} />}
          </div>
        </>
      )}

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
      {/* Al hover/focus, este fondo con el color de la marca cubre toda la
          tarjeta, con el logo como marca de agua grande detrás del contenido. */}
      <div className="sector-btn-fill">
        {sector.logo && <img className="sector-btn-fill-logo" src={encodeURI(sector.logo)} alt="" />}
      </div>
      <div className="sector-btn-content">
        <div className="sector-btn-head">
          <div className="sector-btn-ico">
            {sector.logo
              ? <img className="sector-btn-logo" src={encodeURI(sector.logo)} alt={sector.name} />
              : <window.Icon name={sector.iconKey} size={20} />}
          </div>
        </div>
        <div>
          <div className="sector-btn-title">{sector.name}</div>
        </div>
        {sector.tags && sector.tags.length > 0 && (
          <div className="sector-btn-tags">
            {sector.tags.map((t, i) => <span key={i} className="sector-btn-tag-chip">{t}</span>)}
          </div>
        )}
        <div className="sector-btn-cta">
          <span>Ver indicadores</span>
          <window.Icon name="arrow-right" size={16} />
        </div>
      </div>
    </button>
  );
}
window.SectorButton = SectorButton;

function fmtInt(n) {
  return n == null ? null : n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Rotación = ((altas + bajas) / 2) / ((dotación inicial + final) / 2), en %.
// matchLabel null = todas las filas sumadas (total de la marca); si no, una regional.
function rotacionStats(rows, matchLabel) {
  const sel = matchLabel == null ? (rows || []) : (rows || []).filter(r => r.x === matchLabel);
  if (sel.length === 0) return null;
  const sum = k => sel.reduce((a, r) => a + r[k], 0);
  const s = { dotIni: sum('dotIni'), dotFin: sum('dotFin'), altas: sum('altas'), bajas: sum('bajas') };
  const dotProm = (s.dotIni + s.dotFin) / 2;
  s.rot = dotProm > 0 ? ((s.altas + s.bajas) / 2) / dotProm * 100 : null;
  return s;
}
// Colores fijos por gerencia (paleta validada en claro y oscuro: daltonismo, contraste
// y separación). El color sigue a la gerencia según su orden en window.GERENCIAS; "Otros" en gris.
const SERIE_COLORES = ['#3B66A8', '#B97C33', '#00918E', '#7A5BB0', '#6B8E2F'];
const COLOR_OTROS = '#8B94A3';
function colorGerencia(sectorId, label) {
  const list = window.GERENCIAS[sectorId] || [];
  let g = list.find(x => x.matchLabel === label);
  if (!g) return COLOR_OTROS;
  // Quien reemplaza a otra persona en la misma regional hereda su color.
  for (let i = 0; i < list.length && g.reemplaza; i++) g = list.find(x => x.key === g.reemplaza) || g;
  const idx = list.filter(x => !x.reemplaza).indexOf(g);
  return SERIE_COLORES[Math.max(idx, 0) % SERIE_COLORES.length];
}

// Una regional puede cambiar de persona: "desde" / "hasta" (clave de mes) marcan el período.
function gerenciaActivaEn(g, monthIdx) {
  const idx = k => window.MONTHS.findIndex(m => m.key === k);
  return (!g.desde || monthIdx >= idx(g.desde)) && (!g.hasta || monthIdx <= idx(g.hasta));
}
// Si la persona elegida no estaba a cargo en ese mes, se pasa a quien tenía la misma
// regional (sucesor o antecesor vía "reemplaza"); si no hay, vuelve al total.
function resolverGerencia(list, key, monthIdx) {
  if (key === 'total') return 'total';
  const g = list.find(x => x.key === key);
  if (!g) return 'total';
  if (gerenciaActivaEn(g, monthIdx)) return key;
  const vistos = new Set([key]);
  const cola = [g];
  while (cola.length) {
    const cur = cola.shift();
    const vecinos = list.filter(x => x.reemplaza === cur.key || x.key === cur.reemplaza);
    for (const v of vecinos) {
      if (vistos.has(v.key)) continue;
      if (gerenciaActivaEn(v, monthIdx)) return v.key;
      vistos.add(v.key); cola.push(v);
    }
  }
  return 'total';
}
const nombreCorto = label => (label === 'Otros' ? 'Otros' : label.split(' ')[0]);
const MES_LARGO = { ENE:'Enero', FEB:'Febrero', MAR:'Marzo', ABR:'Abril', MAY:'Mayo', JUN:'Junio', JUL:'Julio', AGO:'Agosto', SEP:'Septiembre', OCT:'Octubre', NOV:'Noviembre', DIC:'Diciembre' };

function fmtPct(n) {
  return n == null ? 'S/D' : `${n.toFixed(2).replace('.', ',')}%`;
}
// Variación de rotación en puntos porcentuales (sobre los valores ya redondeados
// que se muestran). Subir la rotación es mala noticia → "down"/rojo.
function rotDelta(cur, prev, refLabel) {
  if (cur == null || prev == null) return null;
  const r2 = n => Math.round(n * 100) / 100;
  const diff = r2(r2(cur) - r2(prev));
  if (diff === 0) return { dir: 'neutral', text: `Sin cambios vs. ${refLabel} (${fmtPct(prev)})` };
  return { dir: diff > 0 ? 'down' : 'up', text: `${diff > 0 ? '+' : '−'}${Math.abs(diff).toFixed(2).replace('.', ',')} pp vs. ${refLabel} (${fmtPct(prev)})` };
}
// Índice del último mes de window.MONTHS que cumple la condición (-1 si ninguno).
function ultimoIdxCon(pred) {
  for (let i = window.MONTHS.length - 1; i >= 0; i--) if (pred(window.MONTHS[i])) return i;
  return -1;
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

// Top 5 zonales sumando uno o varios meses (para comparar se suma el
// desglose COMPLETO de cada mes elegido antes de recortar a 5 — sumar
// listas ya truncadas a 5 subestimaría zonales que quedaron justo afuera).
function computeTop5Zonales(sectorId, monthKeys, bucketKey) {
  const totals = {};
  monthKeys.forEach(mk => {
    const arr = window.ZONALES_FULL?.[sectorId]?.[mk]?.[bucketKey] || [];
    arr.forEach(({ x, y }) => { totals[x] = (totals[x] || 0) + y; });
  });
  return Object.entries(totals)
    .map(([x, y]) => ({ x, y }))
    .sort((a, b) => b.y - a.y)
    .slice(0, 5);
}

const MES_SHORT_CAP = { ENE:'Ene', FEB:'Feb', MAR:'Mar', ABR:'Abr', MAY:'May', JUN:'Jun', JUL:'Jul', AGO:'Ago', SEP:'Sep', OCT:'Oct', NOV:'Nov', DIC:'Dic' };
function mesShortXY(m) {
  return `${MES_SHORT_CAP[m.short]} ${String(m.year).slice(2)}`;
}
// Serie mensual de "Altas por mes" de UNA gerencia puntual (matchLabel null = total del
// sector, igual al c.data ya guardado). Se arma leyendo, mes a mes, el chart "gerencia-mes".
function monthlySeriesFor(sectorData, matchLabel) {
  return window.MONTHS.filter(m => sectorData[m.key]).map(m => {
    const md = sectorData[m.key];
    const val = sumOrPick(chartByKind(md.charts, 'gerencia-mes'), matchLabel, 'y');
    return { x: mesShortXY(m), y: val ?? 0 };
  });
}

function mesLabelFor(m) {
  return `${m.short.charAt(0)}${m.short.slice(1).toLowerCase()} ${m.year}`;
}
// Texto de contexto para "Altas acumuladas": cuántos meses se están sumando y qué rango
// (desde el primer mes hasta "last", el último mes con datos cargados).
function periodoAcumuladoTexto(last) {
  const first = window.MONTHS[0];
  return `${mesLabelFor(first)} – ${mesLabelFor(last)} · ${window.MONTHS.indexOf(last) + 1} meses`;
}
function pctOf(noPresentes, altasMes) {
  return (altasMes != null && noPresentes != null && altasMes > 0)
    ? Math.round((noPresentes / altasMes) * 1000) / 10
    : null;
}

// Gráficos que ya no se muestran. Sus datos se mantienen porque alimentan las
// tarjetas (altas / no presentes del mes, altas acumuladas), el resumen general,
// la comparación de meses, "Altas por mes" por gerencia y el panel YTD.
const CHARTS_OCULTOS = ['gerencia-mes', 'no-presentes-gerencia', 'gerencia-total'];

// ============ Panel "MARCA · YTD" (réplica de la referencia) ============
// Torta de altas del año en curso por gerencia + altas presentes vs. bajas del mes.
function YtdPanel({ sector, sectorData, monthIdx, matchLabel, selectedName, onSelect }) {
  const active = window.MONTHS[monthIdx];
  const ytd = window.MONTHS.filter((m, i) => i <= monthIdx && m.year === active.year && sectorData[m.key]);
  if (ytd.length === 0) return null;
  const totals = {};
  ytd.forEach(m => chartByKind(sectorData[m.key].charts, 'gerencia-mes').data.forEach(d => { totals[d.x] = (totals[d.x] || 0) + d.y; }));
  const order = [...(window.GERENCIAS[sector.id] || []).map(g => g.matchLabel), 'Otros'];
  const pie = order.filter(l => totals[l] > 0).map(l => ({ label: l, short: nombreCorto(l), value: totals[l], color: colorGerencia(sector.id, l) }));
  const totalYtd = pie.reduce((a, d) => a + d.value, 0);
  const rango = `${mesLabelFor(ytd[0])} – ${mesLabelFor(ytd[ytd.length - 1])}`;

  // Mes activo: altas presentes (ingresos − no presentes) vs. bajas (tabla de rotación).
  const md = sectorData[active.key];
  const altasMes = md ? sumOrPick(chartByKind(md.charts, 'gerencia-mes'), matchLabel, 'y') : null;
  const npMes = md ? sumOrPick(chartByKind(md.charts, 'no-presentes-gerencia'), matchLabel, 'y') : null;
  const presentes = altasMes != null ? altasMes - (npMes || 0) : null;
  const rot = rotacionStats(window.ROTACION?.[sector.id]?.[active.key], matchLabel);
  const bajas = rot ? rot.bajas : null;
  const hayPill = presentes != null && bajas != null && presentes + bajas > 0;
  const prev = window.MONTHS[monthIdx - 1];
  const aperturas = matchLabel ? [] : [active, prev].filter(Boolean)
    .map(m => ({ m, n: window.APERTURAS?.[sector.id]?.[m.key] })).filter(a => a.n != null);

  return (
    <div className="chart-card viz-panel">
      <div className="viz-title">{sector.name.split(' ')[0]} · YTD</div>
      <div className="viz-panel-sub">
        Altas {rango} · {fmtInt(totalYtd)} ingresos{matchLabel ? ` · ${selectedName}: ${fmtInt(totals[matchLabel] || 0)}` : ''}
      </div>
      <div className="ytd-body">
        <window.PieChart data={pie} activeLabel={matchLabel ?? undefined} onSelect={onSelect} />
        <div className="ytd-side">
          {hayPill && <window.PeopleRow total={6} filled={Math.round(presentes / (presentes + bajas) * 6)} color="var(--viz-pill-a)" empty="var(--viz-pill-b-icon)" />}
          {aperturas.length > 0 && (
            <div className="ytd-aper">
              {aperturas.map(a => <div key={a.m.key}>Ingresos por aperturas {mesLabelFor(a.m)} — <strong>{a.n}</strong></div>)}
            </div>
          )}
          {hayPill ? (
            <div className="viz-pill" title={`${mesLabelFor(active)}: ${presentes} altas presentes · ${bajas} bajas`}>
              <div className="viz-pill-a" style={{ flexGrow: presentes }}>Altas {fmtInt(presentes)}</div>
              <div className="viz-pill-b" style={{ flexGrow: bajas }}>Bajas {fmtInt(bajas)}</div>
            </div>
          ) : presentes != null ? (
            <div className="ytd-aper">Altas presentes {mesLabelFor(active)} — <strong>{fmtInt(presentes)}</strong></div>
          ) : null}
          <div className="ytd-foot">
            {mesLabelFor(active)}{hayPill ? ' · Altas = ingresos que se presentaron · Bajas = egresos del mes' : ' · sin bajas por gerencia cargadas para este mes'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ Panel "ROTACIÓN · MES" (réplica de la referencia) ============
function RotacionPanel({ sector, monthIdx, matchLabel, selectedName, onSelect }) {
  const m = window.MONTHS[monthIdx];
  const rows = window.ROTACION?.[sector.id]?.[m.key];
  if (!rows) return null;
  const prevM = window.MONTHS[monthIdx - 1] || null;
  const prevRows = prevM ? window.ROTACION?.[sector.id]?.[prevM.key] : null;
  const scope = rows.some(r => r.x === matchLabel) ? matchLabel : null;
  const cur = rotacionStats(rows, scope);
  const prev = prevRows ? rotacionStats(prevRows, scope) : null;
  const r2 = n => Math.round(n * 100) / 100;
  const diff = prev ? r2(r2(cur.rot) - r2(prev.rot)) : null;
  const bars = rows.map(r => {
    const p = prevRows?.find(q => q.x === r.x);
    return { label: r.x, short: nombreCorto(r.x), rot: rotacionStats([r], null).rot, prevRot: p ? rotacionStats([p], null).rot : null, dotIni: r.dotIni, dotFin: r.dotFin, altas: r.altas, bajas: r.bajas };
  }).sort((a, b) => b.rot - a.rot);

  return (
    <div className="chart-card chart-card--wide viz-panel">
      <div className="viz-title">Rotación · {MES_LARGO[m.short]}</div>
      <div className="viz-panel-sub">{mesLabelFor(m)} · {scope ? selectedName : `Total ${sector.name}`}</div>
      <div className="rot-body">
        <div className="rot-side">
          <div className="rot-month"><window.Icon name="users" size={20} /><span>{MES_LARGO[m.short]}</span><strong>{fmtPct(cur.rot)}</strong></div>
          {prev && (
            <div className="rot-month is-prev"><window.Icon name="users" size={18} /><span>{MES_LARGO[prevM.short]}</span><strong>{fmtPct(prev.rot)}</strong></div>
          )}
          {diff != null && (
            <div className={'rot-delta ' + (diff > 0 ? 'bad' : diff < 0 ? 'good' : '')}>
              {diff !== 0 && <window.TrendArrow dir={diff > 0 ? 'up' : 'down'} />}
              {diff === 0 ? 'Sin cambios' : `${diff > 0 ? '+' : '−'}${Math.abs(diff).toFixed(2).replace('.', ',')} pp`} vs. {MES_LARGO[prevM.short].toLowerCase()}
            </div>
          )}
          <window.PeopleRow total={6} filled={6} color="var(--viz-people)" />
          <div className="rot-dot">Dotación total — <strong>{fmtInt(cur.dotFin)}</strong></div>
        </div>
        <window.RotacionBars rows={bars} activeLabel={scope ?? undefined} onSelect={onSelect}
          mesLabel={mesLabelFor(m)} prevLabel={prevM ? mesLabelFor(prevM) : ''} fmtPct={fmtPct} />
      </div>
      <div className="viz-legend-note">
        Barra y número arriba: {mesLabelFor(m)}{prevRows ? ` · número dentro de la barra: ${mesLabelFor(prevM)}` : ''} · abajo: dotación final de la región · tocá una barra para ver esa gerencia
      </div>
    </div>
  );
}

// ============ Sector detail view ============
function SectorView({ sector, monthIdx, onMonthChange }) {
  const accent = window.ACCENTS[sector.accent] || window.ACCENTS.blue;
  const sectorData = window.SECTOR_DATA[sector.id];
  const gerencias = window.GERENCIAS[sector.id] || [];
  const totalEntry = { key: 'total', isTotal: true, name: `Total ${sector.name}`, role: 'Todas las gerencias', photo: sector.logo };
  const [selectedGerenciaKey, setSelectedGerenciaKey] = useState('total');

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

  // Gerencias a cargo en el mes activo (ej. Ivo Pisaniello hasta Ago 2026, Sebastián Calderón desde Sep 2026).
  const gerenciasMes = gerencias.filter(g => gerenciaActivaEn(g, effectiveMonthIdx));
  const pickerItems = gerenciasMes.length > 0 ? [totalEntry, ...gerenciasMes] : [];
  const resolvedKey = resolverGerencia(gerencias, selectedGerenciaKey, effectiveMonthIdx);
  const selectedGerencia = pickerItems.find(g => g.key === resolvedKey) || totalEntry;
  // Click en una porción / barra: elige esa gerencia (o vuelve al total si ya estaba elegida).
  function selectByLabel(label) {
    const g = gerencias.find(x => x.matchLabel === label);
    if (g) setSelectedGerenciaKey(g.key === resolvedKey ? 'total' : g.key);
  }
  const isTotalSelected = selectedGerencia.isTotal;
  const matchLabel = isTotalSelected ? null : selectedGerencia.matchLabel;

  // Busca datos del mes activo; si no existe, toma el último mes disponible
  const monthKeys = Object.keys(sectorData);
  const data = sectorData[activeMonth.key] || sectorData[monthKeys[monthKeys.length - 1]];
  const prevMonth = effectiveMonthIdx > 0 ? window.MONTHS[effectiveMonthIdx - 1] : null;
  // Meses con solo rotación cargada (sin altas): las tarjetas de altas quedan en S/D.
  const hasAltasMes = !!sectorData[activeMonth.key];
  const lastAltasMonth = window.MONTHS[ultimoIdxCon(m => sectorData[m.key])];
  const stat = hasAltasMes
    ? buildStat(sectorData, activeMonth.key, prevMonth && sectorData[prevMonth.key] ? prevMonth.key : null, matchLabel)
    : { altasTotal: buildStat(sectorData, lastAltasMonth.key, null, matchLabel).altasTotal, altasMes: null, altasMesPrev: null, noPresentes: null, noPresentesPrev: null };
  const altasDelta = deltaInfo(stat.altasMes, stat.altasMesPrev, false);
  const noPresentesDelta = deltaInfo(stat.noPresentes, stat.noPresentesPrev, true);
  const gPct = pctOf(stat.noPresentes, stat.altasMes);
  const mesLabel = mesLabelFor(activeMonth);

  // Altas del mes activo, netas de los "no presentes" — el total real de gente que quedó.
  const altasNetas = (stat.altasMes != null && stat.noPresentes != null) ? stat.altasMes - stat.noPresentes : null;
  const altasNetasPrev = (stat.altasMesPrev != null && stat.noPresentesPrev != null) ? stat.altasMesPrev - stat.noPresentesPrev : null;
  const altasNetasDelta = deltaInfo(altasNetas, altasNetasPrev, false);

  const visibleCharts = data.charts.filter(c => !CHARTS_OCULTOS.includes(c.matchKind));

  // Datos por columna cuando se está comparando
  const compareStats = isComparing ? sortedCompareIdxs.map(idx => {
    const m = window.MONTHS[idx];
    const mData = sectorData[m.key];
    const s = mData ? buildStat(sectorData, m.key, null, matchLabel) : { altasMes: null, noPresentes: null, altasTotal: null };
    return { idx, month: m, hasData: !!mData, ...s };
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
          <GerenciaPicker items={pickerItems} selectedKey={resolvedKey} onSelect={setSelectedGerenciaKey} />
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
                  <div className="compare-col-metric-value">{cs.hasData ? (fmtInt(cs.altasMes) ?? '0') : 'S/D'}</div>
                  {aDelta && <div className={'compare-col-delta ' + aDelta.dir}>{aDelta.text}</div>}
                </div>
                <div className="compare-col-metric">
                  <div className="compare-col-metric-label">No presentes</div>
                  <div className="compare-col-metric-value">{cs.hasData ? `${fmtInt(cs.noPresentes) ?? '0'}${pct != null ? ` (${pct}%)` : ''}` : 'S/D'}</div>
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
            { label: `Altas acumuladas${isTotalSelected ? '' : ' — ' + selectedGerencia.name}`, value: fmtInt(stat.altasTotal) ?? 'S/D', delta: { dir: 'neutral', text: periodoAcumuladoTexto(lastAltasMonth) } },
            { label: `Altas — ${mesLabel}`, value: hasAltasMes ? (fmtInt(stat.altasMes) ?? '0') : 'S/D', delta: hasAltasMes ? altasDelta : { dir: 'neutral', text: 'Sin datos de altas cargados' } },
            { label: `No presentes — ${mesLabel}`, value: hasAltasMes ? `${fmtInt(stat.noPresentes) ?? '0'}${gPct != null ? ` (${gPct}%)` : ''}` : 'S/D', delta: noPresentesDelta },
            { label: 'Altas - no presentes', value: hasAltasMes ? (fmtInt(altasNetas) ?? '0') : 'S/D', delta: altasNetasDelta },
          ].map((k, i) => <KpiCard key={i} kpi={k} />)}
        </div>
      )}

      <div className={'chart-grid' + (visibleCharts.length === 1 ? ' one' : '')}>
        {visibleCharts.map((c, i) => {
          const filtering = !!c.matchKind && !isTotalSelected;

          const ytdPanel = c.matchKind === 'top5-zonales' && !isComparing
            ? <YtdPanel key="ytd" sector={sector} sectorData={sectorData} monthIdx={effectiveMonthIdx} matchLabel={matchLabel} selectedName={selectedGerencia.name} onSelect={selectByLabel} />
            : null;
          if (c.matchKind === 'top5-zonales') {
            const bucketKey = filtering ? selectedGerencia.matchLabel : 'total';
            const zonalMonthKeys = isComparing ? sortedCompareIdxs.map(idx => window.MONTHS[idx].key) : [activeMonth.key];
            const zonalData = computeTop5Zonales(sector.id, zonalMonthKeys, bucketKey);
            const zonalSub = isComparing
              ? `Acumulado de ${sortedCompareIdxs.length} meses elegidos`
              : mesLabel;
            return (
              <React.Fragment key={i}>
              {ytdPanel}
              <div className="chart-card">
                <div className="chart-head">
                  <div className="chart-title">{c.title}{filtering ? ` — ${selectedGerencia.name}` : ''}</div>
                  <div className="chart-sub">{zonalSub}</div>
                </div>
                <div className="chart-body">
                  {zonalData.length > 0
                    ? <window.HBarChart data={zonalData} />
                    : <div className="chart-empty">{!isComparing && !hasAltasMes ? 'Sin datos de altas cargados para' : 'Sin altas registradas para'} {zonalSub.toLowerCase()}{filtering ? ` en ${selectedGerencia.name}` : ''}.</div>}
                </div>
              </div>
              </React.Fragment>
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
          // "Altas por mes" (línea) también sigue a la gerencia elegida: en vez del
          // total del sector, arma su propia serie mensual mes a mes.
          const isLineFiltering = c.type === 'line' && !isTotalSelected;
          const lineData = isLineFiltering ? monthlySeriesFor(sectorData, selectedGerencia.matchLabel) : c.data;
          const titleSuffix = (filtering || isLineFiltering) ? ` — ${selectedGerencia.name}` : '';
          const lineSub = isLineFiltering
            ? `${mesLabelFor(window.MONTHS[0])} – ${mesLabelFor(lastAltasMonth)} · altas de ${selectedGerencia.name} por mes`
            : c.sub;
          return (
            <div key={i} className={'chart-card' + (c.full ? ' chart-card--wide' : '')}>
              <div className="chart-head">
                <div className="chart-title">{c.title}{titleSuffix}</div>
                <div className="chart-sub">{c.type === 'line' ? lineSub : (isComparableBar ? 'Comparando meses elegidos' : c.sub)}</div>
              </div>
              <div className="chart-body">
                {c.type === 'line'  && <window.LineChart  data={lineData} activeIndex={effectiveMonthIdx < lineData.length ? effectiveMonthIdx : undefined} activeIndices={isComparing ? sortedCompareIdxs.filter(idx => idx < lineData.length) : undefined} wide={c.wide} seriesLabel="altas" />}
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

      {!isComparing && (
        <div className="chart-grid one" style={{ marginTop: 14 }}>
          <RotacionPanel sector={sector} monthIdx={effectiveMonthIdx} matchLabel={matchLabel} selectedName={selectedGerencia.name} onSelect={selectByLabel} />
        </div>
      )}

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

// Anima el primer número del valor (formato es-AR: "4.151", "9,79%", "5 (2.2%)").
// Con "reducir movimiento" activado muestra el valor final directo.
function useCountUp(text) {
  const m = typeof text === 'string' ? text.match(/^(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d+))?/) : null;
  const target = m ? Number(m[1].replace(/\./g, '') + (m[2] ? '.' + m[2] : '')) : null;
  const decimals = m && m[2] ? m[2].length : 0;
  const [val, setVal] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    if (target == null) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const from = fromRef.current;
    fromRef.current = target;
    if (reduce || from === target) { setVal(target); return; }
    let raf;
    const t0 = performance.now(), dur = 750;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur);
      setVal(from + (target - from) * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  if (target == null) return text;
  const [ent, dec] = val.toFixed(decimals).split('.');
  return fmtInt(Number(ent)) + (dec ? ',' + dec : '') + text.slice(m[0].length);
}

function KpiCard({ kpi }) {
  const dir = kpi.delta?.dir;
  const shown = useCountUp(kpi.value);
  return (
    <div className="kpi">
      <div className="kpi-head">
        <div className="kpi-label">{kpi.label}</div>
        <div className="kpi-ico"><window.Icon name="chart" size={14} /></div>
      </div>
      <div className={'kpi-value ' + (kpi.valueClass || '')} aria-label={kpi.value}>{shown}</div>
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
