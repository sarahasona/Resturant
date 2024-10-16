import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import HomeView from "../pages/HomeView";
import MenuView from "../pages/MenuView";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: "/menu",
        element: <MenuView />,
      },
      {
        path: "/menu/:id",
        element: <MenuView />,
      },
    ],
  },
]);
export default router;
