import React, { useDebugValue, useEffect, useState } from "react";
import Post from "../components/Post";
import { fetchData } from "../utils/fetchData";
import useApi from "../hooks/useApi";
import { PostModel } from "../types/post";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchListPosts } from "../store/reducers/postsReducer";
import { AppDispatch } from "../store";

function ListPost() {
  // const { data: postsData, setData: setPostsData } = useApi("/posts", []);
  const { auth, posts } = useSelector((state: any) => state);
  const dispatch = useDispatch<AppDispatch>();
  const postsData = posts.list ?? [];
  console.log("auth", auth);
  console.log("post", posts);

  useEffect(() => {
    dispatch(fetchListPosts());
  }, [dispatch]);

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  if (posts.loading === "loading") {
    return <p> loading... </p>;
  }
  return (
    <>
      {postsData.map((post: PostModel) =>
        post ? (
          <Post key={post.id} postDetail={{ post, count: postsData.length }} />
        ) : null
      )}
    </>
  );
}

export default ListPost;
