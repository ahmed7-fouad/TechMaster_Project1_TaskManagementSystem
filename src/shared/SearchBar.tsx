import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const SearchBar = ({ handleSearchProcess,searchQuery}:{handleSearchProcess?:(data:string)=>void,searchQuery?:string}) => {
  return (
    <Field orientation="horizontal" className="w-[23rem]  dark:text-black">
      <Input
        type="search"
        placeholder="Search..."
        className="w-full bg-[#eaeaea] border-0"
        value={searchQuery}
        onChange={(e) => handleSearchProcess(e.target.value)}
      />
    </Field>
  );
};
export default SearchBar;