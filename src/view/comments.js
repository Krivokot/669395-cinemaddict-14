import AbstractView from './abstract.js';
import dayjs from 'dayjs';

const createCommentTemplate = (commentList) => {
  const { emotion, text, date, author } = commentList;

  const generateDate = () => {
    return dayjs(date)
      .format('DD/MM/YYYY HH:mm');
  };

  return `
  <li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${generateDate()}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

export default class Comment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;

    this._deleteClickHandler = this._deleteClickHandler.bind(this);

  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick();
    this.getElement().querySelector('.film-details__comment-delete').innerText = 'Deleting...';
    this.getElement().querySelector('.film-details__comment-delete').disabled = true;
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.film-details__comment-delete').addEventListener('click', this._deleteClickHandler);
  }
}
