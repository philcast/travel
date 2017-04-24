export const moveElement = (array: any[], fromIndex: number, toIndex: number) => {
  const newArray = array.slice();
  const [removedElement] = newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, removedElement);

  return newArray;
}
