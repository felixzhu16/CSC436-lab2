import React from "react"
import ToDo from "./ToDo"
import { useContext } from "react"
import { StateContext } from "../contexts"



export default function ToDoList () {
    const{state} = useContext(StateContext);
    const{ToDos} = state 

    return (
        <div>
            {/* {ToDos.map((p) => (<ToDo {...p} key={p.id}  />))} */}
            <div>
                {ToDos.length === 0 && <h2>No posts found.</h2>}
                {ToDos.length > 0 && ToDos.map((p, i) => <ToDo {...p} _id={p._id} />)}
            </div>
        </div>
    )
}