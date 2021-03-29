

import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handelFbSignIn, handelGoogleSignIn, handelSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({

    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = ()=> {
      handelGoogleSignIn()
      .then(response =>{
        handelResponse(response, true);
      });
  }

  const fbSignIn = ()=>{
      handelFbSignIn()
      .then(response =>{
        handelResponse(response, true);
        });
  }

  const signOut = () =>{
      handelSignOut()
      .then(response =>{
        handelResponse(response, false);
        });
  }

   const handelResponse = (response, redirect) =>{
    setUser(response);
    setLoggedInUser(response);
    if(redirect){
        history.replace(from);
    }
   }   
 
  const handelBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(isFormValid);
    }
    if (e.target.name === 'password') {

      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handelSubmit = (e) => {
    if (newUser && user.email && user.password) {
     createUserWithEmailAndPassword(user.name, user.email, user.password)
     .then(response =>{
        handelResponse(response, true);
        });
    }

    if (!newUser && user.email && user.password) {
     signInWithEmailAndPassword(user.email, user.password)
     .then(response =>{
        handelResponse(response, true);
        });
    }
    e.preventDefault()
  }
  

  return (
    <div style = {{textAlign: 'center'}}>

      {
        user.isSignedIn ? <button onClick={signOut} >Sign Out</button> :
          <button onClick={googleSignIn} >Sign in</button>
      }
      <br></br>
      <button onClick = {fbSignIn}>Login using Facebook</button>
      {
        user.isSignedIn && <div>
          <p> Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      }


      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser"> New User SignUp</label>
      <form onSubmit={handelSubmit}>
        {newUser && <input name="name" type="text" onBlur={handelBlur} placeholder="Your Name" required />}
        <br></br>
        <input type="text" name="email" onBlur={handelBlur} placeholder="Write Your Email" required />
        <br></br>
        <input type="password" onBlur={handelBlur} name="password" placeholder="Your Password" required />
        <br></br>
        <input type="submit" value={newUser? 'Sign Up': 'Sign In'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged in Successfully'}</p>}
    </div>
  );
}

export default Login;
