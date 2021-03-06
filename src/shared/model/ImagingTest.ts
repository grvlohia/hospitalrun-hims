export default interface ImagingTest {
  id: string
  code: string
  patientId: string
  name: string
  description?: string
  visitId: string
  requestedOn: string
  requestedBy: string // will be the currently logged in user's id
  requestedByFullName?: string
  completedOn?: string
  canceledOn?: string
  note?: string
}
