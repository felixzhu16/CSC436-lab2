import React from "react"
import ToDo from "./ToDo"


export default function ToDoList ({ToDos = []}) {
    return (
        <div>
            {ToDos.map((p) => (<ToDo {...p} key={p.id} />))}
        </div>
    )
}