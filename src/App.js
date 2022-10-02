import {useState, useReducer} from 'react'
import UserBar from './user/UserBar'
import ToDoList from './toDo/ToDoList';
import CreateToDo from './toDo/CreateToDo';
import appReducer from './reducers';
import {v4 as uuidv4} from 'uuid';
import React from "react"

function App() {

  const InitialToDos = [
    {
      title: "To do 1",
      description: "First to do item",
      author: "Felix",
      id: uuidv4(),
      dateCreated: new Date(Date.now()).toString()
    },
    {
      title: "SECOND ONE",
      description: "hope this works",
      author: "Felix",
      id: uuidv4(),
      dateCreated: new Date(Date.now()).toString()
    }
  ]

  const[state, dispatch] = useReducer(appReducer, {
    user: "Felix",
    ToDos: InitialToDos,
  })


    return (
      <div>
        <UserBar user={state.user} dispatch={dispatch} />
        <ToDoList ToDos = {state.ToDos} />
        {state.user && (
          <CreateToDo user={state.user} ToDos={state.ToDos} dateCreated={state.dateCreated} dispatch={dispatch}/>
        )}
      </div>
    )
}

export default App;
