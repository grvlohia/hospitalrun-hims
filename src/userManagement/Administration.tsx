import React from 'react'
import { Switch } from 'react-router-dom'

import PrivateRoute from '../shared/components/PrivateRoute'
import AddStaff from './AddStaff'
import Dashboard from './Dashboard'

const Administration = () => {
  const isAdmin = true
  return (
    <Switch>
      <PrivateRoute isAuthenticated={isAdmin} exact path="/administration" component={Dashboard} />
      <PrivateRoute
        isAuthenticated={isAdmin}
        exact
        path="/administration/addStaff"
        component={AddStaff}
      />
    </Switch>
  )
}

export default Administration
