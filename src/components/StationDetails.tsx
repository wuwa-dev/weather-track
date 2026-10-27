import { Clock3, Compass, MapPin, Radio } from "lucide-react";
import { formatReadingTime } from "@/lib/weather";
import type { Station, StationWeather } from "@/types/weather";

interface Props { station: Station; weather: StationWeather | null; loading: boolean }

export default function StationDetails({ station, weather, loading }: Props) {
  return <section className="panel details-panel" aria-labelledby="details-title">
    <div className="section-kicker">SELECTED LOCATION</div><h2 id="details-title">Station details</h2>
    <div className="detail-identity"><div className="detail-icon"><MapPin size={23} /></div><div><h3>{station.name}</h3><p>{station.location}, Philippines</p></div></div>
    <div className="detail-list">
      <div><span><Compass size={16} /> Coordinates</span><strong>{station.latitude.toFixed(2)}° N, {station.longitude.toFixed(2)}° E</strong></div>
      <div><span><Clock3 size={16} /> Latest reading</span><strong>{loading || !weather ? "Loading…" : `${formatReadingTime(weather.observedAt)} PHT`}</strong></div>
      <div><span><Radio size={16} /> Weather source</span><strong className={weather?.source === "demo" ? "demo-text" : "live-text"}>{loading || !weather ? "Connecting…" : weather.source === "live" ? "Live API" : "Demo Data"}</strong></div>
    </div>
    <div className="detail-summary">{loading || !weather ? "Loading current conditions…" : `Current conditions: ${weather.temperature.toFixed(1)}°C, ${weather.humidity.toFixed(0)}% humidity, ${weather.precipitation.toFixed(1)} mm precipitation, and ${weather.windSpeed.toFixed(1)} km/h wind.`}</div>
    {weather?.source === "demo" && <p className="fallback-note" role="status">Open-Meteo is unavailable for this location. Showing simulated readings and trends.</p>}
  </section>;
}
