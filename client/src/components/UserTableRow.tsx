import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Table,
  Flex,
  Avatar,
  DropdownMenu,
  IconButton,
} from "@radix-ui/themes";
import { format } from "date-fns";
import type { Role, User } from "../types";
import DeleteUserModal from "./DeleteUserModal";
import { useState } from "react";

type UserTableRowProps = {
  user: User;
  roles: Role[];
};

const findRole = (roles: Role[], roleId: string) => {
  if (!roleId) return;
  return roles?.find((role) => role.id === roleId);
};

const UserTableRow = ({ user, roles }: UserTableRowProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const userFullName = `${user.first} ${user.last}`;
  const userRole = findRole(roles, user.roleId)?.name;
  const formattedDate = format(user.createdAt, "PP");
  return (
    <Table.Row align="center">
      <Table.RowHeaderCell py="2">
        <Flex gap="2" align="center">
          <Avatar
            size="1"
            radius="full"
            src={user.photo}
            fallback={user.first}
          />
          {userFullName}
        </Flex>
      </Table.RowHeaderCell>
      <Table.Cell>{userRole}</Table.Cell>
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
            <DropdownMenu.Item disabled>Edit user</DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
            >
              Delete user
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <DeleteUserModal
          onOpenChange={setIsDeleteModalOpen}
          isOpen={isDeleteModalOpen}
          userFullName={userFullName}
          userId={user.id}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default UserTableRow;
