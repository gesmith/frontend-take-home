import { updateUser, deleteUser } from "@/api/users";
import type { User } from "@/types";
import {
  useMutation,
  useQueryClient,
  type MutateOptions,
} from "@tanstack/react-query";

const useUserMutations = () => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: (updatedUser: User) => {
      return updateUser(updatedUser);
    },
    onError: (error) => {
      console.log("Edit user error: ", error);
      return error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const updateUserAsync = async (
    updatedUser: User,
    options?: MutateOptions<User, Error, User, unknown> | undefined
  ) => {
    return await updateUserMutation.mutateAsync(updatedUser, options);
  };

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => {
      return deleteUser(userId);
    },
    onError: (error) => {
      console.log("Edit user error: ", error);
      return error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const deleteUserAsync = async (
    userId: string,
    options?: MutateOptions<void, Error, string, unknown> | undefined
  ) => {
    return await deleteUserMutation.mutateAsync(userId, options);
  };

  return {
    updateUserAsync,
    deleteUserAsync,
  };
};

export default useUserMutations;
