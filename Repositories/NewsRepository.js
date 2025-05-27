import { Repository } from "../Repositories";

export class NewsRepository extends Repository {
    async getNews() {
        return this._Request.get(`https://jsonplaceholder.typicode.com/posts`);
    }

    async getNewsById(id) {
        return this._Request.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    }
}