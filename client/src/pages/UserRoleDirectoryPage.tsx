import { Tabs, Box, Text, Table, Button, Flex } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { fetchUsers, fetchRoles } from "../api/users";
import PaginationTableRow from "../components/PaginationTableRow";
import SearchInput from "../components/SearchInput";
import UserTableRow from "../components/UserTableRow";
import { type User, type Role } from "../types";
import RoleTableRow from "../components/RoleTableRow";

const UserRoleDirectoryPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const usersResult = await fetchUsers();
      setUsers(usersResult.data);
      setSearchResults(usersResult.data);
    };
    const getRoles = async () => {
      const rolesResult = await fetchRoles();
      setRoles(rolesResult.data);
      console.log(rolesResult.data);
    };
    Promise.all([getUsers(), getRoles()]);
  }, []);

  const filterUsersByName = (users: User[], searchQuery: string) => {
    return users.filter((user) => {
      const fullName = `${user.first} ${user.last}`.toLowerCase();
      return fullName.includes(searchQuery);
    });
  };

  const onSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchInputValue(value);
      setSearchResults(filterUsersByName(users, value));
    },
    [users]
  );

  return (
    <Tabs.Root defaultValue="users">
      <Tabs.List mb="5">
        <Tabs.Trigger value="users">Users</Tabs.Trigger>
        <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
      </Tabs.List>

      <Box>
        <Tabs.Content value="users">
          <Flex gap="3" mb="5">
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
              {searchInputValue && searchResults.length === 0 ? (
                <Table.Row align="center">
                  <Table.Cell colSpan={4}>
                    Sorry, we couldn't find any names that contain that query.
                  </Table.Cell>
                </Table.Row>
              ) : (
                searchResults?.map((user) => (
                  <UserTableRow key={user.id} user={user} roles={roles} />
                ))
              )}
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

        <Tabs.Content value="roles">
          <Flex gap="3" mb="5">
            <Box flexGrow="1">
              <SearchInput
                placeholder="Search by name or description..."
                searchInputValue={searchInputValue}
                onChange={onSearchChange}
              />
            </Box>
            <Box>
              <Button>
                <PlusIcon /> Add Role
              </Button>
            </Box>
          </Flex>
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {searchInputValue && roles.length === 0 ? (
                <Table.Row align="center">
                  <Table.Cell colSpan={4}>
                    Sorry, we couldn't find any roles that contain that query.
                  </Table.Cell>
                </Table.Row>
              ) : (
                roles?.map((role) => <RoleTableRow key={role.id} role={role} />)
              )}
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

        <Tabs.Content value="settings">
          <Text size="2">Edit your profile or update contact information.</Text>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
};

export default UserRoleDirectoryPage;
