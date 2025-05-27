import { NewsFramework } from "../../Frameworks";
import styles from "./News.module.scss";

export class News {
    _NewsFramework = new NewsFramework();

    async render() {
        if (window.location.search) {
            const postId = window.location.search.split('?post=')?.[1];
            return await this._drawView(postId);
        }
        else {
            return await this._drawList();
        }
    }

    async _drawList() {
        const list = document.createElement('div');
        list.className = styles.news_list;

        const news = await this._NewsFramework.getNews();

        news.forEach(post => {
            list.appendChild(this._drawPost(post));
        });

        return list;
    }

    _drawPost(data) {
        const card = document.createElement('div');
        card.className = styles.card;
        card.onclick = () => {
            window.location.search = '';
            window.location.search += `post=${data.Post.id}`;
        }

        const banner = document.createElement('img');
        banner.className = styles.card_banner;
        banner.src = data.ImageUrl;

        const content = document.createElement('div');
        content.className = styles.card_content;

        const title = document.createElement('div');
        title.className = styles.card_title;
        title.textContent = data.Post.title;

        const author = document.createElement('div');
        author.className = styles.card_author;
        author.textContent = data.Author.name;

        const body = document.createElement('div');
        body.className = styles.card_body;
        body.textContent = data.Post.body;

        content.appendChild(title);
        content.appendChild(author);
        content.appendChild(body);

        card.appendChild(banner);
        card.appendChild(content);

        return card;
    }

    async _drawView(id) {
        const post = await this._NewsFramework.getNewsById(id);
        const comments = await this._NewsFramework.getComments(post.Post.id);

        const block = document.createElement('div');
        block.className = styles.view;

        const banner = document.createElement('img');
        banner.className = styles.view_banner;
        banner.src = post.ImageUrl;

        const content = document.createElement('div');
        content.className = styles.view_content;

        const title = document.createElement('div');
        title.textContent = post.Post.title;

        const author = document.createElement('div');
        author.textContent = post.Author.name;

        const body = document.createElement('div');
        body.textContent = post.Post.body;

        const feedback = document.createElement('div');
        comments.forEach(comment => {
            feedback.appendChild(this._drawComment(comment));
        });

        content.appendChild(title);
        content.appendChild(author);
        content.appendChild(body);
        content.appendChild(feedback);
        
        block.appendChild(banner);
        block.appendChild(content);
        
        return block;
    }

    _drawComment(comment) {
        const commentBlock = document.createElement('div');

        const email = document.createElement('div');
        email.textContent = comment.email;

        const body = document.createElement('div');
        body.textContent = comment.body;

        commentBlock.appendChild(email);
        commentBlock.appendChild(body);

        return commentBlock;
    }
}