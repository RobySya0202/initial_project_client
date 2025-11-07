import { Register } from "@/app/services/state/auth/authSlice";
import { useAppDispatch } from "@/app/services/state/hooks";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

export const useSignup = () => {
  const [gender, setGender] = useState("0");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
      first_name: data.get("first_name")?.toString(),
      last_name: data.get("last_name")?.toString(),
      birth_date: data.get("birth_date")?.toString(),
    };
    dispatch(Register(userData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        router.replace("/dashboard");
      }
    });
  };

  return { onSignup, setGender };
};
