import { useState,useEffect } from "react"
import {useResource} from "react-request-hook"
import React from "react"
import { useContext } from "react"
import { ThemeContext, StateContext  } from "../contexts"

function ToDo({title, description, author, dateCreated, dateCompleted, complete, todo, handleDelete}){
    const{secondaryColor} = useContext(ThemeContext)
    const {dispatch } = useContext(StateContext);

    const [toggle, completeToDo] = useResource(( title, description, author, dateCreated ) => ({
        url: "/ToDos/" + todo.id,
        method: "PUT",
        data: { title, description, author, dateCreated, dateCompleted: Date.now().toString(), complete},
      }));

    useEffect(() =>{
        if(toggle && toggle.data){
            dispatch({type: "TOGGLE_TODO", todo})
        }
    },[toggle]);

    const[deleteToDo, deleteAction] = useResource(()=>({
        url: "/ToDos/" + todo.id,
        method: "DELETE"
    }));

    useEffect(() =>{
        if(deleteToDo && deleteToDo.data){
            dispatch({type: "DELETE_TODO", todo})
        }
    },[deleteToDo]);
    

    console.log("Todo rendered")
    return (
        <div>
            <h3 style={{color:secondaryColor}}>{title}</h3>
            <input type="checkbox" id="box" name="boxname" check = {complete}  onClick={() => completeToDo( title, description, author, dateCreated )}/>
            <label for="box">{description}</label> 
            <div>
                <p>Task Status: <b>{complete ? "Complete" : "Incomplete"}</b></p>
                <p>Date Created: {dateCreated}</p>
                <p>Date Completed: {complete ? dateCompleted : ""}</p>
                <i>Written by <b>{author}</b></i>
                <p><button type="button" onClick={() => deleteAction()}>Delete</button></p>
            </div>
        </div>
    )   
}

export default React.memo(ToDo);

