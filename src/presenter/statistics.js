import StatisticView from '../view/statistics.js';
import {render, remove} from '../utils/render.js';
import {getFilmGenresStat, getWatchedFilmByRange} from '../utils/statistic.js';
import {DatePeriod} from '../const.js';


export default class Statistic {
  constructor(container, cardsModel) {
    this._container = container;
    this._cardsModel = cardsModel;

    this._statisticComponent = null;
    this._handleStatisticFilterChange = this._handleStatisticFilterChange.bind(this);
  }

  init() {
    this._statisticComponent = new StatisticView(this._getStatData(DatePeriod.ALL_TIME));

    this._statisticComponent.setFilterStatisticChangeHandler(this._handleStatisticFilterChange);

    render(this._container, this._statisticComponent);
  }

  destroy() {
    remove(this._statisticComponent);
    this._statisticComponent = null;
  }

  _getStatData(period) {
    const cards = this._cardsModel.getCards();
    const watchedFilms = getWatchedFilmByRange(cards, period);
    const genresCount = getFilmGenresStat(watchedFilms);
    const genres = genresCount.map((genre) => genre[0]);
    const count = genresCount.map((genre) => genre[1]);

    return {
      period,
      watchedFilms,
      genresCount,
      genres,
      count,
    };
  }


  _handleStatisticFilterChange(period) {
    this._statisticComponent.updateData(this._getStatData(period));
    console.log(period);
  }
}
