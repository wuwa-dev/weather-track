import type { Station } from "@/types/weather";

// Names and operational states are for demonstration; coordinates represent cities.
export const STATIONS: Station[] = [
  { id: "manila", name: "Manila Central Station", location: "Manila", latitude: 14.60, longitude: 120.98, status: "Online" },
  { id: "bataan", name: "Bataan Monitoring Station", location: "Balanga, Bataan", latitude: 14.68, longitude: 120.54, status: "Online" },
  { id: "clark", name: "Clark Weather Station", location: "Angeles, Pampanga", latitude: 15.15, longitude: 120.59, status: "Maintenance" },
  { id: "cebu", name: "Cebu Monitoring Station", location: "Cebu City", latitude: 10.32, longitude: 123.90, status: "Online" },
  { id: "davao", name: "Davao Weather Station", location: "Davao City", latitude: 7.07, longitude: 125.61, status: "Offline" },
];
