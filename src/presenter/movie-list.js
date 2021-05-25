import ShowMoreButtonView from '../view/show-button.js';
import CardListView from '../view/card-list.js';
import EmptyListView from '../view/no-card-list.js';
import SortMenuView from '../view/sort.js';
import { render, remove, RenderPosition } from '../utils/render.js';
import CardContainerView from '../view/card-container.js';
import CardPresenter from './movie.js';
import {sortCardUp, sortRating} from '../utils/card.js';
import {SortType, UpdateType, UserAction} from '../const.js';
import {filter} from '../utils/filters.js';

const CARD_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(main, cardsModel, filterModel) {
    this._main = main;
    this._cardsModel = cardsModel;
    this._filterModel = filterModel;

    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;
    this._loadMoreButtonComponent = null;

    this._cardListComponent = new CardListView();
    this._noCardsComponent = new EmptyListView();
    this._cardContainerComponent = new CardContainerView();
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    this._cardPresenter = {};

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);


  }

  init() {

    render(this._main, this._cardListComponent);
    const filmsContainerElement = this._cardListComponent.getElement()
      .querySelector('.films-list');

    render(filmsContainerElement, this._cardContainerComponent);

    this._cardsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderMovieList();

  }

  destroy() {
    this._clearCardList({resetRenderedCardCount: true, resetSortType: true});

    remove(this._cardListComponent);
    remove(this._cardContainerComponent);

    this._cardsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getCards() {
    const filterType = this._filterModel.getFilter();
    const cards = this._cardsModel.getCards();
    const filtredCards = filter[filterType](cards);

    switch (this._currentSortType) {
      case SortType.DATE_UP:
        return filtredCards.sort(sortCardUp);
      case SortType.RATING:
        return filtredCards.sort(sortRating);
    }

    return filtredCards;

  }

  _handleCardChange(updatedCard) {

    this._cardPresenter[updatedCard.id].init(updatedCard);
  }

  _handleModeChange() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this._cardsModel.updateCard(updateType, update);
        break;
      case UserAction.ADD_CARD:
        this._cardsModel.addCard(updateType, update);
        break;
      case UserAction.DELETE_CARD:
        this._cardsModel.deleteCard(updateType, update);
        break;
        case UserAction.ADD_COMMENT:
        this._cardsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._cardsModel.deleteComment(updateType, update);
        break;
    }
  }

    _handleModelEvent(updateType, data) {
      switch (updateType) {
        case UpdateType.PATCH:
          this._cardPresenter[data.id].init(data);
          break;
        case UpdateType.MINOR:
          this._clearCardList();
          this._renderMovieList();
          break;
        case UpdateType.MAJOR:
          this._clearCardList({resetRenderedCardCount: true, resetSortType: true});
          this._renderMovieList();
          break;
      }
    }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearCardList({resetRenderedCardCount: true});
    this._renderMovieList();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortMenuView(this._currentSortType);
    render(this._cardListComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderCard(cards) {

    const cardPresenter = new CardPresenter(this._cardContainerComponent, this._main, this._handleViewAction, this._handleModeChange);
    cardPresenter.init(cards);
    this._cardPresenter[cards.id] = cardPresenter;

  }

  _clearCardList({resetRenderedCardCount = false, resetSortType = false} = {}) {
    const cardCount = this._getCards().length;

    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};

    remove(this._sortComponent);
    remove(this._noCardsComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedCardCount) {
      this._renderedCardCount = CARD_COUNT_PER_STEP;
    } else {
      this._renderedCardCount = Math.min(cardCount, this._renderedCardCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderCards(cards) {
    cards.forEach((card) => this._renderCard(card));
  }

  _renderNoCards() {
    render(this._main, this._noCardsComponent.getElement());
  }

  _handleShowMoreButtonClick() {
    const cardCount = this._getCards().length;
    const newRenderedCardCount = Math.min(cardCount, this._renderedCardCount + CARD_COUNT_PER_STEP);
    const cards = this._getCards().slice(this._renderedCardCount, newRenderedCardCount);

    this._renderCards(cards);
    this._renderedCardCount = newRenderedCardCount;

    if (this._renderedCardCount >= cardCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    const filmsContainerElement = this._cardListComponent.getElement()
      .querySelector('.films-list');

    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._showMoreButtonComponent.setClickHandler(() => {
      this._handleShowMoreButtonClick(this._cards);
    });

    render(filmsContainerElement, this._showMoreButtonComponent);

  }

  _renderMovieList() {
    const cards = this._getCards();
    const cardCount = cards.length;
    if (cardCount === 0) {
      this._renderNoCards();
      return;
    }
    this._renderSort();
    this._renderCards(cards.slice(0, Math.min(cardCount, this._renderedCardCount)));

    if (cardCount > this._renderedCardCount) {
      this._renderShowMoreButton();
    }


  }
}
