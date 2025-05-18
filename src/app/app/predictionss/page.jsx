"use client";
import {
  eventOptions,
  weatherOptions,
  mockPlaces,
  constructionOptions,
} from "@/utils/constants";
import { Form, Select, Button, Card, List } from "antd";
import { useRoutes } from "@/hooks/useRoutes";
import { motion } from "framer-motion";
import { useState } from "react";
import RouteMap from "@/components/RouteMap";

const PredictionsPage = () => {
  const { loading, onFinish, results, routes } = useRoutes();
  const [selectedRoute, setSelectedRoute] = useState(null);
  const bestRoute =
    results.length > 0
      ? results.reduce((min, r) => (r.avg < min.avg ? r : min), results[0])
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 ">
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Prédiction du Trafic<span className="text-blue-500">.</span>
          </h1>

          <Card className="shadow-lg rounded-xl border-0 mb-8 backdrop-blur-sm bg-white/90">
            <Form layout="vertical" onFinish={onFinish} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      Point de départ
                    </span>
                  }
                  name="start"
                  rules={[
                    { required: true, message: "Point de départ requis" },
                  ]}
                >
                  <Select
                    showSearch
                    className="rounded-lg"
                    size="large"
                    placeholder="Sélectionnez un point de départ"
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {mockPlaces.map((place) => (
                      <Select.Option
                        key={place.id}
                        value={place.id}
                        label={place.name}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{place.name}</span>
                          <span className="text-xs text-gray-500">
                            {place.address}
                          </span>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      Point d&apos;arrivée
                    </span>
                  }
                  name="end"
                  rules={[
                    { required: true, message: "Point d'arrivée requis" },
                  ]}
                >
                  <Select
                    className="rounded-lg"
                    size="large"
                    placeholder="Sélectionnez un point d'arrivée"
                    showSearch
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {mockPlaces.map((place) => (
                      <Select.Option
                        key={place.id}
                        value={place.id}
                        label={place.name}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{place.name}</span>
                          <span className="text-xs text-gray-500">
                            {place.address}
                          </span>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">Météo</span>
                  }
                  name="meteo"
                  initialValue="ensoleille"
                >
                  <Select
                    className="rounded-lg"
                    options={weatherOptions.map((opt) => ({
                      ...opt,
                      label: (
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{opt.icon}</span>
                          <span>{opt.label}</span>
                        </div>
                      ),
                    }))}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">Chantier</span>
                  }
                  name="chantier"
                  initialValue="non"
                >
                  <Select
                    className="rounded-lg"
                    options={constructionOptions.map((opt) => ({
                      ...opt,
                      label: (
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{opt.icon}</span>
                          <span>{opt.label}</span>
                        </div>
                      ),
                    }))}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">Événement</span>
                  }
                  name="evenement"
                  initialValue="aucun"
                >
                  <Select
                    className="rounded-lg"
                    options={eventOptions.map((opt) => ({
                      ...opt,
                      label: (
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{opt.icon}</span>
                          <span>{opt.label}</span>
                        </div>
                      ),
                    }))}
                  />
                </Form.Item>
              </div>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg h-12 font-medium text-base px-8"
                >
                  Calculer les itinéraires
                </Button>
              </Form.Item>
            </Form>
          </Card>

          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card
                  title="Carte des itinéraires"
                  className="shadow-lg rounded-xl border-0 backdrop-blur-sm bg-white/90"
                >
                  <RouteMap routes={routes} selectedRoute={selectedRoute} />
                </Card>

                <Card
                  title="Itinéraires proposés"
                  className="shadow-lg rounded-xl border-0 backdrop-blur-sm bg-white/90"
                >
                  <List
                    dataSource={results}
                    renderItem={(item) => (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedRoute(item)}
                      >
                        <List.Item
                          className={`border rounded-xl p-4 mb-4 transition-colors ${
                            item.avg === bestRoute?.avg
                              ? "border-2 border-blue-500 bg-blue-50 hover:bg-blue-100"
                              : "hover:bg-blue-50"
                          }`}
                        >
                          <div className="w-full p-4 ">
                            <div className="flex items-center mb-4">
                              <h3 className="text-lg font-semibold text-gray-800">
                                Itinéraire {item.index}
                                {item.avg === bestRoute?.avg && (
                                  <span className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
                                    Meilleur trajet
                                  </span>
                                )}
                              </h3>
                              <div
                                className={`ml-4 px-3 py-1 rounded-full text-sm ${
                                  item.avg < 2
                                    ? "bg-green-100 text-green-700"
                                    : item.avg < 3.5
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {item.avg < 2
                                  ? "Fluide"
                                  : item.avg < 3.5
                                  ? "Modéré"
                                  : "Congestionné"}
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-500 text-sm">
                                  Congestion
                                </p>
                                <p className="font-semibold text-xl">
                                  {item.avg.toFixed(1)}/5
                                </p>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-500 text-sm">Durée</p>
                                <p className="font-semibold text-xl">
                                  {Math.round(item.duration / 60)} min
                                </p>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-500 text-sm">
                                  Distance
                                </p>
                                <p className="font-semibold text-xl">
                                  {(item.distance / 1000).toFixed(1)} km
                                </p>
                              </div>
                            </div>
                          </div>
                        </List.Item>
                      </motion.div>
                    )}
                  />
                </Card>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PredictionsPage;
