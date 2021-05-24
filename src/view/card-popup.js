import SmartView from './smart.js';
import {Emoji} from '../const';
import dayjs from 'dayjs';

const createFilmInfoPopupTemplate = (card) => {
  const {writtenComment, checkedEmoji, comments, film_info: {title, poster, description, age_rating, alternative_title, total_rating, director, runtime, release: {date} }, user_details: {watchlist, already_watched, favorite} } = card;
  const commentsArray = comments.length;

  const generateDate = () => {
    return dayjs(date)
      .format('DD/MM/YYYY');
  };

  const generateRuntime = () => {

    return dayjs.duration(runtime, 'minutes').format('H mm');
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${age_rating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${alternative_title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${total_rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${generateDate()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${generateRuntime()}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">USA</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">Drama</span>
                <span class="film-details__genre">Film-Noir</span>
                <span class="film-details__genre">Mystery</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" ${watchlist ? 'checked' : ''} id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" ${already_watched ? 'checked' : ''} id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" ${favorite ? 'checked' : ''} id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comment${commentsArray === 1 ? '' : 's'} <span class="film-details__comments-count">${commentsArray}</span></h3>

        <ul class="film-details__comments-list">

        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
          ${checkedEmoji ? `<img src="images/emoji/${checkedEmoji}.png" width="55" height="55" alt="emoji-${checkedEmoji}">` : ''}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${writtenComment ? writtenComment : ''}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${checkedEmoji === Emoji.SMILE ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${checkedEmoji === Emoji.SLEEPING ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${checkedEmoji === Emoji.PUKE ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${checkedEmoji === Emoji.ANGRY ? 'checked' : ''}>
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class CardPopup extends SmartView {
  constructor(card) {
    super();
    this._card = card;

    this._data = card;
    this._emoji = null;

    this._btnCloseClickHandler = this._btnCloseClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._addCommentKeydownHandler = this._addCommentKeydownHandler.bind(this);

  }

  reset(card) {
    this.updateData(
      CardPopup.parseCardToData(card),
    );
  }

  getTemplate() {
    return createFilmInfoPopupTemplate(this._data);
  }

  getWrittenComment() {
    return this.getElement().querySelector('.film-details__comment-input').value;
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();

    this._emoji = evt.target.value;
    this.updateData(
      {
        checkedEmoji: this._emoji,
      // writtenComment: this.getElement().querySelector('.film-details__comment-input').value,
      },
    );
  }

  _addCommentKeydownHandler(evt) {

    if ((evt.ctrlKey && evt.code === 'Enter') &&
      (this.getWrittenComment()) &&
      (this._emoji)
    ) {
      this._callback.addComment();
    }
  }

  setEmojiChangeHandler() {
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._emojiChangeHandler);
  }

  setAddCommentKeydownHandler(callback) {
    this._callback.addComment = callback;

    this.getElement().querySelector('.film-details__comment-input').addEventListener('keydown', this._addCommentKeydownHandler);
  }

  restoreHandlers() {
    this.setEmojiChangeHandler();
    this.setButtonCloseClickHandler(this._callback.clickCloseButton);
    this.setWatchListClickHandler(this._callback.watchListClick);
    this.setHistoryClickHandler(this._callback.historyClick);
    this.setFavoritesClickHandler(this._callback.favoritesClick);
    this.setAddCommentKeydownHandler(this._callback.addComment);
  }

  static parseCardToData(card) {
    return Object.assign(
      {},
      card,
      {
        checkedEmoji: false,
      },
    );
  }

  _btnCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickCloseButton();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this._callback.historyClick();
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritesClick();
  }

  setButtonCloseClickHandler(callback) {
    this._callback.clickCloseButton = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._btnCloseClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('.film-details__control-label--watchlist').addEventListener('click', this._watchListClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector('.film-details__control-label--watched').addEventListener('click', this._historyClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClick = callback;
    this.getElement().querySelector('.film-details__control-label--favorite').addEventListener('click', this._favoritesClickHandler);
  }
}

