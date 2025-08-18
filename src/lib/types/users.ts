export type UsersListView = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  isVerified: boolean;
};

export type UsersListAdmin = {
  data: UsersListView[];
  total: number;
  initial: number;
  last: number;
  totalPages: number;
  page: number;
};
