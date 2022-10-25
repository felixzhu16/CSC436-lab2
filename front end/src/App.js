import {useReducer, useState} from 'react'
import UserBar from './user/UserBar'
import ToDoList from './toDo/ToDoList';
import CreateToDo from './toDo/CreateToDo';
import appReducer from './reducers';
import {v4 as uuidv4} from 'uuid';
import React from "react"
import {StateContext, ThemeContext} from './contexts';
import Header from './Header';
import ChangeTheme from './ChangeTheme';

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

  const[theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondayColor: "coral",
  })

  function handleDelete(id){
    dispatch({type:"DELETE_TODO", id})
  }


    return (
      <div>
        <StateContext.Provider value={{state,dispatch}}>
          <ThemeContext.Provider value={theme}>
            <Header title="My ToDo Blog"/>
            <ChangeTheme theme={theme} setTheme={setTheme}/>
            <React.Suspense fallback={"Loading..."}>
              <UserBar />
            </React.Suspense>
            {/* <UserBar user={state.user} dispatch={dispatch} /> */}
            {/* <ToDoList ToDos = {state.ToDos} handleDelete = {handleDelete}/> */}
            <ToDoList />
            {state.user && <CreateToDo/>}
            {/* {state.user && (
              <CreateToDo user={state.user} ToDos={state.ToDos} dateCreated={state.dateCreated} dispatch={dispatch}/>
            )} */}
          </ThemeContext.Provider>
        </StateContext.Provider>
      </div>
    )
}

export default App;
