import { useState } from 'react';
import './App.css';

function App() {

  // name priority done
  const [tasks, setTasks] = useState([])
  const [taskName, setTaskName] = useState("")
  const [bgColor, setColor] = useState("#8C9EFF")

  const createTask = (_name) => {
    let temp = [...tasks];
    let id = tasks.length + 1;
    temp.push([id ,String(_name), "1", false])
    setTasks(temp)
    console.log(tasks)
  }

  function TaskElement(props) {

    const setPriority = (_priority, i) =>
    {
      let temp = [...tasks];
      console.log(temp[i])
      temp[i] = [tasks[i][0] ,tasks[i][1], String(_priority), tasks[i][3]]
      setTasks(temp)
      console.log(tasks)
    }

    const changeTaskStatus = (i) =>
    {
      let temp = [...tasks];
      console.log(temp[i])
      temp[i] = [tasks[i][0] ,tasks[i][1], tasks[i][2], !tasks[i][3]]
      console.log(!tasks[i][3]);
      setTasks(temp)
      console.log(tasks)
    }

    return (
      <div className={'task-element priority-'+props.task[2]} 
      onDoubleClick={() => changeTaskStatus(props.id)} 
      style={props.task[3] ? {"opacity":"0.75", filter: "grayscale(60%)"} : {"opacity":"1"}}>
        <p>{props.task[1]}</p>
        <>
        <p>Priority:</p>
        <button onClick={() => setPriority("1", props.id)}>1</button>
        <button onClick={() => setPriority("2", props.id)}>2</button>
        <button onClick={() => setPriority("3", props.id)}>3</button>
        </>
        </div>
    )
  }

  return (
    <main style={{"backgroundColor":bgColor}}>
      <h1>
        To Do
      </h1>
      <input type="color" value={bgColor}onChange={(e) => setColor(e.target.value)}></input>
      <div className='main'>
        <input type="text" onChange={(e) => setTaskName(e.target.value)}></input>
        <button onClick={() => createTask(taskName)}>Add</button>
        <div className='task-list'>
            {tasks.map((task, i) => (
              <>
              <TaskElement task={task} id={i}></TaskElement>
              </>
              ))}
        </div>
      </div>
    </main>
  );
}

export default App;
