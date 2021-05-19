import { Modal } from '@hospitalrun/components'
import React, { useEffect, useState } from 'react'

import Medicine from '../../shared/model/Medicine'
import Patient from '../../shared/model/Patient'
import useAddPatientMedicine from '../hooks/useAddPatientMedicine'
import { MedicineError } from '../util/validate-medicine'
import MedicineForm from './MedicineForm'

interface NewMedicineModalProps {
  patient: Patient
  show: boolean
  onCloseButtonClick: () => void
  visitId: string
}

const AddMedicineModal = (props: NewMedicineModalProps) => {
  const { patient, show, onCloseButtonClick, visitId } = props
  const [mutate] = useAddPatientMedicine()

  const initialMedicineState = {
    visitId,
    patientCode: patient.code,
    name: '',
    principalSalt: '',
    startDateTime: new Date().toISOString(),
    endDateTime: new Date().toISOString(),
    dosage: '',
    prescribedBy: '',
    note: '',
  }
  const [medicine, setMedicine] = useState(initialMedicineState)
  const [medicineError, setMedicineError] = useState<MedicineError | undefined>(undefined)
  useEffect(() => {
    setMedicine(initialMedicineState)
  }, [show])

  const onMedicineChange = (newMedicine: Partial<Medicine>) => {
    setMedicine(newMedicine as Medicine)
  }

  const onSaveButtonClick = async () => {
    try {
      await mutate({ medicine, patientId: patient.id })
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
      title="Add New Medicine"
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

export default AddMedicineModal
