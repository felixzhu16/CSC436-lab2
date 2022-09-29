import { useState } from "react"
import React from "react"

export default function ToDo({title, description, author}){
    const[check, setCheck] = useState(false)
    const handleCheck = () => {
        setCheck(!check)
    }

    return (
        <div>
            <h3>{title}</h3>
            <input type="checkbox" id="box" name="boxname" check = {check} onChange={handleCheck} />
            <label for="box">{description}</label> 
            <div>
                {/* <p>To do created on: {dateCreated} </p> */}
                <p>Task Status: <b>{check ? "Complete" : "Incomplete"}</b></p>
                <i>Written by <b>{author}</b></i>
                {/* <p>Date completed: {dateCompleted}</p> */}
            </div>
        </div>
    )   
}

