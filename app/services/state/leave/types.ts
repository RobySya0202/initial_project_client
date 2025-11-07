export type TLeave = {
  is_accepted: number;
  created_at: string;
  updated_at: string;
  id: number;
  start_date: string;
  end_date: string;
  id_users_requester: number;
  id_users_approver: number | null;
  id_leave_type: number;
  user_requester: {
    id: number;
    first_name: string;
    last_name: string;
  };
  user_approver: {
    id: number;
    first_name: string;
    last_name: string;
  } | null;
  leave_type: {
    id: number;
    name: string;
  };
};
