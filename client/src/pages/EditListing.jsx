import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_SECRETKEY } from "../../data";
import axios from "axios";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../../data";
function EditListing() {
  const [userInfo, setUserInfo] = useState(null);
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    bedrooms: "",
    bathrooms: "",

    location: "",
    offer: false,

    price: "",
    image: [],
    latitude: 0,
    longitude: 0,
  });

  const {
    name,
    bedrooms,
    bathrooms,

    location,
    price,

    image,
    latitude,
    longitude,
  } = formData;


  useEffect(() => {
    const storedUserData = localStorage.getItem("data");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserInfo(parsedUserData);
    }
  }, []);

  const postListing = async (newFormData) => {
    try {
      const imageUrls = await uploadImages(formData.image);

      newFormData.image = imageUrls;
      newFormData.owner_id = userInfo.id;
      newFormData.user_id = null;
      const response = await fetch(` http://localhost:5000/properties/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newFormData),
      });
      const result = await response.json();
      toast.success("Listing created successfully");
      navigate("/profile");
      return result;
    } catch (err) {
      toast.error("Listing not created")
      console.log(err);
    }
  };

  const uploadImages = async (images) => {
    const imageUrls = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      imageUrls.push(response.data.secure_url);
    }

    return imageUrls;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    setLoading(true);

    if (image.length > 6) {
      toast.error("Max 6 images allowed");
      setLoading(false);
      return;
    }

    let geolocation = {};
    let address;

    if (geolocationEnabled) {
      const response = await fetch(
        `https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?street=${location}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
            "x-rapidapi-key": `${API_SECRETKEY}`,
          },
        }
      );

      const data = await response.json();
      geolocation.lat = data[0]?.lat ?? 0;
      geolocation.lng = data[0]?.lon ?? 0;
      address = data === null ? undefined : data[0]?.display_name;

      if (address === undefined || address === null) {
        toast.error("Please enter a correct address");
        setLoading(false);
        return;
      }

      console.log(data);
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
      address = location;
    }

    const newFormData = {
      ...formData,
      latitude: geolocation.lat,
      longitude: geolocation.lng,
    };

    try {
      const result = await postListing(newFormData);
      console.log(result);
      if (result.error) {
        toast.error(result.error);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    } else if (e.target.value === "false") {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        image: [...prevState.image, ...e.target.files],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]:
          e.target.id === "price"
            ? parseFloat(e.target.value)
            : boolean ?? e.target.value,
      }));
    }
  };

  return (
    <div className=" ml-20 gap-5 mt-40">
      <header>
        <p className=" text-4xl font-bold"> Edit a House Listing</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <label className=" text-2xl font-medium flex p-4">Name</label>
          <input
            className=" p-5 bg-white w-[300px] rounded-lg border border-gray-400 outline-none focus:border-green-500"
            type="text"
            id="name"
            value={name}
            onChange={onMutate}
            maxLength="32"
            minLength="10"
            required
          />
          <div className=" pt-5 flex">
            <div>
              <label className="text-2xl font-medium  p-4">Bedrooms</label>
              <input
                className="p-5 bg-white rounded-lg border border-gray-400 outline-none focus:border-green-500"
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
            <div>
              <label className="text-2xl font-medium  p-4">Bathrooms</label>
              <input
                className="p-5 bg-white rounded-lg border border-gray-400 outline-none focus:border-green-500"
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
          </div>

          <div className=" pt-5 flex flex-col">
            <label className="text-2xl font-medium  p-4">Address</label>
            <textarea
              className="p-10 w-[500px] bg-white rounded-lg border border-gray-400 outline-none focus:border-green-500"
              type="text"
              id="location"
              value={location}
              onChange={onMutate}
              required
            />
            {!geolocationEnabled && (
              <div className="formLatLng flex">
                <div>
                  <label className="formLabel">Latitude</label>
                  <input
                    className="formInputSmall"
                    type="number"
                    id="latitude"
                    value={latitude}
                    onChange={onMutate}
                    required
                  />
                </div>
                <div>
                  <label className="formLabel">Longitude</label>
                  <input
                    className="formInputSmall"
                    type="number"
                    id="longitude"
                    value={longitude}
                    onChange={onMutate}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <label className="text-2xl font-medium mb-5  p-4"> Price</label>
          <div className="formPriceDiv">
            <input
              className="p-4 bg-white rounded-lg border border-gray-400 outline-none focus:border-green-500"
              type="number"
              id="price"
              value={price}
              onChange={onMutate}
              min="50"
              max="750000"
              required
            />
          </div>

          <div className=" mt-5 flex flex-col">
            <label className="text-2xl font-medium mt-4">Images</label>
            <p className="  mt-4 text-xl">
              The first image will be the cover (max 6).
            </p>
            <input
              className=" mt-4 p-4 bg-gray-300/20 rounded-lg border border-gray-400 outline-none w-[300px] focus:border-green-500"
              type="file"
              id="image"
              onChange={onMutate}
              max="6"
              accept=".jpg,.png,.jpeg"
              multiple
            />
            <div className=" p-7 mx-auto">
           { loading ? (<p  className="  text-white text-xl font-semibold p-4 bg-green-500  w-[200px] rounded-md mx-auto mt-5">Loading...</p>):
            <button
            type="submit"
            className="  text-white text-xl font-semibold p-4 bg-green-500  w-[200px] rounded-md mx-auto mt-5"
          >
            Edit Listing
          </button>

           }</div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditListing;
