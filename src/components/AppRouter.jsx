import React from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { routes } from '../router'

const AppRouter = () => {
  return (
    <Switch>
      {routes.map(route =>
        <Route
          component={route.component}
          path={route.path}
          exact={route.exact}
          key={route.component}
        />
      )}
      <Redirect to="/posts" />
      </Switch>
  )
}

export default AppRouter
