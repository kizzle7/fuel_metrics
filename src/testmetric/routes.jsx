import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './login'
import Drivers from './drivers'




export default function
App (props) {

  return (
    <div>
        <Router>
          <Switch>
            <Route path='/' exact component={Login} />{' '}
            <Route path='/drivers' exact component={Drivers} />{' '}

          </Switch>{' '}
        </Router>{' '}
    </div>
  )
}
