import dayjs from 'dayjs';
import {DatePeriod} from '../const.js';

export const getWatchedFilmByRange = (cards, period) => {
  if (period === DatePeriod.ALL_TIME) {
    return cards.filter((card) => card.user_details.alreadyWatched);
  }

  return cards.filter((card) => card.user_details.alreadyWatched && dayjs().diff(dayjs(card.user_details.watchingDate), period) === 0);
};

export const getWatchedFilmByRank = (cards) => {
  const watchedFilms = cards.filter((card) => card.user_details.alreadyWatched);
  return watchedFilms;
};

const calculateGenres = (acc, genre) => {
  acc[genre] = acc[genre] ? acc[genre] + 1 : 1;

  return acc;
};

export const getFilmGenresStat = (cards) => {
  const genres = cards.reduce(
      (acc, card) => card.film_info.genre.reduce(calculateGenres, acc),
      {}
  );

  return Object.entries(genres).sort(([, a], [, b]) => b - a);
};
