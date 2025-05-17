const axios = require("axios");
const polyline = require("@mapbox/polyline");

const ORS_KEY = "5b3ce3597851110001cf62481c1bd72d5d3b49c690750b3912f549b8";
const ORS_URL =
  "https://api.openrouteservice.org/v2/directions/driving-car/json";
const PREDICT_URL = "http://localhost:8000/predict_batch";

/**
 * Renvoie un contexte de prédiction, qui regroupe differents
 * informations sur le moment o  la prédiction est faite
 * (heure, jour de la semaine, type de jour, meteo,
 * v nement, commune).
 *
 * @returns {Object} Un objet contenant les informations suivantes :
 *  - heure : l'heure actuelle
 *  - jour_semaine : le jour de la semaine actuel
 *  - type_jour : le type de jour (Ouvrable ou Weekend)
 *  - meteo : la m to actuelle
 *  - evenement : l' v nement actuel
 *  - commune : la commune actuelle
 */
function buildContext() {
  const now = new Date();
  const day = now.getDay();
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return {
    heure: now.getHours(),
    jour_semaine: days[day],
    type_jour: day === 0 || day === 6 ? "Weekend" : "Ouvrable",
    meteo: "Ensoleille",
    evenement: "Aucun",
    commune: "Abidjan",
  };
}

/**
 * Renvoie les routes les plus optimales entre deux points pour une 
 * voiture, en tenant compte des routes alternatives.
 * 
 * @param {Object} start Les coordonnes de depart (lat, lon)
 * @param {Object} end Les coordonn es d'arriv e (lat, lon)
 * @returns {Array} Un tableau de routes, chacune tant un tableau de 
 * coordonn es (lat, lon)
 */
async function fetchRoutes(start, end) {
  const body = {
    coordinates: [start, end],
    alternative_routes: {
      share_factor: 0.6,
      target_count: 3,
    },
  };

  const res = await axios.post(ORS_URL, body, {
    headers: { Authorization: ORS_KEY, "Content-Type": "application/json" },
  });

  return res.data.routes.map((route) => {
    const decoded = polyline.decode(route.geometry);
    return decoded.map(([lat, lon]) => ({ lat, lon }));
  });
}

/**
 * Construit un payload de requ te pour le modèle de pr diction 
 * en batch, en prenant en compte le contexte (jour, heure, etc) 
 * et en ajoutant une affluence al aatoire.
 * 
 * @param {Array} points Un tableau de points avec les coordonn es 
 * (lat, lon)
 * @param {Object} ctx Le contexte de la pr diction (jour, heure, etc)
 * @returns {Object} Le payload en format JSON
 */
function buildBatchPayload(points, ctx) {
  return {
    items: points.map((p) => ({
      ...ctx,
      affluence: Math.floor(Math.random() * 100) + 20,
      latitude: p.lat,
      longitude: p.lon,
    })),
  };
}

/**
 * Effectue une pr diction de taux de congestion en batch en 
 * appelant le modele de prediction avec le contexte et des 
 * points de passage.
 * 
 * @param {Array} points Un tableau de points avec les coordonnees 
 * (lat, lon)
 * @param {Object} ctx Le contexte de la pr diction (jour, heure, etc)
 * @returns {Object} Un objet avec les cl s `avg` (taux de congestion 
 * moyen) et `points` (nombre de points passes en entrée)
 */
async function predictCongestion(points, ctx) {
  const payload = buildBatchPayload(points, ctx);
  const res = await axios.post(PREDICT_URL, payload, {
    headers: { "Content-Type": "application/json" },
  });
  const values = res.data.taux_congestions;
  const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
  return { avg, points: points.length };
}

(async () => {
  const start = [-3.929233, 5.372594];
  const end = [-4.002481, 5.34863];
  const ctx = buildContext();

  try {
    const routes = fetchRoutes(start, end);

    // console.log("routes", routes);

    const results = [];
    for (let i = 0; i < routes.length; i++) {
      const { avg, points } = await predictCongestion(routes[i], ctx);
      results.push({ index: i + 1, avg, points });
      console.log(
        `🔹 Trajet ${
          i + 1
        } → ${points} points évalués, congestion moyenne : ${avg.toFixed(2)}`
      );
    }

    const best = results.reduce(
      (min, r) => (r.avg < min.avg ? r : min),
      results[0]
    );
    console.log(
      `\n✅ Meilleur itinéraire : Trajet ${
        best.index
      } avec une congestion moyenne de ${best.avg.toFixed(2)} / 5`
    );
  } catch (err) {
    console.error(
      "❌ Erreur :",
      err.response ? err.response.data : err.message
    );
  }
})();
