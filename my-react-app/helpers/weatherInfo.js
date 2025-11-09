import { useEffect } from "react";
import { useApi } from "../Context/ApiContext.jsx";


export function WeatherInfo(x, y, watch) {
    const { info, isLoading, error, fetchData } = useApi();
      useEffect(() => {
        x || y ? null : console.log("Waiting for coordinates...");
        const url = `/.netlify/functions/weather?lat=${x}&lon=${y}&units=imperial`; // URL for the Netlify function
        fetchData(url);

      }, [watch]); // run once when watch changes


      // Extract temperature and description from the fetched info
      const name = info?.name ?? "N/A"; // Location name
      const temp = info?.main?.temp ?? "N/A"; // Temperature in Fahrenheit
      const description = info?.weather?.[0]?.description ?? "N/A"; // Weather condition description
      const pressure = info?.main?.pressure ?? "N/A"; // Atmospheric pressure
      const humidity = info?.main?.humidity ?? "N/A"; // Humidity percentage
      const seaLevel = info?.main?.sea_level ?? "N/A"; // Sea level pressure
      const windSpeed = info?.wind?.speed ?? "N/A"; // Wind speed
      const windDeg = info?.wind?.deg ?? "N/A"; // Wind direction in degrees
      const cloudiness = info?.clouds?.all ?? "N/A"; // Cloudiness percentage
      const timezone = info?.timezone ?? "N/A"; // Timezone offset in seconds

    return [temp, description, pressure, humidity, seaLevel, windSpeed, windDeg, cloudiness, isLoading, error, name, timezone];
  }