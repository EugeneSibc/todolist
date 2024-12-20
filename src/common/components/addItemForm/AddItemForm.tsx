import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { IconButton, TextField } from "@mui/material"
import { AddBox } from "@mui/icons-material"
import { RequestStatusType } from "app/appSlice"

type AddItemFormPropsType = {
  callBack: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  console.log("AddItemForm called")
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addItem = () => {
    if (title.trim() !== "") {
      props.callBack(title)
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.charCode === 13) {
      addItem()
    }
  }

  return (
    <div>
      <TextField
        variant="outlined"
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label="Title"
        helperText={error}
        disabled={props.disabled}
      />
      <IconButton color="primary" onClick={addItem} disabled={props.disabled}>
        <AddBox />
      </IconButton>
    </div>
  )
})
