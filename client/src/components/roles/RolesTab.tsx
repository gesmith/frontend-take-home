import React, { useCallback, useEffect, useState } from "react";
import { ExclamationTriangleIcon, PlusIcon } from "@radix-ui/react-icons";
import { Tabs, Flex, Box, Button, Callout } from "@radix-ui/themes";
import SearchInput from "@/components/shared/SearchInput";
import useRolesQuery from "@/hooks/query/useRolesQuery";

const RolesTable = React.lazy(() => import("@/components/roles/RolesTable"));

const RolesTab = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setCurrentPage] = useState(1);
  const {
    isPending,
    isError,
    data: rolesData,
    paginationData,
    isFetching,
  } = useRolesQuery({ page, search: searchTerm });

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
    <Tabs.Content value="roles">
      <Flex gap="3" mb="5">
        <Box flexGrow="1">
          <SearchInput
            placeholder="Search by name or description..."
            value={searchInputValue}
            onChange={onSearchChange}
          />
        </Box>
        <Box>
          <Button>
            <PlusIcon /> Add Role
          </Button>
        </Box>
      </Flex>
      {isError ? (
        <Callout.Root color="red" role="alert" mb="4">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>Failed to load roles. Please try again.</Callout.Text>
        </Callout.Root>
      ) : (
        <RolesTable
          roles={rolesData}
          showEmptyState={Boolean(searchTerm && rolesData?.length === 0)}
          paginationData={paginationData}
          onClickNextPage={() => {
            setCurrentPage(page + 1);
          }}
          onClickPrevPage={() => setCurrentPage(page - 1)}
          isLoading={isPending || isFetching}
        />
      )}
    </Tabs.Content>
  );
};

export default RolesTab;
