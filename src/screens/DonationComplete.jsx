import { Download, Home, RotateCcw, Share2, ShieldAlert, Star } from 'lucide-react'
import { formatDisplayDate, getCooldownStatus, getTodayIsoDate } from '../utils/bloodCompatibility'

const PRECAUTIONS = [
  'Drink extra water for the next 24 hours.',
  'Avoid heavy lifting or intense workouts for the rest of the day.',
  'Keep the bandage on for at least 4 to 5 hours.',
  'Eat an iron-rich meal and do not skip rest.',
]

export default function DonationComplete({ navigate, selectedBlood, donorProfile, onReset }) {
  const cooldown = getCooldownStatus(donorProfile?.lastDonationDate || getTodayIsoDate())

  const downloadCertificate = () => {
    const certificateText = [
      'LifeDrop Donation Certificate',
      '',
      `Donor: ${donorProfile?.fullName || 'Verified Donor'}`,
      `Blood Group: ${selectedBlood || donorProfile?.bloodGroup || 'O+'}`,
      `Donation Date: ${formatDisplayDate(new Date())}`,
      'Hospital: City Hospital',
      '',
      'Thank you for helping save lives with LifeDrop.',
    ].join('\n')

    const blob = new Blob([certificateText], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'lifedrop-donation-certificate.txt'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#FDF6F6', overflowY: 'auto', scrollbarWidth: 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 20px 0', gap: 10 }}>
        <button onClick={() => navigate('dashboard')} style={topIconButtonStyle}>
          <Home size={18} color="#888" />
        </button>
        <button onClick={onReset} style={resetButtonStyle}>
          <RotateCcw size={15} /> Reset demo
        </button>
      </div>

      <div className="lifedrop-slide-up" style={{ display: 'flex', justifyContent: 'center', padding: '6px 30px 0' }}>
        <div style={{ width: 220, height: 190, borderRadius: 28, background: 'linear-gradient(135deg, #FDECEA 0%, #FFF5F5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '2px solid #FDDCDC', boxShadow: '0 18px 40px rgba(192,57,43,0.12)' }}>
          <div style={{ fontSize: 70 }}>🩺</div>
          {[
            { icon: '❤️', top: 15, right: 18, size: 28 },
            { icon: '🩸', bottom: 20, left: 20, size: 24 },
            { icon: '💛', top: 12, left: 28, size: 22 },
            { icon: '✨', bottom: 14, right: 24, size: 20 },
          ].map((d, i) => (
            <div key={i} className={i % 2 === 0 ? 'lifedrop-float' : 'lifedrop-float-delay'} style={{ position: 'absolute', fontSize: d.size, top: d.top, right: d.right, bottom: d.bottom, left: d.left }}>
              {d.icon}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '18px 20px 24px' }}>
        <div className="lifedrop-slide-up lifedrop-slide-delay-1" style={{ textAlign: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#1a1a1a', letterSpacing: -0.3 }}>
            You saved a life ❤️
          </div>
          <div style={{ fontSize: 13, color: '#999', marginTop: 6, lineHeight: 1.5 }}>
            Your donation has made a real difference today
          </div>
        </div>

        <div className="lifedrop-slide-up lifedrop-slide-delay-1" style={cardStyle}>
          <div style={{ background: 'linear-gradient(90deg, #C0392B, #E05050)', height: 4, margin: '-16px -18px 14px' }} />
          {[
            { label: 'Blood type donated:', value: selectedBlood || donorProfile?.bloodGroup || 'O+' },
            { label: 'Units donated:', value: '1 Unit' },
            { label: 'Location:', value: 'City Hospital' },
            { label: 'Next eligible date:', value: formatDisplayDate(cooldown.nextEligibleDate) },
          ].map((row, i) => (
            <div key={i} style={summaryRowStyle}>
              <span style={{ fontSize: 13, color: '#888' }}>{row.label}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#1a1a1a', textAlign: 'right' }}>{row.value}</span>
            </div>
          ))}
          <div style={{ textAlign: 'center', paddingTop: 6, fontSize: 13, color: '#888' }}>
            This can help up to <strong style={{ color: '#C0392B', fontSize: 14 }}>3 people</strong>
          </div>
        </div>

        <div className="lifedrop-slide-up lifedrop-slide-delay-2" style={cooldownCardStyle}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
            <ShieldAlert size={18} color="#8B5A14" />
            <div style={{ fontSize: 14, fontWeight: 900, color: '#6F4211' }}>Donation cooldown active</div>
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#8B5A14', marginBottom: 6 }}>
            {cooldown.daysRemaining} day{cooldown.daysRemaining === 1 ? '' : 's'}
          </div>
          <div style={{ fontSize: 12, color: '#8B6A3A', lineHeight: 1.5 }}>
            You can donate again after <strong>{formatDisplayDate(cooldown.nextEligibleDate)}</strong>. LifeDrop will keep donation actions locked for 56 days / 8 weeks.
          </div>
        </div>

        <div className="lifedrop-slide-up lifedrop-slide-delay-2" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fffaf8 100%)', borderRadius: 18, padding: '14px 16px', marginBottom: 14, boxShadow: '0 10px 24px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', border: '3px dashed #C0392B', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FDF0F0', flexShrink: 0, gap: 1 }}>
            <span style={{ fontSize: 28 }}>🏅</span>
            <span style={{ fontSize: 7, fontWeight: 900, color: '#C0392B', textAlign: 'center', lineHeight: 1.2 }}>LifeSaver Badge</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#1a1a1a', fontStyle: 'italic', marginBottom: 6, lineHeight: 1.4 }}>
              &quot;Heroes don&apos;t always wear capes&quot;
            </div>
            <div style={{ display: 'flex', gap: 1, marginBottom: 5 }}>
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={13} color="#F0A500" fill="#F0A500" />)}
            </div>
            <div style={{ fontSize: 11, color: '#aaa' }}>Total donations: <strong style={{ color: '#C0392B' }}>3</strong></div>
          </div>
        </div>

        <div className="lifedrop-slide-up lifedrop-slide-delay-3" style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 900, color: '#1a1a1a', marginBottom: 12 }}>
            After-donation precautions
          </div>
          {PRECAUTIONS.map((item, index) => (
            <div key={index} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: index < PRECAUTIONS.length - 1 ? 10 : 0 }}>
              <span style={{ fontSize: 14 }}>•</span>
              <span style={{ fontSize: 12, color: '#6D5E5E', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>

        <button className="lifedrop-slide-up lifedrop-slide-delay-3" onClick={() => navigate('dashboard')} style={primaryButtonStyle}>
          Done ✓
        </button>

        <button className="lifedrop-slide-up lifedrop-slide-delay-3" onClick={downloadCertificate} style={secondaryButtonStyle}>
          <Download size={16} /> Download certificate
        </button>

        <button className="lifedrop-slide-up lifedrop-slide-delay-3" style={{ ...secondaryButtonStyle, marginBottom: 16 }}>
          <Share2 size={16} /> Share your impact
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
          {[
            { icon: '🏥', label: 'Safe donation completed' },
            { icon: '✅', label: 'Verified hospital' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 14 }}>{s.icon}</span>
              <span style={{ fontSize: 10, color: '#aaa', fontWeight: 700 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const cardStyle = {
  background: 'white',
  borderRadius: 20,
  overflow: 'hidden',
  marginBottom: 14,
  boxShadow: '0 4px 20px rgba(192,57,43,0.1)',
  border: '1px solid #FDECEA',
  padding: '16px 18px',
}

const cooldownCardStyle = {
  background: 'linear-gradient(135deg, #FFF1ED 0%, #FFE3DC 100%)',
  border: '1px solid #F4B9AB',
  borderLeft: '5px solid #D64532',
  borderRadius: 20,
  padding: '16px 18px',
  marginBottom: 14,
  boxShadow: '0 10px 26px rgba(214,69,50,0.14)',
}

const summaryRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 12,
  paddingBottom: 10,
  marginBottom: 10,
  borderBottom: '1px solid #f8eeee',
}

const primaryButtonStyle = {
  width: '100%',
  padding: '14px',
  background: 'linear-gradient(135deg, #B03020, #E05050)',
  color: 'white',
  borderRadius: 22,
  fontWeight: 900,
  fontSize: 16,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
  boxShadow: '0 8px 24px rgba(192,57,43,0.38)',
  marginBottom: 12,
}

const secondaryButtonStyle = {
  width: '100%',
  padding: '12px',
  background: 'white',
  border: '2px solid #FDECEA',
  borderRadius: 18,
  color: '#C0392B',
  fontWeight: 800,
  fontSize: 14,
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  marginBottom: 12,
}

const topIconButtonStyle = {
  background: '#F5F0F0',
  border: 'none',
  width: 38,
  height: 38,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}

const resetButtonStyle = {
  background: '#FFF3F3',
  border: '1px solid #F6D6D6',
  color: '#B03020',
  borderRadius: 999,
  padding: '0 14px',
  minHeight: 38,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
  fontSize: 12,
  fontWeight: 800,
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
}
