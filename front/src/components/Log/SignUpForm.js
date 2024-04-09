import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //  const [controlPassword, setControlPassword] = useState("");

  //const signupError = document.querySelector("SignupError");

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   // const terms = document.getElementById("terms");
  //   // const usernameError = document.querySelector(".username.error");
  //   // const emailError = document.querySelector(".email.error");
  //   // const passwordError = document.querySelector(".password.error");
  //   // const passwordConfirmError = document.querySelector(
  //   // ".password-confirm.error"
  //   // );
  //   // const termsError = document.querySelector(".terms.error");

  //   //    passwordConfirmError.innerHTML = "";
  //   //    termsError.innerHTML = "";

  //   // if (password !== controlPassword || !terms.checked) {
  //   //   if (password !== controlPassword)
  //   //     passwordConfirmError.innerHTML =
  //   //       "Les mots de passe ne correspondent pas";

  //   //   if (!terms.checked)
  //   //     termsError.innerHTML = "Veuillez valider les conditions générales";
  //   // } else {
  //   await axios({
  //     method: "post",
  //     url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
  //     data: {
  //       username,
  //       email,
  //       password,
  //     },
  //   })
  //     .then((res) => {
  //       console.log("reponse :", res);
  //       console.log("reponse :", res.data.message);

  //       if (res.data.message.includes("créé")) {
  //         //   usernameError.innerHTML = res.data.errors.username;
  //         //   emailError.innerHTML = res.data.errors.email;
  //         //   passwordError.innerHTML = res.data.errors.password;
  //         // } else {
  //         setFormSubmit(true);
  //       }
  //       if (res.data.message.includes("email")) {
  //       }
  //     })
  //     .catch((err) => console.log(err));
  //  }
  //};

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/auth/signup`,
        {
          username,
          email,
          password,
        }
      );

      console.log("Réponse :", response);

      if (response.data.error) {
        setError(response.data.error); // Stocker le message d'erreur dans l'état
      }

      if (response.data.message.includes("créé")) {
        setFormSubmit(true);
        setError("");
      }
    } catch (error) {
      if (error.response) {
        // La requête a été reçue par le serveur, mais il a renvoyé un code d'erreur
        console.error("Erreur de requête :", error.response.data);
        setError(error.response.data.error); // Stocker le message d'erreur dans l'état
      } else if (error.request) {
        // La requête a été effectuée, mais aucune réponse n'a été reçue
        console.error("Aucune réponse reçue pour la requête :", error.request);
      } else {
        // Une erreur s'est produite lors de la configuration de la requête
        console.error(
          "Erreur lors de la configuration de la requête :",
          error.message
        );
      }
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo"></label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            placeholder="Nom d'utilisateur"
            onChange={(e) => setPseudo(e.target.value)}
            value={username}
          />
          <div className="username error"></div>
          <label htmlFor="email"></label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <label htmlFor="password"></label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          {/* <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br/>
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div> */}
          <br />
          <input type="submit" value="Suivant" />
        </form>
      )}
      <div className="signupError">{error}</div>
    </>
  );
};

export default SignUpForm;
