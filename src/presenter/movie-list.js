import ShowMoreButtonView from '../view/show-button.js';
import CardListView from '../view/card-list.js';
import EmptyListView from '../view/no-card-list.js';
import SortMenuView from '../view/sort.js';
import { render } from '../utils/render.js';
import MoviePresenter from './movie.js'


const CARDS_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(main) {
    this._main = main;

    this._sortComponent = new SortMenuView();
    this._cardListComponent = new CardListView();
    this._noCardsComponent = new EmptyListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
  }

  init(card) {
    this._renderMovieList(card);
  }

  _renderSort() {
    render(this._main, this._sortComponent.getElement());
  }

  _renderCard(cards) {
    const filmsListElement = this._cardListComponent.getElement().querySelector('.films-list');
    const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

    for (let i = 0; i < Math.min(cards.length, CARDS_COUNT_PER_STEP); i++) {
      const moviePresenter = new MoviePresenter(filmsListContainerElement, cards[i]);
      moviePresenter.init();
    }


  }

  _renderCardList() {
    render(this._main, this._cardListComponent.getElement());
  }

  _renderNoCards() {
    render(this._main, this._noCardsComponent.getElement());
  }

  _handleShowMoreButtonClick(cards) {
  let renderedCardCount = CARDS_COUNT_PER_STEP;

    cards
    .slice(renderedCardCount, renderedCardCount + CARDS_COUNT_PER_STEP)
    .forEach((card) => this._renderCard(card));


    renderedCardCount += CARDS_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      this._showMoreButtonComponent.removeElement();
    }
  }

  _renderShowMoreButton(cards) {
    const filmsListElement = this._cardListComponent.getElement().querySelector('.films-list');

    render(filmsListElement, this._showMoreButtonComponent.getElement());

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick(cards));

  }

  _renderMovieList(cards) {

    this._renderCardList();

    if (cards.length > 0) {
      this._renderCard(cards);
    } else {
      this._renderNoCards();
    }

    this._renderShowMoreButton(cards);

    this._renderSort();



  }
}
