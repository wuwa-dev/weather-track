import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WeatherTrack Lite | Weather Monitoring Dashboard",
  description: "A live weather dashboard for five Philippine locations, powered by Open-Meteo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
