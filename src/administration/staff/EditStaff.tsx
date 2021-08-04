import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs'
import Loading from '../../shared/components/Loading'
import Staff from '../../shared/model/Staff'
import useEditStaff from '../hooks/useEditStaff'
import useStaff from '../hooks/useStaff'
import EditStaffForm from './EditStaffForm'

const EditStaff = () => {
  const { id } = useParams()
  const breadcrumbs = [
    { i18nKey: 'administration.dashboard', location: '/administration' },
    {
      i18nKey: 'administration.staffManagement.edit',
      location: `/administration/staff/${id}/edit`,
    },
  ]
  const history = useHistory()
  const { data: givenStaff, status } = useStaff(id)
  const [mutate] = useEditStaff()
  useAddBreadcrumbs(breadcrumbs)

  const [staffMember, setStaffMember] = useState({} as Staff)

  useEffect(() => {
    setStaffMember(givenStaff || ({} as Staff))
  }, [givenStaff])

  const onFieldChange = (fieldName: string, value: string) => {
    setStaffMember({
      ...staffMember,
      [fieldName]: value,
    })
  }

  const onRoleChange = (newRoles: string[]) => {
    setStaffMember({
      ...staffMember,
      roles: newRoles,
    })
  }

  const onSave = async () => {
    try {
      await mutate(staffMember)
      history.push('/administration/staff')
    } catch (e) {
      console.log(e)
    }
  }

  const onCancel = () => {
    history.push('/administration/staff')
  }

  if (status === 'loading') {
    return <Loading />
  }
  return (
    <EditStaffForm
      staffMember={staffMember}
      staffError={{}}
      onFieldChange={onFieldChange}
      onRoleChange={onRoleChange}
      onSave={onSave}
      onCancel={onCancel}
    />
  )
}

export default EditStaff
