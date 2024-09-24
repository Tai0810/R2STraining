export function Counter() {
  let count = 0;

  const increasement = () => {
    count++;
    console.log("count in", count);
  };
  const decreasement = () => {
    count--;
    console.log("count de", count);
  };
  const reset = () => {
    count = 0;
    console.log("reset", count);
  };
  return {
    increasement,
    decreasement,
    reset,
  };
}

const counter = Counter();
counter.increasement();
counter.increasement();
counter.increasement();
counter.decreasement();

const TodoList = (function () {
  const tasks = [];

  function renderTask() {
    tasks.forEach((task) => {
      console.log(`Task ${task.id}: ${task.value}`);
    });
  }

  function addTasks(value) {
    const lastTask = tasks[tasks.length - 1];
    tasks.push({
      id: lastTask ? lastTask.id + 1 : 1,
      value,
    });
  }

  function removeTask(index) {
    tasks.splice(index, 1);
  }

  return {
    renderTask,
    addTasks,
    removeTask,
  };
})(); //IIFE

TodoList.addTasks("hello world");
TodoList.addTasks("finish homework");
TodoList.addTasks("sleep at 11pm");
TodoList.renderTask();
TodoList.removeTask(0);
TodoList.renderTask();

function rateLimiter(fn, limit) {
  let lastCall = 0;

  return function (...args) {
    console.log("args", args);
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn(...args);
    }
  };
}

function clickRate(date, date2) {
  console.log(`click ### ${date.getDate()} ${date2.getDate()}`);
}

const handleRateLimit = rateLimiter(clickRate, 2000);

handleRateLimit(new Date("2024-02-01"), new Date("2024-02-02"));

/**
 * array1: [1,2,7,0,0,0,0,0,] -> non-decrease
 * array2: [1,1,3,7,7] //O(m+n)
 * merge(arr1, m, arr2, n){ //modify on array: [1,1,1,2,3,7,7,7]
 * }
 */

const merge = function (arr1, m, arr2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  while (i >= 0 && j >= 0) {
    if (arr1[i] > arr2[j]) {
      arr1[k--] = arr1[i--];
    } else {
      arr1[k--] = arr2[j--];
    }
  }

  while (j >= 0) {
    arr1[k--] = arr2[j--];
  }

  return arr1;
};

let array1 = [1, 2, 7, 0, 0, 0, 0, 0];
let array2 = [1, 1, 3, 7, 7];
console.log(merge(array1, 3, array2, 5));

