import { Route, Switch } from 'react-router-dom'
import LifeCyclePage from 'pages/LifeCyclePage'
import UseStatePage from 'pages/UseStatePage'
import HomePage from '../pages/HomePage'
import routes from '../routes'

const Router = () => {
  return (
    <Switch>
      <Route exact path={routes.home.value} component={HomePage} />
      <Route exact path={routes.lifeCycle.value} component={LifeCyclePage} />
      <Route exact path={routes.useState.value} component={UseStatePage} />
    </Switch>
  )
}

export default Router
