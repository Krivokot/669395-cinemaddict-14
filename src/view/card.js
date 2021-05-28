import AbstractView from './abstract.js';
import dayjs from 'dayjs';

const DESCRIPTION_LENGTH = 139;

const createFilmCardTemplate = (card) => {
  const {comments, film_info: {title, poster, description, total_rating, runtime, genre, release: {date}}, user_details: {watchlist, already_watched, favorite} } = card;
  const commentsArray = comments.length;

  const generateDate = () => {
    return dayjs(date)
      .format('YYYY');
  };

  const generateRuntime = () => {
    const duration = require('dayjs/plugin/duration');
    dayjs.extend(duration);

    return dayjs.duration(runtime, 'minutes').format('H [h] mm [m]');
  };

  const getDescriptionCut = (description) => {

    if (description.length >= DESCRIPTION_LENGTH) {
      return description.slice(0, DESCRIPTION_LENGTH);
    }

    return description;
  };

  return `
          <article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${total_rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${generateDate()}</span>
            <span class="film-card__duration">${generateRuntime()}</span>
            <span class="film-card__genre">${genre[0]}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length > DESCRIPTION_LENGTH ? getDescriptionCut(description) : description} ${description.length > DESCRIPTION_LENGTH ? '...' : ' '}</p>
          <a class="film-card__comments">${commentsArray} comment${commentsArray === 1 ? '' : 's'}</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${already_watched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
          </div>
        </article>
        </div>`;
};

export default class Card extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._clickHandler = this._clickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
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

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchListClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._historyClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoritesClickHandler);
  }
}
