const day = document.querySelectorAll('.calendar__day'); //колекция всех дней
const checkbox = document.querySelector('.checkbox__input'); //переключатель темы

let selectedItems = [];


day.forEach((item, index) => {

  item.addEventListener('click', function () {

    switch (selectedItems.length) {
      case 0:
        selectedItems.push(index);
        if (!checkbox.checked) {
          item.classList.add('selected');
        } else {
          item.classList.add('selected-dark')
        }
        break;

      case 1:
        if (selectedItems.includes(index)) {
          item.classList.remove('selected', 'selected-dark');
          selectedItems.pop();
        } else {
          selectedItems.push(index);
          addClasses();
        };
        break;

      case 2:
        if (selectedItems.includes(index)) {
          for (let i = selectedItems[0] + 1; i < selectedItems[1]; i++) {
            day[i].classList.remove('active', 'active-dark');
          }

          if (index === selectedItems[0]) {
            day[selectedItems[1]].classList.remove('selected__end', 'selected__end-dark');
            item.classList.remove('selected', 'selected-dark');
            selectedItems.splice(selectedItems.indexOf(index), 1);
          } else {
            day[selectedItems[0]].classList.remove('selected__start', 'selected__start-dark');
            item.classList.remove('selected', 'selected-dark');
            selectedItems.splice(selectedItems.indexOf(index), 1);
          }
        } else {
          day.forEach(dayItem => {
            dayItem.classList.remove('selected', 'selected-dark', 'active', 'active-dark', 'selected__start', 'selected__start-dark', 'selected__end', 'selected__end-dark');
          });
          
          selectedItems.push(index);
          selectedItems.shift();
          addClasses();
        }
        break;
    }
  });
});

const addClasses = () => {
  selectedItems.sort((a, b) => a - b);
  if (!checkbox.checked) {
    day[selectedItems[0]].classList.add('selected');
    day[selectedItems[1]].classList.add('selected');
    day[selectedItems[0]].classList.add('selected__start');
    day[selectedItems[1]].classList.add('selected__end');
    for (let i = selectedItems[0] + 1; i < selectedItems[1]; i++) {
      day[i].classList.add('active');
    }
  } else {
    day[selectedItems[0]].classList.add('selected-dark');
    day[selectedItems[1]].classList.add('selected-dark');
    day[selectedItems[0]].classList.add('selected__start-dark');
    day[selectedItems[1]].classList.add('selected__end-dark');
    for (let i = selectedItems[0] + 1; i < selectedItems[1]; i++) {
      day[i].classList.add('active-dark');
    }
  }
}

checkbox.addEventListener('change', function () { 
  
  day.forEach(item => {
    if (item.classList.contains('selected') 
        || item.classList.contains('selected-dark') 
        || item.classList.contains('selected__start') 
        || item.classList.contains('selected__start-dark')
        || item.classList.contains('selected__end')  
        || item.classList.contains('selected__end-dark') 
        || item.classList.contains('active')
        || item.classList.contains('active-dark') 
        || item.classList.contains('calendar__day') 
        || item.classList.contains('calendar__day-dark')) {
      if (this.checked) {
        item.classList.replace('selected', 'selected-dark');
        item.classList.replace('selected__start', 'selected__start-dark');
        item.classList.replace('selected__end', 'selected__end-dark');
        item.classList.replace('active', 'active-dark');
        item.classList.replace('calendar__day', 'calendar__day-dark');
      } else {
        item.classList.replace('selected-dark', 'selected');
        item.classList.replace('selected__start-dark', 'selected__start');
        item.classList.replace('selected__end-dark', 'selected__end');
        item.classList.replace('active-dark', 'active');
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

/*const days = document.querySelectorAll('.calendar__day');
const checkbox = document.querySelector('.checkbox__input');
let selectedItems = [];

// Константы для классов
const CLASSES = {
  light: {
    selected: 'selected',
    start: 'selected__start',
    end: 'selected__end',
    active: 'active',
    day: 'calendar__day',
    btn: 'calendar__header_prev',
    btnNext: 'calendar__header_next'
  },
  dark: {
    selected: 'selected-dark',
    start: 'selected__start-dark',
    end: 'selected__end-dark',
    active: 'active-dark',
    day: 'calendar__day-dark',
    btn: 'calendar__header_prev-dark',
    btnNext: 'calendar__header_next-dark'
  }
};

// Получаем текущие классы в зависимости от темы
const getThemeClasses = () => checkbox.checked ? CLASSES.dark : CLASSES.light;

// Очищаем все классы выделения
const clearSelectionClasses = () => {
  days.forEach(day => {
    day.classList.remove(
      CLASSES.light.selected, CLASSES.dark.selected,
      CLASSES.light.start, CLASSES.dark.start,
      CLASSES.light.end, CLASSES.dark.end,
      CLASSES.light.active, CLASSES.dark.active
    );
  });
};

// Добавляем классы для выделенного диапазона
const addRangeClasses = () => {
  selectedItems.sort((a, b) => a - b);
  const theme = getThemeClasses();
  
  days[selectedItems[0]].classList.add(theme.selected, theme.start);
  days[selectedItems[1]].classList.add(theme.selected, theme.end);
  
  for (let i = selectedItems[0] + 1; i < selectedItems[1]; i++) {
    days[i].classList.add(theme.active);
  }
};

// Обработчик клика по дню
const handleDayClick = (index) => {
  const clickedDay = days[index];
  const theme = getThemeClasses();

  switch (selectedItems.length) {
    case 0:
      selectedItems.push(index);
      clickedDay.classList.add(theme.selected);
      break;

    case 1:
      if (selectedItems.includes(index)) {
        clickedDay.classList.remove(theme.selected);
        selectedItems.pop();
      } else {
        selectedItems.push(index);
        clearSelectionClasses();
        addRangeClasses();
      }
      break;

    case 2:
      if (selectedItems.includes(index)) {
        // Удаляем активные дни между выделенными
        for (let i = selectedItems[0] + 1; i < selectedItems[1]; i++) {
          days[i].classList.remove(theme.active);
        }

        // Удаляем классы в зависимости от того, какой день кликнули
        const [first, second] = selectedItems;
        if (index === first) {
          days[second].classList.remove(theme.end);
        } else {
          days[first].classList.remove(theme.start);
        }
        
        clickedDay.classList.remove(theme.selected);
        selectedItems.splice(selectedItems.indexOf(index), 1);
      } else {
        // Выделяем новый диапазон
        clearSelectionClasses();
        selectedItems = [selectedItems[1], index];
        addRangeClasses();
      }
      break;
  }
};

// Обработчик изменения темы
const handleThemeChange = () => {
  const prevTheme = checkbox.checked ? CLASSES.light : CLASSES.dark;
  const newTheme = getThemeClasses();
  
  // Обновляем классы дней
  days.forEach(day => {
    if (day.classList.contains(prevTheme.selected) || day.classList.contains(prevTheme.active) || day.classList.contains(prevTheme.day)) {
      day.classList.replace(prevTheme.selected, newTheme.selected);
      day.classList.replace(prevTheme.start, newTheme.start);
      day.classList.replace(prevTheme.end, newTheme.end);
      day.classList.replace(prevTheme.active, newTheme.active);
      day.classList.replace(prevTheme.day, newTheme.day);
    }
  });

  // Обновляем классы кнопок навигации
  const prevBtn = document.querySelector(`.${prevTheme.btn}, .${prevTheme.btnNext}`);
  const nextBtn = document.querySelector(`.${prevTheme.btnNext}, .${newTheme.btnNext}`);
  
  if (prevBtn) {
    prevBtn.classList.replace(prevTheme.btn, newTheme.btn);
    nextBtn.classList.replace(prevTheme.btnNext, newTheme.btnNext);
  }
};

// Инициализация
days.forEach((day, index) => {
  day.addEventListener('click', () => handleDayClick(index));
});

checkbox.addEventListener('change', handleThemeChange);*/

