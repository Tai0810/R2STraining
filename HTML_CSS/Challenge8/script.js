async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function combineData(posts, users) {
  const userMap = new Map();
  users.forEach(user => {
    userMap.set(user.id, user.name);
  });

  return posts.map(post => {
    const authorName = userMap.get(post.userId);
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      author: authorName,
    };
  });
}

async function getFormattedData() {
  try {
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
    const usersUrl = 'https://jsonplaceholder.typicode.com/users';

    const [posts, users] = await Promise.all([fetchData(postsUrl), fetchData(usersUrl)]);

    const combinedData = combineData(posts, users);

    console.log(combinedData);
    return combinedData;
  } catch (error) {
    console.error('Error in getFormattedData:', error);
  }
}

getFormattedData();
