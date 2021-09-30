import ReactDOM from 'react-dom'
import React, {useState} from 'react'
import Checkbox from '../Checkbox/Checkbox'

const style = require('./TodoItem.module')

export default function TodoItem(props) {
    return (
        <li className={style.todoItem}>
            <div className={style.todoItemTextWrapper}>
                <p className={style.todoItemText} style={{ textDecorationLine: props.done ? 'line-through' : 'none' }}>{props.text}</p>
            </div>
            <Checkbox checked={props.done} onClick={e => { props.onDone(props.todoId) }}></Checkbox>
        </li>
    )
}