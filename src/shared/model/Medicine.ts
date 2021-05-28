export default interface Medicine {
  id: string
  visitId: string
  name: string
  type: string
  concentration: number | undefined
  dose: number | undefined
  days: number | undefined
  comment?: string
  prescribedBy?: string
}
