export interface PostModel {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type PostsState = {
  list: Array<PostModel>;
  loading: "idle" | "loading" | "success" | "failed";
  error?: string;
};
