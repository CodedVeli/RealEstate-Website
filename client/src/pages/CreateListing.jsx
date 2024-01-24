import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function CreateListing() {
    const [geolocationEnabled, setGeolocationEnabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
    //   type: "rent",
      name: "",
      bedrooms: "",
      bathrooms: "",
    //   parking: false,
    //   furnished: false,
      address: "",
      offer: false,
    //   regularPrice: "",
    //   discountedPrice: "",
    price: "",
      image: {},
      latitude: 0,
      longitude: 0,
    });
    const {
        // type,
        name,
        bedrooms,
        bathrooms,
        // parking,
        // furnished,
        address,
        price,
        // offer,
        // regularPrice,
        // discountedPrice,
        image,
        latitude,
        longitude,
      } = formData;

    //   const navigate = useNavigate();

      const postListing = async (listing) => {
        try {
            const response = await fetch("/api/listings", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: listing,

            });
            return await response.json();
        } catch (err) {
            console.log(err);
        }
        };

      const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        // if (discountedPrice > regularPrice) {
        //   toast.error("Discounted price cannot be higher than regular price");
        //   setLoading(false);
        //   return;
        // }
    
        if (image.length > 6) {
          toast.error("Max 6 images allowed");
          setLoading(false);
          return;
        }
    
        let geolocation = {};
        let location;
    
        if (geolocationEnabled) {
          const response = await fetch(
            `https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?street=${address}`,
            {
              method: "GET",
              headers: {
                "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
                "x-rapidapi-key":
                  "8535e6324bmsh9b09f29b4c1e1efp1de9efjsn3dab3bfce019",
              },
            }
          );

      const data = await response.json();
      geolocation.lat = data[0]?.lat ?? 0;
      geolocation.lng = data[0]?.lon ?? 0;
      location = data === null ? undefined : data[0]?.display_name;

      if (location === undefined || location === null) {
        toast.error("Please enter a correct address");
        setLoading(false);
        return;
      }

      console.log(data);
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
      location = address;
    }
    };

    const onMutate = (e) => {
        let boolean = null;
        if (e.target.value === "true") {
          boolean = true;
        }
        if (e.target.value === "false") {
          boolean = false;
        }
    
        // Files
        if (e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            image: e.target.files,
          }));
        }
    
        // Text/Booleans/Numbers
        if (!e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: boolean ?? e.target.value,
          }));
        }
      };
    
  return (
    <div className=" ml-20 gap-5 mt-40">
    <header>
      <p className=" text-4xl font-bold"> Create a Listing</p>
    </header>
    <main>
      <form onSubmit={onSubmit}>
        {/* <label className="font-medium text-2xl"> Sell / Rent</label> */}
        {/* <div className=" flex flex-row p-6 ">
          <button
            type="button"
            className={type === "sale" ? " bg-green-600 " : "bg-slate-500"}
            id="type"
            value="sale"
            onClick={onMutate}
          >
            Sell
          </button>
          <button
            type="button"
            className={type === "rent" ? " bg-green-600" : "bg-slate-500"}
            id="type"
            value="rent"
            onClick={onMutate}
          >
            {" "}
            Rent
          </button>
        </div> */}
        <label className=" text-2xl font-medium flex p-4">Name</label>
        <input
          className=" p-5 bg-white rounded-lg border border-gray-400 outline-none focus:border-green-500"
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
        {/* <label className="formLabel">Parking spot</label>
        <div className="formButtons">
          <button
            className={parking ? "formButtonActive" : "formButton"}
            type="button"
            id="parking"
            value={true}
            onClick={onMutate}
            min="1"
            max="50"
          >
            Yes
          </button>
          <button
            className={
              !parking && parking !== null ? "formButtonActive" : "formButton"
            }
            type="button"
            id="parking"
            value={false}
            onClick={onMutate}
          >
            No
          </button>
        </div> */}
        {/* <label className="formLabel">Furnished</label>
        <div className="formButtons">
          <button
            className={furnished ? "formButtonActive" : "formButton"}
            type="button"
            id="furnished"
            value={true}
            onClick={onMutate}
          >
            Yes
          </button>
          <button
            className={
              !furnished && furnished !== null
                ? "formButtonActive"
                : "formButton"
            }
            type="button"
            id="furnished"
            value={false}
            onClick={onMutate}
          >
            No
          </button>
        </div> */}
       <div className=" pt-5 flex flex-col">
       <label className="text-2xl font-medium  p-4">Address</label>
        <textarea
          className="p-10 w-[500px] bg-white rounded-lg border border-gray-400 outline-none focus:border-green-500"
          type="text"
          id="address"
          value={address}
          onChange={onMutate}
          required
        />
       </div>
        {/* {!geolocationEnabled && (
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
        )} */}
        {/* <label className="formLabel">Offer</label> */}
        {/* <div className="formButtons">
          <button
            className={offer ? "formButtonActive" : "formButton"}
            type="button"
            id="offer"
            value={true}
            onClick={onMutate}
          >
            Yes
          </button>
          <button
            className={
              !offer && offer !== null ? "formButtonActive" : "formButton"
            }
            type="button"
            id="offer"
            value={false}
            onClick={onMutate}
          >
            No
          </button>
        </div> */}
        <label className="text-2xl font-medium mb-5  p-4"> Price</label>
        <div className="formPriceDiv">
          <input
            className="p-4 bg-white rounded-lg border border-gray-400 outline-none focus:border-green-500"
            type="number"
            id="regularPrice"
            value={price}
            onChange={onMutate}
            min="50"
            max="750000"
            required
          />
          {/* {type === "rent" && <p className="formPriceText">$ / Month</p>} */}
        </div>

        {/* {offer && (
          <>
            <label className="formLabel">Discounted Price</label>
            <input
              className="formInputSmall"
              type="number"
              id="discountedPrice"
              value={discountedPrice}
              onChange={onMutate}
              min="50"
              max="750000000"
              required={offer}
            />
          </>
        )} */}
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
        <button type="submit" className="  text-white text-xl font-semibold p-4 bg-green-500  w-[200px] rounded-md mx-auto mt-5">
          Create Listing
        </button>
        </div>
      </form>
    </main>
  </div>
  )
}

export default CreateListing;