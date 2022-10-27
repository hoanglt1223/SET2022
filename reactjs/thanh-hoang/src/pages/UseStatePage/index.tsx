import { useState } from 'react'

let wrongCount: number = 0
const UseStatePage = () => {
  let [count, setCount] = useState(0)
  let wrongCountInside: number = 0
  console.log('🚀 ~ count, wrongCount, wrongCountInside: ', count, wrongCount, wrongCountInside)

  return (
    <div>
      THIS IS USE STATE PAGE
      <div>
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
