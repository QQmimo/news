import { NewsRepository, UserRepository } from "../Repositories";

export class NewsFramework {
    _NewsRepository = new NewsRepository();
    _UserRepository = new UserRepository();

    _convert(post, author) {
        return {
            Post: post,
            Author: author,
            ImageUrl: `https://placehold.co/400x400?text=${post.title}`
        }
    }

    async getNews() {
        const allNews = await this._NewsRepository.getNews() ?? [];
        const allUsers = await this._UserRepository.getUsers() ?? [];

        const result = [];
        allNews.forEach(post => {
            const newsPost = this._convert(post, allUsers.find(user => user.id === post.userId));
            result.push(newsPost);
        });

        return result;
    }

    async getNewsById(id) {
        const post = await this._NewsRepository.getNewsById(id);
        const author = await this._UserRepository.getUserById(post.userId);

        return this._convert(post, author);
    }
}