// Icon set — minimal stroke icons used across sidebar, KPIs, and sector buttons
const Icon = ({ name, size = 18, stroke = 1.7 }) => {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round'
  };
  switch (name) {
    case 'home':       return <svg {...common}><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z"/></svg>;
    case 'grid':       return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
    case 'building':   return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/></svg>;
    case 'utensils':   return <svg {...common}><path d="M4 3v8a3 3 0 0 0 3 3v7M7 3v8M10 3v8"/><path d="M17 3c-1.5 1.5-2 4-2 6s.5 4 2 4v8"/></svg>;
    case 'truck':      return <svg {...common}><path d="M3 7h11v9H3zM14 11h4l3 3v2h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>;
    case 'briefcase':  return <svg {...common}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>;
    case 'factory':    return <svg {...common}><path d="M3 21V10l5 3V10l5 3V6l8 5v10z"/><path d="M7 17h2M12 17h2M17 17h2"/></svg>;
    case 'gavel':      return <svg {...common}><path d="M13 5l6 6M10 8l3-3 6 6-3 3zM3 21l7-7M5 19l4 1-1-4"/></svg>;
    case 'search':     return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'alert':      return <svg {...common}><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18.5v.5"/></svg>;
    case 'clock':      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>;
    case 'users':      return <svg {...common}><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14c3.5.3 6 2.5 6 6"/></svg>;
    case 'calendar':   return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
    case 'refresh':    return <svg {...common}><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 4v4h-4"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 20v-4h4"/></svg>;
    case 'percent':    return <svg {...common}><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/><path d="M19 5 5 19"/></svg>;
    case 'arrow-right':return <svg {...common}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'arrow-left': return <svg {...common}><path d="M19 12H5M11 5l-7 7 7 7"/></svg>;
    case 'arrow-up':   return <svg {...common}><path d="M12 19V5M5 12l7-7 7 7"/></svg>;
    case 'chevron-r':  return <svg {...common}><path d="M9 6l6 6-6 6"/></svg>;
    case 'sidebar-collapse': return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/><path d="M16 9l-2.5 3 2.5 3"/></svg>;
    case 'sidebar-expand':   return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/><path d="M13.5 9l2.5 3-2.5 3"/></svg>;
    case 'dollar':     return <svg {...common}><path d="M12 3v18M17 7H9.5a3 3 0 0 0 0 6h5a3 3 0 0 1 0 6H6"/></svg>;
    case 'chart':      return <svg {...common}><path d="M3 20V4M3 20h18M7 16V10M11 16V7M15 16v-9M19 16v-5"/></svg>;
    case 'sun':        return <svg {...common}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>;
    case 'moon':       return <svg {...common}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>;
    default: return null;
  }
};
window.Icon = Icon;

// ============ Sidebar ============
function Sidebar({ activeId, onNavigate, collapsed }) {
  // Single flat list — Panel ejecutivo first, then all sectors
  const items = [
    { id: '__panel', name: 'Panel ejecutivo', iconKey: 'home' },
    ...window.SECTORS,
  ];

  return (
    <aside className={'sidebar' + (collapsed ? ' collapsed' : '')}>
      <div className="sb-brand">
        <div className="sb-brand-mark">RH</div>
        <div className="sb-brand-text">
          <div className="sb-brand-name">RRHH</div>
          <div className="sb-brand-sub">Dirección</div>
        </div>
      </div>

      <div className="sb-user">
        <div className="sb-user-name">César Lugo</div>
        <div className="sb-user-role">Director de RRHH</div>
      </div>

      <nav className="sb-nav">
        {items.map(item => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              className={'sb-link' + (isActive ? ' active' : '')}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.name : undefined}
            >
              <span className={'sb-link-ico' + (item.logo ? ' has-logo' : '')}>
                {item.logo
                  ? <img className="sb-link-logo" src={encodeURI(item.logo)} alt={item.name} />
                  : <Icon name={item.iconKey} size={17} />}
              </span>
              <span className="sb-link-label">{item.name}</span>
              {item.id !== '__panel' && <span className="sb-link-dot"></span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
window.Sidebar = Sidebar;
