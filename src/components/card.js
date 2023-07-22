import {
  elementsSection,
  popupView,
  cardTemplate,
  popupImage,
  popupCaption,
} from '../components/constants.js';

import {
  openPopup
} from '../components/modal.js'

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


export { createCard }


