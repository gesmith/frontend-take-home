import { AlertDialog, Button, Flex, Strong } from "@radix-ui/themes";
import { useCallback } from "react";
import { deleteUser } from "../api/users";

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
  const confirmDelete = useCallback(() => {
    deleteUser(userId);
    onOpenChange(false);
    console.log(userId, " deleted");
  }, [onOpenChange, userId]);

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete user</AlertDialog.Title>
        <AlertDialog.Description>
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
