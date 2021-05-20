import { Table } from '@hospitalrun/components'
import format from 'date-fns/format'
import React, { useState } from 'react'

import useTranslator from '../../shared/hooks/useTranslator'
import Diagnosis from '../../shared/model/Diagnosis'
import useDeleteDiagnosis from '../hooks/useDeleteDiagnosis'
import useDiagnoses from '../hooks/useDiagnoses'
import usePatient from '../hooks/usePatient'
import EditDiagnosisModal from './EditDiagnosisModal'

interface Props {
  patientId: string
  visitId: string
}

const DiagnosesTable = ({ patientId, visitId }: Props) => {
  const { t } = useTranslator()
  const { data: diagnoses } = useDiagnoses(patientId, visitId)
  const [deleteDiagnosis] = useDeleteDiagnosis()
  const [diagnosisToEdit, setDiagnosisToEdit] = useState({} as Diagnosis)
  const [showEditDiagnosisModal, setShowEditDiagnosisModal] = useState(false)
  const { data: patient } = usePatient(patientId)
  if (!patient) {
    return null
  }

  if (!diagnoses) {
    return null
  }

  if (diagnoses.length === 0) {
    return null
  }

  const onDeleteDiagnosis = async (diagnosis: Diagnosis) => {
    await deleteDiagnosis({ diagnosis, patientId })
  }
  return (
    <>
      <Table
        getID={(row) => row.id}
        data={diagnoses}
        columns={[
          { label: 'Name', key: 'name' },
          {
            label: 'Diagnosis Date',
            key: 'diagnosisDate',
            formatter: (row) => format(new Date(row.diagnosisDate), 'yyyy-MM-dd hh:mm a'),
          },
          {
            label: 'Onset Date',
            key: 'onsetDate',
            formatter: (row) => format(new Date(row.onsetDate), 'yyyy-MM-dd hh:mm a'),
          },
          {
            label: 'Abatement Date',
            key: 'abatementDate',
            formatter: (row) => format(new Date(row.abatementDate), 'yyyy-MM-dd hh:mm a'),
          },
          { label: 'Status', key: 'status' },
        ]}
        actionsHeaderText={t('actions.label')}
        actions={[
          {
            label: t('actions.edit'),
            action: (row) => {
              setDiagnosisToEdit(row)
              setShowEditDiagnosisModal(true)
            },
          },
          {
            label: t('actions.delete'),
            action: (row) => onDeleteDiagnosis(row),
            buttonColor: 'danger',
          },
        ]}
      />
      <EditDiagnosisModal
        onCloseButtonClick={() => setShowEditDiagnosisModal(false)}
        patient={patient}
        show={showEditDiagnosisModal}
        oldDiagnosis={diagnosisToEdit}
      />
    </>
  )
}

export default DiagnosesTable
