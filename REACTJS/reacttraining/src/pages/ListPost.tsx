import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { fetchData } from "../utils/fetchData";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function ListPost() {
  const [postsData, setPostsData] = useState<Post[]>([]);

  useEffect(() => {
    const fetchListPost = async () => {
      try {
        const listPost = await fetchData();
        setPostsData(listPost);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchListPost();
  }, []);

  return (
    <>
      {postsData.map((post) => (
        <Post key={post.id} postDetail={{ post, count: postsData.length }} />
      ))}
    </>
  );
}

export default ListPost;
