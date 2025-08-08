import { useState, useEffect, useMemo, useCallback, useRef } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

type Filter = 'all' | 'active' | 'completed'

const TodoApp = () => {
  // 🎯 useState for managing todos array
  const [todos, setTodos] = useState<Todo[]>([])

  // 🎯 useState for input value
  const [inputValue, setInputValue] = useState('')

  // 🎯 useState for filter
  const [filter, setFilter] = useState<Filter>('all')

  // 🎯 useRef for focusing input
  const inputRef = useRef<HTMLInputElement>(null)

  // 🎯 useEffect to load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('react-todos')
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }))
        setTodos(parsedTodos)
      } catch (error) {
        console.error('Error loading todos from localStorage:', error)
      }
    }
  }, [])

  // 🎯 useEffect to save todos to localStorage when todos change
  useEffect(() => {
    localStorage.setItem('react-todos', JSON.stringify(todos))
  }, [todos])

  // 🎯 useEffect to focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // 🎯 useCallback for add todo (prevents unnecessary re-renders)
  const addTodo = useCallback(() => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date()
      }
      setTodos(prev => [...prev, newTodo])
      setInputValue('')
      inputRef.current?.focus()
    }
  }, [inputValue])

  // 🎯 useCallback for toggle todo
  const toggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }, [])

  // 🎯 useCallback for delete todo
  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [])

  // 🎯 useCallback for edit todo
  const editTodo = useCallback((id: number, newText: string) => {
    setTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)))
  }, [])

  // 🎯 useCallback for clear completed
  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }, [])

  // 🎯 useMemo for filtered todos (expensive calculation)
  const filteredTodos = useMemo(() => {
    console.log('🔄 Recalculating filtered todos...')
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  // 🎯 useMemo for statistics
  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter(todo => todo.completed).length
    const active = total - completed

    return { total, completed, active }
  }, [todos])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTodo()
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📝 Todo App - React Hooks Practice</h1>
      <p>
        <em>This app demonstrates multiple hooks working together!</em>
      </p>

      {/* Add Todo Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            style={{
              flex: 1,
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#4ecdc4',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Add
          </button>
        </div>
      </form>

      {/* Filter Buttons */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {(['all', 'active', 'completed'] as Filter[]).map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === filterType ? '#667eea' : '#f0f0f0',
              color: filter === filterType ? 'white' : '#333',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {filterType}
          </button>
        ))}
      </div>

      {/* Statistics */}
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-around',
          textAlign: 'center'
        }}
      >
        <div>
          <strong>{stats.total}</strong>
          <br />
          <small>Total</small>
        </div>
        <div>
          <strong>{stats.active}</strong>
          <br />
          <small>Active</small>
        </div>
        <div>
          <strong>{stats.completed}</strong>
          <br />
          <small>Completed</small>
        </div>
      </div>

      {/* Todo List */}
      <div style={{ marginBottom: '20px' }}>
        {filteredTodos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
            {filter === 'all' ? 'No todos yet. Add one above!' : `No ${filter} todos.`}
          </p>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
          ))
        )}
      </div>

      {/* Clear Completed Button */}
      {stats.completed > 0 && (
        <button
          onClick={clearCompleted}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Clear Completed ({stats.completed})
        </button>
      )}

      {/* Hooks Used Section */}
      <div
        style={{
          backgroundColor: '#e8f5e8',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '30px',
          fontSize: '14px'
        }}
      >
        <h3>🪝 Hooks Used in This App:</h3>
        <ul>
          <li>
            <strong>useState:</strong> Managing todos, input value, and filter state
          </li>
          <li>
            <strong>useEffect:</strong> Loading/saving to localStorage, focusing input
          </li>
          <li>
            <strong>useMemo:</strong> Filtering todos and calculating statistics (performance optimization)
          </li>
          <li>
            <strong>useCallback:</strong> Memoizing event handlers to prevent unnecessary re-renders
          </li>
          <li>
            <strong>useRef:</strong> Focusing the input element
          </li>
        </ul>
        <p>
          <strong>Teaching points:</strong> Notice how hooks work together to create a complete, performant application!
        </p>
      </div>
    </div>
  )
}

// Separate TodoItem component for better organization
interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, newText: string) => void
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const editInputRef = useRef<HTMLInputElement>(null)

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: todo.completed ? '#f8f9fa' : 'white',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: '8px',
        opacity: todo.completed ? 0.7 : 1
      }}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: '12px', transform: 'scale(1.2)' }}
      />

      {/* Todo Text or Edit Input */}
      <div style={{ flex: 1 }}>
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              width: '100%',
              padding: '4px',
              border: '1px solid #ddd',
              borderRadius: '3px'
            }}
          />
        ) : (
          <span
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
          Created: {todo.createdAt.toLocaleString()}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              style={{
                padding: '4px 8px',
                backgroundColor: '#4ecdc4',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: '4px 8px',
                backgroundColor: '#999',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoApp
