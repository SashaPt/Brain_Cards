import { createElement } from '../helper/createElement.js';

export const createPairs = (app) => {
  const pairs = createElement('section', {
    className: 'card section-offset',
  });

  const container = createElement('div', {
    className: 'container card__container',
  });

  const btnReturn = createElement('button', {
    className: 'card__return',
    ariaLabel: 'Возврат к категориям',
  });

  container.append(btnReturn);
  pairs.append(container);

  const createCardBtn = (dataArr) => {
    const btnCard = createElement('button', {
      className: 'card__item',
    });
    const cardFront = createElement('span', {
      className: 'card__front',
      textContent: dataArr[0],
    });
  
    const cardBack = createElement('span', {
      className: 'card__back',
      textContent: dataArr[1],
    });
  
    btnCard.append(cardFront, cardBack);

    return btnCard;
  }; 

  const mount = (data) => {
    btnCard.tectContent = '';

    const pair = data.pairs.map(createCardBtn);
    container.append(...pair);

    app.append(pairs);
  };

  const unmount = () => {
    pairs.remove();
  };

  return { mount, unmount };
};
