import { queryCache, useMutation } from 'react-query'

import PatientRepository from '../../shared/db/PatientRepository'
import ImagingTest from '../../shared/model/ImagingTest'
import Visit from '../../shared/model/Visit'

interface DeleteImagingTestRequest {
  patientId: string
  imagingTest: ImagingTest
}

const deleteImagingTest = async (request: DeleteImagingTestRequest) => {
  const patient = await PatientRepository.find(request.patientId)
  const visits = JSON.parse(JSON.stringify(patient.visits)) as Visit[]
  const visit = visits.find(({ id }) => id === request.imagingTest.visitId)
  if (!visit) {
    throw new Error('Invalid visit id in medicine')
  }
  let { imagingTests } = visit
  if (!imagingTests) {
    throw new Error('No medications found')
  }
  imagingTests = imagingTests.filter((imagingTest) => imagingTest.id !== request.imagingTest.id)
  visit.imagingTests = imagingTests
  await PatientRepository.saveOrUpdate({ ...patient, visits })
  return imagingTests
}

export default function useDeletePatientImagingTest() {
  return useMutation(deleteImagingTest, {
    onSuccess: async (data, variables) => {
      await queryCache.setQueryData(
        ['imagingTests', variables.patientId, variables.imagingTest.visitId],
        data,
      )
    },
    throwOnError: true,
  })
}
