import { Data } from "../Domain";
import { CommentRepository, NewsRepository, UserRepository } from "../Repositories";

export class NewsFramework {
    _NewsRepository = new NewsRepository();
    _UserRepository = new UserRepository();
    _CommentRepository = new CommentRepository();

    _createPost(post, author) {
        return {
            Post: post,
            Author: { name: `${author.firstName} ${author.lastName}` },
            ImageUrl: `${Data.API_IMAGE_URL}/${post.title.replace(/ /g, '+')}/200`
        }
    }

    async getNews() {
        const allNews = await this._NewsRepository.getAllNews(32) ?? { posts: [] };

        const result = [];
        for (let post of allNews.posts) {
            const author = await this._UserRepository.getUserById(post.userId);
            const newsPost = this._createPost(post, author);
            result.push(newsPost);
        }

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