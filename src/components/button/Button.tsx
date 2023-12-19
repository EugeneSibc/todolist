import React from 'react';

type ButtonPropsType = {
    title:string
    onClickHandler: () => void
    isDisabled?: boolean
}

const Button = (props:ButtonPropsType) => {
    return (
        <button onClick={props.onClickHandler}
            disabled={props.isDisabled}>
           {props.title}     
        </button>
    );
};

export default Button;