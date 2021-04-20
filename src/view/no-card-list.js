import AbstractView from './abstract.js';

const createNoEmptyListTemplate = () => {
  return `<section class="films">
  <section class="films-list">
  <h2 class="films-list__title">There are no movies in our database</h2>
  </section>

  </section>`;
};

export default class EmptyList extends AbstractView {
  getTemplate() {
    return createNoEmptyListTemplate();
  }
}
