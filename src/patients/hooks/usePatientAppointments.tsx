import { useQuery } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import Appointments from '../../shared/model/Appointment'

const patientRepository = new PatientRepository()

async function fetchPatientAppointments(_: string, patientId: string): Promise<Appointments[]> {
  return patientRepository.getAppointments(patientId)
}

export default function usePatientsAppointments(patientId: string) {
  return useQuery(['appointments', patientId], fetchPatientAppointments)
}
