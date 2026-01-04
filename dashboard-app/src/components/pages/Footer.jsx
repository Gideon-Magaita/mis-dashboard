import {Link} from 'react-router-dom'


export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid d-flex justify-content-between">
        {/* Left Nav */}
        <nav className="pull-left">
          
        </nav>

        {/* Center copyright */}
        <div className="copyright">
          2026, Made with{" "}
          <i className="fa fa-heart heart text-danger"></i> by{" "}
          <Link to="/">Developers - MoW</Link>
        </div>

        {/* Right */}
        <div>
          
        </div>
      </div>
    </footer>
  );
}