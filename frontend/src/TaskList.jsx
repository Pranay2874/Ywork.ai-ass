import { useState, useEffect } from 'react'

const TaskList = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger, statusFilter])

  const fetchTasks = async () => {
    setError(null)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      let url = `${apiUrl}/api/tasks/`
      if (statusFilter !== 'all') {
        url += `?status=${statusFilter}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Invalid status filter provided')
        }
        throw new Error('Failed to fetch tasks')
      }
      
      const data = await response.json()
      setTasks(data)
    } catch (err) {
      console.error(err)
      setError(err.message)
      setTasks([])
    }
  }

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/tasks/${taskId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) {
        throw new Error('Failed to update task status')
      }

      // Immediately reflect the change in UI
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ))
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  return (
    <div className="task-list-container">
      <div className="filter-section">
        <label>Filter by Status: </label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="task-list">
        {tasks.length === 0 && !error ? (
          <p className="no-tasks">No tasks found.</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-content">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
              </div>
              <div className="task-actions">
                <select 
                  value={task.status} 
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TaskList
