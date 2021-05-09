import ShowMoreButtonView from '../view/show-button.js';
import CardListView from '../view/card-list.js';
import EmptyListView from '../view/no-card-list.js';
import SortMenuView from '../view/sort.js';
import { render, remove } from '../utils/render.js';
import CardContainerView from '../view/card-container.js';
import CardPresenter from './movie.js';
import { updateItem } from '../utils/common.js';

const CARDS_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(main) {
    this._main = main;

    this._sortComponent = new SortMenuView();
    this._cardListComponent = new CardListView();
    this._noCardsComponent = new EmptyListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._cardContainerComponent = new CardContainerView();
    this._renderedCardCount = CARDS_COUNT_PER_STEP;
    this._cardPresenter = {};

  }

  init(cards) {
    this._cards = cards.slice();

    this._renderSort();

    render(this._main, this._cardListComponent);
    const filmsContainerElement = this._cardListComponent.getElement().querySelector('.films-list');
    render(filmsContainerElement, this._cardContainerComponent);

    this._handleModeChange = this._handleModeChange.bind(this);

    this._renderMovieList(this._cards);
  }

  _handleCardChange(updatedCard) {
    this._cards = updateItem(this._cards, updatedCard);
    this._cardPresenter[updatedCard.id].init(updatedCard);
  }

  _handleModeChange() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    render(this._main, this._sortComponent);
  }

  _renderCard(cards) {

    const cardPresenter = new CardPresenter(this._cardContainerComponent, this._main, this._handleCardChange, this._handleModeChange);
    cardPresenter.init(cards);
    this._cardPresenter[cards.id] = cardPresenter;

  }

  _clearCardList() {
    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};
    this._renderedCardCount = CARDS_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderCards(from, to) {
    this._cards
      .slice(from, to)
      .forEach((card) => this._renderCard(card))
  }

  _renderNoCards() {
    render(this._main, this._noCardsComponent.getElement());
  }

  _handleShowMoreButtonClick() {

    this._renderCards(this._renderedCardCount, this._renderedCardCount + CARDS_COUNT_PER_STEP);
    this._renderedCardCount += CARDS_COUNT_PER_STEP;

    if (this._renderedCardCount >= this._cards.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._cardListComponent, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      this._handleShowMoreButtonClick(this._cards);
    });
  }

  _renderCardList() {
    this._renderCards(0, Math.min(this._cards.length, CARDS_COUNT_PER_STEP));

    if (this._cards.length > CARDS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderMovieList() {
    if (this._cards.length <= 0) {
      this._renderNoCards();
    }


    this._renderCardList();

  }
}
