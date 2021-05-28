import { Button, Column, Row } from '@hospitalrun/components'
import React, { CSSProperties } from 'react'
import { Card } from 'react-bootstrap'

import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import Medicine from '../../shared/model/Medicine'

interface Props {
  disabled: boolean
  medicine: Partial<Medicine>
  onCancel: () => void
  onSave: (newMedicine: Partial<Medicine>) => void
}

const MedicineCard = (props: Props) => {
  const { disabled, medicine, onCancel, onSave } = props

  const onFieldChange = (fieldName: string, value: string | number) => {
    if (onSave) {
      const newMedicine: Partial<Medicine> = {
        ...medicine,
        [fieldName]: value,
      }
      onSave(newMedicine)
    }
  }

  const cardStyle: CSSProperties = {
    marginBottom: '15px',
    padding: '15px',
  }

  const rowStyle: CSSProperties = {
    alignItems: 'center',
  }

  return (
    <Card style={cardStyle}>
      <Row style={rowStyle}>
        <Column>
          <TextInputWithLabelFormGroup
            label="Type"
            isRequired
            name="type"
            placeholder="Type"
            value={medicine.type}
            isEditable={!disabled}
            onChange={(event) => onFieldChange('type', event.target.value)}
          />
        </Column>
        <Column md={4}>
          <TextInputWithLabelFormGroup
            label="Name"
            isRequired
            name="name"
            placeholder="Medicine Name"
            value={medicine.name}
            isEditable={!disabled}
            onChange={(event) => onFieldChange('name', event.target.value)}
          />
        </Column>
        <Column>
          <TextInputWithLabelFormGroup
            label="Concentration"
            type="number"
            name="concentration"
            placeholder="mg/ml"
            isEditable={!disabled}
            value={String(medicine.concentration)}
            onChange={(event) => onFieldChange('concentration', event.target.value)}
          />
        </Column>
        <Column>
          <TextInputWithLabelFormGroup
            label="Dose"
            isRequired
            type="number"
            name="dose"
            placeholder="Dose"
            isEditable={!disabled}
            value={String(medicine.dose)}
            onChange={(event) => onFieldChange('dose', event.target.value)}
          />
        </Column>
        <Column>
          <TextInputWithLabelFormGroup
            label="Days"
            isRequired
            type="number"
            name="days"
            placeholder="Days"
            isEditable={!disabled}
            value={String(medicine.days)}
            onChange={(event) => onFieldChange('days', event.target.value)}
          />
        </Column>
        <Column>
          <TextInputWithLabelFormGroup
            label="Comment"
            name="comment"
            placeholder="Comment"
            isEditable={!disabled}
            value={medicine.comment}
            onChange={(event) => onFieldChange('comment', event.target.value)}
          />
        </Column>
        <Button size="small" icon="remove" onClick={onCancel} />
      </Row>
    </Card>
  )
}

export default MedicineCard
