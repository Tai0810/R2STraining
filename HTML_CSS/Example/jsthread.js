// console.log("1");

// Promise.resolve().then(() => {
//   console.log("6");
//   setTimeout(() => {
//     console.log("7");
//   }, 0)
// })

// setTimeout(() => {
//   console.log("4");
// }, 10);

// Promise.resolve().then(() => {
//   console.log("2");
//   setTimeout(() => {
//     console.log("5");
//   }, 0)
// });

// console.log("3");

const BASE_URL = "";
function fetchUsers() {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + "/users", { method: "GET" })
      .then((respone) => {
        if (respone.status !== 200) {
          reject("error");
        }
        return respone.json();
      })
      .then((users) => resolve(users))
      .catch((error) => reject(error));
  });
}
fetchUsers().then((users) => console.log("users ", users));

async function fetchUsers2() {
  const respone = await fetch(BASE_URL + "/users", { method: "GET" });
  if (respone.status !== 200) {
    throw new Error("error");
  }
  const user = await respone.json();
  return user;
}

async function fetchUserById(userId) {
  const respone = await fetch(BASE_URL + "/users" + userId);
  if (respone.status !== 200) {
    throw new Error("error");
  }
  const user = await respone.json();
  return user;
}
/**
 * fibonanci 1 1 2 3 5 8 13 21....
 * function getFibN(n) {}
 * getFibN(6) -> 8
 * getFibN(7) -> 13
 * getFibN(40) -> ...
 */

function getFibN(n) {
  if (n <= 1) return n;

  let a = 0,
    b = 1,
    temp;

  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }

  return b;
}

console.log(getFibN(6));
console.log(getFibN(7));
console.log(getFibN(40));
console.log(getFibN(41));

/**
 * function formatPhoneNumber(phone){}
 * '+84123456789': (+84) 123 456 789 (9/3)
 * '+6512345678': (+65) 1234 5678 (9/2)
 * '+11234567890': (+1) 123 456 7890 (10/3)
 * VN: 84, SG: 65, US: 1
 */

const regionalCode = {
  "+84": "VN",
  "+65": "SG",
  "+1": "US",
  "+353": "Ireland",
};

function formatPhoneNumber(phone) {
  let currentRegionalCode = "";
  let i = 2;

  while (i <= 4) {
    currentRegionalCode = phone.substring(0, i);
    if (regionalCode[currentRegionalCode]) {
      break;
    }
    i++;
  }

  const phoneNumber = phone.substring(i);

  if (phoneNumber.length === 8) {
    return `(${currentRegionalCode}) ${phoneNumber.substring(
      0,
      4
    )} ${phoneNumber.substring(4)}`;
  }

  return `(${currentRegionalCode}) ${phoneNumber.substring(
    0,
    3
  )} ${phoneNumber.substring(3, 6)} ${phoneNumber.substring(6)}`;
}

console.log("+84123456789", formatPhoneNumber("+84123456789"));
console.log("+6512345678", formatPhoneNumber("+6512345678"));
console.log("+11234567890", formatPhoneNumber("+11234567890"));

/**
 * products1: [{
 * id: 1,
 * name: 'T shirt',
 * quantity: 10,
 * colors: ['red', 'yellow']
 * }, {
 * id: 2,
 * name: 'Pant',
 * quantity: 11,
 * color: ['black']
 * }]
 *
 * products2: [{
 * id: 1,
 * name: 'T shirt',
 * quantity: 15,
 * colors: ['red', 'yellow', 'white']
 * }, {
 * id: 3,
 * name: 'Sweater',
 * quantity: 12,
 * color: ['brown']
 * }]
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

function mergeProducts(products1, newProducts2) {
  const objProduct2 = {};
  const result = [...newProducts2];
  for (let i = 0; i < newProducts2.length; i++) {
    objProduct2[newProducts2[i]["id"]] = newProducts2[i];
  }

  for (let i = 0; i < products1.length; i++) {
    if (!objProduct2[products1[i]["id"]]) {
      result.push(products1[i]);
    }
  }

  return result;
}

console.log(mergeProducts(products1, products2));

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

console.log(mergeProducts2(products1, products2));
