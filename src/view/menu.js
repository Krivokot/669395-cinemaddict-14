import AbstractView from './abstract.js';

const createSiteMenuTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">All movies</a>
      <a href="#watchlist" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">0</span></a>
      <a href="#history" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">0</span></a>
      <a href="#favorites" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">0</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
    console.log(this._currentFilter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelector('.main-navigation__item').addEventListener('click', this._filterTypeChangeHandler);
  }
}