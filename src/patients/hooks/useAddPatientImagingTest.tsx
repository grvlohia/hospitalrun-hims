import isEmpty from 'lodash/isEmpty'
import { queryCache, useMutation } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import ImagingTest from '../../shared/model/ImagingTest'
import Visit from '../../shared/model/Visit'
import generateCode from '../../shared/util/generateCode'
import { uuid } from '../../shared/util/uuid'
import validateImagingTest from '../util/validate-imagingTest'

interface AddImagingTestRequest {
  patientId: string
  imagingTest: Omit<Omit<ImagingTest, 'id'>, 'code'>
}

async function addImagingTest(request: AddImagingTestRequest): Promise<ImagingTest[]> {
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
    const newImagingTest: ImagingTest = {
      ...request.imagingTest,
      id: uuid(),
      code: generateCode('I'),
    }
    imagingTests.push(newImagingTest)
    targetVisit.imagingTests = imagingTests
    await PatientRepository.saveOrUpdate({ ...patient, visits })
    return imagingTests
  }
  throw error
}

export default function useAddImagingTest() {
  return useMutation(addImagingTest, {
    onSuccess: async (data, variables) => {
      await queryCache.setQueryData(
        ['imagingTests', variables.patientId, variables.imagingTest.visitId],
        data,
      )
    },
    throwOnError: true,
  })
}
