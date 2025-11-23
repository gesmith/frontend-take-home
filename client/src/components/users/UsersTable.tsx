import { Table } from "@radix-ui/themes";
import PaginationTableRow from "@/components/shared/PaginationTableRow";
import UsersTableRow from "./UserTableRow";
import type { User, PaginationData } from "@/types";
import SkeletonTableRow from "@/components/shared/SkeletonTableRow";

type UsersTableProps = {
  users: User[];
  showEmptyState: boolean;
  isLoading: boolean;
  onClickNextPage: () => void;
  onClickPrevPage: () => void;
  paginationData?: PaginationData;
};

const UsersTable = ({
  users = [],
  showEmptyState = false,
  isLoading = false,
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
          [...Array(10)].map((_, idx) => (
            <SkeletonTableRow key={idx} colSpan={4} />
          ))
        ) : (
          users.map((user) => <UsersTableRow key={user.id} user={user} />)
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
