import { Row, Table, Button, Typography } from '@hospitalrun/components'
import React, { CSSProperties, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useTranslator from '../../shared/hooks/useTranslator'
import Allergy from '../../shared/model/Allergy'
import Patient from '../../shared/model/Patient'
import Permissions from '../../shared/model/Permissions'
import { RootState } from '../../shared/store'
import { formatDate } from '../../shared/util/formatDate'
import NewAllergyModal from '../allergies/NewAllergyModal'
import AddCarePlanModal from '../care-plans/AddCarePlanModal'
import usePatientAllergies from '../hooks/usePatientAllergies'
import AddVisitModal from '../visits/AddVisitModal'

interface Props {
  patient: Patient
  onAddVisit: () => void
}

const getPatientCode = (p: Patient): string => {
  if (p) {
    return p.code
  }

  return ''
}

const ImportantPatientInfo = (props: Props) => {
  const { patient, onAddVisit } = props
  const { t } = useTranslator()
  const history = useHistory()
  const { permissions } = useSelector((state: RootState) => state.user)
  const [showNewAllergyModal, setShowNewAllergyModal] = useState(false)
  const [showAddCarePlanModal, setShowAddCarePlanModal] = useState(false)
  const [showAddVisitModal, setShowAddVisitModal] = useState(false)
  const { data, status } = usePatientAllergies(patient.id)

  const headerRowStyle: CSSProperties = {
    minHeight: '3rem',
    marginBottom: '1rem',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '100%',
    marginRight: '0rem',
    marginLeft: '0rem',
    backgroundColor: 'rgba(245,245,245,1)',
  }

  const headerInfoBoxStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
  }

  const headerInfoStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    color: 'black',
    fontSize: 'small',
    textAlign: 'center',
    justifyContent: 'center',
    height: '100%',
  }

  const headerInfoPatientNameStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    color: 'black',
    textAlign: 'left',
    justifyContent: 'center',
    height: '100%',
  }

  const headerAddVisitButtonStyle: CSSProperties = {
    height: '2.5rem',
  }

  const middleRowStyle: CSSProperties = {
    minHeight: '3rem',
    marginBottom: '1rem',
  }

  const middleRowSectionStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }

  const tableContainerStyle: CSSProperties = {
    fontSize: 'small',
    height: '5.5rem',
    overflowX: 'hidden',
    overflowY: 'auto',
    scrollBehavior: 'auto',
  }

  return (
    <div>
      <Row style={headerRowStyle}>
        <div style={headerInfoBoxStyle}>
          <div className="col-3">
            <div style={headerInfoPatientNameStyle}>
              <h3>{patient.fullName}</h3>
            </div>
          </div>

          <div className="col-3">
            <div style={headerInfoStyle}>
              <strong>{t('patient.code')}</strong>
              <h6>{getPatientCode(patient)}</h6>
            </div>
          </div>
          <div className="col-3">
            <div style={headerInfoStyle} className="patient-sex">
              <strong>{t('patient.sex')}</strong>
              <h6>{patient.sex}</h6>
            </div>
          </div>
          <div className="col-3">
            <div style={headerInfoStyle} className="patient-dateOfBirth">
              <strong>{t('patient.dateOfBirth')}</strong>
              <h6>
                {patient.dateOfBirth
                  ? formatDate(patient.dateOfBirth)
                  : t('patient.unknownDateOfBirth')}
              </h6>
            </div>
          </div>
        </div>

        <div className="col d-flex justify-content-end align-items-center">
          {permissions.includes(Permissions.AddVisit) && (
            <>
              <Button
                outlined
                color="success"
                icon="add"
                iconLocation="left"
                style={headerAddVisitButtonStyle}
                onClick={() => setShowAddVisitModal(true)}
              >
                {t('patient.visits.new')}
              </Button>
              <Button
                outlined
                color="success"
                icon="add"
                iconLocation="left"
                style={headerAddVisitButtonStyle}
                onClick={onAddVisit}
              >
                Add My Visit
              </Button>
            </>
          )}
        </div>
      </Row>

      <Row style={middleRowStyle}>
        <div className="col allergies-section" style={middleRowSectionStyle}>
          <Typography variant="h5">{t('patient.allergies.label')}</Typography>
          <div className="border border-primary" style={tableContainerStyle}>
            <Table
              tableClassName="table table-hover table-sm m-0"
              onRowClick={() => history.push(`/patients/${patient.id}/allergies`)}
              getID={(row) => row.id}
              columns={[{ label: t('patient.allergies.allergyName'), key: 'name' }]}
              data={data && status !== 'loading' ? (data as Allergy[]) : []}
            />
          </div>
          {permissions.includes(Permissions.AddAllergy) && (
            <Button
              size="small"
              color="primary"
              icon="add"
              iconLocation="left"
              onClick={() => setShowNewAllergyModal(true)}
            >
              {t('patient.allergies.new')}
            </Button>
          )}
        </div>

        <div className="col carePlan-section" style={middleRowSectionStyle}>
          <Typography variant="h5">{t('patient.carePlan.label')}</Typography>
          <div className="border border-primary" style={tableContainerStyle}>
            <Table
              tableClassName="table table-hover table-sm m-0"
              onRowClick={(row) => history.push(`/patients/${patient.id}/care-plans/${row.id}`)}
              getID={(row) => row.id}
              data={patient.carePlans || []}
              columns={[
                { label: t('patient.carePlan.title'), key: 'title' },
                {
                  label: t('patient.carePlan.startDate'),
                  key: 'startDate',
                  formatter: (row) => formatDate(row.startDate),
                },
                {
                  label: t('patient.carePlan.endDate'),
                  key: 'endDate',
                  formatter: (row) => formatDate(row.endDate),
                },
                { label: t('patient.carePlan.status'), key: 'status' },
              ]}
            />
          </div>
          {permissions.includes(Permissions.AddCarePlan) && (
            <Button
              size="small"
              color="primary"
              icon="add"
              iconLocation="left"
              onClick={() => setShowAddCarePlanModal(true)}
            >
              {t('patient.carePlan.new')}
            </Button>
          )}
        </div>
      </Row>

      <NewAllergyModal
        show={showNewAllergyModal}
        onCloseButtonClick={() => setShowNewAllergyModal(false)}
        patientId={patient.id}
      />

      <AddCarePlanModal
        show={showAddCarePlanModal}
        onCloseButtonClick={() => setShowAddCarePlanModal(false)}
        patient={patient}
      />

      <AddVisitModal
        show={showAddVisitModal}
        onCloseButtonClick={() => setShowAddVisitModal(false)}
        patientId={patient.id}
      />
    </div>
  )
}

export default ImportantPatientInfo
