export async function handler(event) {
    try {
        const params = event.queryStringParameters || {}; // Get query parameters
        if (!params) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing query parameters" }) };
        }
        const [title] = [params.t];
        if (!title) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing title parameter" }) };
        }
        const apiKey = process.env.OMDB_KEY; //api key from environment variable
        if (!apiKey) {
            return { statusCode: 500, body: JSON.stringify({ error: "Missing OMDB_KEY" }) };
        }
        //encodeURIComponent to ensure special characters are handled correctly
        const url = `http://www.omdbapi.com/` +
                    `?t=${encodeURIComponent(title)}` +
                    `&apikey=${apiKey}`;
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