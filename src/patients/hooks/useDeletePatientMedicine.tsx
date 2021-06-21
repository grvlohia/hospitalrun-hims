import { queryCache, useMutation } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import Medicine from '../../shared/model/Medicine'
import Visit from '../../shared/model/Visit'

const patientRepository = new PatientRepository()

interface DeleteMedicineRequest {
  patientId: string
  medicine: Medicine
}

const deleteMedicine = async (request: DeleteMedicineRequest) => {
  const patient = await patientRepository.find(request.patientId)
  const visits = JSON.parse(JSON.stringify(patient.visits)) as Visit[]
  const visit = visits.find(({ id }) => id === request.medicine.visitId)
  if (!visit) {
    throw new Error('Invalid visit id in medicine')
  }
  let { medications } = visit
  if (!medications) {
    throw new Error('No medications found')
  }
  medications = medications.filter((medicine) => medicine.id !== request.medicine.id)
  visit.medications = medications
  await patientRepository.saveOrUpdate({ ...patient, visits })
  return medications
}

export default function useDeletePatientMedicine() {
  return useMutation(deleteMedicine, {
    onSuccess: async (data, variables) => {
      await queryCache.setQueryData(
        ['medications', variables.patientId, variables.medicine.visitId],
        data,
      )
    },
    throwOnError: true,
  })
}
