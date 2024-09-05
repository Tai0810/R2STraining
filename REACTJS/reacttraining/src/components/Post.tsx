import { memo } from "react";
import { Link } from "react-router-dom";

interface PostModel {
  title: string;
  body: string;
  id: number;
}

type Props = {
  postDetail: {
    post: PostModel;
    count?: number;
  };
};

const Post = ({ postDetail }: Props) => {
  // console.log('post render', postDetail.post.id);

  return (
    <div>
      <Link to={'post/' + postDetail.post.id}>
        <strong>{postDetail.post.title}</strong>
      </Link>

      <p>{postDetail.post.body}</p>
      {/* {count && <p>{count}</p>} */}
    </div>
  );
};

export default memo(Post);
