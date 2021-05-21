export enum ImagingTestStatus {
  Requested = 'requested',
  Completed = 'completed',
  Canceled = 'canceled',
}

export default interface ImagingTest {
  id: string
  code: string
  patient: string
  fullName: string
  type: string
  status: ImagingTestStatus
  visitId: string
  requestedOn: string
  requestedBy: string // will be the currently logged in user's id
  requestedByFullName?: string
  completedOn?: string
  canceledOn?: string
  note?: string
}
