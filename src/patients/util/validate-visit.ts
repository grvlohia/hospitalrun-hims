import Visit from '../../shared/model/Visit'

interface AddVisitError {
  message?: string
  startDateTime?: string
}

export class VisitError extends Error {
  nameError?: string

  constructor(message: string, name: string) {
    super(message)
    this.nameError = name
    Object.setPrototypeOf(this, VisitError.prototype)
  }
}

export default function validateVisit(visit: Partial<Visit>) {
  const error: AddVisitError = {}

  if (!visit.startDateTime) {
    error.startDateTime = 'patient.visits.error.startDateRequired'
  }

  return error
}
