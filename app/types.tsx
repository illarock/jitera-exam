export interface UserValueState {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  avatar: string;
  favorite: boolean;
}

export interface UserState {
  value: Array<UserValueState>;
  valueSolo: UserValueState | {};
  isLoading: boolean;
  isSaving?: boolean;
}
