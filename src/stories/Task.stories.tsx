import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Task } from "../components/Task"
import { TaskPriorities, TaskStatuses } from "../api/tasks-api"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: "TODOLIST/Task",
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  args: {
    changeStatus: action("Status changed inside Task"),
    changeTaskTitle: action("Title changed inside Task"),
    removeTask: action("Remove Button clicked changed inside Task"),
    task: {
      entityTaskStatus: "idle",
      description: "",
      title: "JS",
      completed: false,
      status: TaskStatuses.InProgress,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      id: "12wsdewfijdei",
      todoListId: "fgdosrg8rgjuh",
      order: 0,
      addedDate: new Date(),
    },
    todolistId: "fgdosrg8rgjuh",
  },
}

export default meta
type Story = StoryObj<typeof Task>

export const TaskIsNotDoneStory: Story = {}

export const TaskIsDoneStory: Story = {
  args: {
    task: {
      entityTaskStatus: "idle",
      description: "",
      title: "CSS",
      completed: true,
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      id: "12wsdewfijdei2343",
      todoListId: "fgdosrg8rgjuh",
      order: 0,
      addedDate: new Date(),
    },
  },
}
