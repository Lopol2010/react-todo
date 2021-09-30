import ReactDOM from 'react-dom'
import React, { useEffect, useRef, useState } from 'react'
import TodoItem from '../TodoItem/TodoItem'
import Input from '../Input/Input'
import Divider from '../Divider/Divider'

const style = require('./TodoApp.module')

const Todos = {
    TodosArrayKey: 'TodoArray',
    load() {
        let items = localStorage.getItem(this.TodosArrayKey)
        if (!items) return null
        let itemsJson = JSON.parse(items)
        return itemsJson
    },
    save(items) {
        let itemsString = JSON.stringify(items)
        localStorage.setItem(this.TodosArrayKey, itemsString)
    }
}

const initialTodos = [{ text: "Buy some food", done: false },
{ text: "Call johny to talk about our meeting", done: true },
{ text: "Go to running at 4pm", done: false }]

export default function TodoApp(props) {

    const [todos, setTodos] = useState(initialTodos)

    function handleSubmit(text) {
        if (text?.length <= 0) return false
        let newTodos = todos.concat({ text, done: false })
        setTodos(newTodos)
        Todos.save(newTodos)
        return true
    }

    function handleDone(todoId) {
        let newTodos = todos.slice()
        // newTodos.splice(todoId, 1)
        let isDone = newTodos[todoId].done
        newTodos[todoId].done = !isDone
        setTodos(newTodos)
        Todos.save(newTodos)
    }

    useEffect(() => {
        let cachedTodos = Todos.load()
        if (cachedTodos == null) {
            Todos.save(todos)
        } else {
            setTodos(cachedTodos)
        }
    }, [])

    return (
        <div>
            <div className={style.container}>
                <h1 className={style.title}>YOUR EVERLASTING SUMMER DAYS</h1>
                <Input onSubmit={(text) => handleSubmit(text)} focused={false} placeholder="Type here..."></Input>

                <ul className={style.itemsList}>
                    {todos.map((e, i) =>
                        !e.done ?
                        <TodoItem key={i} todoId={i} onDone={todoId => handleDone(todoId)} text={e.text} /> 
                        : null
                    )}
                </ul>
                {todos.find(e => e.done) ? <Divider>Completed!</Divider> : null}
                <ul className={style.itemsList}>
                    {todos.map((e, i) =>
                        e.done ?
                        <TodoItem key={i} todoId={i} onDone={todoId => handleDone(todoId)} text={e.text} done={e.done} />
                        : null
                    )}
                </ul>
            </div>
        </div>
    )
}