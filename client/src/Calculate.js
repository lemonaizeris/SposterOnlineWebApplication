import React, {useState} from 'react';
import './App.css';
import Axios from 'axios';


function Calculate() {
  const [varA, setVarA] = useState("");
  const [varB, setVarB] = useState("");
  const [sumResult, setSumResult] = useState("");

  const calculate = () => {
    Axios({
      method: "POST",
      data: {
        a: varA,
        b: varB,
      },
      withCredentials: true,
      url: "http://localhost:4000/calculate"
    }).then((res) => {
        setSumResult(res.data);
    });
  };

  const logout = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/logout"
    }).then((res) => {
      return window.location.href = '/login';
    });
  };

  return (
    <div className="Calculate">

      <div>
        <h1>Sum 2 variables</h1>
        <input placeholder='a' onChange={e => setVarA(e.target.value)} />
        <input placeholder='b' onChange={e => setVarB(e.target.value)} />
        <button onClick={calculate}>Sum</button>
        {sumResult ? <h3>The result is: {sumResult}</h3> : <h3>The result is:</h3>}
      </div>
        <button onClick={logout} type="submit">Log out</button>

    </div>
  );
}

export default Calculate;
