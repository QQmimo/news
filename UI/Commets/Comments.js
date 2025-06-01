import { NewsFramework } from "../../Frameworks";
import { Message, MessageType } from "../../UI";
import styles from "./Comments.module.scss";

export class Comments {
    _NewsFramework = new NewsFramework();

    async render(post) {
        const commentsBlock = document.createElement('div');
        try {
            Message.show('Please, wait...', 'loading comments', MessageType.Loading);
            const allComments = await this._NewsFramework.getNewsComments(post.Post.id);
            Message.clearMessage();
            commentsBlock.className = styles.comments;
            allComments.forEach(comment => {
                commentsBlock.appendChild(this._drawComment(comment));
            });
        }
        catch (er) {
            Message.show('Error', `Error whyle load comments. ${er.message}`, MessageType.Error);
        }
        return commentsBlock;
    }

    _drawComment(comment) {
        const commentBlock = document.createElement('div');
        commentBlock.className = styles.comment;

        const email = document.createElement('div');
        email.className = styles.email;
        email.textContent = comment.email;

        const body = document.createElement('div');
        body.className = styles.body;
        body.textContent = comment.body;

        commentBlock.appendChild(email);
        commentBlock.appendChild(body);

        return commentBlock;
    }
}