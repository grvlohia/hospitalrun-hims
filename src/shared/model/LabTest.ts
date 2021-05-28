export enum LabTestStatus {
  Requested = 'requested',
  Completed = 'completed',
  Canceled = 'canceled',
}

export default interface LabTest {
  id: string
  code: string // L-<code>
  patientId: string
  name: string // name of the test. e.g. X-Ray
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
