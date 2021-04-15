import { createFilmInfoPopupTemplate } from './view/card-info.js';
import { createFilmCardTemplate } from './view/card.js';
import { createSiteMenuTemplate } from './view/menu.js';
import { createShowMoreButtonTemplate } from './view/show-button.js';
import { createUserGradeTemplate } from './view/user-grade.js';
import { createFilmListTemplate } from './view/card-list.js';
import {generateCard} from './mock/card-mock.js';
import { createSortTemplate } from './view/sort.js';

const CARDS_COUNT = 25;
const CARDS_COUNT_PER_STEP = 5;

const cards = new Array(CARDS_COUNT).fill().map(generateCard);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainPageElement = document.querySelector('.main');
const mainHeaderElement = document.querySelector('.header');

render (mainHeaderElement, createUserGradeTemplate(), 'beforeend');
render (mainPageElement, createSiteMenuTemplate(), 'beforeend');
render (mainPageElement, createSortTemplate(), 'beforeend');
render (mainPageElement, createFilmListTemplate(), 'beforeend');

const filmsListElement = mainPageElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, CARDS_COUNT_PER_STEP); i++) {
  render (filmsListContainerElement, createFilmCardTemplate(cards[i]), 'beforeend');
}

const filmCard = filmsListContainerElement.querySelectorAll('.film-card');

const generatePopup = () => {
  for (let i = 0; i < filmCard.length; i++) {
    filmCard[i].addEventListener('click', () => {
      render (mainPageElement, createFilmInfoPopupTemplate(cards[i]), 'beforeend');
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
  render (filmsListElement, createShowMoreButtonTemplate(), 'beforeend');

  const showMoreButtonElement = document.querySelector('.films-list__show-more');

  showMoreButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + CARDS_COUNT_PER_STEP)
      .forEach((card) => render (filmsListContainerElement, createFilmCardTemplate(card), 'beforeend'));

    renderedCardCount += CARDS_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreButtonElement.remove();
    }
  });
}

