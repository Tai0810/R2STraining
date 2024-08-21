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
  null,
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

function calculateTotalQuantity(products) {
  let total = 0;
  const validProducts = products.filter(product => product !== null);
  const newProductList = validProducts.map(product => {
    total += product.quantity;
    return { name: product.name, quantity: product.quantity };
  });
  return { products: newProductList, total };
}

console.log(calculateTotalQuantity(products)); 


function insertPopularItem(modelId) {
  let productIndex = -1;
  const popularProduct = products.find((product, index) => {
    if (product && product.models.id === modelId) {
      productIndex = index;
      return true;
    }
    return false;
  });

  if (popularProduct) {
    products.splice(productIndex, 1);
    products.unshift(popularProduct);
  }
}

insertPopularItem(2);
console.log(products); 
