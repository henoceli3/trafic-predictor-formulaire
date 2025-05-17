import {
  SunOutlined,
  CloudOutlined,
  ThunderboltOutlined,
  CloseCircleOutlined,
  PlayCircleOutlined,
  CustomerServiceOutlined,
  TeamOutlined,
  ToolOutlined,
} from "@ant-design/icons";

export const weatherOptions = [
  { value: "Ensoleille", label: "Ensoleillé", icon: <SunOutlined /> },
  { value: "Pluie", label: "Pluie", icon: <CloudOutlined /> },
  { value: "Nuageux", label: "Nuageux", icon: <CloudOutlined /> },
  { value: "Orage", label: "Orage", icon: <ThunderboltOutlined /> },
];

export const eventOptions = [
  { value: "Aucun", label: "Aucun", icon: <CloseCircleOutlined /> },
  { value: "Match", label: "Match", icon: <PlayCircleOutlined /> },
  { value: "Concert", label: "Concert", icon: <CustomerServiceOutlined /> },
  { value: "Manifestation", label: "Manifestation", icon: <TeamOutlined /> },
];

export const constructionOptions = [
  { value: "Non", label: "Non", icon: <CloseCircleOutlined /> },
  { value: "Oui", label: "Oui", icon: <ToolOutlined /> },
];

export const mockPlaces = [
  {
    id: "place-1",
    name: "Plateau",
    address: "Le Plateau, Abidjan, Côte d'Ivoire",
    coordinates: { lat: 5.3234, lng: -4.0168 },
    commune: "Plateau",
  },
  {
    id: "place-2",
    name: "Aéroport Port Bouët",
    address: "Aéroport International FHB, Port Bouët, Abidjan",
    coordinates: { lat: 5.2561, lng: -3.9292 },
    commune: "Port Bouët",
  },
  {
    id: "place-3",
    name: "Cocody",
    address: "Cocody, Abidjan, Côte d'Ivoire",
    coordinates: { lat: 5.3601, lng: -3.9673 },
    commune: "Cocody",
  },
  {
    id: "place-4",
    name: "Marcory",
    address: "Marcory, Abidjan, Côte d'Ivoire",
    coordinates: { lat: 5.301, lng: -3.9796 },
    commune: "Marcory",
  },
  {
    id: "place-5",
    name: "Treichville",
    address: "Treichville, Abidjan, Côte d'Ivoire",
    coordinates: { lat: 5.2908, lng: -4.005 },
    commune: "Treichville",
  },
  {
    id: "place-6",
    name: "Adjamé",
    address: "Adjamé, Abidjan, Côte d'Ivoire",
    coordinates: { lat: 5.3552, lng: -4.0243 },
    commune: "Adjamé",
  },
  {
    id: "place-7",
    name: "Yopougon",
    address: "Yopougon, Abidjan, Côte d'Ivoire",
    coordinates: { lat: 5.3372, lng: -4.0857 },
    commune: "Yopougon",
  },
  {
    id: "place-8",
    name: "Abobo",
    address: "Abobo, Abidjan, Côte d'Ivoire",
    coordinates: { lat: 5.4305, lng: -4.0449 },
    commune: "Abobo",
  },
  {
    id: "place-9",
    name: "Port-Bouët",
    address: "Port-Bouët, Abidjan, Côte d'Ivoire",
    coordinates: { lat: 5.2478, lng: -3.9712 },
    commune: "Port-Bouët",
  },
  {
    id: "place-10",
    name: "Koumassi",
    address: "Koumassi, Abidjan, Côte d'Ivoire",
    coordinates: { lat: 5.2913, lng: -3.9541 },
    commune: "Koumassi",
  },
  {
    id: "place-11",
    name: "Bingerville",
    address: "Bingerville, Abidjan, Côte d'Ivoire",
    coordinates: { lat: 5.3504, lng: -3.8856 },
    commune: "Bingerville",
  },
  {
    id: "place-12",
    name: "Université Félix Houphouët-Boigny",
    address: "Université FHB, Cocody, Abidjan",
    coordinates: { lat: 5.3484, lng: -3.9996 },
    commune: "Cocody",
  },
  {
    id: "place-13",
    name: "Stade Félix Houphouët-Boigny",
    address: "Stade FHB, Plateau, Abidjan",
    coordinates: { lat: 5.3142, lng: -4.017 },
    commune: "Plateau",
  },
  {
    id: "place-14",
    name: "Centre Commercial Playce Marcory",
    address: "Playce Marcory, Boulevard VGE, Marcory",
    coordinates: { lat: 5.3013, lng: -3.9747 },
    commune: "Marcory",
  },
  {
    id: "place-15",
    name: "Hôtel Ivoire",
    address: "Hôtel Ivoire, Cocody, Abidjan",
    coordinates: { lat: 5.3319, lng: -4.0168 },
    commune: "Cocody",
  },
];
