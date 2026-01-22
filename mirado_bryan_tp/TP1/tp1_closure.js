/**
 * TP 1 — Closures & Fonctions avancées
 * Fichier : tp1_closures.js
 */

// 1) createCounter() avec increment/decrement/value
function createCounter() {
    let count = 0; // Variable privée protégée par la closure

    return {
        increment: function() {
            count++;
        },
        decrement: function() {
            count--;
        },
        value: function() {
            return count;
        }
    };
}

// 2) once(fn)
function once(fn) {
    let executed = false;
    let result;

    return function(...args) {
        if (!executed) {
            executed = true;
            result = fn(...args);
            return result;
        }
        return result; // Retourne le résultat du premier appel lors des suivants
    };
}

// 3) memoize(fn)
function memoize(fn) {
    const cache = {}; // Stockage des résultats précédents

    return function(...args) {
        // Création d'une clé unique basée sur les arguments
        const key = JSON.stringify(args);

        if (key in cache) {
            console.log(`(Cache utilisé pour les arguments : ${key})`);
            return cache[key];
        } else {
            const result = fn(...args);
            cache[key] = result;
            return result;
        }
    };
}

// --- TESTS CONSOLE ---

console.log("--- Test createCounter ---");
const monCompteur = createCounter();
monCompteur.increment();
monCompteur.increment();
console.log("Valeur après 2 incréments :", monCompteur.value()); // 2
monCompteur.decrement();
console.log("Valeur après 1 décrément :", monCompteur.value()); // 1

console.log("\n--- Test once ---");
const initialiser = once((msg) => msg);
console.log(initialiser("Premier appel : Système lancé !")); 
console.log(initialiser("Deuxième appel : Ne devrait pas s'afficher")); // Affiche le résultat du 1er appel

console.log("\n--- Test memoize ---");
const calculLent = (a, b) => {
    console.log("Exécution du calcul complexe...");
    return a + b;
};

const calculOptimise = memoize(calculLent);
console.log("Résultat 1 :", calculOptimise(10, 5)); // Exécute le calcul
console.log("Résultat 2 :", calculOptimise(10, 5)); // Utilise le cache
console.log("Résultat 3 :", calculOptimise(20, 30)); // Nouvel argument, exécute le calcul