import {useResource} from "react-request-hook"
import React from "react"
import { useContext } from "react"
import { ThemeContext, StateContext  } from "../contexts"

function ToDo({title, description, author, dateCreated, dateCompleted, todo}){
    const{secondaryColor} = useContext(ThemeContext)
    const {dispatch} = useContext(StateContext);

    const [toggle, completeToDo] = useResource(() => ({
        url: "/ToDos/" + todo.id,
        method: "PATCH",
        data: {dateCompleted: new Date(Date.now()).toString(), complete: !todo.complete},
      }));

    const[deleteToDo, deleteAction] = useResource(()=>({
        url: "/ToDos/" + todo.id,
        method: "DELETE"
    }));

    console.log("Todo rendered")
 
    return (
        <div>
            <h3 style={{color:secondaryColor}}>{title}</h3>
            <input type="checkbox" id="box" name="boxname" checked = {todo.complete}  onClick={ ()=>{completeToDo(); dispatch({type: "TOGGLE_TODO", todo})}}/>
            <label for="box">{description}</label> 
            <div>
                <p>Task Status: <b>{todo.complete ? "Complete" : "Incomplete"}</b></p>
                <p>Date Created: {dateCreated}</p>
                <p>Date Completed: {todo.complete ? dateCompleted : ""}</p>
                <i>Written by <b>{author}</b></i>
                <p><button type="button" onClick={e => {
                        e.preventDefault(); 
                        deleteAction();
                        dispatch({type: "DELETE_TODO", id: todo.id})}}>Delete</button></p>
            </div>
        </div>
    )   
}

export default React.memo(ToDo);

