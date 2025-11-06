type AuthResponse = {
  message: string;
  token: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    birthdate: string;
    sex: number;
    id: string;
    role: {
      name: string;
    };
  };
};

type user = {
  email: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  sex: number;
  role: string;
};

export type { AuthResponse, user };