import { Alert, Column, Row } from '@hospitalrun/components'
import React from 'react'

import Input from '../../shared/components/input'
import useTranslator from '../../shared/hooks/useTranslator'
import ImagingTest, { ImagingTestStatus } from '../../shared/model/ImagingTest'

interface Error {
  message?: string
  type?: string
  status?: string
  requestedOn?: string
}

interface Props {
  imagingTest: Partial<ImagingTest>
  imagingError?: Error
  onChange?: (newImagingTest: Partial<ImagingTest>) => void
  disabled: boolean
}

const ImagingTestForm = (props: Props) => {
  const { t } = useTranslator()
  const { disabled, imagingTest, imagingError, onChange } = props
  const onFieldChange = (name: string, value: string) => {
    if (onChange) {
      const newImagingTest = {
        ...imagingTest,
        [name]: value,
      }
      onChange(newImagingTest)
    }
  }

  const statusOptions = Object.values(ImagingTestStatus).map((status) => ({
    label: status,
    value: status,
  }))

  return (
    <form aria-label="form">
      {imagingError && (
        <Alert color="danger" title={t('states.error')} message={imagingError?.message || ''} />
      )}

      <Row>
        <Column md={12}>
          <Input.TextInputWithLabelFormGroup
            isRequired
            value={imagingTest.type}
            name="type"
            isEditable={!disabled}
            placeholder="Test Type"
            label="Test Type"
            onChange={(event) => onFieldChange('type', event.target.value)}
            isInvalid={!!imagingError?.type}
          />
        </Column>
      </Row>

      <Row>
        <Column md={12}>
          <Input.SelectWithLabelFormGroup
            name="status"
            isEditable={!disabled}
            options={statusOptions}
            defaultSelected={statusOptions.filter((status) => status.value === imagingTest.status)}
            isRequired
            onChange={(values) => {
              onFieldChange('status', values[0])
            }}
            isInvalid={!!imagingError?.status}
          />
        </Column>
      </Row>

      <Row>
        <Column md={12}>
          <Input.DatePickerWithLabelFormGroup
            isRequired
            name="requestedOn"
            label="Requested On"
            value={imagingTest.requestedOn ? new Date(imagingTest.requestedOn) : new Date()}
            isEditable={!disabled}
            onChange={(date) => onFieldChange('startDateTime', date.toISOString())}
            isInvalid={!!imagingError?.requestedOn}
          />
        </Column>
      </Row>

      <Row>
        <Column md={12}>
          <Input.TextFieldWithLabelFormGroup
            value={imagingTest.note}
            label="Note"
            name="note"
            isEditable={!disabled}
            onChange={(event) => onFieldChange('note', event.currentTarget.value)}
          />
        </Column>
      </Row>
    </form>
  )
}

ImagingTestForm.defaultProps = {
  disabled: false,
}

export default ImagingTestForm
