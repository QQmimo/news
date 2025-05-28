import { RandomizeApplication } from "../../Applications";
import styles from "./TopMenu.module.scss";

export class TopMenu {
    render() {
        return this._drawMenu();
    }

    _drawMenu() {
        const menu = document.createElement('nav');
        menu.className = styles.menu;

        menu.appendChild(this._drawItem('All', () => {
            window.location.href = '/';
        }));
        menu.appendChild(this._drawItem('Random', () => {
            const rnd = new RandomizeApplication();
            window.location.search = `post=${rnd.random(1, 100)}`;
        }));

        return menu;
    }

    _drawItem(title, onClick) {
        const item = document.createElement('div');
        item.role = 'button';
        item.tabIndex = 0;
        item.className = styles.menu_item;
        item.textContent = title;
        item.onclick = onClick;
        item.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === 'NumpadEnter') {
                onClick();
            }
        }

        return item;
    }
}