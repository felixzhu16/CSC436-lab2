import React, { useState, useContext, useEffect } from "react"
import { useResource } from "react-request-hook"
import { StateContext } from "../contexts";

export default function Login() {
    const [ username, setUsername ] = useState("")
    const [loginFailed, setLoginFailed] = useState(false);
    const [password, setPassword] = useState("");
  
    const { dispatch } = useContext(StateContext);
  
    const [user, login] = useResource((username, password) => ({
      url: "/login",
      method: "post",
      data: { email: username, password },
    }));

    function handlePassword(evt) {
        setPassword(evt.target.value);
    }

    useEffect(()=>{
      // if(user?.data?.user){ optional chaining was failing to compile and unsure why
      if(user && user.data && user.data.user){
        setLoginFailed(false);
        dispatch({type:"LOGIN", username: user.data.user.email});
      }
      // if(user?.error){ samep problem as above
      if(user && user.error){
        // console.log(user?.error);
        console.log(user && user.error);
        setLoginFailed(true);
      }
    }, [user])

    return (
        <>
        {loginFailed && (
            <span style={{ color: "red" }}>Invalid username or password</span>
        )}
        <form onSubmit={e => {
            e.preventDefault(); 
            login(username, password);
            // dispatch(({type:"LOGIN", username}));
            }}
        >
             <label htmlFor="login-username">Username:</label>
             <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} name="login-username" id="login-username" />
             <label htmlFor="login-password">Password:</label>
             <input type="password" value={password} onChange={handlePassword} name="login-password" id="login-password" />
             <input type="submit" value="Login" disabled={username.length === 0} />
         </form>
        </>
     )
 }
 

