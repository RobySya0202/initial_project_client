import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../../state/auth/types";
import { TLeave } from "../../state/leave/types";

const fetchLeaveApi = async (
  token: string
): Promise<AxiosResponse<{ message: string; data: TLeave[] }>> => {
  const response = (await axios.get(
    "http://localhost:8000/api/transaction-leave",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    }
  )) as AxiosResponse<{ message: string; data: TLeave[] }>;
  return response;
};

export { fetchLeaveApi };
