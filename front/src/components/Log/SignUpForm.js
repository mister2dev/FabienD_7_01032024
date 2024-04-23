import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      console.log("response.data:", response.data);
      console.log("rep:", response.data.error);

      if (response.data.error) {
        setError(response.data.error); // Stocker le message d'erreur dans l'état
      }

      if (response.data.error && response.data.error.includes("créé")) {
        setFormSubmit(true);
        setError("");
      }
    } catch (error) {
      if (error.response) {
        console.error("Erreur de requête :", error.response.data);
        setError(error.response.data.error); // Stocker le message d'erreur dans l'état
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
          <br />
          <input type="submit" value="Suivant" />
        </form>
      )}
      <div className="signupError">{error}</div>
    </>
  );
};

export default SignUpForm;
