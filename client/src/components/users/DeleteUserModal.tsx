import { AlertDialog, Button, Flex, Strong } from "@radix-ui/themes";
import { useCallback } from "react";
import { deleteUser } from "@/api/users";

type DeleteUserModalProps = {
  userFullName: string;
  userId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  refetch: () => void;
};

const DeleteUserModal = ({
  userFullName,
  userId,
  isOpen,
  onOpenChange,
  refetch,
}: DeleteUserModalProps) => {
  const confirmDelete = useCallback(async () => {
    await deleteUser(userId);
    await refetch();
    onOpenChange(false);
    console.log(userId, " deleted");
  }, [onOpenChange, userId, refetch]);

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Content maxWidth="488px">
        <AlertDialog.Title>Delete user</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? The user <Strong>{userFullName}</Strong> will be
          permanently deleted.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="outline" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={confirmDelete}>
            <Button variant="outline" color="red">
              Delete User
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteUserModal;
