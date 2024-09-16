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

function mergeProducts2(product1, product2) {
  const result = [];
  let i = 1,
    j = 0;
  while (i < product1.length && j <= product2.length) {
    if (product1[i]["id"] >= product2[j]["id"]) {
      result.push(product2[j]);
      if (product1[i]["id"] === product2[j]["id"]) {
        i++;
      }
      j++;
      continue;
    }
    if (product1[i]["id"] < product2[j]["id"]) {
      result.push(product1[i]);
      i++;
      continue;
    }
  }

  if (i < product1.length) {
    result.push(...product1.splice(i));
  }
  if (j < product2.length) {
    result.push(...product2.splice(j));
  }
  return result;
}

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

// function mergeNArrayProducts2(listProduct) {
//   const result = [...listProduct];
//   while (result.length > 1) {
//     const temp = [];
//     for (let i = 0; i < result.length; i += 2) {
//       if (i === result.length - 1) {
//         result.push(result[i]);
//       } else {
//         temp.push[mergeProducts2(result[i], result[i + 1])];
//       }
//     }
//     result = [...temp];
//   }
//   return result[0];
// }

// console.log("MergeN2: ", mergeNArrayProducts2(allProducts));

function formatCurrency(amount) {
  return amount.toLocaleString("en-US");
}

console.log(formatCurrency(1000000));
console.log(formatCurrency(10000));

function formatCurrency2(amount) {
  let formatAmount = "";
  while (amount > 999) {
    const temp = amount % 1000;
    tempFormat =
      temp === 0
        ? ",000"
        : temp < 10
        ? `,00${temp}`
        : temp < 100
        ? `,0${temp}`
        : `,${temp}`;
    formatAmount = tempFormat + formatAmount;
    amount = Math.floor(amount / 1000);
  }
  if (amount > 0) {
    formatAmount = amount + formatAmount;
  }
  return formatAmount;
}
