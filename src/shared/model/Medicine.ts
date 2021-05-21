export default interface Medicine {
  id: string
  visitId: string
  patientCode: string
  name: string
  principalSalt: string
  startDateTime: string
  endDateTime: string
  dosage: string
  prescribedBy: string
  note: string
}
