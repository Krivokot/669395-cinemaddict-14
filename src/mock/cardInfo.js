const getRandomInt = (arg) => {
  return Math.floor(Math.random() * arg);
};

const titles = [
  'Kill Bill',
  'Interstellar',
  'Twin Peaks',
];

const posters = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const generateRandomDescription = () => {
  const randomLength = getRandomInt(descriptions.length)

  const summaryDescription = [];
  for (let i = 0; i < randomLength; i++) {
    summaryDescription.push(descriptions[i]);
  }
  return String(summaryDescription);
}

const generateRandomElement = (element) => {

  const randomElementId = getRandomInt(element.length);

  return element[randomElementId];
};

export const generateCard = () => {
  return {
    id: 'some',
    comments: [
      'some'
    ],
    film_info: {
      title: generateRandomElement(titles),
      alternative_title: 'some',
      total_rating: 'some',
      poster: `./images/posters/${generateRandomElement(posters)}`,
      age_rating: 'some',
      director: 'some',
      writers: [
        'some'
      ],
      actors: [
        'some'
      ],
      release: {
        date: 'some',
        release_country: 'some',
      },
      runtime: 'some',
      genre: [
        'some'
      ],
      description: generateRandomDescription(),
    },
    user_details: {
      watchlist: false,
      already_watched: true,
      watching_date: 'some',
      favorite: false,
    },
  };
}
