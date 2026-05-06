import { ArrowLeft, MapPin, CheckCircle, Navigation } from 'lucide-react'
import VerifiedBadge from '../components/ui/VerifiedBadge'

const STEPS = [
  { id: 1, label: 'Accepted', emoji: '✓', status: 'done' },
  { id: 2, label: 'Traveling', emoji: '🚗', status: 'active' },
  { id: 3, label: 'At Hospital', emoji: '🏥', status: 'inactive' },
  { id: 4, label: 'Donation Complete', emoji: '🩸', status: 'inactive' },
]

export default function DonationInProgress({ navigate, onDonationComplete }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F9F2F2', overflow: 'hidden' }}>
      <div style={{ background: 'linear-gradient(135deg, #8f1c17, #C0392B)', padding: '20px 20px 22px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <div className="lifedrop-float" style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => navigate('details')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={18} color="white" />
          </button>
          <div>
            <div style={{ fontSize: 17, fontWeight: 900, color: 'white' }}>Donation in Progress</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>You&apos;re helping save a life ❤️</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
        <div className="lifedrop-slide-up" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fff8f6 100%)', margin: '12px 16px 0', borderRadius: 24, padding: '18px 16px', boxShadow: '0 10px 26px rgba(0,0,0,0.08)', border: '1px solid #f3e3df' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {STEPS.map((step, i) => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div
                    className={step.status === 'active' ? 'lifedrop-pulse' : ''}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: step.status === 'done' ? 16 : 18,
                      background: step.status === 'done' ? '#27AE60' : step.status === 'active' ? '#C0392B' : 'white',
                      color: step.status === 'inactive' ? '#ccc' : 'white',
                      border: step.status === 'inactive' ? '2px solid #eee' : 'none',
                      fontWeight: 900,
                      boxShadow: step.status === 'active' ? '0 10px 22px rgba(192,57,43,0.4)' : step.status === 'done' ? '0 2px 8px rgba(39,174,96,0.3)' : 'none',
                    }}
                  >
                    {step.status === 'done' ? '✓' : step.emoji}
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, color: step.status === 'inactive' ? '#ccc' : step.status === 'active' ? '#C0392B' : '#27AE60', textAlign: 'center', maxWidth: 55, lineHeight: 1.3 }}>
                    {step.id}. {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 3, background: i === 0 ? 'linear-gradient(90deg, #27AE60, #C0392B)' : '#eee', margin: '0 4px', marginBottom: 22, borderRadius: 2 }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '12px 16px 20px' }}>
          <div className="lifedrop-slide-up lifedrop-slide-delay-1" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fff8f7 100%)', borderRadius: 22, padding: 16, marginBottom: 12, boxShadow: '0 10px 24px rgba(0,0,0,0.07)', border: '2px solid #FDECEA' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#1a1a1a', marginBottom: 6 }}>Head to City Hospital</div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                  <MapPin size={13} color="#C0392B" />
                  <span style={{ fontSize: 12, color: '#888' }}>Distance: 2.3 km away</span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                  <span style={{ fontSize: 12, color: '#aaa', marginLeft: 19 }}>⏱ Est. time: 8 mins</span>
                </div>
                <button style={{ background: 'linear-gradient(135deg, #C0392B, #E05050)', color: 'white', padding: '10px 20px', borderRadius: 14, fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', fontFamily: 'Nunito, sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Navigation size={14} /> Open Maps
                </button>
              </div>
              <div className="lifedrop-float" style={{ width: 90, height: 90, borderRadius: 16, background: 'linear-gradient(135deg, #ddf0e8, #c0e0d0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, flexShrink: 0, border: '2px solid #b0d4c0' }}>
                🗺️
              </div>
            </div>
          </div>

          <div className="lifedrop-slide-up lifedrop-slide-delay-2" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fffaf9 100%)', borderRadius: 18, padding: '14px 16px', marginBottom: 12, boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: '#1a1a1a', marginBottom: 4 }}>City Hospital</div>
            <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>223 Londway Road, Danakinchi, 22077</div>
            <div style={{ fontSize: 12, color: '#aaa', marginBottom: 10 }}>Contact handled via app (no phone exposed)</div>
            <VerifiedBadge label="Verified hospital" />
          </div>

          <div className="lifedrop-slide-up lifedrop-slide-delay-2" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fffaf9 100%)', borderRadius: 18, padding: '14px 16px', marginBottom: 12, boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 10, color: '#1a1a1a' }}>Before you go</div>
            {['Carry a valid ID', 'Stay well hydrated', 'Inform reception staff on arrival'].map((ins, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < 2 ? 8 : 0 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#FDECEA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle size={14} color="#C0392B" />
                </div>
                <span style={{ fontSize: 13, color: '#444', fontWeight: 500 }}>{ins}</span>
              </div>
            ))}
          </div>

          <div className="lifedrop-slide-up lifedrop-slide-delay-3" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fffaf9 100%)', borderRadius: 18, padding: '14px 16px', marginBottom: 16, boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 12, color: '#1a1a1a' }}>Safety reassurance</div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {[
                { icon: '🏥', label: 'Safe donation environment' },
                { icon: '🔒', label: 'Your data is private' },
                { icon: '❤️', label: 'You are making a real impact' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', maxWidth: 80 }}>
                  <div style={{ fontSize: 26, marginBottom: 5 }}>{s.icon}</div>
                  <div style={{ fontSize: 10, color: '#888', fontWeight: 700, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lifedrop-slide-up lifedrop-slide-delay-3" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fffaf9 100%)', borderRadius: 18, padding: '14px 16px', boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ fontWeight: 800, color: '#888', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 10 }}>Active Progress</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button onClick={onDonationComplete} style={{ flex: 1, padding: '13px', background: 'linear-gradient(135deg, #B03020, #E05050)', color: 'white', borderRadius: 18, fontWeight: 900, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'Nunito, sans-serif', boxShadow: '0 6px 18px rgba(192,57,43,0.4)' }}>
                ✅ Mark as Arrived
              </button>
              <button style={{ padding: '13px 14px', background: '#FDF0F0', border: '2px solid #FDECEA', borderRadius: 18, color: '#C0392B', fontWeight: 800, fontSize: 12, cursor: 'pointer', fontFamily: 'Nunito, sans-serif', whiteSpace: 'nowrap' }}>
                ❓ Need help?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
