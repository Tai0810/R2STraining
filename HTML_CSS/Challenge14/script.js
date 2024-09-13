// Challenge 14:
/**
 * 1. merge n array products
 * listProducts: [products, products]
 * function mergeNArrayProducts(listProducts) {
 * }
 *
 * 2. format currency
 * amount: number - 100000
 * return: 1,000,000 10,000
 * function formatCurrency(amount) {}
 */

const products1 = [
  {
    id: 1,
    name: "T shirt",
    quantity: 10,
    colors: ["red", "yellow"],
  },
  {
    id: 2,
    name: "Pant",
    quantity: 11,
    color: ["black"],
  },
];

const products2 = [
  {
    id: 1,
    name: "T shirt",
    quantity: 15,
    colors: ["red", "yellow", "white"],
  },
  {
    id: 3,
    name: "Sweater",
    quantity: 12,
    color: ["brown"],
  },
];

const products3 = [
  {
    id: 4,
    name: "T shirt",
    quantity: 15,
    colors: ["red", "yellow", "white"],
  },
  {
    id: 3,
    name: "Sweater",
    quantity: 12,
    color: ["blue"],
  },
];

function mergeNArrayProducts(listProducts) {
  const productMap = {};

  for (const productList of listProducts) {
    for (const product of productList) {
      if (productMap[product.id]) {
        productMap[product.id].quantity += product.quantity;
        productMap[product.id].colors = [
          ...new Set([
            ...productMap[product.id].colors,
            ...(product.colors || product.color),
          ]),
        ];
      } else {
        productMap[product.id] = {
          ...product,
          colors: product.colors || product.color,
        };
      }
    }
  }

  return Object.values(productMap);
}

const allProducts = mergeNArrayProducts([products1, products2, products3]);
console.log(allProducts);


function formatCurrency(amount) {
  return amount.toLocaleString("en-US");
}

console.log(formatCurrency(1000000));
console.log(formatCurrency(10000));
