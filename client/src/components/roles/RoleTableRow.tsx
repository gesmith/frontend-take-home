import { useState } from "react";
import { DotsHorizontalIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Table, Flex, DropdownMenu, IconButton, Badge } from "@radix-ui/themes";
import type { Role } from "@/types";
import EditRoleModal from "./EditRoleModal";
import { formatDateTime } from "@/utils/dates";

type RoleTableRowProps = {
  role: Role;
};

const RoleTableRow = ({ role }: RoleTableRowProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const formattedDate = formatDateTime(role.createdAt, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <Table.Row align="center">
      <Table.RowHeaderCell py="2">
        <Flex gap="2" align="center">
          {role.name}
          {role.isDefault && (
            <Badge color="green" size="1" variant="surface">
              Default
            </Badge>
          )}
        </Flex>
      </Table.RowHeaderCell>
      <Table.Cell>{role.description}</Table.Cell>
      <Table.Cell>{formattedDate}</Table.Cell>
      <Table.Cell justify="end">
        <DropdownMenu.Root modal={false}>
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
            <DropdownMenu.Item
              onClick={() => {
                setIsEditModalOpen(true);
              }}
            >
              Edit role
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
            >
              Delete role
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <EditRoleModal
          role={role}
          isOpen={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default RoleTableRow;
