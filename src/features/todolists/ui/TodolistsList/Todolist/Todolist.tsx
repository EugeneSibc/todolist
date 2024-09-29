import { AddItemForm } from "../../../../../common/components/AddItemForm";
import { addTaskAC } from "../../../model/tasks-reducer";
import { TodolistType } from "../../../model/todolists-reducer";
import { FilterTasksButtons } from "./FilterTaskButton/FilterTasksButton";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { useDispatch } from "react-redux";


type Props = {
	todolist: TodolistType
	addTask:(title: string, id: string) => void
	removeTodolist: (todolistId: string) => void
	updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = (props: Props) => {
	const {		
		todolist,		
		addTask,
		removeTodolist,
		updateTodolist
	} = props
	
	const dispatch = useDispatch()

	const addTaskCallback = (title: string) => {
		dispatch(addTaskAC({ title, todolistId:todolist.id }))
	}

	return (
		<div>
			<TodolistTitle todolist={todolist}/>
			<AddItemForm addItem={addTaskCallback}/>
			<Tasks todolist={todolist}/>
			<FilterTasksButtons todolist={todolist}/>
		</div>
	)
}
