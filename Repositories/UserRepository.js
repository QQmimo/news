import { Data } from "../Domain";
import { Repository } from "../Repositories";

export class UserRepository extends Repository {
    async getUsers() {
        return this._Request.get(`${Data.API_URL}/users`);
    }

    async getUserById(id) {
        return this._Request.get(`${Data.API_URL}/users/${id}`);
    }
}