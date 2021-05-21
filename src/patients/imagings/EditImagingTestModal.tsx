import { Modal } from '@hospitalrun/components'
import React, { useEffect, useState } from 'react'

import ImagingTest from '../../shared/model/ImagingTest'
import Patient from '../../shared/model/Patient'
import useEditImagingTest from '../hooks/useEditImagingTest'
import { ImagingTestError } from '../util/validate-imagingTest'
import ImagingTestForm from './ImagingTestForm'

interface NewImagingModalProps {
  patient: Patient
  show: boolean
  onCloseButtonClick: () => void
  oldImagingTest: ImagingTest
}

const EditImagingTestModal = (props: NewImagingModalProps) => {
  const { patient, show, onCloseButtonClick, oldImagingTest } = props
  const [editImagingTest] = useEditImagingTest()

  const [imagingTest, setImagingTest] = useState(oldImagingTest)
  const [imagingTestError, setImagingTestError] = useState<ImagingTestError | undefined>(undefined)

  useEffect(() => {
    setImagingTest(oldImagingTest)
  }, [show, oldImagingTest])

  const onImagingTestChange = (newImagingTest: Partial<ImagingTest>) => {
    setImagingTest(newImagingTest as ImagingTest)
  }

  const onSaveButtonClick = async () => {
    try {
      await editImagingTest({ imagingTest, patientId: patient.id })
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
        children: 'Edit',
        color: 'success',
        icon: 'edit',
        iconLocation: 'left',
        onClick: onSaveButtonClick,
      }}
    />
  )
}

export default EditImagingTestModal
