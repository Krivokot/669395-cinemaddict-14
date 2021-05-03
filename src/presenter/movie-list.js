import CardView from '../view/card.js';
import ShowMoreButtonView from '../view/show-button.js';
import CardListView from '../view/card-list.js';
import EmptyListView from '../view/no-card-list.js';
import SortMenuView from '../view/sort.js';
import { render } from '../utils/render.js';


const CARDS_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(main) {
    this._main = main;

    this._cardComponent = new CardView();
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

  _renderCard(card) {
    console.log(card);
    const filmsListElement = this._cardListComponent.getElement().querySelector('.films-list');
    const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');
    for (let i = 0; i > card.length; i++) {
      render(filmsListContainerElement, this._cardComponent(card[i]).getElement());
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
    .forEach((card) => this._renderCard);


    renderedCardCount += CARDS_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      this._showMoreButtonComponent.getElement().remove();
      this._showMoreButtonComponent.removeElement();
    } 
  }

  _renderShowMoreButton(card) {
    const filmsListElement = this._cardListComponent.getElement().querySelector('.films-list');

    render(filmsListElement, this._showMoreButtonComponent.getElement());

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick(card));
  }

  _renderMovieList(card) {
    this._renderSort();
    this._renderCardList();
    this._renderShowMoreButton(card);

    if (card.length > 0) {
      this._renderCard(card);
    } else {
      this._renderNoCards();
    }
  }
}
