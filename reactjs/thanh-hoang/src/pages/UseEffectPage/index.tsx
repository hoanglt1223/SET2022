import { useState, useEffect } from 'react'

const UseEffectPage = () => {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<string>('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [timer, setTimer] = useState(0)

  // Example 1: useEffect without dependencies (runs after every render)
  useEffect(() => {
    console.log('🔄 This runs after EVERY render')
    document.title = `Count: ${count}`
  })

  // Example 2: useEffect with empty dependencies (runs only on mount)
  useEffect(() => {
    console.log('🚀 This runs only ONCE after mount')

    // Simulate API call
    setTimeout(() => {
      setData('Data loaded from API!')
    }, 2000)
  }, []) // Empty dependency array

  // Example 3: useEffect with dependencies (runs when count changes)
  useEffect(() => {
    console.log(`📊 Count changed to: ${count}`)

    if (count > 5) {
      console.log('⚠️ Count is getting high!')
    }
  }, [count]) // Only runs when count changes

  // Example 4: useEffect with cleanup (prevents memory leaks)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    console.log('👂 Adding window resize listener')
    window.addEventListener('resize', handleResize)

    // Cleanup function - IMPORTANT!
    return () => {
      console.log('🧹 Cleaning up resize listener')
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Example 5: Timer with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1)
    }, 1000)

    return () => {
      console.log('⏰ Cleaning up timer')
      clearInterval(interval)
    }
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>useEffect Hook Examples</h1>
      <p>
        <em>Open your browser console to see the effects in action!</em>
      </p>

      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #e0e0e0', borderRadius: '8px' }}>
        <h3>📊 Example 1 & 3: Effect with Dependencies</h3>
        <p>
          Count: <strong>{count}</strong>
        </p>
        <p>
          <em>Watch console - title updates every render, count effect only when count changes</em>
        </p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
        <button onClick={() => setCount(count - 1)} style={{ marginLeft: '10px' }}>
          Decrement Count
        </button>
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #e0e0e0', borderRadius: '8px' }}>
        <h3>🚀 Example 2: Effect on Mount Only</h3>
        <p>
          API Data: <strong>{data || 'Loading...'}</strong>
        </p>
        <p>
          <em>This effect runs only once when component mounts</em>
        </p>
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #e0e0e0', borderRadius: '8px' }}>
        <h3>👂 Example 4: Effect with Cleanup (Window Resize)</h3>
        <p>
          Window Width: <strong>{windowWidth}px</strong>
        </p>
        <p>
          <em>Try resizing your browser window - the event listener is properly cleaned up</em>
        </p>
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #e0e0e0', borderRadius: '8px' }}>
        <h3>⏰ Example 5: Timer with Cleanup</h3>
        <p>
          Timer: <strong>{timer} seconds</strong>
        </p>
        <p>
          <em>Timer automatically cleans up when component unmounts</em>
        </p>
      </div>

      <div style={{ backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '8px' }}>
        <h3>🎓 Teaching Points:</h3>
        <ul>
          <li>
            <strong>No dependencies:</strong> Runs after every render
          </li>
          <li>
            <strong>Empty array []:</strong> Runs only once on mount
          </li>
          <li>
            <strong>With dependencies [count]:</strong> Runs when dependencies change
          </li>
          <li>
            <strong>Cleanup function:</strong> Prevents memory leaks by cleaning up subscriptions
          </li>
          <li>
            <strong>Common use cases:</strong> API calls, event listeners, timers, subscriptions
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UseEffectPage
