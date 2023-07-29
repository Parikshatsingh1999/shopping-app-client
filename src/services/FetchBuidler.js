

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
        if (result.ok) {
            result = await result.json();
        } else {
            result = null;
        }
    } catch (error) {
        console.error(error?.message || `error while fetching ${App_Url}`);
        result = null
    }
    return result
}

export { FetchBuilder };