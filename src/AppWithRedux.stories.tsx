import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { AppWithRedux } from "./AppWithRedux"
import { ReduxStoreProviderDecorator } from "./stories/decorators/ReduxStoreProviderDecorator"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AppWithRedux> = {
  title: "TODOLIST/AppWithRedux ",
  component: AppWithRedux,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof AppWithRedux>

export const AppWithReduxStory: Story = {}
