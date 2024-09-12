export interface PostModel {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type Post = PostModel & {
  name?: string;
};

export type PostsDataObject = {
  [key: Post["id"]]: Post;
};

export type PostsState = {
  ids: Array<Post["id"]>;
  data: PostsDataObject;
  loading: "idle" | "loading" | "succeed" | "failed";
  error?: string;
};
