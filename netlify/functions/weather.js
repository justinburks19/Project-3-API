/* eslint-env node */

// GET /.netlify/functions/weather?lat=40.7&lon=-74.0&units=imperial
exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    const lat   = params.lat;
    const lon   = params.lon;
    const units = params.units || "imperial";

    if (!lat || !lon) {
      return { statusCode: 400, body: "Missing lat or lon" };
    }

    const apiKey = process.env.OPENWEATHER_KEY; // set on the site (server-side)
    if (!apiKey) {
      return { statusCode: 500, body: "Missing OPENWEATHER_KEY" };
    }

    const url = `https://api.openweathermap.org/data/2.5/weather` +
                `?lat=${encodeURIComponent(lat)}` +
                `&lon=${encodeURIComponent(lon)}` +
                `&units=${encodeURIComponent(units)}` +
                `&appid=${apiKey}`;

    const resp = await fetch(url);
    const text = await resp.text(); // pass JSON straight through

    return {
      statusCode: resp.status,
      headers: {
        "Content-Type": "application/json",
        // optional caching; safe to remove
        "Cache-Control": "public, max-age=60"
      },
      body: text
    };
  } catch (err) {
    return { statusCode: 500, body: "Server error: " + err.message };
  }
};