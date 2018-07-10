import bubbleSort from './bubble.sort'

test('冒泡排序', () => {
  expect(bubbleSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5])
  expect(bubbleSort([4, 5, 2, 3, 1])).toEqual([1, 2, 3, 4, 5])
})
