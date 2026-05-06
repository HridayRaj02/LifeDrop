import { CheckCircle } from 'lucide-react'
export default function VerifiedBadge({ label = 'Verified', size = 13 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <CheckCircle size={size} color="#27AE60" fill="#27AE60" />
      <span style={{ fontSize: size - 1, color: '#27AE60', fontWeight: 700 }}>{label}</span>
    </span>
  )
}
