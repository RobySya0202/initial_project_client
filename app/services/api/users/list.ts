import axios, { AxiosResponse } from "axios";
import config from ".";
import { TUser } from "../../state/users/types";
import { TPagination } from "../../state/globalType";

const fetchUsersListApi = async (
  page?: number,
  limit?: number
): Promise<
  AxiosResponse<{ message: string; data: TUser[]; pagination: TPagination }>
> => {
  let url = config.userResourceApi;
  if (page || limit) {
    url += `?page=${(page ?? 0) + 1}&limit=${limit}`;
  }
  const response = (await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  })) as AxiosResponse<{
    message: string;
    data: TUser[];
    pagination: TPagination;
  }>;
  return response;
};

export { fetchUsersListApi };
