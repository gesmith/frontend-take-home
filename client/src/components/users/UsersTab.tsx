import React, { useCallback, useEffect, useState } from "react";
import { ExclamationTriangleIcon, PlusIcon } from "@radix-ui/react-icons";
import { Tabs, Flex, Box, Button, Callout } from "@radix-ui/themes";
import SearchInput from "@/components/shared/SearchInput";
import useUsersQuery from "@/hooks/query/useUsersQuery";

const UsersTable = React.lazy(() => import("@/components/users/UsersTable"));

const UsersTab = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setCurrentPage] = useState(1);
  const {
    isPending,
    isError,
    data: usersData,
    paginationData,
    isFetching,
  } = useUsersQuery({ page, search: searchTerm, includeRoles: true });

  useEffect(() => {
    // Debounce the user search
    const handler = setTimeout(() => {
      setSearchTerm(searchInputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [page, searchInputValue]);

  const onSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchInputValue(value);
    },
    []
  );

  return (
    <Tabs.Content value="users">
      <Flex gap="3" mb="5">
        <Box flexGrow="1">
          <SearchInput
            placeholder="Search by name..."
            value={searchInputValue}
            onChange={onSearchChange}
          />
        </Box>
        <Box>
          <Button>
            <PlusIcon /> Add User
          </Button>
        </Box>
      </Flex>
      {isError ? (
        <Callout.Root color="red" role="alert" mb="4">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>Failed to load users. Please try again.</Callout.Text>
        </Callout.Root>
      ) : (
        <UsersTable
          users={usersData}
          isLoading={isPending || isFetching}
          paginationData={paginationData}
          onClickNextPage={() => {
            setCurrentPage(page + 1);
          }}
          onClickPrevPage={() => setCurrentPage(page - 1)}
          showEmptyState={Boolean(searchInputValue && usersData?.length === 0)}
        />
      )}
    </Tabs.Content>
  );
};

export default UsersTab;
