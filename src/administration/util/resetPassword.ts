import axios from 'axios'

import constants from '../../shared/constants'

// import constants from '../../shared/constants'

export async function resetPassword(loginName: string) {
  let emailSent = false
  try {
    const response = await axios.post(
      `${constants.USER_SERVICE_URL}/api/v1/user/password/reset/init`,
      {
        loginName: `${loginName}@${process.env.REACT_APP_TENANT_DOMAIN}`,
      },
    )
    if (response.status === 200) {
      emailSent = true
    }
  } catch (error) {
    emailSent = false
  }
  return emailSent
}
