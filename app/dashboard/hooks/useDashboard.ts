"use client";

import { showAlert } from "@/app/services/state/alert/alertSlice";
import { useAppDispatch, useAppSelector } from "@/app/services/state/hooks";
import { fetchLeaves } from "@/app/services/state/leave/leaveSlice";
import axios from "axios";

const useDashboard = () => {
  const { token } = useAppSelector((state) => {
    return {
      token: state.authReducer.token,
    };
  });
  const dispatch = useAppDispatch();
  const onFetchLeave = () => {
    dispatch(fetchLeaves({ token: token! }));
  };
  const onAcceptLeave = (leaveId: number, accept: boolean) => {
    axios
      .post(
        "http://localhost:8000/api/transaction-leave/approve",
        { leave_request_id: leaveId, is_approve: accept },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          showAlert({ message: "Leave approved successfully", type: "success" })
        );
        onFetchLeave();
      })
      .catch((err) => {
        dispatch(
          showAlert({ message: "Failed to approve leave", type: "error" })
        );
      });
  };
  const onRequestLeave = (leaveData: {
    id_leave_type: number;
    start_date: Date | null;
    end_date: Date | null;
  }) => {
    const data = {
      ...leaveData,
      start_date: leaveData.start_date?.toISOString().split("T")[0] || null,
      end_date: leaveData.end_date?.toISOString().split("T")[0] || null,
    };
    axios
      .post("http://localhost:8000/api/transaction-leave", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
      .then((res) => {
        dispatch(
          showAlert({
            message: "Leave requested successfully",
            type: "success",
          })
        );
        onFetchLeave();
      })
      .catch((err) => {
        dispatch(
          showAlert({ message: "Failed to request leave", type: "error" })
        );
      });
  };

  const onExport = () => {
    axios
      .get("http://localhost:8000/api/transaction-leave/export", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        responseType: "blob", // Important
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Riwayat Cuti Karyawan.xlsx");
        document.body.appendChild(link);
        link.click();
      });
  };

  return { onFetchLeave, onAcceptLeave, onRequestLeave, onExport };
};

export { useDashboard };
