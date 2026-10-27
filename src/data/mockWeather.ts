import type { StationWeather, WeatherPoint } from "@/types/weather";

const readings: Record<string, [number, number, number, number]> = {
  manila: [30.2, 72, 0.0, 12.4],
  bataan: [29.1, 77, 0.2, 10.8],
  clark: [31.0, 68, 0.0, 14.2],
  cebu: [29.6, 79, 0.4, 11.7],
  davao: [28.4, 82, 0.8, 9.6],
};

const temperaturePattern = [-2.1, -2.4, -2.7, -2.9, -3.1, -3.0, -2.5, -1.7, -0.7, 0.3, 1.2, 2.0, 2.5, 2.9, 3.1, 2.7, 2.0, 1.3, 0.7, 0.2, -0.3, -0.8, -1.3, -1.7];
const humidityPattern = [8, 9, 10, 11, 12, 12, 10, 7, 3, -2, -6, -9, -11, -13, -14, -12, -9, -5, -2, 1, 3, 5, 6, 7];

export function getMockWeather(stationId: string): StationWeather {
  const [temperature, humidity, precipitation, windSpeed] = readings[stationId] ?? readings.manila;
  const now = new Date();
  const currentHour = new Date(now);
  currentHour.setMinutes(0, 0, 0);
  const trends: WeatherPoint[] = temperaturePattern.map((offset, index) => {
    const time = new Date(currentHour.getTime() - (23 - index) * 3_600_000);
    return {
      time: time.toISOString(),
      temperature: Math.round((temperature + offset) * 10) / 10,
      humidity: Math.max(0, Math.min(100, humidity + humidityPattern[index])),
    };
  });

  return { stationId, temperature, humidity, precipitation, windSpeed, observedAt: now.toISOString(), trends, source: "demo" };
}
