import ReactDOM from 'react-dom'
import React, {useEffect, useRef, useState} from 'react'
import Checkbox from '../Checkbox/Checkbox'
import autosize from 'autosize'

const style = require('./TodoItem.module')

export default function TodoItem(props) {

    const [text, setText] = useState(props.text)
    const [isEdit, setIsEdit] = useState(props.isEdit)
    const [mouseOver, setMouseOver] = useState(false)
    const textareaRef = useRef(null)

    useEffect(() => {
        if(isEdit)
        {
            textareaRef.current.focus()
            autosize(textareaRef.current)
        }
    }, [isEdit])

    function handleInput(e) {
        setText(e.target.value)
    }

    function handleKeyDown(e) {
        if(e.key == 'Enter')
        {
            e.preventDefault()
        }
    }

    function handleKeyPress(e) {
        if(e.key == 'Enter')
        {
            e.preventDefault()
            props.onEdit(props.todoId, { text })
            setIsEdit(false)
        }
    }

    function handleFocus(e) {
        e.target.selectionStart = e.target.value.length
        autosize.update(textareaRef.current)
    }

    function handleBlur(e) {
        props.onEdit(props.todoId, { text })
        setIsEdit(false)
    }

    return (
        <li className={`${style.todoItem} ${mouseOver && !isEdit ? style.todoItemHover : ''}`} title={!isEdit ? "Click to edit" : ""}
                    onClick={e => { !isEdit && setIsEdit(true) } } 
                    onMouseOver={e => setMouseOver(true)} 
                    onMouseLeave={e => setMouseOver(false)}>
            <div className={`${style.todoItemTextWrapper}`}>
                {
                    (!isEdit ?
                    <p className={style.todoItemText}  style={{ textDecorationLine: props.done ? 'line-through' : 'none' }}>{text}</p>
                    : <textarea rows={1} ref={textareaRef} onFocus={e => handleFocus(e)} onBlur={handleBlur}
                            className={`${style.inputField}`} onInput={handleInput} 
                            onKeyDown={e => handleKeyDown}
                            onKeyPress={handleKeyPress} value={text}></textarea>)
                }
            </div>
            <Checkbox title={props.done ? "Reset" : "Complete"} checked={props.done} onClick={e => { props.onDone(props.todoId); e.stopPropagation() }}></Checkbox>
        </li>
    )
}