import AbstractView from './abstract.js';

const createFilmListTemplate = () => {
  return `
  <section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    </section>
  </section>
  `;
};

export default class CardList extends AbstractView {
  getTemplate() {
    return createFilmListTemplate();
  }
}
