import isEmpty from 'lodash/isEmpty'
import { queryCache, useMutation } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import Medicine from '../../shared/model/Medicine'
import Visit from '../../shared/model/Visit'
import { uuid } from '../../shared/util/uuid'
import validateMedicine from '../util/validate-medicine'

interface AddMedicineRequest {
  patientId: string
  medicine: Omit<Medicine, 'id'>
}

async function addMedicine(request: AddMedicineRequest): Promise<Medicine[]> {
  const error = validateMedicine(request.medicine)
  if (isEmpty(error)) {
    const patient = await PatientRepository.find(request.patientId)
    // const diagnoses = patient.diagnoses ? [...patient.diagnoses] : []
    const visits = JSON.parse(JSON.stringify(patient.visits)) as Visit[]
    const targetVisit = visits.find((visit) => visit.id === request.medicine.visitId)
    if (targetVisit === undefined) {
      const invalidVisitIdError = {
        message: 'Invalid visitId: no such visit for patient',
      }
      throw invalidVisitIdError
    }
    const medications = targetVisit?.medications ? [...targetVisit?.medications] : []
    const newMedicine: Medicine = {
      id: uuid(),
      ...request.medicine,
    }
    medications.push(newMedicine)
    targetVisit.medications = medications
    await PatientRepository.saveOrUpdate({ ...patient, visits })
    return medications
  }
  throw error
}

export default function useAddPatientMedicine() {
  return useMutation(addMedicine, {
    onSuccess: async (data, variables) => {
      await queryCache.setQueryData(['medicines', variables.patientId], data)
    },
    throwOnError: true,
  })
}
