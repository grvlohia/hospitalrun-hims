import isEmpty from 'lodash/isEmpty'
import { queryCache, useMutation } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import ImagingTest from '../../shared/model/ImagingTest'
import Visit from '../../shared/model/Visit'
import validateImagingTest from '../util/validate-imagingTest'

interface EditImagingTestRequest {
  patientId: string
  imagingTest: ImagingTest
}

async function editImagingTest(request: EditImagingTestRequest): Promise<ImagingTest[]> {
  const error = validateImagingTest(request.imagingTest)
  if (isEmpty(error)) {
    const patient = await PatientRepository.find(request.patientId)
    const visits = JSON.parse(JSON.stringify(patient.visits)) as Visit[]
    const targetVisit = visits.find((visit) => visit.id === request.imagingTest.visitId)
    if (targetVisit === undefined) {
      const invalidVisitIdError = {
        message: 'Invalid visitId: no such visit for patient',
      }
      throw invalidVisitIdError
    }
    const imagingTests = targetVisit?.imagingTests ? [...targetVisit?.imagingTests] : []

    const updateIndex = imagingTests.findIndex(
      (imagingTest) => imagingTest.id === request.imagingTest.id,
    )
    imagingTests[updateIndex] = { ...request.imagingTest }
    targetVisit.imagingTests = imagingTests
    await PatientRepository.saveOrUpdate({ ...patient, visits })
    return imagingTests
  }
  throw error
}

export default function useEditImagingTest() {
  return useMutation(editImagingTest, {
    onSuccess: async (data, variables) => {
      await queryCache.setQueryData(
        ['imagingTests', variables.patientId, variables.imagingTest.visitId],
        data,
      )
    },
    throwOnError: true,
  })
}
