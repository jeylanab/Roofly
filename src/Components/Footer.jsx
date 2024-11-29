import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-lg font-semibold text-white mb-2">Roofly</h2>
        <p className="text-sm text-gray-400">&copy; 2024 Roofly. All Rights Reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="#"
            className="text-gray-400 hover:text-white text-sm"
            aria-label="Facebook"
          >
            Facebook
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white text-sm"
            aria-label="Twitter"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white text-sm"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white text-sm"
            aria-label="YouTube"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
};
