import { Button, Column, Container, Row } from '@hospitalrun/components'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import TextInputWithLabelFormGroup from '../shared/components/input/TextInputWithLabelFormGroup'
import Constants from '../shared/Constants'
import { RootState } from '../shared/store'
import useAddStaffMember from './hooks/useAddStaffMember'

const AddStaff = () => {
  const currentUser = useSelector((state: RootState) => state.user.user)
  const [mutate] = useAddStaffMember()
  const [loginName, setLoginName] = useState('')
  const [staffRoles, setStaffRoles] = useState(
    Object.entries(Constants.STAFF_ROLES).map((module) => ({
      label: module[0],
      value: module[1],
      checked: false,
    })),
  )

  if (!currentUser) {
    return <h1>Not Logged in as Admin User</h1>
  }

  const onPermissionChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStaffRoles(
      [...staffRoles].map((role) => {
        if (role.value === e.target.value) {
          role.checked = !role.checked
        }
        return role
      }),
    )
  }

  const onCreateStaff = async () => {
    const roles = staffRoles.filter((role) => role.checked).map((role) => role.value)

    mutate({ loginName, permissions: roles, user: currentUser })
  }

  return (
    <form>
      <Container>
        <h1>Add New Staff Member</h1>
        <Row>
          <Column>
            <TextInputWithLabelFormGroup
              label="Login Name"
              name="loginName"
              isRequired
              onChange={(e) => setLoginName(e.target.value)}
              value={loginName}
              isEditable
            />
          </Column>
        </Row>
        <Row>
          {staffRoles.map((role) => (
            <Column lg={4} key={role.label}>
              <div>
                <input
                  type="checkbox"
                  value={role.value}
                  onChange={onPermissionChecked}
                  id={role.label}
                />
                <label htmlFor={role.label}>{role.label}</label>
              </div>
            </Column>
          ))}
        </Row>
        <Button color="primary" onClick={onCreateStaff}>
          Create
        </Button>
      </Container>
    </form>
  )
}

export default AddStaff
