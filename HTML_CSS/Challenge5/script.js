function findSmallestNumber(arr) {
  let smallest = arr[0];
  for (let i = 1; i < arr.length; i++) {
      if (arr[i] < smallest) {
          smallest = arr[i];
      }
  }
  return smallest;
}

function filterDuplicatedNumber(arr) {
  const countMap = {};
  const duplicates = [];
  
  for (let i = 0; i < arr.length; i++) {
      const num = arr[i];
      if (countMap[num]) {
          if (!duplicates.includes(num)) {
              duplicates.push(num);
          }
      } else {
          countMap[num] = 1;
      }
  }
  return duplicates;
}

const arr = [3, 2, 5, 4, 3, 1, 5];
console.log('findSmallestNumber:', findSmallestNumber(arr)); 
console.log('filterDuplicatedNumber:', filterDuplicatedNumber(arr));