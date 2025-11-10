"use client";

import ConfirmationDialog from "@/app/common/ConfirmationModal";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

export type UserCreateFormValues = {
  first_name: string;
  last_name: string;
  birthday: string;
  sex: string;
  email: string;
  password: string;
};

type UserFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserCreateFormValues) => void;
  initialData?: UserCreateFormValues;
  mode?: "create" | "edit";
};

export default function CreateUserForm({
  open,
  onClose,
  onSubmit,
  initialData,
  mode,
}: UserFormModalProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm<UserCreateFormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      birthday: "",
      sex: "",
      email: "",
      password: "",
    },
  });

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpenConfirm = () => setConfirmOpen(true);
  const handleCloseConfirm = () => setConfirmOpen(false);

  const handleConfirmSubmit = () => {
    const data = getValues(); // get current form values
    onSubmit(data);
    reset();
    setConfirmOpen(false);
    onClose();
  };

  const isEdit = mode === "edit";

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        first_name: "",
        last_name: "",
        birthday: "",
        sex: "",
        email: "",
        password: "",
      });
    }
  }, [initialData, reset]);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEdit ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <form id="user-form" onSubmit={handleSubmit(handleOpenConfirm)}>
            <Stack spacing={2} mt={1}>
              <Controller
                name="first_name"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="last_name"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="birthday"
                control={control}
                rules={{ required: "Birthday is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Birthday"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.birthday}
                    helperText={errors.birthday?.message}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="sex"
                control={control}
                rules={{ required: "Please select gender" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Gender"
                    error={!!errors.sex}
                    helperText={errors.sex?.message}
                    fullWidth
                  >
                    <MenuItem value="0">Perempuan</MenuItem>
                    <MenuItem value="1">Laki - Laki</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                  />
                )}
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" form="user-form" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        open={confirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmSubmit}
        title={
          isEdit ? "Konfirmasi Perubahan Data" : "Konfirmasi Pembuatan Akun"
        }
        message={
          isEdit
            ? "Apakah yakin ingin menyimpan perubahan data pengguna ini?"
            : "Apakah yakin akan membuat akun baru?"
        }
        confirmText={isEdit ? "Perbarui" : "Simpan"}
      />
    </>
  );
}
