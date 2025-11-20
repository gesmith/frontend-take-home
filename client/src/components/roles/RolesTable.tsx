import { Skeleton, Table } from "@radix-ui/themes";
import type { PaginationData, Role } from "@/types";
import PaginationTableRow from "@/components/shared/PaginationTableRow";
import RolesTableRow from "./RolesTableRow";

const RoleSkeletonRow = () => (
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
  </Table.Row>
);

type RolesTableProps = {
  roles: Role[];
  showEmptyState: boolean;
  isLoading: boolean;
};

const RolesTable = ({
  roles,
  showEmptyState = false,
  isLoading = false,
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
          [...Array(10)].map((_, idx) => <RoleSkeletonRow key={idx} />)
        ) : (
          roles.map((role) => <RolesTableRow key={role.id} role={role} />)
        )}
        <PaginationTableRow
          onClickNext={() => {}}
          onClickPrevious={() => {}}
          isNextDisabled
          isPreviousDisabled
          colSpan={4}
        />
      </Table.Body>
    </Table.Root>
  );
};

export default RolesTable;
