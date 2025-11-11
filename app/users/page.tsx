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
import UserForm from "./components/UserForm";
import { fetchUserApi } from "../services/api/users/show";
import ConfirmationDialog from "../common/ConfirmationModal";

const UserPage = () => {
  const dispatch = useAppDispatch();
  const { onFetchUsers, onFetchUser, onEditUser, onDeleteUser } = useUsers();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const limitOptions = [3, 5, 10, 20];
  const [currentUserEdit, setCurrentUserEdit] = useState<
    UserCreateFormValues | undefined
  >(undefined);
  const [currentUserEditId, setCurrentUserId] = useState<number>(0);
  const [currentUserDeleteId, setCurentUserDeleteId] = useState<number>(0);
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
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const router = useRouter();

  const handleOpenCreateForm = () => {
    setModalMode("create");
    setOpenFormModal(true);
  };

  const handleOpenEditForm = (id: number) => {
    onFetchUser(id).then((res) => {
      const user: UserCreateFormValues = {
        email: res?.email || "",
        first_name: res?.first_name || "",
        last_name: res?.last_name || "",
        birthday: res ? moment(res.birthday).format("YYYY-MM-DD") : "",
        sex: res ? String(res.sex) : "",
        password: "",
      };
      setCurrentUserEdit(user);
      setModalMode("edit");
      setCurrentUserId(id);
      setOpenFormModal(true);
    });
  };

  const onSubmitUserForm = async (data: UserCreateFormValues) => {
    switch (modalMode) {
      case "create":
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
        break;
      case "edit":
        const status = await onEditUser(
          { ...data, id: currentUserEditId, sex: Number(data.sex) },
          currentUserEditId
        );
        if (status !== 200) {
          dispatch(showAlert({ message: "Failed Update User", type: "error" }));
        } else {
          dispatch(
            showAlert({ message: "Update User Successfully", type: "success" })
          );
        }
        break;
      default:
        break;
    }
    onFetchUsers(page, limit);
  };

  const handleDeleteUser = () => {
    onDeleteUser(currentUserDeleteId).then((res) => {
      if (res !== 200) {
        dispatch(showAlert({ message: "Failed Delete User", type: "error" }));
        setOpenDeleteConfirmationModal(false);
      } else {
        dispatch(
          showAlert({ message: "Success Delete User", type: "success" })
        );
      }
      onFetchUsers(page, limit);
    });
  };

  const columns = useMemo(() => {
    return [
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
            <Button
              variant="contained"
              startIcon={<Edit />}
              color="success"
              onClick={() => {
                handleOpenEditForm(param.row.id);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<Delete />}
              color="error"
              onClick={() => {
                setOpenDeleteConfirmationModal(true);
                setCurentUserDeleteId(param.row.id);
              }}
            >
              Hapus
            </Button>
          </Box>
        ),
      },
    ];
  }, [rows]);
  useEffect(() => {
    onFetchUsers(page, limit);
  }, [paginationModel, page, limit]);
  return (
    <div className="w-full h-screen bg-blue-100 flex flex-col py-20 px-50">
      <UserForm
        open={openFormModal}
        onClose={() => {
          setOpenFormModal(false);
        }}
        onSubmit={onSubmitUserForm}
        initialData={currentUserEdit}
        mode={modalMode}
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

      <ConfirmationDialog
        open={openDeleteConfirmationModal}
        onClose={() => {
          setOpenDeleteConfirmationModal(false);
        }}
        onConfirm={handleDeleteUser}
        title="Delete User"
        message="Are you sure want to delete this user ?"
        confirmText="delete"
      />
    </div>
  );
};
export default UserPage;
