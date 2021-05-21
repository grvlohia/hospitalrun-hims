import { Table } from '@hospitalrun/components'
import format from 'date-fns/format'
import React, { useState } from 'react'

import useTranslator from '../../shared/hooks/useTranslator'
import ImagingTest from '../../shared/model/ImagingTest'
import useDeletePatientImagingTest from '../hooks/useDeletePatientImagingTest'
import usePatient from '../hooks/usePatient'
import usePatientImagingTests from '../hooks/usePatientImagingTests'
import EditImagingTestModal from './EditImagingTestModal'

interface Props {
  patientId: string
  visitId: string
}

const ImagingTestsTable = ({ patientId, visitId }: Props) => {
  const { t } = useTranslator()
  const [deleteImagingTest] = useDeletePatientImagingTest()
  const [imagingTestToEdit, setImagingTestToEdit] = useState({} as ImagingTest)
  const [showEditImagingTestModal, setShowEditImagingTestModal] = useState(false)
  const { data: imagings } = usePatientImagingTests(patientId, visitId)
  const { data: patient } = usePatient(patientId)
  if (!patient) {
    return null
  }

  if (!imagings) {
    return null
  }
  if (imagings.length === 0) {
    return null
  }

  const onDeleteImagingTest = async (imagingTest: ImagingTest) => {
    await deleteImagingTest({ patientId, imagingTest })
  }

  return (
    <>
      <Table
        getID={(row) => row.id}
        data={imagings}
        columns={[
          {
            label: 'Type',
            key: 'type',
          },
          {
            label: 'Requested On',
            key: 'requestedOn',
            formatter: (row) => format(new Date(row.requestedOn), 'yyyy-MM-dd'),
          },
          {
            label: 'Request By',
            key: 'requestedByFullName',
          },
          { label: 'Status', key: 'status' },
        ]}
        actionsHeaderText={t('actions.label')}
        actions={[
          {
            label: t('actions.edit'),
            action: (row) => {
              setImagingTestToEdit(row)
              setShowEditImagingTestModal(true)
            },
          },
          {
            label: t('actions.delete'),
            action: (row) => onDeleteImagingTest(row),
            buttonColor: 'danger',
          },
        ]}
      />
      <EditImagingTestModal
        show={showEditImagingTestModal}
        onCloseButtonClick={() => setShowEditImagingTestModal(false)}
        patient={patient}
        oldImagingTest={imagingTestToEdit}
      />
    </>
  )
}

export default ImagingTestsTable
