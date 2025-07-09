const day = document.querySelectorAll('.calendar__day'); //колекция всех дней
const checkbox = document.querySelector('.checkbox__input'); //переключатель темы

let selectedItems = []; //массив для хранения индексов выбранных дат

day.forEach((item, index) => { //проход по каждому элементу коллекции для отследивания клика на определенный день (в item хранится сам элемент, в index его индекс в коллекции) 
  item.addEventListener('click', function () { //навешивание события по клику 
    // Если элемент уже выбран, удаляем его из массива
    if (selectedItems.includes(index)) { //includes проверяет содерит ли массив индекс элемента
      selectedItems.splice(selectedItems.indexOf(index), 1); //если индекс уже есть, то удаляем его из массива
      this.classList.remove('selected', 'selected-dark'); //также удаляем у элемента классы выбора
    } else {
      // Если выбрано уже 2 элемента, сначала очищаем выбор
      if (selectedItems.length >= 2) {
        day[selectedItems[0]].classList.remove('selected', 'selected-dark'); //удаляет классы выбора для первого элемента в массиве
        selectedItems.shift(); //shift удаляет первый элемент в массиве
      }
      // Добавляем новый элемент
      selectedItems.push(index); //push добавляет новый элемент в конец массива
      if (checkbox.checked) { // проверка на переключатель темы
        this.classList.add('selected-dark'); //если checked добавляет класс для темной темы
      } else {
        this.classList.add('selected'); //иначе добавляет класс для светлой темы 
      }
    }

    // Обновляем классы для элементов day
    updateDayClasses(); //вызов функции
  });
});

function updateDayClasses() {
  // Сначала удаляем все активные классы
  day.forEach(dayItem => {
    dayItem.classList.remove('active', 'active-dark', 'selected__start', 'selected__start-dark', 'selected__end', 'selected__end-dark');
  });

  // Если выбрано 2 элемента
  if (selectedItems.length === 2) {
    // Сортируем индексы по возрастанию
    const [start, end] = selectedItems.slice().sort((a, b) => a - b); //slice создает копию массива, затем сортируем в порядке возрастания

    // Добавляем классы в зависимости от состояния чекбокса
    if (checkbox.checked) {
      day[start].classList.add('selected__start-dark');
      day[end].classList.add('selected__end-dark');
      // Добавляем класс active-dark для элементов между start и end
      for (let i = start + 1; i < end; i++) {
        day[i].classList.add('active-dark');
      }
    } else {
      day[start].classList.add('selected__start');
      day[end].classList.add('selected__end');
      // Добавляем класс active для элементов между start и end
      for (let i = start + 1; i < end; i++) {
        day[i].classList.add('active');
      }
    }
  }
}

checkbox.addEventListener('change', function () {
  // Обновляем все классы при изменении чекбокса
  updateDayClasses();

  // Обновляем классы выбранных элементов
  day.forEach(item => {
    if (item.classList.contains('selected') || item.classList.contains('selected-dark') || item.classList.contains('calendar__day') || item.classList.contains('calendar__day-dark')) {
      if (this.checked) {
        item.classList.replace('selected', 'selected-dark');
        item.classList.replace('calendar__day', 'calendar__day-dark');
      } else {
        item.classList.replace('selected-dark', 'selected');
        item.classList.replace('calendar__day-dark', 'calendar__day');
      }
    }
  });

  // Обновляем классы кнопок навигации
  const prev = document.querySelector('.calendar__header_prev, .calendar__header_prev-dark');
  const next = document.querySelector('.calendar__header_next, .calendar__header_next-dark');

  if (this.checked) {
    prev.classList.replace('calendar__header_prev', 'calendar__header_prev-dark');
    next.classList.replace('calendar__header_next', 'calendar__header_next-dark');
  } else {
    prev.classList.replace('calendar__header_prev-dark', 'calendar__header_prev');
    next.classList.replace('calendar__header_next-dark', 'calendar__header_next');
  }
});