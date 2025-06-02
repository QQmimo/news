import { Data } from "../Domain";
import { Repository } from "../Repositories";

export class UserRepository extends Repository {
    _select = 'select=id,firstName,lastName';

    async getUsers() {
        return this._Request.get(`${Data.API_URL}/users?${this._select}`);
    }

    async getUserById(id) {
        return this._Request.get(`${Data.API_URL}/users/${id}?${this._select}`);
    }
}