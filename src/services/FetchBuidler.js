import { alertMessage } from "../helpers/alerts";

class CreateFetch {
    token = sessionStorage.getItem("accessToken") || "";
    App_Url = `http://localhost:8080/api/`;
    setToken(value) {
        this.token = value;
        sessionStorage.setItem("accessToken", this.token);
    }

    async fetch(path = null, body = {}) {
        if (!path) {
            alertMessage('Please provide a path to request');
        }
        const fetchBody = {
            method: body?.method || "GET",
            body: JSON.stringify(body?.payload),
            mode: "cors",
            cache: "no-cache",
            headers: { "Content-Type": "application/json", "auth": this.token },
        }
        let result;
        try {
            result = await fetch(`${this.App_Url}${path}`, fetchBody);
            result = await result?.json() || null;
            return result;
        } catch (error) {
            let msg = error?.message || `error while fetching ${this.App_Url}`
            console.error(msg);
            return result = msg;
        }
    }
}

export const createRequest = new CreateFetch();
