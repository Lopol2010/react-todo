import ReactDOM from 'react-dom'
import React, {useState} from 'react'

const style = require('./Component.module')

export default function Component(props) {
    
    return (
        <button className={style.button} onClick={() => props.onClick()}>
            {props.children}
        </button>
    )
}