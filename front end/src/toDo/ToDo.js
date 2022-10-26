import { useState } from "react"
import React from "react"
import { useContext } from "react"
import { ThemeContext } from "../contexts"

function ToDo({title, description, author, dateCreated, todo, handleDelete}){
    const [check, setCheck] = useState(false)
    const [dateCompleted, setDateCompleted ] = useState('')
    const{secondaryColor} = useContext(ThemeContext)

    const handleCheck = () => {
        setCheck(!check)
        setDateCompleted(new Date(Date.now()).toString())
    }

    console.log("Todo rendered")
    return (
        <div>
            <h3 style={{color:secondaryColor}}>{title}</h3>
            <input type="checkbox" id="box" name="boxname" check = {check} onChange={handleCheck} />
            <label for="box">{description}</label> 
            <div>
                {/* <p>To do created on: {dateCreated} </p> */}
                <p>Task Status: <b>{check ? "Complete" : "Incomplete"}</b></p>
                <p>Date Created: {dateCreated}</p>
                <p>Date Completed: {check ? dateCompleted : ""}</p>
                <i>Written by <b>{author}</b></i>
                <p><button type="button" onClick={() => handleDelete(todo.id)}>Delete</button></p>
            </div>
        </div>
    )   
}

export default React.memo(ToDo);

