import { useQuery } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import Visit from '../../shared/model/Visit'

const patientRepository = new PatientRepository()

async function fetchPatientVisits(_: string, patientId: string): Promise<Visit[]> {
  const patient = await patientRepository.find(patientId)
  return patient.visits || []
}

export default function usePatientVisits(patientId: string) {
  return useQuery(['visits', patientId], fetchPatientVisits)
}
