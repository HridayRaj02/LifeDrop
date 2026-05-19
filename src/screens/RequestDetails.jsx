import { AlertTriangle, ArrowLeft, Clock, MapPin, Phone, Share2, Bookmark } from 'lucide-react'
import UrgencyBadge from '../components/ui/UrgencyBadge'
import VerifiedBadge from '../components/ui/VerifiedBadge'
import { formatDisplayDate, getDonationEligibility } from '../utils/bloodCompatibility'

const fallbackRequest = {
  blood: 'O+',
  hospital: 'City Hospital',
  units: 2,
  urgency: 'Critical',
  time: '15 mins ago',
  address: '223 Londway Road, Address, Danakinchi, 22077',
  caseId: 'ER-2048',
  department: 'ER In-charge',
  requestedBy: 'Dr. Mehra',
  patientFileNumber: 'PT-91X2',
  note: 'Immediate blood required before emergency surgery.',
  dist: '2.3 km',
}

export default function RequestDetails({ navigate, selectedBlood, selectedRequest, donorProfile, donationApplications, onSubmitDonationIntent, onViewImpact }) {
  const request = selectedRequest || { ...fallbackRequest, blood: selectedBlood || fallbackRequest.blood }
  const eligibility = getDonationEligibility(donorProfile, request.blood)
  const canDonate = eligibility.allowed
  const currentApplication = donationApplications?.find(
    (application) =>
      application.requestId === request.id &&
      application.donorEmail === donorProfile?.email,
  )
  const actionLabel = currentApplication?.status === 'approved'
    ? 'Doctor approved • Continue to hospital'
    : currentApplication?.status === 'arrived'
      ? 'At hospital • Continue'
      : currentApplication?.status === 'donated'
        ? 'Waiting for doctor confirmation'
        : currentApplication?.status === 'completed'
          ? 'Donation confirmed'
    : currentApplication?.status === 'pending'
      ? 'Pending doctor approval'
      : currentApplication?.status === 'rejected'
        ? 'Request again for approval'
        : 'I Will Donate 🩸'

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px 14px', background: 'white', flexShrink: 0, borderBottom: '1px solid #f5eaea' }}>
        <button onClick={() => navigate('emergency')} style={{ background: '#FDF0F0', border: 'none', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft size={18} color="#C0392B" />
        </button>
        <div style={{ fontSize: 17, fontWeight: 900, color: '#1a1a1a', flex: 1 }}>Request Details</div>
        <button style={{ background: '#FDF0F0', border: 'none', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Share2 size={16} color="#C0392B" />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', background: '#F9F2F2' }}>
        <div style={{ background: 'white', margin: '12px 16px 0', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <div style={{ background: 'linear-gradient(135deg, #B03020, #C0392B)', padding: '24px 20px 20px', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -15, right: -15, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ fontSize: 68, fontWeight: 900, color: 'white', lineHeight: 1, textShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>{request.blood}</div>
          </div>
          <div style={{ padding: '14px 20px 16px', textAlign: 'center' }}>
            <div style={{ marginBottom: 6 }}>
              <UrgencyBadge level={request.urgency} />
            </div>
            <div style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>
              Immediate blood required · {request.units} unit{request.units > 1 ? 's' : ''} needed
            </div>
          </div>
        </div>

        <div style={{ padding: '12px 16px 20px' }}>
          <div style={{ background: 'white', borderRadius: 18, padding: 16, marginBottom: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a', marginBottom: 5 }}>{request.hospital}</div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'flex-start', marginBottom: 8 }}>
                  <MapPin size={12} color="#aaa" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#999', lineHeight: 1.4 }}>{request.address}</span>
                </div>
                <VerifiedBadge label="Verified by hospital" size={13} />
              </div>
              <div style={{ width: 80, height: 80, borderRadius: 14, background: 'linear-gradient(135deg, #e0f0e8, #c8e6d4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid #b8ddc8', gap: 2 }}>
                <span style={{ fontSize: 30 }}>🗺️</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#4a9e6e' }}>{request.dist}</span>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: 18, padding: '14px 16px', marginBottom: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            {[
              { icon: <span style={{ fontSize: 16 }}>👥</span>, label: `${request.units} Units needed` },
              { icon: <Clock size={15} color="#C0392B" />, label: `Posted ${request.time}` },
              { icon: <Phone size={15} color="#C0392B" />, label: `${request.department} · Case ${request.caseId}`, sub: `Requested by ${request.requestedBy} · File ${request.patientFileNumber}` },
            ].map((info, index) => (
              <div key={index} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', paddingBottom: index < 2 ? 12 : 0, marginBottom: index < 2 ? 12 : 0, borderBottom: index < 2 ? '1px solid #f8f0f0' : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: '#FDF0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{info.icon}</div>
                <div>
                  <div style={{ fontSize: 13, color: '#333', fontWeight: 600 }}>{info.label}</div>
                  {info.sub && <div style={{ fontSize: 11, color: '#bbb', marginTop: 2 }}>{info.sub}</div>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'white', borderRadius: 18, padding: '14px 16px', marginBottom: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#1a1a1a', marginBottom: 10 }}>Clinical Note</div>
            <div style={{ fontSize: 12, color: '#7A6F6F', lineHeight: 1.55 }}>{request.note}</div>
          </div>

          <button
            onClick={() => {
              if (!canDonate) return
              if (currentApplication?.status === 'completed') {
                onViewImpact(request)
                return
              }
              if (currentApplication?.status === 'approved') {
                navigate('progress', request)
                return
              }
              if (currentApplication?.status === 'arrived' || currentApplication?.status === 'donated') {
                navigate('hospital', request)
                return
              }
              onSubmitDonationIntent(request)
            }}
            style={{
              width: '100%',
              padding: '15px',
              background: !canDonate
                ? 'linear-gradient(135deg, #F7D6D1, #E8C4BF)'
                : currentApplication?.status === 'completed'
                  ? 'linear-gradient(135deg, #1F8F5F, #2CB67D)'
                : currentApplication?.status === 'approved'
                  ? 'linear-gradient(135deg, #1F8F5F, #2CB67D)'
                  : currentApplication?.status === 'arrived'
                    ? 'linear-gradient(135deg, #1D4ED8, #3B82F6)'
                    : currentApplication?.status === 'donated'
                      ? 'linear-gradient(135deg, #B57A15, #D89A2B)'
                  : currentApplication?.status === 'pending'
                    ? 'linear-gradient(135deg, #B57A15, #D89A2B)'
                    : 'linear-gradient(135deg, #B03020, #E05050)',
              color: canDonate ? 'white' : '#8D3A2D',
              borderRadius: 22,
              fontWeight: 900,
              fontSize: 16,
              border: !canDonate ? '1px solid #D99D90' : 'none',
              cursor: canDonate ? 'pointer' : 'not-allowed',
              fontFamily: 'Nunito, sans-serif',
              boxShadow: canDonate ? '0 8px 24px rgba(192,57,43,0.42)' : 'none',
              marginBottom: 12,
              letterSpacing: 0.3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {canDonate ? actionLabel : (
              <>
                <AlertTriangle size={16} />
                Can&apos;t donate now
              </>
            )}
          </button>

          {currentApplication?.status === 'pending' && (
            <div style={{ background: '#FFF7E7', border: '1px solid #F4D799', color: '#8B5A14', borderRadius: 16, padding: '12px 14px', fontSize: 12, fontWeight: 700, lineHeight: 1.45, marginBottom: 12 }}>
              Your donation request has been sent to the doctor portal with your donor details. Until the doctor approves it, the next page will stay locked and your status will remain pending.
            </div>
          )}

          {currentApplication?.status === 'approved' && (
            <div style={{ background: '#ECFDF3', border: '1px solid #CDEFD9', color: '#1D7F52', borderRadius: 16, padding: '12px 14px', fontSize: 12, fontWeight: 700, lineHeight: 1.45, marginBottom: 12 }}>
              Doctor approval received. You can now continue to the hospital progress screen.
            </div>
          )}

          {currentApplication?.status === 'arrived' && (
            <div style={{ background: '#EEF5FF', border: '1px solid #CFE0F8', color: '#275DA8', borderRadius: 16, padding: '12px 14px', fontSize: 12, fontWeight: 700, lineHeight: 1.45, marginBottom: 12 }}>
              Arrival marked. Continue to the hospital checkpoint screen to complete the donation flow.
            </div>
          )}

          {currentApplication?.status === 'donated' && (
            <div style={{ background: '#FFF7E7', border: '1px solid #F4D799', color: '#8B5A14', borderRadius: 16, padding: '12px 14px', fontSize: 12, fontWeight: 700, lineHeight: 1.45, marginBottom: 12 }}>
              Donation marked from your side. The doctor just needs to confirm it before the final impact page opens.
            </div>
          )}

          {currentApplication?.status === 'completed' && (
            <div style={{ background: '#ECFDF3', border: '1px solid #CDEFD9', color: '#1D7F52', borderRadius: 16, padding: '12px 14px', fontSize: 12, fontWeight: 700, lineHeight: 1.45, marginBottom: 12 }}>
              Donation confirmed by the doctor. Your life-saving impact page is now ready.
            </div>
          )}

          {currentApplication?.status === 'rejected' && (
            <div style={{ background: '#FDECEA', border: '1px solid #F2C6C6', color: '#A94442', borderRadius: 16, padding: '12px 14px', fontSize: 12, fontWeight: 700, lineHeight: 1.45, marginBottom: 12 }}>
              This donor request was not approved. You can send it again for doctor review.
            </div>
          )}

          {!canDonate && donorProfile?.bloodGroup && (
            <div style={{ background: 'linear-gradient(135deg, #FFF1ED 0%, #FFE2DB 100%)', border: '1px solid #F4B9AB', borderLeft: '4px solid #D64532', color: '#9F2F21', borderRadius: 16, padding: '12px 14px', fontSize: 12, fontWeight: 700, lineHeight: 1.45, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <AlertTriangle size={15} />
                <span style={{ fontWeight: 900 }}>Can&apos;t donate now</span>
              </div>
              {eligibility.reason === 'cooldown'
                ? `You donated recently. You can donate again after ${formatDisplayDate(eligibility.nextEligibleDate)}.`
                : `Your donor blood group is ${donorProfile.bloodGroup}. This request needs ${request.blood}, so donation is blocked for safety.`}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <button style={{ flex: 1, padding: '11px', background: 'white', border: '2px solid #FDECEA', borderRadius: 16, color: '#C0392B', fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'Nunito, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Bookmark size={14} /> Save for later
            </button>
            <button style={{ flex: 1, padding: '11px', background: 'white', border: '2px solid #FDECEA', borderRadius: 16, color: '#C0392B', fontWeight: 800, fontSize: 13, cursor: 'pointer', fontFamily: 'Nunito, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Share2 size={14} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
