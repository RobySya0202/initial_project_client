"use client";
import { useAppSelector } from "@/app/services/state/hooks";
import { TLeave } from "@/app/services/state/leave/types";
import { Button, Chip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import moment from "moment";
import { useDashboard } from "../hooks/useDashboard";

export const Table = () => {
  const { role, rows } = useAppSelector((state) => {
    return {
      role: state.authReducer.user?.role,
      rows: state.leaveReducer.data,
    };
  });
  const { onAcceptLeave } = useDashboard();
  const acceptStatus: { [key: number]: { label: string; color: string } } = {
    0: { label: "Pending", color: "gray" },
    1: { label: "Diterima", color: "green" },
    2: { label: "Ditolak", color: "red" },
  };
  const columns: GridColDef[] = [
    {
      field: "leave_type",
      headerName: "Tipe Cuti",
      flex: 1,
      renderCell: (params: GridRenderCellParams<TLeave>) =>
        `Cuti ${params.row.leave_type.name}`,
    },
    {
      field: "requester",
      headerName: "Pemohon",
      flex: 1,
      renderCell: (params: GridRenderCellParams<TLeave>) =>
        `${params.row.user_requester.first_name} ${params.row.user_requester.last_name}`,
    },
    {
      field: "start_date",
      headerName: "Tanggal Mulai",
      flex: 1,
      renderCell: (params: GridRenderCellParams<TLeave>) =>
        moment(params.row.start_date).format("DD-MM-YYYY"),
    },
    {
      field: "end_date",
      headerName: "Tanggal Selesai",
      flex: 1,
      renderCell: (params: GridRenderCellParams<TLeave>) =>
        moment(params.row.end_date).format("DD-MM-YYYY"),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridRenderCellParams<TLeave>) => (
        <Chip
          label={acceptStatus[params.row.is_accepted].label}
          style={{
            backgroundColor: acceptStatus[params.row.is_accepted].color,
            color: "white",
          }}
        />
      ),
    },
    {
      field: "approver",
      headerName: "Penyetuju",
      flex: 1,
      renderCell: (params: GridRenderCellParams<TLeave>) =>
        params.row.user_approver
          ? `${params.row.user_approver.first_name} ${params.row.user_approver.last_name}`
          : "N/A",
    },
  ];
  const columnsAdmin: GridColDef[] = [
    ...columns,
    {
      field: "action",
      headerName: "Aksi",
      flex: 1,
      renderCell: (params: GridRenderCellParams<TLeave>) =>
        params.row.is_accepted !== 0 ? (
          <span>-</span>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                onAcceptLeave(params.row.id, true);
              }}
            >
              Terima
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                onAcceptLeave(params.row.id, false);
              }}
            >
              Tolak
            </Button>
          </div>
        ),
    },
  ];
  return (
    <DataGrid columns={role === "Admin" ? columnsAdmin : columns} rows={rows} />
  );
};
