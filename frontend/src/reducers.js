function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
      case "REGISTER":
        return{
          username: action.username,
          access_token: action.access_token,
        };
      case "LOGOUT":
        return null;
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
          _id: action.id,
          dateCreated: action.dateCreated,
          complete: action.complete,
          dateCompleted: action.dateCompleted
        };
        return [newToDo, ...state];
      // Trying to get delete to work
      case "DELETE_TODO":
        return state.filter((todo)=> todo._id !== action._id)
      case "TOGGLE_TODO":
          const update = state.map((todo)=>{
          if(todo._id === action._id){
            return {...todo, 
              complete: action.complete,
              dateCompleted: action.dateCompleted
            };
          }
          return todo;
        })
        return update;
      case "FETCH_TODOS":
        return action.ToDos
      case "CLEAR_TODOS":
        return [];
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