import { useState } from "react";
import axios from "axios";
import polyline from "@mapbox/polyline";
import { mockPlaces } from "@/utils/constants";
import { message } from "antd";

const ORS_KEY = "5b3ce3597851110001cf62481c1bd72d5d3b49c690750b3912f549b8";
const ORS_URL =
  "https://api.openrouteservice.org/v2/directions/driving-car/json";
const PREDICT_URL = "http://localhost:8000/predict_batch";

export const useRoutes = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [bestRoute, setBestRoute] = useState<number | null>(null);

  const getCommuneFromPlace = (placeId: string) => {
    const place = mockPlaces.find((p) => p.id === placeId);
    if (!place) return "Abidjan";
    return place.commune;
  };

  const capitalize = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const buildContext = (values: any) => {
    const now = new Date();
    const day = now.getDay();
    return {
      date_timestamp: now.getTime(),
      heure_num: now.getHours(),
      type_jour: day === 0 || day === 6 ? "Weekend" : "Ouvrable",
      commune: getCommuneFromPlace(values.start),
      meteo: capitalize(values.meteo),
      evenement: capitalize(values.evenement),
      chantier: values.chantier?.toLowerCase(), // Pour s'assurer que c'est en minuscules
    };
  };

  /**
   * Renvoie les routes les plus optimales entre deux points pour une
   * voiture, en tenant compte des routes alternatives.
   *
   * @param {Object} start Les coordonnes de depart (lat, lon)
   * @param {Object} end Les coordonn es d'arriv e (lat, lon)
   * @returns {Array} Un tableau de routes, chacune tant un tableau de
   * coordonn es (lat, lon)
   */
  async function fetchRoutes(start: any, end: any) {
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

    return res.data.routes.map((route: any) => {
      const decoded = polyline.decode(route.geometry);
      return {
        points: decoded.map(([lat, lon]) => ({ lat, lon })),
        distance: route.summary.distance,
        duration: route.summary.duration,
      };
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
  function buildBatchPayload(points: any, ctx: any) {
    return {
      items: points.map((p: any) => ({
        ...ctx,
        affluence: Math.floor(Math.random() * 100) + 20,
        // affluence: 0,
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
  async function predictCongestion(points: any, ctx: any) {
    const payload = buildBatchPayload(points, ctx);
    const res = await axios.post(PREDICT_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });
    const values = res.data.taux_congestions;
    const avg =
      values.reduce((sum: any, val: any) => sum + val, 0) / values.length;
    return { avg, points: points.length };
  }

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const startPlace = mockPlaces.find((p) => p.id === values.start);
      const endPlace = mockPlaces.find((p) => p.id === values.end);

      if (!startPlace || !endPlace) {
        message.error(
          "Veuillez sélectionner des points de départ et d'arrivée valides."
        );
        return;
      }

      const start = [startPlace.coordinates.lng, startPlace.coordinates.lat];
      const end = [endPlace.coordinates.lng, endPlace.coordinates.lat];
      const ctx = buildContext(values);

      if (!start || !end) {
        message.error(
          "Veuillez sélectionner des points de départ et d'arrivée valides."
        );
        return;
      }

      const routes = await fetchRoutes(start, end);
      console.log("Routes:", routes);

      const results = [];
      for (let i = 0; i < routes.length; i++) {
        const { avg, points } = await predictCongestion(routes[i].points, ctx);
        results.push({
          index: i + 1,
          avg,
          points,
          distance: routes[i].distance,
          duration: routes[i].duration,
        });
        console.log(
          `🔹 Trajet ${
            i + 1
          } → ${points} points évalués, congestion moyenne : ${avg.toFixed(
            2
          )}, distance : ${routes[i].distance.toFixed(2)} m, durée : ${routes[
            i
          ].duration.toFixed(2)} s`
        );
      }

      const best = results.reduce(
        (min, r) => (r.avg < min.avg ? r : min),
        results[0]
      );

      setBestRoute(best.index - 1);
      setResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchRoutes,
    predictCongestion,
    buildBatchPayload,
    buildContext,
    onFinish,
    setLoading,
    bestRoute,
    results,
  };
};
