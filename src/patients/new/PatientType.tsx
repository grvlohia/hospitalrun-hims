import { Button } from '@hospitalrun/components'
import React, { useState } from 'react'

import NewPatient from './NewPatient'
import NewPatientWithHealthId from './NewPatientWithHealthId'

const registrationType = {
  WITH_HEALTH_ID: 'WITH_HEALTH_ID',
  WITHOUT_HEALTH_ID: 'WITHOUT_HEALTH_ID',
}

const PatientType = () => {
  const [patientType, setPatientType] = useState('')

  let content = null
  if (patientType === '') {
    content = (
      <div className="row justify-content-md-around">
        <Button onClick={() => setPatientType(registrationType.WITH_HEALTH_ID)}>
          Using Health Id
        </Button>
        <Button onClick={() => setPatientType(registrationType.WITHOUT_HEALTH_ID)}>
          Without Health Id
        </Button>
      </div>
    )
  } else if (patientType === registrationType.WITH_HEALTH_ID) {
    content = <NewPatientWithHealthId />
  } else if (patientType === registrationType.WITHOUT_HEALTH_ID) {
    content = <NewPatient />
  }

  return content
}

export default PatientType
