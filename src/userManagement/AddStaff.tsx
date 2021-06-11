import { Column, Container, Row } from '@hospitalrun/components'
import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import TextInputWithLabelFormGroup from '../shared/components/input/TextInputWithLabelFormGroup'
import ModulePermissions from '../shared/model/ModulePermissions'
import { RootState } from '../shared/store'
import useAddStaffMember from './hooks/useAddStaffMember'

const AddStaff = () => {
  const currentUser = useSelector((state: RootState) => state.user.user)
  const [mutate] = useAddStaffMember()
  const [loginName, setLoginName] = useState('')
  const [modulePermissions, setModulePermissions] = useState(
    Object.entries(ModulePermissions).map((module) => ({
      label: module[0],
      value: module[1],
      checked: false,
    })),
  )

  if (!currentUser) {
    return <h1>Not Logged in as Admin User</h1>
  }

  const onPermissionChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModulePermissions(
      [...modulePermissions].map((module) => {
        if (module.value === e.target.value) {
          module.checked = !module.checked
        }
        return module
      }),
    )
  }

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const permittedModules = modulePermissions
      .filter((module) => module.checked)
      .map((obj) => obj.value)

    mutate({ loginName, permissions: permittedModules, user: currentUser })
  }
  //   '{
  //     "_id": "${uuid}", // will be generated
  //     "innodata": {
  //       "sourceDb": "${userdb}", // have to get from the currently logged in tenant. Will also have to check if the presently logged in user is the tenant-admin
  //       "type": "create_staff", // constant
  //       "loginName": "${username}", // get from UI
  //       "domain": "${domain}", // must be saved in a global varible / environment variable
  //       "tenantId": "${tenantId}", // same as above
  //       "roles": [
  //         "doctor" // will get from UI
  //       ]
  //     }
  //   }'
  return (
    <form onSubmit={formSubmitHandler}>
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
          <Column>
            {modulePermissions.map((module) => (
              <Card key={module.value}>
                <input type="checkbox" value={module.value} onChange={onPermissionChecked} />
                <label>{module.label}</label>
              </Card>
            ))}
          </Column>
        </Row>
        <button type="submit">Create</button>
      </Container>
    </form>
  )
}

export default AddStaff
