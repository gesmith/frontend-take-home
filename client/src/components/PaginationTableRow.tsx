import { Button, Flex, Table } from "@radix-ui/themes";

type PaginationTableRowProps = {
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
  colSpan?: number;
};

const PaginationTableRow = ({
  onClickNext,
  onClickPrevious,
  isPreviousDisabled,
  isNextDisabled,
  colSpan = 1,
}: PaginationTableRowProps) => {
  return (
    <Table.Row align="center">
      <Table.Cell py="2" align="center" colSpan={colSpan} justify="end">
        <Button
          size="1"
          mr="2"
          disabled={isPreviousDisabled}
          onClick={onClickNext}
        >
          Previous
        </Button>
        <Button
          size="1"
          variant="outline"
          color="gray"
          disabled={isNextDisabled}
          onClick={onClickPrevious}
        >
          Next
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default PaginationTableRow;
