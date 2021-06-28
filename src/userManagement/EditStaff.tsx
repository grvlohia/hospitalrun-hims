import React from 'react'

import useAddBreadcrumbs from '../page-header/breadcrumbs/useAddBreadcrumbs'

const breadcrumbs = [
  { i18nKey: 'administration.dashboard', location: '/administration' },
  { i18nKey: 'administration.editStaff', location: '/administration/editStaff' },
]

const EditStaff = () => {
  useAddBreadcrumbs(breadcrumbs)
  return <h1>Edit Staff Component</h1>
}

export default EditStaff
