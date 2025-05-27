import { Repository } from "../Repositories";

export class UserRepository extends Repository {
    async getUsers() {
        return this._Request.get(`https://jsonplaceholder.typicode.com/users`);
    }

    async getUserById(id) {
        return this._Request.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    }
}