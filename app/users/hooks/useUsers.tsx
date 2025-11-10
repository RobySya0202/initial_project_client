import { showAlert } from "@/app/services/state/alert/alertSlice";
import { useAppDispatch } from "@/app/services/state/hooks";
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
  return { onFetchUsers };
};

export { useUsers };
