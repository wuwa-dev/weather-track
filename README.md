# WeatherTrack Lite

A responsive weather monitoring dashboard for five Philippine locations. It shows current conditions and 24 hours of temperature and humidity trends. This is a demonstration project for GitHub and Vercel production and preview deployments.

The locations are geographic points, **not physical monitoring devices**. Station names and operational status badges are simulated.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Lucide React, Recharts, and the free non-commercial [Open-Meteo Weather API](https://open-meteo.com/en/docs). There is no database, API key, authentication, or paid service.

## Run locally

Prerequisite: Node.js and npm supported by the installed Next.js version.

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env.local` instead of `cp` if needed. Open [http://localhost:3000](http://localhost:3000). Reload the page to fetch fresh weather readings. Selecting a station updates the cards, details, and chart without another API call.

For a production build:

```bash
npm run build
npm run start
```

## Data and environment

The browser requests one Open-Meteo forecast response per location on page load. Each request includes current temperature, relative humidity, precipitation, wind speed, and hourly temperature and humidity. Chart times and reading times are displayed in Philippine Time. Open-Meteo provides modeled weather for coordinates; it does not report device health.

If a request fails or returns incomplete data, that location uses locally defined simulated weather readings and hourly trends. The dashboard labels the source as **Live API**, **Demo Data**, or **Live + Demo Data** when results are mixed. The selected station also shows its own source. The simulated Online, Offline, and Maintenance badges are independent of whether Open-Meteo succeeds.

Set `NEXT_PUBLIC_APP_ENV` to `Development`, `Preview`, or `Production`. It defaults to `Development` when missing. Copy `.env.example` to `.env.local` for local work; `.env.local` is ignored by Git. Public Next.js environment variables are embedded at build time, so configure the value in Vercel **before** building each deployment. The application version is defined once in [`src/config/app.ts`](src/config/app.ts).

## GitHub and Vercel deployment walkthrough

1. Create a GitHub repository, commit this project, and push the `main` branch. Example for a new repository: `git remote add origin <repository-url>`, then `git push -u origin main`.
2. In Vercel, import the GitHub repository as a Next.js project. Set `main` as the Production Branch.
3. In Project Settings → Environment Variables, set `NEXT_PUBLIC_APP_ENV=Production` for the **Production** environment. Save this before the production deployment or redeploy afterward.
4. Deploy `main`. Open the production URL and verify the dashboard shows `Production`, `v1.0.0`, and a weather data source. Live readings require the visitor's browser to reach Open-Meteo; otherwise the dashboard shows demo data.
5. Create a branch: `git switch -c feature/version-update`. Change `APP_VERSION` in `src/config/app.ts` to `v1.1.0` and commit the change.
6. Set `NEXT_PUBLIC_APP_ENV=Preview` for Vercel's **Preview** environment before pushing the branch. Push with `git push -u origin feature/version-update`.
7. Open the Vercel preview URL and verify `Preview` and `v1.1.0`. If the environment variable was configured after the preview build, redeploy the preview.
8. Merge the feature branch into `main` and push `main`. Vercel will create a new production deployment. Verify the production URL now shows `Production` and `v1.1.0`.

No repository or Vercel project is created automatically by this codebase; those steps require your own GitHub and Vercel accounts.
