import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="wrapper">
      <Sidebar /> {/* Sidebar usually goes first */}
      <div className="main-panel">
        <Navbar />
        <div className="container">
          <div class="page-inner">
            <div
              class="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4"
            >
          <Outlet />
            </div>
          </div>
             
        </div>
        <Footer />
      </div>
    </div>
  );
}
