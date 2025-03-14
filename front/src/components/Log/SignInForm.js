import React, { useState } from "react";
import axios from "axios";
import { Loader } from "../Utils";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Ajout de l'état de chargement
  const [showDelayMessage, setShowDelayMessage] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); //Evite le comportement par defaut, que la page se recharge apres un submit

    setLoading(true); // Active le loader
    setShowDelayMessage(false); // Réinitialise le message

    const timeout = setTimeout(() => {
      setShowDelayMessage(true);
    }, 5000);

    try {
      // await new Promise((resolve) => setTimeout(resolve, 10000));

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
      clearTimeout(timeout); // Annule le message si la requête finit avant 5s

      if (response.data.error) {
        setError(response.data.error); // Stocker le message d'erreur dans l'état
      }
      // Stockage des informations du backend dans le localStorage
      console.log("Réponse :", response.data);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("user", response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userPic", response.data.imagePath);
      localStorage.setItem("description", response.data.description);
      localStorage.setItem("created_at", response.data.created_at);

      window.location = "/home";
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("Une erreur s'est produite, veuillez réessayer.");
      }
    } finally {
      setLoading(false); // Désactive le loader après la requête
    }
  };

  return (
    <div className="signin-container">
      <form action="" onSubmit={handleLogin} id="sign-in-form" noValidate>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          autoCapitalize="none"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
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
        <div className="signupError">{error}</div>
      </form>
      {/* Affichage du message d'erreur */}

      {/* Affichage du loader sous le formulaire */}
      {loading && (
        <Loader
          message={
            <>
              Connexion en cours...
              <br />
              <br />
              {showDelayMessage &&
                `
              Le site étant hébergé sur un serveur gratuit qui se met en
              veille, il se peut que le chargement soit un peu long.
              `}
            </>
          }
        />
      )}
    </div>
  );
};
export default SignInForm;
