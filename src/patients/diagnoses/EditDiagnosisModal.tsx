import { Modal } from '@hospitalrun/components'
import { isEmpty } from 'lodash'
import React, { useState, useEffect } from 'react'

import useTranslator from '../../shared/hooks/useTranslator'
import Diagnosis from '../../shared/model/Diagnosis'
import Patient from '../../shared/model/Patient'
import useEditPatientDiagnosis from '../hooks/useEditPatientDiagnosis'
import { DiagnosisError } from '../util/validate-diagnosis'
import DiagnosisForm from './DiagnosisForm'

interface NewDiagnosisModalProps {
  patient: Patient
  show: boolean
  onCloseButtonClick: () => void
  oldDiagnosis: Diagnosis
}

const AddDiagnosisModal = (props: NewDiagnosisModalProps) => {
  const { show, onCloseButtonClick, patient, oldDiagnosis } = props
  const { t } = useTranslator()
  const [mutate] = useEditPatientDiagnosis()

  if (isEmpty(oldDiagnosis)) {
    onCloseButtonClick()
  }
  const [diagnosis, setDiagnosis] = useState(oldDiagnosis)
  const [diagnosisError, setDiagnosisError] = useState<DiagnosisError | undefined>(undefined)
  useEffect(() => {
    setDiagnosis(oldDiagnosis)
  }, [show, oldDiagnosis])

  const onDiagnosisChange = (newDiagnosis: Partial<Diagnosis>) => {
    setDiagnosis(newDiagnosis as Diagnosis)
  }
  const onSaveButtonClick = async () => {
    try {
      await mutate({ diagnosis, patientId: patient.id })
      onCloseButtonClick()
    } catch (e) {
      setDiagnosisError(e)
    }
  }

  const body = (
    <DiagnosisForm
      diagnosis={diagnosis}
      diagnosisError={diagnosisError}
      onChange={onDiagnosisChange}
      patient={patient}
    />
  )
  return (
    <Modal
      show={show}
      toggle={onCloseButtonClick}
      title={t('patient.diagnoses.edit')}
      body={body}
      closeButton={{
        children: t('actions.cancel'),
        color: 'danger',
        onClick: onCloseButtonClick,
      }}
      successButton={{
        children: t('patient.diagnoses.edit'),
        color: 'success',
        icon: 'add',
        iconLocation: 'left',
        onClick: onSaveButtonClick,
      }}
    />
  )
}

export default AddDiagnosisModal
