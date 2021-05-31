import Observer from '../utils/observer.js';

export default class Cards extends Observer {
  constructor() {
    super();
    this._cards = [];
  }

  setCards(updateType ,cards) {
    this._cards = cards.slice();

    this._notify(updateType);
  }

  getCards() {
    return this._cards;
  }

  updateCard(updateType, update) {
    const index = this._cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting card');
    }

    this._cards = [
      ...this._cards.slice(0, index),
      update,
      ...this._cards.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addCard(updateType, update) {
    this._cards = [
      update,
      ...this._cards,
    ];

    this._notify(updateType, update);
  }

  deleteCard(updateType, update) {
    const index = this._cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting card');
    }

    this._cards = [
      ...this._cards.slice(0, index),
      ...this._cards.slice(index + 1),
    ];

    this._notify(updateType);
  }

  addComment(updateType, comment) {

    this._cards.comments = [
      comment.id,
    ];

    this._notify(updateType, comment);
  }

  deleteComment(updateType, update) {
    const index = this._cards.findIndex((card) => {
      return card.id;
    });

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }
    const card = this._cards[index];
    let cardComments = card.comments;
    cardComments = cardComments.filter((comment) => comment.id !== update.id);
    card.comments = cardComments;

    this._notify(updateType, card);

  }


  static adaptToClient(card) {
    const adaptedCard = Object.assign(
      {},
      {
        comments: card.comments,
        film_info: {
          actors: card.film_info.actors,
          ageRating: card.film_info.age_rating,
          alternativeTitle: card.film_info.alternative_title,
          description: card.film_info.description,
          director: card.film_info.director,
          genre: card.film_info.genre,
          poster: card.film_info.poster,
          release: {
            date: card.film_info.release.date,
            releaseCountry: card.film_info.release.release_country,
          },
          runtime: card.film_info.runtime,
          title: card.film_info.title,
          totalRating: card.film_info.total_rating,
          writers: card.film_info.writers,
        },
        id: card.id,
        user_details: {
          alreadyWatched: card.user_details.already_watched,
          favorite: card.user_details.favorite,
          watchingDate: card.user_details.watching_date,
          watchlist: card.user_details.watchlist,
        },
      },
    );

    return adaptedCard;
  }

  static adaptToServer(card) {
    const adaptedCard = Object.assign(
      {},
      {
        comments: card.comments,
        film_info: {
          actors: card.film_info.actors,
          age_rating: card.film_info.ageRating,
          alternative_title: card.film_info.alternativeTitle,
          description: card.film_info.description,
          director: card.film_info.director,
          genre: card.film_info.genre,
          poster: card.film_info.poster,
          release: {
            date: card.film_info.release.date,
            release_country: card.film_info.release.releaseCountry,
          },
          runtime: card.film_info.runtime,
          title: card.film_info.title,
          total_rating: card.film_info.totalRating,
          writers: card.film_info.writers,
        },
        id: card.id,
        user_details: {
          already_watched: card.user_details.alreadyWatched,
          favorite: card.user_details.favorite,
          watching_date: card.user_details.watchingDate,
          watchlist: card.user_details.watchlist,
        },
      },

    );

    return adaptedCard;
  }
}
