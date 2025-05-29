import { Data } from "../Domain";
import { Repository } from "./Repository";

export class CommentRepository extends Repository {
    getComments(postId) {
        return this._Request.get(`${Data.API_URL}/comments?postId=${postId}`);
    }
}