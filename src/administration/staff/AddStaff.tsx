import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs'
import Staff from '../../shared/model/Staff'
import { RootState } from '../../shared/store'
import useAddStaffMember from '../hooks/useAddStaffMember'
import { StaffError, validateStaff } from '../util/validate-staff'
import StaffForm from './StaffForm'

const breadcrumbs = [
  { i18nKey: 'administration.dashboard', location: '/administration' },
  { i18nKey: 'administration.staffManagement.add', location: '/administration/staff/new' },
]

const AddStaff = () => {
  useAddBreadcrumbs(breadcrumbs, false)
  const history = useHistory()
  const currentUser = useSelector((state: RootState) => state.user.user)
  const [mutate] = useAddStaffMember()

  const [newStaffMember, setNewStaffMember] = useState<Partial<Staff>>({})
  const [staffError, setStaffError] = useState<StaffError>({})

  const onFieldChange = (fieldName: string, value: string) => {
    setNewStaffMember({
      ...newStaffMember,
      [fieldName]: value,
    })
  }

  const onRoleChange = (newRoles: string[]) => {
    setNewStaffMember({
      ...newStaffMember,
      roles: newRoles,
    })
  }

  if (!currentUser) {
    return <h1>Not Logged in as Admin User</h1>
  }

  const onCreateStaff = async () => {
    const error = await validateStaff(newStaffMember as Staff)
    if (isEmpty(error)) {
      try {
        await mutate({ currentUser, newStaffMember: newStaffMember as Staff })
        history.push('/administration/staff')
      } catch (e) {
        console.log(e)
      }
    } else {
      setStaffError(error)
    }
  }

  const onCancel = () => {
    history.push('/administration/staff')
  }

  return (
    <StaffForm
      staffMember={newStaffMember}
      onFieldChange={onFieldChange}
      onRoleChange={onRoleChange}
      onSave={onCreateStaff}
      onCancel={onCancel}
      staffError={staffError}
    />
  )
}

export default AddStaff
