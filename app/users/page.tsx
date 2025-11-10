"use client";
import { useEffect, useMemo, useState } from "react";
import { useUsers } from "./hooks/useUsers";
import { Box, Button, Chip, IconButton, Paper } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useAppDispatch, useAppSelector } from "../services/state/hooks";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TUser } from "../services/state/users/types";
import moment from "moment";
import CreateUserForm, { UserCreateFormValues } from "./components/CreateForm";
import { StoreUserApi } from "../services/api/users/store";
import { showAlert } from "../services/state/alert/alertSlice";
import { useRouter } from "next/navigation";

const columns: GridColDef<TUser>[] = [
  {
    field: "name",
    headerName: "Nama Lengkap",
    flex: 1,
    renderCell: (param: GridRenderCellParams<TUser>) =>
      param.row.first_name + " " + param.row.last_name,
  },
  {
    field: "email",
    headerName: "email",
    flex: 1,
  },
  {
    field: "sex",
    headerName: "Jenis Kelamin",
    flex: 1,
    renderCell: (param: GridRenderCellParams<TUser>) =>
      param.row.sex == 1 ? (
        <Chip color="primary" label="Perempuan" />
      ) : (
        <Chip color="secondary" label="Laki - Laki" />
      ),
  },
  {
    field: "birthday",
    headerName: "Tanggal Lahir",
    flex: 1,
    renderCell: (param: GridRenderCellParams<TUser>) =>
      moment(param.row.birthday).format("DD-MM-YYYY"),
  },
  {
    field: "action",
    headerName: "Aksi",
    flex: 1,
    renderCell: (param: GridRenderCellParams<TUser>) => (
      <Box className="flex gap-2">
        <Button variant="contained" startIcon={<Edit />} color="success">
          Edit
        </Button>
        <Button variant="contained" startIcon={<Delete />} color="error">
          Hapus
        </Button>
      </Box>
    ),
  },
];

const UserPage = () => {
  const dispatch = useAppDispatch();
  const { onFetchUsers } = useUsers();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const limitOptions = [3, 5, 10, 20];
  const paginationModel = useMemo(
    () => ({ page, pageSize: limit }),
    [page, limit]
  );
  const { rows, isLoading, pagination } = useAppSelector((state) => {
    return {
      rows: state.userReducer.data,
      isLoading: state.userReducer.isLoading,
      pagination: state.userReducer.pagination,
    };
  });
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const router = useRouter();

  const handleOpenCreateForm = () => {
    setOpenCreateModal(true);
  };

  const onSubmitCreateUser = async (data: UserCreateFormValues) => {
    try {
      await StoreUserApi(data);
      dispatch(
        showAlert({
          message: "Success Create New User",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlert({
          message: "Failed Create User",
          type: "error",
        })
      );
    }
  };

  

  useEffect(() => {
    onFetchUsers(page, limit);
  }, [paginationModel, page, limit]);
  return (
    <div className="w-full h-screen bg-blue-100 flex flex-col py-20 px-50">
      <CreateUserForm
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        onSubmit={onSubmitCreateUser}
      />
      <Paper
        sx={{ borderRadius: "15px" }}
        elevation={8}
        className="flex flex-row justify-between  col-span-2 content-center py-3 px-6 mb-10 w-full"
      >
        <h5 className="flex items-center font-bold text-[#9E9E9E]">
          User List
        </h5>
        <Box className="flex flex-row justify-end items-center gap-4">
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              borderRadius: "15px",
              color: "white",
              bgcolor: "#2196F3",
            }}
            className="font-bold"
            onClick={handleOpenCreateForm}
          >
            Add User
          </Button>
          <IconButton
            aria-label="back"
            sx={{ color: "#81D4FA" }}
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            <ArrowCircleLeftOutlinedIcon />
          </IconButton>
        </Box>
      </Paper>
      <Paper sx={{ borderRadius: "15px", padding: 2 }} elevation={8}>
        <DataGrid
          columns={columns}
          rows={rows}
          loading={isLoading}
          paginationMode="server"
          paginationModel={paginationModel}
          initialState={{
            pagination: {
              paginationModel: paginationModel,
            },
          }}
          onPaginationModelChange={(value) => {
            setLimit(value.pageSize);
            setPage(value.page);
          }}
          pageSizeOptions={limitOptions}
          rowCount={pagination.total}
        />
      </Paper>
    </div>
  );
};
export default UserPage;
