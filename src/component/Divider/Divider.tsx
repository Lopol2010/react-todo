import ReactDOM from 'react-dom'
import React, {useState} from 'react'

const style = require('./Divider.module')

export default function Divider(props) {
    
    return (
        <div className={style.container}>
            <hr className={`${style.dividerLeft} ${style.dividerItem}`}></hr>
            <span className={`${style.dividerText} ${style.dividerItem}`}>{props.children}</span>
            <hr className={`${style.dividerRight} ${style.dividerItem}`}></hr>
        </div>
    )
}