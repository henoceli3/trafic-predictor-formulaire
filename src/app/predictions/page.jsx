"use client";
import {
  eventOptions,
  weatherOptions,
  mockPlaces,
  constructionOptions,
} from "@/utils/constants";
import { Form, Select, Button, Card, List, Alert } from "antd";
import { useRoutes } from "@/hooks/useRoutes";
import { motion } from "framer-motion";

const PredictionsPage = () => {
  const { loading, onFinish, results, bestRoute } = useRoutes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-100 to-background-200 py-12">
      <div className="container max-w-[1400px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-text-100 mb-8 text-center">
            Prédiction du Trafic<span className="text-primary-200">.</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Colonne de gauche pour le formulaire */}
            <div className="space-y-8">
              <Card className="shadow-lg rounded-xl border-0 backdrop-blur-sm bg-background-100/90">
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item
                      label={
                        <span className="text-text-200 font-medium">
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
                        className="rounded-lg border-primary-100 !w-full h-[200px]"
                        size="large"
                        placeholder="Sélectionnez un point de départ"
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      >
                        {mockPlaces.map((place) => (
                          <Select.Option
                            key={place.id}
                            value={place.id}
                            label={place.name}
                          >
                            <div className="flex flex-col truncate">
                              <span className="font-medium text-text-100 truncate">
                                {place.name}
                              </span>
                              <span className="text-xs text-text-200 truncate">
                                {place.address}
                              </span>
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span className="text-text-200 font-medium">
                          Point d&apos;arrivée
                        </span>
                      }
                      name="end"
                      rules={[
                        { required: true, message: "Point d'arrivée requis" },
                      ]}
                    >
                      <Select
                        className="rounded-lg border-primary-100 !w-full"
                        size="large"
                        placeholder="Sélectionnez un point d'arrivée"
                        showSearch
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      >
                        {mockPlaces.map((place) => (
                          <Select.Option
                            key={place.id}
                            value={place.id}
                            label={place.name}
                          >
                            <div className="flex flex-col truncate">
                              <span className="font-medium text-text-100 truncate">
                                {place.name}
                              </span>
                              <span className="text-xs text-text-200 truncate">
                                {place.address}
                              </span>
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label={
                        <span className="text-text-200 font-medium">Météo</span>
                      }
                      name="meteo"
                      initialValue="ensoleille"
                    >
                      <Select
                        className="rounded-lg border-primary-100"
                        size="large"
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
                        <span className="text-text-200 font-medium">
                          Chantier
                        </span>
                      }
                      name="chantier"
                      initialValue="non"
                    >
                      <Select
                        className="rounded-lg border-primary-100"
                        size="large"
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
                        <span className="text-text-200 font-medium">
                          Événement
                        </span>
                      }
                      name="evenement"
                      initialValue="aucun"
                    >
                      <Select
                        className="rounded-lg border-primary-100"
                        size="large"
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
                      className="w-full md:w-auto bg-gradient-to-r from-primary-100 to-primary-200 hover:from-primary-200 hover:to-primary-300 rounded-lg h-12 font-medium text-base px-8"
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
                  <Card
                    title="Itinéraires proposés"
                    className="shadow-lg rounded-xl border-0 backdrop-blur-sm bg-background-100/90"
                  >
                    <List
                      dataSource={results}
                      renderItem={(item) => (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <List.Item
                            className={`
                              border rounded-xl p-4 mb-4 cursor-pointer
                              ${
                                item.index - 1 === bestRoute
                                  ? "ring-2 ring-primary-100 shadow-lg relative bg-background-200"
                                  : "hover:bg-background-100"
                              }
                              transition-all duration-200
                            `}
                          >
                            <div className="w-full p-4">
                              {item.index - 1 === bestRoute && (
                                <div className="absolute top-2 right-2 bg-primary-100 text-background-100 px-3 py-1 rounded-full text-sm">
                                  Meilleur itinéraire
                                </div>
                              )}
                              <div className="flex items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                  Itinéraire {item.index}
                                </h3>
                                <div
                                  className={`ml-4 px-3 py-1 rounded-full text-sm ${
                                    item.avg < 2
                                      ? "bg-primary-100 text-background-100"
                                      : item.avg < 3.5
                                      ? "bg-accent-200 text-background-100"
                                      : "bg-text-300 text-background-100"
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
                                <div className="bg-background-200 rounded-lg p-4">
                                  <p className="text-text-200 text-sm">
                                    Congestion
                                  </p>
                                  <p className="font-semibold text-text-100 text-xl">
                                    {item.avg.toFixed(1)}/5
                                  </p>
                                </div>
                                <div className="bg-background-200 rounded-lg p-4">
                                  <p className="text-text-200 text-sm">Durée</p>
                                  <p className="font-semibold text-text-100 text-xl">
                                    {Math.round(item.duration / 60)} min
                                  </p>
                                </div>
                                <div className="bg-background-200 rounded-lg p-4">
                                  <p className="text-text-200 text-sm">
                                    Distance
                                  </p>
                                  <p className="font-semibold text-text-100 text-xl">
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
                </motion.div>
              )}
            </div>

            {/* Colonne de droite pour la carte */}
            <div className="lg:sticky lg:top-8 h-[calc(100vh-6rem)]">
              <Card className="shadow-lg rounded-xl border-0 backdrop-blur-sm bg-background-100/90 h-full">
                <div className="w-full h-full bg-background-200 rounded-lg">
                  {/* Espace réservé pour la carte */}
                  <div className="w-full h-full flex items-center justify-center text-text-200">
                    Carte à implémenter
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PredictionsPage;
