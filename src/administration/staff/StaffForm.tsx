import { Alert, Button, Column, Container, Label, Row } from '@hospitalrun/components'
import { Constants } from '@innohealthtech/common-constants'
import React, { CSSProperties, useEffect, useState } from 'react'

import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import Staff from '../../shared/model/Staff'
import { StaffError } from '../util/validate-staff'

interface Props {
  staffMember: Partial<Staff>
  staffError: StaffError
  onFieldChange: (fieldName: string, value: string) => void
  onRoleChange: (newRoles: string[]) => void
  onSave: () => void
  onCancel: () => void
  disabled?: boolean
}

const StaffForm = (props: Props) => {
  const { staffMember, staffError, onFieldChange, onRoleChange, onSave, onCancel, disabled } = props
  const [staffRoles, setStaffRoles] = useState(
    Object.entries(Constants.STAFF_ROLES).map((role) => ({
      label: role[0],
      value: role[1],
      checked: false,
    })),
  )

  const onRoleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStaffRoles(
      [...staffRoles].map((role) => {
        if (role.value === e.target.value) {
          role.checked = !role.checked
        }
        return role
      }),
    )

    const selectedRoles = staffRoles.filter((role) => role.checked).map((role) => role.value)
    onRoleChange(selectedRoles)
  }

  const staffRollCardStyle: CSSProperties = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '0.25rem',
    marginBottom: '15px',
    padding: '10px',
  }

  useEffect(() => {
    setStaffRoles((prevState) =>
      [...prevState].map((role) => ({
        ...role,
        checked: !!staffMember.roles?.includes(role.value),
      })),
    )
  }, [staffMember])

  return (
    <form>
      <Container>
        <Row>
          <Column>
            <TextInputWithLabelFormGroup
              label="Login Name"
              name="loginName"
              isRequired
              onChange={(e) => onFieldChange('loginName', e.target.value)}
              value={staffMember.loginName}
              isEditable={!disabled}
              isInvalid={!!staffError.loginName}
              feedback={staffError.loginName}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextInputWithLabelFormGroup
              label="Primary Mobile"
              name="primaryMobile"
              isRequired
              onChange={(e) => onFieldChange('primaryMobile', e.target.value)}
              value={staffMember.primaryMobile}
              isEditable={!disabled}
              isInvalid={!!staffError.primaryMobile}
              feedback={staffError.primaryMobile}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <TextInputWithLabelFormGroup
              label="Primary Email"
              name="primaryEmail"
              isRequired
              onChange={(e) => onFieldChange('primaryEmail', e.target.value)}
              value={staffMember.primaryEmail}
              isEditable={!disabled}
              isInvalid={!!staffError.primaryEmail}
              feedback={staffError.primaryEmail}
            />
          </Column>
        </Row>
        <Row>
          <Row>
            <Column>
              <Label text="Roles" isRequired />
            </Column>
          </Row>
          <Row>
            <Column>
              {staffError.roles ? <Alert color="danger" message={staffError.roles} /> : null}
            </Column>
          </Row>
          <Row>
            {staffRoles.map((role) => (
              <Column lg={4} md={6} key={role.label}>
                <div style={staffRollCardStyle}>
                  <input
                    type="checkbox"
                    checked={role.checked}
                    value={role.value}
                    onChange={onRoleChecked}
                    id={role.label}
                    style={{ marginRight: '15px' }}
                    disabled={disabled}
                  />
                  <label htmlFor={role.label}>{role.label}</label>
                </div>
              </Column>
            ))}
          </Row>
        </Row>
        <Button color="primary" onClick={onSave}>
          Save
        </Button>
        <Button color="danger" onClick={onCancel}>
          Cancel
        </Button>
      </Container>
    </form>
  )
}

export default StaffForm
