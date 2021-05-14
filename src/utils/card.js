import dayjs from 'dayjs';

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortCardUp = (cardA, cardB) => {
  const weight = getWeightForNullDate(cardA.dueDate, cardB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return dayjs(cardA.dueDate).diff(dayjs(cardB.dueDate));
};

export const sortTaskDown = (cardA, cardB) => {
  const weight = getWeightForNullDate(cardA.dueDate, cardB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return dayjs(cardB.dueDate).diff(dayjs(cardA.dueDate));
};
