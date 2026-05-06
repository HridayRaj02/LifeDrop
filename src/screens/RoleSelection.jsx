import { BriefcaseMedical, ChevronRight, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'

export default function RoleSelection({ onDoctorSelect, onDonorSelect }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #FCF3F3 0%, #F7EDED 100%)',
        overflowY: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      <div
        className="lifedrop-slide-up"
        style={{
          background: 'linear-gradient(155deg, #7F1D1D 0%, #B03020 38%, #E05050 100%)',
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          padding: '34px 24px 28px',
          color: 'white',
          boxShadow: '0 18px 48px rgba(127,29,29,0.26)',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.18)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', fontWeight: 800 }}>
          <Sparkles size={14} />
          Welcome to LifeDrop
        </div>
        <div style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.1, marginTop: 10 }}>
          Choose how you want to continue
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(255,255,255,0.78)', marginTop: 10 }}>
          Hospitals can raise urgent requests fast. Donors go through secure login and verification before they respond.
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          {[
            { value: '2x', label: 'More trust' },
            { value: 'Live', label: 'Sync flow' },
          ].map((item) => (
            <div key={item.label} style={{ flex: 1, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 18, padding: '10px 12px' }}>
              <div style={{ fontSize: 18, fontWeight: 900 }}>{item.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.74)' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '18px 18px 24px' }}>
        <RoleCard
          className="lifedrop-slide-up lifedrop-slide-delay-1"
          icon={<BriefcaseMedical size={30} color="#9D2B20" />}
          title="Are you a doctor?"
          subtitle="Enter the emergency response side to create or monitor urgent blood requests."
          meta="Hospital-side access"
          accent="#9D2B20"
          background="linear-gradient(180deg, #ffffff 0%, #fff6f6 100%)"
          onClick={onDoctorSelect}
          cta="Continue as doctor"
        />

        <RoleCard
          className="lifedrop-slide-up lifedrop-slide-delay-2"
          icon={<ShieldCheck size={30} color="#C0392B" />}
          title="Are you a donor?"
          subtitle="Log in securely, complete your identity and health profile, then start helping nearby emergencies."
          meta="Donor login + verification required"
          accent="#C0392B"
          background="linear-gradient(180deg, #fffaf8 0%, #fff3f1 100%)"
          onClick={onDonorSelect}
          cta="Continue as donor"
        />

        <div
          className="lifedrop-slide-up lifedrop-slide-delay-3"
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            background: 'white',
            border: '1px solid #F2E3E3',
            borderRadius: 18,
            padding: '14px 15px',
            boxShadow: '0 10px 24px rgba(40,40,40,0.05)',
          }}
        >
          <HeartHandshake size={18} color="#27AE60" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 900, color: '#2B2B2B' }}>Privacy promise</div>
            <div style={{ fontSize: 11, color: '#8B7676', marginTop: 4, lineHeight: 1.45 }}>
              Donor phone numbers stay hidden from other users. Verification data is collected only for safety and trust.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RoleCard({ icon, title, subtitle, meta, accent, background, onClick, cta, className }) {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        width: '100%',
        textAlign: 'left',
        border: '1px solid #F2E5E5',
        borderRadius: 28,
        padding: 18,
        marginBottom: 14,
        background,
        cursor: 'pointer',
        boxShadow: '0 18px 34px rgba(35,35,35,0.08)',
        fontFamily: 'Nunito, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: `${accent}10`, top: -30, right: -30 }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, position: 'relative' }}>
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 22,
            background: '#FFF0F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: `1px solid ${accent}20`,
            boxShadow: `0 10px 20px ${accent}18`,
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: 0.8 }}>
            {meta}
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#1a1a1a', marginTop: 8 }}>
            {title}
          </div>
          <div style={{ fontSize: 12, color: '#847171', lineHeight: 1.5, marginTop: 8 }}>
            {subtitle}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          color: accent,
          fontSize: 13,
          fontWeight: 900,
        }}
      >
        {cta}
        <ChevronRight size={16} />
      </div>
    </button>
  )
}
