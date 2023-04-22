// === PopUp ===

const button = document.querySelector('#open-popup');
const el = document.querySelector('#pop-el');
const closeButton = document.querySelector('#pop-close');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#username');
const jobInput = formElement.querySelector('#profession');

const profileTitle = document.querySelector('#profile-title');
const profileSubtitle = document.querySelector('#profile-subtitle');

function addClass() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  el.classList.add('popup_opened');
}
function removeClass() {
  el.classList.remove('popup_opened');
}

button.addEventListener('click', addClass);

closeButton.addEventListener('click', removeClass);

// === PopUp-Profile-Form ===


function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const nameElement = document.querySelector('#username');
  const jobElement = document.querySelector('#profession');

  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  const popup = document.querySelector('#pop-el');
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);


// === Element ===

const buttonAddCard = document.querySelector('#open-form-card');
const elPopUp = document.querySelector('#pop-card');
const closeButtonCard = document.querySelector('#pop-card-close');

function addClassForm() {
  elPopUp.classList.add('popup_opened');
}
function removeClassForm() {
  elPopUp.classList.remove('popup_opened');
}

buttonAddCard.addEventListener('click', addClassForm);
closeButtonCard.addEventListener('click', removeClassForm);


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

  nameCardInput.value = '';
  linkCardInput.value = '';

  removeClassForm();
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Заполнение начальных карточек
initialCards.forEach((card) => {
  addCard(card.name, card.link);
});


// === ADD Like ===

function toggleLike(event) {
  const heartElement = event.target;
  heartElement.classList.toggle('element__heart_liked');
}

const heartElements = document.querySelectorAll('.element__heart');

heartElements.forEach((heart) => {
  heart.addEventListener('click', toggleLike);
});

// === Delete Button Card ===


function deleteCard(event) {
  const deleteElement = event.target;
  const cardElement = deleteElement.closest('.element');
  cardElement.remove();
}

const deleteElements = document.querySelectorAll('.element__delete');

deleteElements.forEach((deleteElement) => {
  deleteElement.addEventListener('click', deleteCard);
});

