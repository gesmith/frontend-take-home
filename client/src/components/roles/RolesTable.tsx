import { Table } from "@radix-ui/themes";
import type { PaginationData, Role } from "@/types";
import PaginationTableRow from "@/components/shared/PaginationTableRow";
import RolesTableRow from "./RoleTableRow";
import SkeletonTableRow from "@/components/shared/SkeletonTableRow";

type RolesTableProps = {
  roles: Role[];
  showEmptyState: boolean;
  isLoading?: boolean;
  onClickNextPage: () => void;
  onClickPrevPage: () => void;
  paginationData?: PaginationData;
};

const RolesTable = ({
  roles,
  showEmptyState = false,
  isLoading = false,
  paginationData,
  onClickNextPage,
  onClickPrevPage,
}: RolesTableProps) => {
  return (
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
        {showEmptyState ? (
          <Table.Row align="center">
            <Table.Cell colSpan={4}>
              Sorry, we couldn't find any roles that contain that query.
            </Table.Cell>
          </Table.Row>
        ) : isLoading ? (
          [...Array(10)].map((_, idx) => (
            <SkeletonTableRow key={idx} colSpan={4} />
          ))
        ) : (
          roles.map((role) => <RolesTableRow key={role.id} role={role} />)
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

export default RolesTable;
