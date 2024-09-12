import React, { useEffect } from "react";
import Post from "../components/Post";
import { PostModel } from "../types/post";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchListPosts } from "../store/reducers/postsReducer";
import { AppDispatch } from "../store";
import { fetchListUsers } from "../store/reducers/usersReducer";

function ListPost() {
  // const { data: postsData, setData: setPostsData } = useApi("/posts", []);
  const dispatch = useDispatch<AppDispatch>();
  const { auth, posts, users } = useSelector((state: any) => state);
  const postIds = posts.ids ?? [];
  const postsData = posts.data || {};
  const userData = users.data;
  console.log("auth", auth);
  console.log("post", posts);

  useEffect(() => {
    dispatch(fetchListPosts());
    dispatch(fetchListUsers())
  }, [dispatch]);

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  if (posts.loading === "loading") {
    return <p> loading... </p>;
  }
  return (
    <>
      {postIds.map((id: PostModel['id']) => {
        const post = postsData[id];
        const postWithUser = post
          ? { ...post, name: userData[post.userId].name }
          : null;
        return postWithUser ? (
          <Post
            key={postWithUser.id} // 1, 2, 3 1,
            postDetail={{ post: postWithUser, count: postsData.length }}
          />
        ) : null;
      })}
    </>
  );
}

export default ListPost;
