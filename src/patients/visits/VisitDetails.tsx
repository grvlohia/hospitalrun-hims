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

interface Props {
  visit: Visit
  patientId: string
}

const VisitDetails = (props: Props) => {
  const { visit, patientId } = props
  const { permissions } = useSelector((state: RootState) => state.user)
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false)
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
          <h1>Prescription Section</h1>
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
    </div>
  )
}

export default VisitDetails
