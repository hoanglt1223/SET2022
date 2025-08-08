import { useState, useEffect, useCallback } from 'react'

// 🔧 Custom Hook 1: useCounter
const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => setCount(prev => prev + 1), [])
  const decrement = useCallback(() => setCount(prev => prev - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])

  return { count, increment, decrement, reset }
}

// 🔧 Custom Hook 2: useToggle
const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(prev => !prev), [])

  return [value, toggle] as const
}

// 🔧 Custom Hook 3: useLocalStorage
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue] as const
}

// 🔧 Custom Hook 4: useFetch
const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Simulate different responses based on URL
        let mockData: any
        if (url.includes('users')) {
          mockData = { name: 'John Doe', email: 'john@example.com' }
        } else if (url.includes('posts')) {
          mockData = [
            { id: 1, title: 'First Post' },
            { id: 2, title: 'Second Post' }
          ]
        } else {
          throw new Error('API endpoint not found')
        }

        setData(mockData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

// 🔧 Custom Hook 5: useDebounce
const useDebounce = <T,>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Example Components using the custom hooks
const CounterExample = () => {
  const { count, increment, decrement, reset } = useCounter(10)

  return (
    <div style={{ padding: '15px', border: '2px solid #4ecdc4', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>🔧 useCounter Hook</h3>
      <p>
        Count: <strong>{count}</strong>
      </p>
      <button onClick={increment} style={{ margin: '5px' }}>
        +
      </button>
      <button onClick={decrement} style={{ margin: '5px' }}>
        -
      </button>
      <button onClick={reset} style={{ margin: '5px' }}>
        Reset
      </button>
      <details style={{ marginTop: '10px' }}>
        <summary>View Hook Code</summary>
        <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
          {`const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => setCount(prev => prev + 1), [])
  const decrement = useCallback(() => setCount(prev => prev - 1), [])
  const reset = useCallback(() => setCount(initialValue), [initialValue])

  return { count, increment, decrement, reset }
}`}
        </pre>
      </details>
    </div>
  )
}

const ToggleExample = () => {
  const [isVisible, toggleVisible] = useToggle(false)
  const [isDarkMode, toggleDarkMode] = useToggle(true)

  return (
    <div style={{ padding: '15px', border: '2px solid #4ecdc4', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>🔧 useToggle Hook</h3>
      <p>
        <button onClick={toggleVisible} style={{ margin: '5px' }}>
          {isVisible ? 'Hide' : 'Show'} Content
        </button>
        {isVisible && <span> 👀 Content is visible!</span>}
      </p>
      <p>
        <button onClick={toggleDarkMode} style={{ margin: '5px' }}>
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
        <span
          style={{
            padding: '5px 10px',
            backgroundColor: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#fff' : '#333',
            marginLeft: '10px'
          }}
        >
          {isDarkMode ? '🌙 Dark' : '☀️ Light'} Mode
        </span>
      </p>
    </div>
  )
}

const LocalStorageExample = () => {
  const [name, setName] = useLocalStorage('user-name', '')
  const [settings, setSettings] = useLocalStorage('app-settings', { theme: 'light', notifications: true })

  return (
    <div style={{ padding: '15px', border: '2px solid #4ecdc4', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>🔧 useLocalStorage Hook</h3>
      <p>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name..."
          style={{ padding: '5px', margin: '5px' }}
        />
        <em>(Saved to localStorage automatically!)</em>
      </p>
      <p>
        Name from localStorage: <strong>{name}</strong>
      </p>
      <p>
        Theme:
        <select
          value={settings.theme}
          onChange={e => setSettings({ ...settings, theme: e.target.value })}
          style={{ margin: '5px' }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </p>
      <p>
        <em>Refresh the page - your data will persist!</em>
      </p>
    </div>
  )
}

const FetchExample = () => {
  const [endpoint, setEndpoint] = useState('/api/users')
  const { data, loading, error } = useFetch<any>(endpoint)

  return (
    <div style={{ padding: '15px', border: '2px solid #4ecdc4', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>🔧 useFetch Hook</h3>
      <p>
        <button onClick={() => setEndpoint('/api/users')} style={{ margin: '5px' }}>
          Fetch Users
        </button>
        <button onClick={() => setEndpoint('/api/posts')} style={{ margin: '5px' }}>
          Fetch Posts
        </button>
        <button onClick={() => setEndpoint('/api/invalid')} style={{ margin: '5px' }}>
          Fetch Invalid
        </button>
      </p>
      <p>
        Endpoint: <code>{endpoint}</code>
      </p>
      {loading && <p>🔄 Loading...</p>}
      {error && <p style={{ color: 'red' }}>❌ Error: {error}</p>}
      {data && (
        <p>
          📦 Data: <code>{JSON.stringify(data, null, 2)}</code>
        </p>
      )}
    </div>
  )
}

const DebounceExample = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('🔍 Searching for:', debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  return (
    <div style={{ padding: '15px', border: '2px solid #4ecdc4', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>🔧 useDebounce Hook</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Type to search (debounced)..."
        style={{ padding: '5px', margin: '5px', width: '200px' }}
      />
      <p>
        Search term: <strong>{searchTerm}</strong>
      </p>
      <p>
        Debounced term (500ms delay): <strong>{debouncedSearchTerm}</strong>
      </p>
      <p>
        <em>Check console to see when search actually triggers!</em>
      </p>
    </div>
  )
}

const CustomHooksPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔧 Custom Hooks Examples</h1>
      <p>
        <em>Learn how to create reusable logic with custom hooks!</em>
      </p>

      <CounterExample />
      <ToggleExample />
      <LocalStorageExample />
      <FetchExample />
      <DebounceExample />

      <div style={{ backgroundColor: '#e8f5e8', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>🎓 Custom Hooks Best Practices</h2>
        <ul>
          <li>
            <strong>Always start with "use":</strong> Follow the naming convention
          </li>
          <li>
            <strong>Extract common logic:</strong> If you use the same stateful logic in multiple components
          </li>
          <li>
            <strong>Return consistent API:</strong> Arrays for simple values, objects for complex state
          </li>
          <li>
            <strong>Use useCallback:</strong> For functions that might be used as dependencies
          </li>
          <li>
            <strong>Handle edge cases:</strong> Consider loading states, errors, and cleanup
          </li>
          <li>
            <strong>Make them composable:</strong> Custom hooks can use other custom hooks
          </li>
        </ul>
      </div>

      <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>💡 When to Create Custom Hooks</h2>
        <ul>
          <li>Logic is used in multiple components</li>
          <li>Component is getting too complex</li>
          <li>You want to share stateful logic (not state itself)</li>
          <li>Testing would be easier with isolated logic</li>
          <li>You want to encapsulate complex useEffect patterns</li>
        </ul>
      </div>
    </div>
  )
}

export default CustomHooksPage
