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
    e.preventDefault(); //Evite le comportement par defaut, c'est à dire que la page se recharge apres un submit

    // On envoie les informations au backend via axios
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

      if (response.data.message) {
        setError(response.data.message); // Stocker le message d'erreur dans l'état
      }

      //SetFormSubmit permet de vérifier que l'inscription est validée et ensuite de baculer sur connexion
      if (response.data.message && response.data.message.includes("créé")) {
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
    // Utilisation des fragments lorsque plusieurs éléments sont ajoutés en html avec react
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
          <br />
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
          <br />
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
          <br />
          <br />
          <br />
          <input type="submit" value="Suivant" />
        </form>
      )}
      {/* Afficher le message d'erreur provenant du backend */}
      <div className="signupError">{error}</div>
    </>
  );
};

export default SignUpForm;
