import React from "react";
import jeylanPic from "../Assets/tedy.png"; 
import tedaPic from "../Assets/joe.png"; 
export const About = () => {
  return (
    <div className="bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title Section */}
        <h1 className="text-4xl font-semibold text-gray-800">About Us</h1>
        <p className="mt-2 text-lg text-gray-600">
          Meet the team behind the Roofly project, built by passionate developers with a mission to create user-centric real estate solutions.
        </p>
      </div>

      {/* About Section */}
      <div className="mt-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col items-center text-center lg:text-left">
            <img src={jeylanPic} alt="Jeylan's Picture" className="w-40 h-40 rounded-full border-4 border-gray-900 transform hover:scale-105 transition duration-300" />
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">Jeylan Abdo</h2>
            <p className="mt-2 text-gray-600">A passionate full-stack developer with expertise in MERN stack, constantly exploring new technologies to build better web applications. I believe in creating solutions that provide real value to users.</p>
          </div>

          <div className="flex flex-col items-center text-center lg:text-left">
            <img src={tedaPic} alt="Tedy's Picture" className="w-40 h-40 rounded-full border-4 border-gray-900 transform hover:scale-105 transition duration-300" />
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">Tedy</h2>
            <p className="mt-2 text-gray-600">A creative developer with a strong background in frontend technologies. I enjoy translating user needs into engaging user interfaces that are both visually appealing and functional.</p>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="mt-16 bg-black text-white py-8 px-6 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold  text-center">The Roofly Project</h2>
        <p className="mt-4 text-lg text-slate-100 opacity- text-center">
          Roofly is a real estate platform that combines powerful technology with personalized listings to connect users with their next home. We aimed to create a seamless user experience with the MERN stack, and the platform includes dynamic search filters, property listings, and a responsive design for both mobile and desktop users.
        </p>
      </div>

      {/* Skills and Tools */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Technologies & Tools</h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
          <div className="text-gray-600">
            <h3 className="font-semibold">Frontend</h3>
            <p>React, Tailwind CSS, HTML5, CSS3</p>
          </div>
          <div className="text-gray-600">
            <h3 className="font-semibold">Backend</h3>
            <p>Node.js, Express.js, MongoDB</p>
          </div>
          <div className="text-gray-600">
            <h3 className="font-semibold">APIs</h3>
            <p>Zoopla API, RESTful APIs</p>
          </div>
          <div className="text-gray-600">
            <h3 className="font-semibold">Tools</h3>
            <p>GitHub, Visual Studio Code, Figma</p>
          </div>
        </div>
      </div>

      {/* Contact Section (Optional) */}
      <div className="mt-16 bg-black text-white py-8 text-center rounded-lg">
        <h2 className="text-3xl font-semibold">Get in Touch</h2>
        <p className="mt-4">Have any questions or want to collaborate? Feel free to reach out to us!</p>
        <a href="mailto:your-email@example.com" className="mt-4 inline-block px-6 py-3 bg-white text-green-600 rounded-full text-lg font-semibold">
          Contact Us
        </a>
      </div>
    </div>
  );
};
