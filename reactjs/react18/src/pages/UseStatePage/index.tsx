import { useState } from 'react'

//*INFO: component re-renders don't re-declare this variable, and it doesn't get re-initialized
//*INFO: or re-assigned or re-declared or re-created or re-constructed or re-allocated or re-anything
//*INFO: it's just a variable that's declared outside of the component and doesn't trigger a re-render
let wrongCount: number = 0

const UseStatePage = () => {
  //*INFO: component will re-render when this variable changes
  let [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  console.log('🚀 ~ UseStatePage ~ name, userName, password:', name, userName, password)
  // const [isOpen, toggleOpen] = useState(false)

  //*INFO: component will not re-render when this variable changes
  //*INFO: component re-renders re-declare this variable, so it will be reset to 0
  let wrongCountInside: number = 0
  // console.log('🚀 ~ count, wrongCount, wrongCountInside: ', count, wrongCount, wrongCountInside)

  function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    console.log('🚀 ~ onSubmit ~ name, userName, password:', name, userName, password)
  }

  function onChangeNameWithDebounce(e: { target: { value: string } }) {
    console.log('🚀 ~ onChangeNameWithDebounce ~ e.target.value:', e.target.value)
    setName(e.target.value)
  }

  //*INFO: return in a component is a render() method in a class component
  // Code in the return block is JSX, which is a syntax extension for JavaScript
  return (
    <div>
      THIS IS USE STATE PAGE
      <div>
        <form onSubmit={onSubmit} action="">
          <input type="text" value={name} onChange={onChangeNameWithDebounce} />
          <input
            type="text"
            value={userName}
            onChange={e => {
              setUserName(e.target.value)
            }}
          />
          <input
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          <button type="submit">Submit</button>
        </form>
        {/* //*INFO: It only change when component re-render */}
        <p>Count: {count}</p>
        <button
          onClick={() => {
            setCount(count + 1)
            count += 1
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
        <p>Wrong Count Inside: {wrongCountInside}</p>
        <button
          onClick={() => {
            wrongCount += 1
            count += 1
            wrongCountInside += 1
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
