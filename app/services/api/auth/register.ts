import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../../state/auth/types";

const RegisterApi = async (userData: {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  birthday?: string;
  sex?: string;
}): Promise<AxiosResponse<AuthResponse>> => {
  const body = JSON.stringify({ ...userData });
  console.log(body);
  const response = (await axios.post(
    "http://localhost:8000/api/auth/register",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )) as AxiosResponse<AuthResponse>;
  return response;
};

export { RegisterApi };
