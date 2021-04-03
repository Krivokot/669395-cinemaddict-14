import {  } from './view/card-info.js';
import {  } from './view/card.js';
import { createSiteMenuTemplate } from './view/menu.js';
import {  } from './view/show-button.js';
import {  } from './view/user-grade.js';

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template)
}

const mainPageElement = document.querySelector('.main');

render (mainPageElement, createSiteMenuTemplate(), 'beforeend')