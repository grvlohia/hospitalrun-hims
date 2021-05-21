import ImagingTest from '../../shared/model/ImagingTest'

interface AddImagingTestError {
  message?: string
  type?: string
  status?: string
  requestedOn?: string
}

export class ImagingTestError extends Error {
  nameError?: string

  constructor(message: string, name: string) {
    super(message)
    this.nameError = name
    Object.setPrototypeOf(this, ImagingTestError.prototype)
  }
}

export default function validateImagingTest(imagingTest: Partial<ImagingTest>) {
  const error: AddImagingTestError = {}

  if (!imagingTest.type) {
    error.type = 'Test type is required'
  }

  if (!imagingTest.requestedOn) {
    error.requestedOn = 'Requested On date is required'
  }

  if (!imagingTest.status) {
    error.status = 'Test status is required'
  }
  return error
}
