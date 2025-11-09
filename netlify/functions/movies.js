export async function handler(event) {
    try {
        const params = event.queryStringParameters || {}; // Get query parameters
        if (!params) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing query parameters" }) };
        }
        const search = params.search; // Get search term
        if (!search) {
            return { statusCode: 400, body: JSON.stringify({ error: "Missing search parameter" }) };
        }

        const apiKey = process.env.OMDB_KEY; // Get API key from environment variable
        if (!apiKey) { // Check if API key is missing
            return { statusCode: 500, body: JSON.stringify({ error: "Missing OMDB_KEY" }) };
        }

        const url = `http://www.omdbapi.com/?t=${encodeURIComponent(search)}&apikey=${apiKey}`; // Construct URL with encoded search term
        const resp = await fetch(url);
        const body = await resp.text();

        return {
            statusCode: resp.status,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
    }
}