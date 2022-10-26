import { useState, useContext, useEffect } from "react"
import { v4 as uuidv4} from "uuid"
import { useResource } from "react-request-hook"
import React from "react"
import { StateContext } from "../contexts"

export default function CreateToDo(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(false);
    const { state, dispatch } = useContext(StateContext);
    const { user } = state;


    const [ToDo, createToDo] = useResource(({ title, description, author }) => ({
        url: "/ToDos",
        method: "post",
        data: { title, description, author },
      }));
    
    return (
        <form 
            onSubmit={e => {
                e.preventDefault(); 
                createToDo({title, description, author:user});
                dispatch({
                    type: "CREATE_TODO", 
                    title, 
                    description, 
                    author: user,
                    id: uuidv4(),
                    dateCreated: new Date(Date.now()).toString()
                });
            }}
        >
           <div>Author: <b>{user}</b></div>
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