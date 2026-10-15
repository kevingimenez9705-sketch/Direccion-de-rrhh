// Vista "Oficina digital" — los agentes de IA del equipo (n8n) con sus tareas y su actividad.
// Lee de Supabase (proyecto ATS) con la clave publicable: la ficha de cada agente (tabla
// "agentes") y totales sin datos personales (funciones oficina_*). La bitácora y el screening
// detallado no son legibles desde acá.
(function () {
  const { useState, useEffect } = React;
  const SUPABASE_URL = 'https://gkotckcvookkbbtbctyp.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_iu66s54UVbg5AsF-AoekPA_6qKUevVH';
  const N8N_AGENTES = 'https://kevin9705.app.n8n.cloud/projects/MzRtqNwNuk7fWtaT/agents/';
  const DIAS = 30, DIAS_GRAFICO = 14;
  const ESTADOS = { activo: 'Activo', borrador: 'Borrador', pausado: 'Pausado' };
  const RECOMENDACIONES = [
    { key: 'avanzar', label: 'Avanzar' },
    { key: 'revisar', label: 'Revisar' },
    { key: 'descartar', label: 'Descartar' },
    { key: 'duplicado', label: 'Duplicado' },
  ];

  async function pedir(path, body) {
    const res = await fetch(SUPABASE_URL + '/rest/v1/' + path, {
      method: body ? 'POST' : 'GET',
      headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
    return res.json();
  }

  const fmtInt = n => (n == null ? 'S/D' : Number(n).toLocaleString('es-AR'));
  const fmtHoras = min => {
    const h = (Number(min) || 0) / 60;
    return h < 10 ? h.toLocaleString('es-AR', { maximumFractionDigits: 1 }) + ' h' : Math.round(h).toLocaleString('es-AR') + ' h';
  };
  function hace(iso) {
    if (!iso) return 'Sin actividad';
    const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (min < 1) return 'Recién';
    if (min < 60) return `Hace ${min} min`;
    const h = Math.round(min / 60);
    if (h < 24) return `Hace ${h} h`;
    const d = Math.round(h / 24);
    return d === 1 ? 'Ayer' : `Hace ${d} días`;
  }
  // Últimos N días (hora de Buenos Aires) como YYYY-MM-DD, del más viejo al más nuevo.
  function ultimosDias(n) {
    const hoy = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date());
    const base = new Date(hoy + 'T12:00:00Z');
    return Array.from({ length: n }, (_, i) => {
      const d = new Date(base);
      d.setUTCDate(base.getUTCDate() - (n - 1 - i));
      return d.toISOString().slice(0, 10);
    });
  }

  function useOficina() {
    const [estado, setEstado] = useState({ cargando: true, error: null, agentes: [], actividad: [], diaria: [], screening: [] });
    useEffect(() => {
      let vivo = true;
      Promise.all([
        pedir('agentes?select=*&order=orden.asc'),
        pedir('rpc/oficina_actividad', { dias: DIAS }),
        pedir('rpc/oficina_actividad_diaria', { dias: DIAS_GRAFICO }),
        pedir('rpc/oficina_screening', { dias: DIAS }),
      ])
        .then(([agentes, actividad, diaria, screening]) => vivo && setEstado({ cargando: false, error: null, agentes, actividad, diaria, screening }))
        .catch(err => vivo && setEstado(e => ({ ...e, cargando: false, error: err.message })));
      return () => { vivo = false; };
    }, []);
    return estado;
  }

  function AgenteCard({ a, act }) {
    const estado = a.estado || 'borrador';
    return (
      <article className="ofi-card">
        <header className="ofi-card-head">
          <span className="ofi-emoji" aria-hidden="true">{a.emoji}</span>
          <div className="ofi-card-title">
            <h3>{a.nombre}</h3>
            <span className={'ofi-chip is-' + estado}>{ESTADOS[estado] || estado}</span>
          </div>
        </header>
        <p className="ofi-rol">{a.rol}</p>

        <div className="ofi-stats">
          <div><strong>{fmtInt(act ? act.items : 0)}</strong><span>ítems · {DIAS} días</span></div>
          <div><strong>{fmtHoras(act ? act.minutos : 0)}</strong><span>ahorradas</span></div>
          <div><strong>{hace(act && act.ultima)}</strong><span>última actividad</span></div>
        </div>
        {act && (act.errores > 0 || act.pendientes > 0) && (
          <div className="ofi-alerta">
            ⚠️ {[act.errores > 0 && `${act.errores} con error`, act.pendientes > 0 && `${act.pendientes} pendientes`].filter(Boolean).join(' · ')}
          </div>
        )}

        <div className="ofi-block-label">Tareas</div>
        <ul className="ofi-tareas">
          {(a.tareas || []).map((t, i) => <li key={i}>{t}</li>)}
        </ul>

        <div className="ofi-block-label">Cuándo trabaja</div>
        <div className="ofi-chips">{(a.disparadores || []).map((d, i) => <span key={i}>{d}</span>)}</div>

        <div className="ofi-block-label">Herramientas</div>
        <div className="ofi-chips is-soft">{(a.herramientas || []).map((h, i) => <span key={i}>{h}</span>)}</div>

        <dl className="ofi-meta">
          <div><dt>Control humano</dt><dd>{a.aprobacion_humana || '—'}</dd></div>
          <div><dt>Responsable</dt><dd>{a.responsable || '—'}</dd></div>
          <div><dt>KPI</dt><dd>{a.kpi || '—'}</dd></div>
        </dl>

        {a.n8n_agent_id && (
          <a className="ofi-link" href={N8N_AGENTES + a.n8n_agent_id} target="_blank" rel="noopener noreferrer">
            Abrir en n8n <window.Icon name="arrow-right" size={14} />
          </a>
        )}
      </article>
    );
  }

  function OficinaView({ sector }) {
    const accent = window.ACCENTS[sector.accent] || window.ACCENTS.blue;
    const { cargando, error, agentes, actividad, diaria, screening } = useOficina();

    const porAgente = Object.fromEntries(actividad.map(x => [x.agente_id, x]));
    const total = actividad.reduce((t, x) => ({
      acciones: t.acciones + Number(x.acciones), items: t.items + Number(x.items), minutos: t.minutos + Number(x.minutos),
    }), { acciones: 0, items: 0, minutos: 0 });
    const activos = agentes.filter(a => a.estado === 'activo').length;

    const dias = ultimosDias(DIAS_GRAFICO);
    const itemsDia = Object.fromEntries(dias.map(d => [d, 0]));
    diaria.forEach(x => { if (x.dia in itemsDia) itemsDia[x.dia] += Number(x.items); });
    const serieDiaria = dias.map(d => ({ x: d.slice(8, 10) + '/' + d.slice(5, 7), y: itemsDia[d] }));
    const hayDiaria = serieDiaria.some(d => d.y > 0);

    const recos = RECOMENDACIONES
      .map(r => ({ label: r.label, value: Number((screening.find(s => s.recomendacion === r.key) || {}).cantidad || 0) }))
      .filter(r => r.value > 0);
    const totalRecos = recos.reduce((t, r) => t + r.value, 0);

    const kpis = [
      { label: 'Agentes', value: fmtInt(agentes.length), delta: { dir: 'neutral', text: `${activos} ${activos === 1 ? 'activo' : 'activos'} · ${agentes.length - activos} en borrador o pausa` } },
      { label: `Acciones — ${DIAS} días`, value: fmtInt(total.acciones), delta: { dir: 'neutral', text: 'Corridas y pedidos resueltos' } },
      { label: `Ítems procesados — ${DIAS} días`, value: fmtInt(total.items), delta: { dir: 'neutral', text: 'Postulaciones, búsquedas, entrevistas…' } },
      { label: `Tiempo ahorrado — ${DIAS} días`, value: fmtHoras(total.minutos), delta: { dir: 'neutral', text: 'Estimado por cada agente' } },
    ];

    return (
      <div style={accent}>
        <div className="sector-hero">
          <div className="sector-hero-ico"><window.Icon name="bot" size={28} /></div>
          <h2>{sector.name}</h2>
        </div>

        {cargando && <div className="chart-empty">Cargando la oficina…</div>}
        {error && (
          <div className="chart-empty">No se pudo leer la oficina desde Supabase ({error}). Probá recargar la página.</div>
        )}

        {!cargando && !error && (
          <>
            <div className="section-label" style={{ marginTop: 0 }}>Resumen — últimos {DIAS} días</div>
            <div className="kpi-grid">
              {kpis.map((k, i) => <window.KpiCard key={k.label} kpi={k} index={i} />)}
            </div>

            <div className="chart-grid">
              <div className="chart-card">
                <div className="chart-head">
                  <div className="chart-title">Actividad diaria</div>
                  <div className="chart-sub">Ítems procesados por todos los agentes · últimos {DIAS_GRAFICO} días</div>
                </div>
                <div className="chart-body">
                  {hayDiaria
                    ? <window.BarChart data={serieDiaria} activeLabel={serieDiaria[serieDiaria.length - 1].x} hideZero />
                    : <div className="chart-empty">Todavía no hay actividad registrada.</div>}
                </div>
              </div>
              <div className="chart-card">
                <div className="chart-head">
                  <div className="chart-title">Screening</div>
                  <div className="chart-sub">Recomendaciones sobre postulaciones · últimos {DIAS} días</div>
                </div>
                <div className="chart-body">
                  {totalRecos > 0
                    ? <window.DonutChart data={recos} center={fmtInt(totalRecos)} />
                    : <div className="chart-empty">El agente de Screening todavía no revisó postulaciones.</div>}
                </div>
              </div>
            </div>

            <div className="section-label">Equipo de agentes — qué hace cada uno</div>
            <div className="ofi-grid">
              {agentes.map(a => <AgenteCard key={a.id} a={a} act={porAgente[a.id]} />)}
            </div>
          </>
        )}
      </div>
    );
  }

  window.OficinaView = OficinaView;
})();
