import {useReducer, useState, useEffect} from 'react';
import { useResource } from 'react-request-hook';
import UserBar from './user/UserBar';
import ToDoList from './toDo/ToDoList';
import CreateToDo from './toDo/CreateToDo';
import appReducer from './reducers';
// import {v4 as uuidv4} from 'uuid';
import React from "react";
import {StateContext, ThemeContext} from './contexts';
import Header from './Header';
import ChangeTheme from './ChangeTheme';

function App() {

  // const InitialToDos = [];

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    ToDos: [],
  });

  const { user } = state;

  
  useEffect(() => {
    if (user) {
      document.title = `${user}’s ToDo List`;
    } else {
      document.title = "ToDo List";
    }
  }, [user]);


  const [ToDos, getToDos] = useResource(() => ({
    url: "/todo",
    method: "GET",
    headers: {Authorization: `${state?.user?.access_token}`}
  }));

  useEffect(()=>{ 
    getToDos();
  },[state?.user?.access_token]);

  useEffect(() => {
    if (ToDos && ToDos.isLoading == false && ToDos.data) {
      dispatch({ type: "FETCH_TODOS", ToDos: ToDos.data.reverse() })
    }
  }, [ToDos])
  
  const[theme, setTheme] = useState({
    primaryColor: "deepskyblue",
    secondayColor: "coral",
  });

    return (
      <div>
        <StateContext.Provider value={{state,dispatch}}>
          <ThemeContext.Provider value={theme}>
            <Header title="My ToDo List"/>
            <ChangeTheme theme={theme} setTheme={setTheme}/>
            <React.Suspense fallback={"Loading..."}>
              <UserBar />
            </React.Suspense>
            <ToDoList />
            {state.user && <CreateToDo/>}
          </ThemeContext.Provider>
        </StateContext.Provider>
      </div>
    );
}

export default App;
