import { useState } from 'react'

const UsefulPackagesPage = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', age: 25, role: 'developer', active: true },
    { id: 2, name: 'Jane Smith', age: 30, role: 'designer', active: false },
    { id: 3, name: 'Bob Johnson', age: 35, role: 'developer', active: true },
    { id: 4, name: 'Alice Brown', age: 28, role: 'manager', active: true },
    { id: 5, name: 'Charlie Davis', age: 32, role: 'developer', active: false }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  // Native JavaScript implementations (what you'd write without libraries)
  const nativeExamples = {
    // Group by role
    groupByRole: (items: typeof users) => {
      return items.reduce((acc, user) => {
        if (!acc[user.role]) acc[user.role] = []
        acc[user.role].push(user)
        return acc
      }, {} as Record<string, typeof users>)
    },

    // Debounce function
    debounce: (func: Function, wait: number) => {
      let timeout: NodeJS.Timeout
      return function executedFunction(...args: any[]) {
        const later = () => {
          clearTimeout(timeout)
          func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    },

    // Deep clone
    deepClone: (obj: any): any => {
      if (obj === null || typeof obj !== 'object') return obj
      if (obj instanceof Date) return new Date(obj.getTime())
      if (obj instanceof Array) return obj.map(item => nativeExamples.deepClone(item))
      if (typeof obj === 'object') {
        const copy: any = {}
        Object.keys(obj).forEach(key => {
          copy[key] = nativeExamples.deepClone(obj[key])
        })
        return copy
      }
    },

    // Flatten array
    flattenArray: (arr: any[]): any[] => {
      return arr.reduce((flat, item) => {
        return flat.concat(Array.isArray(item) ? nativeExamples.flattenArray(item) : item)
      }, [])
    },

    // Pick properties
    pick: (obj: any, keys: string[]) => {
      return keys.reduce((result, key) => {
        if (obj[key] !== undefined) result[key] = obj[key]
        return result
      }, {} as any)
    }
  }

  // Simulated Lodash functions (showing what they would do)
  const lodashExamples = {
    groupBy: (items: typeof users, key: keyof typeof users[0]) => {
      return items.reduce((acc, item) => {
        const groupKey = String(item[key])
        if (!acc[groupKey]) acc[groupKey] = []
        acc[groupKey].push(item)
        return acc
      }, {} as Record<string, typeof users>)
    },

    uniqBy: (items: typeof users, key: keyof typeof users[0]) => {
      const seen = new Set()
      return items.filter(item => {
        const value = item[key]
        if (seen.has(value)) return false
        seen.add(value)
        return true
      })
    },

    sortBy: (items: typeof users, key: keyof typeof users[0]) => {
      return [...items].sort((a, b) => {
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
        return 0
      })
    },

    chunk: (array: any[], size: number) => {
      const chunks = []
      for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size))
      }
      return chunks
    }
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRole === '' || user.role === selectedRole)
  )

  const groupedUsers = lodashExamples.groupBy(filteredUsers, 'role')
  const sortedUsers = lodashExamples.sortBy(filteredUsers, 'age')
  const uniqueRoles = lodashExamples.uniqBy(users, 'role').map(u => u.role)

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>📦 Useful JavaScript Packages Demo</h1>
      <p>
        <em>Learn about popular utility libraries and see how they simplify common tasks!</em>
      </p>

      {/* Lodash Examples */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #4ecdc4', borderRadius: '8px' }}>
        <h3>🧩 Lodash-style Utilities</h3>
        <p>
          <strong>Lodash</strong> is a popular utility library that provides helpful functions for working with arrays,
          objects, and other data types.
        </p>

        <div style={{ marginBottom: '20px' }}>
          <h4>Data Filtering & Search</h4>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ padding: '8px', margin: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            style={{ padding: '8px', margin: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">All Roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>📊 Grouped by Role (_.groupBy)</h4>
            {Object.entries(groupedUsers).map(([role, roleUsers]) => (
              <div key={role} style={{ marginBottom: '10px' }}>
                <strong>{role} ({roleUsers.length}):</strong>
                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                  {roleUsers.map(user => (
                    <li key={user.id}>{user.name} ({user.age})</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h4>📈 Sorted by Age (_.sortBy)</h4>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              {sortedUsers.map(user => (
                <li key={user.id}>
                  {user.name} - {user.age} years ({user.role})
                </li>
              ))}
            </ul>
          </div>
        </div>

        <details style={{ marginTop: '15px' }}>
          <summary>View Code Examples</summary>
          <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
{`// With Lodash
import _ from 'lodash'

const groupedUsers = _.groupBy(users, 'role')
const sortedUsers = _.sortBy(users, 'age')
const uniqueRoles = _.uniqBy(users, 'role')
const chunks = _.chunk(array, 3)

// Native JavaScript equivalent
const groupedUsers = users.reduce((acc, user) => {
  if (!acc[user.role]) acc[user.role] = []
  acc[user.role].push(user)
  return acc
}, {})`}
          </pre>
        </details>
      </div>

      {/* Date/Time Libraries */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #667eea', borderRadius: '8px' }}>
        <h3>📅 Date/Time Libraries</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>Day.js (Lightweight)</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import dayjs from 'dayjs'

// Current date
dayjs().format('YYYY-MM-DD')
// Result: ${new Date().toISOString().split('T')[0]}

// Add time
dayjs().add(7, 'day')
// Relative time
dayjs().fromNow()

// Only 2kB gzipped!`}
            </pre>
          </div>
          <div>
            <h4>Native Date (Built-in)</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`// Current date
new Date().toISOString().split('T')[0]
// Result: ${new Date().toISOString().split('T')[0]}

// Add 7 days
const date = new Date()
date.setDate(date.getDate() + 7)

// More verbose but no dependencies`}
            </pre>
          </div>
        </div>
      </div>

      {/* Form Validation */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #ffa726', borderRadius: '8px' }}>
        <h3>✅ Form Validation Libraries</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>Yup (Schema Validation)</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.number().min(18).max(100)
})

// Validate
await schema.validate(formData)`}
            </pre>
          </div>
          <div>
            <h4>Zod (TypeScript-first)</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import { z } from 'zod'

const User = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(18).max(100)
})

type User = z.infer<typeof User>`}
            </pre>
          </div>
        </div>
      </div>

      {/* State Management */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #9c27b0', borderRadius: '8px' }}>
        <h3>🗃️ State Management Libraries</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>Zustand (Simple)</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) =>
    ({ count: state.count + 1 })
  ),
}))

// In component
const { count, increment } = useStore()`}
            </pre>
          </div>
          <div>
            <h4>React Query (Server State)</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import { useQuery } from '@tanstack/react-query'

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  // Automatic caching, refetching!
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* UI Libraries */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #ff6b6b', borderRadius: '8px' }}>
        <h3>🎨 UI Component Libraries</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <h4>Material-UI (MUI)</h4>
            <p>Google's Material Design</p>
            <code>npm install @mui/material</code>
          </div>
          <div>
            <h4>Ant Design</h4>
            <p>Enterprise-grade components</p>
            <code>npm install antd</code>
          </div>
          <div>
            <h4>Chakra UI</h4>
            <p>Simple & composable</p>
            <code>npm install @chakra-ui/react</code>
          </div>
          <div>
            <h4>Mantine</h4>
            <p>Full-featured library</p>
            <code>npm install @mantine/core</code>
          </div>
        </div>
      </div>

      {/* Package Installation Guide */}
      <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>📦 Package Installation Commands</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h3>Essential Utilities</h3>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`# Lodash
npm install lodash
npm install @types/lodash

# Date manipulation
npm install dayjs

# Form validation
npm install yup
npm install zod

# State management
npm install zustand
npm install @tanstack/react-query`}
            </pre>
          </div>
          <div>
            <h3>Development Tools</h3>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`# Testing
npm install jest @testing-library/react

# Linting
npm install eslint prettier

# Build tools
npm install vite
npm install webpack

# Type checking
npm install typescript
npm install @types/react`}
            </pre>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff3e0', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>💡 When to Use External Packages</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h3>✅ Good Reasons</h3>
            <ul>
              <li>Complex functionality (date manipulation, validation)</li>
              <li>Battle-tested solutions</li>
              <li>Time-saving for common tasks</li>
              <li>Better browser compatibility</li>
              <li>Active maintenance & security updates</li>
            </ul>
          </div>
          <div>
            <h3>⚠️ Be Careful With</h3>
            <ul>
              <li>Bundle size impact</li>
              <li>Over-dependency on external code</li>
              <li>Security vulnerabilities</li>
              <li>Package maintenance status</li>
              <li>Learning curve vs. native solutions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsefulPackagesPage
