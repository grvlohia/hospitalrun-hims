import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import PatientRepository from '../shared/db/PatientRepository'
import SortRequest, { Unsorted } from '../shared/db/SortRequest'
import Patient from '../shared/model/Patient'
import { AppThunk } from '../shared/store'

const patientRepository = new PatientRepository()

interface PatientsState {
  isLoading: boolean
  patients: Patient[]
  count: number
}

const initialState: PatientsState = {
  isLoading: false,
  patients: [],
  count: 0,
}

function startLoading(state: PatientsState) {
  state.isLoading = true
}

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    fetchPatientsStart: startLoading,
    fetchPatientsSuccess(state, { payload }: PayloadAction<Patient[]>) {
      state.isLoading = false
      state.patients = payload
    },
    fetchCountSuccess(state, { payload }: PayloadAction<number>) {
      state.count = payload
    },
  },
})

export const { fetchPatientsStart, fetchPatientsSuccess, fetchCountSuccess } = patientsSlice.actions

export const fetchPatients = (sortRequest: SortRequest = Unsorted): AppThunk => async (
  dispatch,
) => {
  dispatch(fetchPatientsStart())
  const patients = await patientRepository.findAll(sortRequest)
  dispatch(fetchPatientsSuccess(patients))
}

export const searchPatients = (searchString: string): AppThunk => async (dispatch) => {
  dispatch(fetchPatientsStart())

  let patients
  if (searchString.trim() === '') {
    patients = await patientRepository.findAll()
  } else {
    patients = await patientRepository.search(searchString)
  }
  const count = await patientRepository.count()
  dispatch(fetchCountSuccess(count))
  dispatch(fetchPatientsSuccess(patients))
}

export default patientsSlice.reducer
