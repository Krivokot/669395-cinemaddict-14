import dayjs from 'dayjs';
import {DatePeriod} from '../const.js';

export const getWatchedFilmByRange = (cards, period) => {
  const watchedFilm = cards.filter((card) => card.user_details.already_watched);
  if (period === DatePeriod.ALL_TIME) {
    return watchedFilm;
  }

  return cards.filter((card) => card.user_details.already_watched && dayjs().diff(dayjs(card.user_details.watching_date), period) === 0);
};

export const getWatchedFilmByRank = (cards) => {
  const watchedFilms = cards.filter((card) => card.user_details.already_watched);
  return watchedFilms;
};

export const getFilmGenresStat = (cards) => {
  const results = {};

  cards.reduce((acc, card) => acc.concat(card.film_info.genre), [])
    .forEach((genre) => {
      if (results[genre]) {
        results[genre]++;
        return;
      }
      results[genre] = 1;
    });
  return Object.entries(results).sort((a, b) =>b[1] - a[1]);
};
