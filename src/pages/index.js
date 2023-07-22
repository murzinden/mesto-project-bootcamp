import '../pages/index.css';

import { enableValidation, clearInputErrors } from '../components/validate.js';
import {
  config,
  elementsSection,
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
} from '../components/constants.js';
import { createCard } from '../components/card.js';
import {
  openPopup,
  closePopup,
  closeByOverlayClick,
  closeByEscKey
} from '../components/modal.js';


enableValidation(config);

// open&close popup

document.addEventListener('click', closeByOverlayClick);
document.addEventListener('keydown', closeByEscKey);

const setProfileInfo = (title, subtitle) => {
  userNameInput.value = title;
  professionInput.value = subtitle;
}

// editProfilePopup
profileEditButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  clearInputErrors(editProfilePopup);
  setProfileInfo(profileTitle.textContent, profileSubTitle.textContent);
});


editProfilePopup.querySelector('.popup__close').addEventListener('click', () => closePopup(editProfilePopup));

// addPlacePopup
profileAddButton.addEventListener('click', () => {
  openPopup(addPlacePopup);
  clearInputErrors(addPlacePopup);
});

addPlacePopup.querySelector('.popup__close').addEventListener('click', () => closePopup(addPlacePopup));

// closeImagePopup
popupView.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupView);
});

// editProfile
const handleFormEditSubmit = evt => {
  evt.preventDefault();

  profileTitle.textContent = userNameInput.value;
  profileSubTitle.textContent = professionInput.value;

  closePopup(editProfilePopup);
};

form.addEventListener('submit', handleFormEditSubmit);

// addCard

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



