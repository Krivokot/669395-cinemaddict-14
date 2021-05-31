import {FilterType} from '../const';

export const filter = {
  [FilterType.ALL]: (cards) => cards.filter((card) => card),
  [FilterType.WATCH_LIST]: (cards) => cards.filter((card) => card.userDetails.watchlist),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.userDetails.favorite),
};
