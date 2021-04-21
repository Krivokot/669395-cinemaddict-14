import CardPopupView from './view/card-popup.js';
import CardView from './view/card.js';
import SiteMenuView from './view/menu.js';
import ShowMoreButtonView from './view/show-button.js';
import UserGradeView from './view/user-grade.js';
import CardListView from './view/card-list.js';
import EmptyListView from './view/no-card-list.js';
import { generateCard } from './mock/card-mock.js';
import SortMenuView from './view/sort.js';
import { renderElement } from './utils.js';

const CARDS_COUNT = 25;
const CARDS_COUNT_PER_STEP = 5;

const cards = new Array(CARDS_COUNT).fill().map(generateCard);

const mainPageElement = document.querySelector('.main');
const mainHeaderElement = document.querySelector('.header');
const bodyElement = document.querySelector('body');

renderElement (mainHeaderElement, new UserGradeView().getElement());
renderElement (mainPageElement, new SiteMenuView().getElement());
renderElement (mainPageElement, new SortMenuView().getElement());
renderElement (mainPageElement, new CardListView().getElement());

const filmsListElement = mainPageElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');


if (cards.length > 0) {
  for (let i = 0; i < Math.min(cards.length, CARDS_COUNT_PER_STEP); i++) {
    renderElement (filmsListContainerElement, new CardView().getElement(cards[i]));
  }
} else {
  renderElement (mainPageElement, new EmptyListView().getElement());
}

const generatePopup = () => {

  const filmCardsNode = filmsListContainerElement.querySelectorAll('.film-card');

  filmCardsNode.forEach((card, index) => {
    const cardPopupComponent = new CardPopupView();
    card.addEventListener('click', () => {
      renderElement (mainPageElement, cardPopupComponent.getElement(cards[index]));
      bodyElement.classList.add('hide-overflow');
      closePopup(cardPopupComponent);
    });
  })
};

const closePopup = (component) => {
  const closePopupButton =  component.getElement().querySelector('.film-details__close-btn');

  closePopupButton.addEventListener('click', () => {
    component.getElement().remove();
    component.removeElement();
    bodyElement.classList.remove('hide-overflow');
  });
};

generatePopup();

if (cards.length > CARDS_COUNT_PER_STEP) {
  let renderedCardCount = CARDS_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButtonView();

  renderElement(filmsListElement, showMoreButtonComponent.getElement());

  showMoreButtonComponent.getElement().addEventListener('click', (evt) => {

    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + CARDS_COUNT_PER_STEP)
      .forEach((card) => renderElement (filmsListContainerElement, new CardView().getElement(card)));

    renderedCardCount += CARDS_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }

    generatePopup();
  });
}

