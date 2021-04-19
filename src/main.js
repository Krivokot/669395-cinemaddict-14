import { createFilmInfoPopupTemplate } from './view/card-info.js';
import { createFilmCardTemplate } from './view/card.js';
import SiteMenuView from './view/menu.js';
import ShowMoreButtonView from './view/show-button.js';
import UserGradeView from './view/user-grade.js';
import { createFilmListTemplate } from './view/card-list.js';
import { generateCard } from './mock/card-mock.js';
import SortMenuView from './view/sort.js';
import { renderTemplate, renderElement, RenderPosition} from './utils.js';

const CARDS_COUNT = 25;
const CARDS_COUNT_PER_STEP = 5;

const cards = new Array(CARDS_COUNT).fill().map(generateCard);

const mainPageElement = document.querySelector('.main');
const mainHeaderElement = document.querySelector('.header');

renderElement (mainHeaderElement, new UserGradeView().getElement(), RenderPosition.BEFOREEND);
renderElement (mainPageElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement (mainPageElement, new SortMenuView().getElement(), RenderPosition.BEFOREEND);
renderTemplate (mainPageElement, createFilmListTemplate(), 'beforeend');

const filmsListElement = mainPageElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, CARDS_COUNT_PER_STEP); i++) {
  renderTemplate (filmsListContainerElement, createFilmCardTemplate(cards[i]), 'beforeend');
}

const filmCard = filmsListContainerElement.querySelectorAll('.film-card');

const generatePopup = () => {
  for (let i = 0; i < filmCard.length; i++) {
    filmCard[i].addEventListener('click', () => {
      renderTemplate (mainPageElement, createFilmInfoPopupTemplate(cards[i]), 'beforeend');
      const filmPopup = mainPageElement.querySelector('.film-details');
      closePopup(filmPopup);
    });
  };
}

generatePopup();

const closePopup = (popup) => {
    const closePopupButton =  popup.querySelector('.film-details__close-btn');
    closePopupButton.addEventListener('click', () => {
      mainPageElement.removeChild(popup);
    });
};

if (cards.length > CARDS_COUNT_PER_STEP) {
  let renderedCardCount = CARDS_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButtonView();

  renderElement(filmsListElement, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + CARDS_COUNT_PER_STEP)
      .forEach((card) => renderTemplate (filmsListContainerElement, createFilmCardTemplate(card), 'beforeend'));

    renderedCardCount += CARDS_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

