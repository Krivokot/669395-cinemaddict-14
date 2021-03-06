const Rank = {
  '1': 'Novice',
  '11': 'Fan',
  '21': 'Movie Buff',
};

const getRank = (watchedFilms) => {
  const ratingLimits = Object.keys(Rank);
  let rank = null;

  for (let i = ratingLimits.length - 1; i >= 0; i--) {
    if (watchedFilms >= Number(ratingLimits[i])) {
      rank = Rank[ratingLimits[i]];
      break;
    }
  }

  return rank;
};

export {getRank};
