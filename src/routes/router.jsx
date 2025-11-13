import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AllCropsPage from "../pages/AllCropsPage";
import CropDetailPage from "../pages/CropDetailPage";
import AddCropsPage from "../pages/AddCropsPage";
import MyPostsPage from "../pages/MyPostsPage";
import MyInterestsPage from "../pages/MyInterestsPage";
import ProfilePage from "../pages/ProfilePage";
import EditCropPage from "../pages/EditCropPage";
import ContactPage from "../pages/ContactPage";
import TermsPage from "../pages/TermsPage";
import PrivacyPage from "../pages/PrivacyPage";
import HowItWorksPage from "../pages/HowItWorksPage";
import BlogsPage from "../pages/BlogsPage";
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      // Public routes
      {
        path: "/all-crops",
        element: <AllCropsPage />,
      },
      {
        path: "/crop/:id",
        element: <CropDetailPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/terms",
        element: <TermsPage />,
      },
      {
        path: "/privacy",
        element: <PrivacyPage />,
      },
      {
        path: "/how-it-works",
        element: <HowItWorksPage />,
      },
      {
        path: "/blogs",
        element: <BlogsPage />,
      },
      // Protected routes
      {
        path: "/add-crops",
        element: (
          <PrivateRoute>
            <AddCropsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-posts",
        element: (
          <PrivateRoute>
            <MyPostsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-interests",
        element: (
          <PrivateRoute>
            <MyInterestsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-crop/:id",
        element: (
          <PrivateRoute>
            <EditCropPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
