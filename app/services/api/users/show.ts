import axios, { AxiosResponse } from "axios";
import config from ".";
import { TUser } from "../../state/users/types";


const fetchUserApi = async (
id:number
): Promise<
  AxiosResponse<{ message: string; data: TUser }>
> => {
  let url = config.userResourceApi + `/${id}`;
  const response = (await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  })) as AxiosResponse<{
    message: string;
    data: TUser
  }>;
  return response;
};

export { fetchUserApi };