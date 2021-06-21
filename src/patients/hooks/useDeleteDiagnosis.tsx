import { queryCache, useMutation } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import Diagnosis from '../../shared/model/Diagnosis'
import Visit from '../../shared/model/Visit'

const patientRepository = new PatientRepository()

interface DeleteDiagnosisRequest {
  patientId: string
  diagnosis: Diagnosis
}

const deleteDiagnosis = async (request: DeleteDiagnosisRequest) => {
  const patient = await patientRepository.find(request.patientId)
  const visits = JSON.parse(JSON.stringify(patient.visits)) as Visit[]
  const visit = visits.find(({ id }) => id === request.diagnosis.visit)
  if (!visit) {
    throw new Error('Invalid visit id in diagnosis')
  }
  let { diagnoses } = visit
  if (!diagnoses) {
    throw new Error('No diagnosis found')
  }
  const updatedDiagnoses = diagnoses.filter((diagnosis) => diagnosis.id !== request.diagnosis.id)
  diagnoses = updatedDiagnoses
  visit.diagnoses = diagnoses
  await patientRepository.saveOrUpdate({ ...patient, visits })
  return updatedDiagnoses
}

export default function useDeleteDiagnosis() {
  return useMutation(deleteDiagnosis, {
    onSuccess: async (data, variables) => {
      await queryCache.setQueryData(
        ['diagnoses', variables.patientId, variables.diagnosis.visit],
        data,
      )
    },
    throwOnError: true,
  })
}
