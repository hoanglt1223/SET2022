import { useState, useEffect, Component } from 'react'

// Class Component Example
class ClassCounter extends Component<{}, { count: number }> {
  state = { count: 0 }

  componentDidMount() {
    console.log('🏗️ Class: componentDidMount')
    document.title = `Class Count: ${this.state.count}`
  }

  componentDidUpdate() {
    console.log('🔄 Class: componentDidUpdate')
    document.title = `Class Count: ${this.state.count}`
  }

  componentWillUnmount() {
    console.log('🧹 Class: componentWillUnmount')
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <div style={{ padding: '15px', border: '2px solid #ff6b6b', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>🏛️ Class Component</h3>
        <p>
          Count: <strong>{this.state.count}</strong>
        </p>
        <button onClick={this.increment}>Increment</button>
        <div style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
          <p>
            <strong>Lifecycle methods used:</strong>
          </p>
          <ul>
            <li>componentDidMount() - runs once after mount</li>
            <li>componentDidUpdate() - runs after every update</li>
            <li>componentWillUnmount() - cleanup</li>
          </ul>
        </div>
      </div>
    )
  }
}

// Functional Component with Hooks
const FunctionalCounter = () => {
  const [count, setCount] = useState(0)

  // Equivalent to componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log('🪝 Hooks: useEffect (mount + update)')
    document.title = `Hooks Count: ${count}`
  })

  // Equivalent to componentDidMount only
  useEffect(() => {
    console.log('🚀 Hooks: useEffect (mount only)')

    // Equivalent to componentWillUnmount
    return () => {
      console.log('🧹 Hooks: useEffect cleanup (unmount)')
    }
  }, [])

  // Equivalent to componentDidUpdate when count changes
  useEffect(() => {
    console.log(`📊 Hooks: useEffect when count changes: ${count}`)
  }, [count])

  return (
    <div style={{ padding: '15px', border: '2px solid #4ecdc4', borderRadius: '8px', marginBottom: '20px' }}>
      <h3>🪝 Functional Component with Hooks</h3>
      <p>
        Count: <strong>{count}</strong>
      </p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <div style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
        <p>
          <strong>useEffect patterns used:</strong>
        </p>
        <ul>
          <li>useEffect() - runs after every render</li>
          <li>useEffect(() =&gt; {'{}'}, []) - runs once after mount</li>
          <li>useEffect(() =&gt; {'{}'}, [count]) - runs when count changes</li>
          <li>return () =&gt; {'{}'} - cleanup function</li>
        </ul>
      </div>
    </div>
  )
}

const ComparisonPage = () => {
  const [showComponents, setShowComponents] = useState(true)

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>⚖️ Class Lifecycle vs React Hooks Comparison</h1>
      <p>
        <em>Open your browser console to see the lifecycle methods and effects in action!</em>
      </p>

      <button
        onClick={() => setShowComponents(!showComponents)}
        style={{
          padding: '10px 20px',
          marginBottom: '20px',
          backgroundColor: showComponents ? '#ff6b6b' : '#4ecdc4',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {showComponents ? 'Unmount Components' : 'Mount Components'}
      </button>

      {showComponents && (
        <>
          <ClassCounter />
          <FunctionalCounter />
        </>
      )}

      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>🎓 Learning Comparison Table</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#e0e0e0' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Class Component Lifecycle</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Hooks Equivalent</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>componentDidMount()</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>useEffect(() =&gt; {'{}'}, [])</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>Run code after component mounts</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>componentDidUpdate()</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>useEffect(() =&gt; {'{}'}, [deps])</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>Run code after updates</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>componentWillUnmount()</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                useEffect(() =&gt; {'{return () => {}}'}, [])
              </td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>Cleanup before unmount</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>this.setState()</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>useState()</td>
              <td style={{ padding: '10px', border: '1px solid #ccc' }}>Manage component state</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ backgroundColor: '#e8f5e8', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
        <h3>✅ Advantages of Hooks:</h3>
        <ul>
          <li>
            <strong>Simpler:</strong> No need to understand 'this' binding
          </li>
          <li>
            <strong>Reusable:</strong> Logic can be extracted into custom hooks
          </li>
          <li>
            <strong>Cleaner:</strong> Related logic stays together
          </li>
          <li>
            <strong>Less boilerplate:</strong> No class syntax needed
          </li>
          <li>
            <strong>Better testing:</strong> Easier to test individual pieces of logic
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ComparisonPage
