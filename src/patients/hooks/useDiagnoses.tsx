import { useQuery } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import Diagnosis from '../../shared/model/Diagnosis'

const patientRepository = new PatientRepository()

async function fetchDiagnoses(
  _: string,
  patientId: string,
  visitId: string,
): Promise<Diagnosis[] | undefined> {
  const { visits } = await patientRepository.find(patientId)
  const targetVisit = visits.find(({ id }) => id === visitId) || undefined
  return targetVisit && targetVisit.diagnoses ? targetVisit.diagnoses : []
}

export default function useDiagnoses(patientId: string, visitId: string) {
  return useQuery(['diagnoses', patientId, visitId], fetchDiagnoses)
}
