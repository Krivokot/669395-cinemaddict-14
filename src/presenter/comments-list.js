import CommentView from '../view/comments.js';
import {render, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';


export default class Comments {
  constructor(container, comment, commentsModel, changeData) {
    this._container = container;
    this._comment = comment;
    this._commentsModel = commentsModel;
    this._changeData = changeData;

    this._commentComponent = new CommentView(this._comment);

    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init() {
    this._renderComments();

    this._commentComponent.setDeleteClickHandler(this._handleDeleteClick);

  }

  _handleDeleteClick() {
    this._commentsModel.deleteComment(UpdateType.MINOR, this._comment);
    this._changeData(UserAction.DELETE_COMMENT, UpdateType.MINOR, this._comment);
  }

  _renderComments() {
    render(this._container,  this._commentComponent);
  }


}
