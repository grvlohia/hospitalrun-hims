import { Modal } from '@hospitalrun/components'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'

import Medicine from '../../shared/model/Medicine'
import Patient from '../../shared/model/Patient'
import useEditPatientMedicine from '../hooks/useEditPatientMedicine'
import { MedicineError } from '../util/validate-medicine'
import MedicineForm from './MedicineForm'

interface NewMedicineModalProps {
  patient: Patient
  show: boolean
  onCloseButtonClick: () => void
  oldMedicine: Medicine
}

const AddMedicineModal = (props: NewMedicineModalProps) => {
  const { patient, show, onCloseButtonClick, oldMedicine } = props
  const [editMedicine] = useEditPatientMedicine()

  if (isEmpty(oldMedicine)) {
    onCloseButtonClick()
  }
  const [medicine, setMedicine] = useState(oldMedicine)
  const [medicineError, setMedicineError] = useState<MedicineError | undefined>(undefined)
  useEffect(() => {
    setMedicine(oldMedicine)
  }, [show, oldMedicine])

  const onMedicineChange = (newMedicine: Partial<Medicine>) => {
    setMedicine(newMedicine as Medicine)
  }

  const onSaveButtonClick = async () => {
    try {
      await editMedicine({ medicine, patientId: patient.id })
      onCloseButtonClick()
    } catch (e) {
      setMedicineError(e)
    }
  }

  const body = (
    <MedicineForm medicine={medicine} medicineError={medicineError} onChange={onMedicineChange} />
  )

  return (
    <Modal
      show={show}
      toggle={onCloseButtonClick}
      title="Edit Medicine"
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

export default AddMedicineModal
