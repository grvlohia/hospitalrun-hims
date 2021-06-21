import { useQuery } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import Lab from '../../shared/model/Lab'

const patientRepository = new PatientRepository()

async function fetchPatientLabs(_: string, patientId: string): Promise<Lab[]> {
  const fetchedLabs = await patientRepository.getLabs(patientId)
  return fetchedLabs || []
}

export default function usePatientLabs(patientId: string) {
  return useQuery(['labs', patientId], fetchPatientLabs)
}
