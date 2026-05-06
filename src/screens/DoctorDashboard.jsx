import { useState } from 'react'
import { Activity, Bell, FilePlus2, ShieldCheck, Siren, Users2 } from 'lucide-react'
import BloodBadge from '../components/ui/BloodBadge'
import UrgencyBadge from '../components/ui/UrgencyBadge'

const initialDraft = {
  blood: 'O+',
  units: '2',
  urgency: 'Critical',
  department: 'ER In-charge',
  caseId: 'ER-5632',
  patientFileNumber: 'PT-20X8',
  note: 'Immediate requirement before emergency surgery.',
  distance: '1.8 km',
  authorizePin: '2048',
}

export default function DoctorDashboard({ doctorProfile, requests, donationApplications, onCreateRequest, onOpenRequest, onReviewDonationApplication, onDeleteRequest }) {
  const [draft, setDraft] = useState(initialDraft)

  const updateField = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  const pinMatches = draft.authorizePin === doctorProfile?.securityPin

  const submitRequest = () => {
    if (!pinMatches) return
    onCreateRequest(draft)
    setDraft((current) => ({
      ...current,
      caseId: `ER-${Math.floor(Math.random() * 9000) + 1000}`,
      patientFileNumber: `PT-${Math.floor(Math.random() * 90) + 10}X${Math.floor(Math.random() * 9) + 1}`,
      note: 'Emergency request broadcast created successfully.',
    }))
  }

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#EEF5FD' }}>
      <div style={{ padding: '22px 20px 14px', background: 'white', flexShrink: 0, borderBottom: '1px solid #DCE9F7' }}>
        <div className="lifedrop-slide-up" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)', border: '1px solid #dfe9f4', borderRadius: 24, padding: '16px 16px 14px', boxShadow: '0 14px 34px rgba(15,61,115,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: '#4d7cbc', fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 5 }}>
              Doctor Command Center
            </div>
            <div style={{ fontSize: 21, fontWeight: 900, color: '#102A43', letterSpacing: -0.3 }}>
              Dr. Portal
            </div>
            <div style={{ fontSize: 12, color: '#6E8199', marginTop: 2, fontWeight: 600 }}>
              {doctorProfile?.role} · {doctorProfile?.hospitalName}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button style={iconButtonStyle}>
              <Bell size={17} color="#2563EB" />
            </button>
            <div style={avatarStyle}>🏥</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 20px', scrollbarWidth: 'none' }}>
        <div className="lifedrop-slide-up" style={alertHeroStyle}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.72)', fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            Healthcare Trust Console
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: 8 }}>
            Create verified blood alerts in seconds
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', lineHeight: 1.5 }}>
            Every request is tied to a medical registration number, department role, and authorization PIN.
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.14)' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>{donationApplications.length}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Donor requests</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.14)' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>{requests.length}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Broadcasts live</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {[
            { icon: <Siren size={20} color="#2563EB" />, label: 'Live Alerts', value: requests.length },
            { icon: <Users2 size={20} color="#1D9A61" />, label: 'Visible to Donors', value: requests.length },
            { icon: <Activity size={20} color="#D97706" />, label: 'Critical Cases', value: requests.filter((r) => r.urgency === 'Critical').length },
          ].map((stat, index) => (
            <div key={stat.label} className={`lifedrop-slide-up ${index === 0 ? 'lifedrop-slide-delay-1' : index === 1 ? 'lifedrop-slide-delay-2' : 'lifedrop-slide-delay-3'}`} style={{ ...statCardStyle, background: 'linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)' }}>
              {stat.icon}
              <div style={{ fontSize: 17, fontWeight: 900, color: '#102A43', marginTop: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: '#6E8199', fontWeight: 700, marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="lifedrop-slide-up lifedrop-slide-delay-1" style={composerCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FilePlus2 size={17} color="#2563EB" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#102A43' }}>Emergency Request Authorization</div>
              <div style={{ fontSize: 11, color: '#6E8199' }}>This form becomes visible on the donor side after PIN authorization.</div>
            </div>
          </div>

          <FieldRow label="Blood Group">
            <select value={draft.blood} onChange={(e) => updateField('blood', e.target.value)} style={inputStyle}>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => <option key={group}>{group}</option>)}
            </select>
          </FieldRow>
          <FieldRow label="Units Required" style={{ marginTop: 14 }}>
            <input value={draft.units} onChange={(e) => updateField('units', e.target.value)} style={inputStyle} />
          </FieldRow>
          <FieldRow label="Urgency" style={{ marginTop: 14 }}>
            <select value={draft.urgency} onChange={(e) => updateField('urgency', e.target.value)} style={inputStyle}>
              {['Critical', 'High', 'Normal'].map((level) => <option key={level}>{level}</option>)}
            </select>
          </FieldRow>
          <FieldRow label="Department / Role" style={{ marginTop: 14 }}>
            <select value={draft.department} onChange={(e) => updateField('department', e.target.value)} style={inputStyle}>
              {['ER In-charge', 'Blood Bank Manager', 'Transplant Coordinator'].map((role) => <option key={role}>{role}</option>)}
            </select>
          </FieldRow>
          <FieldRow label="Case ID" style={{ marginTop: 14 }}>
            <input value={draft.caseId} onChange={(e) => updateField('caseId', e.target.value)} style={inputStyle} />
          </FieldRow>
          <FieldRow label="Patient File Number (Redacted)" style={{ marginTop: 14 }}>
            <input value={draft.patientFileNumber} onChange={(e) => updateField('patientFileNumber', e.target.value)} style={inputStyle} />
          </FieldRow>
          <FieldRow label="Donor Distance Label" style={{ marginTop: 14 }}>
            <input value={draft.distance} onChange={(e) => updateField('distance', e.target.value)} style={inputStyle} />
          </FieldRow>
          <div style={{ marginTop: 14 }}>
            <div style={labelStyle}>Clinical Note</div>
            <textarea value={draft.note} onChange={(e) => updateField('note', e.target.value)} style={textareaStyle} />
          </div>
          <FieldRow label="Digital Signature / 4-Digit PIN" style={{ marginTop: 14 }}>
            <input value={draft.authorizePin} onChange={(e) => updateField('authorizePin', e.target.value)} style={inputStyle} />
          </FieldRow>

          <div className={pinMatches ? 'lifedrop-pulse' : ''} style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 11px', borderRadius: 999, background: pinMatches ? '#ECFDF3' : '#FFF4E5', color: pinMatches ? '#1D9A61' : '#B25E09', border: `1px solid ${pinMatches ? '#CDEFD9' : '#F3D19A'}`, fontSize: 11, fontWeight: 800 }}>
            <ShieldCheck size={14} color={pinMatches ? '#1D9A61' : '#B25E09'} />
            {pinMatches ? 'Authorization PIN verified' : 'Enter the correct 4-digit PIN to broadcast'}
          </div>

          <button onClick={submitRequest} style={{ ...broadcastButtonStyle, opacity: pinMatches ? 1 : 0.65, cursor: pinMatches ? 'pointer' : 'not-allowed' }}>
            Broadcast to donor network
          </button>
        </div>

        <div>
          <div style={{ fontSize: 16, fontWeight: 900, color: '#102A43', marginBottom: 10 }}>Incoming Donor Requests</div>
          {donationApplications?.length ? donationApplications.map((application) => (
            <div key={application.id} className="lifedrop-slide-up lifedrop-slide-delay-2" style={{ ...approvalCardStyle, background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#102A43' }}>{application.donorName}</div>
                  <div style={{ fontSize: 11, color: '#6E8199', marginTop: 2 }}>
                    {application.donorBloodGroup} donor · {application.requestBlood} request · {application.requestHospital}
                  </div>
                </div>
                <span style={{
                  fontSize: 11,
                  fontWeight: 800,
                  borderRadius: 999,
                  padding: '6px 10px',
                  background: application.status === 'approved' ? '#ECFDF3' : application.status === 'rejected' ? '#FDECEA' : '#FFF7E7',
                  color: application.status === 'approved' ? '#1D7F52' : application.status === 'rejected' ? '#A94442' : '#8B5A14',
                  border: `1px solid ${application.status === 'approved' ? '#CDEFD9' : application.status === 'rejected' ? '#F2C6C6' : '#F4D799'}`,
                  textTransform: 'capitalize',
                }}>
                  {application.status}
                </span>
              </div>

              <div style={{ fontSize: 11, color: '#486581', marginTop: 10, lineHeight: 1.55 }}>
                Email: {application.donorEmail}<br />
                Mobile: {application.donorMobile}<br />
                Weight: {application.donorWeight} kg · Last donation: {application.donorLastDonationDate || 'Not shared'}<br />
                Medications: {application.donorMedications}<br />
                Procedures: {application.donorProcedures}<br />
                Travel: {application.donorTravelHistory}
              </div>

              {application.status === 'approved' && (
                <div style={approvedBannerStyle}>
                  This donor has been approved by the doctor portal and can now continue from the donor app.
                </div>
              )}

              {application.status === 'rejected' && (
                <div style={rejectedBannerStyle}>
                  This donor request was rejected. The donor can submit again for review.
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button
                  onClick={() => onReviewDonationApplication(application.id, 'approved')}
                  style={{
                    ...decisionButtonStyle,
                    background: application.status === 'approved' ? '#D7F5E6' : '#1F8F5F',
                    color: application.status === 'approved' ? '#1D7F52' : 'white',
                    border: application.status === 'approved' ? '1px solid #B9E9CF' : 'none',
                  }}
                >
                  {application.status === 'approved' ? 'Approved' : 'Approve donor'}
                </button>
                <button
                  onClick={() => onReviewDonationApplication(application.id, 'rejected')}
                  style={{
                    ...decisionButtonStyle,
                    background: 'white',
                    color: '#A94442',
                    border: '1px solid #F2C6C6',
                    opacity: application.status === 'approved' ? 0.7 : 1,
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          )) : (
            <div className="lifedrop-slide-up lifedrop-slide-delay-2" style={emptyApprovalStyle}>
              No donor approval requests yet. When a donor taps &quot;I Will Donate&quot;, their full profile will appear here for doctor approval.
            </div>
          )}

          <div style={{ fontSize: 16, fontWeight: 900, color: '#102A43', marginBottom: 10 }}>Live Request Feed</div>
          {requests.map((request) => (
            <div key={request.id} className="lifedrop-slide-up lifedrop-slide-delay-1" onClick={() => onOpenRequest(request)} style={{ ...requestCardStyle, background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ background: '#EFF6FF', borderRadius: 12, padding: '8px 10px', flexShrink: 0 }}>
                  <BloodBadge type={request.blood} size="sm" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 900, color: '#102A43' }}>{request.hospital}</div>
                      <div style={{ fontSize: 11, color: '#6E8199', marginTop: 2 }}>{request.department} · Case {request.caseId}</div>
                    </div>
                    <UrgencyBadge level={request.urgency} />
                  </div>
                  <div style={{ fontSize: 12, color: '#486581', marginTop: 8, lineHeight: 1.45 }}>
                    {request.units} unit{request.units > 1 ? 's' : ''} needed · {request.dist} · {request.time}
                  </div>
                  <div style={{ fontSize: 11, color: '#7B8794', marginTop: 6 }}>{request.note}</div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                    <button
                      onClick={(event) => {
                        event.stopPropagation()
                        onDeleteRequest(request.id)
                      }}
                      style={deleteButtonStyle}
                    >
                      Delete request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FieldRow({ children, label, style = {} }) {
  return (
    <div style={style}>
      <div style={labelStyle}>{label}</div>
      <div style={inputShellStyle}>
        {children}
      </div>
    </div>
  )
}

const alertHeroStyle = {
  background: 'linear-gradient(145deg, #0F3D73, #2563EB)',
  borderRadius: 24,
  padding: '20px 18px',
  boxShadow: '0 16px 40px rgba(37,99,235,0.22)',
  marginBottom: 16,
}

const statCardStyle = {
  flex: 1,
  background: 'white',
  borderRadius: 18,
  padding: '14px 10px',
  textAlign: 'center',
  boxShadow: '0 8px 22px rgba(19,37,59,0.06)',
  border: '1px solid #DBE7F4',
}

const composerCardStyle = {
  background: 'white',
  borderRadius: 22,
  padding: 18,
  boxShadow: '0 12px 30px rgba(19,37,59,0.08)',
  border: '1px solid #DBE7F4',
  marginBottom: 16,
}

const approvalCardStyle = {
  background: 'white',
  borderRadius: 18,
  padding: '14px 16px',
  marginBottom: 12,
  boxShadow: '0 8px 22px rgba(19,37,59,0.06)',
  border: '1px solid #DBE7F4',
}

const requestCardStyle = {
  background: 'white',
  borderRadius: 18,
  padding: '14px 16px',
  marginBottom: 12,
  boxShadow: '0 8px 22px rgba(19,37,59,0.06)',
  border: '1px solid #DBE7F4',
  cursor: 'pointer',
}

const iconButtonStyle = {
  background: '#EFF6FF',
  border: 'none',
  width: 38,
  height: 38,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}

const avatarStyle = {
  width: 42,
  height: 42,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #DBEAFE, #EFF6FF)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 20,
  border: '2px solid #BFDBFE',
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

const textareaStyle = {
  width: '100%',
  minHeight: 84,
  border: '1px solid #D6E5F5',
  background: '#F7FBFF',
  borderRadius: 16,
  padding: 14,
  resize: 'vertical',
  outline: 'none',
  color: '#1F2937',
  fontSize: 13,
  fontFamily: 'Nunito, sans-serif',
  boxSizing: 'border-box',
}

const broadcastButtonStyle = {
  width: '100%',
  marginTop: 14,
  border: 'none',
  borderRadius: 18,
  padding: '14px 16px',
  background: 'linear-gradient(135deg, #0F3D73, #2563EB)',
  color: 'white',
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 900,
  fontSize: 14,
  cursor: 'pointer',
}

const decisionButtonStyle = {
  flex: 1,
  borderRadius: 14,
  padding: '10px 12px',
  fontSize: 12,
  fontWeight: 800,
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
}

const approvedBannerStyle = {
  marginTop: 12,
  background: '#ECFDF3',
  border: '1px solid #CDEFD9',
  color: '#1D7F52',
  borderRadius: 14,
  padding: '11px 12px',
  fontSize: 11,
  fontWeight: 700,
  lineHeight: 1.45,
}

const rejectedBannerStyle = {
  marginTop: 12,
  background: '#FDECEA',
  border: '1px solid #F2C6C6',
  color: '#A94442',
  borderRadius: 14,
  padding: '11px 12px',
  fontSize: 11,
  fontWeight: 700,
  lineHeight: 1.45,
}

const emptyApprovalStyle = {
  background: 'white',
  borderRadius: 18,
  padding: '18px 16px',
  marginBottom: 14,
  boxShadow: '0 8px 22px rgba(19,37,59,0.06)',
  border: '1px solid #DBE7F4',
  fontSize: 12,
  color: '#6E8199',
  lineHeight: 1.55,
}

const deleteButtonStyle = {
  background: '#FDECEA',
  border: '1px solid #F2C6C6',
  color: '#A94442',
  borderRadius: 999,
  padding: '8px 12px',
  fontSize: 11,
  fontWeight: 800,
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
}
