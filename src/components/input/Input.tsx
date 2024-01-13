import React, { ChangeEvent, KeyboardEvent } from 'react';


type InputPropsType = {
    title: string
    onChangeInputHandler: (event: ChangeEvent<HTMLInputElement>) => void
    onKeyDownHandler: (event: KeyboardEvent<HTMLInputElement>) => void
    classes?: string
}

export const Input = (props: InputPropsType) => {
    return (
        <input value={props.title}
            onChange={props.onChangeInputHandler}
            onKeyDown={props.onKeyDownHandler}
            className={props.classes}
        />
    );
};

