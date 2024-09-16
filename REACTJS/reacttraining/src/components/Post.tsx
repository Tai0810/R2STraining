import { ChangeEvent, memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { EDIT_POST, DELETE_POST } from "../store/actions";

type InputField = "body" | "author";

interface PostModel {
  title: string;
  body: string;
  id: number;
  userId: number;
  name?: string;
}

type Props = {
  post: PostModel;
};

const Post = ({ post }: Props) => {
  const [editingField, setEditingField] = useState<InputField | null>(null);
  const [changingInput, setChangingInput] = useState({
    author: post.name || "",
    body: post.body,
  });

  const dispatch = useDispatch();

  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>, field: InputField) => {
      setChangingInput((prevState) => ({
        ...prevState,
        [field]: event.target.value,
      }));
    },
    []
  );

  const handleSave = useCallback(() => {
    dispatch({
      type: EDIT_POST,
      payload: {
        ...post,
        body: changingInput.body,
        name: changingInput.author,
      },
    });
    setEditingField(null);
  }, [dispatch, changingInput, post]);

  const handleDelete = useCallback(() => {
    dispatch({
      type: DELETE_POST,
      postId: post.id,
    });
  }, [dispatch, post.id]);

  return (
    <div>
      <Link to={"post/" + post.id}>
        <strong>{post.title}</strong>
      </Link>
      <div>
        {editingField === "body" ? (
          <>
            <input
              type="text"
              value={changingInput.body}
              onChange={(e) => handleChangeInput(e, "body")}
            />
            <button onClick={handleSave}>Lưu</button>
          </>
        ) : (
          <p onDoubleClick={() => setEditingField("body")}>{post.body}</p>
        )}
      </div>
      <div>
        {editingField === "author" ? (
          <>
            <input
              type="text"
              value={changingInput.author}
              onChange={(e) => handleChangeInput(e, "author")}
            />
            <button onClick={handleSave}>Lưu</button>
          </>
        ) : (
          post.name && (
            <i onDoubleClick={() => setEditingField("author")}>
              Author: {post.name}
            </i>
          )
        )}
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.post.body === nextProps.post.body &&
    prevProps.post.name === nextProps.post.name
  );
};

export default memo(Post, arePropsEqual);
