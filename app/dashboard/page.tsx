"use client";
import { GetApp } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Table } from "./components/table";
import { useDashboard } from "./hooks/useDashboard";
import { useEffect, useState } from "react";
import LeaveRequestModal, {
  LeaveRequestForm,
} from "../common/CreateLeaveModal";
import { useAppSelector } from "../services/state/hooks";

const Dashboard = () => {
  const { onFetchLeave, onRequestLeave, onExport } = useDashboard();
  const [open, setOpen] = useState(false);
  const { role } = useAppSelector((state) => {
    return {
      role: state.authReducer.user?.role,
    };
  });

  const handleSubmit = (data: LeaveRequestForm) => {
    const leaveData = {
      id_leave_type: Number(data.jenisCuti),
      start_date: data.tanggalMulai,
      end_date: data.tanggalSelesai,
    };
    onRequestLeave(leaveData);
  };
  useEffect(() => {
    setTimeout(() => {
      onFetchLeave();
    }, 1500);
  }, []);
  return (
    <div className="bg-white">
      <LeaveRequestModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
      <div className="w-full p-24 bg-blue-500">
        {" "}
        <div className="xl:flex md:flex sm:flex flex-row gap-10 justify-between items-center">
          <div className="flex items-center gap-4 sm:mb-0 mb-8">
            <GetApp className="text-7xl bg-grey-200 p-8 rounded-6" />
            <div className="header-title">
              <Typography
                variant="h4"
                className="mx-6 text-xl mb-0 font-semibold leading-tight tracking-tight md:leading-none"
              >
                Leavo
              </Typography>
              <Typography
                className="mx-6 leading-6 truncate"
                color="text.secondary"
              >
                Employee Leave History
              </Typography>
            </div>
          </div>
          <div className="sm:flex flex-row gap-10 items-center">
            {role === "Admin" && (
              <Button
                variant="contained"
                color="primary"
                className="w-full sm:my-0 my-12 text-white"
                aria-label="Export To Excel"
                type="button"
                size="medium"
                onClick={onExport}
              >
                Export
              </Button>
            )}

            {role === "Employee" && (
              <Button
                variant="contained"
                color="secondary"
                className="w-full sm:my-0 my-12 text-white"
                aria-label="Export To Excel"
                type="button"
                size="medium"
                onClick={setOpen.bind(this, true)}
              >
                Request Leave
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="w-full p-24">
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
