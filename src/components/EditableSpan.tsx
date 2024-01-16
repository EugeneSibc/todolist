import React, { ChangeEvent, useState } from 'react';

type EditableTextProps = {
    globalTitle: string
    callBack: (localTitle: string) => void
}

export const EditableSpan = (props: EditableTextProps) => {
    const [editMode, setEditMode] = useState(false)
    const [localTitle, setLocalTitle] = useState(props.globalTitle)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(event.currentTarget.value)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setLocalTitle(props.globalTitle)   
    }
    const activateViewMode = () => {
        props.callBack(localTitle)
        setEditMode(false)
    }

    return (
            editMode 
            ? <input value={localTitle}
                onChange={onChangeHandler}
                onBlur={activateViewMode}
                autoFocus/>
            : <span onDoubleClick={activateEditMode}>
                {props.globalTitle}
            </span>
    );
};

