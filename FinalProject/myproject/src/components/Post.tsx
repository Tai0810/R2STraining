import { memo } from "react";
import { Link } from "react-router-dom";

interface PostModel {
  title: string;
  body: string;
  id: number;
  userId: number;
  name?: string;
}

type Props = {
  postDetail: {
    post: PostModel;
    count?: number;
  };
};

const Post = ({ postDetail }: Props) => {
  return (
    <div>
      <Link to={"post/" + postDetail.post.id}>
        <strong>{postDetail.post.title}</strong>
      </Link>

      <p>{postDetail.post.body}</p>
      {postDetail.post.name && <i>Author: {postDetail.post.name}</i>} {/* Hiển thị tên tác giả */}
    </div>
  );
};


export default memo(Post);
