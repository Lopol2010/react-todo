import ReactDOM from 'react-dom'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import autosize from 'autosize'

const style = require('./Input.module')

export default function Input(props) {

    const [text, setText] = useState("")
    const textareaRef = useRef(null)
    const [shouldSubmit, setShouldSubmit] = useState(false)

    function inputHandler (e) { setText(e.target.value) }
    function keyPressHandler (e) { 
        if(e.key == 'Enter')
        {
            e.preventDefault()
            setShouldSubmit(true)
        }
     }
        
    useEffect(() => {
        let submitResult = props.onSubmit(text)
        if(submitResult || submitResult === undefined)
        {
            setText("")
        }
        setShouldSubmit(false)
    }, [shouldSubmit])

    useEffect(() => {
        autosize(textareaRef.current)
    }, [])

    useEffect(() => {
        if(!props.focused) return
        setTimeout(() => {
            textareaRef.current.focus()
        }, 0)
    }, [])

    useEffect(() => {
        autosize.update(textareaRef.current)
    })
    
    return (
        <div className={style.inputWrapper}>
            <textarea className={style.inputField} ref={textareaRef} value={text} onInput={e => inputHandler(e)} onKeyPress={e => keyPressHandler(e)} rows={1} placeholder={props.placeholder}>

            </textarea>
        </div>
    )
}