// tp5_async.js - Version simple pour débutants

// 1) Fonction wait(ms) - Attendre un certain temps
function wait(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}

// 2) Simulation d'un système de login
// Base de données des utilisateurs (très simple)
const users = [
  {
    username: "alice",
    password: "1234",
    token: "token123",
    data: { name: "Alice", age: 25 },
  },
  {
    username: "bob",
    password: "5678",
    token: "token456",
    data: { name: "Bob", age: 30 },
  },
];

// Fonction pour simuler le login
function simulateLogin(username, password) {
  return new Promise(function (resolve, reject) {
    // On fait semblant que ça prend du temps (comme un vrai serveur)
    setTimeout(function () {
      // On cherche l'utilisateur dans notre "base de données"
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
          // Si on trouve, on retourne le token
          resolve(users[i].token);
          return;
        }
      }
      // Si on ne trouve pas, on retourne une erreur
      reject(new Error("Mauvais identifiants"));
    }, 1000); // 1 seconde de délai
  });
}

// Fonction pour obtenir les données utilisateur
function getUserData(token) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      for (let i = 0; i < users.length; i++) {
        if (users[i].token === token) {
          resolve(users[i].data);
          return;
        }
      }
      reject(new Error("Token invalide"));
    }, 800); // 0.8 seconde de délai
  });
}

// 3) Fonction principale avec async/await
async function main() {
  try {
    console.log("Début du programme...");

    // On essaie de se connecter
    console.log("Tentative de connexion...");
    const token = await simulateLogin("alice", "1234");
    console.log("Connexion réussie! Token:", token);

    // On attend un peu
    await wait(500);
    console.log("Récupération des données...");

    // On récupère les données
    const data = await getUserData(token);
    console.log("Données récupérées:", data);

    console.log("Tout s'est bien passé!");
  } catch (error) {
    console.log("Erreur:", error.message);
  }
}

// On lance le programme
main();
