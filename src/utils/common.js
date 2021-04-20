export const getRandomInt = (arg) => {
  return Math.floor(Math.random() * arg);
};

export const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};
