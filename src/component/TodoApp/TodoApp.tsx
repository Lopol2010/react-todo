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
        if (!items) return []
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

    const [todos, setTodos] = useState([])

    function handleSubmit(text) {
        if (text?.length <= 0) return false
        let newTodos = todos.concat({ text, done: false })
        setTodos(newTodos)
        Todos.save(newTodos)
        return true
    }

    function handleDone(todoId) {
        let newTodos = todos.slice()
        let isDone = newTodos[todoId].done
        newTodos[todoId].done = !isDone
        setTodos(newTodos)
        Todos.save(newTodos)
    }

    useEffect(() => {
        let cachedTodos = Todos.load()
        if (cachedTodos.length == 0) {
            setTodos(initialTodos)
            Todos.save(initialTodos)
        } else {
            setTodos(cachedTodos)
        }
    }, [])

    function handleItemEdit(todoId, itemData) {
        let newTodos = todos.slice()
        newTodos[todoId].text = itemData.text.replace(/\s+/g, ' ')
        setTodos(newTodos)
        Todos.save(newTodos)
    }

    let todoItemsList = (done) => {
        return todos.map((e, i) =>
            done === e.done ?
            <TodoItem key={i} todoId={i} 
                onEdit={handleItemEdit} 
                onDone={todoId => handleDone(todoId)} text={e.text} done={e.done} />
            : null
        )
    }
    return (

        <div>
            <div className={style.container}>
                <h1 className={style.title}>YOUR EVERLASTING SUMMER DAYS</h1>
                <Input onSubmit={(text) => handleSubmit(text)} focused={false} placeholder="Type here..."></Input>

                <ul className={style.itemsList}>
                    {todoItemsList(false)}
                </ul>
                {todos.find(e => e.done) ? <Divider>Completed!</Divider> : null}
                <ul className={style.itemsList}>
                    {todoItemsList(true)}
                </ul>
            </div>
        </div>
    )
}