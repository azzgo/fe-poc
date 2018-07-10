
/**
 *
 * @param {string[]} unsortArray
 */
function bubbleSort (unsortArray) {
  for (let i = 0; i < unsortArray.length; i++) {
    for (let j = 0; j < unsortArray.length - 1; j++) {
      if (unsortArray[j] > unsortArray[j + 1]) {
        let temp = unsortArray[j]
        unsortArray[j] = unsortArray[j + 1]
        unsortArray[j + 1] = temp
      }
    }
  }

  return unsortArray
}

export default bubbleSort
