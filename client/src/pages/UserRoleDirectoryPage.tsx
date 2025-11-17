import {
  Tabs,
  Box,
  Text,
  Table,
  IconButton,
  Button,
  Flex,
  Avatar,
} from "@radix-ui/themes";
import { DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { format as formatDate } from "date-fns";
import { fetchUsers, fetchRoles } from "../api/users";
import PaginationTableRow from "../components/PaginationTableRow";
import SearchInput from "../components/SearchInput";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchResults, setSearchResults] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const usersResult = await fetchUsers();
      setUsers(usersResult.data);
    };
    const getRoles = async () => {
      const rolesResult = await fetchRoles();
      setRoles(rolesResult.data);
      console.log(rolesResult.data);
    };
    Promise.all([getUsers(), getRoles()]);
  }, []);

  const onSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchInputValue(value);
    },
    []
  );

  const findRole = (roleId: string) => {
    if (!roleId) return;
    return roles.find((role) => role.id === roleId);
  };

  return (
    <Tabs.Root defaultValue="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Users</Tabs.Trigger>
        <Tabs.Trigger value="documents">Roles</Tabs.Trigger>
      </Tabs.List>

      <Flex gap="3" mt="5" mb="4">
        <Box flexGrow="1">
          <SearchInput
            placeholder="Search by name..."
            searchInputValue={searchInputValue}
            onChange={onSearchChange}
          />
        </Box>
        <Box>
          <Button>
            <PlusIcon /> Add User
          </Button>
        </Box>
      </Flex>

      <Box pt="3">
        <Tabs.Content value="account">
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Joined</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.id} align="center">
                  <Table.RowHeaderCell py="2">
                    <Flex gap="2" align="center">
                      <Avatar
                        size="1"
                        radius="full"
                        src={user.photo}
                        fallback={user.first}
                      />
                      {user.first} {user.last}
                    </Flex>
                  </Table.RowHeaderCell>
                  <Table.Cell>{findRole(user.roleId)?.name}</Table.Cell>
                  <Table.Cell>{formatDate(user.createdAt, "PP")}</Table.Cell>
                  <Table.Cell justify="end">
                    <IconButton variant="ghost" radius="full">
                      <DotsHorizontalIcon
                        width="16"
                        color="gray"
                        enableBackground="true"
                        height="16"
                      />
                    </IconButton>
                  </Table.Cell>
                </Table.Row>
              ))}
              <PaginationTableRow
                onClickNext={() => {}}
                onClickPrevious={() => {}}
                isNextDisabled={false}
                isPreviousDisabled
                colSpan={4}
              />
            </Table.Body>
          </Table.Root>
        </Tabs.Content>

        <Tabs.Content value="documents">
          <Text size="2">Access and update your documents.</Text>
        </Tabs.Content>

        <Tabs.Content value="settings">
          <Text size="2">Edit your profile or update contact information.</Text>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
