import AbstractDBModel from './AbstractDBModel'
import Diagnosis from './Diagnosis'
import ImagingTest from './ImagingTest'
import Medicine from './Medicine'

export enum VisitStatus {
  Planned = 'planned',
  Arrived = 'arrived',
  Triaged = 'triaged',
  InProgress = 'in progress',
  OnLeave = 'on leave',
  Finished = 'finished',
  Cancelled = 'cancelled',
}

export default interface Visit extends AbstractDBModel {
  id: string
  createdAt: string
  updatedAt: string
  startDateTime: string
  endDateTime: string
  type: string
  status: VisitStatus
  reason: string
  location: string
  diagnoses?: Diagnosis[]
  medications?: Medicine[]
  imagingTests?: ImagingTest[]
}
