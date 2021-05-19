import AbstractDBModel from './AbstractDBModel'
import Allergy from './Allergy'
import CareGoal from './CareGoal'
import CarePlan from './CarePlan'
import ContactInformation from './ContactInformation'
import Diagnosis from './Diagnosis'
import Name from './Name'
import Note from './Note'
import RelatedPerson from './RelatedPerson'
import Visit from './Visit'

export default interface Patient extends AbstractDBModel, Name, ContactInformation {
  code: string
  type?: string
  sex: string
  dateOfBirth: string
  isApproximateDateOfBirth: boolean
  index: string
  preferredLanguage?: string
  occupation?: string
  relatedPersons?: RelatedPerson[]
  allergies?: Allergy[]
  notes?: Note[]
  carePlans: CarePlan[]
  careGoals: CareGoal[]
  bloodType: string
  visits: Visit[]
  diagnoses?: Diagnosis[]
}
