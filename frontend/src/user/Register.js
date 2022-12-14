import { useState, useContext, useEffect } from "react"
import { useResource } from "react-request-hook";
import { StateContext } from "../contexts";
import React from "react"

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [status, setStatus] = useState("");

    const { dispatch } = useContext(StateContext);

    function handlePassword(evt) {
        setPassword(evt.target.value);
      }
    function handlePasswordRepeat(evt) {
        setPasswordRepeat(evt.target.value);
    }

    const [user, register] = useResource((username, password) => ({
        url: "auth/register",
        method: "POST",
        data: { username, password, passwordConfirmation: password },
      }));

    useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
            if (user.error) {
                setStatus("Registration failed, please try again later.");
              } else {
                setStatus("Registration successful. You may now login.");
            }
        }
    }, [user]);
    

    return (
        <form onSubmit={e => {
            e.preventDefault(); 
            register(username, password)
            // dispatch({type: "REGISTER", username}) 
            }}
        >
            <label htmlFor="register-username">Username:</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}  name="register-username" id="register-username" />
            <label htmlFor="register-password">Password:</label>
            <input type="password" name="register-password" id="register-password" value={password} onChange={handlePassword} />
            <label htmlFor="register-password-repeat">Repeat password:</label>
            <input type="password" name="register-password-repeat" id="register-password-repeat" value={passwordRepeat} 
                                                                                               onChange={handlePasswordRepeat}  />
            <input type="submit" value="Register" disabled={username.length === 0 || password.length === 0 || password !== passwordRepeat} />
            <p>{status}</p>
        </form>
    )
}