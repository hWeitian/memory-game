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

// export const getImage = async () => {
//   const url =
//     "https://pixabay.com/api/?key=33005366-cde6083ff2884674f769fc4c5&q=yellow+flowers&image_type=photo&pretty=true&per_page=200";
//   const response = await fetch(url);
//   const data = await response.json();

//   console.log(data);
// };
