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

  deleteComment(updateType, update) {
    console.log(this._cards);
    const index = this._cards.findIndex((card) => {
      return card.id
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
      card,
      {
        card
      },
    );


    return adaptedCard;
  }

  static adaptToServer(card) {
    const adaptedCard = Object.assign(
      {},
      card,
      {
        card
      },
    );



    return adaptedCard;
  }
}
