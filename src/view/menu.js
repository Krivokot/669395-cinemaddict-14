import AbstractView from './abstract.js';
import {MenuItem} from '../const.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return `
      <a href="#${type}" data-filter="${type}" data-menu="${MenuItem.FILTERS}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">${name === 'All movies' ? 'All movies':`${name} <span class="main-navigation__item-count">${count}</span></a>`}
    `;
};

export const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filterItemsTemplate}
    </div>
    <a href="#stats" data-menu="${MenuItem.STATS}" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statsClickHandlder = this._statsClickHandlder.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filter);
    this._callback.menuItemTypeChange(evt.target.dataset.menu);
    this.getElement().querySelector('.main-navigation__additional').classList.remove('main-navigation__additional--active')

  }

  setFilterTypeChangeHandler(callback, secondcallback) {
    this._callback.filterTypeChange = callback;
    this._callback.menuItemTypeChange = secondcallback;
    this.getElement().querySelectorAll('.main-navigation__item').forEach((item) => item.addEventListener('click', this._filterTypeChangeHandler));
  }

  _statsClickHandlder(evt) {
    evt.preventDefault();
    this._callback.statsClickHandler(evt.target.dataset.menu);
    this.getElement().querySelector('.main-navigation__additional').classList.add('main-navigation__additional--active')
    this.getElement().querySelectorAll('.main-navigation__item').forEach((item) => item.classList.remove('main-navigation__item--active'));
  }

  setStatsClickHandler(callback) {
    this._callback.statsClickHandler = callback;
    this.getElement().querySelector('.main-navigation__additional').addEventListener('click', this._statsClickHandlder);
  }
}
