import isEmpty from 'lodash/isEmpty'
import { queryCache, useMutation } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import Medicine from '../../shared/model/Medicine'
import Visit from '../../shared/model/Visit'
import validateMedicine from '../util/validate-medicine'

interface EditMedicineRequest {
  patientId: string
  medicine: Medicine
}

async function editMedicine(request: EditMedicineRequest): Promise<Medicine[]> {
  const error = validateMedicine(request.medicine)
  if (isEmpty(error)) {
    const patient = await PatientRepository.find(request.patientId)
    const visits = JSON.parse(JSON.stringify(patient.visits)) as Visit[]
    const targetVisit = visits.find((visit) => visit.id === request.medicine.visitId)
    if (targetVisit === undefined) {
      const invalidVisitIdError = {
        message: 'Invalid visitId: no such visit for patient',
      }
      throw invalidVisitIdError
    }
    const medications = targetVisit?.medications ? [...targetVisit?.medications] : []
    const updateIndex = medications.findIndex((medicine) => medicine.id === request.medicine.id)
    medications[updateIndex] = { ...request.medicine }
    targetVisit.medications = medications
    await PatientRepository.saveOrUpdate({ ...patient, visits })
    return medications
  }
  throw error
}

export default function useEditPatientMedicine() {
  return useMutation(editMedicine, {
    onSuccess: async (data, variables) => {
      await queryCache.setQueryData(
        ['medications', variables.patientId, variables.medicine.visitId],
        data,
      )
    },
    throwOnError: true,
  })
}
