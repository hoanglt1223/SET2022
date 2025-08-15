import { Component } from 'react'

class LifeCyclePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      name: 'Thanh Hoang',
      mounted: true,
      updateCount: 0
    }
    console.log('🏗️ 1. CONSTRUCTOR: Component instance created')
  }

  // *INFO: This method will update the state and trigger the render method again to update the DOM
  changeState() {
    this.setState({
      index: this.state.index + 1,
      updateCount: this.state.updateCount + 1
    })
  }

  toggleMount = () => {
    this.setState({ mounted: !this.state.mounted })
  }

  // Modern lifecycle methods
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('📥 2. getDerivedStateFromProps: Sync state with props')
    // This is called before every render, both on mount and updates
    return null // Return null if no state update is needed
  }

  // *INFO: This method will be called after the component is mounted
  componentDidMount() {
    console.log('🚀 3. componentDidMount: Component mounted to DOM')
    // Perfect place for:
    // - API calls
    // - Setting up subscriptions
    // - Initializing timers
    document.title = `Lifecycle Demo - Index: ${this.state.index}`
  }

  // *INFO: This method will be called when the component have some changes in the props or state
  // *INFO: This method will return a boolean value, if it returns true, the component will be updated, otherwise it will not be updated
  shouldComponentUpdate(nextProps, nextState) {
    console.log('🤔 4. shouldComponentUpdate:', {
      currentState: this.state,
      nextState: nextState
    })

    // Example: Only update if index is even (for demonstration)
    // In real apps, use this for performance optimization
    return nextState.index % 2 === 0
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('📸 5. getSnapshotBeforeUpdate: Capture DOM info before update')
    // Capture some information from the DOM before it's potentially changed
    // Return value will be passed to componentDidUpdate
    return {
      prevIndex: prevState.index,
      timestamp: Date.now()
    }
  }

  // *INFO: This method will be called after the component is updated
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('✅ 6. componentDidUpdate: Component updated', {
      prevState,
      currentState: this.state,
      snapshot
    })

    // Update document title after state change
    document.title = `Lifecycle Demo - Index: ${this.state.index}`

    // Perfect place for:
    // - DOM manipulations based on state changes
    // - Network requests based on prop/state changes
    // - Updating other libraries
  }

  componentWillUnmount() {
    console.log('🧹 7. componentWillUnmount: Cleanup before component is removed')
    // Perfect place for:
    // - Removing event listeners
    // - Cancelling network requests
    // - Cleaning up timers/subscriptions
    document.title = 'React App'
  }

  componentDidCatch(error, errorInfo) {
    console.log('❌ componentDidCatch: Error caught', error, errorInfo)
    // Handle errors in child components
  }

  render() {
    console.log('🎨 RENDER: Creating virtual DOM')

    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
        <h1>🔄 React Class Lifecycle Methods</h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
          <em>Open your browser console to see lifecycle methods in action!</em>
        </p>

        {/* Current State Display */}
        <div style={{
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '10px',
          marginBottom: '30px',
          border: '2px solid #2196F3'
        }}>
          <h2>📊 Current State</h2>
          <p><strong>Index:</strong> {this.state.index}</p>
          <p><strong>Name:</strong> {this.state.name}</p>
          <p><strong>Update Count:</strong> {this.state.updateCount}</p>
          <p><strong>Last Render:</strong> {new Date().toLocaleTimeString()}</p>
        </div>

        {/* Controls */}
        <div style={{
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          marginBottom: '30px'
        }}>
          <h3>🎮 Controls</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button
              onClick={this.changeState.bind(this)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Increase Index (Triggers Update)
            </button>
            <button
              onClick={this.toggleMount}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Toggle Child Component
            </button>
          </div>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Note: shouldComponentUpdate only allows even numbers to update!
          </p>
        </div>

        {/* Child Component for Demonstrating Unmounting */}
        {this.state.mounted && <ChildComponent />}

                        {/* Visual Lifecycle Flow */}
        <div style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          marginBottom: '30px'
        }}>
          <h2>🔄 React Lifecycle Visual Flow</h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            margin: '20px 0'
          }}>
            <div style={{
              padding: '10px 15px',
              backgroundColor: '#e3f2fd',
              borderRadius: '20px',
              border: '2px solid #2196F3',
              animation: this.state.index === 0 ? 'pulse 1s infinite' : 'none'
            }}>
              🏗️ Constructor
            </div>
            <span style={{ fontSize: '20px' }}>→</span>
            <div style={{
              padding: '10px 15px',
              backgroundColor: '#e8f5e8',
              borderRadius: '20px',
              border: '2px solid #4CAF50',
              animation: this.state.index === 1 ? 'pulse 1s infinite' : 'none'
            }}>
              🚀 Mount
            </div>
            <span style={{ fontSize: '20px' }}>→</span>
            <div style={{
              padding: '10px 15px',
              backgroundColor: '#fff3e0',
              borderRadius: '20px',
              border: '2px solid #FF9800',
              animation: this.state.index > 1 ? 'pulse 1s infinite' : 'none'
            }}>
              🔄 Update
            </div>
            <span style={{ fontSize: '20px' }}>→</span>
            <div style={{
              padding: '10px 15px',
              backgroundColor: '#ffebee',
              borderRadius: '20px',
              border: '2px solid #f44336'
            }}>
              🧹 Unmount
            </div>
          </div>

          <style>
            {`
              @keyframes pulse {
                0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7); }
                70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(33, 150, 243, 0); }
                100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(33, 150, 243, 0); }
              }
            `}
          </style>

          {/* Lifecycle Phases Visual */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{
              padding: '15px',
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              margin: '5px',
              minWidth: '150px',
              border: '2px solid #2196F3'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>🏗️ MOUNTING</h4>
              <div style={{ fontSize: '12px' }}>
                1. Constructor<br/>
                2. getDerivedStateFromProps<br/>
                3. Render<br/>
                4. componentDidMount
              </div>
            </div>

            <div style={{
              padding: '15px',
              backgroundColor: '#e8f5e8',
              borderRadius: '8px',
              margin: '5px',
              minWidth: '150px',
              border: '2px solid #4CAF50'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#388e3c' }}>🔄 UPDATING</h4>
              <div style={{ fontSize: '12px' }}>
                1. getDerivedStateFromProps<br/>
                2. shouldComponentUpdate<br/>
                3. Render<br/>
                4. getSnapshotBeforeUpdate<br/>
                5. componentDidUpdate
              </div>
            </div>

            <div style={{
              padding: '15px',
              backgroundColor: '#ffebee',
              borderRadius: '8px',
              margin: '5px',
              minWidth: '150px',
              border: '2px solid #f44336'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#d32f2f' }}>🧹 UNMOUNTING</h4>
              <div style={{ fontSize: '12px' }}>
                1. componentWillUnmount<br/>
                2. Component Destroyed
              </div>
            </div>

            <div style={{
              padding: '15px',
              backgroundColor: '#fce4ec',
              borderRadius: '8px',
              margin: '5px',
              minWidth: '150px',
              border: '2px solid #e91e63'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#c2185b' }}>❌ ERROR</h4>
              <div style={{ fontSize: '12px' }}>
                1. componentDidCatch<br/>
                2. Error Boundary
              </div>
            </div>
          </div>
        </div>

        {/* Lifecycle Methods Explanation */}
        <div style={{
          padding: '20px',
          backgroundColor: '#fff3e0',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h2>📚 Lifecycle Methods Explained</h2>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#FF9800' }}>🏗️ Mounting Phase</h3>
            <ol>
              <li><strong>constructor():</strong> Initialize state and bind methods</li>
              <li><strong>getDerivedStateFromProps():</strong> Sync state with props</li>
              <li><strong>render():</strong> Return JSX to create virtual DOM</li>
              <li><strong>componentDidMount():</strong> Component is in DOM, perfect for API calls</li>
            </ol>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#4CAF50' }}>🔄 Updating Phase</h3>
            <ol>
              <li><strong>getDerivedStateFromProps():</strong> Sync state with new props</li>
              <li><strong>shouldComponentUpdate():</strong> Decide if component should re-render</li>
              <li><strong>render():</strong> Create new virtual DOM</li>
              <li><strong>getSnapshotBeforeUpdate():</strong> Capture DOM info before changes</li>
              <li><strong>componentDidUpdate():</strong> DOM has been updated</li>
            </ol>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#f44336' }}>🧹 Unmounting Phase</h3>
            <ol>
              <li><strong>componentWillUnmount():</strong> Cleanup before removal</li>
            </ol>
          </div>

          <div>
            <h3 style={{ color: '#9C27B0' }}>❌ Error Handling</h3>
            <ol>
              <li><strong>componentDidCatch():</strong> Handle errors in child components</li>
            </ol>
          </div>
        </div>

        {/* Best Practices */}
        <div style={{
          padding: '20px',
          backgroundColor: '#e8f5e8',
          borderRadius: '10px'
        }}>
          <h2>✅ Best Practices</h2>
          <ul>
            <li><strong>componentDidMount:</strong> API calls, subscriptions, timers</li>
            <li><strong>componentDidUpdate:</strong> DOM updates, conditional API calls</li>
            <li><strong>componentWillUnmount:</strong> Cleanup subscriptions, cancel requests</li>
            <li><strong>shouldComponentUpdate:</strong> Performance optimization (use React.memo instead)</li>
            <li><strong>Avoid:</strong> setState in render(), infinite loops in componentDidUpdate</li>
          </ul>
        </div>
      </div>
    )
  }
}

// Child component to demonstrate unmounting
class ChildComponent extends Component {
  componentDidMount() {
    console.log('👶 Child: componentDidMount')
  }

  componentWillUnmount() {
    console.log('👋 Child: componentWillUnmount')
  }

  render() {
    return (
      <div style={{
        padding: '15px',
        backgroundColor: '#f3e5f5',
        borderRadius: '8px',
        margin: '20px 0',
        border: '2px solid #9C27B0'
      }}>
        <h3>👶 Child Component</h3>
        <p>This component demonstrates mounting and unmounting lifecycle methods.</p>
        <p>Toggle me to see componentWillUnmount in action!</p>
      </div>
    )
  }
}

export default LifeCyclePage
