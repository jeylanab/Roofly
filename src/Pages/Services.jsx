import React from 'react';
import c1 from "../Assets/c1.svg";
import c2 from "../Assets/c2.svg";
import c3 from "../Assets/c3.svg";

export const Services = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-wrap justify-center gap-4">
        {/* Card 1 */}
        <div className="w-full lg:w-1/4 p-2">
          <div className="bg-white p-6 shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img src={c1} alt="location" />
            <h3 className="text-lg font-medium mt-4">20+ Locations</h3>
            <p className="mt-2">Find our services in over 20 prime locations, offering convenience and accessibility for everyone.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full lg:w-1/4 p-2">
          <div className="bg-white p-6 shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img src={c2} alt="rooms" />
            <h3 className="text-lg font-medium mt-4">324 Rooms Available</h3>
            <p className="mt-2">Enjoy a wide selection of rooms, <br/> tailored to meet diverse needs and preferences.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full lg:w-1/4 p-2">
          <div className="bg-white p-6 shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img src={c3} alt="wifi" />
            <h3 className="text-lg font-medium mt-4">100% Internet Connected</h3>
            <p className="mt-2">Stay connected with high-speed internet in every location, ensuring seamless online experiences.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
