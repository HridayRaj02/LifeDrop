import { Download, Home, RotateCcw, Share2, ShieldAlert, Star } from 'lucide-react'
import { formatDisplayDate, getCooldownStatus, getTodayIsoDate } from '../utils/bloodCompatibility'

const PRECAUTIONS = [
  'Drink extra water for the next 24 hours.',
  'Avoid heavy lifting or intense workouts for the rest of the day.',
  'Keep the bandage on for at least 4 to 5 hours.',
  'Eat an iron-rich meal and do not skip rest.',
]

export default function DonationComplete({ navigate, selectedBlood, donorProfile, onReset }) {
  const cooldown = getCooldownStatus(donorProfile?.lastDonationDate || getTodayIsoDate())

  const shareReferral = async () => {
    const message = 'I just completed a verified blood donation on LifeDrop. Save a life with me by joining as a donor and being ready when an emergency request appears.'
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me on LifeDrop',
          text: message,
        })
        return
      } catch {
        // Fall through to clipboard for browsers where share is dismissed or unsupported.
      }
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(message)
      window.alert('Referral message copied. Share it and help save another life.')
      return
    }

    window.alert(message)
  }

  const downloadCertificate = () => {
    const donationDate = new Date()
    const donorName = donorProfile?.fullName || 'Verified Donor'
    const bloodGroup = selectedBlood || donorProfile?.bloodGroup || 'O+'
    const certificateId = `LD-${donationDate.getFullYear()}-${String(donationDate.getMonth() + 1).padStart(2, '0')}${String(donationDate.getDate()).padStart(2, '0')}-${String(donationDate.getHours()).padStart(2, '0')}${String(donationDate.getMinutes()).padStart(2, '0')}`
    const certificateHtml = createCertificateHtml({
      donorName,
      bloodGroup,
      donationDate: formatDisplayDate(donationDate),
      hospitalName: 'City Hospital',
      certificateId,
    })

    const blob = new Blob([certificateHtml], { type: 'text/html;charset=utf-8' })
    const blobUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = `lifedrop-donation-certificate-${certificateId}.html`
    link.click()

    window.open(blobUrl, '_blank', 'noopener,noreferrer')

    window.setTimeout(() => {
      URL.revokeObjectURL(blobUrl)
    }, 5000)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#FDF6F6', overflowY: 'auto', scrollbarWidth: 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 20px 0', gap: 10 }}>
        <button onClick={() => navigate('dashboard')} style={topIconButtonStyle}>
          <Home size={18} color="#888" />
        </button>
        <button onClick={onReset} style={resetButtonStyle}>
          <RotateCcw size={15} /> Reset demo
        </button>
      </div>

      <div className="lifedrop-slide-up" style={{ display: 'flex', justifyContent: 'center', padding: '6px 30px 0' }}>
        <div style={{ width: 220, height: 190, borderRadius: 28, background: 'linear-gradient(135deg, #FDECEA 0%, #FFF5F5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '2px solid #FDDCDC', boxShadow: '0 18px 40px rgba(192,57,43,0.12)' }}>
          <div style={{ fontSize: 70 }}>🩺</div>
          {[
            { icon: '❤️', top: 15, right: 18, size: 28 },
            { icon: '🩸', bottom: 20, left: 20, size: 24 },
            { icon: '💛', top: 12, left: 28, size: 22 },
            { icon: '✨', bottom: 14, right: 24, size: 20 },
          ].map((d, i) => (
            <div key={i} className={i % 2 === 0 ? 'lifedrop-float' : 'lifedrop-float-delay'} style={{ position: 'absolute', fontSize: d.size, top: d.top, right: d.right, bottom: d.bottom, left: d.left }}>
              {d.icon}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '18px 20px 24px' }}>
        <div className="lifedrop-slide-up lifedrop-slide-delay-1" style={{ textAlign: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#1a1a1a', letterSpacing: -0.3 }}>
            You saved a life ❤️
          </div>
          <div style={{ fontSize: 13, color: '#999', marginTop: 6, lineHeight: 1.5 }}>
            Your donation has made a real difference today
          </div>
        </div>

        <div className="lifedrop-slide-up lifedrop-slide-delay-1" style={cardStyle}>
          <div style={{ background: 'linear-gradient(90deg, #C0392B, #E05050)', height: 4, margin: '-16px -18px 14px' }} />
          {[
            { label: 'Blood type donated:', value: selectedBlood || donorProfile?.bloodGroup || 'O+' },
            { label: 'Units donated:', value: '1 Unit' },
            { label: 'Location:', value: 'City Hospital' },
            { label: 'Next eligible date:', value: formatDisplayDate(cooldown.nextEligibleDate) },
          ].map((row, i) => (
            <div key={i} style={summaryRowStyle}>
              <span style={{ fontSize: 13, color: '#888' }}>{row.label}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#1a1a1a', textAlign: 'right' }}>{row.value}</span>
            </div>
          ))}
          <div style={{ textAlign: 'center', paddingTop: 6, fontSize: 13, color: '#888' }}>
            This can help up to <strong style={{ color: '#C0392B', fontSize: 14 }}>3 people</strong>
          </div>
        </div>

        <div className="lifedrop-slide-up lifedrop-slide-delay-2" style={cooldownCardStyle}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
            <ShieldAlert size={18} color="#8B5A14" />
            <div style={{ fontSize: 14, fontWeight: 900, color: '#6F4211' }}>Donation cooldown active</div>
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#8B5A14', marginBottom: 6 }}>
            {cooldown.daysRemaining} day{cooldown.daysRemaining === 1 ? '' : 's'}
          </div>
          <div style={{ fontSize: 12, color: '#8B6A3A', lineHeight: 1.5 }}>
            You can donate again after <strong>{formatDisplayDate(cooldown.nextEligibleDate)}</strong>. LifeDrop will keep donation actions locked for 56 days / 8 weeks.
          </div>
        </div>

        <div className="lifedrop-slide-up lifedrop-slide-delay-2" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fffaf8 100%)', borderRadius: 18, padding: '14px 16px', marginBottom: 14, boxShadow: '0 10px 24px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', border: '3px dashed #C0392B', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FDF0F0', flexShrink: 0, gap: 1 }}>
            <span style={{ fontSize: 28 }}>🏅</span>
            <span style={{ fontSize: 7, fontWeight: 900, color: '#C0392B', textAlign: 'center', lineHeight: 1.2 }}>LifeSaver Badge</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#1a1a1a', fontStyle: 'italic', marginBottom: 6, lineHeight: 1.4 }}>
              &quot;Heroes don&apos;t always wear capes&quot;
            </div>
            <div style={{ display: 'flex', gap: 1, marginBottom: 5 }}>
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={13} color="#F0A500" fill="#F0A500" />)}
            </div>
            <div style={{ fontSize: 11, color: '#aaa' }}>Total donations: <strong style={{ color: '#C0392B' }}>3</strong></div>
          </div>
        </div>

        <div className="lifedrop-slide-up lifedrop-slide-delay-3" style={cardStyle}>
          <div style={{ fontSize: 14, fontWeight: 900, color: '#1a1a1a', marginBottom: 12 }}>
            After-donation precautions
          </div>
          {PRECAUTIONS.map((item, index) => (
            <div key={index} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: index < PRECAUTIONS.length - 1 ? 10 : 0 }}>
              <span style={{ fontSize: 14 }}>•</span>
              <span style={{ fontSize: 12, color: '#6D5E5E', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>

        <button className="lifedrop-slide-up lifedrop-slide-delay-3" onClick={() => navigate('dashboard')} style={primaryButtonStyle}>
          Done ✓
        </button>

        <button className="lifedrop-slide-up lifedrop-slide-delay-3" onClick={downloadCertificate} style={secondaryButtonStyle}>
          <Download size={16} /> Download certificate
        </button>

        <button className="lifedrop-slide-up lifedrop-slide-delay-3" style={{ ...secondaryButtonStyle, marginBottom: 16 }}>
          <Share2 size={16} /> Share your impact
        </button>

        <div className="lifedrop-slide-up lifedrop-slide-delay-3" style={referralCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={referralIconShellStyle}>💌</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#1A1A1A' }}>Refer others to save another life</div>
              <div style={{ fontSize: 11, color: '#8E7670', marginTop: 2 }}>
                One message from you can bring the next verified donor into an emergency.
              </div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#6E5B57', lineHeight: 1.55, marginBottom: 12 }}>
            Share LifeDrop with friends, family, or classmates and help build a stronger response circle before the next urgent request arrives.
          </div>
          <button className="lifedrop-slide-up lifedrop-slide-delay-3" onClick={shareReferral} style={referralButtonStyle}>
            <Share2 size={16} /> Save a life, refer someone
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
          {[
            { icon: '🏥', label: 'Safe donation completed' },
            { icon: '✅', label: 'Verified hospital' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 14 }}>{s.icon}</span>
              <span style={{ fontSize: 10, color: '#aaa', fontWeight: 700 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const cardStyle = {
  background: 'white',
  borderRadius: 20,
  overflow: 'hidden',
  marginBottom: 14,
  boxShadow: '0 4px 20px rgba(192,57,43,0.1)',
  border: '1px solid #FDECEA',
  padding: '16px 18px',
}

const cooldownCardStyle = {
  background: 'linear-gradient(135deg, #FFF1ED 0%, #FFE3DC 100%)',
  border: '1px solid #F4B9AB',
  borderLeft: '5px solid #D64532',
  borderRadius: 20,
  padding: '16px 18px',
  marginBottom: 14,
  boxShadow: '0 10px 26px rgba(214,69,50,0.14)',
}

const summaryRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 12,
  paddingBottom: 10,
  marginBottom: 10,
  borderBottom: '1px solid #f8eeee',
}

const primaryButtonStyle = {
  width: '100%',
  padding: '14px',
  background: 'linear-gradient(135deg, #B03020, #E05050)',
  color: 'white',
  borderRadius: 22,
  fontWeight: 900,
  fontSize: 16,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
  boxShadow: '0 8px 24px rgba(192,57,43,0.38)',
  marginBottom: 12,
}

const secondaryButtonStyle = {
  width: '100%',
  padding: '12px',
  background: 'white',
  border: '2px solid #FDECEA',
  borderRadius: 18,
  color: '#C0392B',
  fontWeight: 800,
  fontSize: 14,
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  marginBottom: 12,
}

const topIconButtonStyle = {
  background: '#F5F0F0',
  border: 'none',
  width: 38,
  height: 38,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}

const resetButtonStyle = {
  background: '#FFF3F3',
  border: '1px solid #F6D6D6',
  color: '#B03020',
  borderRadius: 999,
  padding: '0 14px',
  minHeight: 38,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
  fontSize: 12,
  fontWeight: 800,
  cursor: 'pointer',
  fontFamily: 'Nunito, sans-serif',
}

const referralCardStyle = {
  background: 'linear-gradient(135deg, #FFF7F3 0%, #FFFFFF 100%)',
  border: '1px solid #F4DDD7',
  borderRadius: 20,
  padding: '16px 16px 14px',
  marginBottom: 16,
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

function createCertificateHtml({ donorName, bloodGroup, donationDate, hospitalName, certificateId }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LifeDrop Donation Certificate</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        background: linear-gradient(135deg, #f7e6e3 0%, #fff8f6 100%);
        color: #3b1f1a;
        padding: 32px;
        min-height: 100vh;
        overflow-y: auto;
      }
      .certificate {
        max-width: 980px;
        margin: 0 auto;
        background: #fffdfc;
        border: 14px solid #b03020;
        border-radius: 28px;
        padding: 44px 48px;
        box-shadow: 0 24px 60px rgba(176, 48, 32, 0.16);
        position: relative;
        overflow: hidden;
      }
      .certificate::before,
      .certificate::after {
        content: "";
        position: absolute;
        border-radius: 50%;
        background: rgba(176, 48, 32, 0.06);
      }
      .certificate::before {
        width: 220px;
        height: 220px;
        top: -70px;
        right: -70px;
      }
      .certificate::after {
        width: 180px;
        height: 180px;
        left: -50px;
        bottom: -50px;
      }
      .top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 20px;
        margin-bottom: 30px;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .drop {
        width: 58px;
        height: 58px;
        border-radius: 18px;
        background: linear-gradient(135deg, #b03020, #e05050);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: 700;
      }
      .brand h1 {
        margin: 0;
        font-size: 34px;
        color: #b03020;
      }
      .brand p {
        margin: 4px 0 0;
        font-family: Arial, sans-serif;
        font-size: 13px;
        color: #8b6b66;
      }
      .badge {
        border: 1px solid #efc4bd;
        background: #fff1ed;
        color: #a12a20;
        border-radius: 999px;
        padding: 10px 14px;
        font: 700 12px Arial, sans-serif;
        letter-spacing: 0.4px;
        text-transform: uppercase;
      }
      .title {
        text-align: center;
        margin: 30px 0 12px;
      }
      .title h2 {
        margin: 0;
        font-size: 42px;
        color: #7f1d1d;
      }
      .title p {
        margin: 10px auto 0;
        max-width: 720px;
        font: 500 15px/1.7 Arial, sans-serif;
        color: #7a615c;
      }
      .recipient {
        text-align: center;
        margin: 32px 0 26px;
      }
      .recipient .label {
        font: 700 12px Arial, sans-serif;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        color: #bf7b71;
      }
      .recipient .name {
        margin-top: 10px;
        font-size: 40px;
        color: #b03020;
        font-weight: 700;
      }
      .recipient .message {
        margin-top: 10px;
        font: 500 16px/1.7 Arial, sans-serif;
        color: #5d4c48;
      }
      .details {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 14px;
        margin: 28px 0 34px;
      }
      .detail {
        background: linear-gradient(180deg, #fff8f6 0%, #fff0ed 100%);
        border: 1px solid #f2d4cd;
        border-radius: 18px;
        padding: 16px 14px;
      }
      .detail .k {
        font: 700 11px Arial, sans-serif;
        letter-spacing: 0.8px;
        text-transform: uppercase;
        color: #bf7b71;
      }
      .detail .v {
        margin-top: 8px;
        font-size: 18px;
        font-weight: 700;
        color: #4b2620;
      }
      .impact {
        margin: 0 auto 30px;
        max-width: 760px;
        text-align: center;
        padding: 20px 22px;
        border: 1px dashed #d8968a;
        border-radius: 20px;
        background: rgba(176, 48, 32, 0.04);
        font: 600 15px/1.8 Arial, sans-serif;
        color: #6a4d47;
      }
      .footer {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        align-items: flex-end;
        margin-top: 34px;
      }
      .signature {
        flex: 1;
        text-align: center;
      }
      .signature .line {
        border-top: 2px solid #d3b4ad;
        margin-bottom: 8px;
      }
      .signature .role {
        font: 700 12px Arial, sans-serif;
        color: #8c6f69;
        text-transform: uppercase;
        letter-spacing: 0.8px;
      }
      .seal {
        width: 122px;
        height: 122px;
        border-radius: 50%;
        border: 4px double #b03020;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #b03020;
        font: 700 12px/1.4 Arial, sans-serif;
        background: rgba(176, 48, 32, 0.03);
      }
      .print-note {
        margin-top: 28px;
        text-align: center;
        font: 500 12px Arial, sans-serif;
        color: #9a807a;
      }
      @media print {
        body { background: white; padding: 0; }
        .certificate { box-shadow: none; border-radius: 0; max-width: none; min-height: 100vh; }
      }
      @media (max-width: 760px) {
        body {
          padding: 14px;
        }
        .certificate {
          padding: 24px 18px;
          border-width: 8px;
          border-radius: 20px;
        }
        .top {
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 22px;
        }
        .title h2 {
          font-size: 30px;
        }
        .recipient .name {
          font-size: 28px;
        }
        .details {
          grid-template-columns: 1fr;
        }
        .footer {
          flex-direction: column;
          align-items: stretch;
        }
        .seal {
          margin: 0 auto;
        }
      }
    </style>
  </head>
  <body>
    <section class="certificate">
      <div class="top">
        <div class="brand">
          <div class="drop">🩸</div>
          <div>
            <h1>LifeDrop</h1>
            <p>Emergency Trust-Protocol for verified blood donation</p>
          </div>
        </div>
        <div class="badge">Verified Donation Record</div>
      </div>

      <div class="title">
        <h2>Certificate of Life-Saving Donation</h2>
        <p>
          This certificate is proudly presented in recognition of a verified blood donation completed through the LifeDrop emergency response network.
        </p>
      </div>

      <div class="recipient">
        <div class="label">Presented To</div>
        <div class="name">${escapeHtml(donorName)}</div>
        <div class="message">
          for responding with compassion, courage, and urgency to support a critical medical need and help save lives in the community.
        </div>
      </div>

      <div class="details">
        <div class="detail">
          <div class="k">Blood Group</div>
          <div class="v">${escapeHtml(bloodGroup)}</div>
        </div>
        <div class="detail">
          <div class="k">Donation Date</div>
          <div class="v">${escapeHtml(donationDate)}</div>
        </div>
        <div class="detail">
          <div class="k">Hospital</div>
          <div class="v">${escapeHtml(hospitalName)}</div>
        </div>
        <div class="detail">
          <div class="k">Certificate ID</div>
          <div class="v">${escapeHtml(certificateId)}</div>
        </div>
      </div>

      <div class="impact">
        Your contribution strengthens a trusted healthcare ecosystem where verified donors, hospitals, and caregivers can respond faster during the most critical moments.
      </div>

      <div class="footer">
        <div class="signature">
          <div class="line"></div>
          <div class="role">LifeDrop Medical Coordinator</div>
        </div>
        <div class="seal">Official<br />LifeDrop<br />Recognition</div>
        <div class="signature">
          <div class="line"></div>
          <div class="role">Hospital Verification Desk</div>
        </div>
      </div>

      <div class="print-note">
        Generated digitally by LifeDrop after a verified donation event.
      </div>
    </section>
  </body>
</html>`
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
