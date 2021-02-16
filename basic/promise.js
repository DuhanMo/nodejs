const condition = true; // true면 resolve, false면 reject
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('성공');
  } else {
    reject('실패');
  }
});
// 다른 코드가 들어갈 수 있음
// promise
//     .then(console.log)
//     .catch(console.log)
//     .finally(() => console.log('무조건'));
promise
  .then((message) => {
    return new Promise((resolve, reject) => {
      resolve(message);
    });
  })
  .then((message2) => {
    console.log(message2);
    return new Promise((resolve, reject) => {
      resolve(message2);
    });
  })
  .then((message3) => {
    console.log(message3);
  })
  .catch((error) => {
    console.log(error);
  });


// const promise1 = new Promise((resolve, reject) => {
//   resolve('성공1');
// });
// const promise2 = new Promise((resolve, reject) => {
//   resolve('성공1');
// });
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
// Promise.all([promise1, promise2])
// .then((result) => {console.log(result);})
// .catch((error) => {
//   console.log(error);
// });
(async () => {
  for await (promise22 of [promise1, promise2]) {
    console.log(promise22);
  }
})();

console.log('hello1');
console.log('hello2');
