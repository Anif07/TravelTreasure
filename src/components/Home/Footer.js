import React from "react";
import "../../styles/homePage/footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footerContainer">
        <div className="aboutUs">
          <h2>About Us</h2>
          <p>
            Travel Treasure is dedicated to providing the best travel
            experiences around the world. Our mission is to make travel
            accessible and enjoyable for everyone.
          </p>
        </div>
        <div className="linksCont">
          <div>
            <h2>Quick links</h2>
          </div>
          <div className="all-links-footer">
            <Link>Home</Link>
            <Link>Packages</Link>
            <Link>Flights</Link>
            <Link>Hotels</Link>
            <Link>Bolgs</Link>
          </div>
        </div>
        <div className="contactUs">
          <h2>Contact Us</h2>
          <p>2-136, syndicate nagar, Anantapur, Andrapradesh</p>
          <p>Phone: +91 9110577492</p>
          <p>Email: mahammadanif22@gmail.com</p>
        </div>
      </div>
      <div className="socialMediaLinks">
        <h2>Follow us</h2>
        <div className="socialLinks">
          <a
            href="https://www.linkedin.com/in/mahammad-anif-18aa2b23a/"
            target="blank"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/Anif07" target="blank">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.instagram.com/anif034/" target="blank">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/mahammadanif.22/" target="blank">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 TravelTreasure. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
