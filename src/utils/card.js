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

  return dayjs(cardA.film_info.release.date).diff(dayjs(cardB.film_info.release.date));
};

export const sortRating = (cards) => {
  const sortCardsByRating = (a,b) => {
    if (a.film_info.total_rating > b.film_info.total_rating) {
      return 1;
    }
    if (a.film_info.total_rating < b.film_info.total_rating) {
      return -1;
    }
    return 0;
  };
  cards.sort(sortCardsByRating);
};
