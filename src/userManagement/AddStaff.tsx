import { Button, Column, Container, Label, Row } from '@hospitalrun/components'
import CommonConstants from '@innohealthtech/common-constants'
import React, { CSSProperties, useState } from 'react'
import { useSelector } from 'react-redux'

import useAddBreadcrumbs from '../page-header/breadcrumbs/useAddBreadcrumbs'
import TextInputWithLabelFormGroup from '../shared/components/input/TextInputWithLabelFormGroup'
import { RootState } from '../shared/store'
import useAddStaffMember from './hooks/useAddStaffMember'

const breadcrumbs = [
  { i18nKey: 'administration.dashboard', location: '/administration' },
  { i18nKey: 'administration.addStaff', location: '/administration/addStaff' },
]

const AddStaff = () => {
  useAddBreadcrumbs(breadcrumbs, false)
  const currentUser = useSelector((state: RootState) => state.user.user)
  const [mutate] = useAddStaffMember()

  const [loginName, setLoginName] = useState('')
  const [primaryEmail, setPrimaryEmail] = useState('')
  const [primaryMobile, setPrimaryMobile] = useState('')
  const [staffRoles, setStaffRoles] = useState(
    Object.entries(CommonConstants.Constants.STAFF_ROLES).map((elem) => ({
      label: elem[0],
      value: elem[1],
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

    mutate({ loginName, roles, user: currentUser, primaryEmail, primaryMobile })
  }

  const staffRollCardStyle: CSSProperties = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '0.25rem',
    marginBottom: '15px',
    padding: '10px',
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
          <Column>
            <TextInputWithLabelFormGroup
              label="Primary Mobile"
              name="primaryMobile"
              isRequired
              onChange={(e) => setPrimaryMobile(e.target.value)}
              value={primaryMobile}
              isEditable
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextInputWithLabelFormGroup
              label="Primary Email"
              name="primaryEmail"
              isRequired
              onChange={(e) => setPrimaryEmail(e.target.value)}
              value={primaryEmail}
              isEditable
            />
          </Column>
        </Row>
        <Label text="Roles" isRequired />
        <Row>
          {staffRoles.map((role) => (
            <Column lg={4} md={6} key={role.label}>
              <div style={staffRollCardStyle}>
                <input
                  type="checkbox"
                  value={role.value}
                  onChange={onPermissionChecked}
                  id={role.label}
                  style={{ marginRight: '15px' }}
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
