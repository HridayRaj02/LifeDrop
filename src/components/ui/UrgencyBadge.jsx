const styles = {
  Critical: { bg: '#FDECEA', color: '#C0392B', border: '#E85D5D', icon: '🚨' },
  High:     { bg: '#FEF3E2', color: '#D68910', border: '#F0A500', icon: '' },
  Normal:   { bg: '#F5F5F5', color: '#777',    border: '#ddd',    icon: '' },
}

export default function UrgencyBadge({ level }) {
  const s = styles[level] || styles.Normal
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: '4px 11px', borderRadius: 12,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      display: 'inline-flex', alignItems: 'center', gap: 3,
    }}>
      {s.icon && <span style={{ fontSize: 10 }}>{s.icon}</span>}
      {level}
    </span>
  )
}
