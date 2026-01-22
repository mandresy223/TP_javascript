// =======================================
// TP9 — LocalStorage & Persistance
// =======================================

// Sélection des éléments DOM
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const resetBtn = document.querySelector("#reset");

// Récupération des tâches depuis le localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// ===============================
// Fonctions
// ===============================

// Sauvegarde des tâches dans le localStorage
function saveTodos() {
  // localStorage stocke uniquement des chaînes de caractères
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Affichage des tâches
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    if (todo.done) {
      li.style.textDecoration = "line-through";
    }

    // Bouton supprimer
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    // Click pour terminer la tâche
    li.addEventListener("click", () => {
      todo.done = !todo.done;
      saveTodos();
      renderTodos();
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// ===============================
// Événements
// ===============================

// Ajout d'une tâche
form.addEventListener("submit", (e) => {
  e.preventDefault();

  todos.push({
    text: input.value,
    done: false
  });

  input.value = "";
  saveTodos();
  renderTodos();
});

// Reset du localStorage
resetBtn.addEventListener("click", () => {
  localStorage.removeItem("todos");
  todos = [];
  renderTodos();
});

// ===============================
// Initialisation
// ===============================

// Restaurer les tâches au chargement
renderTodos();
