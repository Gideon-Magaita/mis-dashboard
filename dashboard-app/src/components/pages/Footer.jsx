import {Link} from 'react-router-dom'




export default function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-fluid d-flex justify-content-between">
        {/* Left Nav */}
        <nav className="pull-left">
          
        </nav>

        {/* Center copyright */}
        <div className="copyright">
          {currentYear}, Made 
           by{" "}
          <Link to="/">Developers - MoW</Link>
        </div>

        {/* Right */}
        <div>
          
        </div>
      </div>
    </footer>
  );
}