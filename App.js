import { News, TopMenu } from "./UI";

(async () => {
    const menu = new TopMenu().render();
    document.getElementById('menu')?.appendChild(menu);

    const news = await new News().render();
    document.getElementById('app')?.appendChild(news);
})();