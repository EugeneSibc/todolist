import { TaskPriorities, TaskStatuses } from '../api/task-api'
import { addTaskAC, removeTaskAC, tasksReducer, changeTaskStatusAC, changeTaskTitleAC, TasksStateType } from './tasks-reducer'
import { addTodolistAC, removeTodolistAC } from './todolists-reducer'

let startState: TasksStateType
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                description: '',
                title: 'CSS',
                completed: false,
                status: TaskStatuses.InProgress,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: new Date
            },
            {
                description: '',
                title: 'JS',
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: new Date
            },
            {
                description: '',
                title: 'React',
                completed: false,
                status: TaskStatuses.InProgress,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '3',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: new Date
            }
        ],
        'todolistId2': [
            {
                description: '',
                title: 'milk',
                completed: false,
                status: TaskStatuses.InProgress,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: new Date
            },
            {
                description: '',
                title: 'bread',
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: new Date
            },
            {
                description: '',
                title: 'tea',
                completed: false,
                status: TaskStatuses.InProgress,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '3',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: new Date
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                description: '',
                title: 'CSS',
                completed: false,
                status: TaskStatuses.InProgress,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: new Date
            },
            {
                description: '',
                title: 'JS',
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: new Date
            },
            {
                description: '',
                title: 'React',
                completed: false,
                status: TaskStatuses.InProgress,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '3',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: new Date
            }
        ],
        'todolistId2': [
            {
                description: '',
                title: 'milk',
                completed: false,
                status: TaskStatuses.InProgress,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: new Date
            },
            {
                description: '',
                title: 'bread',
                completed: true,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: new Date
            }
        ]
    })
})


test('correct task should be added to correct array', () => {
    const action = addTaskAC('juce', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][3].id).toBeDefined()
    expect(endState['todolistId2'][3].title).toBe('juce')
    expect(endState['todolistId2'][3].completed).toBe(false)
})


test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', false, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].completed).toBe(false)
    expect(endState['todolistId2'][1].completed).toBe(false)
})


test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('3', 'coffe', 'todolistId2')

    const endstate = tasksReducer(startState, action)

    expect(endstate['todolistId1'][2].title).toBe('React')
    expect(endstate['todolistId2'][2].title).toBe('coffe')
})


test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
