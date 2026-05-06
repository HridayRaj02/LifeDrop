import { useState } from 'react'
import { BadgeCheck, Building2, KeyRound, Landmark, Mail, ShieldCheck, Smartphone } from 'lucide-react'

const initialForm = {
  doctorName: 'Dr. Arjun Mehra',
  registrationNumber: 'NMC-DEL-204874',
  hospitalName: 'City Hospital',
  hospitalId: 'NABH-ER-4412',
  officialEmail: 'admin@cityhospital.org',
  mobile: '+91 98XXXXXX44',
  role: 'ER In-charge',
  securityPin: '2048',
  otp: '482913',
}

const roles = ['ER In-charge', 'Blood Bank Manager', 'Transplant Coordinator']

export default function DoctorAccess({ navigate, onComplete }) {
  const [form, setForm] = useState(initialForm)
  const [nmcVerified, setNmcVerified] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const finalizeAccess = () => {
    onComplete({
      fullName: form.doctorName,
      role: form.role,
      hospitalName: form.hospitalName,
      hospitalAddress: '223 Londway Road, Danakinchi, 22077',
      officialEmail: form.officialEmail,
      securityPin: form.securityPin,
      registrationNumber: form.registrationNumber,
      hospitalId: form.hospitalId,
    })
  }

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #EFF6FF 0%, #E3EEF9 100%)' }}>
      <div style={{ padding: '24px 24px 12px', flexShrink: 0 }}>
        <button onClick={() => navigate('role')} style={backButtonStyle}>Back</button>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 20px 24px', scrollbarWidth: 'none' }}>
        <div style={heroCardStyle}>
          <div style={badgeStyle}>Authorized Personnel Only</div>
          <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.15, marginTop: 12 }}>
            Doctor Portal Verification
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', lineHeight: 1.5, marginTop: 8 }}>
            Professional authorization, live NMC verification, and OTP-gated access before emergency broadcasts go live.
          </div>
        </div>

        <div style={cardStyle}>
          <div style={sectionTitleStyle}>1. Professional Credentials</div>
          <Field label="Doctor / Admin Name">
            <input value={form.doctorName} onChange={(e) => updateField('doctorName', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Medical Registration Number" icon={<BadgeCheck size={16} color="#2563EB" />} style={{ marginTop: 14 }}>
            <input value={form.registrationNumber} onChange={(e) => updateField('registrationNumber', e.target.value)} style={inputStyle} />
          </Field>
          <button onClick={() => { setNmcVerified(true); setOtpSent(true) }} style={verifyButtonStyle}>
            Verify with NMC Database
          </button>
          {nmcVerified && (
            <div style={successPillStyle}>
              <ShieldCheck size={15} color="#1D9A61" />
              Verified practitioner record found
            </div>
          )}

          <div style={stackedFieldsStyle}>
            <Field label="Hospital Affiliation" icon={<Building2 size={16} color="#2563EB" />}>
              <input value={form.hospitalName} onChange={(e) => updateField('hospitalName', e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Hospital Unique ID / NABH ID" icon={<Landmark size={16} color="#2563EB" />}>
              <input value={form.hospitalId} onChange={(e) => updateField('hospitalId', e.target.value)} style={inputStyle} />
            </Field>
          </div>

          <Field label="Official Work Email" icon={<Mail size={16} color="#2563EB" />} style={{ marginTop: 14 }}>
            <input value={form.officialEmail} onChange={(e) => updateField('officialEmail', e.target.value)} style={inputStyle} />
          </Field>
        </div>

        <div style={cardStyle}>
          <div style={sectionTitleStyle}>2. Security & Authentication</div>
          <Field label="Registered Mobile (2FA)" icon={<Smartphone size={16} color="#2563EB" />}>
            <input value={form.mobile} onChange={(e) => updateField('mobile', e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Department / Role" style={{ marginTop: 14 }}>
            <select value={form.role} onChange={(e) => updateField('role', e.target.value)} style={inputStyle}>
              {roles.map((role) => <option key={role}>{role}</option>)}
            </select>
          </Field>
          <Field label="4-Digit Emergency PIN" icon={<KeyRound size={16} color="#2563EB" />} style={{ marginTop: 14 }}>
            <input value={form.securityPin} onChange={(e) => updateField('securityPin', e.target.value)} style={inputStyle} />
          </Field>

          {otpSent && (
            <div style={otpOverlayStyle}>
              <div style={{ fontSize: 13, fontWeight: 900, color: '#0F2747', marginBottom: 6 }}>OTP Verification</div>
              <div style={{ fontSize: 11, color: '#6E8199', lineHeight: 1.45, marginBottom: 10 }}>
                OTP sent to the registered hospital contact. Enter it to unlock emergency request controls.
              </div>
              <div style={inputShellStyle}>
                <Smartphone size={16} color="#2563EB" />
                <input value={form.otp} onChange={(e) => updateField('otp', e.target.value)} style={inputStyle} />
              </div>
            </div>
          )}
        </div>

        <button onClick={finalizeAccess} style={primaryButtonStyle}>
          Enter Doctor Portal
        </button>
      </div>
    </div>
  )
}

function Field({ children, label, icon, style = {} }) {
  return (
    <div style={style}>
      <div style={labelStyle}>{label}</div>
      <div style={inputShellStyle}>
        {icon}
        {children}
      </div>
    </div>
  )
}

const heroCardStyle = {
  background: 'linear-gradient(145deg, #0F3D73, #2563EB)',
  color: 'white',
  borderRadius: 28,
  padding: '24px 20px',
  boxShadow: '0 24px 52px rgba(37,99,235,0.24)',
  marginBottom: 16,
}

const badgeStyle = {
  display: 'inline-flex',
  padding: '7px 11px',
  borderRadius: 999,
  background: 'rgba(255,255,255,0.14)',
  border: '1px solid rgba(255,255,255,0.2)',
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0.8,
  textTransform: 'uppercase',
}

const cardStyle = {
  background: 'white',
  borderRadius: 22,
  padding: 18,
  boxShadow: '0 10px 30px rgba(35,35,35,0.06)',
  border: '1px solid #D9E6F3',
  marginBottom: 16,
}

const sectionTitleStyle = {
  fontSize: 15,
  fontWeight: 900,
  color: '#102A43',
  marginBottom: 14,
}

const labelStyle = {
  display: 'block',
  fontSize: 11,
  fontWeight: 800,
  color: '#42658B',
  textTransform: 'uppercase',
  letterSpacing: 0.7,
  marginBottom: 8,
}

const inputShellStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  background: '#F7FBFF',
  border: '1px solid #D6E5F5',
  borderRadius: 16,
  padding: '0 14px',
  minHeight: 48,
  boxSizing: 'border-box',
}

const inputStyle = {
  flex: 1,
  minWidth: 0,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: '#1F2937',
  fontSize: 13,
  fontFamily: 'Nunito, sans-serif',
}

const verifyButtonStyle = {
  width: '100%',
  marginTop: 14,
  border: 'none',
  borderRadius: 16,
  padding: '13px 16px',
  background: '#2563EB',
  color: 'white',
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 900,
  fontSize: 14,
  cursor: 'pointer',
}

const successPillStyle = {
  marginTop: 12,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '8px 11px',
  background: '#EBFBF4',
  color: '#1D9A61',
  borderRadius: 999,
  border: '1px solid #CBEEDB',
  fontSize: 11,
  fontWeight: 800,
}

const stackedFieldsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  marginTop: 14,
}

const otpOverlayStyle = {
  marginTop: 16,
  background: '#EFF6FF',
  border: '1px solid #CFE2FF',
  borderRadius: 18,
  padding: '14px 15px',
}

const primaryButtonStyle = {
  width: '100%',
  border: 'none',
  borderRadius: 20,
  padding: '15px 18px',
  background: 'linear-gradient(135deg, #0F3D73, #2563EB)',
  color: 'white',
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 900,
  fontSize: 15,
  boxShadow: '0 14px 28px rgba(37,99,235,0.24)',
  cursor: 'pointer',
}

const backButtonStyle = {
  background: '#DCEAFE',
  border: 'none',
  color: '#0F3D73',
  fontWeight: 800,
  fontSize: 12,
  borderRadius: 999,
  padding: '10px 14px',
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
}
