import { useState } from 'react'
import { AlertTriangle, ArrowLeft, MapPin, SlidersHorizontal } from 'lucide-react'
import BloodBadge from '../components/ui/BloodBadge'
import HelpButton from '../components/ui/HelpButton'
import UrgencyBadge from '../components/ui/UrgencyBadge'
import VerifiedBadge from '../components/ui/VerifiedBadge'
import { getDonationEligibility } from '../utils/bloodCompatibility'

const Chip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '5px 12px',
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 700,
      cursor: 'pointer',
      border: 'none',
      flexShrink: 0,
      fontFamily: 'Nunito, sans-serif',
      lineHeight: 1,
      background: active ? '#C0392B' : 'white',
      color: active ? 'white' : '#666',
      boxShadow: active ? '0 3px 10px rgba(192,57,43,0.32)' : '0 1px 3px rgba(0,0,0,0.1)',
    }}
  >
    {label}
  </button>
)

const FilterRow = ({ label, options, value, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 32 }}>
    <span style={{ fontSize: 10, color: '#C0392B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, flexShrink: 0, width: 58 }}>
      {label}
    </span>
    <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', flex: 1, paddingBottom: 2 }}>
      {options.map((option) => (
        <Chip key={option} label={option} active={value === option} onClick={() => onChange(option)} />
      ))}
    </div>
  </div>
)

export default function EmergencyList({ navigate, donorProfile, requests }) {
  const [bg, setBg] = useState('All')
  const [dist, setDist] = useState('Nearby')
  const [urg, setUrg] = useState('All')
  const totalUnitsRequested = requests.reduce((sum, request) => sum + request.units, 0)
  const activeHospitals = new Set(requests.map((request) => request.hospital)).size

  const filtered = requests.filter((request) => {
    if (bg !== 'All' && request.blood !== bg) return false
    if (urg !== 'All' && request.urgency !== urg) return false
    const km = Number.parseFloat(request.dist)
    if (dist === 'Nearby' && km > 3) return false
    if (dist === 'City' && km > 10) return false
    return true
  })

  return (
    <>
      <div style={{ background: 'white', flexShrink: 0, borderBottom: '1px solid #f0e8e8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 18px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => navigate('dashboard')} style={{ background: '#FDF0F0', border: 'none', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <ArrowLeft size={18} color="#C0392B" />
            </button>
            <div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a' }}>Emergency Requests</div>
              <div style={{ fontSize: 11, color: '#bbb', fontWeight: 500 }}>Doctor-verified live blood requests near you</div>
            </div>
          </div>
          <button style={{ background: '#FDF0F0', border: 'none', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <SlidersHorizontal size={16} color="#C0392B" />
          </button>
        </div>

        <div style={{ padding: '4px 18px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <FilterRow label="Blood" options={['All', 'A+', 'B+', 'O+', 'A-', 'B-', 'AB+', 'AB-']} value={bg} onChange={setBg} />
          <FilterRow label="Distance" options={['Nearby', 'City', 'All']} value={dist} onChange={setDist} />
          <FilterRow label="Urgency" options={['All', 'Critical', 'High', 'Normal']} value={urg} onChange={setUrg} />
        </div>

        <div style={{ padding: '6px 18px 8px', background: '#FDF5F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#C0392B', fontWeight: 800 }}>
            {filtered.length} request{filtered.length !== 1 ? 's' : ''} found
          </span>
          <span style={{ fontSize: 10, color: '#bbb' }}>Doctor authorized broadcasts only</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', scrollbarWidth: 'none', background: '#F9F2F2' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>Requests live</div>
            <div style={summaryValueStyle}>{requests.length}</div>
          </div>
          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>Units needed</div>
            <div style={summaryValueStyle}>{totalUnitsRequested}</div>
          </div>
          <div style={summaryCardStyle}>
            <div style={summaryLabelStyle}>Hospitals</div>
            <div style={summaryValueStyle}>{activeHospitals}</div>
          </div>
        </div>

        {filtered.map((request) => {
          const eligibility = getDonationEligibility(donorProfile, request.blood)

          return (
            <div
              key={request.id}
              onClick={() => navigate('details', request)}
              style={{
                background: 'white',
                borderRadius: 18,
                padding: '13px 14px',
                marginBottom: 10,
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                borderLeft:
                  request.urgency === 'Critical'
                    ? '4px solid #C0392B'
                    : request.urgency === 'High'
                      ? '4px solid #E8A020'
                      : '4px solid #ddd',
              }}
            >
              <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                <div style={{ background: '#FDF0F0', borderRadius: 12, padding: '9px 10px', flexShrink: 0, textAlign: 'center', minWidth: 56 }}>
                  <BloodBadge type={request.blood} size="md" />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#1a1a1a' }}>{request.hospital}</div>
                      <div style={{ fontSize: 11, color: '#A0A0A0', marginTop: 2 }}>{request.department} · Case {request.caseId}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                      <UrgencyBadge level={request.urgency} />
                      <VerifiedBadge size={12} />
                    </div>
                  </div>

                  <div style={{ fontSize: 11, color: '#aaa', marginTop: 6, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <MapPin size={10} />
                    {request.dist} · {request.units} unit{request.units > 1 ? 's' : ''} needed
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, color: '#ccc' }}>Posted {request.time}</span>
                    {eligibility.allowed ? (
                      <HelpButton onClick={(e) => { e.stopPropagation(); navigate('details', request) }} style={{ fontSize: 12, padding: '7px 14px' }} />
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

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px 20px' }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#888' }}>No requests match</div>
            <div style={{ fontSize: 12, color: '#bbb', marginTop: 4 }}>Try a different blood group or urgency</div>
          </div>
        )}
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

const summaryCardStyle = {
  flex: 1,
  background: 'linear-gradient(180deg, #ffffff 0%, #fff7f5 100%)',
  border: '1px solid #F2E1DD',
  borderRadius: 16,
  padding: '10px 12px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
}

const summaryLabelStyle = {
  fontSize: 10,
  fontWeight: 800,
  color: '#B78378',
  textTransform: 'uppercase',
  letterSpacing: 0.5,
}

const summaryValueStyle = {
  marginTop: 5,
  fontSize: 17,
  fontWeight: 900,
  color: '#1A1A1A',
}
