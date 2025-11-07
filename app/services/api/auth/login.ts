import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../../state/auth/types";

const LoginApi = async (userData: {
  email?: string;
  password?: string;
}): Promise<AxiosResponse<AuthResponse>> => {
  const body = JSON.stringify(userData);
  const response = (await axios.post("http://localhost:8000/api/auth/login", body, {
    headers: {
      "Content-Type": "application/json",
    },
  })) as AxiosResponse<AuthResponse>;
  return response;
};

export { LoginApi };
