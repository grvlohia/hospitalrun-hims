import PatientCondition from '../../shared/model/PatientCondition'

export interface PatientConditionError {
  message?: string
  complaints?: string
}

export default function validatePatientCondition(condition: Partial<PatientCondition>) {
  const error: PatientConditionError = {}
  if (condition.complaints === '') {
    error.complaints = 'Patient Complaints are required'
  }
  return error
}
