import { HomeIcon, Image as ImageIcon, Plus } from "lucide-react";
import Index from "./pages/Index.jsx";
import Add from "./pages/Add.jsx";

/**
* Central place for defining the navigation items. Used for navigation components and routing.
*/
export const navItems = [
  {
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "新增",
    to: "/add",
    icon: <Plus className="h-4 w-4" />,
    page: <Add />,
  },
];
