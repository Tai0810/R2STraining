import { lazy, Suspense } from "react";
import { PostModel } from "../types/post";
import { Navigate } from "react-router-dom";
import { Input } from "../components";
import useFetchPost from "../hooks/useFetchPost";
import useSearchPost from "../hooks/useSearchPost";

const Post = lazy(() => import("../components/Post"));

function ListPost() {
  const { isLoggedIn, postIds, postsData, userData, isLoading } =
    useFetchPost();
  const { debounceSearch, searchResults } = useSearchPost();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  if (postIds.length === 0 && isLoading) {
    return <p> loading ...</p>;
  }

  return (
    <>
      <Input label="Search" onChange={debounceSearch} />
      <Suspense fallback={<p>Loading list ...</p>}>
        {searchResults.map((id: PostModel["id"]) => {
          const post = postsData[id];
          const postWithUser = post
            ? { ...post, name: userData[post.userId].name }
            : null;
          return postWithUser ? (
            <Post key={postWithUser.id} post={postWithUser} />
          ) : null;
        })}
      </Suspense>
    </>
  );
}

export default ListPost;
