import React, { useState } from 'react';
import movePostToTop from '../utils/moveTop';

const post1 = {
  userId: 1,
  id: 1,
  title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
};

const post2 = {
  userId: 1,
  id: 2,
  title: "qui est esse",
  body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
};

const post3 = {
  userId: 1,
  id: 4,
  title: "eum et est occaecati",
  body: "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit",
};

const initialPosts = [post1, post2, post3];

const PostList = () => {
  const [posts, setPosts] = useState(initialPosts);

  const handlePostClick = (index: number) => {
    if (index >= 0 && index < posts.length) {
      const updatedPosts = movePostToTop(posts, index);
      setPosts(updatedPosts);
    }
  };

  return (
    <div>
      <h2>PostList</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={post.id}>
            <h3>Title: {post.title}</h3>
            <p>Id: {post.id}</p>
            <p>Body: {post.body}</p>
            <button onClick={() => handlePostClick(index)}>On top</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
