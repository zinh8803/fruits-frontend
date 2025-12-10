import { Outlet } from "react-router";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
