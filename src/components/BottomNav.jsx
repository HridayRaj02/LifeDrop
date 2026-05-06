import { Home, List, Droplets, User } from 'lucide-react'

const icons = { home: Home, requests: List, donate: Droplets, profile: User }

export default function BottomNav({ activeNav, navItems, onNav }) {
  return (
    <div style={{ display: 'flex', background: 'white', borderTop: '1px solid #f5eaea', paddingBottom: 8, paddingTop: 6, flexShrink: 0, boxShadow: '0 -4px 16px rgba(0,0,0,0.05)' }}>
      {navItems.map(item => {
        const Icon = icons[item.id]
        const isActive = activeNav === item.id
        return (
          <button key={item.id} onClick={() => onNav(item)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', fontFamily: 'Nunito, sans-serif', position: 'relative' }}>
            {isActive && (
              <div
                style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', width: 24, height: 3, background: '#C0392B', borderRadius: 2 }} />
            )}
            <div style={{ width: 36, height: 36, borderRadius: 12, background: isActive ? '#FDF0F0' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} color={isActive ? '#C0392B' : '#bbb'} />
            </div>
            <span style={{ fontSize: 10, fontWeight: isActive ? 800 : 500, color: isActive ? '#C0392B' : '#bbb' }}>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
