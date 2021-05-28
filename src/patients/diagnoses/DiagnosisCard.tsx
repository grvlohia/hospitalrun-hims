import { Button, Column, Row } from '@hospitalrun/components'
import React, { useState } from 'react'
import { Card } from 'react-bootstrap'

import DatePickerWithLabelFormGroup from '../../shared/components/input/DatePickerWithLabelFormGroup'
import SelectWithLabelFormGroup from '../../shared/components/input/SelectWithLabelFormGroup'
import TextFieldWithLabelFormGroup from '../../shared/components/input/TextFieldWithLabelFormGroup'
import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import Diagnosis, { DiagnosisStatus } from '../../shared/model/Diagnosis'

interface Props {
  disabled: boolean
  diagnosis: Partial<Diagnosis>
  onSave: (newDiagnosis: Partial<Diagnosis>) => void
  onCancel: () => void
}

const DiagnosisCard = (props: Props) => {
  const { disabled, diagnosis, onSave, onCancel } = props

  const [status, setStatus] = useState(diagnosis.status)

  const onFieldChange = (fieldName: string, value: string | DiagnosisStatus) => {
    if (onSave) {
      const newDiagnosis = {
        ...diagnosis,
        [fieldName]: value,
      } as Partial<Diagnosis>
      onSave(newDiagnosis)
    }
  }

  const diagnosisStatusOptions = Object.values(DiagnosisStatus).map((value) => ({
    label: value,
    value,
  }))
  return (
    <Card style={{ marginBottom: '15px', padding: '15px' }}>
      <Card.Body>
        <Row>
          <Column md={6}>
            <TextInputWithLabelFormGroup
              label="Diagnosis Name"
              name="name"
              isRequired
              isEditable={!disabled}
              value={diagnosis.name || ''}
              onChange={(event) => onFieldChange('name', event.target.value)}
            />
          </Column>
          <Column>
            <DatePickerWithLabelFormGroup
              label="Diagnosis Date"
              name="diagnosisDate"
              isRequired
              isEditable={!disabled}
              value={diagnosis.diagnosisDate ? new Date(diagnosis.diagnosisDate) : new Date()}
              onChange={(date) => onFieldChange('diagnosisDate', date.toISOString())}
            />
          </Column>
        </Row>
        <Row>
          <Column md={6}>
            <SelectWithLabelFormGroup
              label="Status"
              name="status"
              options={diagnosisStatusOptions}
              isEditable={!disabled}
              isRequired
              placeholder="Status"
              defaultSelected={diagnosisStatusOptions.filter(({ value }) => value === status)}
              onChange={(values) => {
                onFieldChange('status', values[0])
                setStatus(values[0] as DiagnosisStatus)
              }}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextFieldWithLabelFormGroup
              name="note"
              label="Note"
              isEditable={!disabled}
              value={diagnosis.note}
              onChange={(event) => onFieldChange('note', event.target.value)}
            />
          </Column>
        </Row>
        <Button color="danger" onClick={onCancel}>
          Cancel
        </Button>
      </Card.Body>
    </Card>
  )
}

export default DiagnosisCard
