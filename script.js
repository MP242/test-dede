document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("myVideo");
  const speakerIcon = document.getElementById("speakerIcon");
  const rotateIcon = document.getElementById("rotateIcon");
  const enterButton = document.getElementById("enterButton"); // Référence au bouton "Entrez"

  let speakerTimeout; // Pour stocker l'ID du timeout du haut-parleur
  let rotateTimeout; // Pour stocker l'ID du timeout de rotation
  let buttonShown = false; // Drapeau pour s'assurer que le bouton n'apparaît qu'une fois

  // Fonction utilitaire pour masquer un élément avec une transition de fondu
  const hideElement = (element) => {
    element.classList.add("fade-out");
    setTimeout(() => {
      element.classList.add("hidden"); // Cache complètement après la transition
    }, 1000); // Correspond à la durée de la transition CSS (1s)
  };

  // Fonction pour afficher les icônes temporaires et les masquer après un délai
  const showTemporaryIcons = () => {
    // Annuler les timeouts précédents si la vidéo est rejouée rapidement
    clearTimeout(speakerTimeout);
    clearTimeout(rotateTimeout);

    // Rendre les icônes visibles et supprimer les classes de masquage
    speakerIcon.classList.remove("hidden", "fade-out");
    rotateIcon.classList.remove("hidden", "fade-out");

    // Masquer l'icône de haut-parleur après 3 secondes
    speakerTimeout = setTimeout(() => {
      hideElement(speakerIcon);
    }, 3000); // 3 secondes

    // Masquer l'icône de rotation après 3 secondes
    rotateTimeout = setTimeout(() => {
      hideElement(rotateIcon);
    }, 3000); // 3 secondes
  };

  // Masquer le bouton Entrez au début de chaque lecture
  const hideEnterButton = () => {
    enterButton.classList.remove("visible");
    enterButton.classList.add("hidden"); // Assurer qu'il est bien caché
    enterButton.style.opacity = "0"; // Forcer l'opacité à 0
    enterButton.style.pointerEvents = "none"; // Désactiver les clics
    buttonShown = false; // Réinitialiser le drapeau
  };

  // Initialisation au chargement de la page
  hideEnterButton(); // Le bouton Entrez est caché par défaut

  // Écouter l'événement 'play' de la vidéo
  video.addEventListener("play", () => {
    console.log(
      "Vidéo en lecture, affichage des icônes temporaires et masquage du bouton Entrez"
    );
    showTemporaryIcons();
    hideEnterButton(); // S'assurer que le bouton Entrez est caché au début de la lecture
  });

  // Écouter l'événement 'timeupdate' (mise à jour du temps de lecture)
  video.addEventListener("timeupdate", () => {
    // Vérifier si la vidéo est suffisamment proche de la fin
    // et si le bouton n'a pas déjà été affiché
    if (video.duration - video.currentTime <= 2 && !buttonShown) {
      console.log(
        "2 secondes avant la fin de la vidéo, affichage du bouton Entrez"
      );
      enterButton.classList.remove("hidden"); // Supprimer la classe hidden
      enterButton.classList.add("visible"); // Rendre le bouton "Entrez" visible
      enterButton.style.opacity = "1"; // Forcer l'opacité à 1
      enterButton.style.pointerEvents = "auto"; // Activer les clics
      buttonShown = true; // Définir le drapeau pour éviter les affichages répétés
    }
  });

  // Gérer le clic sur le bouton "Entrez"
  enterButton.addEventListener("click", () => {
    console.log("Bouton Entrez cliqué, redirection vers le site du mariage");
    window.location.href =
      "https://lola-marc-save-the-date.my.canva.site/wedding"; // Redirige vers le lien spécifié
  });

  // Pour le cas où la vidéo serait en autoplay et commencerait avant le 'play' event
  // Ou si l'utilisateur met en pause et rejoue rapidement
  // On peut aussi déclencher showTemporaryIcons() si la vidéo est déjà en lecture au DOMContentLoaded
  if (!video.paused && !video.ended && video.readyState > 2) {
    showTemporaryIcons();
  }
});
