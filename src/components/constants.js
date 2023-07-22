const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error_visible',
  errorClass: 'popup__input-error'
}

const cardTemplate = document.querySelector('.element-template').content;
const elementsSection = document.querySelector('.elements');
const popupView = document.querySelector('.popup_view');
const popupImage = popupView.querySelector('.popup__image');
const popupCaption = popupView.querySelector('.popup__caption');

const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');

const profileEditButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('#editProfilePopup');
const profileAddButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('#addPlacePopup');

const form = document.querySelector('.popup__form');

const formPlace = document.querySelector('#form-place');
const placeInput = formPlace.querySelector('input[name="card-name"]');
const urlInput = formPlace.querySelector('input[name="card-image"]');

const userNameInput = document.querySelector('input[name="username"]');
const professionInput = document.querySelector('input[name="profession"]');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


export {
  config,
  cardTemplate,
  elementsSection,
  popupCaption,
  popupImage,
  popupView,
  profileTitle,
  profileSubTitle,
  profileEditButton,
  editProfilePopup,
  profileAddButton,
  addPlacePopup,
  form,
  formPlace,
  placeInput,
  urlInput,
  initialCards,
  userNameInput,
  professionInput
}
