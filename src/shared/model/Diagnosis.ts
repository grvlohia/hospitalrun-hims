export enum DiagnosisStatus {
  Active = 'active',
  Recurrence = 'recurrence',
  Relapse = 'relapse',
  Inactive = 'inactive',
  Remission = 'remission',
  Resolved = 'resolved',
}

export default interface Diagnosis {
  id: string
  name: string
  diagnosisDate: string
  visit: string
  status?: DiagnosisStatus
  note?: string
}
