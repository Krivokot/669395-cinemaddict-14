import CardPopupView from './view/card-popup.js';
import CardView from './view/card.js';
import SiteMenuView from './view/menu.js';
import ShowMoreButtonView from './view/show-button.js';
import UserGradeView from './view/user-grade.js';
import CardListView from './view/card-list.js';
import EmptyListView from './view/no-card-list.js';
import { generateCard } from './mock/card-mock.js';
import SortMenuView from './view/sort.js';
import { render } from './utils/render.js';
import {isEscEvent} from './utils/common.js';

const CARDS_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(moviesContainer) {
    this._moviesContainer = moviesContainer;

    this._cardComponent = new CardView();
    this._sortComponent = new SortMenuView();
    this._cardListComponent = new CardListView();
    this._noCardsComponent = new EmptyListView();
    this._menuComponent = new SiteMenuView();
    this._userGradeComponent = new UserGradeView();
  }

  init(movieListCards) {
    this._movieListCards = movieListCards.slice();

    render (mainPageElement, this._cardListComponent);

    this._renderMovieList();
  }

  _renderSort() {
    render(mainPageElement, this._sortComponent);
  }

  _renderCard(card) {


  }

  _renderCardList() {
    render(mainPageElement, this._cardListComponent);
  }

  _renderNoCards() {

  }

  _renderShowMoreButton() {

  }

  _renderMovieList() {
    if (this._movieListCards.length > 0) {
      for (let i = 0; i < Math.min(this._movieListCards.length, CARDS_COUNT_PER_STEP); i++) {
        renderCard(filmsListContainerElement, this._movieListCards[i]);
      }
    }

    this._renderSort;
    this._renderCardList;
  }
}
