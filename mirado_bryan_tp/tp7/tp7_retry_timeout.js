/*TP 7 — Gestion d’erreurs & Retry
 * Objectifs : appels robustes
 * Fichier : tp7_retry_timeout.js
/

/*  1) Fonction withTimeout(promise, ms)
   - Rejette si la promesse met trop de temps
 */

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    // Timer de timeout
    const timer = setTimeout(() => {
      reject("Timeout dépassé (" + ms + " ms)");
    }, ms);

    promise
      .then((result) => {
        clearTimeout(timer); // annule le timeout
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

/*  2) Fonction retry(fn, attempts, delay)
   - Réessaie une fonction plusieurs fois
   - Affiche des logs à chaque tentative
    */

function retry(fn, attempts, delay) {
  return new Promise((resolve, reject) => {
    function attempt(currentAttempt) {
      console.log("Tentative", currentAttempt, "/", attempts);

      fn()
        .then((result) => {
          console.log("Succès à la tentative", currentAttempt);
          resolve(result);
        })
        .catch((error) => {
          console.log("Échec :", error);

          if (currentAttempt >= attempts) {
            reject("Toutes les tentatives ont échoué");
          } else {
            console.log("Nouvelle tentative dans", delay, "ms\n");
            setTimeout(() => {
              attempt(currentAttempt + 1);
            }, delay);
          }
        });
    }

    attempt(1);
  });
}

/* 3) Fonction simulant un appel réseau instable */

function fakeApiCall() {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.6; // 40% d’échec

    setTimeout(() => {
      if (success) {
        resolve("Données récupérées avec succès");
      } else {
        reject("Erreur réseau");
      }
    }, 2000);
  });
}

/* 4) Test de withTimeout */

console.log("=== Test withTimeout ===");

withTimeout(fakeApiCall(), 1500)
  .then((result) => {
    console.log("Résultat :", result);
  })
  .catch((error) => {
    console.error("Erreur :", error);
  });

/*5) Test de retry */

console.log("\n=== Test retry ===");

retry(fakeApiCall, 5, 1000)
  .then((result) => {
    console.log("Résultat final :", result);
  })
  .catch((error) => {
    console.error("Erreur finale :", error);
  });

/* 6) Bonus : retry + withTimeout combinés */

console.log("\n=== Test retry + withTimeout ===");

retry(() => withTimeout(fakeApiCall(), 3000), 3, 1500)
  .then((result) => {
    console.log("Succès final :", result);
  })
  .catch((error) => {
    console.error("Échec final :", error);
  });
