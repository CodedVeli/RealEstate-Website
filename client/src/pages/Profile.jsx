import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Profile() {
  return (
    <>
    <div className=' ml-10  mt-40'>
    <h1 className='  text-3xl font-semibold'>My Profile Details</h1>
    <div className=' mt-10'>
    <h1 className=' text-2xl font-semibold'>Name</h1>
    <h1 className=" mt-5"> Upload a house</h1>
    <Link to='/create'><button className=' bg-red-600 mt-2 text-white p-4 rounded-md'>Upload house</button></Link>    
    
    </div>
    </div>
    </>
  )
}

export default Profile;