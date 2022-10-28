import React from "react"
import ToDo from "./ToDo"
import { useContext } from "react"
import { StateContext } from "../contexts"



export default function ToDoList () {
    const{state} = useContext(StateContext);
    const{ToDos} = state 

    return (
        <div>
            {ToDos.map((p) => (<ToDo {...p} key={p.id}  todo = {p}/>))}
        </div>
    )
}