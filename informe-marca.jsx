// App del HTML interactivo por marca — no se carga en index.html: exportar.jsx (exportarHtml)
// la compila junto con charts / sidebar / views y la mete en el archivo descargado.
// Muestra una sola marca (sin panel general ni login), con los datos filtrados a esa marca.
function InformeMarca() {
  const { marcaId, monthIdx: mesInicial, generado } = window.INFORME_MARCA;
  const sector = window.SECTORS.find(s => s.id === marcaId);
  const [monthIdx, setMonthIdx] = React.useState(mesInicial);

  return (
    <div className="app no-sidebar">
      <main className="main" data-screen-label={sector.name}>
        <div className="topbar">
          <div className="topbar-left">
            <div className="crumbs">
              <span>Equipo de Selección</span>
              <span className="crumb-sep">›</span>
              <span className="crumb-here">{sector.name}</span>
            </div>
          </div>
          <div className="topbar-actions">
            <span className="btn btn-ghost" title="Los datos son los del panel a esa fecha">Generado el {generado}</span>
          </div>
        </div>
        <window.SectorView sector={sector} monthIdx={monthIdx} onMonthChange={setMonthIdx} />
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<InformeMarca />);
