"use client";

import { useEffect, useState } from "react";
import { STATIONS } from "@/data/stations";
import { getMockWeather } from "@/data/mockWeather";
import { fetchStationWeather } from "@/lib/weather";
import type { DataSource, StationWeather } from "@/types/weather";
import DashboardHeader from "./DashboardHeader";
import StationDetails from "./StationDetails";
import WeatherStations from "./WeatherStations";
import WeatherSummary from "./WeatherSummary";
import WeatherTrends from "./WeatherTrends";

export default function WeatherDashboard() {
  const [selectedId, setSelectedId] = useState(STATIONS[0].id);
  const [weather, setWeather] = useState<Record<string, StationWeather>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    void Promise.all(STATIONS.map((station) => fetchStationWeather(station, controller.signal)))
      .then((results) => {
        if (!controller.signal.aborted) {
          setWeather(Object.fromEntries(results.map((result) => [result.stationId, result])));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setWeather(Object.fromEntries(STATIONS.map((station) => [station.id, getMockWeather(station.id)])));
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  const selectedStation = STATIONS.find((station) => station.id === selectedId) ?? STATIONS[0];
  const selectedWeather = weather[selectedId] ?? null;
  const sources = Object.values(weather).map((item) => item.source);
  const source: DataSource | "mixed" | null = sources.length === 0 ? null : sources.every((item) => item === "live") ? "live" : sources.every((item) => item === "demo") ? "demo" : "mixed";

  return <div className="app-shell"><DashboardHeader source={source} updatedAt={selectedWeather?.observedAt ?? null} loading={loading} /><main className="main-content">
    <div className="section-heading"><div><div className="section-kicker">CURRENT CONDITIONS</div><h2>Overview <span>/ {selectedStation.location}</span></h2></div><span className="section-hint">Readings for selected location</span></div>
    <WeatherSummary weather={selectedWeather} loading={loading} />
    <div className="content-grid"><div className="main-column"><WeatherStations selectedId={selectedId} onSelect={setSelectedId} weather={weather} loading={loading} /><WeatherTrends weather={selectedWeather} loading={loading} /></div><StationDetails station={selectedStation} weather={selectedWeather} loading={loading} /></div>
  </main><footer className="footer"><span>WeatherTrack Lite · Philippine weather monitoring demo</span><span>Weather data by <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a></span></footer></div>;
}
