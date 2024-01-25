import { useState, useEffect } from "react";
import PropertyList from "../pages/PropertyList";

function Property() {
  const [houses, setHouses] = useState([]);
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

  const renderedListing = houses.map((house) => (
      
         
    <PropertyList key={house.id} listing={house} id={house.id} />
  ));
  return (
  <>
  <h1 className=" text-3xl font-semibold text-center mt-40 ">Explore Our whole list of <p className=" text-red-600">Properties</p></h1>
  <div className=" flex items-center justify-center flex-wrap gap-10 mt-40">
    {renderedListing}
  </div>
  </>
  )
}

export default Property;
