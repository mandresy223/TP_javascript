// 1️⃣ CRÉATION D'UN OBJET
// Un objet permet de regrouper des données et des fonctions

const teacher = {  //teacher eest l'obejt creer ici
    nom: "Rakoto",
    matiere: "JavaScript",
  
    presenter() {
      // this fait référence à l'objet qui appelle la méthode
      console.log(this.nom + " enseigne " + this.matiere);
    }
  };
  
  // Test normal (ça marche)
  teacher.presenter();
  
  
  // 2️⃣ PERTE DU CONTEXTE this (FAUTE VOLONTAIRE)
  
  // On stocke la méthode dans une variable
  const presentation = teacher.presenter;
  
  // ❌ ERREUR : this est perdu car la fonction n'est plus appelée par l'objet
  // Ici, this vaut undefined
  presentation();
  
  
  // 3️⃣ CORRECTION AVEC bind
  
  // bind permet de fixer définitivement la valeur de this
  const presentationCorrigee = teacher.presenter.bind(teacher);
  
  // ✅ this fonctionne correctement
  presentationCorrigee();
  
  
  // 4️⃣ call & apply
  // call et apply permettent d'appeler une fonction
  // en définissant manuellement la valeur de this
  
  function printIdentity(ville, pays) {
    console.log(this.nom + " vit à " + ville + ", " + pays);
  }
  
  // call : arguments séparés
  printIdentity.call(teacher, "Antananarivo", "Madagascar");
  
  // apply : arguments sous forme de tableau
  printIdentity.apply(teacher, ["Antananarivo", "Madagascar"]);


  