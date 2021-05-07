import AbstractView from './abstract.js';

const createFilmContainerTemplate = () => {
  return `<div class="films-list__container">
  </div>`;
};

export default class CardComtainer extends AbstractView {
  getTemplate() {
    return createFilmContainerTemplate();
  }
}
