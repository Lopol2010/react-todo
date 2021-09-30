import ReactDOM from 'react-dom'
import React, {useState} from 'react'
import Button from './Button'

export default function Counter() {
    let [count, setCount] = useState(0)
    return (
        <div>
            <p>{count}</p>
            <Button onClick={() => setCount(count+1)}>Increase</Button>
        </div>
    )
}