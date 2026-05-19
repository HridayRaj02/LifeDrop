import { ArrowLeft, CheckCircle2, Clock3, Hospital, ShieldCheck } from 'lucide-react'
import VerifiedBadge from '../components/ui/VerifiedBadge'

export default function DonationAtHospital({ navigate, selectedRequest, selectedBlood, donorProfile, donationApplications, onDonationSubmitted, onViewImpact }) {
  const request = selectedRequest || {
    blood: selectedBlood || donorProfile?.bloodGroup || 'O+',
    hospital: 'City Hospital',
    address: '223 Londway Road, Danakinchi, 22077',
    units: 1,
  }

  const currentApplication = donationApplications?.find(
    (application) =>
      application.requestId === selectedRequest?.id &&
      application.donorEmail === donorProfile?.email,
  )

  const waitingForDoctor = currentApplication?.status === 'donated'
  const donationConfirmed = currentApplication?.status === 'completed'

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F9F2F2', overflow: 'hidden' }}>
      <div style={{ background: 'linear-gradient(135deg, #8f1c17, #C0392B)', padding: '20px 20px 22px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <div className="lifedrop-float" style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => navigate('progress', selectedRequest)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={18} color="white" />
          </button>
          <div>
            <div style={{ fontSize: 17, fontWeight: 900, color: 'white' }}>At Hospital</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Final verification before the life-saving donation is closed</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '12px 16px 20px' }}>
        <div className="lifedrop-slide-up" style={heroCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#C66A5B', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
                Donation checkpoint
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#1A1A1A', lineHeight: 1.2 }}>
                {request.hospital}
              </div>
              <div style={{ fontSize: 12, color: '#8C7772', marginTop: 6, lineHeight: 1.45 }}>
                {request.address}
              </div>
            </div>
            <div style={bloodShellStyle}>{request.blood}</div>
          </div>
          <div style={{ marginTop: 12 }}>
            <VerifiedBadge label="Hospital check-in verified" />
          </div>
        </div>

        <div className="lifedrop-slide-up lifedrop-slide-delay-1" style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 900, color: '#1A1A1A', marginBottom: 10 }}>What happens now</div>
          {[
            'Hospital staff verifies your identity and donor eligibility.',
            'Your blood donation is recorded against the active LifeDrop request.',
            'The doctor confirms completion so your donor impact can be closed safely.',
          ].map((item) => (
            <div key={item} style={listRowStyle}>
              <CheckCircle2 size={15} color="#C0392B" />
              <span style={{ fontSize: 12, color: '#6F5D59', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>

        <div className="lifedrop-slide-up lifedrop-slide-delay-2" style={statusCardStyle}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
            <div style={statusIconShellStyle}>
              {donationConfirmed ? <ShieldCheck size={16} color="#1D7F52" /> : <Clock3 size={16} color="#B25E09" />}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#1A1A1A' }}>
                {donationConfirmed ? 'Doctor confirmation received' : waitingForDoctor ? 'Waiting for doctor confirmation' : 'Ready to mark donation'}
              </div>
              <div style={{ fontSize: 11, color: '#8C7772', marginTop: 2 }}>
                {donationConfirmed
                  ? 'The hospital has confirmed your donation.'
                  : waitingForDoctor
                    ? 'Your donation is marked done. The doctor just needs to verify it.'
                    : 'Once your donation is done, update the app so the doctor can confirm it.'}
              </div>
            </div>
          </div>
        </div>

        <div className="lifedrop-slide-up lifedrop-slide-delay-3" style={cardStyle}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <div style={smallIconShellStyle}>
              <Hospital size={16} color="#C0392B" />
            </div>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#1A1A1A' }}>
              Donation request: {request.units} unit{request.units > 1 ? 's' : ''} of {request.blood}
            </div>
          </div>

          {!waitingForDoctor && !donationConfirmed && (
            <button onClick={onDonationSubmitted} style={primaryButtonStyle}>
              🩸 I have donated
            </button>
          )}

          {waitingForDoctor && (
            <div style={pendingBannerStyle}>
              Donation marked. As soon as the doctor confirms it from the hospital portal, your impact page will unlock automatically.
            </div>
          )}

          {donationConfirmed && (
            <button onClick={() => onViewImpact(selectedRequest)} style={confirmedButtonStyle}>
              View your life-saving impact
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const heroCardStyle = {
  background: 'linear-gradient(180deg, #ffffff 0%, #fff8f6 100%)',
  borderRadius: 22,
  padding: '16px 16px 14px',
  marginBottom: 12,
  boxShadow: '0 10px 24px rgba(0,0,0,0.07)',
  border: '1px solid #F3E3DF',
}

const cardStyle = {
  background: 'linear-gradient(180deg, #ffffff 0%, #fffaf9 100%)',
  borderRadius: 18,
  padding: '14px 16px',
  marginBottom: 12,
  boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
}

const statusCardStyle = {
  background: 'linear-gradient(135deg, #FFF6EA 0%, #FFFDF8 100%)',
  border: '1px solid #F2D4A0',
  borderLeft: '4px solid #D89A2B',
  borderRadius: 18,
  padding: '14px 16px',
  marginBottom: 12,
  boxShadow: '0 10px 24px rgba(216,154,43,0.08)',
}

const bloodShellStyle = {
  minWidth: 74,
  height: 74,
  borderRadius: 18,
  background: 'linear-gradient(135deg, #B03020, #E05050)',
  color: 'white',
  fontSize: 28,
  fontWeight: 900,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 10px 24px rgba(192,57,43,0.24)',
}

const listRowStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
  marginBottom: 9,
}

const smallIconShellStyle = {
  width: 30,
  height: 30,
  borderRadius: 10,
  background: '#FDECEA',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const statusIconShellStyle = {
  width: 32,
  height: 32,
  borderRadius: 10,
  background: '#FFF1D9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const primaryButtonStyle = {
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

const confirmedButtonStyle = {
  ...primaryButtonStyle,
  background: 'linear-gradient(135deg, #1F8F5F, #2CB67D)',
  boxShadow: '0 8px 22px rgba(31,143,95,0.28)',
}

const pendingBannerStyle = {
  background: '#FFF7E7',
  border: '1px solid #F4D799',
  color: '#8B5A14',
  borderRadius: 14,
  padding: '12px 14px',
  fontSize: 12,
  fontWeight: 700,
  lineHeight: 1.45,
}
