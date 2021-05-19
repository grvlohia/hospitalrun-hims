import { Table } from '@hospitalrun/components'
import format from 'date-fns/format'
import React from 'react'

import useTranslator from '../../shared/hooks/useTranslator'
import usePatientMedicines from '../hooks/usePatientMedicines'

interface Props {
  patientId: string
  visitId: string
}

const MedicinesTable = ({ patientId, visitId }: Props) => {
  const { t } = useTranslator()
  const { data: medicines } = usePatientMedicines(patientId, visitId)
  if (!medicines) {
    return null
  }
  if (medicines.length === 0) {
    return null
  }

  return (
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
          action: (row) => console.log(row.id),
        },
        {
          label: t('actions.delete'),
          action: (row) => console.log(row.id),
          buttonColor: 'danger',
        },
      ]}
    />
  )
}

export default MedicinesTable
