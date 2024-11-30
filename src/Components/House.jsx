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
      <div className="w-full">
        <div className="flex flex-col lg:flex-row justify-center gap-4">
          <div className="w-full lg:w-[35%] flex justify-center">
            <img src={img1} alt="Image 1" className="w-full h-auto object-cover" />
          </div>

          <div className="flex flex-col justify-end w-full lg:w-[65%] gap-4">
            <div className="flex justify-center gap-4 h-[50%] w-full">
              {/* Image 2 */}
              <div className="w-1/2 flex justify-center">
                <img src={img2} alt="Image 2" className="w-full h-auto object-cover" />
              </div>
              {/* Image 3 */}
              <div className="w-1/2 flex justify-center">
                <img src={img4} alt="Image 3" className="w-full h-auto object-cover" />
              </div>
            </div>

            <div className="w-full">
              <img src={img5} alt="Image 4" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-4 mt-4">
          {/* Image 5 */}
          <div className="w-full lg:w-[65%] flex justify-center">
            <img src={img3} alt="Image 5" className="w-full h-auto object-cover" />
          </div>

          {/* Image 6 */}
          <div className="w-full lg:w-[35%] flex justify-center">
            <img src={img6} alt="Image 6" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};
