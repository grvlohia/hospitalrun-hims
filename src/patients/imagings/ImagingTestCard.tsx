import { Button, Column, Row } from '@hospitalrun/components'
import React, { CSSProperties } from 'react'
import { Card } from 'react-bootstrap'

import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import ImagingTest from '../../shared/model/ImagingTest'

const cardStyle: CSSProperties = {
  marginBottom: '15px',
  padding: '15px',
}

const rowStyle: CSSProperties = {
  alignItems: 'center',
}

interface Props {
  imagingTest: Partial<ImagingTest>
  disabled: boolean
  onSave: (newImagingTest: Partial<ImagingTest>) => void
  onDelete: () => void
}

const ImagingTestCard = (props: Props) => {
  const { disabled, imagingTest, onSave, onDelete } = props

  const onFieldChange = (fieldName: string, value: string) => {
    if (onSave) {
      const newImagingTest: Partial<ImagingTest> = {
        ...imagingTest,
        [fieldName]: value,
      }
      onSave(newImagingTest)
    }
  }

  return (
    <Card style={cardStyle}>
      <Row style={rowStyle}>
        <Column>
          <TextInputWithLabelFormGroup
            label="Name"
            isRequired
            name="name"
            placeholder="e.g. X-Ray"
            value={imagingTest.name}
            isEditable={!disabled}
            onChange={(event) => onFieldChange('name', event.target.value)}
          />
        </Column>
        <Column>
          <TextInputWithLabelFormGroup
            label="Description"
            name="description"
            placeholder="Description"
            value={imagingTest.description}
            isEditable={!disabled}
            onChange={(event) => onFieldChange('description', event.target.value)}
          />
        </Column>
        <Button icon="remove" onClick={onDelete} />
      </Row>
    </Card>
  )
}

export default ImagingTestCard
