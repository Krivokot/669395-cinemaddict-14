import MovieListPresenter from './presenter/movie-list.js';
import UserGradeView from './view/user-grade.js';
import { generateCard } from './mock/card-mock.js';
import { render } from './utils/render.js';
import CardsModel from './model/card.js';
import FilterModel from './model/filters.js';
import FilterPresenter from './presenter/filters.js';
import {MenuItem} from './const.js';
import StatisticPresenter from './presenter/statistics.js';

const CARDS_COUNT = 25;

const cards = new Array(CARDS_COUNT).fill().map(generateCard);

const cardsModel = new CardsModel();
cardsModel.setCards(cards);
const filterModel = new FilterModel();


const mainPageElement = document.querySelector('.main');
const mainHeaderElement = document.querySelector('.header');
const footerStatisticElement = document.querySelector('.footer__statistics');

if (cards.length === 1) {
  footerStatisticElement.insertAdjacentHTML('beforeend', `<p> ${cards.length} movie inside</p>`);
} else {
  footerStatisticElement.insertAdjacentHTML('beforeend', `<p> ${cards.length} movies inside</p>`);
}

const statisticsPresenter = new StatisticPresenter(mainPageElement, cardsModel);
const filmListPresenter = new MovieListPresenter(mainPageElement, cardsModel, filterModel);
filmListPresenter.init();



export const handleStatsClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.FILTERS:
      statisticsPresenter.destroy();
      filmListPresenter.destroy();
      filmListPresenter.init();
      break;
    case MenuItem.STATS:
      filmListPresenter.destroy();
      statisticsPresenter.init();
      break;
  }

}

render (mainHeaderElement, new UserGradeView().getElement());


const filterPresenter = new FilterPresenter(mainPageElement, filterModel, cardsModel);
filterPresenter.init();





