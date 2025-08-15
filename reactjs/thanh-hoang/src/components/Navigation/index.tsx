import { Link } from 'react-router-dom'
import routes from '../../routes'
import './Navigation.css'

const Navigation = () => {
  return (
    <nav className="navigation">
      <h2>React Hooks & Lifecycle Examples</h2>
      <ul className="nav-links">
        <li>
          <Link to={routes.home.value}>🏠 Home</Link>
        </li>
        <li>
          <Link to={routes.useState.value}>🎯 useState Hook</Link>
        </li>
        <li>
          <Link to={routes.useEffect.value}>⚡ useEffect Hook</Link>
        </li>
        <li>
          <Link to={routes.lifeCycle.value}>🔄 Class Lifecycle</Link>
        </li>
        <li>
          <Link to={routes.comparison.value}>⚖️ Hooks vs Lifecycle</Link>
        </li>
        <li>
          <Link to={routes.pitfalls.value}>⚠️ Common Pitfalls</Link>
        </li>
        <li>
          <Link to={routes.customHooks.value}>🔧 Custom Hooks</Link>
        </li>
        <li>
          <Link to={routes.react18Features.value}>🚀 React 18 Features</Link>
        </li>
        <li>
          <Link to={routes.usefulPackages.value}>📦 Useful Packages</Link>
        </li>
        <li>
          <Link to={routes.stateManagement.value}>🗃️ State Management</Link>
        </li>
        <li>
          <Link to={routes.todoApp.value}>📝 Todo App (Practice)</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
