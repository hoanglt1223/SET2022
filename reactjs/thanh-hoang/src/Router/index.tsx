import { Routes, Route } from 'react-router-dom'
import LifeCyclePage from 'pages/LifeCyclePage'
import UseStatePage from 'pages/UseStatePage'
import UseEffectPage from 'pages/UseEffectPage'
import ComparisonPage from 'pages/ComparisonPage'
import PitfallsPage from 'pages/PitfallsPage'
import CustomHooksPage from 'pages/CustomHooksPage'
import React18FeaturesPage from 'pages/React18FeaturesPage'
import TodoApp from 'pages/TodoApp'
import HomePage from '../pages/HomePage'
import Navigation from '../components/Navigation'
import routes from '../routes'

const Router = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path={routes.home.value} element={<HomePage />} />
        <Route path={routes.useState.value} element={<UseStatePage />} />
        <Route path={routes.useEffect.value} element={<UseEffectPage />} />
        <Route path={routes.lifeCycle.value} element={<LifeCyclePage />} />
        <Route path={routes.comparison.value} element={<ComparisonPage />} />
        <Route path={routes.pitfalls.value} element={<PitfallsPage />} />
        <Route path={routes.customHooks.value} element={<CustomHooksPage />} />
        <Route path={routes.react18Features.value} element={<React18FeaturesPage />} />
        <Route path={routes.todoApp.value} element={<TodoApp />} />
      </Routes>
    </>
  )
}

export default Router
