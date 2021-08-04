import { Button } from '@hospitalrun/components'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import useAddBreadcrumbs from '../../../page-header/breadcrumbs/useAddBreadcrumbs'
import { useButtonToolbarSetter } from '../../../page-header/button-toolbar/ButtonBarProvider'
import { useUpdateTitle } from '../../../page-header/title/TitleContext'
import useTranslator from '../../../shared/hooks/useTranslator'
import SearchStaffs from './SearchStaffs'

const breadcrumbs = [
  { i18nKey: 'administration.dashboard', location: '/administration' },
  { i18nKey: 'administration.staffManagement.label', location: '/administration/staff' },
]

const ViewStaffs = () => {
  const { t } = useTranslator()
  const history = useHistory()
  const updateTitle = useUpdateTitle()
  const dispatch = useDispatch()
  const setButtonToolBar = useButtonToolbarSetter()

  useEffect(() => {
    updateTitle(t('staff.label'))
  })

  useAddBreadcrumbs(breadcrumbs, false)

  useEffect(() => {
    setButtonToolBar([
      <Button
        key="newStaffButton"
        outlined
        color="success"
        icon="patient-add"
        onClick={() => history.push('/administration/staff/new')}
      >
        {t('administration.staffManagement.add')}
      </Button>,
    ])
    return () => {
      setButtonToolBar([])
    }
  }, [dispatch, setButtonToolBar, t, history])

  return <SearchStaffs />
}

export default ViewStaffs
