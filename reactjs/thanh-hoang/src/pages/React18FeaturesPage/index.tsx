import React, { useState, useTransition, useDeferredValue, useId, Suspense, useEffect } from 'react'
import ErrorBoundary from '../../components/ErrorBoundary'

const React18FeaturesPage = () => {
  const [input, setInput] = useState('')
  const [isPending, startTransition] = useTransition()
  const deferredInput = useDeferredValue(input)
  const id = useId()

  // Simulated heavy computation
  const HeavyList = ({ searchTerm }: { searchTerm: string }) => {
    const items = []
    // Simulate generating many items based on search
    for (let i = 0; i < 20000; i++) {
      if (searchTerm === '' || `Item ${i}`.includes(searchTerm)) {
        items.push(`Item ${i} - ${searchTerm}`)
      }
    }

    return (
      <div style={{ maxHeight: '300px', overflow: 'auto', border: '1px solid #ccc' }}>
        {items.slice(0, 100).map((item, index) => (
          <div key={index} style={{ padding: '2px 8px' }}>
            {item}
          </div>
        ))}
        {items.length > 100 && <div style={{ padding: '8px', fontStyle: 'italic' }}>...and {items.length - 100} more items</div>}
      </div>
    )
  }

  const LazyComponent = () => {
    // Simulate loading delay
    const [loaded, setLoaded] = useState(false)

    if (!loaded) {
      setTimeout(() => setLoaded(true), 2000)
      throw new Promise(resolve => setTimeout(resolve, 2000))
    }

    return (
      <div style={{ padding: '20px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
        <h4>🎉 Lazy Component Loaded!</h4>
        <p>This component was loaded with Suspense and took 2 seconds to "fetch" its data.</p>
      </div>
    )
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    // Use transition for non-urgent updates
    startTransition(() => {
      // This could be a heavy operation like filtering a large list
      console.log('Transitioning to new value:', value)
    })
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 React 18 New Features</h1>
      <p>
        <em>Explore the exciting new features that React 18 brings to the table!</em>
      </p>

      {/* useTransition Example */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #667eea', borderRadius: '8px' }}>
        <h3>⚡ useTransition Hook</h3>
        <p>
          <strong>Purpose:</strong> Mark updates as non-urgent to keep the UI responsive during heavy computations.
        </p>

        <label htmlFor={`${id}-transition-input`}>
          Search (try typing quickly):
        </label>
        <input
          id={`${id}-transition-input`}
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Type to search..."
          style={{
            padding: '8px',
            margin: '10px 0',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />

        {isPending && (
          <div style={{ color: '#667eea', fontWeight: 'bold' }}>
            🔄 Transitioning... (UI stays responsive)
          </div>
        )}

        <details style={{ marginTop: '10px' }}>
          <summary>View Code Example</summary>
          <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
{`const [isPending, startTransition] = useTransition()

const handleInputChange = (value) => {
  setInput(value)

  // Mark this update as non-urgent
  startTransition(() => {
    // Heavy computation here won't block the UI
    updateHeavyList(value)
  })
}`}
          </pre>
        </details>
      </div>

      {/* useDeferredValue Example */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #4ecdc4', borderRadius: '8px' }}>
        <h3>⏳ useDeferredValue Hook</h3>
        <p>
          <strong>Purpose:</strong> Defer expensive updates to keep the UI responsive.
        </p>

        <p>Current input: <strong>{input}</strong></p>
        <p>Deferred input: <strong>{deferredInput}</strong></p>

        <div style={{ marginTop: '10px' }}>
          <h4>Heavy List (uses deferred value):</h4>
          <HeavyList searchTerm={deferredInput} />
        </div>

        <details style={{ marginTop: '10px' }}>
          <summary>View Code Example</summary>
          <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
{`const [input, setInput] = useState('')
const deferredInput = useDeferredValue(input)

// The expensive component uses the deferred value
// so it won't block typing in the input
<HeavyList searchTerm={deferredInput} />`}
          </pre>
        </details>
      </div>

      {/* useId Example */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #ff6b6b', borderRadius: '8px' }}>
        <h3>🆔 useId Hook</h3>
        <p>
          <strong>Purpose:</strong> Generate unique IDs for accessibility attributes.
        </p>

        <label htmlFor={`${id}-example-input`}>
          Example Input (unique ID: {id}-example-input):
        </label>
        <input
          id={`${id}-example-input`}
          type="text"
          placeholder="This input has a unique ID"
          style={{
            padding: '8px',
            margin: '10px 0',
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />

        <p>
          <strong>Why it's useful:</strong> Ensures unique IDs even when components are rendered multiple times,
          solving SSR hydration issues and accessibility concerns.
        </p>

        <details style={{ marginTop: '10px' }}>
          <summary>View Code Example</summary>
          <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
{`const id = useId()

return (
  <>
    <label htmlFor={\`\${id}-input\`}>Label</label>
    <input id={\`\${id}-input\`} />
  </>
)`}
          </pre>
        </details>
      </div>

      {/* Suspense Example */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #9c27b0', borderRadius: '8px' }}>
        <h3>⏸️ Improved Suspense</h3>
        <p>
          <strong>Purpose:</strong> Better handling of loading states for data fetching and code splitting.
        </p>

        <Suspense
          fallback={
            <div style={{
              padding: '20px',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              🔄 Loading component... (Suspense fallback)
            </div>
          }
        >
          <LazyComponent />
        </Suspense>

        <details style={{ marginTop: '10px' }}>
          <summary>View Code Example</summary>
          <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
{`<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>

// In LazyComponent:
if (!dataLoaded) {
  throw new Promise(resolve => {
    fetchData().then(resolve)
  })
}

return <div>Data loaded!</div>`}
          </pre>
        </details>
      </div>

      {/* Automatic Batching */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #ffa726', borderRadius: '8px' }}>
        <h3>🔄 Automatic Batching</h3>
        <p>
          <strong>What's New:</strong> React 18 automatically batches all state updates, even in timeouts, promises, and event handlers.
        </p>

        <AutomaticBatchingExample />

        <details style={{ marginTop: '10px' }}>
          <summary>View Code Example</summary>
          <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
{`// React 18: These updates are automatically batched
setTimeout(() => {
  setCount(1)    // ←
  setFlag(true)  // ← Only ONE re-render for both!
}, 1000)

// React 17: These would cause 2 separate re-renders
// React 18: Automatically batched into 1 re-render`}
          </pre>
        </details>
      </div>

      {/* Error Boundaries */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #d32f2f', borderRadius: '8px' }}>
        <h3>🚨 Error Boundaries</h3>
        <p>
          <strong>Purpose:</strong> Catch JavaScript errors anywhere in the component tree and display fallback UI.
        </p>

        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>

        <details style={{ marginTop: '10px' }}>
          <summary>View Code Example</summary>
          <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
{`class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong!</h2>
    }
    return this.props.children
  }
}`}
          </pre>
        </details>
      </div>

      {/* Teaching Summary */}
      <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>🎓 React 18 Teaching Points</h2>
        <ul>
          <li>
            <strong>useTransition:</strong> Perfect for search, filtering, or any non-urgent updates
          </li>
          <li>
            <strong>useDeferredValue:</strong> Great for expensive computations that shouldn't block UI
          </li>
          <li>
            <strong>useId:</strong> Solves accessibility and SSR hydration issues with unique IDs
          </li>
          <li>
            <strong>Improved Suspense:</strong> Better integration with data fetching libraries
          </li>
          <li>
            <strong>Automatic Batching:</strong> Better performance out of the box
          </li>
          <li>
            <strong>Concurrent Features:</strong> React can interrupt rendering to keep UI responsive
          </li>
          <li>
            <strong>Error Boundaries:</strong> Better error handling with graceful fallbacks
          </li>
        </ul>
      </div>
    </div>
  )
}

// Component that intentionally throws an error
const BuggyComponent = () => {
  const [shouldCrash, setShouldCrash] = useState(false)

  if (shouldCrash) {
    throw new Error('💥 This is a deliberate error for demonstration!')
  }

  return (
    <div style={{ padding: '15px', backgroundColor: '#fff5f5', borderRadius: '4px', margin: '10px 0' }}>
      <p>✅ This component is working fine!</p>
      <button
        onClick={() => setShouldCrash(true)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        💥 Crash This Component
      </button>
      <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
        Click the button to see how Error Boundary catches the error!
      </p>
    </div>
  )
}

// Component to demonstrate automatic batching
const AutomaticBatchingExample = () => {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)
  const [renderCount, setRenderCount] = useState(0)

  // Track renders - intentionally runs on every render for demonstration
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setRenderCount(prev => prev + 1)
  })

  const handleBatchedUpdate = () => {
    setTimeout(() => {
      // In React 18, these are automatically batched
      setCount(c => c + 1)
      setFlag(f => !f)
      // Only causes ONE re-render in React 18!
    }, 100)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <p>Flag: {flag ? '✅' : '❌'}</p>
      <p>Total renders: {renderCount}</p>
      <button
        onClick={handleBatchedUpdate}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ffa726',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Update Both (Batched in React 18)
      </button>
    </div>
  )
}

export default React18FeaturesPage
