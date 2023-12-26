import './Navbar.css';
import React from "react";
import { Link } from "react-router-dom"; // Import Link component

const Navbar = () => {
    return (
        <nav>
            <ul className="navbar">
                <li><Link to="/" className="nav-link">HOME</Link></li>
                <li><Link to="/projects" className="nav-link">PROJECTS</Link></li>
                <li><Link to="/resume" className="nav-link">RÉSUMÉ</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;