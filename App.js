import { NewsFramework } from "./Frameworks";
import { News } from "./UI";

(async () => {
    const news = new News();
    const newsFramework = new NewsFramework();
    const posts = await newsFramework.getNews();
    const listOfNews = news.drawList(posts);

    document.getElementById('app')?.appendChild(listOfNews);
})();