import React from "react";
import Post from "../components/Post";

const post1 = {
  userId: 1,
  id: 1,
  title:
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
};

const post2 = {
  userId: 1,
  id: 2,
  title: "qui est esse",
  body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
};

const post3 = {
  userId: 1,
  id: 4,
  title: "eum et est occaecati",
  body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
};

const posts = [post1, post2, post3];

function ListPost() {
  return (
    <>
      {posts.map((post) => (
        <Post title={post.title} body={post.body}/>
      ))}
    </>
  );
}

export default ListPost;
