import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom"; // needs to be simplified
import "./Login.css";

export default function SignInPage()
{
  // using the state variables to accept the input values for the signInWithEamilAndPassword
  // we pass a string inside the useState("") parameter 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // variable declaration for the google authentication provider

  // Simplify this code 
  // button navigation infrastructure 
  let navigate = useNavigate(); 
  const routeChange = (route) => { 
    let path = route; 
    navigate(path);
  }

  const signInUsingEmail = (e) => {
    // todo: sign in
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      console.log(userCredential);
      routeChange(`../`);
    })
    .catch((error) => { 
      console.log(error);
    })
  }
  
    return(
      <div className="Login-Container"> 
        <form onSubmit={signInUsingEmail}>
          <h1 className="welcomeMessage">Welcome back, Bruin!</h1>
          <input className="loginInput" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <br/>
          <input className="loginInput" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <br/>
          <button type="submit" className="bigButton">Sign In</button>
          <h2 className="noAccount">Don't have an account?</h2>
          <button type="button" className="bigButton" onClick={() => routeChange(`/SignUpPage`)}>Register</button>
        </form>
      </div>
    );
}