import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof EditableSpan> = {
  title: "TODOLIST/EditableSpan ",
  component: EditableSpan,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: {
      description: "Start value empty. Add value push button set string.",
    },
    callBack: {
      description: "Value EditableSpan changed",
    },
  },
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {
  args: {
    callBack: action("Value EditableSpan changed"),
  },
}
