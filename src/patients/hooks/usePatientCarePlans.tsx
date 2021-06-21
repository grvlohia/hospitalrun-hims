import { useQuery } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import CarePlan from '../../shared/model/CarePlan'

const patientRepository = new PatientRepository()

async function fetchPatientCarePlans(_: string, patientId: string): Promise<CarePlan[]> {
  const patient = await patientRepository.find(patientId)
  return patient.carePlans || []
}

export default function usePatientCarePlans(patientId: string) {
  return useQuery(['care-plans', patientId], fetchPatientCarePlans)
}
