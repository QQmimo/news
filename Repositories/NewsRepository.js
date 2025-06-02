import { Data } from "../Domain";
import { Repository } from "../Repositories";

export class NewsRepository extends Repository {
    _select = 'select=id,title,body,userId';

    async getAllNews(limit = 30, page = 0) {
        return this._Request.get(`${Data.API_URL}/posts?${this._select}&limit=${limit}&skip=${page * limit}`);
    }

    async getNewsById(id) {
        return this._Request.get(`${Data.API_URL}/posts/${id}?${this._select}`);
    }
}