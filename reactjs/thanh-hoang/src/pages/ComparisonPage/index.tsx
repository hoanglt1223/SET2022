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

      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>🔄 Visual Comparison: Class vs Hooks</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div style={{ padding: '15px', backgroundColor: '#ffebee', borderRadius: '8px', border: '2px solid #f44336' }}>
            <h3 style={{ textAlign: 'center', color: '#d32f2f' }}>🏛️ Class Components</h3>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ padding: '5px', backgroundColor: '#fff', margin: '5px 0', borderRadius: '4px' }}>🏗️ constructor()</li>
              <li style={{ padding: '5px', backgroundColor: '#fff', margin: '5px 0', borderRadius: '4px' }}>🚀 componentDidMount()</li>
              <li style={{ padding: '5px', backgroundColor: '#fff', margin: '5px 0', borderRadius: '4px' }}>🔄 componentDidUpdate()</li>
              <li style={{ padding: '5px', backgroundColor: '#fff', margin: '5px 0', borderRadius: '4px' }}>🧹 componentWillUnmount()</li>
            </ul>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px', border: '2px solid #4CAF50' }}>
            <h3 style={{ textAlign: 'center', color: '#388e3c' }}>🪝 Hooks</h3>
                         <ul style={{ listStyle: 'none', padding: '0' }}>
               <li style={{ padding: '5px', backgroundColor: '#fff', margin: '5px 0', borderRadius: '4px' }}>🎯 useState()</li>
               <li style={{ padding: '5px', backgroundColor: '#fff', margin: '5px 0', borderRadius: '4px' }}>⚡ useEffect(fn, [])</li>
               <li style={{ padding: '5px', backgroundColor: '#fff', margin: '5px 0', borderRadius: '4px' }}>⚡ useEffect(fn, [deps])</li>
               <li style={{ padding: '5px', backgroundColor: '#fff', margin: '5px 0', borderRadius: '4px' }}>⚡ useEffect cleanup</li>
             </ul>
          </div>
        </div>
      </div>

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
          <li>
            <strong>Performance:</strong> Easier optimization with React.memo and useMemo
          </li>
          <li>
            <strong>Future-proof:</strong> React team focuses on functional components
          </li>
        </ul>
      </div>

      <div style={{ backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
        <h3>🏛️ When to Still Use Class Components:</h3>
        <ul>
          <li>
            <strong>Error Boundaries:</strong> componentDidCatch and getDerivedStateFromError
          </li>
          <li>
            <strong>Legacy Codebases:</strong> When migrating gradually
          </li>
          <li>
            <strong>Learning:</strong> Understanding React fundamentals and lifecycle
          </li>
          <li>
            <strong>Complex State Logic:</strong> Sometimes clearer with class structure
          </li>
        </ul>
      </div>

      <div style={{ backgroundColor: '#f3e5f5', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
        <h3>🎓  Recommendations:</h3>
        <ul>
          <li>
            <strong>Start with Hooks:</strong> Modern React development uses functional components
          </li>
          <li>
            <strong>Understand Lifecycle:</strong> Important for debugging and legacy code
          </li>
          <li>
            <strong>Practice Both:</strong> Complete understanding of React patterns
          </li>
          <li>
            <strong>Migration Path:</strong> Learn how to convert class components to hooks
          </li>
        </ul>
      </div>

      <div style={{ backgroundColor: '#e1f5fe', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>🔄 Migration Examples</h2>

        <h4>Class Component Pattern:</h4>
        <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px', fontFamily: 'monospace', fontSize: '12px', marginBottom: '15px' }}>
{`class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  componentDidMount() {
    document.title = \`Count: \${this.state.count}\`
  }

  componentDidUpdate() {
    document.title = \`Count: \${this.state.count}\`
  }

  render() {
    return <button onClick={() => this.setState({count: this.state.count + 1})}>
      {this.state.count}
    </button>
  }
}`}
        </div>

        <h4>Hooks Equivalent:</h4>
        <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px', fontFamily: 'monospace', fontSize: '12px' }}>
{`function MyComponent() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = \`Count: \${count}\`
  })

  return <button onClick={() => setCount(count + 1)}>
    {count}
  </button>
}`}
        </div>
      </div>
    </div>
  )
}

export default ComparisonPage
