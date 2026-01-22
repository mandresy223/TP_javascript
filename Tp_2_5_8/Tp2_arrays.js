// TP2 - Array Master
// Manipulation de tableaux avec map, filter, reduce

// Dataset des étudiants ;
//  c'est à dire un tableau qui contient les données des étudiants
/*  nom, notes, parcours sont des syntaxes pour les objets JavaScript */
let etudiants = [
  { nom: "Alice", notes: [12, 15, 14], parcours: "informatique" },
  { nom: "Bob", notes: [8, 10, 9], parcours: "physique" },
  { nom: "Clara", notes: [16, 18, 17], parcours: "informatique" },
  { nom: "David", notes: [11, 13, 12], parcours: "informatique" },
  { nom: "Emma", notes: [14, 12, 15], parcours: "mathematiques" },
  { nom: "Frank", notes: [7, 9, 8], parcours: "mathematiques" },
  { nom: "Grace", notes: [19, 17, 18], parcours: "informatique" },
  { nom: "Hugo", notes: [10, 11, 10], parcours: "physique" },
];

// ========================================
// 1) Ajouter la moyenne pour chaque etudiant
// ========================================

console.log("=== 1 : Ajout des moyennes ===");
console.log("");

// on utilise map pour ajouter la moyenne
// chaque etudiant va etre transforme en un nouvel etudiant avec la moyenne
// on calcule la moyenne en faisant la somme des notes divisee par le nombre de notes

let etudiantsAvecMoyenne = etudiants.map(function (etudiant) {
  // calculer la somme des notes
  let somme = 0;
  for (let i = 0; i < etudiant.notes.length; i++) {
    somme = somme + etudiant.notes[i];
  }

  // calculer la moyenne
  let moyenne = somme / etudiant.notes.length;

  // arrondir a 2 chiffres apres la virgule c'est à dire 0.01
  moyenne = Math.round(moyenne * 100) / 100;

  // retourner l'etudiant avec sa moyenne
  return {
    nom: etudiant.nom,
    notes: etudiant.notes,
    parcours: etudiant.parcours,
    moyenne: moyenne,
  };
});

// afficher les resultats
for (let i = 0; i < etudiantsAvecMoyenne.length; i++) {
  console.log(
    etudiantsAvecMoyenne[i].nom +
      " : moyenne = " +
      etudiantsAvecMoyenne[i].moyenne,
  );
}

// ========================================
// 2) Filtrer les etudiants avec moyenne >= 12
// ========================================

console.log("");
console.log("=== 2 : Etudiants avec moyenne >= 12 ===");
console.log("");

// on utilise filter pour garder seulement ceux qui ont 12 ou plus
let etudiantsFiltres = etudiantsAvecMoyenne.filter(function (etudiant) {
  if (etudiant.moyenne >= 12) {
    return true;
  } else {
    return false;
  }
});

// afficher les etudiants filtres
console.log(
  "Nombre d'etudiants avec moyenne >= 12 : " + etudiantsFiltres.length,
);
console.log("");

for (let i = 0; i < etudiantsFiltres.length; i++) {
  console.log(
    "- " + etudiantsFiltres[i].nom + " (" + etudiantsFiltres[i].moyenne + ")",
  );
}

// ========================================
// 3) Trier par moyenne decroissante
// ========================================

console.log("");
console.log("=== 3 : Tri par moyenne decroissante ===");
console.log("");

// on copie le tableau pour pas modifier l'original
let etudiantsTries = [];
for (let i = 0; i < etudiantsAvecMoyenne.length; i++) {
  etudiantsTries.push(etudiantsAvecMoyenne[i]);
}

// on trie avec sort
etudiantsTries.sort(function (a, b) {
  // si b.moyenne > a.moyenne, b vient avant a (decroissant)
  return b.moyenne - a.moyenne;
});

// afficher le classement
console.log("Classement des etudiants :");
console.log("");

for (let i = 0; i < etudiantsTries.length; i++) {
  let position = i + 1;
  console.log(
    position +
      ". " +
      etudiantsTries[i].nom +
      " - Moyenne : " +
      etudiantsTries[i].moyenne,
  );
}

// ========================================
// 4) Grouper par parcours
// ========================================

console.log("");
console.log("=== 4 : Groupement par parcours ===");
console.log("");

// on utilise reduce pour grouper
let parParcours = etudiantsAvecMoyenne.reduce(function (resultat, etudiant) {
  // si pas de parcours, on met "non defini"
  let parcours = etudiant.parcours;
  if (parcours == undefined) {
    parcours = "non defini";
  }

  // si le parcours existe pas encore dans resultat, on le cree
  if (resultat[parcours] == undefined) {
    resultat[parcours] = [];
  }

  // on ajoute l'etudiant dans son parcours
  resultat[parcours].push(etudiant);

  return resultat;
}, {});

// afficher les groupes
let lesParcours = Object.keys(parParcours);

for (let i = 0; i < lesParcours.length; i++) {
  let nomParcours = lesParcours[i];
  let etudiantsDuParcours = parParcours[nomParcours];

  console.log("Parcours : " + nomParcours.toUpperCase());
  console.log("Nombre d'etudiants : " + etudiantsDuParcours.length);

  for (let j = 0; j < etudiantsDuParcours.length; j++) {
    console.log(
      "   - " +
        etudiantsDuParcours[j].nom +
        " (moyenne: " +
        etudiantsDuParcours[j].moyenne +
        ")",
    );
  }
  console.log("");
}
