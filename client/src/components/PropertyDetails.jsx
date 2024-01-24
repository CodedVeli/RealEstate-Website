import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { FaLocationArrow, FaShower } from "react-icons/fa";
import { IoBed } from "react-icons/io5";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  const [property, setProperty] = useState(null);

  const fetchHouses = async () => {
    try {
      const res = await fetch("http://localhost:3000/houses");
      const data = await res.json();
      setHouses(data);
      return data;
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHouses();
      const selectedProperty = data.find((house) => house.id === parseInt(id));

      if (!selectedProperty) {
        navigate("/");
      } else {
        setProperty(selectedProperty);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (!property) {
    return null;
  }

  return (
    <main>
      <div className="mt-40">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          scrollbar={{ draggable: true }}
        >
          {property.image.map((url, index) => (
            <SwiperSlide key={index}>
              <div>
                <img
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[700px] w-[1000px]"
                  src={url}
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <h1 className="text-center mt-20 text-4xl">Property Details</h1>
      <div>
        <div className=" p-4 space-y-3">
        <p className=" text-2xl font-bold">Property Name: {property.name}</p>
        <p className=" text-2xl font-medium  text-slate-500">Added: {property.added}</p>
        <p className=" flex flex-row gap-2 text-xl">
        <IoBed className=" text-slate-600/50 mt-1" />
          {property.bedrooms > 1
            ? `${property.bedrooms} Bedrooms`
            : "1 Bedroom"}
        </p>
        <p className=" flex flex-row gap-2 text-xl">
        <FaShower className=" text-slate-600/50 mt-1" />
          {property.bathrooms > 1
            ? `${property.bathrooms} Bathrooms`
            : "1 Bathroom"}
        </p>
        <p className="  text-xl flex flex-row gap-2 underline underline-offset-1 text-blue-600/50 ">
          <FaLocationArrow className=" text-blue-600/60 mt-1 text-xl " />
          {property.location}
        </p>
        <p className=" text-green-500 font-medium text-3xl">${property.price}</p>
        </div>
        <div className="w-[100%] h-[500px] mb-10 mt-16">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[property.geolocation.lat, property.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[property.geolocation.lat, property.geolocation.lng]}
            >
              <Popup>{property.location}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <h1 className="text-center mt-20 text-4xl">Contact Landlord</h1>
      <Link className=" flex items-center justify-center pt-2 mb-10" to="/landlord">
        <button className="bg-red-600 text-white px-4 py-2 rounded-md">
         Contact Landlord
        </button>
      </Link>
    </main>
  );
};

export default PropertyDetailsPage;
