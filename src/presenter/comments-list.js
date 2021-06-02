import CommentView from '../view/comments.js';
import {render} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';


export default class Comments {
  constructor(container, comment, commentsModel, changeData, card) {
    this._container = container;
    this._comment = comment;
    this._commentsModel = commentsModel;
    this._changeData = changeData;
    this._card = card;

    this._commentComponent = new CommentView(this._comment);

    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init() {
    this._renderComments();

    this._commentComponent.setDeleteClickHandler(this._handleDeleteClick);

  }

  _handleDeleteClick() {

    this._commentsModel.deleteComment(UpdateType.PATCH, this._comment);

    const newCard = JSON.parse(JSON.stringify(this._card));
    const newCommentsList = [];
    this._commentsModel.getComments().forEach((card) => {
      return newCommentsList.push(card.id);
    });
    newCard.comments = newCommentsList;
    this._changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, this._comment, newCard);

  }

  _renderComments() {
    render(this._container,  this._commentComponent);
  }


}
