import { FormEvent, useState } from "react";

export const useSignup = () => {
  const [gender, setGender] = useState("0");

  const onSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      birthdate: data.get("birthdate"),
      sex: gender,
      password: data.get("password"),
    });
  };

  return { onSignup, setGender };
};
