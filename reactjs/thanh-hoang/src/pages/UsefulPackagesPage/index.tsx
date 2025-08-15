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

      {/* Form Management & Validation */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #ffa726', borderRadius: '8px' }}>
        <h3>📝 Form Management & Validation</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h4>React Hook Form (Recommended)</h4>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '10px' }}>
{`import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup.number().min(18, 'Must be 18+').required()
})

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      email: '',
      age: ''
    }
  })

  const onSubmit = async (data) => {
    try {
      await api.post('/users', data)
      reset() // Clear form
    } catch (error) {
      console.error('Submission failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('firstName')}
        placeholder="First Name"
      />
      {errors.firstName && <span>{errors.firstName.message}</span>}

      <input
        {...register('email')}
        type="email"
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register('age', { valueAsNumber: true })}
        type="number"
        placeholder="Age"
      />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}`}
            </pre>
          </div>
          <div>
            <h4>Formik (Alternative)</h4>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '10px' }}>
{`import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  age: Yup.number().min(18, 'Must be 18+').required('Required')
})

function MyForm() {
  return (
    <Formik
      initialValues={{
        firstName: '',
        email: '',
        age: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await api.post('/users', values)
          resetForm()
        } catch (error) {
          console.error('Submission failed:', error)
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="firstName" placeholder="First Name" />
          <ErrorMessage name="firstName" component="div" />

          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />

          <Field name="age" type="number" placeholder="Age" />
          <ErrorMessage name="age" component="div" />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </Form>
      )}
    </Formik>
  )
}`}
            </pre>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>Yup (Schema Validation)</h4>
            <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '10px' }}>
{`import * as yup from 'yup'

const userSchema = yup.object({
  name: yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  age: yup.number()
    .min(18, 'Must be at least 18')
    .max(100, 'Must be less than 100')
    .required('Age is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain uppercase letter')
    .matches(/[0-9]/, 'Must contain number')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
})

// Validate manually
try {
  await userSchema.validate(formData, { abortEarly: false })
} catch (error) {
  console.log(error.errors) // Array of validation errors
}`}
            </pre>
          </div>
          <div>
            <h4>Zod (TypeScript-first)</h4>
            <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '10px' }}>
{`import { z } from 'zod'

const userSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Invalid email format'),
  age: z.number()
    .min(18, 'Must be at least 18')
    .max(100, 'Must be less than 100'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain number'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// Infer TypeScript type from schema
type User = z.infer<typeof userSchema>

// Validate
const result = userSchema.safeParse(formData)
if (!result.success) {
  console.log(result.error.issues) // Validation errors
}`}
            </pre>
          </div>
        </div>
      </div>



      {/* UI Component Libraries */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #ff6b6b', borderRadius: '8px' }}>
        <h3>🎨 UI Component Libraries</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h4>Material-UI (MUI) - Most Popular</h4>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '10px' }}>
{`import {
  Button, TextField, Card, CardContent,
  Typography, Box, Grid, Paper, AppBar,
  Toolbar, IconButton, ThemeProvider,
  createTheme
} from '@mui/material'
import { Delete, Edit, Add } from '@mui/icons-material'

// Custom theme
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  User Form
                </Typography>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                />
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    sx={{ mr: 1 }}
                  >
                    Add User
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}`}
            </pre>
          </div>
          <div>
            <h4>Ant Design - Enterprise Ready</h4>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '10px' }}>
{`import {
  Button, Form, Input, Card, Table, Space,
  Layout, Menu, Avatar, Dropdown, message,
  DatePicker, Select, Modal, Pagination
} from 'antd'
import {
  UserOutlined, SettingOutlined,
  LogoutOutlined, DeleteOutlined
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout

function App() {
  const [form] = Form.useForm()

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">Edit</Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      )
    }
  ]

  const handleSubmit = (values) => {
    message.success('User created successfully!')
    form.resetFields()
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: 'white', fontSize: '18px' }}>
          Admin Panel
        </div>
      </Header>

      <Content style={{ padding: '24px' }}>
        <Card title="User Management" style={{ marginBottom: 24 }}>
          <Form form={form} onFinish={handleSubmit} layout="inline">
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item name="age">
              <Select placeholder="Age" style={{ width: 120 }}>
                <Select.Option value={25}>25</Select.Option>
                <Select.Option value={30}>30</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add User
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Table
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 10 }}
        />
      </Content>
    </Layout>
  )
}`}
            </pre>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h4>Chakra UI - Simple & Modular</h4>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '10px' }}>
{`import {
  ChakraProvider, Box, VStack, HStack,
  Button, Input, FormControl, FormLabel,
  Card, CardHeader, CardBody, CardFooter,
  Heading, Text, useColorMode, useToast,
  Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalCloseButton,
  useDisclosure, IconButton, Flex
} from '@chakra-ui/react'
import { AddIcon, EditIcon, DeleteIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const handleSubmit = () => {
    toast({
      title: 'User created',
      description: "We've created your user account.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    onClose()
  }

  return (
    <ChakraProvider>
      <Box minH="100vh" bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
        <Flex justify="space-between" align="center" p={4} bg="white" shadow="sm">
          <Heading size="lg">My App</Heading>
          <HStack>
            <IconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
            />
            <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
              Add User
            </Button>
          </HStack>
        </Flex>

        <Box p={6}>
          <VStack spacing={6} align="stretch">
            <Card>
              <CardHeader>
                <Heading size="md">User Management</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {users.map(user => (
                    <Box key={user.id} p={4} border="1px" borderColor="gray.200" rounded="md">
                      <HStack justify="space-between">
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text color="gray.600">{user.email}</Text>
                        </VStack>
                        <HStack>
                          <IconButton icon={<EditIcon />} size="sm" />
                          <IconButton icon={<DeleteIcon />} size="sm" colorScheme="red" />
                        </HStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New User</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Enter name" />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Enter email" />
                </FormControl>
                <HStack spacing={4} w="full">
                  <Button colorScheme="blue" onClick={handleSubmit} flex={1}>
                    Save
                  </Button>
                  <Button onClick={onClose} flex={1}>Cancel</Button>
                </HStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  )
}`}
            </pre>
          </div>
          <div>
            <h4>Mantine - Feature Rich</h4>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '10px' }}>
{`import {
  MantineProvider, AppShell, Header, Navbar,
  Button, TextInput, Card, Group, Stack,
  Table, ActionIcon, Modal, Title, Text,
  Notification, showNotification, Badge,
  Avatar, Menu, ColorSchemeToggle,
  Pagination, Select, DateInput
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit, IconTrash, IconPlus, IconDots } from '@tabler/icons-react'

function App() {
  const [opened, { open, close }] = useDisclosure(false)

  const handleSubmit = (values) => {
    showNotification({
      title: 'Success!',
      message: 'User has been created successfully',
      color: 'green',
    })
    close()
  }

  const rows = users.map((user) => (
    <tr key={user.id}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={user.avatar} radius={30} />
          <Text size="sm" weight={500}>
            {user.name}
          </Text>
        </Group>
      </td>
      <td>{user.email}</td>
      <td>
        <Badge color={user.status === 'active' ? 'green' : 'red'} variant="light">
          {user.status}
        </Badge>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconEdit size="1rem" />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size="1rem" />
          </ActionIcon>
          <Menu transition="pop" withArrow position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>View details</Menu.Item>
              <Menu.Item>Send email</Menu.Item>
              <Menu.Item color="red">Block user</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  ))

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        header={
          <Header height={60} p="md">
            <Group position="apart">
              <Title order={3}>Admin Dashboard</Title>
              <Group>
                <ColorSchemeToggle />
                <Button leftIcon={<IconPlus size="1rem" />} onClick={open}>
                  Add User
                </Button>
              </Group>
            </Group>
          </Header>
        }
      >
        <Stack spacing="lg">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group position="apart" mb="xs">
              <Title order={4}>Users</Title>
              <Badge color="blue" variant="light">
                {users.length} total
              </Badge>
            </Group>

            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>

            <Group position="center" mt="lg">
              <Pagination total={10} />
            </Group>
          </Card>
        </Stack>

        <Modal opened={opened} onClose={close} title="Add New User">
          <Stack>
            <TextInput label="Name" placeholder="Enter user name" required />
            <TextInput label="Email" placeholder="Enter email" type="email" required />
            <Select
              label="Role"
              placeholder="Select role"
              data={[
                { value: 'admin', label: 'Administrator' },
                { value: 'user', label: 'User' },
                { value: 'moderator', label: 'Moderator' },
              ]}
            />
            <DateInput label="Start Date" placeholder="Select date" />
            <Group position="right" mt="md">
              <Button variant="subtle" onClick={close}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Create User</Button>
            </Group>
          </Stack>
        </Modal>
      </AppShell>
    </MantineProvider>
  )
}`}
            </pre>
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
          <h4>🎯 UI Library Comparison</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div>
              <h5>Material-UI (MUI)</h5>
              <ul style={{ fontSize: '12px', margin: 0, paddingLeft: '16px' }}>
                <li>✅ Most popular & mature</li>
                <li>✅ Excellent TypeScript support</li>
                <li>✅ Comprehensive theming</li>
                <li>✅ Google Material Design</li>
                <li>⚠️ Larger bundle size</li>
                <li>⚠️ Steeper learning curve</li>
              </ul>
            </div>
            <div>
              <h5>Ant Design</h5>
              <ul style={{ fontSize: '12px', margin: 0, paddingLeft: '16px' }}>
                <li>✅ Enterprise-focused</li>
                <li>✅ Rich component set</li>
                <li>✅ Built-in form validation</li>
                <li>✅ Consistent design language</li>
                <li>⚠️ Less customization flexibility</li>
                <li>⚠️ Opinionated styling</li>
              </ul>
            </div>
            <div>
              <h5>Chakra UI</h5>
              <ul style={{ fontSize: '12px', margin: 0, paddingLeft: '16px' }}>
                <li>✅ Simple & intuitive API</li>
                <li>✅ Excellent accessibility</li>
                <li>✅ Built-in dark mode</li>
                <li>✅ Smaller bundle size</li>
                <li>⚠️ Smaller component library</li>
                <li>⚠️ Less mature ecosystem</li>
              </ul>
            </div>
            <div>
              <h5>Mantine</h5>
              <ul style={{ fontSize: '12px', margin: 0, paddingLeft: '16px' }}>
                <li>✅ Feature-rich components</li>
                <li>✅ Built-in hooks & utilities</li>
                <li>✅ Excellent developer experience</li>
                <li>✅ Modern design system</li>
                <li>⚠️ Newer library</li>
                <li>⚠️ Smaller community</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Libraries */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #e91e63', borderRadius: '8px' }}>
        <h3>🎬 Animation Libraries</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>Framer Motion (React-focused)</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</motion.div>

// Gesture support, layout animations`}
            </pre>
          </div>
          <div>
            <h4>React Spring (Physics-based)</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import { useSpring, animated } from '@react-spring/web'

const styles = useSpring({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

return <animated.div style={styles}>Content</animated.div>`}
            </pre>
          </div>
        </div>
      </div>

      {/* Styling Libraries */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #00bcd4', borderRadius: '8px' }}>
        <h3>🎨 Styling & CSS-in-JS Libraries</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>Styled Components</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import styled from 'styled-components'

const Button = styled.button\`
  background: \${props => props.primary ? 'blue' : 'white'};
  color: \${props => props.primary ? 'white' : 'blue'};
  border: 2px solid blue;
  border-radius: 3px;
\`

<Button primary>Primary Button</Button>`}
            </pre>
          </div>
          <div>
            <h4>Emotion</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import { css } from '@emotion/react'

const buttonStyle = css\`
  background-color: hotpink;
  &:hover {
    color: turquoise;
  }
\`

<button css={buttonStyle}>Emotion Button</button>`}
            </pre>
          </div>
        </div>
        <div style={{ marginTop: '15px' }}>
          <h4>Tailwind CSS (Utility-first)</h4>
          <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`<!-- Utility classes for rapid styling -->
<div class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Tailwind Button
</div>

<!-- No CSS files needed, everything in HTML -->`}
          </pre>
        </div>
      </div>

      {/* Testing Libraries */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #4caf50', borderRadius: '8px' }}>
        <h3>🧪 Testing Libraries</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>React Testing Library</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import { render, screen, fireEvent } from '@testing-library/react'

test('button click', () => {
  render(<Button>Click me</Button>)

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(button).toHaveTextContent('Clicked')
})`}
            </pre>
          </div>
          <div>
            <h4>Vitest (Fast test runner)</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import { describe, it, expect } from 'vitest'

describe('Math utils', () => {
  it('should add numbers', () => {
    expect(add(2, 3)).toBe(5)
  })
})

// Fast, Vite-powered testing`}
            </pre>
          </div>
        </div>
        <div style={{ marginTop: '15px' }}>
          <h4>MSW (Mock Service Worker)</h4>
          <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import { rest } from 'msw'

const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: 'John' }]))
  }),
]

// Mock API calls in tests and development`}
          </pre>
        </div>
      </div>

      {/* API Calling Libraries */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #ff9800', borderRadius: '8px' }}>
        <h3>🌐 API Calling & HTTP Libraries</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h4>Axios (Most Popular)</h4>
            <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '10px' }}>
{`import axios from 'axios'

// Global configuration
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Interceptors for auth & error handling
api.interceptors.request.use(config => {
  config.headers.Authorization = \`Bearer \${getToken()}\`
  return config
})

api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      logout()
    }
    return Promise.reject(error)
  }
)

// Usage
const { data } = await api.get('/users')
const user = await api.post('/users', userData)`}
            </pre>
          </div>
          <div>
            <h4>Native Fetch (Built-in)</h4>
            <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '10px' }}>
{`// Native fetch with error handling
const apiCall = async (url, options = {}) => {
  const response = await fetch(\`\${BASE_URL}\${url}\`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${getToken()}\`,
      ...options.headers
    },
    ...options
  })

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
  }

  return response.json()
}

// Usage
const users = await apiCall('/users')
const user = await apiCall('/users', {
  method: 'POST',
  body: JSON.stringify(userData)
})`}
            </pre>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>SWR (Data Fetching with Cache)</h4>
            <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '10px' }}>
{`import useSWR, { mutate } from 'swr'

// Custom fetcher
const fetcher = (url) => api.get(url).then(res => res.data)

function UserProfile({ userId }) {
  const { data, error, isLoading } = useSWR(
    \`/users/\${userId}\`,
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30s
      revalidateOnFocus: true,
      errorRetryCount: 3
    }
  )

  // Manual revalidation
  const updateUser = async (userData) => {
    await api.put(\`/users/\${userId}\`, userData)
    mutate(\`/users/\${userId}\`) // Revalidate cache
  }

  if (error) return <div>Error: {error.message}</div>
  if (isLoading) return <div>Loading...</div>
  return <div>Hello {data.name}!</div>
}`}
            </pre>
          </div>
          <div>
            <h4>React Query (TanStack Query)</h4>
            <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '10px' }}>
{`import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

function UserProfile({ userId }) {
  const queryClient = useQueryClient()

  // Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.get(\`/users/\${userId}\`),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })

  // Mutation
  const updateUser = useMutation({
    mutationFn: (userData) => api.put(\`/users/\${userId}\`, userData),
    onSuccess: () => {
      queryClient.invalidateQueries(['user', userId])
    }
  })

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && <div>Hello {data.name}!</div>}
    </div>
  )
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Utility Hooks */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #9c27b0', borderRadius: '8px' }}>
        <h3>🪝 React Utility Hooks</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>React Use (Collection)</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import { useLocalStorage, useDebounce, useToggle } from 'react-use'

function Component() {
  const [value, setValue] = useLocalStorage('key', 'default')
  const [isOn, toggle] = useToggle(false)
  const debouncedValue = useDebounce(value, 500)

  return <div>{debouncedValue}</div>
}`}
            </pre>
          </div>
          <div>
            <h4>Ahooks (React hooks library)</h4>
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '10px' }}>
{`import { useRequest, useCountDown, useVirtualList } from 'ahooks'

const { data, loading, error } = useRequest(fetchUserList)

const [countdown] = useCountDown({
  targetDate: Date.now() + 10000,
})

// 100+ production-ready hooks`}
            </pre>
          </div>
        </div>
      </div>

      {/* Development Tools */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #607d8b', borderRadius: '8px' }}>
        <h3>🛠️ Development & Build Tools</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div>
            <h4>Vite (Build tool)</h4>
            <p>Lightning fast dev server</p>
            <code style={{ fontSize: '11px' }}>npm create vite@latest my-app</code>
          </div>
          <div>
            <h4>Storybook (Component dev)</h4>
            <p>Develop UI components in isolation</p>
            <code style={{ fontSize: '11px' }}>npx storybook@latest init</code>
          </div>
          <div>
            <h4>React DevTools</h4>
            <p>Browser extension for debugging</p>
            <code style={{ fontSize: '11px' }}>Chrome/Firefox extension</code>
          </div>
          <div>
            <h4>Playwright (E2E testing)</h4>
            <p>End-to-end testing framework</p>
            <code style={{ fontSize: '11px' }}>npm init playwright@latest</code>
          </div>
        </div>
      </div>

      {/* Package Installation Guide */}
      <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>📦 Package Installation Commands</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px' }}>
          <div>
            <h3>API & Forms</h3>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '8px' }}>
{`# HTTP & Data Fetching
pnpm add axios swr @tanstack/react-query

# Form Management
pnpm add react-hook-form formik
pnpm add @hookform/resolvers

# Validation
pnpm add yup zod

# Date handling
pnpm add dayjs date-fns

# Utilities
pnpm add lodash @types/lodash`}
            </pre>
          </div>
          <div>
            <h3>UI & Styling</h3>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '8px' }}>
{`# UI Libraries
pnpm add @mui/material antd @chakra-ui/react @mantine/core

# CSS-in-JS
pnpm add styled-components @emotion/react
pnpm add -D tailwindcss

# Animation
pnpm add framer-motion @react-spring/web

# Icons
pnpm add react-icons lucide-react`}
            </pre>
          </div>
          <div>
            <h3>Monitoring & Analytics</h3>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '8px' }}>
{`# Error Monitoring
pnpm add @sentry/react logrocket

# Analytics
pnpm add react-facebook-pixel
pnpm add mixpanel-browser

# Logging
pnpm add winston pino

# Performance
pnpm add webpack-bundle-analyzer
pnpm add why-did-you-render`}
            </pre>
          </div>
          <div>
            <h3>Development & Testing</h3>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '8px' }}>
{`# Testing
pnpm add -D vitest @testing-library/react
pnpm add -D playwright msw

# Build Tools
pnpm add -D vite @vitejs/plugin-react
pnpm add -D @storybook/react

# Code Quality
pnpm add -D eslint prettier
pnpm add -D @typescript-eslint/parser

# Utilities
pnpm add react-use ahooks`}
            </pre>
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
          <h3>🚀 All-in-One Setup Commands</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4>Production Dependencies</h4>
              <pre style={{ fontSize: '9px', background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
{`# Essential production packages
pnpm add axios @tanstack/react-query react-hook-form \\
  @hookform/resolvers yup zod dayjs lodash \\
  @mui/material framer-motion styled-components \\
  @sentry/react react-facebook-pixel mixpanel-browser \\
  react-use zustand react-icons @types/lodash`}
              </pre>
            </div>
            <div>
              <h4>Development Dependencies</h4>
              <pre style={{ fontSize: '9px', background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
{`# Development and testing packages
pnpm add -D vitest @testing-library/react \\
  @testing-library/user-event playwright msw \\
  eslint prettier @typescript-eslint/parser \\
  @typescript-eslint/eslint-plugin tailwindcss \\
  webpack-bundle-analyzer @storybook/react`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Tracking */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #673ab7', borderRadius: '8px' }}>
        <h3>📊 Analytics & User Tracking</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h4>Google Analytics 4 (GA4)</h4>
            <pre style={{ fontSize: '9px', background: '#f5f5f5', padding: '10px' }}>
{`// Using gtag (Google's official library)
// 1. Add to public/index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

// 2. React integration
import { useEffect } from 'react'

// Track page views
const usePageTracking = () => {
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [])
}

// Track custom events
export const trackEvent = (action, category, label = '', value = 0) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Usage in components
const ProductPage = () => {
  usePageTracking()

  const handlePurchase = () => {
    trackEvent('purchase', 'ecommerce', 'product-123', 29.99)

    // Enhanced ecommerce tracking
    window.gtag('event', 'purchase', {
      transaction_id: 'T12345',
      value: 29.99,
      currency: 'USD',
      items: [{
        item_id: 'SKU123',
        item_name: 'Product Name',
        category: 'Electronics',
        quantity: 1,
        price: 29.99
      }]
    })
  }

  return <button onClick={handlePurchase}>Buy Now</button>
}

// User identification
const identifyUser = (userId, userProperties = {}) => {
  window.gtag('config', 'GA_MEASUREMENT_ID', {
    user_id: userId,
    custom_map: userProperties
  })
}`}
            </pre>
          </div>
          <div>
            <h4>Facebook Pixel</h4>
            <pre style={{ fontSize: '9px', background: '#f5f5f5', padding: '10px' }}>
{`// 1. Initialize Facebook Pixel
// Add to public/index.html or use react-facebook-pixel
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');

// 2. React integration with react-facebook-pixel
import ReactPixel from 'react-facebook-pixel'

// Initialize
ReactPixel.init('YOUR_PIXEL_ID', {
  autoConfig: true,
  debug: process.env.NODE_ENV === 'development',
})

// Track page views
const usePixelPageTracking = () => {
  useEffect(() => {
    ReactPixel.pageView()
  }, [])
}

// Track custom events
export const trackPixelEvent = (event, parameters = {}) => {
  ReactPixel.track(event, parameters)
}

// Standard events
const handleAddToCart = (product) => {
  ReactPixel.track('AddToCart', {
    content_ids: [product.id],
    content_type: 'product',
    value: product.price,
    currency: 'USD'
  })
}

const handlePurchase = (order) => {
  ReactPixel.track('Purchase', {
    content_ids: order.items.map(item => item.id),
    content_type: 'product',
    value: order.total,
    currency: 'USD',
    num_items: order.items.length
  })
}

// Custom events
const handleSignUp = (method) => {
  ReactPixel.trackCustom('CompleteRegistration', {
    method: method, // 'email', 'google', 'facebook'
    content_name: 'User Registration'
  })
}`}
            </pre>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>Heap Analytics</h4>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '10px' }}>
{`// 1. Install Heap
window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};
var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";
var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);
for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
heap.load("YOUR_APP_ID");

// 2. React integration
import { useEffect } from 'react'

// Identify users
export const identifyHeapUser = (userId, properties = {}) => {
  if (window.heap) {
    window.heap.identify(userId)
    window.heap.addUserProperties(properties)
  }
}

// Track events
export const trackHeapEvent = (eventName, properties = {}) => {
  if (window.heap) {
    window.heap.track(eventName, properties)
  }
}

// Usage in components
const UserProfile = ({ user }) => {
  useEffect(() => {
    // Identify user
    identifyHeapUser(user.id, {
      email: user.email,
      plan: user.plan,
      signup_date: user.createdAt,
      is_premium: user.isPremium
    })
  }, [user])

  const handleFeatureUse = (featureName) => {
    trackHeapEvent('Feature Used', {
      feature_name: featureName,
      user_plan: user.plan,
      page_url: window.location.href
    })
  }

  return (
    <div>
      <button onClick={() => handleFeatureUse('export_data')}>
        Export Data
      </button>
    </div>
  )
}`}
            </pre>
          </div>
          <div>
            <h4>Mixpanel</h4>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '10px' }}>
{`import mixpanel from 'mixpanel-browser'

// Initialize Mixpanel
mixpanel.init('YOUR_PROJECT_TOKEN', {
  debug: process.env.NODE_ENV === 'development',
  track_pageview: true,
  persistence: 'localStorage'
})

// Identify users
export const identifyMixpanelUser = (userId, properties = {}) => {
  mixpanel.identify(userId)
  mixpanel.people.set(properties)
}

// Track events
export const trackMixpanelEvent = (eventName, properties = {}) => {
  mixpanel.track(eventName, {
    ...properties,
    timestamp: new Date().toISOString(),
    page_url: window.location.href
  })
}

// Track page views
export const trackPageView = (pageName) => {
  mixpanel.track('Page Viewed', {
    page_name: pageName,
    url: window.location.href,
    referrer: document.referrer
  })
}

// Funnel tracking
export const trackFunnelStep = (funnelName, step, properties = {}) => {
  mixpanel.track(\`\${funnelName} - \${step}\`, {
    funnel_name: funnelName,
    funnel_step: step,
    ...properties
  })
}

// Usage
const CheckoutFlow = () => {
  useEffect(() => {
    trackFunnelStep('Purchase', 'Checkout Started')
  }, [])

  const handlePayment = () => {
    trackFunnelStep('Purchase', 'Payment Submitted', {
      payment_method: 'credit_card',
      amount: orderTotal
    })
  }
}`}
            </pre>
          </div>
        </div>

        <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f3e5f5', borderRadius: '8px' }}>
          <h4>🎯 Analytics Best Practices</h4>
          <ul style={{ fontSize: '12px', lineHeight: '1.6', margin: 0 }}>
            <li><strong>Privacy Compliance:</strong> Implement cookie consent and respect user preferences</li>
            <li><strong>Performance:</strong> Load analytics scripts asynchronously to avoid blocking</li>
            <li><strong>Data Quality:</strong> Validate events and implement consistent naming conventions</li>
            <li><strong>Testing:</strong> Use debug modes in development and test environments</li>
            <li><strong>GDPR/CCPA:</strong> Allow users to opt-out and provide data deletion capabilities</li>
            <li><strong>Multiple Platforms:</strong> Use a data layer pattern for consistent tracking across tools</li>
          </ul>
        </div>
      </div>

      {/* React Ecosystem Tools */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #ff5722', borderRadius: '8px' }}>
        <h3>⚛️ React Ecosystem Tools</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          <div>
            <h4>Next.js (React Framework)</h4>
            <p>Full-stack React framework with SSR, routing, and more</p>
            <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '8px' }}>
{`npx create-next-app@latest my-app
# File-based routing, API routes, SSR/SSG`}
            </pre>
          </div>
          <div>
            <h4>React Router (Client routing)</h4>
            <p>Declarative routing for React applications</p>
            <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '8px' }}>
{`pnpm add react-router-dom
# Already used in this project!`}
            </pre>
          </div>
          <div>
            <h4>React Hook Form (Forms)</h4>
            <p>Performant forms with easy validation</p>
            <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '8px' }}>
{`const { register, handleSubmit } = useForm()
// Minimal re-renders, built-in validation`}
            </pre>
          </div>
          <div>
            <h4>React Error Boundary</h4>
            <p>Catch JavaScript errors in component tree</p>
            <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '8px' }}>
{`pnpm add react-error-boundary
# Used in this project's ErrorBoundary!`}
            </pre>
          </div>
        </div>
      </div>

      {/* Error Monitoring & Logging */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #d32f2f', borderRadius: '8px' }}>
        <h3>🚨 Error Monitoring & Logging</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h4>Sentry (Most Popular)</h4>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '10px' }}>
{`import * as Sentry from '@sentry/react'

// Initialize Sentry
Sentry.init({
  dsn: 'YOUR_DSN_HERE',
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // Filter sensitive data
    if (event.exception) {
      const error = event.exception.values?.[0]
      if (error?.value?.includes('password')) {
        return null // Don't send password-related errors
      }
    }
    return event
  }
})

// Error Boundary Component
const SentryErrorBoundary = Sentry.withErrorBoundary(MyComponent, {
  fallback: ({ error, resetError }) => (
    <div>
      <h2>Something went wrong</h2>
      <details>{error.message}</details>
      <button onClick={resetError}>Try again</button>
    </div>
  ),
  beforeCapture: (scope, error, info) => {
    scope.setTag('errorBoundary', true)
    scope.setContext('componentStack', { info })
  }
})

// Manual error reporting
try {
  riskyOperation()
} catch (error) {
  Sentry.captureException(error, {
    tags: { section: 'payment' },
    user: { id: userId, email: userEmail },
    extra: { formData, timestamp: Date.now() }
  })
}

// Custom breadcrumbs
Sentry.addBreadcrumb({
  message: 'User clicked checkout button',
  category: 'user.interaction',
  level: 'info'
})

// Performance monitoring
const transaction = Sentry.startTransaction({
  name: 'API Call',
  op: 'http.client'
})
Sentry.getCurrentHub().configureScope(scope => scope.setSpan(transaction))
// ... API call
transaction.finish()`}
            </pre>
          </div>
          <div>
            <h4>LogRocket (Session Replay)</h4>
            <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '10px' }}>
{`import LogRocket from 'logrocket'

// Initialize LogRocket
LogRocket.init('YOUR_APP_ID', {
  console: {
    shouldAggregateConsoleErrors: true,
  },
  network: {
    requestSanitizer: request => {
      // Remove sensitive data from requests
      if (request.headers.authorization) {
        request.headers.authorization = '[Filtered]'
      }
      return request
    }
  }
})

// Identify user
LogRocket.identify(userId, {
  name: userName,
  email: userEmail,
  plan: userPlan
})

// Custom events
LogRocket.track('Button Clicked', {
  buttonName: 'checkout',
  value: orderTotal
})

// Integration with Sentry
import { configureScope } from '@sentry/react'
LogRocket.getSessionURL(sessionURL => {
  configureScope(scope => {
    scope.setContext('LogRocket', { sessionURL })
  })
})

// React integration
const MyComponent = () => {
  useEffect(() => {
    LogRocket.track('Component Mounted', {
      component: 'MyComponent'
    })
  }, [])

  return <div>My Component</div>
}`}
            </pre>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>Console Logging Libraries</h4>
            <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '10px' }}>
{`// Winston (Node.js)
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

// Pino (Faster alternative)
import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
})

logger.info({ userId, action: 'login' }, 'User logged in')
logger.error({ error: err.message }, 'API call failed')`}
            </pre>
          </div>
          <div>
            <h4>Browser Console Enhancement</h4>
            <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '10px' }}>
{`// Console.js - Enhanced browser logging
import 'console-js'

// Or create custom logger
class Logger {
  constructor(context) {
    this.context = context
  }

  info(message, data = {}) {
    console.log(\`[\${this.context}] 🔵 \${message}\`, data)
  }

  error(message, error = {}) {
    console.error(\`[\${this.context}] 🔴 \${message}\`, error)
    // Send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error)
    }
  }

  warn(message, data = {}) {
    console.warn(\`[\${this.context}] 🟡 \${message}\`, data)
  }
}

// Usage
const logger = new Logger('UserService')
logger.info('User data fetched successfully', { userId })
logger.error('Failed to update user', error)`}
            </pre>
          </div>
        </div>
      </div>

      {/* Performance Tools */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '2px solid #795548', borderRadius: '8px' }}>
        <h3>⚡ Performance & Optimization</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>Bundle Analysis</h4>
            <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <li><strong>webpack-bundle-analyzer</strong> - Visualize bundle size</li>
              <li><strong>source-map-explorer</strong> - Analyze bundle composition</li>
              <li><strong>@next/bundle-analyzer</strong> - Next.js bundle analysis</li>
            </ul>
          </div>
          <div>
            <h4>Runtime Performance</h4>
            <ul style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <li><strong>React DevTools Profiler</strong> - Component performance</li>
              <li><strong>why-did-you-render</strong> - Unnecessary re-renders</li>
              <li><strong>react-window</strong> - Virtualization for large lists</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff3e0', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>💡 Package Selection Guidelines</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <div>
            <h3>✅ Choose Packages That</h3>
            <ul style={{ fontSize: '14px', lineHeight: '1.8' }}>
              <li>Solve complex problems (date manipulation, validation)</li>
              <li>Are battle-tested with large user bases</li>
              <li>Have active maintenance and regular updates</li>
              <li>Provide TypeScript support</li>
              <li>Have good documentation and examples</li>
              <li>Are tree-shakeable for smaller bundles</li>
              <li>Follow React best practices and patterns</li>
            </ul>
          </div>
          <div>
            <h3>⚠️ Be Cautious With</h3>
            <ul style={{ fontSize: '14px', lineHeight: '1.8' }}>
              <li>Large bundle size impact on performance</li>
              <li>Packages with infrequent updates</li>
              <li>Deep dependency trees</li>
              <li>Packages solving simple problems</li>
              <li>Breaking changes in major versions</li>
              <li>Security vulnerabilities</li>
              <li>Vendor lock-in concerns</li>
            </ul>
          </div>
          <div>
            <h3>🔍 Evaluation Checklist</h3>
            <ul style={{ fontSize: '14px', lineHeight: '1.8' }}>
              <li>Check GitHub stars and weekly downloads</li>
              <li>Review issue response time and resolution</li>
              <li>Test bundle size impact</li>
              <li>Verify TypeScript support</li>
              <li>Check compatibility with your React version</li>
              <li>Read recent issues for common problems</li>
              <li>Consider native alternatives first</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
          <h3>🎯 Pro Tips for Package Management</h3>
          <ul style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <li><strong>pnpm:</strong> Use pnpm over npm/yarn for faster installs and disk efficiency (as used in this project)</li>
            <li><strong>Exact versions:</strong> Pin exact versions for production stability</li>
            <li><strong>Regular updates:</strong> Keep dependencies updated for security and performance</li>
            <li><strong>Audit regularly:</strong> Run <code>pnpm audit</code> to check for vulnerabilities</li>
            <li><strong>Bundle analysis:</strong> Regularly check your bundle size impact</li>
            <li><strong>Documentation:</strong> Always read the migration guides for major updates</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UsefulPackagesPage
