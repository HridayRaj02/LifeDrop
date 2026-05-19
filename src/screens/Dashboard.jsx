import { useState } from 'react'
import { AlertTriangle, Bell, ChevronRight, ClipboardList, Droplets, Heart, MapPin, Share2, X } from 'lucide-react'
import BloodBadge from '../components/ui/BloodBadge'
import HelpButton from '../components/ui/HelpButton'
import UrgencyBadge from '../components/ui/UrgencyBadge'
import VerifiedBadge from '../components/ui/VerifiedBadge'
import { formatDisplayDate, getCooldownStatus, getDonationEligibility } from '../utils/bloodCompatibility'

export default function Dashboard({ navigate, requests, donorProfile }) {
  const featured = requests[0]
  const topRequests = requests.slice(0, 5)
  const cooldown = getCooldownStatus(donorProfile?.lastDonationDate)
  const [dismissedCooldownDate, setDismissedCooldownDate] = useState(null)
  const showCooldownTips = cooldown.isCoolingDown && dismissedCooldownDate !== donorProfile?.lastDonationDate
  const activeHospitals = new Set(requests.map((request) => request.hospital)).size
  const bloodGroupsLive = new Set(requests.map((request) => request.blood)).size
  const shareReferral = async () => {
    const message = 'I am part of LifeDrop, a verified blood donor network. Join in and help save a life when the next emergency request appears.'
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me on LifeDrop',
          text: message,
        })
        return
      } catch {
        // Fall back to clipboard.
      }
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(message)
      window.alert('Referral message copied. Share it and bring another donor into LifeDrop.')
      return
    }

    window.alert(message)
  }

  return (
    <>
      <div style={{ padding: '18px 16px 14px', background: 'linear-gradient(180deg, #fffefe 0%, #fff3f2 100%)', flexShrink: 0, borderBottom: '1px solid #f5eaea' }}>
        <div className="lifedrop-slide-up" style={{ background: 'rgba(255,255,255,0.84)', border: '1px solid #f5e2df', borderRadius: 24, padding: '16px 16px 14px', boxShadow: '0 14px 34px rgba(192,57,43,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 10, color: '#C66A5B', fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 5 }}>
                Donor Spotlight
              </div>
              <div style={{ fontSize: 21, fontWeight: 900, color: '#1a1a1a', letterSpacing: -0.3 }}>
                Hello, {donorProfile?.fullName?.split(' ')[0] || 'Priyanka'} 👋
              </div>
              <div style={{ fontSize: 12, color: '#aaa', marginTop: 2, fontWeight: 500 }}>
                Your help can save lives today
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button style={{ background: '#FDF0F0', border: 'none', width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
                <Bell size={17} color="#C0392B" />
                <span className="lifedrop-pulse" style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: '#C0392B', border: '1.5px solid white' }} />
              </button>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, #FDECEA, #f5c6c6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '2.5px solid #E85D5D' }}>
                👩
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <div style={{ flex: 1, background: '#fff7f5', border: '1px solid #f4dfdb', borderRadius: 16, padding: '9px 12px' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#C0392B' }}>Verified Donor</div>
              <div style={{ fontSize: 10, color: '#9a7e78', marginTop: 2 }}>Health profile complete</div>
            </div>
            <div style={{ flex: 1, background: '#fff7f5', border: '1px solid #f4dfdb', borderRadius: 16, padding: '9px 12px' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#C0392B' }}>Safe Matching</div>
              <div style={{ fontSize: 10, color: '#9a7e78', marginTop: 2 }}>Compatibility checks on</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', background: '#F9F2F2' }}>
        <div style={{ padding: '14px 16px 20px' }}>
          {showCooldownTips && (
            <div style={popupOverlayStyle}>
              <div className="lifedrop-slide-up" style={popupCardStyle}>
                <button type="button" onClick={() => setDismissedCooldownDate(donorProfile?.lastDonationDate)} style={closeButtonStyle}>
                  <X size={16} color="#8C4738" />
                </button>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <div style={warningIconShellStyle}>
                    <AlertTriangle size={16} color="#B03020" />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: '#1A1A1A' }}>Donation cooldown active</div>
                    <div style={{ fontSize: 11, color: '#8C6C66', marginTop: 2 }}>
                      Available again on {formatDisplayDate(cooldown.nextEligibleDate)}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#7A5A54', lineHeight: 1.55, marginBottom: 10 }}>
                  Give your body a little recovery window before the next life-saving donation.
                </div>
                {[
                  'Drink extra water and keep meals iron-rich for the next day.',
                  'Avoid intense workouts or heavy lifting until your body fully settles.',
                  'If you feel dizzy, rest and keep the donation bandage on for a few hours.',
                ].map((tip) => (
                  <div key={tip} style={tipRowStyle}>
                    <span style={tipDotStyle}>•</span>
                    <span style={{ fontSize: 11, color: '#6E5752', lineHeight: 1.45 }}>{tip}</span>
                  </div>
                ))}
                <button type="button" onClick={() => setDismissedCooldownDate(donorProfile?.lastDonationDate)} style={popupActionStyle}>
                  Understood
                </button>
              </div>
            </div>
          )}

          {featured && (
            <div className="lifedrop-slide-up" onClick={() => navigate('details', featured)} style={{ background: 'linear-gradient(135deg, #8F1C17 0%, #C0392B 38%, #EF6A5A 100%)', borderRadius: 24, padding: '20px 18px', marginBottom: 18, cursor: 'pointer', boxShadow: '0 16px 36px rgba(192,57,43,0.38)', position: 'relative', overflow: 'hidden' }}>
              <div className="lifedrop-float" style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ position: 'absolute', bottom: -25, left: -15, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
                🚨 Active Emergency Nearby
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ fontSize: 30, fontWeight: 900, color: 'white', lineHeight: 1 }}>{featured.blood}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={12} color="rgba(255,255,255,0.75)" />
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{featured.dist} away</span>
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 20, padding: '5px 13px', border: '1px solid rgba(255,255,255,0.25)' }}>
                  <span className={featured.urgency === 'Critical' ? 'lifedrop-pulse' : ''} style={{ display: 'inline-block', fontSize: 11, fontWeight: 800, color: 'white' }}>{featured.urgency}</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <span style={{ color: '#C0392B', fontWeight: 800, fontSize: 14 }}>View Request</span>
                <ChevronRight size={14} color="#C0392B" />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            {[
              { num: '184', label: 'Lives Supported', icon: '❤️', color: '#C0392B' },
              { num: '63', label: 'Completed Donations', icon: '🩸', color: '#E05050' },
              { num: `${requests.length}+`, label: 'Active Requests', icon: '🏥', color: '#D68910' },
            ].map((s, index) => (
              <div key={s.label} className={`lifedrop-slide-up ${index === 0 ? 'lifedrop-slide-delay-1' : index === 1 ? 'lifedrop-slide-delay-2' : 'lifedrop-slide-delay-3'}`} style={{ flex: 1, background: 'linear-gradient(180deg, #ffffff 0%, #fff7f5 100%)', borderRadius: 18, padding: '12px 10px', textAlign: 'center', boxShadow: '0 10px 24px rgba(0,0,0,0.06)', border: '1px solid #f4e5e2' }}>
                <div style={{ fontSize: 20 }}>{s.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 900, color: s.color, marginTop: 2 }}>{s.num}</div>
                <div style={{ fontSize: 10, color: '#aaa', fontWeight: 600, marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a' }}>Nearby Requests</div>
            <button onClick={() => navigate('emergency')} style={{ background: 'none', border: 'none', color: '#C0392B', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2, fontFamily: 'Nunito, sans-serif' }}>
              See all <ChevronRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <div style={miniInfoCardStyle}>
              <div style={miniInfoLabelStyle}>Hospitals live</div>
              <div style={miniInfoValueStyle}>{activeHospitals}</div>
            </div>
            <div style={miniInfoCardStyle}>
              <div style={miniInfoLabelStyle}>Blood groups active</div>
              <div style={miniInfoValueStyle}>{bloodGroupsLive}</div>
            </div>
            <div style={miniInfoCardStyle}>
              <div style={miniInfoLabelStyle}>Units needed</div>
              <div style={miniInfoValueStyle}>{requests.reduce((sum, request) => sum + request.units, 0)}</div>
            </div>
          </div>

          {topRequests.map((request) => {
            const eligibility = getDonationEligibility(donorProfile, request.blood)
            return (
              <div key={request.id} className="lifedrop-slide-up lifedrop-slide-delay-1" onClick={() => navigate('details', request)} style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fffaf9 100%)', borderRadius: 20, padding: '14px 16px', marginBottom: 10, boxShadow: '0 10px 24px rgba(0,0,0,0.06)', cursor: 'pointer', border: '1px solid #f4e5e2' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ background: '#FDF0F0', borderRadius: 12, padding: '8px 10px', flexShrink: 0 }}>
                    <BloodBadge type={request.blood} size="sm" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#1a1a1a' }}>{request.title}</div>
                      <span style={{ fontSize: 11, color: '#bbb', fontWeight: 500 }}>{request.time}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>
                      <MapPin size={10} style={{ display: 'inline', marginRight: 3, verticalAlign: 'middle' }} />
                      {request.hospital} · {request.dist}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <VerifiedBadge />
                        <UrgencyBadge level={request.urgency} />
                      </div>
                      {eligibility.allowed ? (
                        <HelpButton onClick={(e) => { e.stopPropagation(); navigate('details', request) }} style={{ padding: '8px 16px', fontSize: 12, boxShadow: '0 8px 18px rgba(192,57,43,0.26)' }} />
                      ) : (
                        <span style={blockedPillStyle}>
                          <AlertTriangle size={12} />
                          Can&apos;t donate now
                        </span>
                      )}
                    </div>
                    {!eligibility.allowed && eligibility.reason === 'cooldown' && (
                      <div style={cooldownInfoStyle}>
                        <AlertTriangle size={13} color="#9F2F21" />
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 900, color: '#9F2F21' }}>
                            Donation cooldown active
                          </div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: '#A65A4B', marginTop: 2 }}>
                            Available again in {eligibility.daysRemaining} days
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a', marginTop: 6, marginBottom: 10 }}>My Activity</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { icon: <Droplets size={24} color="#C0392B" />, label: 'My Donations', count: 14 },
              { icon: <ClipboardList size={24} color="#E05050" />, label: 'My Responses', count: 29 },
              { icon: <Heart size={24} color="#C0392B" fill="#C0392B" />, label: 'Saved Lives', count: 41 },
            ].map((a) => (
              <div key={a.label} className="lifedrop-slide-up lifedrop-slide-delay-2" style={{ flex: 1, background: 'linear-gradient(180deg, #ffffff 0%, #fff8f6 100%)', borderRadius: 18, padding: '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, boxShadow: '0 10px 24px rgba(0,0,0,0.05)', border: '1px solid #f4e5e2' }}>
                {a.icon}
                <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a' }}>{a.count}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#888', textAlign: 'center' }}>{a.label}</div>
              </div>
            ))}
          </div>

          <div className="lifedrop-slide-up lifedrop-slide-delay-3" style={referralCardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={referralIconShellStyle}>💌</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 900, color: '#1A1A1A' }}>Refer others to save another life</div>
                <div style={{ fontSize: 11, color: '#8E7670', marginTop: 2 }}>
                  Grow the donor network before the next emergency request goes live.
                </div>
              </div>
            </div>
            <button onClick={shareReferral} style={referralButtonStyle}>
              <Share2 size={15} /> Save a life, refer someone
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const cooldownInfoStyle = {
  marginTop: 10,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  background: 'linear-gradient(135deg, #FFF1ED 0%, #FFE2DB 100%)',
  border: '1px solid #F4B9AB',
  borderLeft: '4px solid #D64532',
  borderRadius: 16,
  padding: '10px 12px',
}

const blockedPillStyle = {
  fontSize: 11,
  fontWeight: 800,
  color: '#A94442',
  background: '#FDECEA',
  border: '1px solid #F2C6C6',
  borderRadius: 14,
  padding: '7px 10px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  flexShrink: 1,
  maxWidth: '100%',
  minWidth: 0,
  whiteSpace: 'normal',
  lineHeight: 1.25,
  justifyContent: 'center',
  textAlign: 'center',
}

const popupOverlayStyle = {
  position: 'relative',
  marginBottom: 16,
}

const popupCardStyle = {
  position: 'relative',
  background: 'linear-gradient(180deg, #FFF9F5 0%, #FFF0EA 100%)',
  border: '1px solid #F2C4B7',
  borderLeft: '5px solid #D64532',
  borderRadius: 22,
  padding: '16px 16px 14px',
  boxShadow: '0 14px 30px rgba(176,48,32,0.12)',
}

const warningIconShellStyle = {
  width: 34,
  height: 34,
  borderRadius: 12,
  background: '#FDE7E3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

const closeButtonStyle = {
  position: 'absolute',
  top: 10,
  right: 10,
  background: 'rgba(255,255,255,0.75)',
  border: '1px solid #F1D7D0',
  width: 30,
  height: 30,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}

const tipRowStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
  marginBottom: 8,
}

const tipDotStyle = {
  fontSize: 16,
  lineHeight: 1,
  color: '#B03020',
  marginTop: -1,
}

const popupActionStyle = {
  width: '100%',
  marginTop: 6,
  border: 'none',
  borderRadius: 16,
  padding: '11px 14px',
  background: 'linear-gradient(135deg, #B03020, #E05050)',
  color: 'white',
  fontSize: 12,
  fontWeight: 900,
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
  boxShadow: '0 10px 24px rgba(176,48,32,0.22)',
}

const miniInfoCardStyle = {
  flex: 1,
  background: 'linear-gradient(180deg, #ffffff 0%, #fff7f5 100%)',
  border: '1px solid #F2E1DD',
  borderRadius: 16,
  padding: '10px 12px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
}

const miniInfoLabelStyle = {
  fontSize: 10,
  fontWeight: 800,
  color: '#B78378',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
}

const miniInfoValueStyle = {
  marginTop: 5,
  fontSize: 17,
  fontWeight: 900,
  color: '#1A1A1A',
}

const referralCardStyle = {
  marginTop: 14,
  background: 'linear-gradient(135deg, #FFF7F3 0%, #FFFFFF 100%)',
  border: '1px solid #F4DDD7',
  borderRadius: 20,
  padding: '16px 16px 14px',
  boxShadow: '0 10px 26px rgba(176,48,32,0.08)',
}

const referralIconShellStyle = {
  width: 38,
  height: 38,
  borderRadius: 12,
  background: '#FDECEA',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
  flexShrink: 0,
}

const referralButtonStyle = {
  width: '100%',
  marginTop: 4,
  padding: '12px 14px',
  background: 'linear-gradient(135deg, #FFF1ED, #FDE1DB)',
  border: '1px solid #F3C7BC',
  borderRadius: 16,
  color: '#B03020',
  fontWeight: 900,
  fontSize: 13,
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
}
