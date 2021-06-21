import { useQuery } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import Allergy from '../../shared/model/Allergy'

const patientRepository = new PatientRepository()

async function fetchPatientAllergies(_: string, patientId: string): Promise<Allergy[]> {
  const patient = await patientRepository.find(patientId)
  return patient.allergies || []
}

export default function usePatientAllergies(patientId: string) {
  return useQuery(['allergies', patientId], fetchPatientAllergies)
}
