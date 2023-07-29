

async function FetchBuilder(path = "collections", body = {}) {
    const App_Url = `http://localhost:8080/api/${path}`;
    const fetchBody = {
        method: body?.method || "GET",
        body: JSON.stringify(body?.payload),
        mode: "cors",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
    }
    let result;
    try {
        result = await fetch(App_Url, fetchBody);
        result = await result?.json() || null;
        return result;
    } catch (error) {
        console.error(error?.message || `error while fetching ${App_Url}`);
        return result = null
    }
}

export { FetchBuilder };