import { useQuery } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import Medicine from '../../shared/model/Medicine'

const patientRepository = new PatientRepository()

async function fetchMedicines(
  _: string,
  patientId: string,
  visitId: string,
): Promise<Medicine[] | undefined> {
  const { visits } = await patientRepository.find(patientId)
  const targetVisit = visits.find(({ id }) => id === visitId) || undefined
  return targetVisit && targetVisit.medications ? targetVisit.medications : []
}

export default function usePatientMedicines(patientId: string, visitId: string) {
  return useQuery(['medications', patientId, visitId], fetchMedicines)
}
