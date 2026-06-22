// Main App — handles navigation between Panel Ejecutivo and sector views
const { useState, useEffect } = React;

function App() {
  const [view, setView] = useState('__panel'); // '__panel' or sector.id
  const [monthIdx, setMonthIdx] = useState(4); // default May 2026

  // Persist navigation across reload
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('rrhh:view') || 'null');
      if (saved && (saved.view === '__panel' || window.SECTORS.find(s => s.id === saved.view))) {
        setView(saved.view);
        if (typeof saved.monthIdx === 'number') setMonthIdx(saved.monthIdx);
      }
    } catch (_) {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem('rrhh:view', JSON.stringify({ view, monthIdx })); } catch (_) {}
  }, [view, monthIdx]);

  const sector = view !== '__panel' ? window.SECTORS.find(s => s.id === view) : null;
  const activeMonth = window.MONTHS[monthIdx];

  return (
    <div className="app no-sidebar">
      <main className="main" data-screen-label={sector ? sector.name : 'Panel ejecutivo'}>
        <div className="topbar">
          <div className="topbar-left">
            {sector && (
              <button
                className="back-btn"
                onClick={() => setView('__panel')}
                title="Volver al Panel ejecutivo"
                aria-label="Volver al Panel ejecutivo"
              >
                <window.Icon name="arrow-left" size={18} />
                <span>Panel ejecutivo</span>
              </button>
            )}
            <div className="crumbs">
              <button className="crumb-link" onClick={() => setView('__panel')}>RRHH</button>
              <span className="crumb-sep">›</span>
              {sector ? (
                <>
                  <button className="crumb-link" onClick={() => setView('__panel')}>Panel ejecutivo</button>
                  <span className="crumb-sep">›</span>
                  <span className="crumb-here">{sector.name}</span>
                </>
              ) : (
                <span className="crumb-here">Panel ejecutivo</span>
              )}
            </div>
          </div>
          <div className="topbar-actions">
            <button className="btn btn-ghost">{activeMonth.short.charAt(0) + activeMonth.short.slice(1).toLowerCase()} {activeMonth.year}</button>
          </div>
        </div>

        {view === '__panel' ? (
          <window.PanelEjecutivo onOpen={(id) => setView(id)} />
        ) : (
          <window.SectorView key={view} sector={sector} monthIdx={monthIdx} onMonthChange={setMonthIdx} />
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
