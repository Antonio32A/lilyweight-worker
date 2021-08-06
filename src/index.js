import lilyweight from "lilyweight";

const handleRequest = async request => {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");
    const player = url.pathname.substr(1);
    const returnUsername = url.searchParams.get("returnUsername") === "true" ?? false;

    if (!key) return respond({ success: false, error: "No Hypixel API key provided." });
    if (!player) return respond({ success: false, error: "No player provided." });

    const lily = lilyweight(key);
    try {
        return respond({ success: true, data: await lily.getWeight(player, returnUsername) });
    } catch {
        return respond({ success: false, error: "Invalid API key or player provided." });
    }
};

const respond = data => new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });

addEventListener("fetch", event => event.respondWith(handleRequest(event.request)));
