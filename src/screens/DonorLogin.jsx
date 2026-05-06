import { Droplets, LockKeyhole, Mail, Phone, ShieldCheck } from 'lucide-react'

export default function DonorLogin({ navigate, onContinue }) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #fff6f6 0%, #f8eded 100%)',
      }}
    >
      <div style={{ padding: '28px 24px 14px' }}>
        <button
          onClick={() => navigate('role')}
          style={secondaryButtonStyle}
        >
          Back
        </button>
      </div>

      <div style={{ flex: 1, minHeight: 0, padding: '0 24px 24px', overflowY: 'auto', scrollbarWidth: 'none' }}>
        <div
          style={{
            background: 'linear-gradient(145deg, #B03020, #E05050)',
            borderRadius: 28,
            padding: '26px 22px',
            color: 'white',
            boxShadow: '0 20px 48px rgba(176,48,32,0.24)',
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 20,
              background: 'rgba(255,255,255,0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18,
            }}
          >
            <Droplets size={28} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.15, marginBottom: 8 }}>
            Donor Login
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', lineHeight: 1.5 }}>
            Secure sign-in keeps donor identity protected while hospitals still get verified help fast.
          </div>
        </div>

        <div style={cardStyle}>
          <div style={sectionTitleStyle}>Secure Access</div>
          <label style={fieldLabelStyle}>Mobile Number</label>
          <div style={inputShellStyle}>
            <Phone size={16} color="#C0392B" />
            <input defaultValue="+91 98XXXXXX12" style={inputStyle} />
          </div>

          <label style={fieldLabelStyle}>Email Address</label>
          <div style={inputShellStyle}>
            <Mail size={16} color="#C0392B" />
            <input defaultValue="donor@lifedrop.app" style={inputStyle} />
          </div>

          <label style={fieldLabelStyle}>Password / OTP Passcode</label>
          <div style={inputShellStyle}>
            <LockKeyhole size={16} color="#C0392B" />
            <input type="password" defaultValue="••••••••" style={inputStyle} />
          </div>

          <div
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              background: '#FDF4F4',
              border: '1px solid #F6D7D7',
              borderRadius: 16,
              padding: '12px 13px',
              marginTop: 16,
            }}
          >
            <ShieldCheck size={17} color="#27AE60" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#2b2b2b' }}>Privacy-first verification</div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 3, lineHeight: 1.45 }}>
                Your number is used only for OTP security and stays hidden from other users.
              </div>
            </div>
          </div>
        </div>

        <button onClick={onContinue} style={primaryButtonStyle}>
          Continue to donor verification
        </button>
      </div>
    </div>
  )
}

const cardStyle = {
  background: 'white',
  borderRadius: 22,
  padding: 18,
  boxShadow: '0 10px 30px rgba(35,35,35,0.06)',
  border: '1px solid #F6E8E8',
  marginBottom: 18,
}

const sectionTitleStyle = {
  fontSize: 15,
  fontWeight: 900,
  color: '#1a1a1a',
  marginBottom: 14,
}

const fieldLabelStyle = {
  display: 'block',
  fontSize: 11,
  fontWeight: 800,
  color: '#9f5555',
  textTransform: 'uppercase',
  letterSpacing: 0.7,
  marginBottom: 8,
  marginTop: 14,
}

const inputShellStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  background: '#FFF8F8',
  border: '1px solid #F2D9D9',
  borderRadius: 16,
  padding: '0 14px',
  minHeight: 48,
}

const inputStyle = {
  flex: 1,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: '#333',
  fontSize: 13,
  fontFamily: 'Nunito, sans-serif',
}

const primaryButtonStyle = {
  width: '100%',
  border: 'none',
  borderRadius: 20,
  padding: '15px 18px',
  background: 'linear-gradient(135deg, #B03020, #E05050)',
  color: 'white',
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 900,
  fontSize: 14,
  lineHeight: 1.35,
  textAlign: 'center',
  whiteSpace: 'normal',
  boxSizing: 'border-box',
  boxShadow: '0 14px 28px rgba(176,48,32,0.28)',
  cursor: 'pointer',
}

const secondaryButtonStyle = {
  background: '#FDF0F0',
  border: 'none',
  color: '#C0392B',
  fontWeight: 800,
  fontSize: 12,
  borderRadius: 999,
  padding: '10px 14px',
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
}
