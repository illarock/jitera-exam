import { RootState } from "@/app/store";
import { UserState, UserValueState } from "@/app/types";
import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  value: [],
  valueSolo: {},
  isLoading: true,
  isSaving: true,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<UserValueState[]>) => {
          state.value = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<number | null | undefined>) => {
          const id = action.payload;

          if (id) {
            state.value = state.value.filter((user) => user.id !== id);
          }

          state.isLoading = false;
        }
      )
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(heartUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        heartUser.fulfilled,
        (state, action: PayloadAction<number | null | undefined>) => {
          const id = action.payload;

          const useritem = state.value.find((user) => user.id === id);

          if (useritem) {
            useritem.favorite = !useritem.favorite;
          }

          state.isLoading = false;
        }
      )
      .addCase(heartUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(editUser.pending, (state) => {
        state.isSaving = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const { id, name, email, phone, website } = action.payload;

        const useritem = state.value.find((user) => user.id === id);

        if (useritem) {
          useritem.name = name;
          useritem.email = email;
          useritem.phone = phone;
          useritem.website = website;
        }

        state.isSaving = false;
      })
      .addCase(editUser.rejected, (state) => {
        state.isSaving = false;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUserById.fulfilled,
        (state, action: PayloadAction<UserValueState>) => {
          state.valueSolo = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getUserById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const getUsers = createAsyncThunk("users/getUsers", async (thunkAPI) => {
  try {
    const res = await fetch(`/api/users`);
    const response = await res.json();
    return response;
  } catch (error) {
    return isRejectedWithValue(error);
  }
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number | null | undefined) => {
    const res = await fetch(`/api/users?id=${id}`);
    const response = await res.json();
    //API not allowed to delete

    return id;
  }
);

export const heartUser = createAsyncThunk(
  "users/heartUser",
  async (id: number | null | undefined) => {
    //API not allowed to update

    return id;
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({
    id,
    name,
    email,
    phone,
    website,
  }: {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
  }) => {
    //API jsonplaceholder not allowed to update
    const payloadItem = { id, name, email, phone, website };

    return payloadItem;
  }
);

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id: number) => {
    try {
      const res = await fetch(`/api/users?id=${id}`);
      const response = await res.json();
      return response;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);

export const {} = usersSlice.actions;
export const usersState = (state: RootState) => state.users;
export default usersSlice.reducer;
