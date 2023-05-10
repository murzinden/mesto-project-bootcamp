// === PopUp ===

const button = document.querySelector('#open-popup');
const el = document.querySelector('#pop-el');
const closeButton = document.querySelector('#pop-close');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#username');
const jobInput = formElement.querySelector('#profession');

const profileTitle = document.querySelector('#profile-title');
const profileSubtitle = document.querySelector('#profile-subtitle');

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function addClass() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(el);
}
function removeClass() {
  el.classList.remove('popup_opened');
}

button.addEventListener('click', addClass);

// === PopUp-Profile-Form ===


const profileForm = document.querySelector('#profile-form');
const submitButton = document.querySelector('#submit-button');

const nameError = document.querySelector('#username-error');
const professionError = document.querySelector('#profession-error');

function validateInput(inputElement, errorElement) {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.valueMissing) {
      errorElement.textContent = 'Вы пропустили это поле.';
    } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
      errorElement.textContent = `Минимальное количество символов ${inputElement.minLength}.
      Длина текста сейчас: ${inputElement.value.length} символ`;
    }
    errorElement.classList.add('popup__input-error_visible');
  } else {
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_visible');
  }
}

profileForm.addEventListener('input', () => {
  validateInput(nameInput, nameError);
  validateInput(jobInput, professionError);

  if (profileForm.checkValidity()) {
    submitButton.disabled = false;
    submitButton.style.background = '#000';
  } else {
    submitButton.disabled = true;
    submitButton.style.border = '1px solid #c4c4c4';
    submitButton.style.background = '#fff';
    submitButton.style.color = '#c4c4c4';
  }
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  el
  closePopup(el);
};

formElement.addEventListener('submit', handleFormSubmit);


// === Element ===

const buttonAddCard = document.querySelector('#open-form-card');
const elPopUp = document.querySelector('#pop-card');
const closeButtonCard = document.querySelector('#pop-card-close');

function addClassForm() {
  openPopup(elPopUp);
}
function removeClassForm() {
  closePopup(elPopUp);
}

buttonAddCard.addEventListener('click', addClassForm);

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


const cardFormElement = document.querySelector('#form-card');
const nameCardInput = cardFormElement.querySelector('#name-card-input');
const linkCardInput = cardFormElement.querySelector('#link-card-input');
const elements = document.querySelector('.elements');

function createCard(name, link) {
  const template = document.querySelector('.element-template');
  const cardElement = template.content.querySelector('.element').cloneNode(true);

  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = link;
  cardImage.alt = name;

  const cardTitle = cardElement.querySelector('.element__title');
  cardTitle.textContent = name;

  const heartElement = cardElement.querySelector('.element__heart');
  heartElement.addEventListener('click', toggleLike);

  const deleteElement = cardElement.querySelector('.element__delete');
  deleteElement.addEventListener('click', deleteCard);

  return cardElement;
}

function addCard(name, link) {
  const newCardElement = createCard(name, link);
  elements.prepend(newCardElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameCardInput.value;
  const linkValue = linkCardInput.value;

  addCard(nameValue, linkValue);

  evt.target.reset();

  removeClassForm();
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach((card) => {
  addCard(card.name, card.link);
});

// === ADD Like ===

function toggleLike(event) {
  event.stopPropagation();
  event.preventDefault();

  const heartElement = event.target;
  heartElement.classList.toggle('element__heart_liked');
}

const heartElements = document.querySelectorAll('.element__heart');

// === Delete Button Card ===


function deleteCard(event) {
  const deleteElement = event.target;
  const cardElement = deleteElement.closest('.element');
  cardElement.remove();
}

const deleteElements = document.querySelectorAll('.element__delete');


// === PopUp Image Full ===

document.addEventListener('DOMContentLoaded', () => {
  const popupView = document.querySelector('#popup-view');
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  function openImagePopup(event) {
    if (event.target.classList.contains('element__image')) {
      const imageUrl = event.target.src;
      const imageAlt = event.target.alt;
      popupImage.src = imageUrl;
      popupImage.alt = imageAlt;
      popupCaption.textContent = imageAlt;
      openPopup(popupView);
    }
  }

  const elementsContainer = document.querySelector('.elements');
  elementsContainer.addEventListener('click', openImagePopup);
});
