import styles from "./Message.module.scss";

export const MessageType = {
    Information: 0,
    Error: 1,
    Loading: 2
};

export class Message {
    static show(title, text, type = MessageType.Information) {
        this.clearMessage();
        const message = document.createElement('div');
        message.id = 'message';
        message.classList.add(styles.message);
        message.classList.add(type === MessageType.Information || type === MessageType.Loading ? styles.information : styles.error);

        const contentBlock = document.createElement('div');


        const loader = document.createElement('div');

        const titleBlock = document.createElement('div');
        titleBlock.className = styles.title;
        titleBlock.textContent = title;

        const textBlock = document.createElement('div');
        textBlock.className = styles.text;
        textBlock.textContent = text;

        message.appendChild(titleBlock);
        message.appendChild(textBlock);

        return message;
    }    

    static clearMessage() {
        const message = document.querySelector('#message');
        message?.parentElement?.removeChild(message);
    }
} 