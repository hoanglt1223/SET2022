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
