function fetchUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Mirado", "Mandresy", "Mihajasoa"]);
    }, 2000);
  });
}

function fetchCourses() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Javascript", "PHP", "Web design"]);
    }, 1500);
  });
}

function fetchGrades() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([15, 12, 18]);
    }, 2500);
  });
}

Promise.all([fetchUsers(), fetchCourses(), fetchGrades()])
  .then((results) => {
    const [users, courses, grades] = results;
    console.log("=== Promise.all ===");
    console.log("Utilisateurs :", users);
    console.log("Cours :", courses);
    console.log("Notes :", grades);
  })
  .catch((error) => {
    console.error("Erreur Promise.all :", error);
  });

Promise.allSettled([fetchUsers(), fetchCourses(), fetchGrades()])
  .then((results) => {
    console.log("\n=== Promise.allSettled ===");
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Promise ${index + 1} réussie :`, result.value);
      } else {
        console.log(`Promise ${index + 1} échouée :`, result.reason);
      }
    });
  });

Promise.race([fetchUsers(), fetchCourses(), fetchGrades()])
  .then((result) => {
    console.log("\n=== Promise.race ===");
    console.log("Première promesse terminée :", result);
  })
  .catch((error) => {
    console.error("Erreur Promise.race :", error);
  });

Promise.any([fetchUsers(), fetchCourses(), fetchGrades()])
  .then((result) => {
    console.log("\n=== Promise.any ===");
    console.log("Première promesse réussie :", result);
  })
  .catch((error) => {
    console.error("Toutes les promesses ont échoué :", error);
  });
