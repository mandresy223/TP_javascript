// =======================================
// TP10 — Dashboard Étudiants
// =======================================

// Sélection DOM
const tableBody = document.querySelector("#table-body");
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector("#filter");
const sortNameBtn = document.querySelector("#sort-name");
const sortAvgBtn = document.querySelector("#sort-avg");
const exportBtn = document.querySelector("#export");

let students = [];
let filteredStudents = [];

// ===============================
// Fonctions utilitaires
// ===============================

// Calcul de la moyenne
function calculateAverage(notes) {
  const sum = notes.reduce((a, b) => a + b, 0);
  return (sum / notes.length).toFixed(2);
}

// Affichage du tableau
function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach(student => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${student.nom}</td>
      <td>${student.parcours}</td>
      <td>${calculateAverage(student.notes)}</td>
    `;

    tableBody.appendChild(tr);
  });
}

// ===============================
// Chargement JSON
// ===============================

fetch("students.json")
  .then(res => res.json())
  .then(data => {
    students = data;
    filteredStudents = data;
    renderTable(filteredStudents);
  });

// ===============================
// Recherche live
// ===============================

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  filteredStudents = students.filter(s =>
    s.nom.toLowerCase().includes(value)
  );

  renderTable(filteredStudents);
});

// ===============================
// Filtre parcours
// ===============================

filterSelect.addEventListener("change", () => {
  const value = filterSelect.value;

  filteredStudents = value === "ALL"
    ? students
    : students.filter(s => s.parcours === value);

  renderTable(filteredStudents);
});

// ===============================
// Tri
// ===============================

sortNameBtn.addEventListener("click", () => {
  filteredStudents.sort((a, b) => a.nom.localeCompare(b.nom));
  renderTable(filteredStudents);
});

sortAvgBtn.addEventListener("click", () => {
  filteredStudents.sort(
    (a, b) =>
      calculateAverage(b.notes) - calculateAverage(a.notes)
  );
  renderTable(filteredStudents);
});

// ===============================
// BONUS : Export CSV
// ===============================

exportBtn.addEventListener("click", () => {
  let csv = "Nom,Parcours,Moyenne\n";

  filteredStudents.forEach(s => {
    csv += `${s.nom},${s.parcours},${calculateAverage(s.notes)}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "students.csv";
  a.click();

  URL.revokeObjectURL(url);
});
