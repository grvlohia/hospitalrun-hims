import React from 'react'
import { Switch } from 'react-router-dom'

import PrivateRoute from '../shared/components/PrivateRoute'
import AddStaff from './AddStaff'
import Dashboard from './Dashboard'

const UserManagement = () => {
  const isAdmin = true
  return (
    <Switch>
      <PrivateRoute isAuthenticated={isAdmin} exact path="/usermanagement" component={Dashboard} />
      <PrivateRoute
        isAuthenticated={isAdmin}
        exact
        path="/usermanagement/addStaff"
        component={AddStaff}
      />
    </Switch>
  )
}

export default UserManagement
