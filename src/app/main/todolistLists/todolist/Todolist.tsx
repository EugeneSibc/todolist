import {ChangeEvent} from "react";
import {AddItemForm} from "../../../component/AddItemForm";
import {EditableSpan} from "../../../component/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { addTaskAC, TaskType } from "../../../../state/tasks-reducer";
import { FilterTasksButtons } from "../../../component/FilterTasksButton";
import { TodolistType } from "../../../../state/todolists-reducer";
import { Tasks } from "./tasks/Tasks";
import { TodolistTitle } from "./todolistTitle/TodolistTitle";
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
