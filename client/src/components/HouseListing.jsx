import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import img1 from "../assets/img1.jpg";
// import img2 from "../assets/img2.jpg";
// import img3 from "../assets/img3.jpg";
// import img4 from "../assets/img4.jpg"; 
import PropertyList from "../pages/PropertyList";
import Pagination from "./Pagination";

function HouseListing() {


  const searchResult = {};
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  const [currentPage, setCurrentPage ] = useState(1)
  const [postsPerPage, setPostsPerPage ] = useState(4)

  const fetchHouses = async () => {
    const res = await fetch("http://localhost:3000/houses");
    const data = await res.json();
    setHouses(data);
    console.log(data);
    return data;
  };
  useEffect(() => {
    fetchHouses();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = houses.slice(indexOfFirstPost, indexOfLastPost);

 
  const renderedList =
  searchResult.length > 0
    ? searchResult.map((house) => (

        <PropertyList key={house.id} listing={house} id={house.id} />
      ))
    : currentPosts.map((house) => (
      
         
        <PropertyList key={house.id} listing={house} id={house.id} />
      ));

console.log(renderedList);


        console.log(renderedList)

  return (
    <div>

      <div className=" p-4 text-3xl text-blue-900/85 font-semibold">
      {searchResult && searchResult.length > 0 ? (
        <div className=" text-center">
          <h1>Your Search results</h1>
        </div>
      ) : (
        <div className=" text-center">
          <h1>Recent</h1>
        </div>
      )}
      </div>
      <h1 className=" text-4xl text-center p-2 pb-4 font-bold">
        Properties
      </h1>

      <div className=" flex items-center justify-center gap-4 ">
     
        {renderedList}
      </div>
      <Pagination postsPerPage={postsPerPage} totalProperties={houses.length} setCurrentPage={setCurrentPage}
                currentPage={currentPage} />   

      <div className="text-center pt-5  mb-10">
        <button className=" text-white  bg-red-800/90 p-4 border-2 border-slate-300/25 rounded-md" onClick={ () => navigate('property') }> View More</button>
      </div>
    </div>
  );
}

export default HouseListing;
