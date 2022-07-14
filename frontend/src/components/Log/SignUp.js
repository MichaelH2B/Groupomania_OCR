import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignIn";

const SignUp = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [nom, setLastname] = useState("");
  const [prenom, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const emailError = document.querySelector("#emailError");
    const passwordError = document.querySelector("#passwordError");
    const passwordConfirmError = document.querySelector("#password-confirmError");

    passwordConfirmError.text = "";

    if (password !== controlPassword) {
      passwordConfirmError.textContent = "Les mots de passe ne correspondent pas";
      setTimeout(() => {
        document.querySelector('#password-confirmError').textContent = "";
      }, 6000);
    } else {

      axios(
      { 
        method: "post", 
        url: `http://localhost:5000/api/auth/signup`,
        data: {
          nom: nom,
          prenom: prenom,
          email: email,
          password: password
        }
      })
      .then((res) => {
        console.log(res);
        setFormSubmit(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
          emailError.textContent = err.response.data.email;
          passwordError.textContent = err.response.data.password
          setTimeout(() => {
            document.querySelector('#emailError').textContent = "";
            document.querySelector('#passwordError').textContent = "";
          }, 6000);
        } else {
          console.log(err);
        }
      });
    };
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <p className="success"> Enregistrement réussi !</p>
        </>
      ) : (
        <div className='blocRegister'>
          <form className="blocForm" action="" onSubmit={handleRegister} id="sign-up-form">
            <div className="blocInput">
              <label htmlFor="lastname">Nom</label>
              <input type="text" name="nom" id="nom" onChange={(e) => setLastname(e.target.value)} value={nom}/>
            </div>
            <div className="blocInput">
              <label htmlFor="firstname">Prénom</label>
              <input type="text" name="prenom" id="prenom" onChange={(e) => setFirstname(e.target.value)} value={prenom}/>
            </div>
            <div className="blocInput">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
              <div id="emailError"></div>
            </div>
            <div className="blocInput">
              <label htmlFor="password">Mot de passe</label>
              <input type="password" name="password" id="password" onChange={(e) => setControlPassword(e.target.value)} value={controlPassword}/>
              <div id="passwordError"></div>
            </div>
            <div className="blocInput">
              <label htmlFor="password-conf">Confirmer mot de passe</label>
              <input type="password" name="password" id="password-conf" onChange={(e) => setPassword(e.target.value)} value={password}/>
              <div id="password-confirmError"></div>
            </div>
            <input type="submit" className="submitInput" value="Valider inscription"/>
          </form>
       	</div>
      )}
    </>
  );
};

export default SignUp;
