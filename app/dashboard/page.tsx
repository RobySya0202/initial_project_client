"use client";

import { Face, Logout } from "@mui/icons-material";
import { Box, Chip, IconButton, Paper, Typography } from "@mui/material";
import { useAppSelector } from "../services/state/hooks";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import { DashboardCard } from "./components/DashboardCard";

const Dashboard = () => {
  const { user } = useAppSelector((state) => {
    return {
      user: state.authReducer.user,
    };
  });
  const totalUser = 10;
  const totalLeaveRequests = 25;
  return (
    <div className="w-full bg-blue-100 h-screen py-20 px-72">
      <div className="grid grid-cols-2 gap-5">
        <Paper
          sx={{ borderRadius: "15px" }}
          elevation={8}
          className="flex flex-row justify-between h-11 col-span-2 content-center px-6 mb-10"
        >
          <h5 className="flex items-center font-bold text-[#9E9E9E]">Leavo</h5>
          <Box className="flex flex-row justify-end items-center gap-4">
            <Chip
              icon={<Face />}
              label={user ? user.first_name + user.last_name : "-"}
            />
            <IconButton aria-label="logout" sx={{ color: "#81D4FA" }}>
              <Logout />
            </IconButton>
          </Box>
        </Paper>
        <Paper
          sx={{
            borderRadius: "15px",
            backgroundImage:
              'linear-gradient(to right, rgba(0,0,0,0), white),url("/calendar2.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          elevation={8}
          className="col-span-2 h-52 flex justify-end p-10"
        >
          <Box>
            <Typography variant="h3" className="font-bold mb-4">
              Welcome, {user ? ` ${user.first_name}` : " -"}
            </Typography>
            <Typography variant="body1" className="text-[#616161]">
              Here quick overview of your leave management system dashboard.
            </Typography>
          </Box>
        </Paper>
        <DashboardCard
          icon={ManageAccountsTwoToneIcon}
          title="User Management"
          subtitle="Overseve and control all user accounts and roles within a system"
          latestInfo={`${totalUser} Active Users`}
          route="users"
        />
        <DashboardCard
          icon={CalendarMonthTwoToneIcon}
          title="Leave Management"
          subtitle="Manage employee leave requests, approvals, and balances efficiently"
          latestInfo={`${totalLeaveRequests} Leave Requests`}
          route="leaves"
        />
      </div>
    </div>
  );
};

export default Dashboard;
