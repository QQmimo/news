import styles from "./Message.module.scss";

export const MessageType = {
    Information: 0,
    Error: 1,
    Loading: 2
};

export class Message {
    static show(title, text, type = MessageType.Information) {
        this.clearMessage();
        const messageBlock = document.createElement('div');
        messageBlock.id = 'message';
        messageBlock.classList.add(styles.message);
        messageBlock.classList.add(type === MessageType.Information || type === MessageType.Loading ? styles.information : styles.error);

        const contentBlock = document.createElement('div');
        contentBlock.className = styles.content;

        if (type === MessageType.Loading) {
            const loaderBlock = document.createElement('div');
            loaderBlock.className = styles.loader;
            messageBlock.appendChild(loaderBlock);
        }

        const titleBlock = document.createElement('div');
        titleBlock.className = styles.title;
        titleBlock.textContent = title;

        const textBlock = document.createElement('div');
        textBlock.className = styles.text;
        textBlock.textContent = text;

        contentBlock.appendChild(titleBlock);
        contentBlock.appendChild(textBlock);
        messageBlock.appendChild(contentBlock);

        document.body.appendChild(messageBlock);
        return messageBlock;
    }

    static clearMessage() {
        const message = document.querySelector('#message');
        message?.parentElement?.removeChild(message);
    }
} 