export enum LabTestStatus {
  Requested = 'requested',
  Completed = 'completed',
  Canceled = 'canceled',
}

export default interface LabTest {
  id: string
  code: string
  patientId: string
  name: string
  description?: string
  status: LabTestStatus
  visitId: string
  requestedOn: string
  requestedBy: string // will be the currently logged in user's id
  requestedByFullName?: string
  completedOn?: string
  canceledOn?: string
  note?: string
}
