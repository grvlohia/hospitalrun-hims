import { useMutation } from 'react-query'

import DbService from '../../shared/config/pouchdb'
import User from '../../shared/model/User'
import { uuid } from '../../shared/util/uuid'

interface AddStaffRequest {
  loginName: string
  permissions: string[]
  user: User
}

const addStaffMember = async (request: AddStaffRequest) => {
  const remoteDb = DbService.getServerDb()
  const userDbString = `userdb-${Buffer.from(request.user.username).toString('hex')}`
  try {
    const response = await remoteDb.put({
      _id: uuid(),
      innodata: {
        sourceDb: userDbString,
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
