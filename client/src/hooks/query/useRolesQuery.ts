import { fetchRoles } from "@/api/roles";
import type { PaginationData } from "@/types";
import { queryOptions, useQuery } from "@tanstack/react-query";

const pagedRolesQueryOptions = (page: number, search: string) =>
  queryOptions({
    queryKey: ["roles", { page, search }],
    queryFn: async () => await fetchRoles(page, search),
    retry: 2, // If an error is hit, automatically retry
    enabled: true,
  });

type RolesQueryProps = {
  page?: number;
  search?: string;
};

const useRolesQuery = ({ page = 1, search = "" }: RolesQueryProps) => {
  const rolesQuery = useQuery(pagedRolesQueryOptions(page, search));
  const { isPending, isError, error, data, isFetching } = rolesQuery;
  const rolesData = data?.data;
  const paginationData: PaginationData = {
    next: data?.next,
    prev: data?.prev,
    pages: data?.pages,
  };
  return {
    isPending,
    isError,
    error,
    data: rolesData,
    isFetching,
    paginationData,
  };
};

export default useRolesQuery;
