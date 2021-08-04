import React from 'react'
import { Switch } from 'react-router-dom'

import PrivateRoute from '../shared/components/PrivateRoute'
import Dashboard from './Dashboard'
import AddStaff from './staff/AddStaff'
import EditStaff from './staff/EditStaff'
import ViewStaffs from './staff/search/ViewStaffs'

const Administration = () => {
  const isAdmin = true
  return (
    <Switch>
      <PrivateRoute isAuthenticated={isAdmin} exact path="/administration" component={Dashboard} />
      <PrivateRoute
        isAuthenticated={isAdmin}
        exact
        path="/administration/staff"
        component={ViewStaffs}
      />
      <PrivateRoute
        isAuthenticated={isAdmin}
        exact
        path="/administration/staff/new"
        component={AddStaff}
      />
      <PrivateRoute
        isAuthenticated={isAdmin}
        path="/administration/staff/:id/edit"
        component={EditStaff}
      />
    </Switch>
  )
}

export default Administration
