import { iconsList } from "./imagesName";

const generateRandomNum = (max) => Math.floor(Math.random() * max);

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

const checkIncludes = (arr, idToCheck) => {
  for (let i = 0; i < arr.length; i += 1) {
    let item = arr[i]["uniqueId"];
    if (item === idToCheck) {
      return true;
    }
  }
  return false;
};

const createTilesObj = (id, index, arr) => {
  return {
    uniqueId: id,
    image: arr[index],
  };
};

/** Function to calculate total number of tiles to display based on the current round */
const calNumOfTiles = (rounds) => {
  const baseTilesNum = 8;
  let tilesIncrement = 4;

  let totalTiles = baseTilesNum;

  for (let i = 0; i < rounds; i += 1) {
    totalTiles += tilesIncrement;
  }
  return totalTiles;
};

/** Function to generate an array of unique pairs of id */
export const generateID = (rounds) => {
  const totalTilesRequired = calNumOfTiles(rounds);
  const numOfIdRequired = totalTilesRequired / 2;
  const idArray = generatePairIdArray(numOfIdRequired);
  return idArray;
};

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

export const determineWinner = (currentRound, playersArr) => {
  let results = [];
  const currentRoundIndex = currentRound - 1;

  const matchedCounts = playersArr.map((player) => {
    return player["matched"][currentRoundIndex];
  });

  const matchedCountsIndex = findIndexOfMaxNum(matchedCounts);
  if (matchedCountsIndex.length > 1) {
    const movesCounts = matchedCountsIndex.map((count) => {
      return playersArr[count]["moves"][currentRoundIndex];
    });
    const movesCountsIndex = findIndexOfMinNum(movesCounts);
    results = movesCountsIndex.map((count) => count + 1);
    return results;
  } else {
    results = matchedCountsIndex.map((count) => count + 1);
    return results;
  }
};

export const generateResults = (winnersArr) => {
  let results = "";
  if (winnersArr.length > 1) {
    results = `It's a tie!`;
  } else {
    results = `Player ${winnersArr[0]} wins!`;
  }
  return results;
};

export const updateWinner = (currentRound, playersArr) => {
  const winners = determineWinner(currentRound, playersArr);
  const newPlayersArr = [...playersArr];
  winners.forEach((winner) => {
    let winnerIndex = winner - 1;
    newPlayersArr[winnerIndex]["roundsWon"] += 1;
  });
  return [winners, newPlayersArr];
};

export const generateRoundsArr = (num) => {
  const roundsArr = [];
  for (let i = 1; i <= num; i += 1) {
    roundsArr.push(i);
  }
  return roundsArr;
};

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
