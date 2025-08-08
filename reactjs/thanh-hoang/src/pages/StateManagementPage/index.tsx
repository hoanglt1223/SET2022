import { useState } from 'react'
import { observer } from 'mobx-react'
import { makeAutoObservable } from 'mobx'

// MobX Store Implementation
class TodoStore {
  todos: Array<{ id: number; text: string; completed: boolean }> = []
  filter: 'all' | 'active' | 'completed' = 'all'

  constructor() {
    makeAutoObservable(this)
  }

  addTodo(text: string) {
    this.todos.push({
      id: Date.now(),
      text,
      completed: false
    })
  }

  toggleTodo(id: number) {
    const todo = this.todos.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id)
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter
  }

  get filteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed)
      case 'completed':
        return this.todos.filter(todo => todo.completed)
      default:
        return this.todos
    }
  }

  get stats() {
    return {
      total: this.todos.length,
      active: this.todos.filter(t => !t.completed).length,
      completed: this.todos.filter(t => t.completed).length
    }
  }
}

// Create MobX store instance
const mobxTodoStore = new TodoStore()

// Zustand Store Implementation (simulated - normally you'd install zustand)
const useZustandStore = () => {
  const [state, setState] = useState({
    todos: [] as Array<{ id: number; text: string; completed: boolean }>,
    filter: 'all' as 'all' | 'active' | 'completed'
  })

  const addTodo = (text: string) => {
    setState(prev => ({
      ...prev,
      todos: [...prev.todos, { id: Date.now(), text, completed: false }]
    }))
  }

  const toggleTodo = (id: number) => {
    setState(prev => ({
      ...prev,
      todos: prev.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }))
  }

  const deleteTodo = (id: number) => {
    setState(prev => ({
      ...prev,
      todos: prev.todos.filter(todo => todo.id !== id)
    }))
  }

  const setFilter = (filter: 'all' | 'active' | 'completed') => {
    setState(prev => ({ ...prev, filter }))
  }

  const filteredTodos = (() => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter(todo => !todo.completed)
      case 'completed':
        return state.todos.filter(todo => todo.completed)
      default:
        return state.todos
    }
  })()

  const stats = {
    total: state.todos.length,
    active: state.todos.filter(t => !t.completed).length,
    completed: state.todos.filter(t => t.completed).length
  }

  return {
    ...state,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    filteredTodos,
    stats
  }
}

// Redux Store Implementation (simulated)
const useReduxStore = () => {
  const [state, setState] = useState({
    todos: [] as Array<{ id: number; text: string; completed: boolean }>,
    filter: 'all' as 'all' | 'active' | 'completed'
  })

  // Action creators
  const actions = {
    addTodo: (text: string) => ({ type: 'ADD_TODO', payload: { text } }),
    toggleTodo: (id: number) => ({ type: 'TOGGLE_TODO', payload: { id } }),
    deleteTodo: (id: number) => ({ type: 'DELETE_TODO', payload: { id } }),
    setFilter: (filter: 'all' | 'active' | 'completed') => ({ type: 'SET_FILTER', payload: { filter } })
  }

  // Reducer simulation
  const dispatch = (action: any) => {
    setState(prevState => {
      switch (action.type) {
        case 'ADD_TODO':
          return {
            ...prevState,
            todos: [...prevState.todos, {
              id: Date.now(),
              text: action.payload.text,
              completed: false
            }]
          }
        case 'TOGGLE_TODO':
          return {
            ...prevState,
            todos: prevState.todos.map(todo =>
              todo.id === action.payload.id
                ? { ...todo, completed: !todo.completed }
                : todo
            )
          }
        case 'DELETE_TODO':
          return {
            ...prevState,
            todos: prevState.todos.filter(todo => todo.id !== action.payload.id)
          }
        case 'SET_FILTER':
          return {
            ...prevState,
            filter: action.payload.filter
          }
        default:
          return prevState
      }
    })
  }

  const filteredTodos = (() => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter(todo => !todo.completed)
      case 'completed':
        return state.todos.filter(todo => todo.completed)
      default:
        return state.todos
    }
  })()

  const stats = {
    total: state.todos.length,
    active: state.todos.filter(t => !t.completed).length,
    completed: state.todos.filter(t => t.completed).length
  }

  return {
    state,
    dispatch,
    actions,
    filteredTodos,
    stats
  }
}

// MobX Todo Component
const MobXTodoList = observer(() => {
  const [newTodo, setNewTodo] = useState('')

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      mobxTodoStore.addTodo(newTodo.trim())
      setNewTodo('')
    }
  }

  return (
    <div style={{ padding: '15px', border: '2px solid #4ecdc4', borderRadius: '8px' }}>
      <h3>📱 MobX Store Example</h3>

      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add MobX todo..."
          style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleAddTodo} style={{ padding: '8px 16px', backgroundColor: '#4ecdc4', color: 'white', border: 'none', borderRadius: '4px' }}>
          Add
        </button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        {['all', 'active', 'completed'].map(filter => (
          <button
            key={filter}
            onClick={() => mobxTodoStore.setFilter(filter as any)}
            style={{
              padding: '4px 12px',
              marginRight: '8px',
              backgroundColor: mobxTodoStore.filter === filter ? '#667eea' : '#f0f0f0',
              color: mobxTodoStore.filter === filter ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Stats:</strong> {mobxTodoStore.stats.total} total, {mobxTodoStore.stats.active} active, {mobxTodoStore.stats.completed} completed
      </div>

      <div>
        {mobxTodoStore.filteredTodos.map(todo => (
          <div key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => mobxTodoStore.toggleTodo(todo.id)}
              style={{ marginRight: '8px' }}
            />
            <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button
              onClick={() => mobxTodoStore.deleteTodo(todo.id)}
              style={{ padding: '4px 8px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <details style={{ marginTop: '15px' }}>
        <summary>MobX Code Example</summary>
        <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
{`// MobX Store
class TodoStore {
  todos = []
  filter = 'all'

  constructor() {
    makeAutoObservable(this)
  }

  addTodo(text) {
    this.todos.push({ id: Date.now(), text, completed: false })
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id)
    if (todo) todo.completed = !todo.completed
  }

  get filteredTodos() {
    return this.filter === 'all'
      ? this.todos
      : this.todos.filter(t => t.completed === (this.filter === 'completed'))
  }
}

// Component
const TodoList = observer(() => {
  return <div>{store.filteredTodos.map(todo => ...)}</div>
})`}
        </pre>
      </details>
    </div>
  )
})

// Zustand Todo Component
const ZustandTodoList = () => {
  const store = useZustandStore()
  const [newTodo, setNewTodo] = useState('')

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      store.addTodo(newTodo.trim())
      setNewTodo('')
    }
  }

  return (
    <div style={{ padding: '15px', border: '2px solid #667eea', borderRadius: '8px' }}>
      <h3>🏪 Zustand Store Example</h3>

      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add Zustand todo..."
          style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleAddTodo} style={{ padding: '8px 16px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px' }}>
          Add
        </button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        {['all', 'active', 'completed'].map(filter => (
          <button
            key={filter}
            onClick={() => store.setFilter(filter as any)}
            style={{
              padding: '4px 12px',
              marginRight: '8px',
              backgroundColor: store.filter === filter ? '#667eea' : '#f0f0f0',
              color: store.filter === filter ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Stats:</strong> {store.stats.total} total, {store.stats.active} active, {store.stats.completed} completed
      </div>

      <div>
        {store.filteredTodos.map(todo => (
          <div key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => store.toggleTodo(todo.id)}
              style={{ marginRight: '8px' }}
            />
            <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button
              onClick={() => store.deleteTodo(todo.id)}
              style={{ padding: '4px 8px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <details style={{ marginTop: '15px' }}>
        <summary>Zustand Code Example</summary>
        <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
{`// Zustand Store
import { create } from 'zustand'

const useTodoStore = create((set, get) => ({
  todos: [],
  filter: 'all',

  addTodo: (text) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), text, completed: false }]
  })),

  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),

  setFilter: (filter) => set({ filter }),

  get filteredTodos() {
    const { todos, filter } = get()
    return filter === 'all' ? todos : todos.filter(t =>
      t.completed === (filter === 'completed')
    )
  }
}))

// Component
const TodoList = () => {
  const { todos, addTodo, toggleTodo } = useTodoStore()
  return <div>...</div>
}`}
        </pre>
      </details>
    </div>
  )
}

// Redux Todo Component
const ReduxTodoList = () => {
  const store = useReduxStore()
  const [newTodo, setNewTodo] = useState('')

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      store.dispatch(store.actions.addTodo(newTodo.trim()))
      setNewTodo('')
    }
  }

  return (
    <div style={{ padding: '15px', border: '2px solid #ff6b6b', borderRadius: '8px' }}>
      <h3>🔄 Redux Store Example</h3>

      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add Redux todo..."
          style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleAddTodo} style={{ padding: '8px 16px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px' }}>
          Add
        </button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        {['all', 'active', 'completed'].map(filter => (
          <button
            key={filter}
            onClick={() => store.dispatch(store.actions.setFilter(filter as any))}
            style={{
              padding: '4px 12px',
              marginRight: '8px',
              backgroundColor: store.state.filter === filter ? '#ff6b6b' : '#f0f0f0',
              color: store.state.filter === filter ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Stats:</strong> {store.stats.total} total, {store.stats.active} active, {store.stats.completed} completed
      </div>

      <div>
        {store.filteredTodos.map(todo => (
          <div key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => store.dispatch(store.actions.toggleTodo(todo.id))}
              style={{ marginRight: '8px' }}
            />
            <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button
              onClick={() => store.dispatch(store.actions.deleteTodo(todo.id))}
              style={{ padding: '4px 8px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <details style={{ marginTop: '15px' }}>
        <summary>Redux Code Example</summary>
        <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
{`// Redux Store
const initialState = { todos: [], filter: 'all' }

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload.text,
          completed: false
        }]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    default:
      return state
  }
}

// Action Creators
const addTodo = (text) => ({ type: 'ADD_TODO', payload: { text } })
const toggleTodo = (id) => ({ type: 'TOGGLE_TODO', payload: { id } })

// Component
const TodoList = () => {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  return <div>...</div>
}`}
        </pre>
      </details>
    </div>
  )
}

const StateManagementPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🗃️ State Management Comparison</h1>
      <p>
        <em>Compare different state management solutions: MobX, Zustand, and Redux!</em>
      </p>

      <div style={{ display: 'grid', gap: '30px', marginBottom: '30px' }}>
        <MobXTodoList />
        <ZustandTodoList />
        <ReduxTodoList />
      </div>

      {/* Comparison Table */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>📊 Comparison Table</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#e9ecef' }}>
              <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Feature</th>
              <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>MobX</th>
              <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Zustand</th>
              <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' }}>Redux</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}><strong>Bundle Size</strong></td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>~16kB</td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>~2kB</td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>~45kB (with toolkit)</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}><strong>Learning Curve</strong></td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Medium</td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Easy</td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Steep</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}><strong>Boilerplate</strong></td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Low</td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Very Low</td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>High</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}><strong>DevTools</strong></td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Yes</td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Yes</td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Excellent</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}><strong>TypeScript</strong></td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Excellent</td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Excellent</td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Good (with RTK)</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}><strong>Performance</strong></td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Excellent</td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Good</td>
              <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Good</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
          <h3>🎯 Use MobX When</h3>
          <ul>
            <li>You prefer OOP patterns</li>
            <li>You want minimal boilerplate</li>
            <li>You need computed values</li>
            <li>You want automatic reactivity</li>
            <li>You have complex state logic</li>
          </ul>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
          <h3>🎯 Use Zustand When</h3>
          <ul>
            <li>You want simplicity</li>
            <li>You need small bundle size</li>
            <li>You prefer functional approach</li>
            <li>You want minimal setup</li>
            <li>You have simple to medium complexity</li>
          </ul>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#ffebee', borderRadius: '8px' }}>
          <h3>🎯 Use Redux When</h3>
          <ul>
            <li>You need predictable state updates</li>
            <li>You want time-travel debugging</li>
            <li>You have complex async logic</li>
            <li>You need middleware ecosystem</li>
            <li>You're working in large teams</li>
          </ul>
        </div>
      </div>

      {/* Installation Commands */}
      <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px' }}>
        <h2>📦 Installation Commands</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <div>
            <h3>MobX</h3>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`npm install mobx mobx-react
# or
yarn add mobx mobx-react`}
            </pre>
          </div>
          <div>
            <h3>Zustand</h3>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`npm install zustand
# or
yarn add zustand`}
            </pre>
          </div>
          <div>
            <h3>Redux</h3>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`npm install @reduxjs/toolkit react-redux
# or
yarn add @reduxjs/toolkit react-redux`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StateManagementPage
