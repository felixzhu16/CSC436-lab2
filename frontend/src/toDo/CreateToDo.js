import { useState, useContext, useEffect } from "react"
import { useResource } from "react-request-hook"
import React from "react"
import { StateContext } from "../contexts"

export default function CreateToDo(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(false);
    const [complete, setComplete] = useState(false);
    const [dateCreated, setDateCreated] = useState(new Date(Date.now()).toString())
    const { state, dispatch } = useContext(StateContext);
    const { user } = state;


    const [ToDo, createToDo] = useResource(({ title, description, dateCreated, complete }) => ({
        url: "/todo",
        method: "POST",
        headers: { Authorization: `${state.user.access_token}`},
        data: { title, description, dateCreated, complete},
      }));
    
    useEffect(()=>{
        if(ToDo.isLoading === false && ToDo.data){
            dispatch({
                type: "CREATE_TODO", 
                title: ToDo.data.title,
                description: ToDo.data.description,
                author: user.username,
                id: ToDo.data._id,
                dateCreated: dateCreated,
                complete: ToDo.data.complete,
                dateCompleted: ToDo.data.dateCompleted
            });
        }
    },[ToDo])
    
    return (
        <form 
            onSubmit={e => {
                const currDate = new Date(Date.now()).toString()
                e.preventDefault(); 
                createToDo({title, description, author:user.username, dateCreated: currDate, complete:false});
            }}
        >
           <div>Author: <b>{user.username}</b></div>
           <div>
               <label htmlFor="create-title">Title:</label>
               <input type="text" 
                    name="create-title" 
                    id="create-title" 
                    value={title} 
                    onChange={(event) => setTitle(event.target.value)} />
           </div>
           <textarea 
                value={description} 
                onChange={(event) => setDescription(event.target.value)} />
           <input type="submit" value="Create" />
       </form>
   )
}