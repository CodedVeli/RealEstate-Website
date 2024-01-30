import { FaLocationArrow, FaShower } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoBed } from "react-icons/io5";
import { Link } from "react-router-dom";

function PropertyList( {listing, id, onDelete, onEdit}) {
    console.log(listing)
    console.log(id)
  return (
    <div className=" ">
        <Link to={`/property/${id}`}>        
         <div
                
              className="bg-white border-2 border-red-600/40 rounded-xl w-[430px]"
            >
              <img
              // remove  this after backend implementation
              className="w-[800px] rounded-t-xl"
                src={listing.image[0]}
                alt="house"
                // add this after backend implementation
                // className="w-[400px] h-40 rounded-t-xl"
              />
              <div className="p-2">
                <p className="font-bold">{listing.name}</p>
                <p className=" flex flex-row gap-2 underline underline-offset-1 text-blue-600/50 ">
                  <FaLocationArrow className=" text-blue-600/60 mt-1 text-xl " />
                  {listing.location}
                </p>
                <p className=" flex flex-row space-x-2">
                  <p>Added:</p>
                  <p className=" text-slate-500">{listing.added}</p>
                </p>

                <div className=" grid grid-cols-2 gap-x-2">
                  <div className=" grid grid-rows-2">
                    <p> Bedrooms</p>
                    <p className=" flex flex-row gap-2 text-xl ">
                      <IoBed className=" text-slate-600/50 mt-1" />
                      {listing.bedrooms}
                    </p>
                  </div>
                  <div className="grid grid-rows-2">
                    <p>Bathrooms</p>
                    <p className=" flex flex-row gap-2 text-xl ">
                      <FaShower className=" text-slate-600/50 mt-1" />
                      {listing.bathrooms}
                    </p>
                  </div>
                  <p className=" text-green-500 font-medium">${listing.price}</p>
                </div>
              </div>
            </div>
        </Link>
      <div className=" flex flex-row justify-center  ">
     {onEdit && (
          <button
            className=" bg-green-500 p-2 rounded-md mr-10"
            onClick={() => onEdit(id)}
          >
            <CiEdit className=" text-white  text-xl" />
          </button>
        )}
        {onDelete && (
          <button
            className=" bg-red-500 p-2 w-10 rounded-md"
            onClick={() => onDelete(id)}
          >
            <MdOutlineDelete className=" text-white text-xl   mr-10" />
          </button>
        )}
        </div>
    </div>
  )
}

export default PropertyList