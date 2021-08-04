import { Constants } from '@innohealthtech/common-constants'
import { useMutation } from 'react-query'

import DbService from '../../shared/config/pouchdb'
import StaffRepository from '../../shared/db/StaffRepository'
import Staff from '../../shared/model/Staff'
import User from '../../shared/model/User'
import { uuid } from '../../shared/util/uuid'

interface AddStaffRequest {
  newStaffMember: Staff
  currentUser: User
}

const addStaffMember = async (request: AddStaffRequest) => {
  const localUserDb = DbService.getLocalDb()
  const userDbString = `userdb-${Buffer.from(request.currentUser.username).toString('hex')}`
  try {
    await localUserDb.put({
      _id: uuid(),
      innodata: {
        sourceDb: userDbString,
        type: Constants.replicationCommands.CREATE_STAFF,
        loginName: request.newStaffMember.loginName,
        primaryEmail: request.newStaffMember.primaryEmail,
        primaryMobile: request.newStaffMember.primaryMobile,
        roles: request.newStaffMember.roles,
        domain: process.env.REACT_APP_TENANT_DOMAIN,
        tenantId: process.env.REACT_APP_TENANT_ID,
      },
    })
  } catch (error) {
    console.log(`[AddStaffMemberError]: ${error}`)
    throw error
  }

  try {
    const response = await StaffRepository.save(request.newStaffMember)
    return response
  } catch (e) {
    console.log(e)
    throw e
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
