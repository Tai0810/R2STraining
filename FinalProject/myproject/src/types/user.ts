export interface UserModel {
  id: number;
  name?: string;
}

export type UserData = Record<number, UserModel>;

export type UsersState = {
  ids: number[];
  data: UserData;
  error?: string;
  loading: "idle" | "loading" | "succeed" | "failed";
};
