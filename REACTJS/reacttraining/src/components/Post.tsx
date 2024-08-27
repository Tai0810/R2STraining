type Props = {
  title: string;
  body: string;
};

const Post = ({ title, body }: Props) => {
  return (
    <div>
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
};

export default Post;
