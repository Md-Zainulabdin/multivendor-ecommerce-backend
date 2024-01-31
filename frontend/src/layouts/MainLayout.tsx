// import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="m-auto max-w-6xl px-3">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
