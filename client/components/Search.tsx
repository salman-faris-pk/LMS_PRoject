import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

type SearchProps = {
  placeholder?: string;
  inputClassName?: string;
  buttonClassName?: string;
  mainClassName?: string;
};

const Search: React.FC<SearchProps> = ({
  placeholder = "Search...",
  inputClassName = "",
  buttonClassName = "",
  mainClassName= ''
}) => {

  return (
    <div className={`${mainClassName}`}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          className={`${inputClassName}`}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`${buttonClassName}`}
        >
          <SearchIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Search;
