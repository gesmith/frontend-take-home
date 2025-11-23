import { useState } from "react";
import {
  Dialog,
  Button,
  Flex,
  TextField,
  Text,
  TextArea,
  Callout,
  VisuallyHidden,
} from "@radix-ui/themes";
import type { Role } from "@/types";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import useRoleMutations from "@/hooks/mutations/useRoleMutations";

type EditRoleModalProps = {
  role: Role;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const EditRoleModal = ({ role, isOpen, onOpenChange }: EditRoleModalProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>();

  const { updateRoleAsync } = useRoleMutations();

  // Keeping the form uncontrolled for now but if we wanted to add client-side validation, we can switch to controlled.
  const onConfirmEdit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    const updatedRole: Role = { ...role, ...formJson };
    console.log(updatedRole);
    setIsUpdating(true);
    await updateRoleAsync(updatedRole, {
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
    <Dialog.Root
      open={isOpen}
      onOpenChange={(value) => {
        setError(null);
        setIsUpdating(false);
        onOpenChange(value);
      }}
    >
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit role</Dialog.Title>
        <VisuallyHidden>
          <Dialog.Description mb="2">Edit {role.name}</Dialog.Description>
        </VisuallyHidden>
        <form method="patch" onSubmit={onConfirmEdit}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
            </label>
            <TextField.Root
              name="name"
              defaultValue={role.name}
              placeholder="Enter the role's name"
              disabled={isUpdating}
            />
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
            </label>
            <TextArea
              name="description"
              defaultValue={role.description}
              placeholder="Enter the role's description"
              disabled={isUpdating}
            />
          </Flex>
          {error && (
            <Callout.Root color="red" role="alert" mt="3" mb="3">
              <Callout.Icon>
                <ExclamationTriangleIcon />
              </Callout.Icon>
              <Callout.Text>
                Oops! Something went wrong. Please try again.
              </Callout.Text>
            </Callout.Root>
          )}
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit" loading={isUpdating}>
              Save
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditRoleModal;
