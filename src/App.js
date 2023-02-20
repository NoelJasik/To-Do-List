import { useEffect, useState } from 'react';
import './App.css';

function App() {

  // [id, name, priority, isDone]
  const [tasks, setTasks] = useState([])
  const [taskName, setTaskName] = useState("")
  const [bgColor, setColor] = useState("#552777")

  // Task list managment

  const createTask = (_name) => {
    let temp = [...tasks];
    let id = tasks.length + 1;
    temp.push([id ,String(_name), "1", false])
    setTasks(temp)
    setTaskName("");
  }

  const getTasks = () =>
  {
    let taskToJson = JSON.parse(localStorage.getItem("tasks"));
    console.log(taskToJson);
    setTasks(taskToJson);
  }

  const saveTasks = () =>
   {
    let tasksToString = JSON.stringify(tasks); 
    localStorage.setItem("tasks", tasksToString);
    console.log(localStorage.getItem("tasks"))
   }

  // Task component

  function TaskElement(props) {

    const setPriority = (_priority, i) =>
    {
      let temp = [...tasks];
      temp[i] = [tasks[i][0] ,tasks[i][1], String(_priority), tasks[i][3]]
      setTasks(temp)
    }

    const changeTaskStatus = (i) =>
    {
      let temp = [...tasks];
      temp[i] = [tasks[i][0] ,tasks[i][1], tasks[i][2], !tasks[i][3]]
      setTasks(temp)
    }

    const removeTask = (i) =>
    {  
      let temp = [...tasks];
      temp.splice(i, 1);
      setTasks(temp)
    }

    return (
      <div className={'task-element priority-'+props.task[2]} 
      onDoubleClick={() => changeTaskStatus(props.id)} 
      style={props.task[3] ? {"opacity":"0.5", filter: "grayscale(60%)"} : {"opacity":"1"}}>
        <div className='btn-holder'>
        <button onClick={() => removeTask(props.id)}>x</button>
        <button onClick={() => setPriority("1", props.id)}>1</button>
        <button onClick={() => setPriority("2", props.id)}>2</button>
        <button onClick={() => setPriority("3", props.id)}>3</button>
        </div>
        <p>{props.task[1]}</p>
        </div>
    )
  }

  // Use effect

  useEffect(() => {getTasks()}, [])

  useEffect(() => {setTimeout(() => saveTasks(), 10)}, [tasks])

  // Main site structure

  return (
    <main style={{"backgroundColor":bgColor}}>
      <div className='main-window'>
      <h1>
        To Do
      </h1>
      <input type="color" value={bgColor}onChange={(e) => setColor(e.target.value)}></input>
      <div className='main'>
        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)}></input>
        <button onClick={() => createTask(taskName)} disabled={taskName == ""}>Add</button>
        <div className='task-list'>
            {tasks.map((task, i) => (
              <>
              <TaskElement task={task} id={i}></TaskElement>
              </>
              ))}
        </div>
      </div>
      </div>
    </main>
  );
}

export default App;
