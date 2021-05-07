import CardView from '../view/card.js';
import CardPopupView from '../view/card-popup';
import { isEscEvent } from '../utils/common.js';
import { render } from '../utils/render.js';

const bodyElement = document.querySelector('body');

export default class Movie {
  constructor(cardListContainer, mainPageContainer) {
    this._cardListContainer = cardListContainer;
    this._mainPageContainer = mainPageContainer;

    this._cardComponent = null;
    this._cardPopupComponent = null;

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

  }


  init(cards) {
    this._cards = cards;

    this._cardComponent = new CardView(cards);
    this._cardPopupComponent = new CardPopupView(cards);

    this._cardComponent.setClickHandler(this._handleCardClick);
    this._cardPopupComponent.setButtonCloseClickHandler(this._handleCloseButtonClick);

    render(this._cardListContainer, this._cardComponent);

  }

  _handleCardClick() {
    this._renderPopup();
  }

  _renderPopup() {
    render(this._mainPageContainer, this._cardPopupComponent);
    bodyElement.classList.add('hide-overflow');
    }

  _closePopup() {
    this._cardPopupComponent.getElement().remove();
    this._cardPopupComponent.removeElement();
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

