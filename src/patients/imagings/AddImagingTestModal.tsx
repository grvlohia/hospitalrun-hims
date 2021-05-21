import { Modal } from '@hospitalrun/components'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import ImagingTest, { ImagingTestStatus } from '../../shared/model/ImagingTest'
import Patient from '../../shared/model/Patient'
import { RootState } from '../../shared/store'
import useAddImagingTest from '../hooks/useAddPatientImagingTest'
import { ImagingTestError } from '../util/validate-imagingTest'
import ImagingTestForm from './ImagingTestForm'

interface NewImagingModalProps {
  patient: Patient
  show: boolean
  onCloseButtonClick: () => void
  visitId: string
}

const AddImagingTestModal = (props: NewImagingModalProps) => {
  const { patient, show, onCloseButtonClick, visitId } = props
  const [addImagingTest] = useAddImagingTest()
  const { user } = useSelector((state: RootState) => state.user)

  const initialImagingTestState = useMemo(
    () => ({
      id: '',
      code: '',
      patient: patient.code,
      fullName: patient.fullName || '',
      type: '',
      status: ImagingTestStatus.Requested,
      visitId,
      requestedOn: new Date().toISOString(),
      requestedBy: user?.id || '',
      requestedByFullName: user?.fullName || '',
      completedOn: '',
      canceledOn: '',
      note: '',
    }),
    [patient, user, visitId],
  )

  const [imagingTest, setImagingTest] = useState(initialImagingTestState as ImagingTest)

  useEffect(() => {
    setImagingTest(initialImagingTestState)
  }, [show, initialImagingTestState])
  const [imagingTestError, setImagingTestError] = useState<ImagingTestError | undefined>(undefined)

  const onImagingTestChange = (newImagingTest: Partial<ImagingTest>) => {
    setImagingTest(newImagingTest as ImagingTest)
  }

  const onSaveButtonClick = async () => {
    try {
      await addImagingTest({ imagingTest, patientId: patient.id })
      onCloseButtonClick()
    } catch (e) {
      setImagingTestError(e)
    }
  }

  const body = (
    <ImagingTestForm
      imagingTest={imagingTest}
      disabled={false}
      imagingError={imagingTestError}
      onChange={onImagingTestChange}
    />
  )

  return (
    <Modal
      show={show}
      toggle={onCloseButtonClick}
      title="Add New ImagingTest"
      body={body}
      closeButton={{
        children: 'Cancel',
        color: 'danger',
        onClick: onCloseButtonClick,
      }}
      successButton={{
        children: 'Add',
        color: 'success',
        icon: 'add',
        iconLocation: 'left',
        onClick: onSaveButtonClick,
      }}
    />
  )
}

export default AddImagingTestModal
