import {render, remove, RenderPosition} from '../framework/render.js';
import FormEventView from '../view/form-event-view.js';
import { UserAction, UpdateType } from '../constants.js';

export default class NewEventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #eventsModel = null;
  #eventFormComponent = null;
  #handleDestroyCheck = null;


  constructor({eventListContainer, eventsModel, onDataChange, onDestroy, onNewEventDestroyCheck}) {
    this.#eventListContainer = eventListContainer;
    this.#eventsModel = eventsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#handleDestroyCheck = onNewEventDestroyCheck;
  }

  init() {
    if (this.#eventFormComponent !== null) {
      return;
    }
    this.#eventFormComponent = new FormEventView({
      destinationsData: [...this.#eventsModel.destinations],
      offersData: [...this.#eventsModel.offers],
      onFormSubmit: this.#handleFormSubmit,
      onFormDelete: this.#handleFormDelete,
      onformRollUp: this.#handleFormDelete,
    });
    const newFormContainer = document.querySelector('.trip-events__list');
    render(this.#eventFormComponent, newFormContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventFormComponent === null) {
      return;
    }

    this.#handleDestroy();
    this.#handleDestroyCheck();

    remove(this.#eventFormComponent);
    this.#eventFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#eventFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      event,
    );
  };

  #handleFormDelete = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
