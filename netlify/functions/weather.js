export async function handler(event) {
  try {
    const qs = event.queryStringParameters || {};
    const { lat, lon } = qs;
    const units = qs.units || "imperial";

    if (!lat || !lon) {
      return json(400, { error: "Missing lat or lon" });
    }

    const key = process.env.OPENWEATHER_KEY;
    if (!key) {
      // Do not leak the key; just say it's missing
      return json(500, { error: "Missing OPENWEATHER_KEY env var" });
    }

    // Build URL
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.search = new URLSearchParams({ lat, lon, units, appid: key }).toString();

    // Add a timeout so network problems don't hang silently
    const ac = new AbortController();
    const timeout = setTimeout(() => ac.abort(), 10_000);

    let resp;
    try {
      resp = await fetch(url, { headers: { Accept: "application/json" }, signal: ac.signal });
    } catch (e) {
      clearTimeout(timeout);
      // Network/DNS/TLS errors end up here
      console.error("fetch() error:", e?.message || e, "node", process.version);
      return json(502, { error: "Upstream fetch failed", message: String(e?.message || e) });
    }
    clearTimeout(timeout);

    const text = await resp.text();
    const ctype = resp.headers.get("content-type") || "";

    // If OpenWeather returns JSON with an error (e.g., 401/404), forward it as-is.
    //  - 401 with body like: {"cod":401,"message":"Invalid API key..."}
    if (ctype.includes("application/json")) {
      return {
        statusCode: resp.status,
        headers: { "Content-Type": "application/json" },
        body: text,
      };
    }

    // Non-JSON from upstream (rare) — log and return plain text
    console.error("OpenWeather non-JSON:", resp.status, text.slice(0, 200));
    return {
      statusCode: resp.status,
      headers: { "Content-Type": "text/plain" },
      body: text,
    };
  } catch (e) {
    console.error("weather function crashed:", e?.message || e, "node", process.version);
    return json(500, { error: "weather function crashed", message: String(e?.message || e) });
  }
}

function json(statusCode, obj) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(obj),
  };
}
