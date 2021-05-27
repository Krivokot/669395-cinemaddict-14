import AbstractView from './abstract.js';
import {getWatchedFilms} from '../utils/card.js';
import {getRank} from '../utils/user-grade.js';


const createUserGradeTemplate = (watchedFilms) => {
  const userGrade = getRank(watchedFilms);

  return userGrade ? `<p class="profile__rating">${userGrade}</p>` : '';
};

const createUserProfileTemplate = (films) => {
  const watchedFilms = getWatchedFilms(films);

  if (!watchedFilms) {
    return ' ';
  }

  const ratingTemplate = createUserGradeTemplate(watchedFilms);

  return `<section class="header__profile profile">
    ${ratingTemplate}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserGrade extends AbstractView {
  constructor(cards) {
    super();

    this._cards = cards;
  }

  getTemplate() {
    return createUserProfileTemplate(this._cards);
  }
}
