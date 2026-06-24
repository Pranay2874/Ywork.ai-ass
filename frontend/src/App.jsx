import { useState } from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import './App.css'

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleTaskCreated = () => {
    // Incrementing this will trigger a re-fetch in TaskList
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
      </header>
      <main>
        <TaskForm onTaskCreated={handleTaskCreated} />
        <hr />
        <TaskList refreshTrigger={refreshTrigger} />
      </main>
    </div>
  )
}

export default App
