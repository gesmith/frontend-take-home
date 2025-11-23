export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  first: string;
  last: string;
  roleId: string;
  photo?: string;
}

export interface UserWithRole extends Omit<User, "roleId"> {
  role?: Role;
}

export interface Role {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  isDefault: boolean;
}

export interface PaginationData {
  next: number | null;
  prev: number | null;
  pages: number;
}
