import ReactDOM from 'react-dom'
import React from 'react'
import Counter from './Counter'
import TodoApp from './TodoApp/TodoApp'

const style = require('./App.module')

export default function App() {

    return (
        <div className={style.container}>
            <TodoApp />
        </div>
    )
}