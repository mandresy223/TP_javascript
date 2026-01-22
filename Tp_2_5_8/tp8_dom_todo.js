const input = document.getElementById("tacheInput");
const btnAjouter = document.getElementById("btnAjouter");
const liste = document.getElementById("listeTaches");
const filterButtons = document.querySelectorAll(".filter-btn");

// 1. Fonction pour ajouter une tâche
function ajouterTache() {
  const texte = input.value;

  // Vérif si vide
  if (texte === "") {
    alert("Il faut écrire quelque chose !");
    return;
  }

  // Création du LI
  const li = document.createElement("li");

  // J'utilise innerHTML pour aller plus vite pour créer les boutons spans
  li.innerHTML = `
        <span class="texte-tache">${texte}</span>
        <div class="actions">
            <button class="btn-check">V</button>
            <button class="btn-delete">X</button>
        </div>
    `;

  // Ajout à la liste (UL)
  liste.appendChild(li);

  // Vider l'input
  input.value = "";
}

// Ecouteur sur le bouton Ajouter
btnAjouter.addEventListener("click", ajouterTache);

// Petit bonus : Ajouter avec la touche Entrée
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    ajouterTache();
  }
});

// 2. OPTIMISATION : Event Delegation
// Au lieu de mettre un addEventListener sur chaque bouton supprimer/valider
// Je mets un seul écouteur sur le parent (UL)
liste.addEventListener("click", function (event) {
  const itemClique = event.target; // Sur quoi j'ai cliqué ?

  // Si c'est le bouton SUPPRIMER
  if (itemClique.classList.contains("btn-delete")) {
    // On remonte au parent <li> pour le supprimer
    const li = itemClique.closest("li");
    li.remove();
  }

  // Si c'est le bouton VALIDER (Done)
  if (itemClique.classList.contains("btn-check")) {
    const li = itemClique.closest("li");
    // On toggle la classe CSS 'termine'
    li.classList.toggle("termine");
  }
});

// 3. Gestion des Filtres
// J'ajoute un écouteur sur chaque bouton de filtre
filterButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const filtre = e.target.getAttribute("data-filter");
    filtrerTaches(filtre);
  });
});

function filtrerTaches(status) {
  // Je récupère tous les LI de ma liste
  const taches = liste.querySelectorAll("li");

  taches.forEach((tache) => {
    // Est-ce que la tâche est finie ?
    const estFini = tache.classList.contains("termine");

    switch (status) {
      case "all":
        tache.style.display = "flex";
        break;
      case "todo":
        if (estFini) {
          tache.style.display = "none"; // On cache si c'est fini
        } else {
          tache.style.display = "flex";
        }
        break;
      case "done":
        if (estFini) {
          tache.style.display = "flex";
        } else {
          tache.style.display = "none"; // On cache si pas fini
        }
        break;
    }
  });
}
