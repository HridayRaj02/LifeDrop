import { ArrowRight, Droplets, ShieldCheck } from 'lucide-react'

const featureCards = [
  { icon: '🩸', title: 'Find donors instantly', sub: 'Near you, verified & ready' },
  { icon: '🏥', title: 'Verified hospitals only', sub: 'Safe, secure donation process' },
  { icon: '❤️', title: 'Save lives nearby', sub: 'Real-time emergency alerts' },
]

export default function SplashScreen({ onStart }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg, #9b1f19 0%, #C0392B 36%, #E05050 76%, #F28A79 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {[
        { w: 180, h: 180, top: -50, right: -40, op: 0.1 },
        { w: 120, h: 120, top: 80, left: -30, op: 0.08 },
        { w: 90, h: 90, bottom: 200, right: 20, op: 0.1 },
        { w: 200, h: 200, bottom: -60, left: -60, op: 0.07 },
      ].map((bubble, index) => (
        <div
          key={index}
          className={index % 2 === 0 ? 'lifedrop-float' : 'lifedrop-float-delay'}
          style={{
            position: 'absolute',
            width: bubble.w,
            height: bubble.h,
            borderRadius: '50%',
            background: 'white',
            opacity: bubble.op,
            top: bubble.top,
            right: bubble.right,
            bottom: bubble.bottom,
            left: bubble.left,
          }}
        />
      ))}

      <div style={{ padding: '28px 24px 18px', position: 'relative', zIndex: 1 }}>
        <div
          className="lifedrop-slide-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 12px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.14)',
            border: '1px solid rgba(255,255,255,0.18)',
            color: 'white',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.7,
            textTransform: 'uppercase',
          }}
        >
          <ShieldCheck size={14} />
          One platform. Two journeys.
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px 24px', position: 'relative', zIndex: 1 }}>
        <div className="lifedrop-slide-up lifedrop-slide-delay-1" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div
            className="lifedrop-pulse"
            style={{
              width: 86,
              height: 86,
              borderRadius: 26,
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,255,255,0.28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 34px rgba(0,0,0,0.18)',
              flexShrink: 0,
            }}
          >
            <Droplets size={42} color="white" strokeWidth={2.5} />
          </div>

          <div>
            <div style={{ fontSize: 36, fontWeight: 900, color: 'white', letterSpacing: -1, lineHeight: 1 }}>
              Life<span style={{ color: 'rgba(255,225,218,1)' }}>Drop</span>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', marginTop: 6, fontWeight: 600 }}>
              Every drop counts. Every life matters.
            </div>
          </div>
        </div>

        <div className="lifedrop-slide-up lifedrop-slide-delay-2" style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: 'white', lineHeight: 1.08, marginBottom: 10 }}>
            Step into the emergency network with a cleaner first impression.
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6 }}>
            Doctors create urgent requests. Donors verify themselves and respond safely with real-time visibility.
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          {featureCards.map((feature, index) => (
            <div
              key={feature.title}
              className={`lifedrop-slide-up ${index === 0 ? 'lifedrop-slide-delay-1' : index === 1 ? 'lifedrop-slide-delay-2' : 'lifedrop-slide-delay-3'}`}
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                background: 'rgba(255,255,255,0.14)',
                borderRadius: 20,
                padding: '13px 16px',
                marginBottom: 10,
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
              }}
            >
              <span style={{ fontSize: 26 }}>{feature.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>{feature.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.72)', marginTop: 1 }}>{feature.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onStart} className="lifedrop-slide-up lifedrop-slide-delay-3" style={startButtonStyle}>
          <Droplets size={18} />
          Start Now
          <ArrowRight size={18} />
        </button>

        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.58)', fontWeight: 500 }}>
            Join 50,000+ donors and hospitals saving lives every day
          </span>
        </div>
      </div>
    </div>
  )
}

const startButtonStyle = {
  width: '100%',
  padding: '16px 18px',
  borderRadius: 22,
  fontWeight: 900,
  fontSize: 15,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  background: 'white',
  color: '#A12A20',
  boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
}
