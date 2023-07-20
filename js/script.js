
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');

const profileEditButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('#editProfilePopup');
const profileAddButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('#addPlacePopup');
const userNameError = document.querySelector('.popup__input-error');
const professionError = document.querySelector('#profession-error');

const form = document.querySelector('.popup__form');

const saveButton = document.querySelector('.popup__button');

const elementsSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;

const formPlace = document.querySelector('#form-place');
const placeInput = formPlace.querySelector('input[name="card-name"]');
const urlInput = formPlace.querySelector('input[name="card-image"]');
const placeError = document.querySelector('#place-error');
const urlError = document.querySelector('#url-error');
const saveButtonPlace = formPlace.querySelector('.popup__button');

const popupView = document.querySelector('.popup_view');
const popupImage = popupView.querySelector('.popup__image');
const popupCaption = popupView.querySelector('.popup__caption');


// open&close popup
const openPopup = popup => {
  popup.classList.add('popup_opened');
}
const closePopup = popup => {
  popup.classList.remove('popup_opened');
}

const closeByOverlayClick = event => {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}

const closeByEscKey = event => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    openedPopup && closePopup(openedPopup);
  }
}

document.addEventListener('click', closeByOverlayClick);
document.addEventListener('keydown', closeByEscKey);


// editProfilePopup
profileEditButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  toggleButtonState(saveButton, [userNameInput, professionInput]);
});
editProfilePopup.querySelector('.popup__close').addEventListener('click', () => closePopup(editProfilePopup));

// addPlacePopup
profileAddButton.addEventListener('click', () => {
  openPopup(addPlacePopup);
  toggleButtonState(saveButtonPlace, [placeInput, urlInput]);
});

addPlacePopup.querySelector('.popup__close').addEventListener('click', () => closePopup(addPlacePopup));

// closeImagePopup
popupView.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupView);
});

// editProfile
const handleFormSubmit = evt => {
  evt.preventDefault();

  const userNameInput = document.querySelector('input[name="username"]');
  const professionInput = document.querySelector('input[name="profession"]');

  profileTitle.textContent = userNameInput.value;
  profileSubTitle.textContent = professionInput.value;

  closePopup(editProfilePopup);
};

form.addEventListener('submit', handleFormSubmit);


// valid form


const checkInputValidity = (inputElement, errorElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
  } else {
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
  }
};

const toggleButtonState = (button, inputs, inactiveButtonClass) => {
  const isValid = inputs.every(input => input.validity.valid);

  if (isValid) {
    button.removeAttribute('disabled');
    button.classList.remove(inactiveButtonClass);
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(inactiveButtonClass);
  }
}


const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const submitButton = form.querySelector(submitButtonSelector);

    inputs.forEach((input) => {
      const errorElement = form.querySelector(`#${input.id.replace('-input', '')}-error`);

      input.addEventListener('input', () => {
        checkInputValidity(input, errorElement, inputErrorClass, errorClass);
        toggleButtonState(submitButton, inputs, inactiveButtonClass);
      });
    });
    toggleButtonState(submitButton, inputs, inactiveButtonClass);
  });
};




enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error_visible',
  errorClass: 'popup__input-error'
});



// addCard

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


const createCard = (name, link) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__title').textContent = name;
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener('click', () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(popupView);
  });

  // addLike

  const cardHeart = cardElement.querySelector('.element__heart');
  cardHeart.addEventListener('click', () => {
    cardHeart.classList.toggle('element__heart_liked');
  });

  // buttonDelete

  elementsSection.addEventListener('click', (event) => {
    if (event.target.classList.contains('element__delete')) {
      event.target.closest('.element').remove();
    }
  });

  return cardElement;
};


initialCards.forEach(card => {
  const cardElement = createCard(card.name, card.link);
  elementsSection.append(cardElement);
});

formPlace.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = placeInput.value;
  const link = urlInput.value;
  const cardElement = createCard(name, link);
  elementsSection.prepend(cardElement);

  closePopup(addPlacePopup);

  placeInput.value = '';
  urlInput.value = '';

});



// // === PopUp ===

// const button = document.querySelector('#open-popup');
// const el = document.querySelector('#pop-el');
// const closeButton = document.querySelector('#pop-close');

// const formElement = document.querySelector('.popup__form');
// const nameInput = formElement.querySelector('#username');
// const jobInput = formElement.querySelector('#profession');

// const profileTitle = document.querySelector('#profile-title');
// const profileSubtitle = document.querySelector('#profile-subtitle');

// const closeButtons = document.querySelectorAll('.popup__close');

// const popups = document.querySelectorAll('.popup');

// popups.forEach((popup) => {

//   popup.addEventListener('click', (evt) => {
//     if (evt.target === evt.currentTarget) {
//       closePopup(popup);
//     }
//   });
// });


// document.addEventListener('keydown', (evt) => {
//   if (evt.key === 'Escape') {
//     popups.forEach((popup) => {
//       if (popup.classList.contains('popup_opened')) {
//         closePopup(popup);
//       }
//     });
//   }
// });


// closeButtons.forEach((button) => {
//   const popup = button.closest('.popup');

//   button.addEventListener('click', () => closePopup(popup));
// });

// function openPopup(popup) {
//   popup.classList.add('popup_opened');
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
// }


// function addClass() {
//   nameInput.value = profileTitle.textContent;
//   jobInput.value = profileSubtitle.textContent;
//   openPopup(el);
// }

// function removeClass() {
//   el.classList.remove('popup_opened');
// }


// button.addEventListener('click', addClass);

// // === PopUp-Profile-Form ===


// const profileForm = document.querySelector('#profile-form');
// const submitButton = document.querySelector('#submit-button');

// const nameError = document.querySelector('#username-error');
// const professionError = document.querySelector('#profession-error');


// function validateInput(inputElement, errorElement) {
//   if (!inputElement.validity.valid) {
//     if (inputElement.validity.valueMissing) {
//       errorElement.textContent = 'Вы пропустили это поле.';
//     } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
//       errorElement.textContent = `Минимальное количество символов ${inputElement.minLength}.
//       Длина текста сейчас: ${inputElement.value.length} символ`;
//     }
//     errorElement.classList.add('popup__input-error_visible');
//   } else {
//     errorElement.textContent = '';
//     errorElement.classList.remove('popup__input-error_visible');
//   }
// }


// profileForm.addEventListener('input', () => {
//   validateInput(nameInput, nameError);
//   validateInput(jobInput, professionError);

//   if (profileForm.checkValidity()) {
//     submitButton.disabled = false;
//     submitButton.style.background = '#000';
//   } else {
//     submitButton.disabled = true;
//     submitButton.style.border = '1px solid #c4c4c4';
//     submitButton.style.background = '#fff';
//     submitButton.style.color = '#c4c4c4';
//   }
// });

// function handleFormSubmit(evt) {
//   evt.preventDefault();

//   profileTitle.textContent = nameInput.value;
//   profileSubtitle.textContent = jobInput.value;

//   closePopup(el);
// };

// formElement.addEventListener('submit', handleFormSubmit);


// // === Element ===

// const buttonAddCard = document.querySelector('#open-form-card');
// const elPopUp = document.querySelector('#pop-card');
// const closeButtonCard = document.querySelector('#pop-card-close');


// function addClassForm() {
//   openPopup(elPopUp);
// }

// function removeClassForm() {
//   closePopup(elPopUp);
// }

// buttonAddCard.addEventListener('click', addClassForm);


// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];


// const cardFormElement = document.querySelector('#form-card');
// const nameCardInput = cardFormElement.querySelector('#name-card-input');
// const linkCardInput = cardFormElement.querySelector('#link-card-input');
// const elements = document.querySelector('.elements');

// const cardNameError = document.querySelector('#name-card-error');
// const cardLinkError = document.querySelector('#link-card-error');
// const cardSubmitButton = cardFormElement.querySelector('.popup__button');

// function validateCardNameInput(inputElement, errorElement) {
//   if (!inputElement.validity.valid) {
//     if (inputElement.validity.valueMissing) {
//       errorElement.textContent = 'Вы пропустили это поле.';
//     } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
//       errorElement.textContent = `Минимальное количество символов ${inputElement.minLength}.
//       Длина текста сейчас: ${inputElement.value.length} символ`;
//     }
//     errorElement.classList.add('popup__input-error_visible');
//   } else {
//     errorElement.textContent = '';
//     errorElement.classList.remove('popup__input-error_visible');
//   }
// }

// function validateCardImageInput(inputElement, errorElement) {
//   if (!inputElement.validity.valid) {
//     if (inputElement.validity.valueMissing) {
//       errorElement.textContent = 'Вы пропустили это поле.';
//     } else if (inputElement.validity.typeMismatch) {
//       errorElement.textContent = 'Введите адрес сайта';
//     }
//     errorElement.classList.add('popup__input-error_visible');
//   } else {
//     errorElement.textContent = '';
//     errorElement.classList.remove('popup__input-error_visible');
//   }
// }


// cardFormElement.addEventListener('input', () => {
//   validateCardNameInput(nameCardInput, cardNameError);
//   validateCardImageInput(linkCardInput, cardLinkError);

//   if (cardFormElement.checkValidity()) {
//     cardSubmitButton.disabled = false;
//     cardSubmitButton.style.background = '#000';
//   } else {
//     cardSubmitButton.disabled = true;
//     cardSubmitButton.style.border = '1px solid #c4c4c4';
//     cardSubmitButton.style.background = '#fff';
//     cardSubmitButton.style.color = '#c4c4c4';
//   }
// });


// function createCard(name, link) {
//   const template = document.querySelector('.element-template');
//   const cardElement = template.content.querySelector('.element').cloneNode(true);
//   const cardImage = cardElement.querySelector('.element__image');
//   cardImage.src = link;
//   cardImage.alt = name;

//   const cardTitle = cardElement.querySelector('.element__title');
//   cardTitle.textContent = name;

//   const heartElement = cardElement.querySelector('.element__heart');
//   heartElement.addEventListener('click', toggleLike);

//   const deleteElement = cardElement.querySelector('.element__delete');
//   deleteElement.addEventListener('click', deleteCard);

//   return cardElement;
// }

// function addCard(name, link) {
//   const newCardElement = createCard(name, link);
//   elements.prepend(newCardElement);
// }

// function handleCardFormSubmit(evt) {
//   evt.preventDefault();

//   const nameValue = nameCardInput.value;
//   const linkValue = linkCardInput.value;

//   addCard(nameValue, linkValue);

//   evt.target.reset();

//   removeClassForm();
// }

// cardFormElement.addEventListener('submit', handleCardFormSubmit);

// initialCards.forEach((card) => {
//   addCard(card.name, card.link);
// });

// // === ADD Like ===

// function toggleLike(event) {
//   event.stopPropagation();
//   event.preventDefault();

//   const heartElement = event.target;
//   heartElement.classList.toggle('element__heart_liked');
// }

// const heartElements = document.querySelectorAll('.element__heart');

// // === Delete Button Card ===


// function deleteCard(event) {
//   const deleteElement = event.target;
//   const cardElement = deleteElement.closest('.element');
//   cardElement.remove();
// }

// const deleteElements = document.querySelectorAll('.element__delete');


// // === PopUp Image Full ===

// document.addEventListener('DOMContentLoaded', () => {
//   const popupView = document.querySelector('#popup-view');
//   const popupImage = document.querySelector('.popup__image');
//   const popupCaption = document.querySelector('.popup__caption');

//   function openImagePopup(event) {
//     if (event.target.classList.contains('element__image')) {
//       const imageUrl = event.target.src;
//       const imageAlt = event.target.alt;
//       popupImage.src = imageUrl;
//       popupImage.alt = imageAlt;
//       popupCaption.textContent = imageAlt;
//       openPopup(popupView);
//     }
//   }

//   const elementsContainer = document.querySelector('.elements');
//   elementsContainer.addEventListener('click', openImagePopup);
// });



// function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
//   const formElement = document.querySelector(formSelector);
//   const inputs = Array.from(formElement.querySelectorAll(inputSelector));
//   const submitButton = formElement.querySelector(submitButtonSelector);

//   inputs.forEach((inputElement) => {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     inputElement.addEventListener('input', () => {
//       validateInput(inputElement, errorElement, inputErrorClass, errorClass);
//       toggleButtonState(inputs, submitButton, inactiveButtonClass);
//     });
//   });

//   formElement.addEventListener('submit', handleFormSubmit);
// }

// function validateInput(inputElement, errorElement, inputErrorClass, errorClass) {
//   if (!inputElement.validity.valid) {
//     showInputError(inputElement, errorElement, inputErrorClass, errorClass);
//   } else {
//     hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
//   }
// }



// function showInputError(inputElement, errorElement, inputErrorClass, errorClass) {
//   if (inputElement.validity.valueMissing) {
//     errorElement.textContent = 'Вы пропустили это поле.';
//   } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
//     errorElement.textContent = `Минимальное количество символов ${inputElement.minLength}.
//     Длина текста сейчас: ${inputElement.value.length} символ`;
//   }
//   inputElement.classList.add(inputErrorClass);
//   errorElement.classList.add(errorClass);
// }

// function hideInputError(inputElement, errorElement, inputErrorClass, errorClass) {
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// }

// function toggleButtonState(inputs, submitButton, inactiveButtonClass) {
//   if (hasInvalidInput(inputs)) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//   } else {
//     submitButton.classList.remove(inactiveButtonClass);
//     submitButton.disabled = false;
//   }
// }

// function hasInvalidInput(inputs) {
//   return inputs.some((inputElement) => !inputElement.validity.valid);
// }

// function handleFormSubmit(evt) {
//   evt.preventDefault();

//   profileTitle.textContent = nameInput.value;
//   profileSubtitle.textContent = jobInput.value;

//   closePopup(el);
// };

// enableValidation({
//   formSelector: '#profile-form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '#submit-button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__input-error_visible'
// });

