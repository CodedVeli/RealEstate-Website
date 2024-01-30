import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import PropertyList from "../pages/PropertyList";
import { useNavigate } from "react-router-dom";


function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('data');

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserInfo(parsedUserData);
    }
    
  }, []);

  console.log(userInfo);


  

  useEffect(() => {
    const fetchHouses = async () => {
      if (userInfo && userInfo.id) {
        const res = await fetch(`http://localhost:5000/properties/owner/${userInfo.id}`);
        const data = await res.json();
        setProperties(data);
        console.log(data);
        return data;
      }
    };
  
      fetchHouses();
     
  
  }, [ userInfo]); 
  console.log(properties);

  const onDelete = useCallback(async (id) => {
    if (window.confirm("Are you sure you want to delete this House listing?")) {
    const res = await fetch(`http://localhost:5000/properties/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        
      }

    });

    const data = await res.json();
    console.log(data);
    setProperties(properties.filter((property) => property.id !== id));
  }
  }
  , [properties]);
  // const onEdit = useCallback(async (id) => {
  //   const res = await fetch(`http://localhost:5000/properties/${id}`,
  //     {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //       body: JSON.stringify({ name: 'Updated' }),
  //     });
  //   const data = await res.json();
  //   console.log(data);
  //   setProperties(properties.filter((property) => property.id !== id));
  // }, [properties]);

  const onEdit = (id) =>  { 
    navigate(`/edit/${id}`);
  }


  return (
    <>
      <div className='ml-10 mt-40 pb-20'>
        <h1 className='text-3xl font-semibold'>My Profile Details</h1>
        <div className='mt-10'>
          {userInfo && (
            <div>
              <h1 className='text-2xl font-semibold'>ID: {userInfo.id}</h1>
              <h1 className='text-2xl font-semibold'>Name: {userInfo.name}</h1>
              <h1 className='text-2xl font-semibold'>Email: {userInfo.email}</h1>
            </div>
          )}
          {userInfo && userInfo.role === 'owner' ? (
            <>
              <h1 className="mt-5">Upload a house</h1>
              <Link to='/create'><button className='bg-red-600 mt-2 text-white p-4 rounded-md'>Upload house</button></Link>
              <h1>Listed Houses</h1>
              {properties && properties.length > 0 ? (
                <div className='flex flex-col  gap-4'>
                  {properties.map((property) => (
                    <PropertyList key={property.id} listing={property} id={property.id} onDelete={onDelete} onEdit={onEdit} />
                  ))}
                </div>
              ) : (
                <h1>No properties listed</h1>
              )}
              {}
            </>
          ) : (userInfo && userInfo.role === 'user') && (<h1> Welcome  {userInfo.name}</h1>)}
        </div>
      </div>
    </>
  )
}

export default Profile;