// netlify/functions/weather.js
export async function handler(event) {
  try {
    const params = event.queryStringParameters || {}; // Get query parameters
    if (!params) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing query parameters" }) };
    }
    const lat = params.lat; // Get latitude
    const lon = params.lon; // Get longitude
    const units = params.units || "imperial"; // Default to imperial if not provided

    if (!lat || !lon) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing lat or lon" }) }; 
    }

    const apiKey = process.env.OPENWEATHER_KEY; //api key from environment variable
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: "Missing OPENWEATHER_KEY" }) };
    }
    //encodeURIComponent to ensure special characters are handled correctly
    const url = `https://api.openweathermap.org/data/2.5/weather` +
                `?lat=${encodeURIComponent(lat)}` +
                `&lon=${encodeURIComponent(lon)}` +
                `&units=${encodeURIComponent(units)}` +
                `&appid=${apiKey}`;

    const resp = await fetch(url);
    const body = await resp.text();

    return {
      statusCode: resp.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // "Cache-Control": "public, max-age=60"  // optional
      },
      body
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
}