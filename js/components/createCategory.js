import { createElement } from '../helper/createElement.js';

export const createCategory = (app) => {
  const category = createElement('section', { className: 'category section-offset' });

  const container = createElement('div', {
    className: 'container',
  });
  category.append(container);

  const categoryList = createElement('ul', {
    className: 'category__list',
  });

  const createCategoryCards = (data) => {
    const item = createElement('li', {
      className: 'category__item',
    });
    item.dataset.id = data.id;

    const button = createElement('button', {
      className: 'category__card',
    });
    const buttonTitle = createElement('span', {
      className: 'category__title',
      textContent: data.title,
    });
    const buttonPairs = createElement('span', {
      className: 'category__pairs',
      textContent: `${data.length} пар`,
    });
    button.append(buttonTitle, buttonPairs);

    const buttonEdit = createElement('button', {
      className: 'category__btn category__edit',
      ariaLabel: 'редактировать',
    });
    const buttonDelete = createElement('button', {
      className: 'category__btn category__del',
      ariaLabel: 'удалить',
    });
    
    item.append(button, buttonEdit, buttonDelete);

    return item;
  };

  container.append(categoryList);

  const mount = (data) => {
    categoryList.textContent = '';
    app.append(category);
    const cards = data.map(createCategoryCards);
    categoryList.append(...cards);
  };

  const unmount = () => {
    category.remove();
  };

  return { mount, unmount, categoryList };
};
