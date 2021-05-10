import CardView from '../view/card.js';
import CardPopupView from '../view/card-popup';
import { isEscEvent } from '../utils/common.js';
import { render, remove } from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const bodyElement = document.querySelector('body');

export default class Movie {
  constructor(cardListContainer, mainPageContainer, changeData, changeMode) {
    this._cardListContainer = cardListContainer;
    this._mainPageContainer = mainPageContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._cardComponent = null;
    this._cardPopupComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

  }


  init(cards) {
    this._cards = cards;

    const prevCardComponent = this._cardComponent;
    const prevCardPopupComponent = this._cardPopupComponent;

    this._cardComponent = new CardView(cards);
    this._cardPopupComponent = new CardPopupView(cards);

    this._cardComponent.setClickHandler(this._handleCardClick);
    this._cardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._cardComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._cardComponent.setFavoritesClickHandler(this._handleFavoritesClick);
    this._cardPopupComponent.setButtonCloseClickHandler(this._handleCloseButtonClick);
    this._cardPopupComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._cardPopupComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._cardPopupComponent.setFavoritesClickHandler(this._handleFavoritesClick);

    if (prevCardComponent === null || prevCardPopupComponent === null) {
      render(this._cardListContainer, this._cardComponent);
      return;
    }

    remove(prevCardComponent);
    remove(prevCardPopupComponent);

  }

  destroy() {
    remove(this._cardComponent);
    remove(this._cardPopupComponent);
  }

  _handleCardClick() {
    this._renderPopup();
  }

  _handleWatchListClick() {
    this._cardComponent.getElement().querySelector('.film-card__controls-item--add-to-watchlist').classList.toggle('film-card__controls-item--active');
    this._changeData(
      Object.assign(
        {},
        this._cards,
        {
          watchlist: !this._cards.watchlist,
        },
      ),
    );
  }

  _handleFavoritesClick() {
    this._cardComponent.getElement().querySelector('.film-card__controls-item--favorite').classList.toggle('film-card__controls-item--active');
    this._changeData(
      Object.assign(
        {},
        this._cards.user_details,
        {
          favorite: !this._cards.user_details.favorite,
        },
      ),
    );
  }

  _handleHistoryClick() {
    this._cardComponent.getElement().querySelector('.film-card__controls-item--mark-as-watched').classList.toggle('film-card__controls-item--active');
    this._changeData(
      Object.assign(
        {},
        this._cards.user_details,
        {
          already_watched: !this._cards.user_details.already_watched,
        },
      ),
    );
  }

  _renderPopup() {
    render(this._mainPageContainer, this._cardPopupComponent);
    bodyElement.classList.add('hide-overflow');
    }

  _closePopup() {
    remove(this._cardPopupComponent);
    bodyElement.classList.remove('hide-overflow');
  }

  _handleCloseButtonClick() {
    this._closePopup();
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }

    document.addEventListener('keydown', this._escKeyDownHandler);
  }
}

