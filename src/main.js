import MovieListPresenter from './presenter/movie-list.js';

import CardsModel from './model/card.js';
import FilterModel from './model/filters.js';
import CommentsModel from './model/comments.js';
import FilterPresenter from './presenter/filters.js';
import {MenuItem} from './const.js';
import StatisticPresenter from './presenter/statistics.js';
import Api from './api.js';
import {UpdateType} from './const.js';

const AUTHORIZATION = 'Basic ilyakot18693';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict/';

const mainPageElement = document.querySelector('.main');
const mainHeaderElement = document.querySelector('.header');

const api = new Api(END_POINT, AUTHORIZATION);


const cardsModel = new CardsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

const statisticsPresenter = new StatisticPresenter(mainPageElement, cardsModel);
const filmListPresenter = new MovieListPresenter(mainPageElement, cardsModel, commentsModel, filterModel, api, mainHeaderElement);
const filterPresenter = new FilterPresenter(mainPageElement, filterModel, cardsModel);


const footerStatisticElement = document.querySelector('.footer__statistics');

export const handleStatsClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.FILTERS:
      statisticsPresenter.destroy();
      filmListPresenter.destroy();
      filmListPresenter.init();
      break;
    case MenuItem.STATS:
      statisticsPresenter.destroy();
      filmListPresenter.destroy();
      statisticsPresenter.init();
      break;
  }
};

filmListPresenter.init();
filterPresenter.init();

api.getCards()
  .then((cards) => {
    cardsModel.setCards(UpdateType.INIT, cards);
    if (cards.length === 1) {
      footerStatisticElement.insertAdjacentHTML('beforeend', `<p> ${cards.length} movie inside</p>`);
    } else {
      footerStatisticElement.insertAdjacentHTML('beforeend', `<p> ${cards.length} movies inside</p>`);
    }
  })
  .catch(() => {
    cardsModel.setCards(UpdateType.INIT, []);
  });
