import { ArrowUpRight, MapPin } from "lucide-react";
import { STATIONS } from "@/data/stations";
import type { StationWeather } from "@/types/weather";

interface Props { selectedId: string; onSelect: (id: string) => void; weather: Record<string, StationWeather>; loading: boolean }

export default function WeatherStations({ selectedId, onSelect, weather, loading }: Props) {
  return <section className="panel stations-panel" aria-labelledby="stations-title">
    <div className="panel-heading"><div><div className="section-kicker">YOUR NETWORK</div><h2 id="stations-title">Weather stations</h2><p>Choose a location to explore its conditions.</p></div><span className="count-pill">05 LOCATIONS</span></div>
    <div className="table-wrap"><table><thead><tr><th>STATION</th><th>LOCATION</th><th>TEMPERATURE</th><th>HUMIDITY</th><th>STATUS</th><th><span className="sr-only">Select</span></th></tr></thead><tbody>
      {STATIONS.map((station) => {
        const reading = weather[station.id];
        return <tr key={station.id} className={selectedId === station.id ? "selected-row" : ""}>
          <td><button type="button" className="station-select" onClick={() => onSelect(station.id)} aria-pressed={selectedId === station.id} aria-label={`Select ${station.name}`}><span className="station-avatar"><MapPin size={17} /></span><span>{station.name}</span></button></td>
          <td className="location-cell">{station.location}</td>
          <td className="value-cell">{loading || !reading ? "—" : `${reading.temperature.toFixed(1)}°C`}</td>
          <td className="value-cell">{loading || !reading ? "—" : `${reading.humidity.toFixed(0)}%`}</td>
          <td><span className={`status-badge ${station.status.toLowerCase()}`}><span />{station.status}</span></td>
          <td><button type="button" className="row-arrow" onClick={() => onSelect(station.id)} aria-label={`View ${station.name}`}><ArrowUpRight size={16} /></button></td>
        </tr>;
      })}
    </tbody></table></div>
    <div className="panel-note"><span className="note-icon">i</span> Station names and operational statuses are simulated for this demo. Weather readings represent geographic locations.</div>
  </section>;
}
