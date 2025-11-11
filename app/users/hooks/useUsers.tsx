import { DestroyUserApi } from "@/app/services/api/users/destroy";
import { fetchUserApi } from "@/app/services/api/users/show";
import { UpdateUserApi } from "@/app/services/api/users/update";
import { showAlert } from "@/app/services/state/alert/alertSlice";
import { useAppDispatch } from "@/app/services/state/hooks";
import { TUser } from "@/app/services/state/users/types";
import { fetchUsers } from "@/app/services/state/users/userSlice";

const useUsers = () => {
  const dispatch = useAppDispatch();
  const onFetchUsers = (page: number, limit: number) => {
    dispatch(fetchUsers({ page, limit }))
      .then((response) => {
        if (fetchUsers.fulfilled.match(response)) {
          dispatch(
            showAlert({
              message: "Users fetched successfully",
              type: "success",
            })
          );
        } else if (fetchUsers.rejected.match(response)) {
          dispatch(
            showAlert({ message: "Failed to fetch users", type: "error" })
          );
        }
      })
      .catch((error) => {
        dispatch(
          showAlert({
            message: "An error occurred while fetching users",
            type: "error",
          })
        );
      });
  };

  const onFetchUser = async (id: number) => {
    try {
      const res = await fetchUserApi(id);
      return res.data.data;
    } catch (error) {
      dispatch(
        showAlert({ message: "Failed get user information", type: "error" })
      );
    }
  };

  const onEditUser = async (userData: TUser, id: number) => {
    const res = await UpdateUserApi(userData, id);
    return res.status;
  };

  const onDeleteUser = async (id: number) => {
    const res = await DestroyUserApi(id);
    return res.status;
  };
  return { onFetchUsers, onFetchUser, onEditUser, onDeleteUser };
};

export { useUsers };
