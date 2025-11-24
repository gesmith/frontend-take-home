import { useState } from "react";
import {
  Dialog,
  Button,
  Flex,
  TextField,
  Text,
  Callout,
  VisuallyHidden,
  Select,
  Badge,
} from "@radix-ui/themes";
import type { NewUser, Role } from "@/types";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import useUserMutations from "@/hooks/mutations/useUserMutations";
import useRolesQuery from "@/hooks/query/useRolesQuery";

type AddUserModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const AddUserModal = ({ isOpen, onOpenChange }: AddUserModalProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>();

  const { addUserAsync } = useUserMutations();

  // Keeping the form uncontrolled for now but if we wanted to add client-side validation, we can switch to controlled.
  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    const newUser = { ...formJson } as NewUser;
    console.log(newUser);
    setIsUpdating(true);
    await addUserAsync(newUser, {
      onError: (error) => {
        setError(error);
        setIsUpdating(false);
      },
      onSuccess: () => {
        setIsUpdating(false);
        setError(null);
        onOpenChange(false);
      },
    });
  };

  const { data: roles } = useRolesQuery({});
  const defaultRoleId = roles?.find((role: Role) => role.isDefault).id;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add new user</Dialog.Title>
        <VisuallyHidden>
          <Dialog.Description mb="2">Add new user</Dialog.Description>
        </VisuallyHidden>
        <form method="patch" onSubmit={onSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" weight="bold">
                First name
              </Text>
            </label>
            <TextField.Root
              required
              name="first"
              placeholder="First name"
              disabled={isUpdating}
            />
            <label>
              <Text as="div" size="2" weight="bold">
                Last name
              </Text>
            </label>
            <TextField.Root
              name="last"
              placeholder="Last name"
              required
              disabled={isUpdating}
            />
            <label>
              <Text as="div" size="2" weight="bold">
                Role
              </Text>
            </label>
            <Select.Root
              name="roleId"
              size="2"
              defaultValue={defaultRoleId}
              disabled={isUpdating}
              required
            >
              <Select.Trigger />
              <Select.Content>
                {roles?.map((role: Role) => (
                  <Select.Item key={role.id} value={role.id}>
                    {role.isDefault ? <Badge>Default</Badge> : ""} {role.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>
          {error && (
            <Callout.Root color="red" role="alert" mt="3" mb="3">
              <Callout.Icon>
                <ExclamationTriangleIcon />
              </Callout.Icon>
              <Callout.Text>
                Oops! Something went wrong. Please try again.
                {error.message && (
                  <>
                    <br />
                    {error.message}
                  </>
                )}
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

export default AddUserModal;
