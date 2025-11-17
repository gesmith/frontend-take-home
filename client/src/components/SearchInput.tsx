import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import type { ChangeEventHandler } from "react";

type SearchInputProps = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  searchInputValue?: string;
};

const SearchInput = ({
  searchInputValue = "",
  onChange,
  placeholder = "Search by name...",
}: SearchInputProps) => {
  return (
    <TextField.Root
      placeholder={placeholder}
      onChange={onChange}
      value={searchInputValue}
      aria-label={placeholder}
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default SearchInput;
