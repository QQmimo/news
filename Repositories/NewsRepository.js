import { Data } from "../Domain";
import { Repository } from "../Repositories";

export class NewsRepository extends Repository {
    async getAllNews() {
        return this._Request.get(`${Data.API_URL}/posts`);
    }

    async getNewsById(id) {
        return this._Request.get(`${Data.API_URL}/posts/${id}`);
    }
}