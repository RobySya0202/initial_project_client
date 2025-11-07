"use client";
import * as React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export type LeaveRequestForm = {
  jenisCuti: string;
  tanggalMulai: Date | null;
  tanggalSelesai: Date | null;
  karyawan: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: LeaveRequestForm) => void;
};

const jenisCutiOptions = [
  { value: 1, label: "Cuti Reguler" },
  { value: 2, label: "Cuti Sakit" },
];

const karyawanOptions = [
  { value: "emp001", label: "Budi Santoso" },
  { value: "emp002", label: "Siti Aminah" },
  { value: "emp003", label: "Andi Wijaya" },
];

export default function LeaveRequestModal({ open, onClose, onSubmit }: Props) {
  const { control, handleSubmit, reset } = useForm<LeaveRequestForm>({
    defaultValues: {
      jenisCuti: "",
      tanggalMulai: null,
      tanggalSelesai: null,
      karyawan: "",
    },
  });

  const handleFormSubmit = (data: LeaveRequestForm) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" textAlign="center">
          Form Cuti Karyawan
        </Typography>

        {/* Pilih Jenis Cuti */}
        <Controller
          name="jenisCuti"
          control={control}
          rules={{ required: "Jenis cuti wajib dipilih" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              select
              label="Pilih Jenis Cuti"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              {jenisCutiOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Tanggal Mulai Cuti */}
        <Controller
          name="tanggalMulai"
          control={control}
          rules={{ required: "Tanggal mulai wajib diisi" }}
          render={({ field, fieldState }) => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Tanggal Mulai Cuti"
                value={moment(field.value)}
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />

        {/* Tanggal Selesai Cuti */}
        <Controller
          name="tanggalSelesai"
          control={control}
          rules={{ required: "Tanggal selesai wajib diisi" }}
          render={({ field, fieldState }) => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              {" "}
              <DatePicker
                label="Tanggal Selesai Cuti"
                value={moment(field.value)}
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
              />
            </LocalizationProvider>
          )}
        />

        {/* Karyawan Yang Cuti
        <Controller
          name="karyawan"
          control={control}
          rules={{ required: "Pilih karyawan yang cuti" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              select
              label="Karyawan Yang Cuti"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              {karyawanOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        /> */}

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
        >
          <Button onClick={onClose} color="inherit">
            Batal
          </Button>
          <Button type="submit" variant="contained">
            Ajukan
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
