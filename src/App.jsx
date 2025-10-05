import { useEffect, useState } from 'react'
import './App.css'
import {TodoProvider} from "./contexts"
import TodoItem from './components/TodoItem'
import TodoForm from './components/TodoForm'
import bgImage from './assets/bg.jpg'

function App() {
  
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updatedTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed : !prevTodo.completed}: prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, deleteTodo, updatedTodo, toggleComplete}}>
    <div className='w-full flex flex-wrap justify-center items-center h-screen bg-cover bg-center bg-no-repeat min-h-screen' style={{
          backgroundImage: `url(${bgImage})`
        }}
        >
      <div className="bg-white/5 rounded-3xl min-h-screen py-8 w-2/4" >
                <div className="w-96 max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white bg-white/40">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2 bg">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo) => ( 
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </div>
    </TodoProvider>
  )
}

export default App
