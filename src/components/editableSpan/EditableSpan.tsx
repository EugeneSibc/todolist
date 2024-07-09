import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    value: string
    callBack: (newValue: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('Editable span called')
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.callBack(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ?    <TextField variant="outlined"
                        disabled={props.disabled}
                        value={title}
                        onChange={changeTitle}
                        autoFocus 
                        onBlur={activateViewMode} />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})
