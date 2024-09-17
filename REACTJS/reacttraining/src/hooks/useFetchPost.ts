import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListPosts } from "../store/reducers/postsReducer";
import { fetchListUsers } from "../store/reducers/usersReducer";
import { AppDispatch } from "../store";

export const useFetchPost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { auth, posts, users } = useSelector((state: any) => state);
  const postIds = posts.ids ?? [];
  const postsData = posts.data || {};
  const userData = users.data;

  useEffect(() => {
    dispatch(fetchListPosts());
    dispatch(fetchListUsers());
  }, [dispatch]);

  return {
    isLoggedIn: auth.isLoggedIn,
    postIds,
    postsData,
    userData,
    isLoading: posts.loading === "loading",
  };
};

export default useFetchPost;
