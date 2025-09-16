import { Button } from "react-bootstrap";

const Search = () => {
  return (
    <div className="flex items-center justify-center space-x-3">
      <input 
        className="py-2 px-3 rounded outline-none w-96" // sabit genişlik verildi
        type="text" 
        placeholder=" Canın Ne İstiyor..." 
      />
      <Button className="btn bg-color2 text-sm rounded border border-transparent">
        Ara
      </Button>
    </div>
  );
};

export default Search;
