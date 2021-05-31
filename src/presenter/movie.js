import CardView from '../view/card.js';
import CardPopupView from '../view/card-popup.js';
import CommentsPresenter from './comments-list.js';
import { isEscEvent } from '../utils/common.js';
import { render, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';
import {nanoid} from 'nanoid';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const bodyElement = document.querySelector('body');

export default class Movie {
  constructor(cardListContainer, mainPageContainer, changeData, changeMode, api, commentsModel, cards, cardsModel) {
    this._cardListContainer = cardListContainer;
    this._mainPageContainer = mainPageContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;
    this._commentsModel = commentsModel;
    this._cards = cards;
    this._cardsModel = cardsModel;


    this._cardComponent = null;
    this._cardPopupComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._submitKeyDownHandler = this._submitKeyDownHandler.bind(this);
  }

  init() {

    const prevCardComponent = this._cardComponent;
    const prevCardPopupComponent = this._cardPopupComponent;
    this._cardComponent = new CardView(this._cards);
    this._cardPopupComponent = new CardPopupView(this._cards);

    this._cardComponent.setClickHandler(this._handleCardClick);
    this._cardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._cardComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._cardComponent.setFavoritesClickHandler(this._handleFavoritesClick);

    if (prevCardComponent === null || prevCardPopupComponent === null) {
      render(this._cardListContainer, this._cardComponent);

      return;
    }

    remove(prevCardComponent);
    remove(prevCardPopupComponent);

  }

  update() {
    remove(this._cardComponent);
  }


  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }


  _handleCardClick() {
    document.addEventListener('keydown', this._escKeyDownHandler);
    document.addEventListener('keydown', this._submitKeyDownHandler);


    this._renderPopup();
  }

  _handleModelEvent(updateType) {

    switch (updateType) {
      case UpdateType.MINOR:

        break;
    }
  }

  _handleWatchListClick() {
    this._cardComponent.getElement()
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .classList
      .toggle('film-card__controls-item--active');

    const newCard = JSON.parse(JSON.stringify(this._cards));
    newCard.user_details.watchlist = !newCard.user_details.watchlist;
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      newCard);
  }

  _handleFavoritesClick() {
    this._cardComponent.getElement()
      .querySelector('.film-card__controls-item--favorite')
      .classList
      .toggle('film-card__controls-item--active');

    const newCard = JSON.parse(JSON.stringify(this._cards));
    newCard.user_details.favorite = !newCard.user_details.favorite;
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      newCard,
    );
  }

  _handleHistoryClick() {
    this._cardComponent.getElement()
      .querySelector('.film-card__controls-item--mark-as-watched')
      .classList
      .toggle('film-card__controls-item--active');

    const newCard = JSON.parse(JSON.stringify(this._cards));
    newCard.user_details.alreadyWatched = !newCard.user_details.alreadyWatched;
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      newCard,
    );
  }

  _renderPopup() {
    this._changeMode();
    this._mode = Mode.EDITING;
    render(this._mainPageContainer, this._cardPopupComponent);
    bodyElement.classList.add('hide-overflow');

    this._cardPopupComponent.setButtonCloseClickHandler(this._handleCloseButtonClick);
    this._cardPopupComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._cardPopupComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._cardPopupComponent.setFavoritesClickHandler(this._handleFavoritesClick);

    this._api.getComments(this._cards.id)
      .then((comments) => {
        this._commentsModel.setComments(UpdateType.INIT, comments);
        this._renderComments();
      })
      .catch(() => {
        this._commentsModel.setComments(UpdateType.INIT, []);
      });
  }

  _renderComments() {
    const newCommentsArray = this._commentsModel.getComments();
    const commentContainerElement = this._cardPopupComponent.getElement()
      .querySelector('.film-details__comments-list');
    newCommentsArray
      .slice(0, newCommentsArray.length)
      .forEach((commentElement) => {
        const commentsPresenter = new CommentsPresenter(commentContainerElement, commentElement, this._commentsModel, this._changeData, this._handleModelEvent);
        commentsPresenter.init();
      });
    this._cardPopupComponent.setEmojiChangeHandler();
    this._cardPopupComponent.setAddCommentKeydownHandler(this._submitKeyDownHandler);
  }

  _closePopup() {

    remove(this._cardPopupComponent);
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
    document.removeEventListener('keydown', this._submitKeyDownHandler);
    this._mode = Mode.DEFAULT;
    this._cardPopupComponent.reset(this._cards);
  }

  _handleCloseButtonClick() {
    this._closePopup();
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _getCommentData() {
    const emoji = this._cardPopupComponent.getEmoji();
    const text = this._cardPopupComponent.getWrittenComment();
    return {
      author: '',
      date: '',
      emotion: emoji,
      id: nanoid(),
      comment: text,
    };
  }

  _submitKeyDownHandler(evt) {
    if (evt.ctrlKey && evt.code === 'Enter') {
      evt.preventDefault();
      this._commentsModel.addComment(UpdateType.PATCH, this._getCommentData());
      this._changeData(UserAction.ADD_COMMENT, UpdateType.MINOR, this._getCommentData(), this._cards);
      this.resetView();
    }
  }
}

