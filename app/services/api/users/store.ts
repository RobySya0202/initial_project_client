import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../../state/auth/types";
import config from ".";

const StoreUserApi = async (userData: {
  email: string;
  password: string;
  first_name: string;
  last_name?: string;
  birthday: string;
  sex: string;
}): Promise<AxiosResponse<AuthResponse>> => {
  const body = JSON.stringify({ ...userData });
  const response = (await axios.post(config.userResourceApi, body, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  })) as AxiosResponse<AuthResponse>;
  return response;
};

export { StoreUserApi };
