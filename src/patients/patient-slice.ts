import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import PatientRepository from '../shared/db/PatientRepository'
import Patient from '../shared/model/Patient'
import { AppThunk } from '../shared/store'
import { cleanupPatient } from './util/set-patient-helper'
import validatePatient from './util/validate-patient'

interface PatientState {
  status: 'loading' | 'error' | 'completed'
  isUpdatedSuccessfully: boolean
  patient: Patient
  relatedPersons: Patient[]
  createError?: Error
  updateError?: Error
  allergyError?: AddAllergyError
  relatedPersonError?: AddRelatedPersonError
}

interface Error {
  message?: string
  givenName?: string
  dateOfBirth?: string
  suffix?: string
  prefix?: string
  familyName?: string
  preferredLanguage?: string
  emails?: (string | undefined)[]
  phoneNumbers?: (string | undefined)[]
}

interface AddRelatedPersonError {
  message?: string
  relatedPerson?: string
  relationshipType?: string
}

interface AddAllergyError {
  message?: string
  name?: string
}

const initialState: PatientState = {
  status: 'loading',
  isUpdatedSuccessfully: false,
  patient: {} as Patient,
  relatedPersons: [],
  createError: undefined,
  updateError: undefined,
  relatedPersonError: undefined,
}

function start(state: PatientState) {
  state.status = 'loading'
  state.createError = {}
}

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    createPatientStart: start,
    createPatientSuccess(state) {
      state.status = 'completed'
    },
    createPatientError(state, { payload }: PayloadAction<Error>) {
      state.status = 'error'
      state.createError = payload
    },
    updatePatientStart: start,
    updatePatientSuccess(state, { payload }: PayloadAction<Patient>) {
      state.status = 'completed'
      state.patient = payload
    },
    updatePatientError(state, { payload }: PayloadAction<Error>) {
      state.status = 'error'
      state.updateError = payload
    },
  },
})

export const {
  createPatientStart,
  createPatientSuccess,
  createPatientError,
  updatePatientStart,
  updatePatientSuccess,
  updatePatientError,
} = patientSlice.actions

export const createPatient = (
  patient: Patient,
  onSuccess?: (patient: Patient) => void,
): AppThunk => async (dispatch) => {
  dispatch(createPatientStart())

  const cleanPatient = cleanupPatient(patient)
  const newPatientError = validatePatient(cleanPatient)

  if (!newPatientError) {
    const newPatient = await PatientRepository.save(cleanPatient)
    dispatch(createPatientSuccess())

    if (onSuccess) {
      onSuccess(newPatient)
    }
  } else {
    dispatch(
      createPatientError({
        ...newPatientError.fieldErrors,
        message: 'patient.errors.createPatientError',
      }),
    )
  }
}

export const updatePatient = (
  patient: Patient,
  onSuccess?: (patient: Patient) => void,
): AppThunk => async (dispatch) => {
  dispatch(updatePatientStart())

  const cleanPatient = cleanupPatient(patient)
  const updateError = validatePatient(cleanPatient)

  if (!updateError) {
    const updatedPatient = await PatientRepository.saveOrUpdate(cleanPatient)
    dispatch(updatePatientSuccess(updatedPatient))

    if (onSuccess) {
      onSuccess(updatedPatient)
    }
  } else {
    dispatch(
      updatePatientError({
        ...updateError.fieldErrors,
        message: 'patient.errors.updatePatientError',
      }),
    )
  }
}

export default patientSlice.reducer
