function SortedArray() {
  this.numbers = [];
}

SortedArray.prototype.initNumbers = function (arr) {
  this.numbers = arr.slice().sort((a, b) => a - b);
};

SortedArray.prototype.get = function (num) {
  return this.numbers.indexOf(num);
};

SortedArray.prototype.set = function (num) {
  this.numbers.push(num); 
  this.numbers.sort((a, b) => a - b);
};

SortedArray.prototype.remove = function (num) {
  const index = this.numbers.indexOf(num);
  if (index !== -1) {
      this.numbers.splice(index, 1);
  }
};

const sortedArray = new SortedArray();

sortedArray.initNumbers([5, 3, 8, 1, 9]);
console.log("Init Number:", sortedArray.numbers); 

let index = sortedArray.get(5);
console.log("Index of number 5:", index); 

sortedArray.set(4);
console.log("Correct order in arr after add number 4:", sortedArray.numbers);

sortedArray.remove(5);
console.log("Arr after remove number 5:", sortedArray.numbers); 