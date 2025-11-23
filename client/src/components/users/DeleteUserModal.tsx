import { AlertDialog, Button, Callout, Flex, Strong } from "@radix-ui/themes";
import { useState } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import useUserMutations from "@/hooks/mutations/useUserMutations";

type DeleteUserModalProps = {
  userFullName: string;
  userId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const DeleteUserModal = ({
  userFullName,
  userId,
  isOpen,
  onOpenChange,
}: DeleteUserModalProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>();

  const { deleteUserAsync } = useUserMutations();

  const confirmDelete = async () => {
    setIsUpdating(true);
    await deleteUserAsync(userId, {
      onError: (error) => {
        setError(error);
        setIsUpdating(false);
      },
      onSuccess: () => {
        setIsUpdating(false);
        setError(null);
      },
    });
  };

  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={(value) => {
        setError(null);
        setIsUpdating(false);
        onOpenChange(value);
      }}
    >
      <AlertDialog.Content maxWidth="488px">
        <AlertDialog.Title>Delete user</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? The user <Strong>{userFullName}</Strong> will be
          permanently deleted.
        </AlertDialog.Description>
        {error && (
          <Callout.Root color="red" role="alert" mb="4" mt="4">
            <Callout.Icon>
              <ExclamationTriangleIcon />
            </Callout.Icon>
            <Callout.Text>
              Oops! Something went wrong. Please try again.
            </Callout.Text>
          </Callout.Root>
        )}
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="outline" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <Button
            onClick={confirmDelete}
            variant="outline"
            color="red"
            loading={isUpdating}
          >
            Delete User
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteUserModal;
