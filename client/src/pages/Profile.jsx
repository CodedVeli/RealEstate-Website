import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('data');

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserInfo(parsedUserData);
    }
  }, []);

  console.log(userInfo);

  return (
    <>
      <div className='ml-10 mt-40'>
        <h1 className='text-3xl font-semibold'>My Profile Details</h1>
        <div className='mt-10'>
          {userInfo && (
            <div>
              <h1 className='text-2xl font-semibold'>Name: {userInfo.name}</h1>
              <h1 className='text-2xl font-semibold'>Email: {userInfo.email}</h1>
            </div>
          )}
          {userInfo && userInfo.role === 'owner' ? (
            <>
              <h1 className="mt-5">Upload a house</h1>
              <Link to='/create'><button className='bg-red-600 mt-2 text-white p-4 rounded-md'>Upload house</button></Link>
            </>
          ) : (userInfo && userInfo.role === 'user') && (<h1> Welcome  {userInfo.name}</h1>)}
        </div>
      </div>
    </>
  )
}

export default Profile;