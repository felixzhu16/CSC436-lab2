import {useReducer, useState, useEffect} from 'react'
import { useResource } from 'react-request-hook';
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
  const initialToDos = [];
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    posts: initialToDos,
  });

  const{user} = state;

  useEffect(() => {
    if (user) {
      document.title = `${user}’s ToDos`;
    } else {
      document.title = "ToDos";
    }
  }, [user]);

  const[theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondayColor: "coral",
  })

  const [ToDos, getToDos] = useResource(() => ({
    url: "/ToDos",
    method: "get",
  }));

  useEffect(() => {
    if (ToDos && ToDos.data) {
      dispatch({ type: "FETCH_TODOS", ToDos: ToDos.data.reverse() });
    }
  }, [ToDos]);

  // const InitialToDos = [
  //   {
  //     title: "To do 1",
  //     description: "First to do item",
  //     author: "Felix",
  //     id: uuidv4(),
  //     dateCreated: new Date(Date.now()).toString()
  //   },
  //   {
  //     title: "SECOND ONE",
  //     description: "hope this works",
  //     author: "Felix",
  //     id: uuidv4(),
  //     dateCreated: new Date(Date.now()).toString()
  //   }
  // ]

  // const[state, dispatch] = useReducer(appReducer, {
  //   user: "Felix",
  //   ToDos: InitialToDos,
  // })

  // function handleDelete(id){
  //   dispatch({type:"DELETE_TODO", id})
  // }


    return (
      <div>
        <StateContext.Provider value={{state,dispatch}}>
          <ThemeContext.Provider value={theme}>
            <Header title="My ToDo List"/>
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
