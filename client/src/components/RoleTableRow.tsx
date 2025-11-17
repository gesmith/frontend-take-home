import { DotsHorizontalIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Table, Flex, DropdownMenu, IconButton } from "@radix-ui/themes";
import { format } from "date-fns";
import type { Role } from "../types";
import { useState } from "react";

type RoleTableRowProps = {
  role: Role;
};

const RoleTableRow = ({ role }: RoleTableRowProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const formattedDate = format(role.createdAt, "PP");
  return (
    <Table.Row align="center">
      <Table.RowHeaderCell py="2">
        <Flex gap="2" align="center">
          {role.isDefault && <StarFilledIcon aria-label="Default role" />}
          {role.name}
        </Flex>
      </Table.RowHeaderCell>
      <Table.Cell>{role.description}</Table.Cell>
      <Table.Cell>{formattedDate}</Table.Cell>
      <Table.Cell justify="end">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton variant="ghost" radius="full">
              <DotsHorizontalIcon
                width="16"
                color="gray"
                enableBackground="true"
                height="16"
              />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item disabled={role.isDefault}>
              Set as default
            </DropdownMenu.Item>
            <DropdownMenu.Item disabled>Edit role</DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
            >
              Delete role
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Table.Cell>
    </Table.Row>
  );
};

export default RoleTableRow;
