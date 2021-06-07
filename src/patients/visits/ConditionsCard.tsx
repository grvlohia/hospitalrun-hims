import { Column, Row } from '@hospitalrun/components'
import React from 'react'

import TextInputWithAppendedSelectFormGroup from '../../shared/components/input/TextInputWithAppendedSelectFromGroup'
import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import PatientCondition, {
  BloodPressureUnit,
  TemperatureUnit,
  WeightUnit,
} from '../../shared/model/PatientCondition'
import { PatientConditionError } from '../util/validate-patient-condition'

interface Props {
  condition: PatientCondition
  disabled: boolean
  onChange: (newCondition: Partial<PatientCondition>) => void
  conditionError: PatientConditionError | undefined
}

const ConditionsCard = (props: Props) => {
  const { condition, disabled, onChange, conditionError } = props

  const onFieldChange = (fieldName: string, value: string) => {
    if (onChange) {
      let newCondition = {} as Partial<PatientCondition>
      if (
        fieldName === 'complaints' ||
        fieldName === 'weightUnit' ||
        fieldName === 'bloodPressureUnit' ||
        fieldName === 'temperatureUnit'
      ) {
        newCondition = {
          ...condition,
          [fieldName]: value,
        }
      } else {
        newCondition = {
          ...condition,
          [fieldName]: Number(value),
        }
      }
      onChange(newCondition)
    }
  }

  return (
    <Row style={{ alignItems: 'flex-end' }}>
      <Column md={6}>
        <TextInputWithLabelFormGroup
          name="complaints"
          isRequired
          label="Symptoms"
          placeholder="Symptoms"
          value={condition.complaints}
          isEditable={!disabled}
          onChange={(event) => onFieldChange('complaints', event.target.value)}
          isInvalid={conditionError && !!conditionError.complaints}
          feedback={conditionError && conditionError.complaints}
        />
      </Column>
      <Column md={2}>
        <TextInputWithAppendedSelectFormGroup
          name="weight"
          type="number"
          placeholder="Weight"
          value={String(condition.weight)}
          onChange={(event) => {
            onFieldChange('weight', event.target.value)
          }}
          append
          appendOptions={Object.values(WeightUnit).map((unit) => ({
            label: unit,
            value: unit,
          }))}
          onSelectAppend={(event) => onFieldChange('weightUnit', event.target.value)}
          selectComponentValue={
            Object.values(WeightUnit)
              .map((unit) => ({
                label: unit,
                value: unit,
              }))
              .filter((op) => op.value === condition.weightUnit)[0]
          }
        />
      </Column>
      <Column md={2}>
        <TextInputWithAppendedSelectFormGroup
          name="bloodPressure"
          type="number"
          placeholder="BP"
          value={String(condition.bloodPressure)}
          onChange={(event) => {
            onFieldChange('bloodPressure', event.target.value)
          }}
          append
          appendOptions={Object.values(BloodPressureUnit).map((unit) => ({
            label: unit,
            value: unit,
          }))}
          onSelectAppend={(event) => onFieldChange('bloodPressureUnit', event.target.value)}
          selectComponentValue={
            Object.values(BloodPressureUnit)
              .map((unit) => ({
                label: unit,
                value: unit,
              }))
              .filter((op) => op.value === condition.bloodPressureUnit)[0]
          }
        />
      </Column>
      <Column md={2}>
        <TextInputWithAppendedSelectFormGroup
          name="temperature"
          type="number"
          placeholder="Temp."
          value={String(condition.temperature)}
          onChange={(event) => {
            onFieldChange('temperature', event.target.value)
          }}
          append
          appendOptions={Object.values(TemperatureUnit).map((unit) => ({
            label: unit,
            value: unit,
          }))}
          onSelectAppend={(event) => onFieldChange('temperatureUnit', event.target.value)}
          selectComponentValue={
            Object.values(TemperatureUnit)
              .map((unit) => ({
                label: unit,
                value: unit,
              }))
              .filter((op) => op.value === condition.temperatureUnit)[0]
          }
        />
      </Column>
    </Row>
  )
}

export default ConditionsCard
