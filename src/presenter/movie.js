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
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._submitKeyDownHandler = this._submitKeyDownHandler.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
  }

  init() {
    const prevCardComponent = this._cardComponent;
    const prevCardPopupComponent = this._cardPopupComponent;
    this._cardComponent = new CardView(this._cards);
    this._cardPopupComponent = null;
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
    // remove(this._cardPopupComponent);
  }


  resetPopupView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }


  _handleCardClick() {

    this._renderPopup();
  }

  _handleViewAction(actionType, updateType, update, card) {
    const commentDeleteElement = this._cardPopupComponent.getElement().querySelector('.film-details__comment-delete');
    const commentInputElement = this._cardPopupComponent.getElement().querySelector('.film-details__comment-input');
    const newCommentEmojiElement = this._cardPopupComponent.getElement().querySelector('.film-details__new-comment-emoji');
// FIXME зафиксировать скролл
// TODO протестировать обновление попапа
    switch (actionType) {
      case UserAction.SET_FILTER:
        if (this._mode !== Mode.DEFAULT) {
          this._closePopup();
          this._cards = update;
          this._renderPopup();
        }
        break;
      case UserAction.DELETE_COMMENT:
        this._api.deleteComment(update).then(() => {
          this._cardsModel.deleteComment(updateType, update);
          this._closePopup();
          this._cards = card;
          this._renderPopup();
        })
          .catch(() => {
            commentDeleteElement.innerText = 'Delete';
            commentDeleteElement.disabled = false;
          });
        break;
      case UserAction.ADD_COMMENT:
        commentInputElement.setAttribute('disabled', '');
        this._api.addComment(this._cards, update).then(() => {
          this._cardsModel.addComment(updateType, update);
          this._closePopup();
          this._cards = card;
          this._renderPopup();
          commentInputElement.value = ' ';
          newCommentEmojiElement.src = ' ';
          commentInputElement.removeAttribute('disabled');
        })
          .catch(() => {
            commentInputElement.classList.add('shake');
            commentInputElement.disabled = false;
          });
        break;
    }
  }

  _handleWatchListClick() {
    this._cardComponent.getElement()
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .classList
      .toggle('film-card__controls-item--active');

    const newCard = JSON.parse(JSON.stringify(this._cards));
    newCard.userDetails.watchlist = !newCard.userDetails.watchlist;
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      newCard,
    );
    this._handleViewAction(UserAction.SET_FILTER, UpdateType.PATCH, newCard);
  }

  _handleFavoritesClick() {
    this._cardComponent.getElement()
      .querySelector('.film-card__controls-item--favorite')
      .classList
      .toggle('film-card__controls-item--active');

    const newCard = JSON.parse(JSON.stringify(this._cards));
    newCard.userDetails.favorite = !newCard.userDetails.favorite;
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      newCard,
    );
    this._handleViewAction(UserAction.SET_FILTER, UpdateType.PATCH, newCard);
  }

  _handleHistoryClick() {
    this._cardComponent.getElement()
      .querySelector('.film-card__controls-item--mark-as-watched')
      .classList
      .toggle('film-card__controls-item--active');

    const newCard = JSON.parse(JSON.stringify(this._cards));
    newCard.userDetails.alreadyWatched = !newCard.userDetails.alreadyWatched;
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      newCard,
    );
    this._handleViewAction(UserAction.SET_FILTER, UpdateType.PATCH, newCard);
  }

  _renderPopup() {
    this._cardPopupComponent = new CardPopupView(this._cards);
    this._changeMode();
    this._mode = Mode.EDITING;
    render(this._mainPageContainer, this._cardPopupComponent);
    bodyElement.classList.add('hide-overflow');

    document.addEventListener('keydown', this._escKeyDownHandler);
    document.addEventListener('keydown', this._submitKeyDownHandler);
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
        const commentsPresenter = new CommentsPresenter(commentContainerElement, commentElement, this._commentsModel, this._handleViewAction, this._cards);
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
      const newCard = JSON.parse(JSON.stringify(this._cards));
      const newCommentsList = [];
      this._commentsModel.getComments().forEach((card) => {
        return newCommentsList.push(card.id);
      });

      newCard.comments = newCommentsList;

      this._handleViewAction(UserAction.ADD_COMMENT, UpdateType.PATCH, this._getCommentData(), newCard);
      this._cardPopupComponent.getElement().querySelector('.film-details__comment-input').classList.remove('shake');
    }

  }
}

