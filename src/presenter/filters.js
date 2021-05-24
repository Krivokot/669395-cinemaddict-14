import FilterView from '../view/menu.js';
 import {render, RenderPosition, remove} from '../utils/render.js';
 import {filter} from '../utils/filters.js';
 import {FilterType, UpdateType} from '../const.js';

 export default class Filter {
   constructor(filterContainer, filterModel, cardsModel) {
     this._filterContainer = filterContainer;
     this._filterModel = filterModel;
     this._cardsModel = cardsModel;

     this._filterComponent = null;

     this._handleModelEvent = this._handleModelEvent.bind(this);
     this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

     this._cardsModel.addObserver(this._handleModelEvent);
     this._filterModel.addObserver(this._handleModelEvent);
   }

   init() {
     const filters = this._getFilters();
     const prevFilterComponent = this._filterComponent;

     this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
     console.log(this._filterComponent);
     this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

     if (prevFilterComponent === null) {
       render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
       return;
     }

     replace(this._filterComponent, prevFilterComponent);
     remove(prevFilterComponent);
   }

   _handleModelEvent() {
     this.init();
   }

   _handleFilterTypeChange(filterType) {
     if (this._filterModel.getFilter() === filterType) {
       return;
     }

     this._filterModel.setFilter(UpdateType.MAJOR, filterType);
   }

   _getFilters() {
     const cards = this._cardsModel.getCards();

     return [
       {
         type: FilterType.ALL,
         name: 'All',
         count: filter[FilterType.ALL](cards).length,
       },
       {
         type: FilterType.WATCH_LIST,
         name: 'watchlist',
         count: filter[FilterType.WATCH_LIST](cards).length,
       },
       {
         type: FilterType.HISTORY,
         name: 'history',
         count: filter[FilterType.HISTORY](cards).length,
       },
       {
         type: FilterType.FAVORITES,
         name: 'Favorites',
         count: filter[FilterType.FAVORITES](cards).length,
       },
     ];
   }
 }