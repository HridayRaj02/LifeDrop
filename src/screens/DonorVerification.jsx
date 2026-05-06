import { useState } from 'react'
import { CalendarDays, FileBadge2, HeartPulse, Mail, Phone, Scale, Shield, UserRound } from 'lucide-react'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const initialForm = {
  fullName: 'Priyanka Sharma',
  idType: 'Aadhaar',
  idNumber: '1234 5678 9012',
  mobile: '+91 98XXXXXX12',
  email: 'priyanka@lifedrop.app',
  bloodGroup: 'O+',
  dateOfBirth: '1998-05-18',
  weight: '56',
  lastDonationDate: '2025-12-08',
  medications: 'Iron supplement, Vitamin D',
  procedures: 'No recent tattoo, piercing, or surgery in the last 6 months',
  travelHistory: 'No travel to malaria-endemic region recently',
  conditions: {
    diabetes: false,
    hypertension: false,
    heartDisease: false,
  },
}

export default function DonorVerification({ navigate, onComplete }) {
  const [form, setForm] = useState(initialForm)

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const updateCondition = (field) => {
    setForm((current) => ({
      ...current,
      conditions: {
        ...current.conditions,
        [field]: !current.conditions[field],
      },
    }))
  }

  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #fff7f7 0%, #f6eded 100%)',
      }}
    >
      <div style={{ padding: '24px 24px 10px', flexShrink: 0 }}>
        <button onClick={() => navigate('donor-login')} style={secondaryButtonStyle}>
          Back to login
        </button>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '0 20px 24px', scrollbarWidth: 'none' }}>
        <div
          style={{
            background: 'linear-gradient(145deg, #7F1D1D, #C0392B)',
            borderRadius: 28,
            padding: '24px 20px',
            color: 'white',
            boxShadow: '0 24px 52px rgba(127,29,29,0.24)',
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.68)', fontWeight: 800 }}>
            Donor verification
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, marginTop: 10, lineHeight: 1.15 }}>
            Build a trusted donor profile before emergencies go live
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(255,255,255,0.78)', marginTop: 10 }}>
            We collect identity, medical eligibility, and a lightweight health questionnaire to protect both donors and hospitals.
          </div>
        </div>

        <div style={sectionCardStyle}>
          <SectionHeader
            icon={<Shield size={17} color="#C0392B" />}
            title="1. Primary Identification & Security"
            subtitle="Verification-only details. Mobile stays private and is used for OTP security."
          />
          <Field label="Full Legal Name" icon={<UserRound size={16} color="#C0392B" />}>
            <input value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} style={inputStyle} />
          </Field>
          <div style={stackedFieldsStyle}>
            <Field label="Government ID Type">
              <select value={form.idType} onChange={(e) => updateField('idType', e.target.value)} style={inputStyle}>
                <option>Aadhaar</option>
                <option>PAN</option>
                <option>Driver&apos;s License</option>
              </select>
            </Field>
            <Field label="ID Number" icon={<FileBadge2 size={16} color="#C0392B" />}>
              <input value={form.idNumber} onChange={(e) => updateField('idNumber', e.target.value)} style={inputStyle} />
            </Field>
          </div>
          <div style={uploadCardStyle}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#7A2B2B' }}>Government ID Proof</div>
            <div style={{ fontSize: 11, color: '#907373', marginTop: 4 }}>Attach Aadhaar, PAN, or Driving License image during real integration.</div>
            <div style={{ marginTop: 10, display: 'inline-flex', padding: '7px 11px', borderRadius: 999, background: '#FDEAEA', color: '#C0392B', fontSize: 11, fontWeight: 800 }}>
              Mock upload ready
            </div>
          </div>
          <div style={stackedFieldsStyle}>
            <Field label="Mobile Number (OTP Verified)" icon={<Phone size={16} color="#C0392B" />}>
              <input value={form.mobile} onChange={(e) => updateField('mobile', e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Email Address" icon={<Mail size={16} color="#C0392B" />}>
              <input value={form.email} onChange={(e) => updateField('email', e.target.value)} style={inputStyle} />
            </Field>
          </div>
        </div>

        <div style={sectionCardStyle}>
          <SectionHeader
            icon={<HeartPulse size={17} color="#C0392B" />}
            title="2. Vital Medical Profile"
            subtitle="Used to check eligibility and decide which emergency requests a donor should see."
          />
          <div style={stackedFieldsCompactStyle}>
            <Field label="Blood Group">
              <select value={form.bloodGroup} onChange={(e) => updateField('bloodGroup', e.target.value)} style={inputStyle}>
                {BLOOD_GROUPS.map((group) => (
                  <option key={group}>{group}</option>
                ))}
              </select>
            </Field>
            <Field label="Date of Birth" icon={<CalendarDays size={16} color="#C0392B" />}>
              <input type="date" value={form.dateOfBirth} onChange={(e) => updateField('dateOfBirth', e.target.value)} style={inputStyle} />
            </Field>
          </div>
          <div style={stackedFieldsStyle}>
            <Field label="Weight (kg)" icon={<Scale size={16} color="#C0392B" />}>
              <input value={form.weight} onChange={(e) => updateField('weight', e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Last Donation Date" icon={<CalendarDays size={16} color="#C0392B" />}>
              <input type="date" value={form.lastDonationDate} onChange={(e) => updateField('lastDonationDate', e.target.value)} style={inputStyle} />
            </Field>
          </div>
          <div style={guidelineRowStyle}>
            <span>18-65 years preferred</span>
            <span>45 kg minimum</span>
            <span>56 days / 8 weeks wait after donation</span>
          </div>
        </div>

        <div style={sectionCardStyle}>
          <SectionHeader
            icon={<HeartPulse size={17} color="#C0392B" />}
            title="3. Digital Health Questionnaire"
            subtitle="A lightweight pre-screening so the hospital can move faster at arrival."
          />
          <LargeField label="Active Medications">
            <textarea value={form.medications} onChange={(e) => updateField('medications', e.target.value)} style={textareaStyle} />
          </LargeField>
          <LargeField label="Recent Procedures" style={{ marginTop: 14 }}>
            <textarea value={form.procedures} onChange={(e) => updateField('procedures', e.target.value)} style={textareaStyle} />
          </LargeField>
          <LargeField label="Travel History" style={{ marginTop: 14 }}>
            <textarea value={form.travelHistory} onChange={(e) => updateField('travelHistory', e.target.value)} style={textareaStyle} />
          </LargeField>

          <div style={{ marginTop: 16 }}>
            <div style={smallLabelStyle}>Chronic Conditions</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
              <ConditionChip
                label="Diabetes"
                active={form.conditions.diabetes}
                onClick={() => updateCondition('diabetes')}
              />
              <ConditionChip
                label="Hypertension"
                active={form.conditions.hypertension}
                onClick={() => updateCondition('hypertension')}
              />
              <ConditionChip
                label="Heart Disease"
                active={form.conditions.heartDisease}
                onClick={() => updateCondition('heartDisease')}
              />
            </div>
          </div>
        </div>

        <button onClick={() => onComplete(form)} style={primaryButtonStyle}>
          Save donor profile and enter LifeDrop
        </button>
      </div>
    </div>
  )
}

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 30, height: 30, borderRadius: 10, background: '#FDEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        <div style={{ fontSize: 15, fontWeight: 900, color: '#1a1a1a' }}>{title}</div>
      </div>
      <div style={{ fontSize: 11, color: '#8d7878', lineHeight: 1.45, marginTop: 8 }}>
        {subtitle}
      </div>
    </div>
  )
}

function Field({ children, icon, label, style = {} }) {
  return (
    <div style={{ flex: 1, minWidth: 0, ...style }}>
      <div style={smallLabelStyle}>{label}</div>
      <div style={fieldShellStyle}>
        {icon}
        {children}
      </div>
    </div>
  )
}

function LargeField({ children, label, style = {} }) {
  return (
    <div style={style}>
      <div style={smallLabelStyle}>{label}</div>
      {children}
    </div>
  )
}

function ConditionChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: active ? '1px solid #C0392B' : '1px solid #E9D5D5',
        background: active ? '#FDEAEA' : 'white',
        color: active ? '#C0392B' : '#7B6A6A',
        padding: '10px 14px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 800,
        cursor: 'pointer',
        fontFamily: 'Nunito, sans-serif',
      }}
    >
      {label}
    </button>
  )
}

const sectionCardStyle = {
  background: 'white',
  borderRadius: 24,
  padding: 18,
  border: '1px solid #F4E4E4',
  boxShadow: '0 12px 30px rgba(35,35,35,0.06)',
  marginBottom: 14,
}

const uploadCardStyle = {
  background: '#FFF7F7',
  border: '1px dashed #EDB7B7',
  borderRadius: 18,
  padding: '14px 15px',
  marginTop: 14,
}

const fieldShellStyle = {
  minHeight: 48,
  borderRadius: 16,
  border: '1px solid #F0DCDC',
  background: '#FFF9F9',
  display: 'flex',
  gap: 10,
  alignItems: 'center',
  padding: '0 14px',
  boxSizing: 'border-box',
}

const inputStyle = {
  flex: 1,
  minWidth: 0,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  fontSize: 13,
  color: '#2B2B2B',
  fontFamily: 'Nunito, sans-serif',
}

const textareaStyle = {
  width: '100%',
  minHeight: 92,
  border: '1px solid #F0DCDC',
  outline: 'none',
  resize: 'vertical',
  borderRadius: 16,
  background: '#FFF9F9',
  padding: '14px',
  fontSize: 13,
  color: '#2B2B2B',
  fontFamily: 'Nunito, sans-serif',
  boxSizing: 'border-box',
}

const smallLabelStyle = {
  display: 'block',
  fontSize: 11,
  fontWeight: 800,
  color: '#9F5555',
  marginBottom: 8,
  textTransform: 'uppercase',
  letterSpacing: 0.7,
}

const guidelineRowStyle = {
  marginTop: 14,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  fontSize: 11,
  color: '#8A6F6F',
  fontWeight: 700,
}

const stackedFieldsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  marginTop: 14,
}

const stackedFieldsCompactStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  marginTop: 2,
  flexWrap: 'wrap',
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
  fontSize: 15,
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
