
import {FilterType} from '../const';

export const filter = {
  [FilterType.ALL]: (cards) => cards.filter((card) => card),
  [FilterType.WATCH_LIST]: (cards) => cards.filter((card) => card.user_details.watchlist),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.user_details.already_watched),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.user_details.favorite),
};