import MainPage from "./Pages/MainPage";
import ProductGrid from "./Pages/ProductsGrid";
// import Interface from "./Pages/Interface";

// import NavBar from "./Components/NavBar";
// import Footer from "./Components/Footer";
import ForumPage from "./Pages/ForumPage";
import Wishlist from "./Components/Wishlist";
import AddProduct from "./screens/AddProduct";

// import FoodMap from "./FoodOrdering/FoodMap";
// import Main from "./FoodOrdering/Main";
// import MenuPage from "./FoodOrdering/MenuPage";
import ProductReview from "./Components/ProductReview";
import PageNotFound from "./Components/PageNotFound";
import ProfilePage from "./Components/ProfilePage";
import MyProducts from "./Components/MyProducts";
import Layout from "./Components/Layout";
import CategoryProductGrid from "./Pages/CategoryProductGrid";
import ContactUs from "./Components/ContactUs";
import Chat from "./Components/ChatApp/Chat/Chat";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "shop", element: <ProductGrid /> },
      { path: "forumpage", element: <ForumPage /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "addProduct", element: <AddProduct /> },
      { path: "productReview/:pid", element: <ProductReview /> },
      { path: "profilePage", element: <ProfilePage /> },
      { path: "myProducts", element: <MyProducts /> },
      { path: ":Category", element: <CategoryProductGrid /> },
      { path: "contactUs", element: <ContactUs /> },
      { path: "chat/:myid", element: <Chat /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
];

export default routes;
