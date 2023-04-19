const button = document.getElementById('open-popup');
const el = document.getElementById('pop-el');
const closeButton = document.getElementById('pop-close')

function addClass() {
  el.classList.add('popup_opened');
}
function removeClass() {
  el.classList.remove('popup_opened');
}

button.addEventListener('click', addClass);

closeButton.addEventListener('click', removeClass);


