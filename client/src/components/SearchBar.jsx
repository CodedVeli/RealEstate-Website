import { FaSearchPlus } from "react-icons/fa";
function SearchBar() {
  return (
    <div className="grid grid-cols-2 gap-4   bg-white border-2 border-red-600/40 rounded-xl   h-24 w-[750px] mx-auto mb-5 ">
      <div className=" grid grid-cols-2 p-4  gap-5">
        <div className="grid grid-rows-2">
          <p className=" font-bold">Property Location</p>
          <select
        
      >
        <option >Select a Location</option>
     
      
      </select>

        </div>
        <div className="grid grid-rows-2">
          <p className=" font-bold">Property Type</p>
          <select
        
        >
          <option value="">Select a Propery type</option>
         
        </select>
        </div>
      </div>
      <div className=" flex justify-end p-4   space-x-2 rounded-xl  text-white bg-red-600">
        <p className=" mx-auto text-4xl p-1"> Search</p>
        <FaSearchPlus className="  mt-1.5 text-5xl  " />
      </div>
    </div>
  );
}

export default SearchBar;
