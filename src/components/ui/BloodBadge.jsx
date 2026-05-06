export default function BloodBadge({ type, size = 'md' }) {
  const sizes = {
    sm: { fontSize: 18, minWidth: 38 },
    md: { fontSize: 26, minWidth: 50 },
    lg: { fontSize: 42, minWidth: 70 },
    xl: { fontSize: 60, minWidth: 90 },
  }
  const s = sizes[size]
  return (
    <span style={{
      fontSize: s.fontSize, fontWeight: 900, color: '#C0392B',
      minWidth: s.minWidth, lineHeight: 1.1, display: 'inline-block',
      fontFamily: 'Nunito, sans-serif',
    }}>
      {type}
    </span>
  )
}
