import React from "react";
import { Tabs, Box, Button, Flex, Callout } from "@radix-ui/themes";
import { ExclamationTriangleIcon, PlusIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { fetchUsers } from "@/api/users";
import { fetchRoles } from "@/api/roles";
import SearchInput from "@/components/shared/SearchInput";
import type { User, Role, PaginationData } from "@/types";

const UsersTable = React.lazy(() => import("@/components/users/UsersTable"));
const RolesTable = React.lazy(() => import("@/components/roles/RolesTable"));

const UserRoleDirectoryPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [userSearchResults, setUserSearchResults] = useState<User[]>([]);
  const [searchUsersInputValue, setSearchUsersInputValue] =
    useState<string>("");
  const [isUsersLoading, setUsersLoading] = useState<boolean>(false);
  const [isRolesLoading, setRolesLoading] = useState<boolean>(false);
  const [hasUsersError, setHasUsersError] = useState<boolean>(false);
  const [hasRolesError, setHasRolesError] = useState<boolean>(false);

  const [paginationData, setPaginationData] = useState<PaginationData>();
  const [page, setCurrentPage] = useState(1);

  const fetchAll = useCallback(
    async (search?: string) => {
      const getUsers = async () => {
        setUsersLoading(true);
        try {
          const req = {
            page,
            search: search,
          };
          const usersData = await fetchUsers(req);
          setUsersLoading(false);
          if (usersData.status) {
            throw Error("Server error: " + usersData.status);
          }
          setHasUsersError(false);
          const { data, pages, prev, next } = usersData;
          setPaginationData({ pages, prev, next });
          setUsers(data);
          setUserSearchResults(data);
        } catch {
          setHasUsersError(true);
        }
      };

      const getRoles = async () => {
        setRolesLoading(true);
        try {
          const rolesData = await fetchRoles();
          if (rolesData.status) {
            throw Error("Server error: " + rolesData.status);
          }
          setHasRolesError(false);
          const { data, pages, prev, next } = rolesData;
          // Put the default role at the top of the list.
          const defaultRole = data.splice(
            data.findIndex((r: Role) => r.isDefault),
            1
          );
          data.unshift(defaultRole[0]);
          setRoles(data);
          setRolesLoading(false);
        } catch {
          setHasRolesError(true);
        }
      };
      await Promise.all([getUsers(), getRoles()]);
    },
    [page]
  );

  useEffect(() => {
    if (searchUsersInputValue) {
      const handler = setTimeout(() => {
        fetchAll(searchUsersInputValue);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }
    fetchAll();
  }, [page, searchUsersInputValue]);

  const onSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchUsersInputValue(value);
    },
    []
  );

  return (
    <Tabs.Root defaultValue="users">
      <Tabs.List mb="5">
        <Tabs.Trigger value="users">Users</Tabs.Trigger>
        <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
      </Tabs.List>

      <Box>
        {(hasUsersError || hasRolesError) && (
          <Callout.Root color="red" role="alert" mb="4">
            <Callout.Icon>
              <ExclamationTriangleIcon />
            </Callout.Icon>
            <Callout.Text>
              Oops, something went wrong. Please try again.
            </Callout.Text>
          </Callout.Root>
        )}
        {!hasUsersError && (
          <Tabs.Content value="users" hidden={hasUsersError}>
            <Flex gap="3" mb="5">
              <Box flexGrow="1">
                <SearchInput
                  placeholder="Search by name..."
                  searchInputValue={searchUsersInputValue}
                  onChange={onSearchChange}
                />
              </Box>
              <Box>
                <Button>
                  <PlusIcon /> Add User
                </Button>
              </Box>
            </Flex>
            <UsersTable
              fetch={fetchAll}
              users={userSearchResults}
              roles={roles}
              isLoading={isUsersLoading}
              paginationData={paginationData}
              onClickNextPage={() => {
                console.log(page);
                setCurrentPage(page + 1);
              }}
              onClickPrevPage={() => setCurrentPage(page - 1)}
              showEmptyState={Boolean(
                searchUsersInputValue && userSearchResults.length === 0
              )}
            />
          </Tabs.Content>
        )}
        {!hasRolesError && (
          <Tabs.Content value="roles">
            <Flex gap="3" mb="5">
              <Box flexGrow="1">
                <SearchInput
                  placeholder="Search by name or description..."
                  searchInputValue={searchUsersInputValue}
                  onChange={onSearchChange}
                />
              </Box>
              <Box>
                <Button>
                  <PlusIcon /> Add Role
                </Button>
              </Box>
            </Flex>
            {/* TODO: Implement roles search functionality */}
            <RolesTable
              roles={roles}
              showEmptyState={Boolean(
                searchUsersInputValue && roles.length === 0
              )}
              isLoading={isRolesLoading}
            />
          </Tabs.Content>
        )}
      </Box>
    </Tabs.Root>
  );
};

export default UserRoleDirectoryPage;
