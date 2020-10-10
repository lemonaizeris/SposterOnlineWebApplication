import React, {useState} from 'react';
import './App.css';
import Axios from 'axios';


function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => {
      if (res.data === 'True') {
        //return <Redirect to='/calculate' />
        //this.props.history.push('/calculate');
        return window.location.href = '/calculate';
      }
    });
  };

  return (
    <div className="Login">

      <div>
        <h1>Login</h1>
        <input placeholder='username' onChange={e => setLoginUsername(e.target.value)} />
        <input placeholder='password' onChange={e => setLoginPassword(e.target.value)} />
        <button onClick={login}>Submit</button>
      </div>
      
    </div>
  );
}

export default Login;
