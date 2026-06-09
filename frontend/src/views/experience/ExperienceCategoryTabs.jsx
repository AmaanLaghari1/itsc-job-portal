import { CButton } from '@coreui/react'

export const EXPERIENCE_TYPES = {
  professional: 'professional_academic',
  additional: 'additional',
}

export const EXPERIENCE_TYPE_LABELS = {
  [EXPERIENCE_TYPES.professional]: 'Academic / Professional Experience',
  [EXPERIENCE_TYPES.additional]: 'Additional Experience',
}

export const normalizeExperienceType = (value) => {
  const normalized = String(value || '').toLowerCase()

  if (normalized.includes('additional')) {
    return EXPERIENCE_TYPES.additional
  }

  return EXPERIENCE_TYPES.professional
}

export const getExperienceType = (experience = {}) =>
  normalizeExperienceType(
    experience.IS_ADDITIONAL == 1 ? EXPERIENCE_TYPES.additional : EXPERIENCE_TYPES.professional
  )

const ExperienceCategoryTabs = ({ activeType, onChange }) => (
  <div className="row g-2 mb-3">
    {Object.entries(EXPERIENCE_TYPE_LABELS).map(([type, label]) => (
      <div className="col-sm-3" key={type}>
        <CButton
          color={activeType === type ? 'primary' : 'secondary'}
          variant={activeType === type ? undefined : 'outline'}
          className="w-100 h-100 py-3"
          onClick={() => onChange(type)}
          type="button"
        >
          <span className="fw-bold">{label}</span>
        </CButton>
      </div>
    ))}
  </div>
)

export default ExperienceCategoryTabs
