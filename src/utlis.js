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

export const generatePairIdArray = (num) => {
  const idArray = [];
  for (let i = 0; i < num; i += 1) {
    let id = generateRandomNum(num);
    if (
      checkIncludes(idArray, `${id}-1`) ||
      checkIncludes(idArray, `${id}-2`)
    ) {
      i -= 1;
    } else {
      idArray.push(createTilesObj(`${id}-1`, i));
      idArray.push(createTilesObj(`${id}-2`, i));
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

const createTilesObj = (id, index) => {
  return {
    uniqueId: id,
    image: emojiImages[index],
  };
};

const emojiImages = [
  "1f3a0.png",
  "1f3a1.png",
  "1f3a2.png",
  "1f3a3.png",
  "1f3a4.png",
  "1f3a5.png",
  "1f3a6.png",
  "1f3a7.png",
  "1f3a8.png",
  "1f3a9.png",
  "1f3aa.png",
  "1f3ab.png",
  "1f3ac.png",
  "1f3ad.png",
  "1f3ae.png",
  "1f3af.png",
  "1f3b0.png",
  "1f3b1.png",
  "1f3b2.png",
  "1f3b3.png",
  "1f3b4.png",
  "1f3b5.png",
  "1f3b6.png",
  "1f3b7.png",
  "1f3b8.png",
  "1f3b9.png",
  "1f3ba.png",
  "1f3bb.png",
  "1f3bc.png",
  "1f3bd.png",
  "1f3be.png",
  "1f3bf.png",
  "1f3c0.png",
  "1f3c1.png",
  "1f3cd-fe0f.png",
  "1f3ce-fe0f.png",
  "1f3cf.png",
  "1f3d0.png",
  "1f3d1.png",
  "1f3d2.png",
  "1f3d3.png",
  "1f3d4-fe0f.png",
  "1f3d5-fe0f.png",
  "1f3d6-fe0f.png",
  "1f3d7-fe0f.png",
  "1f3d8-fe0f.png",
  "1f3d9-fe0f.png",
  "1f3da-fe0f.png",
  "1f3db-fe0f.png",
  "1f3dc-fe0f.png",
  "1f3dd-fe0f.png",
  "1f3de-fe0f.png",
  "1f3df-fe0f.png",
  "1f3ee.png",
  "1f3ef.png",
  "1f3f0.png",
  "1f3f3-fe0f.png",
  "1f3f4-200d-2620-fe0f.png",
  "1f3f4-e0067-e0062-e0065-e006e-e0067-e007f.png",
  "1f3f4-e0067-e0062-e0073-e0063-e0074-e007f.png",
  "1f3f4-e0067-e0062-e0077-e006c-e0073-e007f.png",
  "1f3f4.png",
  "1f3f5-fe0f.png",
  "1f3f7-fe0f.png",
  "1f3f8.png",
  "1f3f9.png",
  "1f3fa.png",
  "1f004.png",
  "1f4a0.png",
  "1f4a1.png",
  "1f4a2.png",
  "1f4a3.png",
  "1f4a4.png",
  "1f4a5.png",
  "1f4a6.png",
  "1f4a7.png",
  "1f4a8.png",
  "1f4a9.png",
  "1f4ab.png",
  "1f4ac.png",
  "1f4ad.png",
  "1f4ae.png",
  "1f4af.png",
  "1f4b0.png",
  "1f4b1.png",
  "1f4b2.png",
  "1f4b3.png",
  "1f4b5.png",
  "1f4ba.png",
  "1f4bb.png",
  "1f4bc.png",
  "1f4bd.png",
  "1f4c0.png",
  "1f4c1.png",
  "1f4c6.png",
  "1f4c7.png",
  "1f4c8.png",
  "1f4c9.png",
  "1f4ca.png",
  "1f4cb.png",
  "1f4cc.png",
  "1f4cd.png",
  "1f4ce.png",
  "1f4cf.png",
  "1f4d0.png",
  "1f4d1.png",
  "1f4d2.png",
  "1f4d3.png",
  "1f4d4.png",
  "1f4d6.png",
  "1f4db.png",
  "1f4dc.png",
  "1f4dd.png",
  "1f4de.png",
  "1f4df.png",
  "1f4e0.png",
  "1f4e1.png",
  "1f4e2.png",
  "1f4e3.png",
  "1f4e4.png",
  "1f4e5.png",
  "1f4e6.png",
];

// export const getImage = async () => {
//   const url =
//     "https://pixabay.com/api/?key=33005366-cde6083ff2884674f769fc4c5&q=yellow+flowers&image_type=photo&pretty=true&per_page=200";
//   const response = await fetch(url);
//   const data = await response.json();

//   console.log(data);
// };
