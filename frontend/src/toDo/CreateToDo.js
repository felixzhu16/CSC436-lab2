import { useState, useContext, useEffect } from "react"
import { v4 as uuidv4} from "uuid"
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


    const [ToDo, createToDo] = useResource(({ title, description, author, dateCreated, complete }) => ({
        url: "/ToDos",
        method: "POST",
        data: { title, description, author, dateCreated, complete },
      }));
    
    useEffect(()=>{
        if(ToDo?.data?.error){
            setError(true)
        }
    },[ToDo])
    
    return (
        <form 
            onSubmit={e => {
                e.preventDefault(); 
                createToDo({title, description, author:user, dateCreated, complete});
                dispatch({
                    type: "CREATE_TODO", 
                    title, 
                    description, 
                    author: user,
                    id: uuidv4(),
                    dateCreated: dateCreated,
                    complete: false
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