import { Button, Column, Row } from '@hospitalrun/components'
import React, { CSSProperties } from 'react'
import { Card } from 'react-bootstrap'

import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import LabTest from '../../shared/model/LabTest'

const cardStyle: CSSProperties = {
  marginBottom: '15px',
  padding: '15px',
}

const rowStyle: CSSProperties = {
  alignItems: 'center',
}

interface Props {
  labTest: Partial<LabTest>
  disabled: boolean
  onSave: (newLabTest: Partial<LabTest>) => void
  onDelete: () => void
}

const LabTestCard = (props: Props) => {
  const { disabled, labTest, onSave, onDelete } = props

  const onFieldChange = (fieldName: string, value: string) => {
    if (onSave) {
      const newLabTest: Partial<LabTest> = {
        ...labTest,
        [fieldName]: value,
      }
      onSave(newLabTest)
    }
  }

  return (
    <Card style={cardStyle}>
      <Row style={rowStyle}>
        <Column>
          <TextInputWithLabelFormGroup
            label="Test Name"
            isRequired
            name="name"
            placeholder="e.g. Blood Test"
            value={labTest.name}
            isEditable={!disabled}
            onChange={(event) => onFieldChange('name', event.target.value)}
          />
        </Column>
        <Column>
          <TextInputWithLabelFormGroup
            label="Description"
            name="description"
            placeholder="Description"
            value={labTest.description}
            isEditable={!disabled}
            onChange={(event) => onFieldChange('description', event.target.value)}
          />
        </Column>
        <Button icon="remove" onClick={onDelete} />
      </Row>
    </Card>
  )
}

export default LabTestCard
