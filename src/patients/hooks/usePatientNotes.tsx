import { useQuery } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import Note from '../../shared/model/Note'

const patientRepository = new PatientRepository()

async function fetchPatientNotes(_: string, patientId: string): Promise<Note[]> {
  const patient = await patientRepository.find(patientId)
  return patient.notes || []
}

export default function usePatientNotes(patientId: string) {
  return useQuery(['notes', patientId], fetchPatientNotes)
}
