import React, { useState } from 'react';
import './App.css';
import { FilterValueType, TaskType, Todolist } from './components/todolist/Todolist';
import { v1 } from 'uuid';

function App() {

    const [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS/TS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: true },
        { id: v1(), title: "Redux", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ])

    const addTasks = (title: string) => {
        let addTitle = { id: v1(), title, isDone: false }
        setTasks([...tasks, addTitle])
        console.log(tasks)
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const [filterValue, setFilterValue] = useState<FilterValueType>('all')

    const getFilteredTasks = (tasks: Array<TaskType>, filterValue: FilterValueType): Array<TaskType> => {
        return filterValue === 'active'
            ? tasks.filter(task => !task.isDone)
            : filterValue === 'completed'
                ? tasks.filter(task => task.isDone)
                : tasks
    }

    const changeFilter = (filterValue: FilterValueType) => {
        setFilterValue(filterValue)
    }

    return (
        <div className="App">
            <Todolist theme="What to learn"
                tasks={getFilteredTasks(tasks, filterValue)}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTasks={addTasks}
            />
        </div>
    );
}

export default App;