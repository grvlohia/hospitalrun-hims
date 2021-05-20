import { Table } from '@hospitalrun/components'
import format from 'date-fns/format'
import React, { useState } from 'react'

import useTranslator from '../../shared/hooks/useTranslator'
import Medicine from '../../shared/model/Medicine'
import useDeletePatientMedicine from '../hooks/useDeletePatientMedicine'
import usePatient from '../hooks/usePatient'
import usePatientMedicines from '../hooks/usePatientMedicines'
import EditMedicineModal from './EditMedicineModal'

interface Props {
  patientId: string
  visitId: string
}

const MedicinesTable = ({ patientId, visitId }: Props) => {
  const { t } = useTranslator()
  const [deleteMedicine] = useDeletePatientMedicine()
  const [medicineToEdit, setMedicineToEdit] = useState({} as Medicine)
  const [showEditMedicineModal, setShowEditMedicineModal] = useState(false)
  const { data: medicines } = usePatientMedicines(patientId, visitId)
  const { data: patient } = usePatient(patientId)
  if (!patient) {
    return null
  }

  if (!medicines) {
    return null
  }
  if (medicines.length === 0) {
    return null
  }

  const onDeleteMedicine = async (medicine: Medicine) => {
    await deleteMedicine({ patientId, medicine })
  }

  return (
    <>
      <Table
        getID={(row) => row.id}
        data={medicines}
        columns={[
          {
            label: 'Name',
            key: 'name',
          },
          {
            label: 'Start Date',
            key: 'startDateTime',
            formatter: (row) => format(new Date(row.startDateTime), 'yyyy-MM-dd'),
          },
          {
            label: 'End Date',
            key: 'endDateTime',
            formatter: (row) => format(new Date(row.endDateTime), 'yyyy-MM-dd'),
          },
          { label: 'Dosage', key: 'dosage' },
        ]}
        actionsHeaderText={t('actions.label')}
        actions={[
          {
            label: t('actions.edit'),
            action: (row) => {
              setMedicineToEdit(row)
              setShowEditMedicineModal(true)
            },
          },
          {
            label: t('actions.delete'),
            action: (row) => onDeleteMedicine(row),
            buttonColor: 'danger',
          },
        ]}
      />
      <EditMedicineModal
        show={showEditMedicineModal}
        onCloseButtonClick={() => setShowEditMedicineModal(false)}
        patient={patient}
        oldMedicine={medicineToEdit}
      />
    </>
  )
}

export default MedicinesTable
