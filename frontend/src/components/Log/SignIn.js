import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const EmailPasswordError = document.querySelector("#emailpasswordError");

    axios(
    { 
      method: "post",
      url: `http://localhost:5000/api/auth/login`,
      withCredentials: true,
      data: {
        email: email,
        password: password
      }
    })
    .then((res) => { 
        console.log(res);
        const token = res.data.token
        const userId = res.data.userId 
        const admin = res.data.admin
        localStorage.setItem('token', 'Bearer ' + token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('admin', admin);
        window.location = "/accueil"; 
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        // console.log(err.response.data);
        EmailPasswordError.textContent = "Email ou Mot de passe incorrect";
      } else {
        console.log(err);
      }
    });
  };  

  return (
    <div className='blocLogin'>
      <form className="blocForm" action="" onSubmit={handleLogin} id="sign-up-form">
        <div className="blocInput">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
          {/* <p id="emailError"></p> */}
        </div>
        <div className="blocInput">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
          <p id="emailpasswordError"></p>
        </div>
        <input type="submit" className="submitInput" value="Se connecter"/>
      </form>
    </div>
  );
};

export default SignIn;
