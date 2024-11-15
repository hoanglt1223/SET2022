import { Route, Routes } from 'react-router-dom'
import LifeCyclePage from 'pages/LifeCyclePage'
import UseStatePage from 'pages/UseStatePage'
import HomePage from '../pages/HomePage'
import routes from '../routes'

// *Explain: Router component is a component that contains all the routes in the application.
// Router will receive url and render the corresponding component.
// Router will use the Routes component from react-router-dom to define the routes.
// Routes component will contain multiple Route components.
// Each Route component will have a path and element prop.

const Router = () => {
  return (
    <Routes>
      <Route path={routes.home.value} element={<HomePage />} />
      <Route path={routes.lifeCycle.value} element={<LifeCyclePage />} />
      <Route path={routes.useState.value} element={<UseStatePage />} />
    </Routes>
  )
}

export default Router
