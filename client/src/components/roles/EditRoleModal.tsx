import { useCallback } from "react";
import {
  Dialog,
  Button,
  Flex,
  TextField,
  Text,
  TextArea,
} from "@radix-ui/themes";
import type { Role } from "@/types";
import { editRole } from "@/api/roles";

type EditRoleModalProps = {
  role: Role;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const EditRoleModal = ({ role, isOpen, onOpenChange }: EditRoleModalProps) => {
  // Keeping the form uncontrolled for now but if we wanted to add client-side validation, we can switch to controlled.
  const onConfirmEdit = useCallback(
    async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formJson = Object.fromEntries(formData.entries());
      const updatedRole: Role = { ...role, ...formJson };
      console.log(updatedRole);
      await editRole(updatedRole);
    },
    [role]
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit role</Dialog.Title>
        <form method="patch" onSubmit={onConfirmEdit}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root
                name="name"
                defaultValue={role.name}
                placeholder="Enter the role's name"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextArea
                name="description"
                defaultValue={role.description}
                placeholder="Enter the role's description"
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit">Save</Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditRoleModal;
