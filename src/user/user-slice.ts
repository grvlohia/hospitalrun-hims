/* eslint-disable no-underscore-dangle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import DbService from '../shared/config/pouchdb'
import Permissions from '../shared/model/Permissions'
import User from '../shared/model/User'
import { AppThunk } from '../shared/store'

export interface LoginError {
  message?: string
  username?: string
  password?: string
}

export interface UserState {
  permissions: (Permissions | null)[]
  user?: User | null
  loginError?: LoginError
  modules: string[]
}

// const initialState: UserState = {
//   user: {
//     givenName: 'HospitalRun',
//     familyName: 'Test',
//     fullName: 'HospitalRun Test',
//     id: 'test-hospitalrun',
//   },
//   permissions: [
//     Permissions.ReadPatients,
//     Permissions.WritePatients,
//     Permissions.ReadAppointments,
//     Permissions.WriteAppointments,
//     Permissions.DeleteAppointment,
//     Permissions.AddAllergy,
//     Permissions.AddDiagnosis,
//     Permissions.ViewLabs,
//     Permissions.ViewLab,
//     Permissions.RequestLab,
//     Permissions.CompleteLab,
//     Permissions.CancelLab,
//     Permissions.ViewIncident,
//     Permissions.ViewIncidents,
//     Permissions.ReportIncident,
//     Permissions.ResolveIncident,
//     Permissions.ViewIncidentWidgets,
//     Permissions.AddCarePlan,
//     Permissions.ReadCarePlan,
//     Permissions.AddCareGoal,
//     Permissions.ReadCareGoal,
//     Permissions.RequestMedication,
//     Permissions.CompleteMedication,
//     Permissions.CancelMedication,
//     Permissions.ViewMedications,
//     Permissions.ViewMedication,
//     Permissions.AddVisit,
//     Permissions.ReadVisits,
//     Permissions.ViewImagings,
//     Permissions.RequestImaging,
//     // new permissions added below
//     Permissions.AddMedicine,
//   ],
// }
const initialState: UserState = {
  user: null,
  permissions: [
    Permissions.ReadPatients,
    Permissions.WritePatients,
    Permissions.ReadAppointments,
    Permissions.WriteAppointments,
    Permissions.DeleteAppointment,
    Permissions.AddAllergy,
    Permissions.AddDiagnosis,
    Permissions.ViewLabs,
    Permissions.ViewLab,
    Permissions.RequestLab,
    Permissions.CompleteLab,
    Permissions.CancelLab,
    Permissions.ViewIncident,
    Permissions.ViewIncidents,
    Permissions.ReportIncident,
    Permissions.ResolveIncident,
    Permissions.ViewIncidentWidgets,
    Permissions.AddCarePlan,
    Permissions.ReadCarePlan,
    Permissions.AddCareGoal,
    Permissions.ReadCareGoal,
    Permissions.RequestMedication,
    Permissions.CompleteMedication,
    Permissions.CancelMedication,
    Permissions.ViewMedications,
    Permissions.ViewMedication,
    Permissions.AddVisit,
    Permissions.ReadVisits,
    Permissions.ViewImagings,
    Permissions.RequestImaging,
    // new permissions added below
    Permissions.AddMedicine,
  ],
  modules: [],
}

interface UserConfiguration {
  modules: {
    enabled: string[]
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchPermissions(state, { payload }: PayloadAction<Permissions[]>) {
      state.permissions = payload
    },
    loginSuccess(
      state,
      {
        payload,
      }: PayloadAction<{
        user: User
        permissions: (Permissions | null)[]
        modules: string[]
      }>,
    ) {
      state.user = payload.user
      state.permissions = payload.permissions
      state.modules = payload.modules
    },
    loginError(state, { payload }: PayloadAction<LoginError>) {
      state.loginError = payload
    },
    logoutSuccess(state) {
      state.user = undefined
      state.permissions = []
    },
  },
})

export const { fetchPermissions, loginError, loginSuccess, logoutSuccess } = userSlice.actions

export const getCurrentSession = (username: string): AppThunk => async (dispatch) => {
  const remoteDb = DbService.getServerDb()
  const user = await remoteDb.getUser(username)
  dispatch(
    loginSuccess({
      user: {
        id: user._id,
        username: user.name,
        givenName: (user as any).metadata.givenName,
        familyName: (user as any).metadata.familyName,
      },
      permissions: initialState.permissions,
      modules: initialState.modules,
    }),
  )
}

export const login = (username: string, password: string): AppThunk => async (dispatch) => {
  // configure remoteDb for user
  DbService.configureForUser(username, password)
  // login
  const remoteDb = DbService.getServerDb()
  try {
    const response = await remoteDb.logIn(username, password)
    // const user = await remoteDb.getUser(response.name)
    const config = await remoteDb.get<UserConfiguration>('user_ui_configuration')
    // check if the logged in user is same as previous logged in user
    // if not same then destroy and recreate localDb
    await DbService.recreateLocalDb()
    DbService.startSyncing()
    dispatch(
      loginSuccess({
        user: {
          id: `org.couchdb.user:${response.name}`,
          username: response.name,
          // givenName: (user as any).metadata.givenName,
          // familyName: (user as any).metadata.familyName,
        },
        permissions: initialState.permissions,
        modules: config.modules.enabled,
      }),
    )
  } catch (error) {
    DbService.teardownServerDb()
    if (!username) {
      dispatch(
        loginError({
          message: 'user.login.error.message.required',
          username: 'user.login.error.username.required',
        }),
      )
    } else if (!password) {
      dispatch(
        loginError({
          message: 'user.login.error.message.required',
          password: 'user.login.error.password.required',
        }),
      )
    } else if (error.status === 401) {
      dispatch(
        loginError({
          message: 'user.login.error.message.incorrect',
        }),
      )
    } else if (error.status === 404) {
      dispatch(
        loginError({
          message: 'user.login.error.message.serverNotResponding',
        }),
      )
    }
  }
}

export const logout = (): AppThunk => async (dispatch) => {
  const remoteDb = DbService.getServerDb()
  if (remoteDb) {
    await remoteDb.logOut()
    // DbService.destroyLocalDb()
    dispatch(logoutSuccess())
  }
}

export default userSlice.reducer
