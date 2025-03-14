import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import { Loader } from "../Utils";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Ajout de l'état de chargement
  const [showDelayMessage, setShowDelayMessage] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault(); //Evite le comportement par defaut, c'est à dire que la page se recharge apres un submit

    setLoading(true); // Active le loader
    setShowDelayMessage(false); // Réinitialise le message

    const timeout = setTimeout(() => {
      setShowDelayMessage(true);
    }, 5000);

    // On envoie les informations au backend via axios
    try {
      // await new Promise((resolve) => setTimeout(resolve, 10000));

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/auth/signup`,
        {
          username,
          email,
          password,
        }
      );
      clearTimeout(timeout); // Annule le message si la requête finit avant 5s

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
    } finally {
      setLoading(false); // Désactive le loader après la requête
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
        <div className="signup-container">
          <form
            action=""
            onSubmit={handleRegister}
            id="sign-up-form"
            noValidate
          >
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              placeholder="Nom d'utilisateur"
              autoCapitalize="none"
              onChange={(e) => setPseudo(e.target.value)}
              value={username}
            />
            <br />
            <br />
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
      )}
      {/* Afficher le message d'erreur provenant du backend */}
    </>
  );
};

export default SignUpForm;
