import axios from 'axios'

import constants from '../../shared/constants'
import Staff from '../../shared/model/Staff'

export interface StaffError {
  message?: string
  loginName?: string
  primaryMobile?: string
  primaryEmail?: string
  roles?: string
}

export const validateStaff = async (staff: Staff) => {
  const error: StaffError = {}

  if (!staff.loginName) {
    error.loginName = 'loginName must be entered.'
  }
  if (!staff.primaryMobile) {
    error.primaryMobile = 'primaryMobile must be entered.'
  }

  if (!staff.primaryEmail) {
    error.primaryEmail = 'primaryEmail must be entered.'
  }

  if (!staff.roles || (staff.roles && staff.roles.length === 0)) {
    error.roles = 'At least one role must be selected.'
  }

  if (staff.loginName && !/^[a-z][_0-9a-z]+[0-9a-z]$/.test(staff.loginName)) {
    error.loginName =
      'loginName must contain only alphanumeric characters and underscore. Also it must not begin with underscore or a digit'
  }

  if (!error.loginName) {
    const response = await axios.post(`${constants.USER_SERVICE_URL}/api/v1/user/username/verify`, {
      loginName: staff.loginName,
      domain: process.env.REACT_APP_TENANT_DOMAIN,
    })
    if (response.status === 200 && response.data && response.data.loginNameRegistered) {
      error.loginName = 'loginName is registered with another user.'
    }
  }

  if (!error.primaryEmail) {
    const response = await axios.post(`${constants.USER_SERVICE_URL}/api/v1/user/email/verify`, {
      email: staff.primaryEmail,
      tenantId: process.env.REACT_APP_TENANT_ID,
    })
    if (response.status === 200 && response.data && response.data.emailRegistered) {
      error.primaryEmail = 'This email is already registered with another user.'
    }
  }

  return error
}
