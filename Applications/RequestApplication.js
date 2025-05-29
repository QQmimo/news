export class RequestApplication {
    async get(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }
}