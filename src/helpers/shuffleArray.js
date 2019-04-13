/**
 * Shuffle the options of each question.
 * Fisher-Yates (aka Knuth) Shuffle.
 *
 * @param {*} array
 */
const shuffleArray = unprocessedArray => {
  let currentIndex = unprocessedArray.length;
  let temporaryValue;
  let randomIndex;
  const processedArray = unprocessedArray;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = processedArray[currentIndex];
    processedArray[currentIndex] = processedArray[randomIndex];
    processedArray[randomIndex] = temporaryValue;
  }
  return processedArray;
};

export default shuffleArray;
