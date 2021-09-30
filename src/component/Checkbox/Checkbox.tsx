import ReactDOM from 'react-dom'
import React, {useState} from 'react'

const style = require('./Checkbox.module')

export default function Checkbox(props) {
    
    return (
        <div className={style.buttonWrapper}>
            <button onClick={e => { props.onClick(props.todoId) }} className={`${style.button} ${style.buttonDone}`}>
                { props.checked ? <div className={style.buttonCheckmark}></div> : null }
            </button>
        </div>
    )
}