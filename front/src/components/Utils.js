// import "./Loader.css"; // Import du style pour le spinner

// Formatage du texte à afficher pour la date
export const dateParser = (num) => {
  let options = {
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};

export const commentDateParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};

// Vérification d'un champ vide
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const Loader = ({ message }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};
