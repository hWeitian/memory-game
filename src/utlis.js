import { iconsList } from "./imagesName";

/**
 * Helper function to generate random number by providing a maximum number
 * @param {number} max
 * @returns {number} number
 */
const generateRandomNum = (max) => Math.floor(Math.random() * max);

/**
 * Helper function to shuffle array
 * @param {array} arr
 * @returns {array}
 */
const shuffleArray = (arr) => {
  const maxIndex = arr.length - 1;
  for (let i = 0; i < arr.length; i += 1) {
    let randomIndex = generateRandomNum(maxIndex);
    let currItem = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = currItem;
  }
  return arr;
};

/**
 * Helper function to generate a shuffled array of objects that contains file name of card image and card id
 * @param {number} num
 * @returns {array} An array of objects
 */
const generatePairIdArray = (num) => {
  const shuffledIcons = shuffleArray(iconsList);
  const idArray = [];
  for (let i = 0; i < num; i += 1) {
    let id = generateRandomNum(num);
    if (
      checkIncludes(idArray, `${id}-1`) ||
      checkIncludes(idArray, `${id}-2`)
    ) {
      i -= 1;
    } else {
      idArray.push(createTilesObj(`${id}-1`, i, shuffledIcons));
      idArray.push(createTilesObj(`${id}-2`, i, shuffledIcons));
    }
  }
  const shuffledArray = shuffleArray(idArray);
  return shuffledArray;
};

/**
 * Helper function to check if a string is included in the array
 * @param {array} arr
 * @param {string} idToCheck
 * @returns {boolean}
 */
const checkIncludes = (arr, idToCheck) => {
  for (let i = 0; i < arr.length; i += 1) {
    let item = arr[i]["uniqueId"];
    if (item === idToCheck) {
      return true;
    }
  }
  return false;
};

/**
 * Helper function to create an object which contains the ID and image file name of the cards
 * @param {string} id ID of the cards
 * @param {number} index Random index of the image file name array
 * @param {array} arr  Imgae file name array
 * @returns {object}
 */
const createTilesObj = (id, index, arr) => {
  return {
    uniqueId: id,
    image: arr[index],
  };
};

/**
 * Helper function to calculate total number of cards to display for each round
 * @param {number} rounds
 * @returns {number}
 */
const calNumOfTiles = (rounds) => {
  const baseTilesNum = 8;
  let tilesIncrement = 4;

  let totalTiles = baseTilesNum;

  for (let i = 0; i < rounds; i += 1) {
    totalTiles += tilesIncrement;
  }
  return totalTiles;
};

/**
 * Function to generate a shuffled array of cards for each round
 * @param {number} rounds Current round of the game
 * @returns {array} A shuffled array of objects that contains the card ID and image file name
 */
export const generateID = (rounds) => {
  const totalTilesRequired = calNumOfTiles(rounds);
  const numOfIdRequired = totalTilesRequired / 2;
  const idArray = generatePairIdArray(numOfIdRequired);
  return idArray;
};

/**
 * Helper function to find the biggest number in the given array
 * @param {array} arr
 * @returns {number}
 */
const findMaxNum = (arr) => {
  let maxNum = 0;
  for (let i = 0; i < arr.length; i += 1) {
    let currentNum = Number(arr[i]);
    if (currentNum > maxNum) {
      maxNum = currentNum;
    }
  }
  return maxNum;
};

/**
 * Helper function to find the smallest number in the given array
 * @param {array} arr
 * @returns {number}
 */
const findMinNum = (arr) => {
  let minNum = arr[0];
  for (let i = 0; i < arr.length; i += 1) {
    let currentNum = Number(arr[i]);
    if (currentNum < minNum) {
      minNum = currentNum;
    }
  }
  return minNum;
};

/**
 * Helper function to find the index of all elements that matches the biggest number in the given array
 * @param {array} arr
 * @returns {array}
 */
const findIndexOfMaxNum = (arr) => {
  const maxNum = findMaxNum(arr);
  const indexArr = [];
  arr.forEach((num, index) => {
    if (num === maxNum) {
      indexArr.push(index);
    }
  });
  return indexArr;
};

/**
 * Helper function to find the index of all elements that matches the smallest number in the given array
 * @param {array} arr
 * @returns {array}
 */
const findIndexOfMinNum = (arr) => {
  const minNum = findMinNum(arr);
  const indexArr = [];
  arr.forEach((num, index) => {
    if (num === minNum) {
      indexArr.push(index);
    }
  });
  return indexArr;
};

/**
 * Function to calculate the winner at the end of each round
 * @param {number} currentRound Number of the current round
 * @param {array} playersArr The count of moves and card matched for all players
 * @returns {array} An array of all winners of the round
 */
export const determineWinner = (currentRound, playersArr) => {
  let results = [];

  const currentRoundIndex = currentRound - 1;

  const matchedCounts = playersArr.map((player) => {
    return player["matched"][currentRoundIndex];
  });

  const isAllZero = checkForAllZero(matchedCounts);

  if (isAllZero) {
    return results;
  }

  const matchedCountsIndex = findIndexOfMaxNum(matchedCounts);
  if (matchedCountsIndex.length > 1) {
    const movesCounts = matchedCountsIndex.map((count) => {
      return playersArr[count]["moves"][currentRoundIndex];
    });
    const movesCountsIndex = findIndexOfMinNum(movesCounts);
    results = movesCountsIndex.map((count) => {
      let winner = matchedCountsIndex[count] + 1;
      return winner;
    });
    return results;
  } else {
    results = matchedCountsIndex.map((count) => count + 1);
    return results;
  }
};

/**
 * Helper function to check if all player did not match a card
 * @param {array} arr Array of count of matched cards for all players for the current round
 * @returns {boolean} If true, no player matched a card for the round
 */
const checkForAllZero = (arr) => {
  let isAllZero = true;
  arr.forEach((score) => {
    if (score !== 0) {
      isAllZero = false;
    }
  });
  return isAllZero;
};

/**
 * Function to generate the results statement according to the winners of the round
 * @param {array} winnersArr An array of all winners of the round
 * @returns {string} A statement that announce the winner of the round
 */
export const generateResults = (winnersArr) => {
  let results = "";
  if (winnersArr.length > 1) {
    results = `It's a tie!`;
  } else if (winnersArr.length === 0) {
    results = "No one wins!";
  } else {
    results = `Player ${winnersArr[0]} wins!`;
  }
  return results;
};

/**
 * Function to that generate the winner of each round and an updated array of players' score
 * @param {number} currentRound Number of the current round
 * @param {array} playersArr Array of players' score
 * @returns {array} An array that contains an array of winners for the round and the updated players' score array
 */
export const generateWinner = (currentRound, playersArr) => {
  const winners = determineWinner(currentRound, playersArr);
  const newPlayersArr = [...playersArr];
  winners.forEach((winner) => {
    let winnerIndex = winner - 1;
    newPlayersArr[winnerIndex]["roundsWon"] += 1;
  });
  return [winners, newPlayersArr];
};

/**
 * Function to generate an array that contains the number of each round the player has played
 * @param {number} num
 * @returns {array}
 */
export const generateRoundsArr = (num) => {
  const roundsArr = [];
  for (let i = 1; i <= num; i += 1) {
    roundsArr.push(i);
  }
  return roundsArr;
};

/**
 * Function to remove players' score for the current round
 * @param {array} playerArr Array of all players' score for all rounds
 * @param {array} roundWinners Array of current round winners
 * @returns {array} Array of all players' score for previous rounds except for the latest round
 */
export const resetPlayersInfo = (playerArr, roundWinners) => {
  playerArr.forEach((player, index) => {
    let lastIndex = player["moves"].length - 1;
    player["matched"][lastIndex] = 0;
    player["moves"][lastIndex] = 0;
    if (roundWinners.includes(index + 1)) {
      player["roundsWon"] -= 1;
    }
  });

  return playerArr;
};

/**
 * Function to update a specific player's score
 * @param {array} playersArr Array of all players' score for all rounds
 * @param {number} playerIndex The index of the player to update
 * @param {number} currentRound The round that the will be updated
 * @param {string} infoType The type of information to update. For example, number of moves, number of matched cards, and etc.
 * @param {number} info The data to be updated
 * @returns {array} An array of players' score with updated infomation
 */
export const generateNewPlayerInfo = (
  playersArr,
  playerIndex,
  currentRound,
  infoType,
  info
) => {
  const indexToUpdate = currentRound - 1;
  let newInfo = Number(playersArr[playerIndex][infoType][indexToUpdate]);
  newInfo += info;
  const newPlayersArr = playersArr.map((player, index) => {
    if (index === playerIndex) {
      player[infoType][indexToUpdate] = newInfo;
      return player;
    } else {
      return player;
    }
  });
  return newPlayersArr;
};

/**
 * Function to check if the second clicked card matches the first clicked card
 * @param {number} id ID of the current card that was clicked
 * @param {array} clickedTiles Array of cards that were clicked before the latest click
 * @returns {boolean} True when the second clicked card matches the first clicked card
 */
export const checkMatched = (id, clickedTiles) => {
  const uniqueIdOne = id.split("-")[0];
  const uniqueIdTwo = clickedTiles[0].split("-")[0];
  if (uniqueIdTwo === uniqueIdOne) {
    return true;
  }
  return false;
};

/**
 * Function to check if player has matched all cards in the current round
 * @param {number} numOfMatchedTiles Number of cards matched in the current round
 * @param {number} numOfTiles Number of cards for the current round
 * @returns {boolean} True if player has matached all cards in current round
 */
export const checkRoundCompleted = (numOfMatchedTiles, numOfTiles) => {
  if (numOfMatchedTiles === numOfTiles - 2) {
    return true;
  }
  return false;
};

/**
 * Function to calculate the width of the container for cards and the flex basis of each card according to the number of cards to be displayed
 * @param {number} numOfTiles Total number of cards to be displayed for the current round
 * @param {number} currentRound Number of the current round
 * @returns {array} An array that contains the width of the flex container and flex basis of the cards
 */
export const calculateLayout = (numOfTiles, currentRound) => {
  let width = 6;
  let flex = "1 0 23%";
  if (currentRound > 2) {
    if (numOfTiles % 5 === 0) {
      width = 8;
      flex = "1 0 18%";
    } else if (numOfTiles % 6 === 0) {
      width = 9;
      flex = "1 0 14%";
    } else if (numOfTiles % 7 === 0) {
      width = 11;
      flex = "1 0 12%";
    } else if (numOfTiles % 8 === 0) {
      width = 11;
      flex = "1 0 11%";
    }
  }
  return [width, flex];
};

/**
 * Function to generate number of results shown per page for single player mode
 * @param {array} resultsArr Array of player's results for all rounds
 * @param {number} postPerPage Number of results to be shown per page
 * @param {number} currentPage Current page
 * @returns {array} Array of total number of pages and results to be displayed on current page
 */
export const paginateResults = (resultsArr, postPerPage, currentPage) => {
  const totalPages = Math.ceil(resultsArr.length / postPerPage);
  const lastResultsIndex = currentPage * postPerPage;
  const firstResultsIndex = lastResultsIndex - postPerPage;
  const resultsShown = resultsArr.slice(firstResultsIndex, lastResultsIndex);
  return [totalPages, resultsShown];
};
