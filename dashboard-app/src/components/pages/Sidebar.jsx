import { Link, useLocation } from 'react-router-dom';


export default function Sidebar() {
  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        {/* Logo Header */}
        <div className="logo-header" data-background-color="dark">
          <Link to="/" className="logo">
            <img
              src="/assets/img/logo1.png"
              alt="navbar brand"
              className="navbar-brand"
              height="30"
            />
          </Link>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="gg-menu-right"></i>
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="gg-menu-left"></i>
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt"></i>
          </button>
        </div>
        {/* End Logo Header */}
      </div>

      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            <li className="nav-item active">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              
                <i className="fas fa-home"></i>
                <p>Home</p>
          
                <span className="caret"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
