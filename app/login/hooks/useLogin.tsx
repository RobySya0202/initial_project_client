"use client";
import { Login } from "@/app/services/state/auth/authSlice";
import { useAppDispatch } from "@/app/services/state/hooks";
import { useRouter } from "next/navigation";

import { FormEvent } from "react";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
      first_name: data.get("first_name")?.toString(),
      last_name: data.get("last_name")?.toString(),
      birth_date: data.get("birth_date")?.toString(),
    };
    dispatch(Login(userData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        router.push("/dashboard");
      }
    });
  };
  return {
    onLogin,
  };
};
