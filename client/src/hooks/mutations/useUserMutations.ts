import { addUser, updateUser, deleteUser } from "@/api/users";
import type { NewUser, User } from "@/types";
import {
  useMutation,
  useQueryClient,
  type MutateOptions,
} from "@tanstack/react-query";

const useUserMutations = () => {
  const queryClient = useQueryClient();

  const addUserMutation = useMutation({
    mutationFn: (newUser: NewUser) => {
      return addUser(newUser);
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

  const addUserAsync = async (
    newUser: NewUser,
    options?: MutateOptions<NewUser, Error, NewUser, unknown> | undefined
  ) => {
    return await addUserMutation.mutateAsync(newUser, options);
  };

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
    addUserAsync,
    updateUserAsync,
    deleteUserAsync,
  };
};

export default useUserMutations;
