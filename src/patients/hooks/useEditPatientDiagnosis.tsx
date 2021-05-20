import isEmpty from 'lodash/isEmpty'
import { queryCache, useMutation } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import Diagnosis from '../../shared/model/Diagnosis'
import Visit from '../../shared/model/Visit'
import validateDiagnosis from '../util/validate-diagnosis'

interface AddDiagnosisRequest {
  patientId: string
  diagnosis: Diagnosis
}

async function addDiagnosis(request: AddDiagnosisRequest): Promise<Diagnosis[]> {
  const error = validateDiagnosis(request.diagnosis)
  if (isEmpty(error)) {
    const patient = await PatientRepository.find(request.patientId)
    const visits = JSON.parse(JSON.stringify(patient.visits)) as Visit[]
    const targetVisit = visits.find((visit) => visit.id === request.diagnosis.visit)
    if (targetVisit === undefined) {
      throw new Error('Invalid visitId: no such visit for patient')
    }
    const diagnoses = targetVisit?.diagnoses ? [...targetVisit?.diagnoses] : []
    const updateIndex = diagnoses.findIndex((diagnosis) => diagnosis.id === request.diagnosis.id)
    diagnoses[updateIndex] = { ...request.diagnosis }
    targetVisit.diagnoses = diagnoses
    await PatientRepository.saveOrUpdate({ ...patient, visits })
    return diagnoses
  }
  throw error
}

export default function useEditPatientDiagnosis() {
  return useMutation(addDiagnosis, {
    onSuccess: async (data, variables) => {
      await queryCache.setQueryData(
        ['diagnoses', variables.patientId, variables.diagnosis.visit],
        data,
      )
    },
    throwOnError: true,
  })
}
