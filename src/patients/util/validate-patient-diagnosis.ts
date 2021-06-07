import Diagnosis from '../../shared/model/Diagnosis'

export interface DiagnosisError {
  message?: string
  name?: string
  diagnosisDate?: string
}

export default function validatePatientDiagnosis(diagnosis: Partial<Diagnosis>) {
  const error: DiagnosisError = {}
  if (!diagnosis.name) {
    error.name = 'Diagnosis name is required'
  }
  if (!diagnosis.diagnosisDate) {
    error.diagnosisDate = 'Diagnosis date cannot be empty'
  }
  return error
}
