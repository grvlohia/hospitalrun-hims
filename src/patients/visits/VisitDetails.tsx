import { Button, Panel } from '@hospitalrun/components'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

// import Diagnosis from '../../shared/model/Diagnosis'
import Permissions from '../../shared/model/Permissions'
import Visit from '../../shared/model/Visit'
import { RootState } from '../../shared/store'
import DiagnosesTable from '../diagnoses/DiagnosesTable'
import AddDiagnosisModal from '../diagnoses/NewAddDiagnosisModal'
import usePatient from '../hooks/usePatient'
import AddMedicineModal from '../medicines/AddMedicineModal'
import MedicinesTable from '../medicines/MedicinesTable'

interface Props {
  visit: Visit
  patientId: string
}

const VisitDetails = (props: Props) => {
  const { visit, patientId } = props
  const { permissions } = useSelector((state: RootState) => state.user)
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false)
  const [showMedicineModal, setShowMedicineModal] = useState(false)
  const { data: patient } = usePatient(patientId)
  if (!patient) {
    return null
  }

  return (
    <div>
      <Panel title="Diagnosis" color="primary" collapsible>
        <div className="row">
          <DiagnosesTable patientId={patientId} visitId={visit.id} />
          {permissions.includes(Permissions.AddDiagnosis) && (
            <Button color="primary" onClick={() => setShowDiagnosisModal(true)}>
              Add Diagnosis
            </Button>
          )}
        </div>
      </Panel>
      <br />
      <Panel title="Prescription" color="primary" collapsible>
        <div className="row">
          <MedicinesTable patientId={patientId} visitId={visit.id} />
          {permissions.includes(Permissions.WritePatients) && (
            <Button color="primary" onClick={() => setShowMedicineModal(true)}>
              Add Medication
            </Button>
          )}
        </div>
      </Panel>
      <br />
      <Panel title="Labs" color="primary" collapsible>
        <div className="row">
          <h1>Lab Tests Section</h1>
        </div>
      </Panel>
      <br />
      <Panel title="Imagings" color="primary" collapsible>
        <div className="row">
          <h1>Imagings Section</h1>
        </div>
      </Panel>
      <AddDiagnosisModal
        show={showDiagnosisModal}
        onCloseButtonClick={() => setShowDiagnosisModal(false)}
        patient={patient}
      />
      <AddMedicineModal
        show={showMedicineModal}
        onCloseButtonClick={() => setShowMedicineModal(false)}
        patient={patient}
        visitId={visit.id}
      />
    </div>
  )
}

export default VisitDetails
