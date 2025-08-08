import { useState, useEffect, useCallback } from 'react'

const PitfallsPage = () => {

  // ❌ PITFALL 1: Infinite loop due to missing dependencies
  const InfiniteLoopExample = () => {
    const [badCount, setBadCount] = useState(0)

    // This creates an infinite loop!
    // useEffect(() => {
    //   setBadCount(badCount + 1) // This will run infinitely
    // }, []) // Missing 'badCount' in dependencies

    // ✅ CORRECT VERSION:
    useEffect(() => {
      // Use functional update to avoid dependency
      setBadCount(prev => prev + 1)
    }, []) // Or add [badCount] if you really need it

    return (
      <div>
        <h4>❌ Infinite Loop Pitfall</h4>
        <p>Bad Count: {badCount}</p>
        <p>
          <strong>Problem:</strong> Setting state in useEffect without proper dependencies
        </p>
        <p>
          <strong>Solution:</strong> Use functional updates or include dependencies
        </p>
      </div>
    )
  }

  // ❌ PITFALL 2: Object state mutation
  const ObjectMutationExample = () => {
    const [userInfo, setUserInfo] = useState({ name: 'John', age: 25 })

    const wrongUpdate = () => {
      // ❌ WRONG: Mutating the object directly
      userInfo.age = userInfo.age + 1
      setUserInfo(userInfo) // Component won't re-render!
    }

    const correctUpdate = () => {
      // ✅ CORRECT: Creating a new object
      setUserInfo(prev => ({ ...prev, age: prev.age + 1 }))
    }

    return (
      <div>
        <h4>❌ Object Mutation Pitfall</h4>
        <p>
          User: {userInfo.name}, Age: {userInfo.age}
        </p>
        <button onClick={wrongUpdate} style={{ backgroundColor: '#ff6b6b', color: 'white', margin: '5px' }}>
          Wrong Update (Won't work!)
        </button>
        <button onClick={correctUpdate} style={{ backgroundColor: '#4ecdc4', color: 'white', margin: '5px' }}>
          Correct Update
        </button>
        <p>
          <strong>Problem:</strong> Mutating state objects directly
        </p>
        <p>
          <strong>Solution:</strong> Always create new objects/arrays
        </p>
      </div>
    )
  }

  // ❌ PITFALL 3: Missing cleanup in useEffect
  const MissingCleanupExample = () => {
    const [timer, setTimer] = useState(0)

    // ❌ BAD: No cleanup
    const startBadTimer = () => {
      setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000) // This will keep running even after unmount!
    }

    // ✅ GOOD: With cleanup
    useEffect(() => {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)

      return () => clearInterval(interval) // Cleanup!
    }, [])

    return (
      <div>
        <h4>❌ Missing Cleanup Pitfall</h4>
        <p>Timer: {timer}</p>
        <button onClick={startBadTimer} style={{ backgroundColor: '#ff6b6b', color: 'white', margin: '5px' }}>
          Start Bad Timer (Memory Leak!)
        </button>
        <p>
          <strong>Problem:</strong> Timers/listeners without cleanup cause memory leaks
        </p>
        <p>
          <strong>Solution:</strong> Always return cleanup function from useEffect
        </p>
      </div>
    )
  }

  // ❌ PITFALL 4: Stale closure
  const StaleClosureExample = () => {
    const [staleCount, setStaleCount] = useState(0)

    const startStaleCounter = () => {
      // ❌ This captures the current value of staleCount
      setInterval(() => {
        setStaleCount(staleCount + 1) // Always adds to the initial value!
      }, 1000)
    }

    const startCorrectCounter = () => {
      // ✅ Use functional update to get current value
      setInterval(() => {
        setStaleCount(prev => prev + 1) // Gets the latest value
      }, 1000)
    }

    return (
      <div>
        <h4>❌ Stale Closure Pitfall</h4>
        <p>Stale Count: {staleCount}</p>
        <button onClick={startStaleCounter} style={{ backgroundColor: '#ff6b6b', color: 'white', margin: '5px' }}>
          Start Stale Counter
        </button>
        <button onClick={startCorrectCounter} style={{ backgroundColor: '#4ecdc4', color: 'white', margin: '5px' }}>
          Start Correct Counter
        </button>
        <button onClick={() => setStaleCount(0)} style={{ margin: '5px' }}>
          Reset
        </button>
        <p>
          <strong>Problem:</strong> Closures capture old state values
        </p>
        <p>
          <strong>Solution:</strong> Use functional state updates
        </p>
      </div>
    )
  }

  // ❌ PITFALL 5: useEffect dependency warnings
  const DependencyWarningExample = () => {
    const [items, setItems] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState('')

    // ❌ This will cause ESLint warnings
    // const fetchData = async () => {
    //   // Simulated API call
    //   const response = await fetch(`/api/search?term=${searchTerm}`)
    //   const data = await response.json()
    //   setItems(data)
    // }

    // This useEffect is missing dependencies!
    useEffect(() => {
      // fetchData() // ESLint will warn about missing dependencies
    }, []) // Missing: fetchData, searchTerm

    // ✅ CORRECT: Use useCallback or include all dependencies
    const memoizedFetchData = useCallback(async () => {
      try {
        // Simulated API call
        setTimeout(() => {
          setItems([`Result for: ${searchTerm}`, 'Item 1', 'Item 2'])
        }, 500)
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }, [searchTerm])

    useEffect(() => {
      if (searchTerm) {
        memoizedFetchData()
      }
    }, [memoizedFetchData, searchTerm])

    return (
      <div>
        <h4>❌ Dependency Warning Pitfall</h4>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search term..."
          style={{ padding: '5px', margin: '5px' }}
        />
        <p>Items: {items.join(', ')}</p>
        <p>
          <strong>Problem:</strong> Missing dependencies in useEffect
        </p>
        <p>
          <strong>Solution:</strong> Include all dependencies or use useCallback
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>⚠️ Common React Hooks Pitfalls</h1>
      <p>
        <em>Learn from these common mistakes to write better React code!</em>
      </p>

      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #ff6b6b', borderRadius: '8px' }}>
        <InfiniteLoopExample />
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #ff6b6b', borderRadius: '8px' }}>
        <ObjectMutationExample />
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #ff6b6b', borderRadius: '8px' }}>
        <MissingCleanupExample />
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #ff6b6b', borderRadius: '8px' }}>
        <StaleClosureExample />
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #ff6b6b', borderRadius: '8px' }}>
        <DependencyWarningExample />
      </div>

      <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
        <h2>🎓 Key Takeaways</h2>
        <ul>
          <li>
            <strong>Always include dependencies:</strong> Add all variables used inside useEffect to the dependency
            array
          </li>
          <li>
            <strong>Use functional updates:</strong> When updating state based on previous state, use the function form
          </li>
          <li>
            <strong>Don't mutate state:</strong> Always create new objects/arrays when updating state
          </li>
          <li>
            <strong>Clean up side effects:</strong> Return cleanup functions from useEffect
          </li>
          <li>
            <strong>Use useCallback:</strong> For functions that are dependencies of useEffect
          </li>
          <li>
            <strong>Enable ESLint plugin:</strong> Use eslint-plugin-react-hooks to catch these issues
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PitfallsPage
