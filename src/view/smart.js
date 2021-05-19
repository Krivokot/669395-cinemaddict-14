import AbstractView from './abstract.js';


export default class Smart extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateState(update, stateUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (stateUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();

    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
    this.restoreAdditionalViewParts();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }

  restoreAdditionalViewParts() {
    throw new Error('Abstract method not implemented: additionalViewParts');
  }
}
