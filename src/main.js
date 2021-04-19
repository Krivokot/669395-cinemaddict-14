import CardPopupView from './view/card-popup.js';
import CardView from './view/card.js';
import SiteMenuView from './view/menu.js';
import ShowMoreButtonView from './view/show-button.js';
import UserGradeView from './view/user-grade.js';
import CardListView from './view/card-list.js';
import EmptyListView from './view/no-card-list.js';
import { generateCard } from './mock/card-mock.js';
import SortMenuView from './view/sort.js';
import { renderElement, RenderPosition, isEscEvent} from './utils.js';

const CARDS_COUNT = 25;
const CARDS_COUNT_PER_STEP = 5;

const cards = new Array(CARDS_COUNT).fill().map(generateCard);

const mainPageElement = document.querySelector('.main');
const mainHeaderElement = document.querySelector('.header');
const body = document.querySelector('body');

renderElement (mainHeaderElement, new UserGradeView().getElement(), RenderPosition.BEFOREEND);
renderElement (mainPageElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement (mainPageElement, new SortMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement (mainPageElement, new CardListView().getElement(), RenderPosition.BEFOREEND);

const filmsListElement = mainPageElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

if (cards.length > 0) {
  for (let i = 0; i < Math.min(cards.length, CARDS_COUNT_PER_STEP); i++) {
    renderElement (filmsListContainerElement, new CardView().getElement(cards[i]), RenderPosition.BEFOREEND);
  }
} else {
  renderElement (mainPageElement, new EmptyListView().getElement(), RenderPosition.BEFOREEND);
}

const filmCardsNode = filmsListContainerElement.querySelectorAll('.film-card');

const generatePopup = () => {
  for (let i = 0; i < filmCardsNode.length; i++) {
    const cardPopupComponent = new CardPopupView();
    filmCardsNode[i].addEventListener('click', () => {
      renderElement (mainPageElement, cardPopupComponent.getElement(cards[i]), RenderPosition.BEFOREEND);
      body.classList.add('hide-overflow');
      closePopupByAction(cardPopupComponent);
    });
  }
};

const closePopup = (component) => {
  component.getElement().remove();
  component.removeElement();
  body.classList.remove('hide-overflow');
};

const closePopupByAction = (component) => {
  const closePopupButton =  component.getElement().querySelector('.film-details__close-btn');

  closePopupButton.addEventListener('click', () => {
    closePopup();
  });

  const closePopupByKey = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopup(component);
      document.removeEventListener('keydown', closePopupByKey);
    }
  };

  document.addEventListener('keydown', closePopupByKey);
};

generatePopup();

if (cards.length > CARDS_COUNT_PER_STEP) {
  let renderedCardCount = CARDS_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButtonView();

  renderElement(filmsListElement, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener('click', (evt) => {

    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + CARDS_COUNT_PER_STEP)
      .forEach((card) => renderElement (filmsListContainerElement, new CardView().getElement(card), RenderPosition.BEFOREEND));

    renderedCardCount += CARDS_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

