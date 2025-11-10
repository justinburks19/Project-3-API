export async function handler(event) {
    const param = event.queryStringParameters || {};
    const [title] = [param.t]; // Get title from query parameters
    !title ? j(400, { error: "title required" }) : null;
    const key = process.env.OMDB_KEY;
    !key ? j(500, { error: "Missing OMDB_KEY" }) : null;
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${key}`;

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
