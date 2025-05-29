import { NewsFramework } from "../../Frameworks";
import { Message, MessageType } from "../../UI";
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
        try {
            document.body.appendChild(Message.show('Please, wait...', 'loading posts', MessageType.Loading));
            const news = await this._NewsFramework.getNews();

            news.forEach(post => {
                list.appendChild(this._drawPost(post));
            });
            Message.clearMessage();
        }
        catch (er) {
            list.appendChild(Message.show('Error', `Error while load news data. ${er.message}`, MessageType.Error));
        }
        return list;
    }

    _drawPost(data) {
        const card = document.createElement('div');
        card.className = styles.card;
        card.role = 'button';
        card.tabIndex = 0;
        const click = () => {
            window.location.search = '';
            window.location.search += `post=${data.Post.id}`;
        }
        card.onclick = click;
        card.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === 'NumpadEnter') {
                click();
            }
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

        const content = document.createElement('div');
        content.className = styles.view_content;

        const banner = document.createElement('img');
        banner.className = styles.view_banner;
        banner.src = post.ImageUrl;

        const text = document.createElement('div');

        const title = document.createElement('div');
        title.textContent = post.Post.title;

        const author = document.createElement('div');
        author.textContent = post.Author.name;

        const body = document.createElement('div');
        body.textContent = post.Post.body;

        const feedback = document.createElement('div');
        feedback.className = styles.feedback;
        comments.forEach(comment => {
            feedback.appendChild(this._drawComment(comment));
        });

        text.appendChild(title);
        text.appendChild(author);
        text.appendChild(body);

        content.appendChild(banner);
        content.appendChild(text);

        block.appendChild(content);
        block.appendChild(feedback);

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