import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const sections = [
  { name: "Inventario", path: "/stock" },
  { name: "Solicitudes", path: "/requests" },
  { name: "Tickets", path: "/tickets" },
]

// NavLink component
const SideBarItem = ({ currentPath, ...props }) => {
  const { children, path = "", className = "", active = "" } = props;

  const [pathname, setPathname] = useState("/");

  const isActive = pathname == path;
  const activeClass = isActive ? active : "";

  useEffect(() => {
    setPathname(currentPath);
  }, [currentPath]);

  return (
    <NavLink to={path} {...props} className={`${activeClass} ${className}`}>
      {children}
    </NavLink>
  );
};

// Sections List
const SectionsList = ({ items, currentPath }) => (
  <div className="text-gray-600 px-4 md:px-8">
    <ul>
      {items.map((item, idx) => (
        <li key={idx} className="cursor-pointer">
          <SideBarItem
            path={item.path}
            currentPath={currentPath}
            active="text-gray-900 border-indigo-600"
            className="block w-full py-2 px-4 border-l hover:border-indigo-600 hover:text-gray-900 duration-150"
          >
            {item?.name}
          </SideBarItem>
        </li>
      ))}
    </ul>
  </div>
);

export const Sidebar = () => {

  const { pathname } = useLocation();

  return (
    <nav className="z-40 top-0 left-0 w-full h-full border-r bg-white space-y-8 overflow-auto sm:w-80">
      <div className="sticky top-0 space-y-8 bg-white">
        <div className="h-20 flex items-center px-4 border-b md:px-4">
          <h3 className="font-bold text-xl flex-none">Tienda Ferretera el Mayoreo</h3>
        </div>
      </div>
      <div className="text-[0.9rem] space-y-6">
        <>
          <div>
            <SectionsList items={sections} currentPath={pathname} />
          </div>
        </>
      </div>
    </nav>
  );
};
