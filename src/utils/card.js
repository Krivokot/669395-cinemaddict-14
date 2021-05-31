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

  const weight = getWeightForNullDate(cardA.filmInfo.release.date, cardB.filmInfo.release.date);

  if (weight !== null) {
    return weight;
  }

  return dayjs(cardB.filmInfo.release.date).diff(dayjs(cardA.filmInfo.release.date));
};

export const sortRating = (filmA, filmB) => {
  return filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
};

export const getWatchedFilms = (films) => {
  return films.filter((film) => film.userDetails.alreadyWatched).length;
};
