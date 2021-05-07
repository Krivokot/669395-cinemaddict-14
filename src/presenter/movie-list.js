import ShowMoreButtonView from '../view/show-button.js';
import CardListView from '../view/card-list.js';
import EmptyListView from '../view/no-card-list.js';
import SortMenuView from '../view/sort.js';
import { render } from '../utils/render.js';
import CardView from '../view/card.js';
import CardContainerView from '../view/card-container.js';
import CardPopupView from '../view/card-popup';
import { isEscEvent } from '../utils/common.js';


const CARDS_COUNT_PER_STEP = 5;
const bodyElement = document.querySelector('body');

export default class MovieList {
  constructor(main) {
    this._main = main;

    this._sortComponent = new SortMenuView();
    this._cardListComponent = new CardListView();
    this._noCardsComponent = new EmptyListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._cardContainerComponent = new CardContainerView();
    this._renderedCardCount = CARDS_COUNT_PER_STEP;
  }


  init(cards) {
    this._cards = cards.slice();
    this._renderSort();
    render(this._main, this._cardListComponent);
    const filmsContainerElement = this._cardListComponent.getElement().querySelector('.films-list');

    render(filmsContainerElement, this._cardContainerComponent);

    this._renderMovieList(this._cards);
  }

  _renderSort() {
    render(this._main, this._sortComponent);
  }

  _renderCard(cards) {

    const cardComponent = new CardView(cards);

    cardComponent.setClickHandler(() => {
      this._renderPopup(cards)
    })

    render(this._cardContainerComponent, cardComponent);
  }

  _renderCards(from, to) {
    this._cards
      .slice(from, to)
      .forEach((card) => this._renderCard(card))
  }

  _renderPopup(cards) {
    const cardPopupComponent = new CardPopupView(cards);
    render(this._main, cardPopupComponent.getElement());
    bodyElement.classList.add('hide-overflow');

    const closePopup = () => {
      cardPopupComponent.getElement().remove();
      cardPopupComponent.removeElement();
      bodyElement.classList.remove('hide-overflow');
    }

    cardPopupComponent.setButtonCloseClickHandler(() => {
      closePopup();
    })

    const closePopupByKey = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', closePopupByKey);
      }

    document.addEventListener('keydown', closePopupByKey);
    };

  }

  _renderNoCards() {
    render(this._main, this._noCardsComponent.getElement());
  }

  _handleShowMoreButtonClick() {

    this._renderCards(this._renderedCardCount, this._renderedCardCount + CARDS_COUNT_PER_STEP);
    this._renderedCardCount += CARDS_COUNT_PER_STEP;

    if (this._renderedCardCount >= this._cards.length) {
      this._showMoreButtonComponent.getElement().remove();
      this._showMoreButtonComponent.removeElement();
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
