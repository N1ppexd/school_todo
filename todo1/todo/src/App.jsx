import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


const url = 'http://localhost:3001'

function App(){

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setTasks(res.data)
      })
      .catch(err => {
        alert(err.response.data ? err.response.data.message : err);
      })
  }, [])

  const addTask = () => {

    const newTask = { description: task }

    axios.post(`${url}/create`, { task: newTask })
      .then(res => {
        setTasks(...tasks, res.data)
        setTask('')
      })
      .catch(err => {
        alert(err.response ? err.response.data.error.message : err);
      })
    setTasks([...tasks, task])
  }

  const deleteTask = (deletedId) => {
    axios.delete(`${url}/delete/${deletedId}`)
      .then(res => {
        setTasks(tasks.filter(item => item.id !== deletedId))
      })
      .catch(err => {
        alert(err.response ? err.response.data.error.message : err);
      })
  }

  return (
    <div id='container'>
      <h3>Todos</h3>
      <form>
        <input 
          placeholder='Add new task' 
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            if(e.key === 'Enter'){
              e.preventDefault()
              addTask()
            }
          }}
        />
      </form>
      <ul>
        {
          tasks.map(item => (
          <li key={item.id}>
              {item.description}
              <button 
                className='delete-button'
                onClick={()=>deleteTask(item.id)}
              >
                Delete
              </button>
           </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
