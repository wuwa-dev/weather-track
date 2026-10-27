export type StationStatus = "Online" | "Offline" | "Maintenance";
export type DataSource = "live" | "demo";

export interface Station {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: StationStatus;
}

export interface WeatherPoint {
  time: string;
  temperature: number;
  humidity: number;
}

export interface StationWeather {
  stationId: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  observedAt: string;
  trends: WeatherPoint[];
  source: DataSource;
}
