import { News, TopMenu } from "./UI";

(async () => {
    const news = await new News().render();
    document.getElementById('app')?.appendChild(news);

    const menu = new TopMenu().render();
    document.getElementById('menu')?.appendChild(menu);
})();