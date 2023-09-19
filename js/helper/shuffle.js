export const shuffle = arr => {
  const newArr = [...arr];
  for (let i = 0; i < newArr.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}