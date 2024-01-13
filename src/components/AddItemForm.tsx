import { ChangeEvent, useState, KeyboardEvent } from "react"

type AddItemsFormProps = {
    callBack:(title: string) => void
}

export const AddItemForm = (props:AddItemsFormProps) => {

    let [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && title.trim() !== '') {
                props.callBack(title.trim())
                setTitle('')
        } else {
            setError(true)
            // setTitle('') если обнулять title здесь   
        }    
        // setTitle('') или здесь, то дальше первого символа не написать. Почему?
    }
    const onClickHandler = () => {
        if (title.trim() !== '') {
            props.callBack(title.trim())
        } else {
            setError(true)
        } 
        setTitle('')        
    }

    return (
        <>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={onClickHandler}>+</button>
            {error && <div className='error-message'>'Title is required'</div>}
        </>
    )
}