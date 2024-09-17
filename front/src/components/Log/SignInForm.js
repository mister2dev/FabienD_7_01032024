import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const emailError = document.querySelector(".email.error");
      // const passwordError = document.querySelector(".password.error");

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: false,
        }
      );

      if (response.data.error) {
        setError(response.data.error); // Stocker le message d'erreur dans l'état
      }

      console.log("Réponse :", response.data);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("user", response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userPic", response.data.imagePath);
      localStorage.setItem("description", response.data.description);
      localStorage.setItem("createdAt", response.data.createdAt);
      // if (response.data.errors) {
      //   emailError.innerHTML = response.data.errors.email;
      //   passwordError.innerHTML = response.data.errors.password;
      // } else {
      window.location = "/";
      //}
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
      <form action="" onSubmit={handleLogin} id="sign-up-form">
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
      <div className="signupError">{error}</div>
    </>
  );
};

export default SignInForm;
