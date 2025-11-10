export async function handler(event) {
  const param = event.queryStringParameters || {};
const [lat, lon] = [param.lat, param.lon]; // Get lat and lon from query parameters
  const qs = param || {}; // Get query parameters
  const units = qs.units || "imperial";
  !lat || !lon ? j(400, { error: "lat and lon required" }) : null;
  
  const key = process.env.OPENWEATHER_KEY;
  !key ? j(500, { error: "Missing OPENWEATHER_KEY" }) : null;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&units=${encodeURIComponent(units)}&appid=${key}`;

  const response = await fetch(url);
  const body = await response.text(); // keep as text; avoids double parsing
  return {
    statusCode: response.status,
    headers: { "Content-Type": response.headers.get("content-type") || "application/json" },
    body
  };
}

function j(statusCode, obj) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(obj)
  };
}
