import { Repository } from "./Repository";

export class CommentRepository extends Repository {
    getComments(postId) {
        return this._Request.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    }
}