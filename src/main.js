import { createFilmInfoPopupTemplate } from './view/card-info.js';
import { createFilmCardTemplate } from './view/card.js';
import { createSiteMenuTemplate } from './view/menu.js';
import { createShowMoreButtonTemplate } from './view/show-button.js';
import { createUserGradeTemplate } from './view/user-grade.js';
import { createFilmListTemplate } from './view/card-list.js';

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template)
}

const mainPageElement = document.querySelector('.main');
const mainHeaderElement = document.querySelector('.header');

render (mainHeaderElement, createUserGradeTemplate(), 'beforeend')
render (mainPageElement, createSiteMenuTemplate(), 'beforeend')
render (mainPageElement, createFilmListTemplate(), 'beforeend')
render (mainPageElement, createFilmInfoPopupTemplate(), 'beforeend')

const filmsListElement = mainPageElement.querySelector('.films-list');
const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

const filmsListExtraElement = mainPageElement.querySelectorAll('.films-list--extra');

for (let i = 0; i < 5; i++) {
  render (filmsListContainerElement, createFilmCardTemplate(), 'beforeend')
}

filmsListExtraElement.forEach(filmContainer => {
const filmsListExtraContainerElement = filmContainer.querySelector('.films-list__container');
  for (let i = 0; i < 2; i++) {
    render (filmsListExtraContainerElement, createFilmCardTemplate(), 'beforeend')
  }
})

render (filmsListElement, createShowMoreButtonTemplate(), 'beforeend')



