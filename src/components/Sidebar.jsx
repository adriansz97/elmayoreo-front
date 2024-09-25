import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const sections = [
  { name: "Dashbard", path: "/" },
  { name: "Inventario", path: "/inventory" },
  { name: "Solicitudes", path: "/requests" },
  { name: "Tickets", path: "/tickets" },
]

// NavLink component
const SideBarItem = ({ currentPath, setActiveSidebar, ...props }) => {
  const { children, path = "", className = "", active = "" } = props;

  const [pathname, setPathname] = useState("/");

  const isActive = pathname == path;
  const activeClass = isActive ? active : "";

  useEffect(() => {
    setPathname(currentPath);
  }, [currentPath]);

  return (
    <NavLink to={path} {...props} className={`${activeClass} ${className}`} onClick={()=>setActiveSidebar(false)}>
      {children}
    </NavLink>
  );
};

// Sections List
const SectionsList = ({ items, currentPath, setActiveSidebar }) => (
  <div className="text-gray-600 px-4 md:px-8">
    <ul>
      {items.map((item, idx) => (
        <li key={idx} className="cursor-pointer">
          <SideBarItem
            path={item.path}
            currentPath={currentPath}
            active="text-gray-900 border-indigo-600"
            className="block w-full py-2 px-4 border-l hover:border-indigo-600 hover:text-gray-900 duration-150"
            setActiveSidebar={setActiveSidebar}
          >
            {item?.name}
          </SideBarItem>
        </li>
      ))}
    </ul>
  </div>
);

export const Sidebar = ({ activeSidebar, setActiveSidebar }) => {

  const { pathname } = useLocation();

  return (
    // <nav className="z-40 top-0 left-0 w-full h-full border-r bg-slate-100 space-y-8 overflow-auto ">
    <nav className={`absolute top-0 left-0 w-screen h-screen overflow-hidden transition-all md:relative md:w-3/12 ${!activeSidebar ? "ms-[100%] md:ms-0": ""}`}>
      <div className="bg-white h-full">

        {/* header */}
        <div className="h-20 flex items-center px-4 border-b space-y-8">
          <h3 className="max-w-full font-bold text-xl overflow-hidden whitespace-nowrap overflow-ellipsis">Tienda Ferretera el Mayoreo</h3>
          <div className="text-end p-2 md:hidden">
            <button className="bg-emerald-500 border border-black h-8 w-8" onClick={()=>setActiveSidebar(!activeSidebar)}>=</button>
          </div>
        </div>

        {/* list */}
        <div className="text-[0.9rem] space-y-6">
          <SectionsList items={sections} currentPath={pathname} setActiveSidebar={setActiveSidebar} />
        </div>

      </div>
    </nav>
  );
};
