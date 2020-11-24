// адрес express-сервера
const API_URL = 'http://localhost:3017/api';

// ф-ия отправляет DELETE-запрос
export function delClient(id) {
  return fetch(API_URL + '/clients/' + id, {
    method: 'DELETE',
  }).then(function (res) {
    return res.json();
  });
}

// ф-ия отправляет GET-запрос и возвращает промис с записью с определенным id
export function getClient(id) {
  return fetch(API_URL + '/clients/' + id).then(function (res) {
    return res.json();
  });
}

// ф-ия отправляет GET-запрос и возвращает промис со всеми записями
export function getClients() {
  return fetch(API_URL + '/clients').then(function (res) {
    return res.json();
  });
}

// ф-ия отправляет POST-запрос и возвращает промис с новой записью
export function postClient(formData) {
  return fetch(API_URL + '/clients', {
    method: 'POST',
    headers: new Headers(),
    body: formData,
  }).then(function (res) {
    return res.json();
  });
}

// ф-ия отправляет PUT-запрос и возвращает промис с измененной записью
export function putClient(id, formData) {
  return fetch(API_URL + '/clients/' + id, {
    method: 'PUT',
    headers: new Headers(),
    body: formData,
  }).then(function (res) {
    return res.json();
  });
}
