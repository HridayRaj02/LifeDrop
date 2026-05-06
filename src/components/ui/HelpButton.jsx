export default function HelpButton({ onClick, children = 'Help Now', style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #C0392B, #E85D5D)',
        color: 'white', padding: '8px 18px', borderRadius: 22,
        fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer',
        fontFamily: 'Nunito, sans-serif',
        boxShadow: '0 4px 14px rgba(192,57,43,0.32)',
        ...style,
      }}>
      {children}
    </button>
  )
}
