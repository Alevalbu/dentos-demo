'use client';
import React, { useState } from 'react';

interface NavLink {
  id: string;
  title: string;
  installationLink: string;
}

const InstallationNav: React.FC = () => {
  // Sample navigation links with different installation links
  const navLinks: NavLink[] = [
    {
      id: 'windows',
      title: 'Windows',
      installationLink: 'https://example.com/install/windows'
    },
    {
      id: 'mac',
      title: 'macOS',
      installationLink: 'https://example.com/install/mac'
    },
    {
      id: 'linux',
      title: 'Linux',
      installationLink: 'https://example.com/install/linux'
    },
    {
      id: 'android',
      title: 'Android',
      installationLink: 'https://example.com/install/android'
    },
    {
      id: 'ios',
      title: 'iOS',
      installationLink: 'https://example.com/install/ios'
    }
  ];

  // State to track the currently selected link
  const [activeLink, setActiveLink] = useState<NavLink>(navLinks[0]);

  // Handler for nav link clicks
  const handleNavClick = (link: NavLink) => {
    setActiveLink(link);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl rounded-lg">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 rounded-t-lg">
        <ul className="flex">
          {navLinks.map((link) => (
            <li key={link.id} className="flex-1">
              <button
                onClick={() => handleNavClick(link)}
                className={`w-full py-3 px-4 text-center transition-colors duration-200 ${
                  activeLink.id === link.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {link.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content Area */}
      <div className="bg-white border border-gray-200 rounded-b-lg p-6 shadow-sm">
        <h2 className="text-2xl text-black font-bold mb-4">Install for {activeLink.title}</h2>
        <p className="mb-6 text-gray-700">
          Follow the instructions below to install our application on your {activeLink.title} device.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-sm text-gray-700 mb-2">Installation Link:</p>
          <a
            href={activeLink.installationLink}
            className="text-blue-600 hover:text-blue-800 break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {activeLink.installationLink}
          </a>
        </div>
        <button className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200">
          Download Now
        </button>
      </div>
    </div>
  );
};

export default InstallationNav;