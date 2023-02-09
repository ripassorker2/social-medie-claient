import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import OtherProfile from "../Pages/OtherProfile/OtherProfile";
import Profile from "../Pages/Profile/Profile";
import PrivetRouter from "./PrivetRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivetRouter>
        <HomeLayout />
      </PrivetRouter>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivetRouter>
            <Home />
          </PrivetRouter>
        ),
      },
      {
        path: "/my-profile",
        element: (
          <PrivetRouter>
            <Profile />
          </PrivetRouter>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <PrivetRouter>
            <OtherProfile />
          </PrivetRouter>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
]);
