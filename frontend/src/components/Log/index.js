import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
      <div className="container-form">
        <div className="button-form">
          <div onClick={handleModals} id="register" className={signUpModal ? "active-btn" : null}>
            S'inscrire
          </div>
          <div onClick={handleModals} id="login" className={signInModal ? "active-btn" : null}>
            Se connecter
          </div>
        </div>
        <div className="log-form">
          {signUpModal && <SignUp />}
          {signInModal && <SignIn />}
        </div>
      </div>
  );
};

export default Log;
