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
          dateCreated: action.dateCreated
        };
        return [newToDo, ...state];
        // Trying to get delete to work
      case "DELETE_TODO":
        return state.filter((key)=> key !== action.id)

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