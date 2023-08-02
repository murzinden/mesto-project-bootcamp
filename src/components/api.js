
import {
  apiConfig
} from "./constants";


function handleResponse(response) {
  if (response.ok) {
    return response.json()
  } else {
    return Promise.reject(response.status)
  }
}

function getRequest(endpoint, method, body) {
  const fetchInit = {
    method: method,
    headers: apiConfig.headers
  }

  return fetch(`${apiConfig.baseUrl}${endpoint}`, body
    ? {...fetchInit, body: JSON.stringify(body)}
    : fetchInit
  ).then(handleResponse)

}

const getProfileInfo = () => getRequest('users/me','GET');

const getCards = () => getRequest('cards','GET');

const updateProfileInfo = (profileInfo) => getRequest('users/me','PATCH',profileInfo);

const addCard = (card) => getRequest('cards', 'POST', card);

const deleteCard = (cardId) => getRequest(`cards/${cardId}`,'DELETE');

const addLike = (id) => getRequest(`cards/likes/${id}`,'PUT');

const deleteLike = (id) => getRequest(`cards/likes/${id}`,'DELETE');

const updateAvatar = (avatar) => getRequest('users/me/avatar', 'PATCH', avatar);

export {
  getProfileInfo,
  getCards,
  updateProfileInfo,
  addCard,
  deleteCard,
  addLike,
  deleteLike,
  updateAvatar
}
