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
// render (mainPageElement, createFilmInfoPopupTemplate(), 'beforeend')

const filmsBlockElement = mainPageElement.querySelector('.films-list');
const filmsListContainerElement = filmsBlockElement.querySelector('.films-list__container');

render (filmsListContainerElement, createFilmCardTemplate(), 'beforeend')
render (filmsBlockElement, createShowMoreButtonTemplate(), 'beforeend')



