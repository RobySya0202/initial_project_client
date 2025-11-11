import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../../state/auth/types";
import config from ".";
import { TUser } from "../../state/users/types";

const UpdateUserApi = async (
  userData: TUser,
  id: number
): Promise<AxiosResponse<AuthResponse>> => {
  const body = JSON.stringify({ ...userData });
  const url = config.userResourceApi + `/${id}`;
  const response = (await axios.put(url, body, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  })) as AxiosResponse<AuthResponse>;
  return response;
};

export { UpdateUserApi };
