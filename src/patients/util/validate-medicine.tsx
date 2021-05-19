import Medicine from '../../shared/model/Medicine'

interface AddMedicineError {
  message?: string
  name?: string
  principalSalt?: string
  startDateTime?: string
  endDateTime?: string
  dosage?: string
}

export class MedicineError extends Error {
  nameError?: string

  constructor(message: string, name: string) {
    super(message)
    this.nameError = name
    Object.setPrototypeOf(this, MedicineError.prototype)
  }
}

export default function validateMedicine(medicine: Partial<Medicine>) {
  const error: AddMedicineError = {}

  if (!medicine.name) {
    error.name = 'Medicine Name is required'
  }

  if (!medicine.principalSalt) {
    error.principalSalt = 'Principal Salt is required'
  }

  if (!medicine.startDateTime) {
    error.startDateTime = 'Start Date is required'
  }

  if (!medicine.endDateTime) {
    error.endDateTime = 'End Date is required'
  }

  if (!medicine.dosage) {
    error.dosage = 'Dosage directions are required'
  }
  return error
}
