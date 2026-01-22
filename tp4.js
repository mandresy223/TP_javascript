// =======================================
// TP4 — Prototypes & ES6 Class
// =======================================

// 1️⃣ FONCTION CONSTRUCTEUR + PROTOTYPE
// Une fonction constructeur permet de créer des objets
// Le mot-clé new crée une nouvelle instance

function User(nom) {
    this.nom = nom;
  }
  
  // La méthode login est ajoutée au prototype
  // Elle est partagée par toutes les instances de User
  User.prototype.login = function () {
    console.log(this.nom + " est connecté");
  };
  
  // Tests
  const user1 = new User("Aina");
  const user2 = new User("Tiana");
  
  user1.login();
  user2.login();
  
  
  // 2️⃣ VERSION ES6 AVEC class
  // class est une syntaxe plus lisible basée sur les prototypes
  
  class UserES6 {
    constructor(nom) {
      this.nom = nom;
    }
  
    login() {
      console.log(this.nom + " est connecté (ES6)");
    }
  }
  
  // Tests
  const user3 = new UserES6("Toky");
  user3.login();
  
  
  // 3️⃣ HÉRITAGE AVEC extends
  // Admin hérite de UserES6
  
  class Admin extends UserES6 {
    constructor(nom) {
      // super() appelle le constructeur de la classe parente
      super(nom);
    }
  
    deleteUser(user) {
      console.log(this.nom + " a supprimé l'utilisateur " + user);
    }
  }
  
  // Tests
  const admin1 = new Admin("Hasina");
  admin1.login();          // méthode héritée
  admin1.deleteUser("Aina");
  