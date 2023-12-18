import React, { ChangeEvent, KeyboardEvent } from 'react';

type InputPropsType = {
    title: string
    setTitle:(title:string) => void
    addTasks:() => void
}

export const Input = (props:InputPropsType) => {
    const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>)=>{
        props.setTitle(event.currentTarget.value)
    }
    const addTaskOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){
            props.addTasks()
        }
    }
    return (
        <>
            <input value={props.title}
                   onChange={onChangeInputHandler}
                   onKeyPress={addTaskOnKeyPress}
                    />
        </>
    );
};

