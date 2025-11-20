import { Skeleton, Table } from "@radix-ui/themes";
import PaginationTableRow from "@/components/shared/PaginationTableRow";
import UsersTableRow from "./UsersTableRow";
import type { Role, User, PaginationData } from "@/types";

type UsersTableProps = {
  users: User[];
  roles: Role[];
  showEmptyState: boolean;
  isLoading: boolean;
  fetch: () => void;
  onClickNextPage: () => void;
  onClickPrevPage: () => void;
  paginationData?: PaginationData;
};

const UserSkeletonRow = () => (
  <Table.Row>
    <Table.Cell>
      <Skeleton />
    </Table.Cell>
    <Table.Cell>
      <Skeleton />
    </Table.Cell>
    <Table.Cell>
      <Skeleton />
    </Table.Cell>
    <Table.Cell>
      <Skeleton />
    </Table.Cell>
  </Table.Row>
);
const UsersTable = ({
  users,
  roles,
  showEmptyState = false,
  isLoading = false,
  fetch,
  paginationData,
  onClickNextPage,
  onClickPrevPage,
}: UsersTableProps) => {
  return (
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
        {showEmptyState ? (
          <Table.Row align="center">
            <Table.Cell colSpan={4}>
              Sorry, we couldn't find any names that contain that query.
            </Table.Cell>
          </Table.Row>
        ) : isLoading ? (
          [...Array(10)].map((_, idx) => <UserSkeletonRow key={idx} />)
        ) : (
          users.map((user) => (
            <UsersTableRow
              key={user.id}
              user={user}
              roles={roles}
              fetch={fetch}
            />
          ))
        )}
        <PaginationTableRow
          onClickNext={onClickNextPage}
          onClickPrevious={onClickPrevPage}
          isNextDisabled={!paginationData?.next || paginationData.pages === 1}
          isPreviousDisabled={
            !paginationData?.prev || paginationData.pages === 1
          }
          colSpan={4}
        />
      </Table.Body>
    </Table.Root>
  );
};

export default UsersTable;
