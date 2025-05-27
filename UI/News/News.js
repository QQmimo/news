import { NewsFramework } from "../../Frameworks";
import styles from "./News.module.scss";

export class News {
    _NewsFramework = new NewsFramework();

    drawList(news) {
        const list = document.createElement('div');
        list.className = styles.news_list;

        news.forEach(post => {
            list.appendChild(this.drawPost(post));
        });

        return list;
    }

    drawPost(data) {
        const card = document.createElement('div');
        card.className = styles.card;

        const banner = document.createElement('img');
        banner.className = styles.card_banner;
        banner.src = data.ImageUrl;

        const content = document.createElement('div');
        content.className = styles.card_content;

        const title = document.createElement('div');
        content.className = styles.card_title;
        title.textContent = data.Post.title;

        const author = document.createElement('div');
        author.textContent = data.Author.name;

        const body = document.createElement('div');
        body.textContent = data.Post.body;

        content.appendChild(title);
        content.appendChild(author);
        content.appendChild(body);

        card.appendChild(banner);
        card.appendChild(content);

        return card;
    }
}