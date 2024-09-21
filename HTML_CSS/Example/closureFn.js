function Counter() {
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
    console.log('args', args);
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn(...args);
    }
  };
}

function clickRate (date, date2) {
  console.log(`click ### ${date.getDate()} ${date2.getDate()}`);
}

const handleRateLimit = rateLimiter(clickRate, 2000);

handleRateLimit(new Date('2024-02-01'), new Date('2024-02-02'))