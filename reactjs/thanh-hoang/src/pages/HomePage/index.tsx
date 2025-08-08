import { Link } from 'react-router-dom'
import routes from '../../routes'

const HomePage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🎓 React Hooks & Lifecycle Learning Hub</h1>

      <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
        <h2>Welcome to Interactive React Learning!</h2>
        <p>
          This educational app helps you understand React Hooks and Class Component Lifecycle methods through
          interactive examples and hands-on practice.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ border: '2px solid #4ecdc4', borderRadius: '10px', padding: '20px' }}>
          <h3>🎯 useState Hook</h3>
          <p>Learn how to manage state in functional components with proper and improper examples.</p>
          <Link
            to={routes.useState.value}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#4ecdc4',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '10px'
            }}
          >
            Explore useState →
          </Link>
        </div>

        <div style={{ border: '2px solid #667eea', borderRadius: '10px', padding: '20px' }}>
          <h3>⚡ useEffect Hook</h3>
          <p>Master side effects, dependencies, and cleanup functions in React functional components.</p>
          <Link
            to={routes.useEffect.value}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '10px'
            }}
          >
            Learn useEffect →
          </Link>
        </div>

        <div style={{ border: '2px solid #ff6b6b', borderRadius: '10px', padding: '20px' }}>
          <h3>🔄 Class Lifecycle</h3>
          <p>Understand traditional React class component lifecycle methods and when they're called.</p>
          <Link
            to={routes.lifeCycle.value}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '10px'
            }}
          >
            Study Lifecycle →
          </Link>
        </div>

        <div style={{ border: '2px solid #ffa726', borderRadius: '10px', padding: '20px' }}>
          <h3>⚖️ Hooks vs Lifecycle</h3>
          <p>Compare class components with functional components side-by-side to see the differences.</p>
          <Link
            to={routes.comparison.value}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#ffa726',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '10px'
            }}
          >
            Compare Both →
          </Link>
        </div>

        <div style={{ border: '2px solid #ff5722', borderRadius: '10px', padding: '20px' }}>
          <h3>⚠️ Common Pitfalls</h3>
          <p>Learn from common mistakes to avoid infinite loops, memory leaks, and other issues.</p>
          <Link
            to={routes.pitfalls.value}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#ff5722',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '10px'
            }}
          >
            Avoid Pitfalls →
          </Link>
        </div>

        <div style={{ border: '2px solid #9c27b0', borderRadius: '10px', padding: '20px' }}>
          <h3>🔧 Custom Hooks</h3>
          <p>Create reusable stateful logic with custom hooks like useCounter, useToggle, and more.</p>
          <Link
            to={routes.customHooks.value}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#9c27b0',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '10px'
            }}
          >
            Build Custom Hooks →
          </Link>
        </div>

        <div style={{ border: '2px solid #1976d2', borderRadius: '10px', padding: '20px' }}>
          <h3>🚀 React 18 Features</h3>
          <p>Explore the latest React 18 features: useTransition, useDeferredValue, useId, and Concurrent Features.</p>
          <Link
            to={routes.react18Features.value}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#1976d2',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '10px'
            }}
          >
            Discover React 18 →
          </Link>
        </div>

        <div style={{ border: '3px solid #2e7d32', borderRadius: '10px', padding: '20px', gridColumn: 'span 2' }}>
          <h3>📝 Todo App Practice</h3>
          <p>
            Put it all together! Build a complete todo application using multiple hooks: useState, useEffect, useMemo,
            useCallback, and useRef.
          </p>
          <Link
            to={routes.todoApp.value}
            style={{
              display: 'inline-block',
              padding: '15px 30px',
              backgroundColor: '#2e7d32',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '10px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Start Building! 🚀
          </Link>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff3e0', padding: '20px', borderRadius: '10px', marginTop: '30px' }}>
        <h2>📚 Learning Path Suggestion</h2>
        <ol>
          <li>
            <strong>Start with useState</strong> - Understand basic state management
          </li>
          <li>
            <strong>Learn useEffect</strong> - Master side effects and lifecycle equivalents
          </li>
          <li>
            <strong>Study Class Lifecycle</strong> - See how React traditionally worked
          </li>
          <li>
            <strong>Compare Both</strong> - Understand the migration from classes to hooks
          </li>
          <li>
            <strong>Avoid Pitfalls</strong> - Learn common mistakes and how to prevent them
          </li>
          <li>
            <strong>Build Custom Hooks</strong> - Create reusable logic
          </li>
          <li>
            <strong>Practice with Todo App</strong> - Apply everything you've learned!
          </li>
        </ol>
      </div>
    </div>
  )
}

export default HomePage
