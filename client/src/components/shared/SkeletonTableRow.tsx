import { Skeleton, Table } from "@radix-ui/themes";

type SkeletonTableRowProps = {
  colSpan?: number;
  rowProps?: Table.RowProps;
  cellProps?: Table.CellProps;
};

const SkeletonTableRow = ({
  colSpan = 1,
  rowProps,
  cellProps,
}: SkeletonTableRowProps) => {
  return (
    <Table.Row {...rowProps}>
      {[...Array(colSpan)].map((_, idx) => (
        <Table.Cell key={idx} {...cellProps}>
          <Skeleton />
        </Table.Cell>
      ))}
    </Table.Row>
  );
};

export default SkeletonTableRow;
