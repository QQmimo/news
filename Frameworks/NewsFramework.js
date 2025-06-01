import { Data } from "../Domain";
import { CommentRepository, NewsRepository, UserRepository } from "../Repositories";

export class NewsFramework {
    _NewsRepository = new NewsRepository();
    _UserRepository = new UserRepository();
    _CommentRepository = new CommentRepository();

    _createPost(post, author) {
        return {
            Post: post,
            Author: author,
            ImageUrl: `${Data.API_IMAGE_URL}/200x200?text=${post.title.replace(/ /g, '+')}`
        }
    }

    async getNews() {
        const allNews = await this._NewsRepository.getAllNews() ?? [];
        const allUsers = await this._UserRepository.getUsers() ?? [];

        const result = [];
        allNews.forEach(post => {
            const newsPost = this._createPost(post, allUsers.find(user => user.id === post.userId));
            result.push(newsPost);
        });

        return result;
    }

    async getNewsById(id) {
        const post = await this._NewsRepository.getNewsById(id);
        const author = await this._UserRepository.getUserById(post.userId);

        return this._createPost(post, author);
    }

    async getNewsComments(postId) {
        return await this._CommentRepository.getComments(postId);
    }
}