import { CalendarDays, Droplets, HeartPulse, Mail, Phone, Scale, Shield, UserRound } from 'lucide-react'
import { formatDisplayDate } from '../utils/bloodCompatibility'

export default function DonorProfile({ navigate, donorProfile, donationApplications }) {
  const profile = donorProfile || {}
  const totalApplications = donationApplications?.filter((application) => application.donorEmail === donorProfile?.email).length || 0
  const completedApplications = donationApplications?.filter((application) => application.donorEmail === donorProfile?.email && application.status === 'completed').length || 0

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#F9F2F2' }}>
      <div style={{ padding: '18px 16px 12px', background: 'linear-gradient(180deg, #fffefe 0%, #fff3f2 100%)', borderBottom: '1px solid #f5eaea', flexShrink: 0 }}>
        <div className="lifedrop-slide-up" style={heroCardStyle}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={avatarStyle}>👩</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: '#C66A5B', fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                Donor profile
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#1A1A1A' }}>
                {profile.fullName || 'Verified Donor'}
              </div>
              <div style={{ fontSize: 12, color: '#8A7671', marginTop: 4 }}>
                {profile.bloodGroup || 'Blood group not set'} · Verified LifeDrop donor
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <div style={statCardStyle}>
              <div style={statValueStyle}>{completedApplications}</div>
              <div style={statLabelStyle}>Confirmed donations</div>
            </div>
            <div style={statCardStyle}>
              <div style={statValueStyle}>{totalApplications}</div>
              <div style={statLabelStyle}>Total responses</div>
            </div>
            <div style={statCardStyle}>
              <div style={statValueStyle}>{profile.weight || '--'}</div>
              <div style={statLabelStyle}>Weight (kg)</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 20px', scrollbarWidth: 'none' }}>
        <ProfileSection
          icon={<Shield size={17} color="#C0392B" />}
          title="Identity & Security"
          items={[
            { icon: <UserRound size={15} color="#C0392B" />, label: 'Full name', value: profile.fullName || 'Not added' },
            { icon: <Shield size={15} color="#C0392B" />, label: 'Government ID', value: profile.idType && profile.idNumber ? `${profile.idType} · ${profile.idNumber}` : 'Not added' },
            { icon: <Phone size={15} color="#C0392B" />, label: 'Mobile', value: profile.mobile || 'Not added' },
            { icon: <Mail size={15} color="#C0392B" />, label: 'Email', value: profile.email || 'Not added' },
          ]}
        />

        <ProfileSection
          icon={<HeartPulse size={17} color="#C0392B" />}
          title="Medical Profile"
          items={[
            { icon: <Droplets size={15} color="#C0392B" />, label: 'Blood group', value: profile.bloodGroup || 'Not added' },
            { icon: <CalendarDays size={15} color="#C0392B" />, label: 'Date of birth', value: profile.dateOfBirth ? formatDisplayDate(new Date(profile.dateOfBirth)) : 'Not added' },
            { icon: <Scale size={15} color="#C0392B" />, label: 'Weight', value: profile.weight ? `${profile.weight} kg` : 'Not added' },
            { icon: <CalendarDays size={15} color="#C0392B" />, label: 'Last donation', value: profile.lastDonationDate ? formatDisplayDate(new Date(profile.lastDonationDate)) : 'Never donated before' },
          ]}
        />

        <ProfileSection
          icon={<HeartPulse size={17} color="#C0392B" />}
          title="Health Questionnaire"
          items={[
            { label: 'Active medications', value: profile.medications || 'No medications shared' },
            { label: 'Recent procedures', value: profile.procedures || 'No recent procedures shared' },
            { label: 'Travel history', value: profile.travelHistory || 'No travel history shared' },
            {
              label: 'Chronic conditions',
              value: getConditionsLabel(profile.conditions),
            },
          ]}
        />

        <div className="lifedrop-slide-up lifedrop-slide-delay-2" style={noteCardStyle}>
          <div style={{ fontSize: 13, fontWeight: 900, color: '#1A1A1A', marginBottom: 8 }}>
            Why this matters
          </div>
          <div style={{ fontSize: 12, color: '#6E5B57', lineHeight: 1.55 }}>
            Your donor profile helps LifeDrop match you only with safe and verified blood requests, while keeping your identity protected inside the app.
          </div>
        </div>

        <button onClick={() => navigate('dashboard')} style={backButtonStyle}>
          Back to dashboard
        </button>
      </div>
    </div>
  )
}

function ProfileSection({ icon, title, items }) {
  return (
    <div className="lifedrop-slide-up lifedrop-slide-delay-1" style={sectionCardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={sectionIconShellStyle}>
          {icon}
        </div>
        <div style={{ fontSize: 15, fontWeight: 900, color: '#1A1A1A' }}>{title}</div>
      </div>

      {items.map((item) => (
        <div key={`${title}-${item.label}`} style={itemRowStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            {item.icon ? <div style={itemIconShellStyle}>{item.icon}</div> : null}
            <div style={{ minWidth: 0 }}>
              <div style={itemLabelStyle}>{item.label}</div>
              <div style={itemValueStyle}>{item.value}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function getConditionsLabel(conditions = {}) {
  const active = Object.entries(conditions)
    .filter(([, value]) => value)
    .map(([key]) => {
      if (key === 'heartDisease') return 'Heart disease'
      return key.charAt(0).toUpperCase() + key.slice(1)
    })

  return active.length ? active.join(', ') : 'None declared'
}

const heroCardStyle = {
  background: 'rgba(255,255,255,0.84)',
  border: '1px solid #f5e2df',
  borderRadius: 24,
  padding: '16px 16px 14px',
  boxShadow: '0 14px 34px rgba(192,57,43,0.08)',
}

const avatarStyle = {
  width: 58,
  height: 58,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #FDECEA, #f5c6c6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 28,
  border: '2.5px solid #E85D5D',
  flexShrink: 0,
}

const statCardStyle = {
  flex: 1,
  background: '#fff7f5',
  border: '1px solid #f4dfdb',
  borderRadius: 16,
  padding: '10px 12px',
}

const statValueStyle = {
  fontSize: 17,
  fontWeight: 900,
  color: '#C0392B',
}

const statLabelStyle = {
  fontSize: 10,
  color: '#9a7e78',
  marginTop: 3,
  fontWeight: 700,
}

const sectionCardStyle = {
  background: 'linear-gradient(180deg, #ffffff 0%, #fffaf9 100%)',
  borderRadius: 20,
  padding: '16px 16px 12px',
  marginBottom: 12,
  boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
  border: '1px solid #f4e5e2',
}

const sectionIconShellStyle = {
  width: 32,
  height: 32,
  borderRadius: 10,
  background: '#FDEAEA',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const itemRowStyle = {
  padding: '11px 0',
  borderTop: '1px solid #f6ece9',
}

const itemIconShellStyle = {
  width: 28,
  height: 28,
  borderRadius: 9,
  background: '#FFF4F2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const itemLabelStyle = {
  fontSize: 11,
  fontWeight: 800,
  color: '#9F5555',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  marginBottom: 4,
}

const itemValueStyle = {
  fontSize: 12,
  color: '#4F3F3A',
  lineHeight: 1.5,
  wordBreak: 'break-word',
}

const noteCardStyle = {
  background: 'linear-gradient(135deg, #FFF1ED 0%, #FFE6DE 100%)',
  border: '1px solid #F4C7BB',
  borderLeft: '4px solid #D64532',
  borderRadius: 18,
  padding: '14px 16px',
  marginBottom: 14,
  boxShadow: '0 10px 24px rgba(214,69,50,0.08)',
}

const backButtonStyle = {
  width: '100%',
  padding: '13px 14px',
  background: 'linear-gradient(135deg, #B03020, #E05050)',
  color: 'white',
  borderRadius: 18,
  fontWeight: 900,
  fontSize: 14,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
  boxShadow: '0 8px 22px rgba(192,57,43,0.32)',
}
