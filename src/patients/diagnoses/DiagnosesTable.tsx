import { Table } from '@hospitalrun/components'
import format from 'date-fns/format'
import React from 'react'

import useTranslator from '../../shared/hooks/useTranslator'
import Visit from '../../shared/model/Visit'

interface Props {
  visit: Visit
}
const DiagnosesTable = ({ visit }: Props) => {
  const { t } = useTranslator()

  const diagnoses = visit.diagnoses || []
  if (diagnoses.length === 0) {
    return null
  }
  return (
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

export default DiagnosesTable
