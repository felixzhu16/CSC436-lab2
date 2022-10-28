function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
      case "REGISTER":
        return action.username;
      case "LOGOUT":
        return "";
      default:
        return state;
    }
  }
  
  function postReducer(state, action) {
    switch (action.type) {
      case "CREATE_TODO":
        const newToDo = {
          title: action.title,
          description: action.description,
          author: action.author,
          id: action.id,
          dateCreated: action.dateCreated,
          complete: action.complete,
          dateCompleted: action.dateCompleted

        };
        return [newToDo, ...state];
      // Trying to get delete to work
      case "DELETE_TODO":
        return state.filter((todo)=> todo.id !== action.id)
      case "TOGGLE_TODO":
        state.map((todo)=>{
          if(todo.id === action.id){
            return {...todo, 
              complete: todo.complete,
              dateCompleted: (todo.dateCompleted === "") ? action.dateCompleted : ""
            };
          }
          return todo;
        })
      case "FETCH_TODOS":
        return action.ToDos
      default:
        return state;
    }
  }
  
  export default function appReducer(state, action) {
    return {
      user: userReducer(state.user, action),
      ToDos: postReducer(state.ToDos, action),
    };
  }