import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { fetchData } from "../utils/fetchData";
import useApi from "../hooks/useApi";
import { PostModel } from "../types/post";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ListPost() {
  const { data: postsData, setData: setPostsData } = useApi("/posts", []);
  const auth = useSelector((state: any) => state.auth);
  // console.log('state', state);

  // if (!auth.isLoggedIn) {
  //   return <Navigate to="/login" replace={true} />;
  // }
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
