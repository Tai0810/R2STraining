const marks = [
  {
    name: 'Tom',
    mark: 8,
  },
  {
    name: 'Jerry',
    mark: 7,
  },
  {
    name: 'Blue',
    mark: 3,
  },
  {
    name: 'Disney',
    mark: 9,
  },
  {
    name: 'Dusk',
    mark: 2,
  },
];

const names = marks
  .filter(student => student.mark > 5)
  .map(student => student.name); 

console.log(names);

const totalMarks = marks.reduce((sum, student) => {
  if(student){
    sum += student.mark
  }
  return sum;
  }, 0);

console.log(totalMarks);

function getErrorMessage(errorCode) {
  let message;
  switch (errorCode) {
    case 10002:
      message = 'Product is not shipped';
      break;
    case 10003:
      message = 'Product return';
      break;
    case 10004:
      message = 'Shipping is not recognized';
      break;
    default:
      message = 'unknown';
  }
  return message;
}

console.log(getErrorMessage(999));  
console.log(getErrorMessage(10002));  
console.log(getErrorMessage(10003));  
console.log(getErrorMessage(10004));  

function findProductsByColor(products, color) {
  return products.reduce((result, product) => {
    if (product && product.models && product.models.color && product.models.color.includes(color)) {
      result.push({
        name: product.name,
        size: product.models.size
      });
    }
    return result;
  }, []);
}

function filterProductByColor(props, color) {
  return props.reduce((prev, item) => {
    const colors = products?.models?.color || [];
    const isColorExisting = colors.some((c) => c === color);
    if(isColorExisting){
      prev.push({
        name: item.name,
        size: item?.models?.size,
      });
    }
    return prev;
  }, [])
}


const products = [
  {
    name: 'Tshirt',
    quantity: 20,
    models: {
      size: 20,
      id: 1,
      color: ['red', 'black'],
    },
  },
  {
    name: 'Pant',
    quantity: 19,
    models: {
      size: 26,
      id: 2,
      color: ['black', 'white'],
    },
  },
  {
    name: 'Long sleeve',
    quantity: 50,
    models: {
      size: 23,
      id: 4,
      color: ['green', 'yellow'],
    },
  },
];

console.log('Filter',filterProductByColor(products, 'black'));
const result = findProductsByColor(products, 'black');
console.log(result);
