import { useState } from "react"
import { v4 as uuidv4} from "uuid"
import React from "react"

export default function CreateToDo({user, ToDos, dispatch}){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    return (
        <form 
            onSubmit={e => {
                e.preventDefault(); 
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