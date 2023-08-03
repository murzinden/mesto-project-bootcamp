import {
  popupView,
  cardTemplate,
  popupImage,
  popupCaption,
} from '../components/constants.js';

import {
  openPopup
} from '../components/modal.js'

import {
  addLike,
  deleteLike
} from '../components/api.js';

function updateLikeUI(cardHeart, likesCountElement, likes) {
  cardHeart.classList.toggle('element__heart_liked');
  likesCountElement.textContent = likes.length;
}

// async function onAddLike(card) {
//   if (card && card._id) {
//     await addLike(card._id);
//   }
// }

// async function onDeleteLike(card) {
//   if (card && card._id) {
//     await deleteLike(card._id);
//   }
// }


// Удаление элемента карточки
function onDeleteCardElement(cardElement) {
  cardElement.remove()
}


async function onAddLike(cardId) {
  try {
    const response = await addLike(cardId);
    return response.likes;
  } catch (error) {
    console.error(error);
  }
}

async function onDeleteLike(cardId) {
  try {
    const response = await deleteLike(cardId);
    return response.likes;
  } catch (error) {
    console.error(error);
  }
}

const createCard = (card, myId, handleDeleteCard) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__delete').addEventListener('click', (e) => {
    handleDeleteCard(card, e.target.closest('.element'))
  })

  if (myId === card.owner._id) {
    cardElement.querySelector('.element__delete').classList.add('element__delete_show')
  }

  cardElement.querySelector('.element__likes-count').textContent = card.likes.length

  cardElement.querySelector('.element__title').textContent = card.name;
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', () => {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;
    openPopup(popupView);
  });

  // addLike

  // const cardHeart = cardElement.querySelector('.element__heart');
  // const likesCountElement = cardElement.querySelector('.element__likes-count');
  // cardHeart.addEventListener('click', () => {
  //   cardHeart.classList.toggle('element__heart_liked');
  //   if (cardHeart.classList.contains('element__heart_liked')) {
  //     card.likes.push(myId);
  //     onAddLike(card)
  //   } else {
  //     const index = card.likes.indexOf(myId);
  //     if (index > -1) {
  //       card.likes.splice(index, 1);
  //       onDeleteLike(card);
  //     }
  //   }
  //   likesCountElement.textContent = card.likes.length;
  // });

  const cardHeart = cardElement.querySelector('.element__heart');
  const likesCountElement = cardElement.querySelector('.element__likes-count');

  cardHeart.addEventListener('click', async () => {
    if (cardHeart.classList.contains('element__heart_liked')) {
      onDeleteLike(card._id)
        .then((likes) => updateLikeUI(cardHeart, likesCountElement, likes))
        .catch((error) => console.error("Ошибка при удалении лайка", error));
    } else {
      onAddLike(card._id)
        .then((likes) => updateLikeUI(cardHeart, likesCountElement, likes))
        .catch((error) => console.error("Ошибка при добавлении лайка", error));
    }
  });



  return cardElement;
};



export { createCard, onAddLike, onDeleteCardElement }


