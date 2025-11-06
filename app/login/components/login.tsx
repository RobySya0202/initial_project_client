"use client";

import React, { useState } from "react";

import { Button, Paper, TextField, Typography } from "@mui/material";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [onLogin] = useLogin();

  return (
    <form
      onSubmit={onLogin}
      className="flex flex-col gap-y-4 w-96 h-1/2 p-10 bg-white rounded-lg shadow-md self-center"
    >
      <Typography variant="h4" color="black" gutterBottom>
        Login
      </Typography>
      <TextField
        id="email"
        label="Email"
        size="small"
        slotProps={{
          inputLabel: {
            sx: { fontSize: 14 },
          },
        }}
      />
      <TextField
        id="password"
        label="Password"
        size="small"
        slotProps={{
          inputLabel: {
            sx: { fontSize: 14 },
          },
        }}
      />
      <Button variant="contained">Login</Button>

      <Typography variant="subtitle2" color="black">
        Belum punya akun <a href="/signup">Register</a>
      </Typography>
    </form>
  );
};

export { Login };
