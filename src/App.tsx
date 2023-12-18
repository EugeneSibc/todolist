import React, { useState } from 'react';
import './App.css';
import { FilterValueType, TaskType, Todolist } from './components/todolist/Todolist';
import { v1 } from 'uuid';

function App() {

    const [tasks, setTasks] = useState([
        {id:v1(), title:"HTML&CSS", isDone:true},
        {id:v1(), title:"JS/TS", isDone:true},
        {id:v1(), title:"ReactJS", isDone:true},
        {id:v1(), title:"Redux", isDone:false},
        {id:v1(), title:"Rest API", isDone:false},
        {id:v1(), title:"GraphQL", isDone:false},
    ])    

    const addTasks = (title: string) => {
        let addTitle = {id:v1(), title, isDone:false}
        setTasks([...tasks, addTitle])
        console.log(tasks)
    }

    const checkTask = (taskId: string) => {
        setTasks(tasks.map((task)=>{
            if(task.id === taskId) !task.isDone
            return(
                task
            )
        }))
    }
    // onClickButtonHandler = () => {
    //     addTasks(title)

    // }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))        
    }
    
    // function removeTask(taskId: number) {
    //     tasks=tasks.filter(t => t.id !== taskId)
    //     console.log(tasks)
    // }

    const [filterValue, setFilterValue] = useState<FilterValueType>('all')
    
    // let tasksForTodolist = filter === 'active'
    //     ? tasks.filter(task => task.isDone === false)
    //     : filter === 'completed'
    //         ? tasks.filter(task => task.isDone === true)
    //         : tasks

    // let tasksForTodolist = tasks
    // if (filter === 'active') {
    //     tasksForTodolist = tasks.filter(task => task.isDone === false)
    // }
    // if (filter === 'completed') {
    //     tasksForTodolist = tasks.filter(task => task.isDone === true)
    // }

    const getFilteredTasks=(tasks:Array<TaskType>, filterValue:FilterValueType): Array<TaskType> => {
        return filterValue === 'active'
        ? tasks.filter(task => !task.isDone)
        : filterValue === 'completed'
            ? tasks.filter(task => task.isDone)
                : tasks
    }

    const changeFilter = (filterValue:FilterValueType) => {
        setFilterValue(filterValue)
    }

    return (
        <div className="App">
            <Todolist theme="What to learn"
                    tasks={getFilteredTasks(tasks, filterValue)}
                    // tasks={tasksForTodolist}
                    removeTask={removeTask} 
                    changeFilter={changeFilter}
                    addTasks = {addTasks}
                    checkTask = {checkTask}
            />
        </div>
    );
}

export default App;