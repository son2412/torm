export type LoginData = {
  email: string;
  password: string;
};

export type SignUpData = {
  email: string;
  password: string;
  phone?: string;
  gender?: number;
  first_name?: string;
  last_name?: string;
  birth?: string;
};
