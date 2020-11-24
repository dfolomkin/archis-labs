// ф-ия отрисовывает таблицу с данными (добавляет на страницу и структуру и данные)
export function renderClientsGrid(data, element) {
  // удаляем старые строки
  element.innerHTML = '';

  const rowEl = document.createElement('tr');

  rowEl.innerHTML =
    '<th>Id</th>' +
    '<th>First name</th>' +
    '<th>Last name</th>' +
    '<th>Gender</th>' +
    '<th>Date of birth</th>' +
    '<th>Address</th>' +
    '<th>Phone</th>' +
    '<th>E-mail</th>' +
    '<th>Actions</th>';

  element.appendChild(rowEl);

  data.forEach(function (item, index) {
    const rowEl = document.createElement('tr');

    rowEl.innerHTML =
      '<td class="js-clientId">' +
      item.id +
      '</td>' +
      '<td>' +
      item.first_name +
      '</td>' +
      '<td>' +
      item.last_name +
      '</td>' +
      '<td>' +
      item.gender +
      '</td>' +
      '<td>' +
      item.date_of_birth +
      '</td>' +
      '<td>' +
      item.address +
      '</td>' +
      '<td>' +
      item.phone +
      '</td>' +
      '<td>' +
      item.email +
      '</td>' +
      '<td>' +
      `<button class="btn btn-outline-secondary btn-sm mr-2 mb-2" data-control="edit" data-id="${item.id}">Edit</button>` +
      `<button class="btn btn-outline-danger btn-sm mr-2 mb-2" data-control="delete" data-id="${item.id}">Delete</button>` +
      '</td>';

    element.appendChild(rowEl);
  });
}

// ф-ия заполняет существующую на странице форму данными
export function setEditClientFormData(data, form) {
  form.elements.id.value = data.id;
  form.elements.first_name.value = data.first_name;
  form.elements.last_name.value = data.last_name;
  form.elements.gender.value = data.gender;
  form.elements.date_of_birth.value = data.date_of_birth;
  form.elements.address.value = data.address;
  form.elements.phone.value = data.phone;
  form.elements.email.value = data.email;
}
