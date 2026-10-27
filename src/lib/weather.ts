import { getMockWeather } from "@/data/mockWeather";
import type { Station, StationWeather, WeatherPoint } from "@/types/weather";

interface OpenMeteoResponse {
  current?: {
    time?: string;
    temperature_2m?: number;
    relative_humidity_2m?: number;
    precipitation?: number;
    wind_speed_10m?: number;
  };
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
    relative_humidity_2m?: number[];
  };
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function transformWeather(stationId: string, data: OpenMeteoResponse): StationWeather {
  const current = data.current;
  const hourly = data.hourly;
  if (!current?.time || !isNumber(current.temperature_2m) || !isNumber(current.relative_humidity_2m) ||
      !isNumber(current.precipitation) || !isNumber(current.wind_speed_10m) ||
      !hourly?.time || !hourly.temperature_2m || !hourly.relative_humidity_2m) {
    throw new Error("Incomplete weather response");
  }

  const trends: WeatherPoint[] = hourly.time.map((time, index) => ({
    time,
    temperature: hourly.temperature_2m![index],
    humidity: hourly.relative_humidity_2m![index],
  })).filter((point) => typeof point.time === "string" && isNumber(point.temperature) && isNumber(point.humidity)).slice(-24);

  if (trends.length < 2) throw new Error("Hourly weather data unavailable");

  return {
    stationId,
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    precipitation: current.precipitation,
    windSpeed: current.wind_speed_10m,
    observedAt: current.time,
    trends,
    source: "live",
  };
}

export async function fetchStationWeather(station: Station, signal?: AbortSignal): Promise<StationWeather> {
  const params = new URLSearchParams({
    latitude: String(station.latitude),
    longitude: String(station.longitude),
    current: "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m",
    hourly: "temperature_2m,relative_humidity_2m",
    past_hours: "24",
    forecast_hours: "1",
    timezone: "Asia/Manila",
  });

  const requestController = new AbortController();
  const abortRequest = () => requestController.abort();
  const timeout = setTimeout(abortRequest, 10_000);
  signal?.addEventListener("abort", abortRequest, { once: true });
  if (signal?.aborted) requestController.abort();

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal: requestController.signal, cache: "no-store" });
    if (!response.ok) throw new Error(`Weather API returned ${response.status}`);
    return transformWeather(station.id, await response.json() as OpenMeteoResponse);
  } catch (error) {
    if (signal?.aborted) throw error;
    return getMockWeather(station.id);
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abortRequest);
  }
}

export function formatReadingTime(value: string): string {
  // Open-Meteo returns local Philippine time without an offset.
  const date = new Date(value.endsWith("Z") || /[+-]\d\d:\d\d$/.test(value) ? value : `${value}+08:00`);
  if (Number.isNaN(date.getTime())) return "Time unavailable";
  return new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true,
  }).format(date);
}

export function formatChartTime(value: string): string {
  const date = new Date(value.endsWith("Z") || /[+-]\d\d:\d\d$/.test(value) ? value : `${value}+08:00`);
  if (Number.isNaN(date.getTime())) return value.slice(11, 16);
  return new Intl.DateTimeFormat("en-PH", { timeZone: "Asia/Manila", hour: "numeric", hour12: true }).format(date);
}
