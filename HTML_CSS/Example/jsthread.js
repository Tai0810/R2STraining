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
    fetch(BASE_URL + '/users', { method: 'GET'})
      .then((respone) => {
        if(respone.status !== 200){
          reject('error');
        }
        return respone.json();
      })
      .then((users) => resolve(users))
      .catch((error) => reject(error));
  });
}
fetchUsers().then((users) => console.log('users ', users));

async function fetchUsers2() {
  const respone = await fetch(BASE_URL + '/users', { method: 'GET' });
  if(respone.status !== 200){
    throw new Error('error');
  }
  const user = await respone.json();
  return user;
}

async function fetchUserById(userId) {
  const respone = await fetch(BASE_URL + '/users' + userId);
  if(respone.status !== 200){
    throw new Error('error');
  }
  const user = await respone.json();
  return user;
}
