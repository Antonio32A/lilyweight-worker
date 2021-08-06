import lilyweight from "lilyweight";

const handleRequest = async request => {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");
    const player = url.pathname.substr(1);
    const returnUsername = url.searchParams.get("returnUsername") === "true" ?? false;

    if (!key) return respond(400, { success: false, error: "No Hypixel API key provided." });
    if (!player) return respond(400, { success: false, error: "No player provided." });

    const lily = lilyweight(key);
    try {
        return respond(200, { success: true, data: await lily.getWeight(player, returnUsername) });
    } catch {
        return respond(400, { success: false, error: "Invalid API key or player provided." });
    }
};

const respond = (code, data) =>
    new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" }, status: code });

addEventListener("fetch", event => event.respondWith(handleRequest(event.request)));
