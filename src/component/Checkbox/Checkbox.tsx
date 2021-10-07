import ReactDOM from 'react-dom'
import React, {useState} from 'react'

const style = require('./Checkbox.module')

export default function Checkbox(props) {
    
    return (
        <div className={style.buttonWrapper} title={props.title}>
            <button onClick={e => { props.onClick(e); }} className={`${style.button} ${style.buttonDone}`}>
                { props.checked ? <div className={style.buttonCheckmark}></div> : null }
            </button>
        </div>
    )
}