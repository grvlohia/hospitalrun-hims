import { useQuery } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import ImagingTest from '../../shared/model/ImagingTest'

async function fetchImagingTests(
  _: string,
  patientId: string,
  visitId: string,
): Promise<ImagingTest[] | undefined> {
  const { visits } = await PatientRepository.find(patientId)
  const targetVisit = visits.find(({ id }) => id === visitId) || undefined
  return targetVisit && targetVisit.imagingTests ? targetVisit.imagingTests : []
}

export default function usePatientImagingTests(patientId: string, visitId: string) {
  return useQuery(['imagingTests', patientId, visitId], fetchImagingTests)
}
