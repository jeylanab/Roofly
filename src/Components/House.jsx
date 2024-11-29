import React from "react";
import img1 from "../Assets/img1.png";
import img2 from "../Assets/img2.png";
import img3 from "../Assets/img3.png";
import img4 from "../Assets/img4.png";
import img5 from "../Assets/img5.png";
import img6 from "../Assets/img6.png";

export const House = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Image 1 */}
        <div className="col-span-1 lg:col-span-2 row-span-2 relative overflow-hidden rounded-lg">
          <img src={img1} alt="Image 1" className="w-full h-full object-cover transform hover:scale-105 transition duration-300" />
        </div>

        {/* Image 2 */}
        <div className="col-span-1 relative overflow-hidden rounded-lg">
          <img src={img2} alt="Image 2" className="w-full h-full object-cover transform hover:scale-105 transition duration-300" />
        </div>

        {/* Image 3 */}
        <div className="col-span-1 lg:col-span-2 relative overflow-hidden rounded-lg">
          <img src={img4} alt="Image 3" className="w-full h-full object-cover transform hover:scale-105 transition duration-300" />
        </div>

        {/* Image 4 */}
        <div className="col-span-1 lg:col-span-1 relative overflow-hidden rounded-lg">
          <img src={img5} alt="Image 4" className="w-full h-full object-cover transform hover:scale-105 transition duration-300" />
        </div>

        {/* Image 5 */}
        <div className="col-span-1 relative overflow-hidden rounded-lg">
          <img src={img3} alt="Image 5" className="w-full h-full object-cover transform hover:scale-105 transition duration-300" />
        </div>

        {/* Image 6 */}
        <div className="col-span-1 lg:col-span-2 row-span-2 relative overflow-hidden rounded-lg">
          <img src={img6} alt="Image 6" className="w-full h-full object-cover transform hover:scale-105 transition duration-300" />
        </div>
      </div>
    </div>
  );
};
