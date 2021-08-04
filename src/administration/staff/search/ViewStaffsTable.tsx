import { Table, Toast } from '@hospitalrun/components'
import React from 'react'
import { useHistory } from 'react-router'

import Loading from '../../../shared/components/Loading'
import useTranslator from '../../../shared/hooks/useTranslator'
import useStaffs from '../../hooks/useStaffs'
import StaffSearchRequest from '../../models/StaffSearchRequest'
import { resetPassword } from '../../util/resetPassword'

interface Props {
  searchRequest: StaffSearchRequest
}

const ViewStaffsTable = (props: Props) => {
  const { searchRequest } = props
  const history = useHistory()
  const { t } = useTranslator()
  const { data, status } = useStaffs(searchRequest)

  if (data === undefined || status === 'loading') {
    return <Loading />
  }

  if (data.totalCount === 0) {
    // TODO: Add <NoStaffExist> component
    return <h3>No Staff Members Added</h3>
  }

  return (
    <Table
      data={data.staffs}
      getID={(row) => row.id}
      columns={[
        { label: t('staff.code'), key: 'code' },
        { label: t('staff.loginName'), key: 'loginName' },
        { label: t('staff.primaryEmail'), key: 'primaryEmail' },
        { label: t('staff.primaryMobile'), key: 'primaryMobile' },
      ]}
      actionsHeaderText={t('actions.label')}
      actions={[
        {
          label: t('actions.edit'),
          action: (row) => history.push(`/administration/staff/${row.id}/edit`),
          buttonColor: 'secondary',
        },
        {
          label: 'Reset Password',
          action: async (row) => {
            const emailSent = await resetPassword(row.loginName)
            if (emailSent) {
              Toast(
                'success',
                'Success',
                `Password reset email sent successfully to ${row.primaryEmail}`,
              )
            } else {
              Toast('failure', 'Success', `Server Error. Please try again later or contact admin`)
            }
          },
          buttonColor: 'primary',
        },
      ]}
    />
  )
}

export default ViewStaffsTable
