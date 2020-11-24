import { renderClientsGrid, setEditClientFormData } from './utils/view';
import {
  delClient,
  getClient,
  getClients,
  postClient,
  putClient,
} from './utils/api';

const clientsGridEl = document.getElementById('clientsGrid');

// ф-ия удаляет клиента с определенным id и после обновляет таблицу клиентов
function deleteClient(id) {
  delClient(id).then(function () {
    refreshClientsGrid(clientsGridEl);
  });
}

// ф-ия получает данные клиента с определенным id и после заполняет форму этими данными для последующего редактирования
function populateEditClientForm(id) {
  getClient(id).then(function (data) {
    console.log(data);
    const form = document.forms.editClientForm;

    setEditClientFormData(data, form);
  });
}

// callback-функция обработчика событий на таблице клиентов
function clientsGridClickHandler(event) {
  const control = event.target.dataset.control;
  const id = event.target.dataset.id;

  switch (control) {
    case 'edit':
      populateEditClientForm(id);
      break;
    case 'delete':
      deleteClient(id);
      break;
    default:
      console.log(id);
  }
}

// ф-ия удаляет старые обработчики событий и добавляет новые
function addClientsGridHandlers() {
  clientsGridEl.removeEventListener('click', clientsGridClickHandler);
  clientsGridEl.addEventListener('click', clientsGridClickHandler);
}

// ф-ия получает данные всех клиентов и после обновляет таблицу клиентов
function refreshClientsGrid(element) {
  getClients().then(function (data) {
    console.log(data);

    renderClientsGrid(data, element);
    addClientsGridHandlers();
  });
}

// обновляем таблицу первый раз
refreshClientsGrid(clientsGridEl);

const addClientFormEl = document.getElementById('addClientForm');

// добавляем обработчик события на кнопку добавления нового клиента
addClientFormEl.addEventListener('submit', function (event) {
  // блокируем обработчик по-умолчанию
  event.preventDefault();

  // собираем данные формы
  const formData = new FormData(document.forms.addClientForm);

  // отправляем данные клиента и после обновляем таблицу клиентов и очищаем форму
  postClient(formData).then(function (data) {
    console.log(data);

    refreshClientsGrid(clientsGridEl);
    document.forms.addClientForm.reset();
  });
});

const editClientFormEl = document.getElementById('editClientForm');

// добавляем обработчик события на кнопку изменения данных клиента
editClientFormEl.addEventListener('submit', function (event) {
  // блокируем обработчик по-умолчанию
  event.preventDefault();

  // получаем id клиента у которого требуется обновить данные
  const id = document.forms.editClientForm.elements.id.value;
  // собираем данные формы
  const formData = new FormData(document.forms.editClientForm);

  // отправляем данные клиента с определенным id и после обновляем таблицу клиентов и очищаем форму
  putClient(id, formData).then(function (data) {
    console.log(data);

    refreshClientsGrid(clientsGridEl);
    document.forms.editClientForm.reset();
  });
});
