import AbstractDBModel from './AbstractDBModel'
import Allergy from './Allergy'
import CareGoal from './CareGoal'
import CarePlan from './CarePlan'
import ContactInformation from './ContactInformation'
// import Diagnosis from './Diagnosis'
import Name from './Name'
import Note from './Note'
import RelatedPerson from './RelatedPerson'
import Visit from './Visit'

interface History {
  condition: string
  id: string
}

export default interface Patient extends AbstractDBModel, Name, ContactInformation {
  code: string // unique patient code for internal use
  type?: string // regular or covered under a program like ayushman
  sex: string
  dateOfBirth: string
  isApproximateDateOfBirth: boolean // used if patient doesn't know (or does not want to provide) his age
  index: string // used for pouchdb views
  preferredLanguage?: string
  occupation?: string
  relatedPersons?: RelatedPerson[]
  allergies?: Allergy[]
  notes?: Note[]
  carePlans: CarePlan[]
  careGoals: CareGoal[]
  bloodType: string
  visits: Visit[]
  medicalHistory?: History[]
}
