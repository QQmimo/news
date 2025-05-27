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
            window.location.search = `post=${Math.floor(Math.random() * 100)}`;
        }));

        return menu;
    }

    _drawItem(title, onClick) {
        const item = document.createElement('a');
        item.href = "nohref";
        item.className = styles.menu_item;
        item.textContent = title;
        item.onclick = onClick;

        return item;
    }
}