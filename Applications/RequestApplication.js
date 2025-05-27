export class RequestApplication {
    async get(url) {
        const response = await fetch(url,
            {
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            });
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }
}