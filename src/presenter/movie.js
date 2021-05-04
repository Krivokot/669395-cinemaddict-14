import CardView from '../view/card.js';
import {render} from '../utils/render.js';

export default class Movie {
  constructor(container, card) {
    this._container = container;

    this._cardComponent = new CardView(card);
  }

  init() {
    render(this._container, this._cardComponent.getElement())
  }
}
