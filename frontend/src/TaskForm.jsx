import { useState } from 'react'

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    const taskData = {
      title,
      description
    }

    try {
      const response = await fetch('http://localhost:8000/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.title ? errorData.title[0] : 'Failed to create task (400 Bad Request)')
      }

      // Clear form and trigger refresh
      setTitle('')
      setDescription('')
      onTaskCreated()
    } catch (err) {
      console.error(err)
      setError(err.message)
    }
  }

  return (
    <div className="task-form">
      <h2>Create a Task</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title*</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="What needs to be done?"
            required 
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Add details (optional)"
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  )
}

export default TaskForm
