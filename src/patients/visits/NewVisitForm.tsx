import { Button, Column, Container, Panel, Row } from '@hospitalrun/components'
import React, { CSSProperties, useState } from 'react'

import DatePickerWithLabelFormGroup from '../../shared/components/input/DatePickerWithLabelFormGroup'
import TextInputWithAppendedSelectFormGroup from '../../shared/components/input/TextInputWithAppendedSelectFromGroup'
import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import Diagnosis from '../../shared/model/Diagnosis'
import ImagingTest from '../../shared/model/ImagingTest'
import LabTest from '../../shared/model/LabTest'
import Medicine from '../../shared/model/Medicine'
import PatientCondition, {
  BloodPressureUnit,
  TemperatureUnit,
  WeightUnit,
} from '../../shared/model/PatientCondition'
import generateCode from '../../shared/util/generateCode'
import { uuid } from '../../shared/util/uuid'
import DiagnosisCard from '../diagnoses/DiagnosisCard'
import useAddVisit, { RequestVisit } from '../hooks/useNewAddVisit'
import ImagingTestCard from '../imagings/ImagingTestCard'
import LabTestCard from '../labs/LabTestCard'
import MedicineCard from '../medicines/MedicineCard'

const headerStyle: CSSProperties = {
  backgroundColor: '#cecece',
}

interface Props {
  disabled?: boolean
  patientId: string
  onClose: () => void
}

const VisitForm = (props: Props) => {
  const { disabled, patientId, onClose } = props
  const [carePlan] = useState({
    id: '',
    title: 'Cancer Treatment',
    description: 'Treatment of stage 2 cancer for Kabir Shrivastava',
    startDate: '2021-05-19',
    endDate: '',
    createdOn: '2021-05-19',
    note: '',
  })

  const [visitId] = useState(uuid())
  const [condition, setCondition] = useState({
    complaints: '',
    weight: undefined,
    weightUnit: WeightUnit.Kilogram,
    bloodPressure: undefined,
    bloodPressureUnit: BloodPressureUnit.MillimetersOfMercury,
    temperature: undefined,
    temperatureUnit: TemperatureUnit.Fahrenheit,
  } as PatientCondition)
  const [diagnoses, setDiagnoses] = useState([] as Diagnosis[])
  const [medications, setMedications] = useState([] as Medicine[])
  const [labTests, setLabTests] = useState([] as LabTest[])
  const [imagingTests, setImagingTests] = useState([] as ImagingTest[])
  const [advice, setAdvice] = useState('')
  const [followUp, setFollowUp] = useState('')

  const [mutate] = useAddVisit()

  const onSaveVisit = async () => {
    const newVisit: RequestVisit = {
      id: visitId,
      startDateTime: new Date().toISOString(),
      endDateTime: new Date().toISOString(),
      condition,
      diagnoses,
      medications,
      labTests,
      imagingTests,
      advice,
      followUp,
      updatedAt: new Date().toISOString(),
      rev: '',
    }
    try {
      await mutate({ patientId, visit: newVisit })
      onClose()
    } catch (e) {
      console.log(e)
    }
  }

  const onConditionChange = (fieldName: string, value: string) => {
    if (
      fieldName === 'complaints' ||
      fieldName === 'weightUnit' ||
      fieldName === 'bloodPressureUnit' ||
      fieldName === 'temperatureUnit'
    ) {
      setCondition((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }))
    } else {
      setCondition((prevState) => ({
        ...prevState,
        [fieldName]: Number(value),
      }))
    }
  }

  const onAddDiagnosis = () => {
    setDiagnoses((prevState) => [
      ...prevState,
      {
        id: uuid(),
        diagnosisDate: new Date().toISOString(),
        name: '',
        visit: visitId,
      } as Diagnosis,
    ])
  }

  const onRemoveDiagnosis = (index: number) => {
    setDiagnoses((prevState) => {
      const newState = [...prevState]
      newState.splice(index, 1)
      return newState
    })
  }

  const onDiagnosesChange = (index: number, newDiagnosis: Partial<Diagnosis>) => {
    setDiagnoses((prevState) => {
      const newState = [...prevState]
      newState[index] = newDiagnosis as Diagnosis
      return newState
    })
  }

  const onAddMedication = () => {
    setMedications((prevState) => [
      ...prevState,
      {
        id: uuid(),
        name: '',
        type: '',
        comment: '',
        dose: undefined,
        days: undefined,
        concentration: undefined,
        visitId,
        note: '',
        prescribedBy: '',
      } as Medicine,
    ])
  }

  const onRemoveMedication = (index: number) => {
    setMedications((prevState) => {
      const newState = [...prevState]
      newState.splice(index, 1)
      return newState
    })
  }

  const onMedicationChange = (index: number, newMedicine: Partial<Medicine>) => {
    setMedications((prevState) => {
      const newState = [...prevState]
      newState[index] = newMedicine as Medicine
      return newState
    })
  }

  const onAddLabTest = () => {
    setLabTests((prevState) => [
      ...prevState,
      {
        id: uuid(),
        code: generateCode('L'),
        name: '',
        patientId,
        requestedOn: new Date().toISOString(),
        requestedBy: '',
        status: 'requested',
        visitId,
      } as LabTest,
    ])
  }

  const onRemoveLabTest = (index: number) => {
    setLabTests((prevState) => {
      const newState = [...prevState]
      newState.splice(index, 1)
      return newState
    })
  }

  const onLabTestsChange = (index: number, newLabTest: Partial<LabTest>) => {
    setLabTests((prevState) => {
      const newState = [...prevState]
      newState[index] = newLabTest as LabTest
      return newState
    })
  }

  const onAddImagingTest = () => {
    setImagingTests((prevState) => [
      ...prevState,
      {
        id: uuid(),
        name: '',
        code: generateCode('I'),
        patientId,
        visitId,
        requestedOn: new Date().toISOString(),
        requestedBy: '',
      },
    ])
  }

  const onRemoveImagingTest = (index: number) => {
    setImagingTests((prevState) => {
      const newState = [...prevState]
      newState.splice(index, 1)
      return newState
    })
  }

  const onImagingTestsChange = (index: number, newImagingTest: Partial<ImagingTest>) => {
    setImagingTests((prevState) => {
      const newState = [...prevState]
      newState[index] = newImagingTest as ImagingTest
      return newState
    })
  }

  return (
    <form>
      <Container style={{ border: '1px #1abc9c solid' }}>
        <Row style={headerStyle}>
          <Column>
            <div>
              <strong>Care Plan</strong>
              <h6>{carePlan.title}</h6>
            </div>
          </Column>
          <Column>
            <div>
              <strong>Care Goals</strong>
              <h6>Reduction of Growth</h6>
            </div>
          </Column>
          <Column>
            <div>
              <strong>Related Persons</strong>
              <h6>{carePlan.title}</h6>
            </div>
          </Column>
          {/* <div className="col-3">
            <div style={headerInfoStyle}>
              <strong>{t('patient.code')}</strong>
              <h6>{getPatientCode(patient)}</h6>
            </div>
          </div> */}
        </Row>

        <Row>
          <Container style={{ paddingTop: '15px', paddingBottom: '15px' }}>
            <Panel color="primary" title="Condition">
              <Row style={{ alignItems: 'flex-end' }}>
                <Column md={6}>
                  <TextInputWithLabelFormGroup
                    name="complaints"
                    isRequired
                    label="Symptoms"
                    placeholder="Symptoms"
                    value={condition.complaints}
                    isEditable={!disabled}
                    onChange={(event) => onConditionChange('complaints', event.target.value)}
                  />
                </Column>
                <Column md={2}>
                  <TextInputWithAppendedSelectFormGroup
                    name="weight"
                    type="number"
                    placeholder="Weight"
                    value={String(condition.weight)}
                    onChange={(event) => {
                      onConditionChange('weight', event.target.value)
                    }}
                    append
                    appendOptions={Object.values(WeightUnit).map((unit) => ({
                      label: unit,
                      value: unit,
                    }))}
                    onSelectAppend={(event) => onConditionChange('weightUnit', event.target.value)}
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
                      onConditionChange('bloodPressure', event.target.value)
                    }}
                    append
                    appendOptions={Object.values(BloodPressureUnit).map((unit) => ({
                      label: unit,
                      value: unit,
                    }))}
                    onSelectAppend={(event) =>
                      onConditionChange('bloodPressureUnit', event.target.value)
                    }
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
                      onConditionChange('temperature', event.target.value)
                    }}
                    append
                    appendOptions={Object.values(TemperatureUnit).map((unit) => ({
                      label: unit,
                      value: unit,
                    }))}
                    onSelectAppend={(event) =>
                      onConditionChange('temperatureUnit', event.target.value)
                    }
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
            </Panel>
            <br />

            <Panel color="primary" title="Diagnoses">
              {diagnoses.map((diagnosis, index) => (
                <DiagnosisCard
                  key={`diagnosis-${index}`}
                  disabled={false}
                  diagnosis={diagnosis}
                  onSave={(newDiagnosis: Partial<Diagnosis>) => {
                    onDiagnosesChange(index, newDiagnosis)
                  }}
                  onCancel={() => {
                    onRemoveDiagnosis(index)
                  }}
                />
              ))}
              <Button color="outline-primary" onClick={onAddDiagnosis}>
                Add New Diagnosis
              </Button>
            </Panel>
            <br />

            <Panel color="primary" title="Medications">
              {medications.map((medicine, index) => (
                <MedicineCard
                  key={`medicine-${index}`}
                  disabled={false}
                  medicine={medicine}
                  onCancel={() => onRemoveMedication(index)}
                  onSave={(newMedicine: Partial<Medicine>) => {
                    onMedicationChange(index, newMedicine)
                  }}
                />
              ))}
              <Button color="outline-primary" onClick={onAddMedication}>
                Add New Medicine
              </Button>
            </Panel>
            <br />

            <Row>
              <Column>
                <Panel color="primary" title="Lab Test">
                  {labTests.map((labTest, index) => (
                    <LabTestCard
                      key={`labTest-${index}`}
                      disabled={false}
                      labTest={labTest}
                      onDelete={() => onRemoveLabTest(index)}
                      onSave={(newLabTest: Partial<LabTest>) => onLabTestsChange(index, newLabTest)}
                    />
                  ))}
                  <Button color="outline-primary" onClick={onAddLabTest}>
                    Add New Lab Test
                  </Button>
                </Panel>
              </Column>
              <Column>
                <Panel color="primary" title="Imaging Test">
                  {imagingTests.map((imagingTest, index) => (
                    <ImagingTestCard
                      key={`imagingTest-${index}`}
                      disabled={false}
                      imagingTest={imagingTest}
                      onDelete={() => onRemoveImagingTest(index)}
                      onSave={(newImagingTest: Partial<ImagingTest>) =>
                        onImagingTestsChange(index, newImagingTest)}
                    />
                  ))}
                  <Button color="outline-primary" onClick={onAddImagingTest}>
                    Add New Imaging Test
                  </Button>
                </Panel>
              </Column>
            </Row>
            <br />

            <Row>
              <Column>
                <Panel color="primary" title="Advice">
                  <TextInputWithLabelFormGroup
                    name="advice"
                    isEditable={!disabled}
                    label="Advice"
                    value={advice}
                    onChange={(event) => setAdvice(event.target.value)}
                  />
                </Panel>
              </Column>
              <Column>
                <Panel color="primary" title="Next Follow Up">
                  <DatePickerWithLabelFormGroup
                    label="Choose Date"
                    name="follow"
                    value={followUp !== '' ? new Date(followUp) : new Date()}
                    isEditable={!disabled}
                    onChange={(date) => {
                      setFollowUp(date.toISOString())
                    }}
                  />
                </Panel>
              </Column>
            </Row>

            <Row style={{ justifyContent: 'center' }}>
              <Button color="danger" style={{ margin: '15px' }} onClick={onClose}>
                Cancel
              </Button>
              <Button color="success" style={{ margin: '15px' }} onClick={onSaveVisit}>
                Create Prescription
              </Button>
            </Row>
          </Container>
        </Row>
      </Container>
    </form>
  )
}

export default VisitForm
