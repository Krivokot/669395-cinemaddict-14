import AbstractView from './abstract.js';
import dayjs from 'dayjs';
import CardPopupView from './card-popup.js'
import CardPopup from './card-popup.js';

const createCommentTemplate = (commentList) => {
  const { emotion, comment, date, author } = commentList;

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
    <p class="film-details__comment-text">${comment}</p>
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

  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }
}
