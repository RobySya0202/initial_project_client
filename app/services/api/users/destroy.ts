import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../../state/auth/types";
import config from ".";
import { TUser } from "../../state/users/types";

const DestroyUserApi = async (
  id: number
): Promise<AxiosResponse<AuthResponse>> => {
  const url = config.userResourceApi + `/${id}`;
  const response = (await axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  })) as AxiosResponse<AuthResponse>;
  return response;
};

export { DestroyUserApi };