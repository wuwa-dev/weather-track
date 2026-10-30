import { Activity, CloudSun, MapPin } from "lucide-react";
import { APP_ENV, APP_VERSION } from "@/config/app";
import type { DataSource } from "@/types/weather";
import { formatReadingTime } from "@/lib/weather";

interface Props {
  source: DataSource | "mixed" | null;
  updatedAt: string | null;
  loading: boolean;
}

export default function DashboardHeader({ source, updatedAt, loading }: Props) {
  const sourceLabel = source === "live" ? "Live API" : source === "demo" ? "Demo Data" : source === "mixed" ? "Live + Demo Data" : "Connecting";
  return (
    <>
      <header className="topbar">
        <div className="brand"><div className="brand-icon"><CloudSun size={23} strokeWidth={2.1} /></div><div><div className="brand-name">WeatherTrack <span>Lite</span></div><div className="brand-subtitle">Weather Monitoring Dashboard</div></div></div>
        <div className="topbar-right"><span className="environment-pill"><span className="environment-dot" />{APP_ENV}</span><span className="version-pill">{APP_VERSION}</span></div>
      </header>
      <div className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> PHILIPPINES WEATHER NETWORK</div>
          <h1>Weather Overview<span>.</span></h1>
          <p>Track current conditions and recent trends across five Philippine locations.</p>
          <div className="hero-meta"><span><MapPin size={15} /> 5 locations monitored</span><span className="meta-divider" /><span><Activity size={15} /> Updated on page load</span></div>
        </div>
        <div className="hero-status" aria-live="polite"><div className="hero-status-label">DATA STATUS</div><div className="hero-status-main"><span className={`source-dot ${source ?? "pending"}`} />{loading ? "Fetching weather" : sourceLabel}</div><div className="hero-status-time">{updatedAt ? `Last updated ${formatReadingTime(updatedAt)} PHT` : "Waiting for latest readings"}</div></div>
      </div>
    </>
  );
}
