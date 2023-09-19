import { createElement } from '../helper/createElement.js';

const TITLE = 'Введите назание категории';

export const createEditCategory = (app) => {
  const editCategory = createElement('section', {
    className: 'edit section-offset',
  });

  const container = createElement('div', {
    className: 'container edit__container',
  });

  const title = createElement('h2', {
    className: 'edit__title',
    contentEditable: true,
    title: 'Можно редактировать',
  });

  const table = createElement('table', {
    className: 'edit__table table',
  });

  const thead = createElement('thead');

  const theadTr = createElement('tr');

  const theadTh1 = createElement('th', {
    className: 'table__cell',
    textContent: 'main',
  });

  const theadTh2 = createElement('th', {
    className: 'table__cell',
    textContent: 'second',
  });

  const theadTh3 = createElement('th', {
    className: 'table__cell',
  });

  const tbody = createElement('tbody');

  const btnWrapper = createElement('div', {
    className: 'edit__btn-wrapper',
  });

  const btnAddRow = createElement('button', {
    className: 'edit__btn edit__add-row',
    textContent: 'Добавить пару',
  });

  const btnSave = createElement('button', {
    className: 'edit__btn edit__save',
    textContent: 'Сохранить категорию',
  });

  const btnCancel = createElement('button', {
    className: 'edit__btn edit__cancel',
    textContent: 'Отмена',
  });

  theadTr.append(theadTh1, theadTh2, theadTh3);
  thead.append(theadTr);
  table.append(thead, tbody);
  btnWrapper.append(btnAddRow, btnSave, btnCancel);
  container.append(title, table, btnWrapper);
  editCategory.append(container);

  const createTrCell = (dataArr) => {
    const tr = createElement('tr');

    const tableCell1 = createElement('td', {
      className: 'table__cell table__cell_one',
      textContent: dataArr[0],
      contentEditable: true,
    });
    const tableCell2 = createElement('td', {
      className: 'table__cell table__cell_two',
      textContent: dataArr[1],
      contentEditable: true,
    });
    const tableCell3 = createElement('th', {
      className: 'table__cell',
    });

    const delRow = createElement('button', {
      className: 'table__del',
      textContent: 'x',
    });

    delRow.addEventListener('click', () => {
      if (confirm('Вы уверены, что хотите удалить строку?')) {
        tr.remove();
      }
    });

    tableCell3.append(delRow);
    tr.append(tableCell1, tableCell2, tableCell3);

    return tr;
  };

  const clearTitle = () => {
    if (title.textContent === TITLE) {
      title.textContent = '';
    }
  };

  const checkTitle = () => {
    if (title.textContent === '') {
      title.textContent = TITLE;
    }
  };

  title.addEventListener('focus', clearTitle);
  title.addEventListener('blur', checkTitle);

  btnAddRow.addEventListener('click', () => {
    const emptyRow = createTrCell(['', '']);
    tbody.append(emptyRow);
  });

  const parseData = () => {
    const cellsMain = document.querySelectorAll('.table__cell_one');
    const cellsSecond = document.querySelectorAll('.table__cell_two');

    const data = {
      pairs: [],
    };

    for (let i = 0; i < cellsMain.length; i++) {
      const textMain = cellsMain[i].textContent.trim();
      const textSecond = cellsSecond[i].textContent.trim();
      if (textMain && textSecond) {
        data.pairs.push([textMain, textSecond]);
      }
    }

    if (title.textContent.trim() && title.textContent !== TITLE) {
      data.title = title.textContent.trim();
    }

    if (btnSave.dataset.id) {
      data.id = btnSave.dataset.id;
    }

    return data;
  };

  const mount = (data = { title: TITLE, pairs: [] }) => {
    tbody.textContent = '';
    title.textContent = data.title;

    if (title.textContent === TITLE) {
      title.classList.add('edit__title_change');
    } else {
      title.classList.remove('edit__title_change');
    }

    const rows = data.pairs.map(createTrCell);
    const emptyRow = createTrCell(['', '']);
    tbody.append(...rows, emptyRow);

    btnSave.dataset.id = data.id ? data.id : '';

    app.append(editCategory);
  };

  const unmount = () => {
    editCategory.remove();
  };

  return { unmount, mount, parseData, btnSave, btnCancel };
};
