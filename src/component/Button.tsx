import ReactDOM from 'react-dom'
import React, {useState} from 'react'
const style = require('./Button.module')

export default function Button(props) {
    
    return (
        <button className={style.button} onClick={() => props.onClick()}>
            {props.children}
        </button>
    )
}