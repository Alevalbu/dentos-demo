'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChartBarStacked, ChevronDown, ChevronRight, LayoutDashboard, Table } from 'lucide-react';

interface NavItemChild {
  label: string;
  href: string;
  icon?: React.ReactNode | string;
}

interface NavItem extends NavItemChild {
  children?: NavItemChild[];
}

interface SideNavigationProps {
  items?: NavItem[];
}

const SideNavigation: React.FC<SideNavigationProps> = ({ 
  items = [
    { 
      label: 'Dashboard', 
      href: '/dashboard', 
      icon: <LayoutDashboard />
    },
    {
        label: 'Category',
        href: '/categories',
        icon: <ChartBarStacked />
    },
    { 
      label: 'Table', 
      href: '/table', 
      icon: <Table />
    }
  ],
}) => {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const toggleSubmenu = (label: string): void => {
    setOpenSubmenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const isActive = (href: string): boolean => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const renderNavItems = (navItems: NavItem[] | NavItemChild[]): React.ReactNode => {
    return navItems.map((item) => (
      <div key={item.label} className="w-full">
        {'children' in item && item.children ? (
          <div className="w-full">
            <button
              onClick={() => toggleSubmenu(item.label)}
              className={`flex items-center w-full p-2 text-left rounded-md ${
                isActive(item.href) ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
              }`}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span className="flex-1">{item.label}</span>
              {openSubmenus[item.label] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openSubmenus[item.label] && (
              <div className="ml-4 mt-1 border-l-2 border-gray-200 pl-2">
                {renderNavItems(item.children)}
              </div>
            )}
          </div>
        ) : (
          <Link 
            href={item.href}
            className={`flex items-center w-full p-2 rounded-md ${
              isActive(item.href) ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
            }`}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            <span>{item.label}</span>
          </Link>
        )}
      </div>
    ));
  };

  return (
    <>
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full bg-black shadow-lg transition-all duration-300 ease-in-out z-40
          ${'w-16'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h2 className={`font-semibold block}`}>Menu</h2>
          <button 
            className="p-2 rounded-md hover:bg-gray-100 hidden md:block"
          >
          </button>
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
            <div className="flex flex-col items-center space-y-4">
              {items.map((item) => (
                <Link 
                  key={item.label}
                  href={item.href}
                  className={`p-2 rounded-md ${isActive(item.href) ? 'bg-blue-100 text-black' : 'hover:bg-gray-100 hover:text-black'}`}
                  title={item.label}
                >
                  {item.icon && <span>{item.icon}</span>}
                </Link>
              ))}
            </div>
        </nav>
      </div>

      {/* Content Wrapper */}
      <div 
        className={`transition-all duration-300 ease-in-out
          ml-16 md:ml-0`}
      >
        {/* Your page content goes here */}
      </div>
    </>
  );
};

export default SideNavigation;