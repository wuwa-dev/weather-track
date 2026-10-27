import { CloudRain, Droplets, Thermometer, Wind } from "lucide-react";
import type { StationWeather } from "@/types/weather";

interface Props { weather: StationWeather | null; loading: boolean }

const cards = [
  { key: "temperature", label: "Temperature", unit: "°C", icon: Thermometer, tone: "blue" },
  { key: "humidity", label: "Humidity", unit: "%", icon: Droplets, tone: "cyan" },
  { key: "precipitation", label: "Precipitation", unit: "mm", icon: CloudRain, tone: "indigo" },
  { key: "windSpeed", label: "Wind speed", unit: "km/h", icon: Wind, tone: "teal" },
] as const;

export default function WeatherSummary({ weather, loading }: Props) {
  return <section aria-label="Current weather metrics" className="summary-grid">
    {cards.map(({ key, label, unit, icon: Icon, tone }) => <article className="metric-card" key={key}>
      <div className="metric-top"><span className={`metric-icon ${tone}`}><Icon size={20} strokeWidth={2} /></span><span className="metric-label">{label}</span></div>
      <div className="metric-reading">{loading || !weather ? <span className="metric-skeleton" /> : <><span>{weather[key].toFixed(key === "humidity" ? 0 : 1)}</span><span className="metric-unit">{unit}</span></>}</div>
      <div className="metric-footer">Current reading</div>
    </article>)}
  </section>;
}
