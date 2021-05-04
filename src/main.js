import MovieListPresenter from './presenter/movie-list.js';
import SiteMenuView from './view/menu.js';

import UserGradeView from './view/user-grade.js';


import { generateCard } from './mock/card-mock.js';

import { render } from './utils/render.js';


const CARDS_COUNT = 25;

const cards = new Array(CARDS_COUNT).fill().map(generateCard);

const mainPageElement = document.querySelector('.main');
const mainHeaderElement = document.querySelector('.header');

render (mainHeaderElement, new UserGradeView().getElement());
render (mainPageElement, new SiteMenuView().getElement());



const filmListPresenter = new MovieListPresenter(mainPageElement);
filmListPresenter.init(cards);




