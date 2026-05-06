const donorCompatibility = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
}

const DONATION_WAIT_DAYS = 56
const DAY_MS = 24 * 60 * 60 * 1000

export function canDonateToRecipient(donorBloodGroup, recipientBloodGroup) {
  if (!donorBloodGroup || !recipientBloodGroup) return true
  return (donorCompatibility[donorBloodGroup] || []).includes(recipientBloodGroup)
}

export function getCooldownStatus(lastDonationDate) {
  if (!lastDonationDate) {
    return {
      isCoolingDown: false,
      daysRemaining: 0,
      nextEligibleDate: null,
    }
  }

  const lastDonation = new Date(lastDonationDate)
  const nextEligibleDate = new Date(lastDonation.getTime() + DONATION_WAIT_DAYS * DAY_MS)
  const now = new Date()
  const diffMs = nextEligibleDate.getTime() - now.getTime()
  const daysRemaining = Math.max(0, Math.ceil(diffMs / DAY_MS))

  return {
    isCoolingDown: daysRemaining > 0,
    daysRemaining,
    nextEligibleDate,
  }
}

export function getDonationEligibility(donorProfile, recipientBloodGroup) {
  const donorBloodGroup = donorProfile?.bloodGroup
  const compatibilityAllowed = canDonateToRecipient(donorBloodGroup, recipientBloodGroup)
  const cooldown = getCooldownStatus(donorProfile?.lastDonationDate)

  if (!compatibilityAllowed) {
    return {
      allowed: false,
      reason: 'blood_mismatch',
      message: `You can't donate this blood`,
      ...cooldown,
    }
  }

  if (cooldown.isCoolingDown) {
    return {
      allowed: false,
      reason: 'cooldown',
      message: `Available in ${cooldown.daysRemaining} day${cooldown.daysRemaining === 1 ? '' : 's'}`,
      ...cooldown,
    }
  }

  return {
    allowed: true,
    reason: 'eligible',
    message: 'Eligible to donate',
    ...cooldown,
  }
}

export function formatDisplayDate(date) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}
