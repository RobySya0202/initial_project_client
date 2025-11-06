"use client";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Datepicker } from "@/app/common/DatePicker";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const { onSignup, setGender } = useSignup();

  return (
    <form
      onSubmit={onSignup}
      className="flex flex-col gap-y-4 w-96 h-fit p-10 bg-white rounded-lg shadow-md self-center"
    >
      <Typography variant="h4" color="black" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        name="email"
        label="Email"
        size="small"
        slotProps={{
          inputLabel: {
            sx: { fontSize: 14 },
          },
        }}
      />
      <TextField
        name="first_name"
        label="First Name"
        size="small"
        slotProps={{
          inputLabel: {
            sx: { fontSize: 14 },
          },
        }}
      />
      <TextField
        name="last_name"
        label="Last Name"
        size="small"
        slotProps={{
          inputLabel: {
            sx: { fontSize: 14 },
          },
        }}
      />
      <Datepicker label="Birthdate" name="birthdate" />
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <FormLabel id="gender" sx={{ minWidth: "fit-content" }}>
          Gender
        </FormLabel>
        <RadioGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="Male"
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "black",
              },
            }}
          />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="Female"
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "black",
              },
            }}
          />
        </RadioGroup>
      </FormControl>
      <TextField
        name="password"
        label="Password"
        size="small"
        slotProps={{
          inputLabel: {
            sx: { fontSize: 14 },
          },
        }}
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
      <Typography variant="subtitle2" color="black">
        Sudah punya akun <a href="/login">Login</a>
      </Typography>
    </form>
  );
};

export { Signup };
