import dayjs from 'dayjs';

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortCardUp = (cardA, cardB) => {

  const weight = getWeightForNullDate(cardA.film_info.release.date, cardB.film_info.release.date);

  if (weight !== null) {
    return weight;
  }

  return dayjs(cardB.film_info.release.date).diff(dayjs(cardA.film_info.release.date));
};

export const sortRating = (filmA, filmB) => {
  return filmB.film_info.total_rating - filmA.film_info.total_rating;
};

export const getWatchedFilms = (films) => {
  return films.filter((film) => film.user_details.already_watched).length;

};
