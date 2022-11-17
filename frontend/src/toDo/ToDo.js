import {useResource} from "react-request-hook"
import React from "react"
import { useContext } from "react"
import { ThemeContext, StateContext  } from "../contexts"

function ToDo({title, description, author, dateCreated, dateCompleted, complete, _id}){
    const{secondaryColor} = useContext(ThemeContext);
    const{state, dispatch} = useContext(StateContext);

    const [toggle, completeToDo] = useResource((_id) => ({
        url: "/todo/complete/" + _id,
        method: "PATCH",
        headers:  {Authorization: `${state.user.access_token}`},
        data: {_id: _id, dateCompleted: complete ? "" : new Date().toString(), complete: !complete},
      }));

    const[deleteToDo, deleteAction] = useResource((_id)=>({
        url: "/todo/delete/" + _id,
        method: "DELETE",
        headers:  {Authorization: `${state.user.access_token}`}
    }));

    console.log("Todo rendered")
 
    return (
        <div>
            <h3 style={{color:secondaryColor}}>{title}</h3>
            <input type="checkbox" id="box" name="boxname" checked = {complete}  onClick={ ()=>{
                completeToDo(_id); 
                dispatch({type: "TOGGLE_TODO", _id: _id, dateCompleted: complete ? "" : new Date().toString(), complete: !complete})}}/>
            <label for="box">{description}</label> 
            <div>
                <p>Task Status: <b>{complete ? "Complete" : "Incomplete"}</b></p>
                <p>Date Created: {dateCreated}</p>
                <p>Date Completed: {complete ? dateCompleted : ""}</p>
                <i>Written by <b>{author}</b></i>
                <p><button type="button" onClick={e => {
                        // e.preventDefault(); 
                        deleteAction(_id);
                        dispatch({type: "DELETE_TODO", _id})
                        }}>Delete</button></p>
            </div>
        </div>
    )   
}

export default React.memo(ToDo);
