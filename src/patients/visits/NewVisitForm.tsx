/* eslint-disable react/no-array-index-key */
import { Button, Column, Container, Panel, Row } from '@hospitalrun/components'
import { isEmpty } from 'lodash'
import React, { CSSProperties, useState } from 'react'
import { useSelector } from 'react-redux'

import DatePickerWithLabelFormGroup from '../../shared/components/input/DatePickerWithLabelFormGroup'
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
import Permissions from '../../shared/model/Permissions'
import { RootState } from '../../shared/store'
import generateCode from '../../shared/util/generateCode'
import { uuid } from '../../shared/util/uuid'
import DiagnosisCard from '../diagnoses/DiagnosisCard'
import useAddVisit, { RequestVisit } from '../hooks/useNewAddVisit'
import ImagingTestCard from '../imagings/ImagingTestCard'
import LabTestCard from '../labs/LabTestCard'
import MedicineCard from '../medicines/MedicineCard'
import validatePatientCondition, { PatientConditionError } from '../util/validate-patient-condition'
import validatePatientDiagnosis, { DiagnosisError } from '../util/validate-patient-diagnosis'
import ConditionsCard from './ConditionsCard'

const headerStyle: CSSProperties = {
  backgroundColor: '#cecece',
}

interface DiagnosisObject {
  diagnosis: Diagnosis
  diagnosisError: DiagnosisError
}

interface Props {
  disabled?: boolean
  patientId: string
  onClose: () => void
}

const VisitForm = (props: Props) => {
  const { disabled, patientId, onClose } = props
  const permissions = useSelector((state: RootState) => state.user.permissions)
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
  const [conditionError, setConditionError] = useState<PatientConditionError | undefined>(undefined)
  const [diagnoses, setDiagnoses] = useState([] as DiagnosisObject[])
  const [medications, setMedications] = useState([] as Medicine[])
  const [labTests, setLabTests] = useState([] as LabTest[])
  const [imagingTests, setImagingTests] = useState([] as ImagingTest[])
  const [advice, setAdvice] = useState('')
  const [followUp, setFollowUp] = useState('')

  const [mutate] = useAddVisit()

  const onConditionChange = (newCondition: Partial<PatientCondition>) => {
    setCondition(newCondition as PatientCondition)
  }

  const onAddDiagnosis = () => {
    setDiagnoses((prevState) => [
      ...prevState,
      {
        diagnosis: {
          id: uuid(),
          name: '',
          diagnosisDate: new Date().toISOString(),
          visit: visitId,
        } as Diagnosis,
        diagnosisError: {} as DiagnosisError,
      },
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
      newState[index].diagnosis = newDiagnosis as Diagnosis
      return newState
    })
  }

  const onDiagnosesErrorChange = (index: number, newDiagnosisError: DiagnosisError) => {
    setDiagnoses((prevState) => {
      const newState = [...prevState]
      newState[index].diagnosisError = newDiagnosisError
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

  const onSaveVisit = async () => {
    const error = validatePatientCondition(condition)
    const diagnosesError = diagnoses.map((diagnosisObj, index) => {
      const diagnosisError = validatePatientDiagnosis(diagnosisObj.diagnosis)
      onDiagnosesErrorChange(index, diagnosisError)
      return diagnosisError
    })
    console.log(diagnosesError)
    if (isEmpty(error)) {
      const newVisit: RequestVisit = {
        id: visitId,
        startDateTime: new Date().toISOString(),
        endDateTime: new Date().toISOString(),
        condition,
        diagnoses: diagnoses.map((diagnosisObj) => diagnosisObj.diagnosis),
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
    } else {
      setConditionError(error)
    }
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
            <Panel title="Conditions" color="primary">
              <ConditionsCard
                condition={condition}
                disabled={!!disabled}
                onChange={onConditionChange}
                conditionError={conditionError}
              />
            </Panel>
            <br />

            {permissions.includes(Permissions.AddDiagnosis) && (
              <>
                <Panel color="primary" title="Diagnoses">
                  {diagnoses.map((diagnosisObj, index) => (
                    <DiagnosisCard
                      key={`diagnosis-${index}`}
                      disabled={false}
                      diagnosis={diagnosisObj.diagnosis}
                      diagnosisError={diagnosisObj.diagnosisError}
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
              </>
            )}

            {permissions.includes(Permissions.AddMedicine) && (
              <>
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
              </>
            )}

            <Row>
              <Column>
                {permissions.includes(Permissions.RequestLab) && (
                  <Panel color="primary" title="Lab Test">
                    {labTests.map((labTest, index) => (
                      <LabTestCard
                        key={`labTest-${index}`}
                        disabled={false}
                        labTest={labTest}
                        onDelete={() => onRemoveLabTest(index)}
                        onSave={(newLabTest: Partial<LabTest>) =>
                          onLabTestsChange(index, newLabTest)
                        }
                      />
                    ))}
                    <Button color="outline-primary" onClick={onAddLabTest}>
                      Add New Lab Test
                    </Button>
                  </Panel>
                )}
              </Column>
              <Column>
                {permissions.includes(Permissions.RequestImaging) && (
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
                )}
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
