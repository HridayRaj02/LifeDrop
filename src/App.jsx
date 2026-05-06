import { useState } from 'react'
import SplashScreen from './screens/SplashScreen'
import RoleSelection from './screens/RoleSelection'
import Dashboard from './screens/Dashboard'
import EmergencyList from './screens/EmergencyList'
import RequestDetails from './screens/RequestDetails'
import DonationInProgress from './screens/DonationInProgress'
import DonationComplete from './screens/DonationComplete'
import DonorLogin from './screens/DonorLogin'
import DonorVerification from './screens/DonorVerification'
import DoctorAccess from './screens/DoctorAccess'
import DoctorDashboard from './screens/DoctorDashboard'
import BottomNav from './components/BottomNav'
import { DEFAULT_REQUESTS } from './data/defaultRequests'
import { getTodayIsoDate } from './utils/bloodCompatibility'

const donorNavItems = [
  { id: 'home', label: 'Home', screen: 'dashboard' },
  { id: 'requests', label: 'Requests', screen: 'emergency' },
  { id: 'donate', label: 'Donate', screen: 'details' },
  { id: 'profile', label: 'Profile', screen: 'dashboard' },
]

const donorNavByScreen = {
  dashboard: 'home',
  emergency: 'requests',
  details: 'donate',
}

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [selectedBlood, setSelectedBlood] = useState(null)
  const [selectedRequest, setSelectedRequest] = useState(DEFAULT_REQUESTS[0])
  const [userRole, setUserRole] = useState(null)
  const [donorProfile, setDonorProfile] = useState(null)
  const [doctorProfile, setDoctorProfile] = useState(null)
  const [requests, setRequests] = useState(DEFAULT_REQUESTS)
  const [donationApplications, setDonationApplications] = useState([])

  const navigate = (nextScreen, payload = null) => {
    if (typeof payload === 'string') {
      setSelectedBlood(payload)
    } else if (payload && typeof payload === 'object') {
      setSelectedRequest(payload)
      setSelectedBlood(payload.blood || null)
    }
    setScreen(nextScreen)
  }

  const handleRoleSelect = (role) => {
    setUserRole(role)
    setScreen(role === 'donor' ? 'donor-login' : 'doctor-access')
  }

  const handleDonorLoginContinue = () => {
    setScreen('donor-verify')
  }

  const handleDonorVerificationComplete = (profile) => {
    setDonorProfile(profile)
    setScreen('dashboard')
  }

  const handleDoctorAccessGranted = (profile) => {
    setDoctorProfile(profile)
    setScreen('doctor-dashboard')
  }

  const handleDoctorRequestCreate = (draft) => {
    const nextRequest = {
      id: `req-${Date.now()}`,
      blood: draft.blood,
      title: `Blood group ${draft.blood}`,
      hospital: doctorProfile?.hospitalName || 'LifeDrop Partner Hospital',
      dist: draft.distance || '1.8 km',
      urgency: draft.urgency,
      time: 'Just now',
      units: Number(draft.units) || 1,
      address: doctorProfile?.hospitalAddress || 'Emergency Wing, City Hospital',
      caseId: draft.caseId,
      department: draft.department,
      requestedBy: doctorProfile?.role || 'Doctor',
      note: draft.note,
      patientFileNumber: draft.patientFileNumber,
    }

    setRequests((current) => [nextRequest, ...current])
    setSelectedRequest(nextRequest)
    setSelectedBlood(nextRequest.blood)
  }

  const handleDoctorRequestDelete = (requestId) => {
    setRequests((current) => {
      const nextRequests = current.filter((request) => request.id !== requestId)

      if (selectedRequest?.id === requestId) {
        const fallbackRequest = nextRequests[0] || null
        setSelectedRequest(fallbackRequest)
        setSelectedBlood(fallbackRequest?.blood || null)
      }

      return nextRequests
    })

    setDonationApplications((current) =>
      current.filter((application) => application.requestId !== requestId),
    )
  }

  const handleDonationComplete = () => {
    setDonorProfile((current) => (
      current
        ? { ...current, lastDonationDate: getTodayIsoDate() }
        : current
    ))
    setScreen('complete')
  }

  const submitDonationIntent = (request) => {
    if (!donorProfile || !request) return

    setDonationApplications((current) => {
      const existing = current.find(
        (application) =>
          application.requestId === request.id &&
          application.donorEmail === donorProfile.email,
      )

      if (existing) {
        return current.map((application) =>
          application.id === existing.id
            ? {
                ...application,
                status: application.status === 'rejected' ? 'pending' : application.status,
                updatedAt: new Date().toISOString(),
              }
            : application,
        )
      }

      return [
        {
          id: `app-${Date.now()}`,
          requestId: request.id,
          requestBlood: request.blood,
          requestHospital: request.hospital,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          donorName: donorProfile.fullName,
          donorEmail: donorProfile.email,
          donorMobile: donorProfile.mobile,
          donorBloodGroup: donorProfile.bloodGroup,
          donorWeight: donorProfile.weight,
          donorLastDonationDate: donorProfile.lastDonationDate,
          donorConditions: donorProfile.conditions,
          donorMedications: donorProfile.medications,
          donorTravelHistory: donorProfile.travelHistory,
          donorProcedures: donorProfile.procedures,
        },
        ...current,
      ]
    })
  }

  const reviewDonationApplication = (applicationId, status) => {
    setDonationApplications((current) =>
      current.map((application) =>
        application.id === applicationId
          ? { ...application, status, updatedAt: new Date().toISOString() }
          : application,
      ),
    )
  }

  const resetDemo = () => {
    setScreen('splash')
    setSelectedBlood(null)
    setSelectedRequest(DEFAULT_REQUESTS[0])
    setUserRole(null)
    setDonorProfile(null)
    setDoctorProfile(null)
    setRequests(DEFAULT_REQUESTS)
    setDonationApplications([])
  }

  const donorActiveNav = donorNavByScreen[screen] ?? null
  const donorShowNav = userRole === 'donor' && ['dashboard', 'emergency', 'details'].includes(screen)
  const showDualPreview = ['dashboard', 'emergency', 'details', 'progress', 'complete', 'doctor-dashboard'].includes(screen)

  const renderSinglePhone = () => {
    if (screen === 'splash') return <SplashScreen onStart={() => setScreen('role')} />
    if (screen === 'role') {
      return (
        <RoleSelection
          onDoctorSelect={() => handleRoleSelect('doctor')}
          onDonorSelect={() => handleRoleSelect('donor')}
        />
      )
    }
    if (screen === 'donor-login') return <DonorLogin navigate={navigate} onContinue={handleDonorLoginContinue} />
    if (screen === 'donor-verify') return <DonorVerification navigate={navigate} onComplete={handleDonorVerificationComplete} />
    if (screen === 'doctor-access') return <DoctorAccess navigate={navigate} onComplete={handleDoctorAccessGranted} />
    return null
  }

  const renderDonorPrimary = () => {
    if (screen === 'donor-login') return <DonorLogin navigate={navigate} onContinue={handleDonorLoginContinue} />
    if (screen === 'donor-verify') return <DonorVerification navigate={navigate} onComplete={handleDonorVerificationComplete} />
    if (screen === 'dashboard') return <Dashboard navigate={navigate} requests={requests} donorProfile={donorProfile} />
    if (screen === 'emergency') return <EmergencyList navigate={navigate} donorProfile={donorProfile} requests={requests} />
    if (screen === 'details') {
      return (
        <RequestDetails
          navigate={navigate}
          selectedBlood={selectedBlood}
          selectedRequest={selectedRequest}
          donorProfile={donorProfile}
          donationApplications={donationApplications}
          onSubmitDonationIntent={submitDonationIntent}
        />
      )
    }
    if (screen === 'progress') {
      return (
        <DonationInProgress
          navigate={navigate}
          selectedBlood={selectedBlood}
          onDonationComplete={handleDonationComplete}
        />
      )
    }
    if (screen === 'complete') {
      return (
        <DonationComplete
          navigate={navigate}
          selectedBlood={selectedBlood}
          donorProfile={donorProfile}
          onReset={resetDemo}
        />
      )
    }
    return <Dashboard navigate={navigate} requests={requests} donorProfile={donorProfile} />
  }

  const renderDoctorPrimary = () => {
    if (screen === 'doctor-access') return <DoctorAccess navigate={navigate} onComplete={handleDoctorAccessGranted} />
    return (
        <DoctorDashboard
          doctorProfile={doctorProfile}
          requests={requests}
          donationApplications={donationApplications}
          onCreateRequest={handleDoctorRequestCreate}
          onOpenRequest={(request) => navigate('details', request)}
          onReviewDonationApplication={reviewDonationApplication}
          onDeleteRequest={handleDoctorRequestDelete}
        />
    )
  }

  const renderDonorPreview = () => (
    <EmergencyList
      navigate={navigate}
      donorProfile={donorProfile}
      requests={requests}
    />
  )

  const renderDoctorPreview = () => (
    <DoctorDashboard
      doctorProfile={doctorProfile || {
        role: 'ER In-charge',
        hospitalName: 'City Hospital',
        securityPin: '2048',
      }}
      requests={requests}
      donationApplications={donationApplications}
      onCreateRequest={handleDoctorRequestCreate}
      onOpenRequest={() => {}}
      onReviewDonationApplication={reviewDonationApplication}
      onDeleteRequest={handleDoctorRequestDelete}
    />
  )

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        background:
          userRole === 'doctor'
            ? 'radial-gradient(circle at top, rgba(61,140,255,0.2), transparent 28%), linear-gradient(135deg, #0B1B33 0%, #0F2747 45%, #153A66 100%)'
            : 'radial-gradient(circle at top, rgba(232,93,93,0.18), transparent 24%), linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: 'white', letterSpacing: 2 }}>
            Life<span style={{ color: userRole === 'doctor' ? '#77B8FF' : '#E85D5D' }}>Drop</span>
          </div>
          <div style={{ fontSize: 11, color: userRole === 'doctor' ? '#A7C6E9' : '#8899bb', marginTop: 4 }}>
            {userRole === 'doctor'
              ? 'Dual preview: doctor control + donor visibility'
              : userRole === 'donor'
                ? 'Dual preview: donor journey + doctor control'
                : 'Choose your role to enter the platform'}
          </div>
        </div>

        {!showDualPreview ? (
          <PhoneShell
            title={
              screen === 'doctor-access'
                ? 'Doctor Portal'
                : screen === 'donor-login' || screen === 'donor-verify'
                  ? 'Donor App'
                  : 'LifeDrop Intro'
            }
            accent={screen === 'doctor-access' ? '#60A5FA' : '#E85D5D'}
          >
            {renderSinglePhone()}
          </PhoneShell>
        ) : (
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
            {userRole === 'doctor' ? (
              <>
                <PhoneShell title="Doctor Portal" accent="#60A5FA">
                  {renderDoctorPrimary()}
                </PhoneShell>
                <PhoneShell title="Donor View Preview" accent="#E85D5D">
                  {renderDonorPreview()}
                </PhoneShell>
              </>
            ) : (
              <>
                <PhoneShell title="Donor App" accent="#E85D5D" footer={donorShowNav ? <BottomNav activeNav={donorActiveNav} navItems={donorNavItems} onNav={(item) => navigate(item.screen)} /> : null}>
                  {renderDonorPrimary()}
                </PhoneShell>
                <PhoneShell title="Doctor Portal Preview" accent="#60A5FA">
                  {renderDoctorPreview()}
                </PhoneShell>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function PhoneShell({ title, accent, children, footer = null }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', color: 'white' }}>
        {title}
      </div>

      <div style={{ position: 'relative', width: 375 }}>
        <div style={{ position: 'absolute', right: -14, top: 120, width: 4, height: 60, background: '#222', borderRadius: '0 3px 3px 0' }} />
        <div style={{ position: 'absolute', left: -14, top: 90, width: 4, height: 35, background: '#222', borderRadius: '3px 0 0 3px' }} />
        <div style={{ position: 'absolute', left: -14, top: 140, width: 4, height: 35, background: '#222', borderRadius: '3px 0 0 3px' }} />

        <div
          style={{
            width: 375,
            height: 812,
            border: '12px solid #111',
            borderRadius: 45,
            boxShadow: '0 0 0 2px #333, 0 50px 100px rgba(0,0,0,0.9), inset 0 0 0 1px #444',
            overflow: 'hidden',
            position: 'relative',
            background: '#F9F0F0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 120,
              height: 25,
              background: '#111',
              borderRadius: '0 0 16px 16px',
              zIndex: 200,
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 25,
              minHeight: 0,
            }}
          >
            <div style={{ height: 3, background: accent, flexShrink: 0 }} />
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {children}
            </div>
            {footer}
          </div>
        </div>
      </div>
    </div>
  )
}
