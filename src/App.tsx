import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { Tasks, data1, data2 } from './practise/Task1';


const tasks = [
    {id:1, title:"HTML&CSS", isDone:true},
    {id:2, title:"JS", isDone:true},
    {id:3, title:"ReactJS", isDone:false},
    {id:4, title:"Redux", isDone:false},
    {id:5, title:"Redux Toolkit", isDone:false},
]
// const tasks2 = [
//     {id:1, title:"Hello world", isDone:true},
//     {id:2, title:"I'm fine", isDone:false},
//     {id:3, title:"Yo", isDone:false},
//     {id:4, title:"How to survive", isDone:false},
// ]


function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id:1, title:"HTML&CSS", isDone:true},
        {id:2, title:"JS", isDone:true},
        {id:3, title:"ReactJS", isDone:false},
        {id:4, title:"Redux", isDone:false},
        {id:5, title:"Redux Toolkit", isDone:false},
    ])
    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
        console.log(tasks)
    }

    return (
        <div className="App">            
            <Todolist  title = "What to learn" tasks={tasks} removeTask={removeTask}/>
            {/* <Todolist  title = "Credo" tasks={tasks2}/> */}
            {/* <Tasks data={data1}/>
            <Tasks data={data2}/>*/}
        </div>
    );
}

export default App;