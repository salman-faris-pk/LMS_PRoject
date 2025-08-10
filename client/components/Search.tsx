import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="relative w-full max-w-lg">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search your course"
          className="
            w-full 
            py-8 px-7 
            pr-20
            h-14 
            text-lg
            border border-[#cfe3d6]
            focus:border-green-600 focus:border-[1px]
            focus-visible:ring-0 focus-visible:ring-offset-0
            transition-all placeholder:text-lg placeholder:text-gray-400
          "
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon" 
          className="
            absolute right-2 top-1/2 -translate-y-1/2 
            h-14 w-14 
            bg-[#DEEDE4] text-green-700
            hover:bg-[#cfe3d6]
            rounded-md
            transition-all duration-300 ease-in-out
          "
        >
          <SearchIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Search;