import CommentView from '../view/comments.js';
import {render, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';


export default class Comments {
  constructor(container, comment, commentsModel, changeData) {
    this._container = container;
    this._comment = comment
    this._commentsModel = commentsModel;
    this._changeData = changeData;

    this._commentComponent = new CommentView(this._comment);

    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._renderComments();

    this._commentComponent.setDeleteClickHandler(this._handleDeleteClick);

  }


  _handleDeleteClick() {
    this._handleViewAction(UserAction.DELETE_COMMENT, UpdateType.MINOR, this._comment);

  }

  _handleViewAction(actionType, updateType, update) {
    this._commentsModel.addObserver(this._handleModelEvent);
    switch (actionType) {
        case UserAction.ADD_COMMENT:
        this._commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComment(updateType, update);
        this._changeData(UserAction.DELETE_COMMENT, UpdateType.PATCH, update);
        break;
    }

  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.PATCH:
      console.log('patch');
      case UpdateType.MINOR:
      console.log('minor');
      this.destroy();
        break;
      case UpdateType.MAJOR:
      console.log('major');
        break;
    }
  }

  destroy() {

    remove(this._commentComponent);

    this._commentsModel.removeObserver(this._handleModelEvent);
  }

  _renderComments() {
    render(this._container,  this._commentComponent)
  }


}
