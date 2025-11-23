import { updateRole } from "@/api/roles";
import type { Role } from "@/types";
import {
  useMutation,
  useQueryClient,
  type MutateOptions,
} from "@tanstack/react-query";

const useRoleMutations = () => {
  const queryClient = useQueryClient();

  const updateRoleMutation = useMutation({
    mutationFn: (updatedRole: Role) => {
      return updateRole(updatedRole);
    },
    onError: (error) => {
      return error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });

  const updateRoleAsync = async (
    updatedRole: Role,
    options?: MutateOptions<Role, Error, Role, unknown> | undefined
  ) => {
    return await updateRoleMutation.mutateAsync(updatedRole, options);
  };

  return {
    updateRoleAsync,
  };
};

export default useRoleMutations;
