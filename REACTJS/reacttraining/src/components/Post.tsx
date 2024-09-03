import { memo } from "react";

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
      <strong>{postDetail.post.title}</strong>
      <p>{postDetail.post.body}</p>
      {/* {count && <p>{count}</p>} */}
    </div>
  );
};

export default memo(Post);
