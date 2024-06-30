import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/homePage/navbar.css";

function Navbar() {
  const [isOpen, setISOpen] = useState(false);

  const handleHamburger = () => {
    const linksContainer = document.querySelector(".linksContainer");
    // linksContainer.style.display = "block";
    linksContainer.classList.toggle("linksContaineractive");
  };

  const handleAccountMouseEnter = () => {
    setISOpen(true);
  };
  const handleAccountMouseLeave = () => {
    setISOpen(false);
  };
  return (
    <header className="header">
      <nav className="NavBar">
        <div className="navUpperPart">
          <Link to="/" className="logoContainer">
            <h1 className="logo">
              <span className="logoLeft">Travel</span>
              <span className="logoRight">Treasure</span>
            </h1>
          </Link>
          <ul className="linksContainer">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active link" : "link"
                }
              >
                <span>
                  <i className="fa-solid fa-house navLinkIcon"></i>Home
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/packages"
                className={({ isActive }) =>
                  isActive ? "active link" : "link"
                }
              >
                <span>
                  {" "}
                  <i className="fa-solid fa-person-walking-luggage navLinkIcon"></i>
                  Packages
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Flights"
                className={({ isActive }) =>
                  isActive ? "active link" : "link"
                }
              >
                <spn>
                  {" "}
                  <i className="fa-solid fa-plane-departure navLinkIcon"></i>
                  Flights
                </spn>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Hotels"
                className={({ isActive }) =>
                  isActive ? "active link" : "link"
                }
              >
                <span>
                  <i className="fa-solid fa-hotel navLinkIcon"></i>Hotels
                </span>
              </NavLink>
            </li>
            {/* <li>
              <Link>
                <i className="fa-solid fa-pencil navLinkIcon"></i>Blog
              </Link>
            </li> */}
            <li>
              <NavLink
                to="/myTrips/myPackages"
                className={({ isActive }) =>
                  isActive ? "active link" : "link"
                }
              >
                <span>
                  {" "}
                  <i className="fa-solid fa-suitcase navLinkIcon"></i>My Trips
                </span>
              </NavLink>
            </li>
            <li className="Acctoun-cont">
              <div
                className="Account"
                onMouseEnter={handleAccountMouseEnter}
                onMouseLeave={handleAccountMouseLeave}
              >
                Account <i className="fa-solid fa-caret-down"></i>
              </div>
              {isOpen && (
                <ul
                  className="accoun-dropdown"
                  onMouseEnter={handleAccountMouseEnter}
                  onMouseLeave={handleAccountMouseLeave}
                >
                  {/* <li>
                    <Link>Favorites</Link>
                  </li> */}
                  <li>
                    <Link to="/Login">Login</Link>
                  </li>
                  <li>
                    <Link to="/Signup">Signup</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <div className="bars" onClick={handleHamburger}>
            <button>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
