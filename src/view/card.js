import {createElement} from '../utils.js';

const createFilmCardTemplate = (card) => {
  const { film_info: {title, poster, description, total_rating} } = card;
  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${total_rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">1929</span>
            <span class="film-card__duration">1h 55m</span>
            <span class="film-card__genre">Musical</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">5 comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class Card {
  constructor() {
    this._element = null;
  }

  getTemplate(card) {
    return createFilmCardTemplate(card);
  }

  getElement(card) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(card));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
