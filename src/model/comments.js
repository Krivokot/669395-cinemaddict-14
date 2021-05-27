import Observer from '../utils/observer.js';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(updateType, comments) {
    this._comments = comments.slice();
    this._notify(updateType);
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update) {
    this._comments = [
      ...this._comments,
      update,
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const commentIndex = this._comments.findIndex((comment) => comment.id === update.id);

    if (commentIndex === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, commentIndex),
      ...this._comments.slice(commentIndex + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
      {
        text: comment.comment,
        date: new Date(comment.date),
      },
    );

    delete adaptedComment.comment;
    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
      {
        'comment': comment.text,
      },
    );

    delete adaptedComment.text;

    return adaptedComment;
  }
}
