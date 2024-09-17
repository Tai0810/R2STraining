import { ChangeEvent, useCallback, useState } from "react";
import { DELETE_POST, EDIT_POST } from "../store/actions";
import { AppDispatch } from "../store";

type InputField = "body" | "author";

export interface PostModel {
  title: string;
  body: string;
  id: number;
  userId: number;
  name?: string;
}

const useEditingPost = (post: PostModel, dispatch: AppDispatch) => {
  const [editingField, setEdingField] = useState<InputField | null>(null);
  const [changingInput, setChangingInput] = useState({
    author: post.name,
    body: post.body,
  });

  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>, field: InputField) => {
      setChangingInput((prevState) => ({
        ...prevState,
        author: post.name,
        body: post.body,
        [field]: event.target.value,
      }));
      // submit post
    },
    [post.name, post.body]
  );
  const handleSave = useCallback(() => {
    dispatch({
      type: EDIT_POST,
      changingInput,
      postId: post.id,
      userId: post.userId,
    });
    setEdingField(null);
  }, [dispatch, changingInput, post.id, setEdingField, post.userId]);

  const handleDelete = useCallback(() => {
    dispatch({
      type: DELETE_POST,
      postId: post.id,
    });
  }, [dispatch, post.id]);

  return {
    editingField,
    changingInput,
    setEdingField,
    handleChangeInput,
    handleSave,
    handleDelete
  }
};

export default useEditingPost;
