// Get number of occurence of a value in an array
const duplicateCount = (array, item) => {
  let number = 0;

  array.forEach(sock => {
    if (sock === item) {
      number++;
    }
  })

  return number;
}

// Get unique values of an array
const unique = array => {
  let uniqueColorCode = [];

  array.forEach(sock => {
    if (uniqueColorCode.indexOf(sock) === -1) {
      uniqueColorCode.push(sock);
    }
  })

  return uniqueColorCode;
}

// Filter incomplete pairs from clean pile
const incomplete = cleanPile => {
  let uniqueClean = unique(cleanPile);

  // Incomplete Clean
  let incompleteClean = [];

  uniqueClean.forEach(sock => {
    let count = duplicateCount(cleanPile, sock);

    if (count % 2 !== 0) {
      incompleteClean.push(sock);
    }
  });

  return incompleteClean;
}

// Get pairs
const getPairs = array => {
  let pairs = [];
  let singles = unique(array);

  singles.forEach(sock => {
    let count = duplicateCount(array, sock);

    if (count > 1) {
      let pairsWashable = (Math.floor(count / 2)) * 2;
      for (i = 1; i <= pairsWashable; i++) {
        pairs.push(sock);
      }
    }
  });

  return pairs;
}

// Get the socks that will be reasonable to wash
const laundryBasket = (noOfWashes, cleanPile, dirtyPile) => {
  let washReady = [];
  noOfWashes = parseInt(noOfWashes);

  if (noOfWashes < 1) {
    return washReady;
  }

  let incompleteClean = incomplete(cleanPile);

  // Attempt to find completing pair of incomplete clean in dirty pile
  let uniqueDirty = unique(dirtyPile);

  uniqueDirty.forEach(sock => {
    if (noOfWashes === washReady.length) {
      return;
    }

    if (incompleteClean.indexOf(sock) > -1) {
      let firstIndex = dirtyPile.indexOf(sock);

      washReady.push(sock);

      dirtyPile.splice(firstIndex, 1);
    }
  });

  // If possible number of washes has been reached or its not possible to go more
  if (noOfWashes === washReady.length || (noOfWashes - washReady.length) < 2) {
    return washReady;
  }

  // Check for other possible pairs remaining in dirtyPile
  let pairsWashable = (noOfWashes - washReady.length) / 2;
  let singles = (Math.floor(pairsWashable)) * 2;

  let dirtyPairs = getPairs(dirtyPile);

  if (dirtyPairs.length < 2) {
    return washReady;
  }

  let readyPairs = dirtyPairs.splice(0, singles);

  return washReady.concat(readyPairs);
}

/**
 * This is the entry point to the program.
 *
 * @param {number} noOfWashes The number of times the laundry machine can clean a dirty sock
 * @param {number[]} cleanPile The array of clean socks
 * @param {number[]} dirtyPile The array of dirty socks to wash
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  let washReady = laundryBasket(noOfWashes, cleanPile, dirtyPile);
  let washedSocks = cleanPile.concat(washReady);
  let pairs = getPairs(washedSocks);

  return pairs.length / 2;
}

module.exports = getMaxPairs;
