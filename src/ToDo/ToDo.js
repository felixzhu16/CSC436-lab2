import { useState } from "react"
import React from "react"

export default function ToDo({title, description, author, dateCreated}){
    const [check, setCheck] = useState(false)
    const [dateCompleted, setDateCompleted ] = useState('')

    const handleCheck = () => {
        setCheck(!check)
        setDateCompleted(new Date(Date.now()).toString())
    }

    return (
        <div>
            <h3>{title}</h3>
            <input type="checkbox" id="box" name="boxname" check = {check} onChange={handleCheck} />
            <label for="box">{description}</label> 
            <div>
                {/* <p>To do created on: {dateCreated} </p> */}
                <p>Task Status: <b>{check ? "Complete" : "Incomplete"}</b></p>
                <p>Date Created: {dateCreated}</p>
                <p>Date Completed: {check ? dateCompleted : ""}</p>
                <i>Written by <b>{author}</b></i>
            </div>
        </div>
    )   
}

