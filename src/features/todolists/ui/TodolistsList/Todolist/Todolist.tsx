import { AddItemForm } from "../../../../../common/components/AddItemForm";
import { useAppDispatch } from "../../../../../common/components/hooks/useAppDispatch";
import { addTaskAC } from "../../../model/tasks-reducer";
import { TodolistType } from "../../../model/todolists-reducer";
import { FilterTasksButtons } from "./FilterTaskButton/FilterTasksButton";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";


type Props = {
	todolist: TodolistType
	addTask:(title: string, id: string) => void
}

export const Todolist = (props: Props) => {
	const {		
		todolist,		
	} = props
	
	const dispatch = useAppDispatch()

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
