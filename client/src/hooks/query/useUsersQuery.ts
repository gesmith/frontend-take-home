import { fetchUsers } from "@/api/users";
import type { User, PaginationData, Role } from "@/types";
import { queryOptions, useQuery } from "@tanstack/react-query";
import useRolesQuery from "./useRolesQuery";

const pagedUsersQueryOptions = (
  page: number,
  search: string,
  includeRoles: boolean
) =>
  queryOptions({
    queryKey: ["users", { page, search, includeRoles }],
    queryFn: async () => await fetchUsers(page, search),
    retry: 2, // If an error is hit, automatically retry
  });

type UsersQueryProps = {
  page?: number;
  search?: string;
  includeRoles?: boolean;
};

const useUsersQuery = ({
  page = 1,
  search = "",
  includeRoles = true,
}: UsersQueryProps) => {
  const {
    data: rolesData,
    isPending: isRolesPending,
    isFetching: isRolesFetching,
  } = useRolesQuery({ page: 1, search: "" });

  const query = useQuery(pagedUsersQueryOptions(page, search, includeRoles));
  const { isPending, isError, error, data, isFetching } = query;
  const usersData: User[] = data?.data;
  const paginationData: PaginationData = {
    next: data?.next,
    prev: data?.prev,
    pages: data?.pages,
  };

  // Map users' roles to their object.
  if (includeRoles && usersData && rolesData) {
    const userRoleMap = usersData.map((user) => ({
      ...user,
      role: rolesData.find((role: Role) => role.id === user.roleId),
    }));
    return {
      isPending,
      isError,
      error,
      data: userRoleMap,
      isFetching,
      paginationData,
      isRolesPending,
      isRolesFetching,
    };
  }

  return {
    isPending,
    isError,
    error,
    data: usersData,
    isFetching,
    paginationData,
  };
};

export default useUsersQuery;
