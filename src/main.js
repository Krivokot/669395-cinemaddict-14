import { createFilmInfoPopupTemplate } from './view/card-info.js';
import { createFilmCardTemplate } from './view/card.js';
import { createSiteMenuTemplate } from './view/menu.js';
import { createShowMoreButtonTemplate } from './view/show-button.js';
import { createUserGradeTemplate } from './view/user-grade.js';
import { createFilmListTemplate } from './view/card-list.js';
import {generateCard} from './mock/card-mock.js';

const CARDS_COUNT = 15;
const SHOW_MORE_COUNT = 5;

const cards = new Array(CARDS_COUNT).fill().map(generateCard);

console.log(cards);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const mainPageElement = document.querySelector('.main');
const mainHeaderElement = document.querySelector('.header');

render (mainHeaderElement, createUserGradeTemplate(), 'beforeend');
render (mainPageElement, createSiteMenuTemplate(), 'beforeend');
render (mainPageElement, createFilmListTemplate(), 'beforeend');

const filmsListElement = mainPageElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

const filmsListExtraElement = mainPageElement.querySelectorAll('.films-list--extra');

const renderCards = (count) => {
  for (let i = 0; i < count; i++) {
    render (filmsListContainerElement, createFilmCardTemplate(cards[i]), 'beforeend');
    // render (mainPageElement, createFilmInfoPopupTemplate(cards[i]), 'beforeend');
  }
}

renderCards(CARDS_COUNT);

filmsListExtraElement.forEach((filmContainer) => {
  const filmsListExtraContainerElement = filmContainer.querySelector('.films-list__container');
  for (let i = 0; i < 2; i++) {
    render (filmsListExtraContainerElement, createFilmCardTemplate(cards[i]), 'beforeend');
  }
});

render (filmsListElement, createShowMoreButtonTemplate(), 'beforeend');

const showMoreButtonElement = document.querySelector('.films-list__show-more');

showMoreButtonElement.addEventListener ('click', () => {
  renderCards(SHOW_MORE_COUNT)
})
