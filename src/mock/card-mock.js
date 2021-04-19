import dayjs from 'dayjs';
import {getRandomInt} from '../utils.js';

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
  '18+',
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
  'false',
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

const authors = [
  'Ilya',
  'Jack',
  'Pete',
];

const emotions = ['smile', 'sleeping', 'puke', 'angry'];

const comments = [
  'Its good!',
  'So baaaaaaad',
  'Like it!',
  'Watch again',
  'Dont know',
];

const generateRandomValue = (element) => {

  const randomValuetId = getRandomInt(element.length);

  return element[randomValuetId];
};

const generateDate = (year, yearPlus, format) => {
  return dayjs()
    .add(getRandomInt(31), 'day')
    .add(getRandomInt(12), 'month')
    .set('year', year)
    .add(getRandomInt(yearPlus), 'year')
    .format(format);
};

const generateRandomText = () => {
  const randomLength = getRandomInt(descriptions.length);

  const summaryDescription = [];
  for (let i = 0; i < randomLength; i++) {
    summaryDescription.push(descriptions[i]);
  }
  return String(summaryDescription);
};


const generateComment = () => {
  return {
    id: getRandomInt(1000),
    author: generateRandomValue(authors),
    comment: generateRandomValue(comments),
    date: generateDate(2021, 0, 'YYYY/MM/DD HH:MM'),
    emotion: generateRandomValue(emotions),
  };
};

export const generateCard = () => {
  return {
    id: getRandomInt(1000),
    comments: generateComment(),
    film_info: {
      title: generateRandomValue(titles),
      alternative_title: generateRandomValue(titles),
      total_rating: generateRandomValue(ratings),
      poster: `./images/posters/${generateRandomValue(posters)}`,
      age_rating: generateRandomValue(ageRatings),
      director: generateRandomValue(directors),
      writers: [
        'some',
      ],
      actors: [
        'some',
      ],
      release: {
        date: generateDate(1920, 40, 'D MMMM YYYY'),
        release_country: 'some',
      },
      runtime: 'some',
      genre: [
        'some',
      ],
      description: generateRandomText(),
    },
    user_details: {
      watchlist: generateRandomValue(booleans),
      already_watched: generateRandomValue(booleans),
      watching_date: generateDate(2010, 11, 'D MMMM YYYY'),
      favorite: generateRandomValue(booleans),
    },
  };
};
