import MovieListPresenter from './presenter/movie-list.js';
import SiteMenuView from './view/menu.js';
import UserGradeView from './view/user-grade.js';
import { generateCard } from './mock/card-mock.js';
import { render } from './utils/render.js';
import CardsModel from './model/card.js';

const CARDS_COUNT = 25;

const cards = new Array(CARDS_COUNT).fill().map(generateCard);

const cardsModel = new CardsModel();
cardsModel.setCards(cards);

const mainPageElement = document.querySelector('.main');
const mainHeaderElement = document.querySelector('.header');
const footerStatisticElement = document.querySelector('.footer__statistics');

if (cards.length === 1) {
  footerStatisticElement.insertAdjacentHTML('beforeend', `<p> ${cards.length} movie inside</p>`);
} else {
  footerStatisticElement.insertAdjacentHTML('beforeend', `<p> ${cards.length} movies inside</p>`);
}


render (mainHeaderElement, new UserGradeView().getElement());
render (mainPageElement, new SiteMenuView().getElement());

const filmListPresenter = new MovieListPresenter(mainPageElement, cardsModel);
filmListPresenter.init();
