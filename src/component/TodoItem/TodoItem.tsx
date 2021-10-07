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
        setIsEdit(props.isEdit)
    }, [props.isEdit])

    useEffect(() => {
        if(isEdit)
        {
            textareaRef.current.focus()
            autosize(textareaRef.current)
        }
    }, [isEdit])

    function handleInput(e) {
        setText(e.target.value)
        props.onEdit(props.todoId, { text })
    }

    function handleFocus(e) {
        e.target.selectionStart = e.target.value.length
        autosize.update(textareaRef.current)
        setTimeout(() => {
            autosize.update(textareaRef.current)
        }, 0)
    }

    return (
        <li className={`${style.todoItem} ${mouseOver && !isEdit ? style.todoItemHover : ''}`} title={!isEdit ? "Click to edit" : ""}
                    onClick={e => { props.onClick(props.todoId) } } 
                    onMouseOver={e => setMouseOver(true)} 
                    onMouseLeave={e => setMouseOver(false)}>
            <div className={`${style.todoItemTextWrapper}`}>
                {
                    (!isEdit ?
                    <p className={style.todoItemText}  style={{ textDecorationLine: props.done ? 'line-through' : 'none' }}>{props.text}</p>
                    : <textarea rows={1} ref={textareaRef} onFocus={e => handleFocus(e)} className={`${style.inputField}`} onInput={handleInput} value={text}></textarea>)
                }
                {
                    (isEdit ? <button className={style.buttonSave}>Click to Save!</button> : null)
                }
            </div>
            <Checkbox title="Complete" checked={props.done} onClick={e => { props.onDone(props.todoId); e.stopPropagation() }}></Checkbox>
        </li>
    )
}