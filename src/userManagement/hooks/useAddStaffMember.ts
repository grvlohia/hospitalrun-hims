import PouchDb from 'pouchdb'
import { useMutation } from 'react-query'

import User from '../../shared/model/User'
import { uuid } from '../../shared/util/uuid'

interface AddStaffRequest {
  loginName: string
  permissions: string[]
  user: User
}

const addStaffMember = async (request: AddStaffRequest) => {
  const userDb = new PouchDb(`${process.env.REACT_APP_REMOTE_COUCHDB}/${request.user.userdb}`)
  try {
    const response = await userDb.put({
      _id: uuid(),
      innodata: {
        sourceDb: request.user.userdb,
        type: 'create_staff',
        loginName: request.loginName,
        domain: process.env.REACT_APP_TENANT_DOMAIN,
        tenantId: process.env.REACT_APP_TENANT_ID,
        roles: request.permissions,
      },
    })
    return response
  } catch (error) {
    console.log(`[AddStaffMemberError]: ${error}`)
    throw error
  }
}

export default function useAddStaffMember() {
  return useMutation(addStaffMember, {
    onSuccess: async (data, variables) => {
      console.log(data)
      console.log(variables)
    },
  })
}
