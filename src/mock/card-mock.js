import dayjs from "dayjs";

export const getRandomInt = (arg) => {
  return Math.floor(Math.random() * arg);
};

const titles = [
  'Kill Bill',
  'Interstellar',
  'Twin Peaks',
];

const ratings = [
  '1',
  '2',
  '3',
  '4',
  '5',
];

const ageRatings = [
  '12+',
  '16+',
  '18+'
];

const directors = [
  'Kventin Tarantino',
  'Guy Ritchie',
  'Christofer Nolan',
];

const posters = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
];

const booleans = [
  'true',
  'false'
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

const generateRandomValue = (element) => {

  const randomValuetId = getRandomInt(element.length);

  return element[randomValuetId];
};

const generateDate = (year, yearPlus) => {
  return dayjs()
    .add(getRandomInt(31), 'day')
    .add(getRandomInt(12), 'month')
    .set('year', year)
    .add(getRandomInt(yearPlus), 'year')
    .format('D MMMM YYYY');
}

export const generateCard = () => {
  return {
    id: 'some',
    comments: [
      'some'
    ],
    film_info: {
      title: generateRandomValue(titles),
      alternative_title: generateRandomValue(titles),
      total_rating: generateRandomValue(ratings),
      poster: `./images/posters/${generateRandomValue(posters)}`,
      age_rating: generateRandomValue(ageRatings),
      director: generateRandomValue(directors),
      writers: [
        'some'
      ],
      actors: [
        'some'
      ],
      release: {
        date: generateDate(1920, 40),
        release_country: 'some',
      },
      runtime: 'some',
      genre: [
        'some'
      ],
      description: generateRandomDescription(),
    },
    user_details: {
      watchlist: generateRandomValue(booleans),
      already_watched: generateRandomValue(booleans),
      watching_date: generateDate(2010, 11),
      favorite: generateRandomValue(booleans),
    },
  };
}
