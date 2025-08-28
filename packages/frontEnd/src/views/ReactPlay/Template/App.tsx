import React, { useState, useEffect } from 'react'
import { Input, Button, List, Checkbox, Space, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const { Text } = Typography

interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: string
}

const STORAGE_KEY = 'my_todos'

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY)
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (!inputValue.trim()) return
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
    setTodos([newTodo, ...todos])
    setInputValue('')
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div style={{ maxWidth: 600, margin: '50px auto' }}>
      <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
        <Input
          placeholder="输入待办事项"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onPressEnter={addTodo}
        />
        <Button type="primary" onClick={addTodo}>
          添加
        </Button>
      </Space.Compact>

      <List
        bordered
        dataSource={todos}
        renderItem={todo => (
          <List.Item
            actions={[
              <span style={{ fontSize: 12, color: '#999' }}>
                {todo.createdAt}
              </span>,
              <Button
                danger
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => deleteTodo(todo.id)}
              />,
            ]}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            >
              <Text delete={todo.completed}>{todo.text}</Text>
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  )
}

export default TodoList
