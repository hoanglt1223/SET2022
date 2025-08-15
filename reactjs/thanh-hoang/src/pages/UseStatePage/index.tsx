import { useState } from 'react'

//*INFO: component re-renders don't re-declare this variable, and it doesn't get re-initialized
//*INFO: or re-assigned or re-declared or re-created or re-constructed or re-allocated or re-anything
//*INFO: it's just a variable that's declared outside of the component and doesn't trigger a re-render
let wrongCount: number = 0
const UseStatePage = () => {
  //*INFO: component will re-render when this variable changes
  let [count, setCount] = useState(0)

  //*INFO: component will not re-render when this variable changes
  //*INFO: component re-renders re-declare this variable, so it will be reset to 0
  let wrongCountInside: number = 0
  console.log('🚀 ~ count, wrongCount, wrongCountInside: ', count, wrongCount, wrongCountInside)

  //*INFO: return in a component is a render
  return (
    <div>
      <h1>🎯 useState Hook - Complete Guide</h1>

      {/* Visual useState Patterns */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
        <h2>🎯 useState Patterns Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
          <div style={{ padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px', textAlign: 'center', border: '2px solid #4CAF50' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔢</div>
            <h4>Number State</h4>
            <code style={{ fontSize: '12px' }}>useState(0)</code>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#fff3e0', borderRadius: '8px', textAlign: 'center', border: '2px solid #FF9800' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📝</div>
            <h4>String State</h4>
            <code style={{ fontSize: '12px' }}>useState('')</code>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#e0f7fa', borderRadius: '8px', textAlign: 'center', border: '2px solid #00BCD4' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>👤</div>
            <h4>Object State</h4>
            <code style={{ fontSize: '12px' }}>useState({})</code>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#f1f8e9', borderRadius: '8px', textAlign: 'center', border: '2px solid #8BC34A' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📋</div>
            <h4>Array State</h4>
            <code style={{ fontSize: '12px' }}>useState([])</code>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#fce4ec', borderRadius: '8px', textAlign: 'center', border: '2px solid #E91E63' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔄</div>
            <h4>Boolean State</h4>
            <code style={{ fontSize: '12px' }}>useState(true)</code>
          </div>
        </div>
      </div>

      THIS IS USE STATE PAGE
      <div>
        {/* //*INFO: It only change when component re-render */}
        <p>Count: {count}</p>
        <button
          onClick={() => {
            setCount(count + 1)
          }}
        >
          Increment
        </button>
        <button
          onClick={() => {
            setCount(count - 1)
          }}
        >
          Decrement
        </button>
        <p>Wrong Count: {wrongCount}</p>
        <button
          onClick={() => {
            wrongCount = wrongCount + 1
            count = count + 1
            wrongCountInside = wrongCountInside + 1
            console.log('🚀 logs:', count, wrongCount, wrongCountInside)
          }}
        >
          Wrong Increment
        </button>
        <button
          onClick={() => {
            wrongCount = wrongCount - 1
            wrongCountInside = wrongCountInside - 1
            count = count - 1
            console.log('🚀 logs:', count, wrongCount, wrongCountInside)
          }}
        >
          Wrong Decrement
        </button>
      </div>
    </div>
  )
}

export default UseStatePage
