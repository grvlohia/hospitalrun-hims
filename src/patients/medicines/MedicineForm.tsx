import { Alert, Column, Row } from '@hospitalrun/components'
import React from 'react'

import Input from '../../shared/components/input'
import useTranslator from '../../shared/hooks/useTranslator'
import Medicine from '../../shared/model/Medicine'

interface Props {
  medicine: Partial<Medicine>
  medicineError?: Error
  onChange?: (newMedicine: Partial<Medicine>) => void
  disabled: boolean
}

const MedicineForm = (props: Props) => {
  const { t } = useTranslator()
  const { disabled, medicine, medicineError, onChange } = props
  const onFieldChange = (name: string, value: string) => {
    if (onChange) {
      const newMedicine = {
        ...medicine,
        [name]: value,
      }
      onChange(newMedicine)
    }
  }

  return (
    <form aria-label="form">
      {medicineError && (
        <Alert color="danger" title={t('states.error')} message={medicineError?.message || ''} />
      )}

      <Row>
        <Column md={12}>
          <Input.TextInputWithLabelFormGroup
            isRequired
            value={medicine.name}
            name="name"
            isEditable={!disabled}
            placeholder="Medicine Name"
            label="Name"
            onChange={(event) => onFieldChange('name', event.target.value)}
          />
        </Column>
      </Row>

      <Row>
        <Column md={12}>
          <Input.TextInputWithLabelFormGroup
            isRequired
            value={medicine.principalSalt}
            name="principalSalt"
            isEditable={!disabled}
            placeholder="Principal Salt"
            label="Principal Salt"
            onChange={(event) => onFieldChange('principalSalt', event.target.value)}
          />
        </Column>
      </Row>

      <Row>
        <Column md={12}>
          <Input.DatePickerWithLabelFormGroup
            isRequired
            name="startDateTime"
            label="Start Date"
            value={medicine.startDateTime ? new Date(medicine.startDateTime) : new Date()}
            isEditable={!disabled}
            onChange={(date) => onFieldChange('startDateTime', date.toISOString())}
          />
        </Column>
      </Row>

      <Row>
        <Column md={12}>
          <Input.DatePickerWithLabelFormGroup
            isRequired
            name="endDateTime"
            label="End Date"
            value={medicine.endDateTime ? new Date(medicine.endDateTime) : new Date()}
            isEditable={!disabled}
            onChange={(date) => onFieldChange('endDateTime', date.toISOString())}
          />
        </Column>
      </Row>

      <Row>
        <Column md={12}>
          <Input.TextInputWithLabelFormGroup
            name="dosage"
            isRequired
            isEditable={!disabled}
            label="Dosage"
            placeholder="Dosage"
            value={medicine.dosage}
            onChange={(event) => onFieldChange('dosage', event.target.value)}
          />
        </Column>
      </Row>

      <Row>
        <Column md={12}>
          <Input.TextFieldWithLabelFormGroup
            value={medicine.note}
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

MedicineForm.defaultProps = {
  disabled: false,
}

export default MedicineForm
