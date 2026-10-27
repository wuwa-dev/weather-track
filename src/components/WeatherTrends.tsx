"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatChartTime } from "@/lib/weather";
import type { StationWeather } from "@/types/weather";

interface Props { weather: StationWeather | null; loading: boolean }

export default function WeatherTrends({ weather, loading }: Props) {
  const points = weather?.trends.map((point) => ({ ...point, label: formatChartTime(point.time) })) ?? [];
  return <section className="panel trends-panel" aria-labelledby="trends-title">
    <div className="panel-heading trends-heading"><div><div className="section-kicker">RECENT ACTIVITY</div><h2 id="trends-title">Weather trends</h2><p>Temperature and humidity over the last 24 hours</p></div><span className="period-pill">LAST 24 HOURS</span></div>
    <div className="chart-legend"><span><i className="legend-line temp" />Temperature <b>°C</b></span><span><i className="legend-line humidity" />Humidity <b>%</b></span></div>
    <div className="chart-wrap" role="img" aria-label={loading ? "Loading weather trends" : `Line chart showing temperature and humidity for the last 24 hours. ${weather?.source === "demo" ? "Demo data." : "Live API data."}`}>
      {loading || !weather ? <div className="chart-loading">Loading weather trends…</div> : <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={250}>
        <LineChart data={points} margin={{ top: 10, right: 4, bottom: 0, left: -19 }}>
          <CartesianGrid stroke="#e9eef5" strokeDasharray="3 5" vertical={false} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#8894a7", fontSize: 11 }} interval={3} dy={12} />
          <YAxis yAxisId="temp" axisLine={false} tickLine={false} tick={{ fill: "#8894a7", fontSize: 11 }} domain={["auto", "auto"]} tickFormatter={(value: number) => `${value}°`} />
          <YAxis yAxisId="humidity" orientation="right" axisLine={false} tickLine={false} tick={{ fill: "#8894a7", fontSize: 11 }} domain={[0, 100]} tickFormatter={(value: number) => `${value}%`} />
          <Tooltip contentStyle={{ border: "1px solid #e4ebf3", borderRadius: 12, boxShadow: "0 12px 32px rgba(16,42,78,.12)", fontSize: 12 }} labelFormatter={(label) => `${label} PHT`} formatter={(value, name) => [name === "Temperature" ? `${Number(value).toFixed(1)} °C` : `${Number(value).toFixed(0)} %`, name]} />
          <Line yAxisId="temp" type="monotone" dataKey="temperature" name="Temperature" stroke="#2e79dd" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
          <Line yAxisId="humidity" type="monotone" dataKey="humidity" name="Humidity" stroke="#32b4bd" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>}
    </div>
    <p className="chart-caption">Times shown in Philippine Time (PHT). {weather?.source === "demo" ? "Simulated weather trend." : "Source: Open-Meteo forecast API."}</p>
  </section>;
}
